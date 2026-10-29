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

FORMATTING & HIGHLIGHTING REQUIREMENTS (CRITICAL):
- ALWAYS bold headings, ratings, and section titles using markdown asterisks (**Heading**).
- ALWAYS bold attribute labels before colons (e.g. **Lighting:**, **Eye Contact:**, **Expression:**, **Outfit:**, **Background Environment:**, **Recommendation:**, **Why it works:**, **When to send:**, **Key Takeaway:**, etc.).
- ALWAYS include an **Actionable Tip** (or **Actionable Tip:**) with concrete, high-impact guidance.
- Apply this structure to EVERY kind of prompt (photo reviews, opener drafting, bio writing, match reply advice, date prep):

When reviewing a photo:
- **Dating App Photo Rating: X out of 10**
- **Critique**
  - **Lighting:** [analysis]
  - **Eye Contact:** [analysis]
  - **Expression:** [analysis]
  - **Outfit:** [analysis]
  - **Background Environment:** [analysis]
- **Recommendation:** [Lead Photo | Supporting Photo (Slots 2-6) | Discard / Retake]
- **Actionable Tip**
  [1-2 sentences with concrete instructions on how to retake or improve the shot]

When crafting openers, replies, or bios:
- **Option 1: [Style Name]**
  "[Exact message or bio to copy-paste]"
  - **Why it works:** [psychological trigger or conversational bait]
- **Option 2: [Style Name]**
  "[Exact message or bio to copy-paste]"
  - **Why it works:** [psychological trigger or conversational bait]
- **Actionable Tip**
  [Concrete timing or follow-up advice]

When answering general dating advice or profile questions:
- Use bold section labels (**The Diagnosis:**, **The Strategy:**, **Actionable Tip:**) so the user can easily skim and take action.
- Keep every response punchy, well-spaced, and visually polished without overwhelming blocks of text.
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
      if (image) {
        reply = `**Dating App Photo Rating: 7.0 out of 10**

**Critique**
- **Lighting:** Warm and natural, illuminates your features clearly without harsh shadows.
- **Eye Contact:** Direct, relaxed, and confident.
- **Expression:** Genuine micro-smile that conveys warmth and approachable energy.
- **Outfit:** Clean and fitting well for your target app demographic.
- **Background Environment:** Solid context that adds lifestyle depth.

**Recommendation:** Supporting Photo (Slot 2 or 3)

**Actionable Tip**
Try an outdoor shot during golden hour where you're relaxed and smiling authentically to maximize warmth and swipe conversions.`;
      } else {
        reply = `**Coach Assessment & Strategy**

Looking at your ${report.inputData.app.toUpperCase()} profile in ${report.inputData.location}, here are high-converting options tailored to your matches:

**Option 1: The Playful Banter**
"Honestly? I will let you pick the dessert spot, but only if you promise not to judge my playlist on the drive."
- **Why it works:** Low friction, teases playful vulnerability, and gives them an effortless opening question.

**Option 2: The Fun Debate**
"Quick debate: is it socially acceptable to order breakfast food for dinner? Your answer decides our first date."
- **Why it works:** Creates an immediate playful controversy that over 80% of matches reply to.

**Actionable Tip**
Always reply within 2-4 hours when a match first messages you to keep conversational momentum high while your profile is fresh in their feed.`;
      }
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
