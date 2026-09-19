import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF7C00 0%, #FF5100 100%)",
          borderRadius: "12px",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "22px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 4px 12px rgba(255, 106, 0, 0.4)",
          letterSpacing: "-0.5px",
        }}
      >
        IP
      </div>
    ),
    {
      ...size,
    }
  );
}
