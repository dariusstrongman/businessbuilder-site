import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card, drawn from the same palette and vocabulary as the site. */
export default function OpenGraphImage() {
  const stages = ["Idea", "Understand", "Research", "Recommend", "Approve", "Build", "Founder Actions", "Verify", "Ready", "Fully Set", "Handoff", "Run"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f2",
          color: "#111214",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: -0.4 }}>
          <div style={{ width: 22, height: 22, background: "#111214", borderRadius: 3, display: "flex" }} />
          <div style={{ display: "flex" }}>{brand.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.03, letterSpacing: -2.4, maxWidth: 900 }}>
            Describe the company you want.
          </div>
          <div style={{ display: "flex", fontSize: 38, lineHeight: 1.15, letterSpacing: -1, color: "#3a3d44", maxWidth: 860 }}>
            We build it, verify it, and hand you the keys.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
            {stages.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 999,
                    background: i === 4 || i === 6 || i === 10 ? "#f7f6f2" : i >= 8 ? "#0f6b4c" : "#111214",
                    border: i === 4 || i === 6 || i === 10 ? "3px solid #0f6b4c" : "3px solid transparent",
                    display: "flex",
                  }}
                />
                {i < stages.length - 1 ? <div style={{ flex: 1, height: 2, background: "#c9c6bc", display: "flex" }} /> : null}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#52555d", letterSpacing: 1.4 }}>
            <div style={{ display: "flex" }}>IDEA</div>
            <div style={{ display: "flex" }}>APPROVE</div>
            <div style={{ display: "flex" }}>BUILD</div>
            <div style={{ display: "flex" }}>VERIFY</div>
            <div style={{ display: "flex", color: "#0f6b4c" }}>FULLY SET</div>
            <div style={{ display: "flex" }}>HANDOFF</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
