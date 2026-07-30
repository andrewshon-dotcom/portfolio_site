import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#10131f",
        color: "#f4eadb",
        border: "10px solid #b7a4ff",
        borderRadius: 42,
        fontSize: 70,
        fontWeight: 800,
        letterSpacing: -5,
      }}
    >
      AS
    </div>,
    size,
  );
}
