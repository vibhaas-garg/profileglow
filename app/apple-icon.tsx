import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 108,
          background: "#7c5cff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          borderRadius: 36,
          border: "8px solid #1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
