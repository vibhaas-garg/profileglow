import { NextRequest, NextResponse } from "next/server";
import { ai, GEMINI_PRIMARY_MODEL, GEMINI_FALLBACK_MODEL, fetchImagePart } from "@/lib/gemini";
import { adminDb } from "@/lib/firebase/admin";
import { memoryReports, memoryChat } from "@/lib/store";
import { ProfileReport } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, message, image, action } = body;

    if (!reportId) {
      return NextResponse.json({ error: "reportId is required" }, { status: 400 });
    }

    // 1. Fetch Report
    let report: ProfileReport | null = null;

    if (memoryReports.has(reportId)) {
      report = memoryReports.get(reportId)!;
    } else if (adminDb) {
      try {
        const snap = await adminDb.collection("reports").doc(reportId).get();
        if (snap.exists) {
          report = { id: snap.id, ...snap.data() } as ProfileReport;
        }
      } catch (err) {
        console.warn("Firestore lookup failed:", err);
      }
    }

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Handle Reset Quota (for testing & development)
    if (action === "reset_quota") {
      report.chatMessageCount = 0;
      memoryReports.set(reportId, report);
      if (adminDb) {
        try {
          await adminDb.collection("reports").doc(reportId).update({ chatMessageCount: 0 });
        } catch (e) {
          console.warn("Firestore quota reset err:", e);
        }
      }
      return NextResponse.json({ success: true, message: "Quota reset to 0/30", quotaUsed: 0 });
    }

    if (!message && !image) {
      return NextResponse.json({ error: "A message or image is required" }, { status: 400 });
    }

    // 2. Check Entitlement
    if (!report.isChatUnlocked) {
      return NextResponse.json(
        { error: "Payment required to access AI coaching chat", requiresPayment: true },
        { status: 403 }
      );
    }

    // 3. Check Quota (Max 30 messages)
    const currentCount = report.chatMessageCount || 0;
    if (currentCount >= 30) {
      return NextResponse.json(
        {
          error: "You have used all 30 questions for this profile report.",
          quotaReached: true,
          quotaUsed: currentCount,
          quotaTotal: 30,
        },
        { status: 429 }
      );
    }

    // 4. Load Conversation History
    const history = memoryChat.get(reportId) || [];

    // 5. Build Gemini Context
    const systemPrompt = `
You are the personal dating coach for ProfileGlow.
You are directly advising a user based on their specific profile makeover report:
- Dating App: ${report.inputData.app}
- User: Age ${report.inputData.age}, Location ${report.inputData.location}
- Interested In: ${report.inputData.genderPreference}, Looking for: ${report.inputData.relationshipGoal}
- Current Bio: "${report.inputData.bio}"
- Overall Score: ${report.overallScore}/10
- Main Diagnosis: "${report.verdictSummary}"
- Bio Rewrites Provided:
  ${report.bioRewrites.map((b) => `- [${b.title}]: ${b.bio}`).join("\n  ")}

Guidelines:
- Give concise, witty, actionable, high-impact dating advice tailored to their specific dating app and location.
- When drafting messages or bios, give 2-3 options with varying energy levels.
- Keep responses friendly, constructive, and realistic.

When the user attaches or uploads a photo:
- Give an objective rating (1-10) for dating app performance.
- Critique lighting, eye contact, expression, outfit, and background environment.
- Advise whether to use it as a Lead photo, Supporting photo (slots 2-6), or Discard/Retake.
- Give 1 actionable tip to improve the shot.

STRICT FORMATTING REQUIREMENTS:
- DO NOT use markdown headers (never use ### or ## or #).
- DO NOT use markdown blockquotes (never prefix lines with >).
- DO NOT use asterisk bullets (never use * or - for bullet points).
- DO NOT use markdown asterisks for bolding (never use **word**).
- DO NOT use emojis or em dashes.
- Format responses cleanly using standard plain paragraphs and clear text labels:
  Example:
  Option 1: The Witty Opener
  "Your message here"
  Why it works: Direct and easy to answer.

- Keep every answer neat, clean, and directly readable on screen without punctuation clutter or symbols.
`;

    // Prepare prompt input (multimodal if image attached)
    const textPrompt = message || "Please review this photo for my dating profile. How does it look?";
    let messagePayload: any = textPrompt;

    if (image) {
      const imgPart = await fetchImagePart(image);
      if (imgPart) {
        messagePayload = [imgPart, textPrompt];
      }
    }

    // Format past history for Gemini
    const formattedHistory = await Promise.all(
      history.slice(-8).map(async (msg) => {
        const parts: any[] = [];
        if (msg.image) {
          const pastImg = await fetchImagePart(msg.image);
          if (pastImg) parts.push(pastImg);
        }
        parts.push({ text: msg.content });
        return {
          role: msg.role === "user" ? ("user" as const) : ("model" as const),
          parts,
        };
      })
    );

    let reply = "";

    if (process.env.GEMINI_API_KEY) {
      try {
        const chat = ai.chats.create({
          model: GEMINI_PRIMARY_MODEL,
          config: {
            systemInstruction: systemPrompt,
          },
          history: formattedHistory,
        });

        const result = await chat.sendMessage({ message: messagePayload });
        reply = result.text || "";
      } catch (geminiError: any) {
        console.warn("Primary chat model error, trying fallback model:", geminiError?.message);
        try {
          const fallbackChat = ai.chats.create({
            model: GEMINI_FALLBACK_MODEL,
            config: {
              systemInstruction: systemPrompt,
            },
            history: formattedHistory,
          });
          const fallbackResult = await fallbackChat.sendMessage({ message: messagePayload });
          reply = fallbackResult.text || "";
        } catch (fallbackErr) {
          console.error("Gemini chat fallback error:", fallbackErr);
        }
      }
    }

    if (!reply) {
      // Deterministic coaching response
      reply = `Great question! Looking at your ${report.inputData.app} profile, the key is keeping your answers punchy. If you want to reply to their message, try: "Honestly? I'll let you decide on the dessert spot, but only if you promise not to judge my playlist." It creates an easy hook without trying too hard. What specific prompt or photo do you want to work on next?`;
    }

    const timestamp = new Date().toISOString();
    history.push({
      role: "user",
      content: textPrompt,
      ...(image ? { image } : {}),
      createdAt: timestamp,
    });
    history.push({ role: "assistant", content: reply, createdAt: timestamp });
    memoryChat.set(reportId, history);

    // Update message count
    report.chatMessageCount = currentCount + 1;
    memoryReports.set(reportId, report);

    if (adminDb) {
      try {
        await adminDb.collection("reports").doc(reportId).update({
          chatMessageCount: currentCount + 1,
        });
        await adminDb
          .collection("reports")
          .doc(reportId)
          .collection("messages")
          .add({
            role: "user",
            content: textPrompt,
            ...(image ? { image } : {}),
            createdAt: timestamp,
          });
        await adminDb
          .collection("reports")
          .doc(reportId)
          .collection("messages")
          .add({
            role: "assistant",
            content: reply,
            createdAt: timestamp,
          });
      } catch (err) {
        console.warn("Firestore chat update error:", err);
      }
    }

    return NextResponse.json({
      reply,
      quotaUsed: currentCount + 1,
      quotaTotal: 30,
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: err.message || "Failed to process chat message" }, { status: 500 });
  }
}
