import { ProfileReport } from "./types";
import { adminDb } from "./firebase/admin";

declare global {
  // eslint-disable-next-line no-var
  var __memoryReports: Map<string, ProfileReport> | undefined;
  // eslint-disable-next-line no-var
  var __memoryChat:
    | Map<string, Array<{ role: "user" | "assistant"; content: string; image?: string; createdAt: string }>>
    | undefined;
}

// In-memory store attached to globalThis for persistence across Next.js dev reloads
export const memoryReports: Map<string, ProfileReport> =
  globalThis.__memoryReports || (globalThis.__memoryReports = new Map());

export const memoryChat: Map<
  string,
  Array<{ role: "user" | "assistant"; content: string; image?: string; createdAt: string }>
> = globalThis.__memoryChat || (globalThis.__memoryChat = new Map());

export async function unlockReportInDb(reportId: string, paymentId: string) {
  // 1. Update in-memory cache
  if (memoryReports.has(reportId)) {
    const existing = memoryReports.get(reportId)!;
    existing.isChatUnlocked = true;
    existing.paymentId = paymentId;
    existing.unlockedAt = new Date().toISOString();
    memoryReports.set(reportId, existing);
  }

  // 2. Update Firestore if configured
  if (adminDb) {
    try {
      const repDoc = await adminDb.collection("reports").doc(reportId).get();
      const userId = repDoc.exists ? repDoc.data()?.userId : null;

      await adminDb.collection("reports").doc(reportId).set(
        {
          isChatUnlocked: true,
          paymentId,
          unlockedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      if (userId && userId !== "guest_user") {
        await adminDb.collection("users").doc(userId).collection("reports").doc(reportId).set(
          {
            isChatUnlocked: true,
            paymentId,
            unlockedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn("Firestore payment update error:", err);
    }
  }
}

