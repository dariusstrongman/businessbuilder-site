import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The working mark: a notched square with a check. */
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
          background: "#111214",
          borderRadius: 6,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5 6.5 12 13 4.5" stroke="#3dd68c" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
