import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// @vercel/og needs the edge runtime here: on Node it resolves its font asset
// through import.meta.url, which fails when the project path contains spaces.
// This is the only non-static route in the app; Vercel caches the result at the
// edge, so it costs nothing on page load.
export const runtime = "edge";
export const alt = `${site.name} — study abroad consultants in Peshawar`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated OG card: navy ground, gold logo lockup, tagline.
 *
 * This route runs on the edge, where node:fs is unavailable, so it cannot use
 * lib/brandAssets.ts. Instead it probes the deployed URL for the icon mark and
 * only draws it when it really exists — a missing file would otherwise make
 * Satori throw and break the whole card.
 */
async function resolveIconUrl(): Promise<string | null> {
  // The card background is navy, so the gold mark is the correct contrast pick.
  const url = `${site.url}${site.logo.markOnDark}`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok ? url : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const iconUrl = await resolveIconUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #071638 0%, #0B1F4E 50%, #132C63 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* gold swoosh */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            // Satori renders `opacity` as a flat alpha that muddies gold to
            // grey against navy — tint the border colour directly instead.
            border: "26px solid rgba(245,166,35,0.30)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "#F5A623",
            display: "flex",
          }}
        />

        {/* lockup */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {iconUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconUrl}
              alt=""
              width={116}
              height={116}
              style={{ marginBottom: 30, objectFit: "contain" }}
            />
          )}
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 6,
              lineHeight: 1,
              display: "flex",
            }}
          >
            READING
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 18,
            }}
          >
            <div style={{ width: 48, height: 4, background: "#F5A623", display: "flex" }} />
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                color: "#F5A623",
                letterSpacing: 10,
                display: "flex",
              }}
            >
              STUDY ABROAD
            </div>
            <div style={{ width: 48, height: 4, background: "#F5A623", display: "flex" }} />
          </div>

          <div
            style={{
              marginTop: 48,
              fontSize: 38,
              color: "#FFC15E",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            {site.tagline}
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 26,
              color: "rgba(255,255,255,0.72)",
              display: "flex",
            }}
          >
            UK · Europe · Turkey · South Korea — from Hayatabad, Peshawar
          </div>
        </div>
      </div>
    ),
    size,
  );
}
