import { ImageResponse } from "next/og";
import { memoryReports } from "@/lib/store";
import { adminDb } from "@/lib/firebase/admin";
import { ProfileReport } from "@/lib/types";

export const runtime = "nodejs";
export const alt = "ProfileGlow Dating Profile Makeover Score";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
      console.warn("Firestore lookup error in og-image:", e);
    }
  }
  return null;
}

export default async function Image({ params }: { params: { id: string } }) {
  const report = await getReport(params.id);

  const score = report ? Number(report.overallScore).toFixed(1) : "7.5";
  const targetApp = (report?.inputData?.app || "dating").toUpperCase();
  const headline =
    report?.headlineVerdict ||
    "Actionable photo ranking, bio rewrites, and conversation openers.";
  const visualImpact = report?.subScores?.visualImpact ?? 8;
  const originality = report?.subScores?.originality ?? 7;
  const vibe = report?.subScores?.vibe ?? 8;
  const hooks = report?.subScores?.conversationHooks ?? 7;
  const shortId = params.id.substring(0, 10);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fcfbfa",
          padding: "48px 56px",
          fontFamily: "sans-serif",
          border: "12px solid #1a1a1a",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#1a1a1a",
                letterSpacing: "-1.5px",
                display: "flex",
              }}
            >
              Profile<span style={{ color: "#7c5cff" }}>Glow</span>
            </div>
            <div
              style={{
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "1px",
                display: "flex",
              }}
            >
              AI PROFILE AUDIT
            </div>
          </div>

          {/* Target App Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#d2f802",
              border: "3px solid #1a1a1a",
              padding: "8px 20px",
              borderRadius: "14px",
              fontWeight: 900,
              fontSize: 16,
              color: "#1a1a1a",
              boxShadow: "4px 4px 0px #1a1a1a",
            }}
          >
            {targetApp} MAKEOVER REPORT
          </div>
        </div>

        {/* Main Content Area (Two Columns) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "36px",
          }}
        >
          {/* Left Column: Headline Verdict & Subscores */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 0%",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#7c5cff",
                  letterSpacing: "1.5px",
                  display: "flex",
                }}
              >
                PROFILE VERDICT
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1a1a1a",
                  lineHeight: 1.25,
                  display: "flex",
                  maxHeight: "140px",
                  overflow: "hidden",
                }}
              >
                "{headline}"
              </div>
            </div>

            {/* Subscores Grid */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #1a1a1a",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1a1a1a",
                }}
              >
                Visual Impact: <span style={{ color: "#7c5cff" }}>{visualImpact}/10</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #1a1a1a",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1a1a1a",
                }}
              >
                Originality: <span style={{ color: "#7c5cff" }}>{originality}/10</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #1a1a1a",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1a1a1a",
                }}
              >
                Vibe: <span style={{ color: "#7c5cff" }}>{vibe}/10</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #1a1a1a",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1a1a1a",
                }}
              >
                Hooks: <span style={{ color: "#7c5cff" }}>{hooks}/10</span>
              </div>
            </div>
          </div>

          {/* Right Column: Giant Score Badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#d2f802",
              border: "5px solid #1a1a1a",
              borderRadius: "24px",
              padding: "24px 36px",
              boxShadow: "8px 8px 0px #1a1a1a",
              minWidth: "260px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#1a1a1a",
                letterSpacing: "1.5px",
                marginBottom: "4px",
                display: "flex",
              }}
            >
              OVERALL SCORE
            </div>
            <div
              style={{
                fontSize: 92,
                fontWeight: 900,
                color: "#1a1a1a",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline",
                letterSpacing: "-3px",
              }}
            >
              {score}
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#6b675e",
                  marginLeft: "4px",
                }}
              >
                /10
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#1a1a1a",
                marginTop: "10px",
                backgroundColor: "#ffffff",
                padding: "4px 12px",
                borderRadius: "6px",
                border: "2px solid #1a1a1a",
                display: "flex",
              }}
            >
              VERIFIED AI AUDIT
            </div>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #1a1a1a",
            paddingTop: "18px",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>profileglow.com</span>
            <span style={{ color: "#7c5cff" }}>•</span>
            <span style={{ color: "#6b675e" }}>
              Built with Gemini 3.5 Flash Multimodal AI
            </span>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#6b675e",
              display: "flex",
            }}
          >
            Report #{shortId}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
