import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { memoryReports } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    let userId: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ") && adminAuth) {
      const token = authHeader.substring(7);
      try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authErr) {
        console.warn("Token verification failed in latest-report:", authErr);
      }
    }

    if (!userId) {
      return NextResponse.json({ reportId: null });
    }

    // 1. Try Firestore user's subcollection
    if (adminDb) {
      try {
        const snapshot = await adminDb
          .collection("users")
          .doc(userId)
          .collection("reports")
          .orderBy("createdAt", "desc")
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          return NextResponse.json({ reportId: doc.id });
        }
      } catch (dbErr) {
        console.warn("Firestore query failed for latest-report:", dbErr);
      }
    }

    // 2. Try Memory store for matching userId
    let memoryReportId: string | null = null;
    memoryReports.forEach((rep, id) => {
      if (rep.userId === userId && !memoryReportId) {
        memoryReportId = id;
      }
    });

    if (memoryReportId) {
      return NextResponse.json({ reportId: memoryReportId });
    }

    return NextResponse.json({ reportId: null });
  } catch (err: any) {
    console.error("Latest report lookup error:", err);
    return NextResponse.json({ reportId: null });
  }
}
