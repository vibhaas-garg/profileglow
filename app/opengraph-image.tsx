import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ProfileGlow: AI Dating Profile Optimizer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fdfbf7",
          padding: 48,
          position: "relative",
          fontFamily: "sans-serif",
          border: "12px solid #1a1a1a",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 48,
              fontWeight: 900,
              color: "#1a1a1a",
              letterSpacing: -1,
            }}
          >
            Profile<span style={{ color: "#7c5cff" }}>Glow</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#d4ff3f",
              border: "3px solid #1a1a1a",
              borderRadius: 9999,
              padding: "8px 24px",
              fontSize: 20,
              fontWeight: 900,
              color: "#1a1a1a",
              boxShadow: "4px 4px 0px #1a1a1a",
            }}
          >
            ⚡ TINDER • HINGE • BUMBLE AUDIT
          </div>
        </div>

        {/* Main Body Grid */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          {/* Left Hero Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1.2,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#7c5cff",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              AI Dating Profile Optimizer
            </div>
            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                color: "#1a1a1a",
                lineHeight: 1.05,
                letterSpacing: -2,
                marginBottom: 20,
              }}
            >
              Stop swiping.
              <br />
              <span
                style={{
                  backgroundColor: "#d4ff3f",
                  padding: "0 8px",
                  borderRadius: 8,
                }}
              >
                Start matching.
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#4a4a4a",
                lineHeight: 1.4,
                marginBottom: 28,
              }}
            >
              Vision AI photo rankings, rewritten bios, and proven openers engineered for real dates.
            </div>

            {/* Feature Badges */}
            <div
              style={{
                display: "flex",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#7c5cff",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  padding: "10px 20px",
                  borderRadius: 14,
                  border: "3px solid #1a1a1a",
                  boxShadow: "3px 3px 0px #1a1a1a",
                }}
              >
                3.4x More Replies
              </div>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#ffffff",
                  color: "#1a1a1a",
                  fontSize: 18,
                  fontWeight: 900,
                  padding: "10px 20px",
                  borderRadius: 14,
                  border: "3px solid #1a1a1a",
                  boxShadow: "3px 3px 0px #1a1a1a",
                }}
              >
                Multimodal Vision AI
              </div>
            </div>
          </div>

          {/* Right Card Mockup */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 0.9,
              backgroundColor: "#ffffff",
              border: "4px solid #1a1a1a",
              borderRadius: 24,
              boxShadow: "8px 8px 0px #1a1a1a",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "3px solid #1a1a1a",
                paddingBottom: 16,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#1a1a1a",
                }}
              >
                AUDIT SCORE
              </span>
              <span
                style={{
                  backgroundColor: "#d4ff3f",
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 900,
                  border: "2px solid #1a1a1a",
                }}
              >
                TOP 5%
              </span>
            </div>
            <div
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: "#1a1a1a",
                marginBottom: 8,
              }}
            >
              9.4 <span style={{ fontSize: 24, color: "#888888" }}>/ 10</span>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#7c5cff",
                marginBottom: 16,
              }}
            >
              ✓ Lead photo &amp; bio hooks optimized
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#f0eee8",
                padding: "12px 16px",
                borderRadius: 12,
                border: "2px solid #1a1a1a",
                fontSize: 14,
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              &ldquo;Will cook you pasta from scratch on date 3...&rdquo;
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
