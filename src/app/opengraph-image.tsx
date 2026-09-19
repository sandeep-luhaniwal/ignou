import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "IGNOU Power - Solved Assignments & Academic Support";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141B2C",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,106,0,0.25) 0%, rgba(20,27,44,0) 70%)",
          }}
        />

        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #FF7C00 0%, #FF5100 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "30px",
              boxShadow: "0 8px 20px rgba(255, 106, 0, 0.4)",
            }}
          >
            IP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>
              IGNOU <span style={{ color: "#FF6A00" }}>POWER</span>
            </span>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "2px" }}>
              Academic Excellence Partner
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            100% Accurate <span style={{ color: "#FF7C00" }}>IGNOU Solved Assignments</span> & Projects 2025-26
          </div>
          <div style={{ fontSize: "22px", color: "#CBD5E1", lineHeight: 1.4 }}>
            Instant PDF Downloads • Neat Handwritten Hardcopies Delivered to Your Doorstep • MBA/BCA Projects
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div style={{ display: "flex", gap: "24px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "12px 24px",
              borderRadius: "14px",
              color: "#FFBB00",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            ★ 4.9/5 Student Rating
          </div>
          <div
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "12px 24px",
              borderRadius: "14px",
              color: "#34D399",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            ✓ 100% Guaranteed Solutions
          </div>
          <div
            style={{
              background: "rgba(255, 106, 0, 0.15)",
              border: "1px solid rgba(255, 106, 0, 0.3)",
              padding: "12px 24px",
              borderRadius: "14px",
              color: "#FB923C",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            ⚡ Instant Download
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
