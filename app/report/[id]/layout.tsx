import type { Metadata } from "next";
import { memoryReports } from "@/lib/store";
import { adminDb } from "@/lib/firebase/admin";
import { ProfileReport } from "@/lib/types";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

async function getReport(id: string): Promise<ProfileReport | null> {
  if (memoryReports.has(id)) {
    return memoryReports.get(id)!;
  }
  if (adminDb) {
    try {
      const snap = await adminDb.collection("reports").doc(id).get();
      if (snap.exists) {
        return { id: snap.id, ...snap.data() } as ProfileReport;
      }
    } catch (e) {
      console.warn("Firestore lookup error in report layout:", e);
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const report = await getReport(params.id);

  const score = report ? Number(report.overallScore).toFixed(1) : "7.5";
  const appName = report?.inputData?.app
    ? report.inputData.app.charAt(0).toUpperCase() + report.inputData.app.slice(1)
    : "Dating";
  const headline =
    report?.headlineVerdict ||
    "Evidence-based dating profile makeover audit with photo rankings and bio rewrites.";

  const title = `${appName} Profile Score: ${score}/10 | ProfileGlow`;
  const description = `Overall Score: ${score}/10. "${headline}" See photo critiques, 3 bio variations, and conversation openers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://profileglow.com/report/${params.id}`,
      siteName: "ProfileGlow",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
