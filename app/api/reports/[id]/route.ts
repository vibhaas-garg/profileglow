import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { memoryReports } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reportId = params.id;

  // 1. Check memory store
  if (memoryReports.has(reportId)) {
    return NextResponse.json(memoryReports.get(reportId));
  }

  // 2. Check Firestore if configured
  if (adminDb) {
    try {
      const docSnap = await adminDb.collection("reports").doc(reportId).get();
      if (docSnap.exists) {
        return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (err) {
      console.warn("Firestore lookup failed:", err);
    }
  }

  return NextResponse.json({ error: "Report not found" }, { status: 404 });
}
