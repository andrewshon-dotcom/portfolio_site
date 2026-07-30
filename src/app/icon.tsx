import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
        border: "4px solid #b7a4ff",
        borderRadius: 16,
        fontSize: 25,
        fontWeight: 800,
        letterSpacing: -2,
      }}
    >
      AS
    </div>,
    size,
  );
}
