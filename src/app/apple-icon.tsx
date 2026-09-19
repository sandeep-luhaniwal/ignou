import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #141B2C 0%, #0F172A 100%)",
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,106,0,0.35) 0%, rgba(255,106,0,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "110px",
            height: "110px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #FF7C00 0%, #FF5100 100%)",
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "54px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            boxShadow: "0 10px 25px rgba(255, 106, 0, 0.45)",
          }}
        >
          IP
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
