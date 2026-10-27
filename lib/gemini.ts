import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
export const ai = new GoogleGenAI({ vertexai: false, apiKey });

export const GEMINI_PRIMARY_MODEL = "gemini-3.5-flash";
export const GEMINI_FALLBACK_MODEL = "gemini-3.5-flash-lite";

export const DATING_COACH_SYSTEM_INSTRUCTION = `
You are ProfileGlow's elite dating profile strategist and AI profile doctor.
Your goal is to evaluate dating profiles (photos + bio + demographics) objectively, constructively, and with sharp wit.
You analyze profiles across algorithms for Tinder, Hinge, and Bumble.

When evaluating photos:
- Assess lighting, facial expressions, clarity, context, eye contact, and setting.
- Identify which photo MUST be the lead photo (clear solo portrait, good lighting, friendly smile).
- Recommend which photos to keep and which to replace (e.g. car selfies, sunglasses hiding eyes, gym flexes, group shots where it's hard to identify the user).

When evaluating bios:
- Kill clichés ("partner in crime", "coffee addict", "love to laugh", "fluent in sarcasm").
- Craft 3 distinct rewritten bio styles:
  1. Witty (clever, playful, banter-heavy)
  2. Genuine (authentic, values-focused, grounded)
  3. Bold (confident, memorable, playful challenge)
- Create app-specific prompt rewrites (e.g. Hinge prompts with punchy conversation hooks).
- Create 5 high-converting conversation openers tailored to the user's personality.
- Flag Red Flags (passive aggression, negative framing like "don't swipe if...", generic descriptions).

Always output strictly valid JSON matching the schema provided.
`;

/**
 * Robust content generator with automatic fallback from primary model to flash-lite
 * in case of temporary 503 high-demand spikes.
 */
export async function generateGeminiContent(options: {
  contents: any;
  systemInstruction?: string;
  responseMimeType?: string;
  temperature?: number;
}) {
  const config: Record<string, any> = {};
  if (options.systemInstruction) config.systemInstruction = options.systemInstruction;
  if (options.responseMimeType) config.responseMimeType = options.responseMimeType;
  if (options.temperature !== undefined) config.temperature = options.temperature;

  try {
    const res = await ai.models.generateContent({
      model: GEMINI_PRIMARY_MODEL,
      contents: options.contents,
      config,
    });
    return res.text;
  } catch (err: any) {
    console.warn(`Primary model ${GEMINI_PRIMARY_MODEL} error (${err?.status || err?.message}), attempting fallback to ${GEMINI_FALLBACK_MODEL}...`);
    const fallbackRes = await ai.models.generateContent({
      model: GEMINI_FALLBACK_MODEL,
      contents: options.contents,
      config,
    });
    return fallbackRes.text;
  }
}

/**
 * Converts a data URL or external image URL into a Part object for Gemini multimodal input.
 */
export async function fetchImagePart(url: string) {
  try {
    if (url.startsWith("data:")) {
      const matches = url.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        return {
          inlineData: {
            data: matches[2],
            mimeType: matches[1],
          },
        };
      }
    }

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = response.headers.get("content-type") || "image/jpeg";

    return {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType,
      },
    };
  } catch (err) {
    console.warn("Failed to fetch image part for URL:", url, err);
    return null;
  }
}
