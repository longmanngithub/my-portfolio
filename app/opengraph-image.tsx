import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Henglong Loeung — Full-Stack & AI Software Engineer Portfolio"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#070b10",
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(15, 143, 143, 0.28), transparent 45%), radial-gradient(circle at 85% 85%, rgba(2, 132, 199, 0.25), transparent 50%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.7,
          }}
        />

        {/* Top bar: Domain + Availability Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: "18px",
              fontWeight: 500,
              color: "#38bdf8",
              letterSpacing: "0.02em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#38bdf8",
              }}
            />
            henglongloeung.vercel.app
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.28)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#4ade80",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#22c55e",
              }}
            />
            Available for New Opportunities
          </div>
        </div>

        {/* Main Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "relative",
            zIndex: 10,
            maxWidth: "1050px",
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            Henglong Loeung
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#94a3b8",
              lineHeight: 1.3,
            }}
          >
            Full-Stack &amp; AI Software Engineer · Project Manager
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#64748b",
              lineHeight: 1.4,
              maxWidth: "880px",
            }}
          >
            Building scalable microservice architectures, multi-agent AI systems,
            and high-performance web &amp; mobile platforms.
          </div>
        </div>

        {/* Bottom Bar: Tech Stack Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 10,
          }}
        >
          {[
            "Next.js",
            "Go",
            "Python",
            "PostgreSQL",
            "Microservices",
            "AI Multi-Agent",
            "RAG Search",
            "Paragon University",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "16px",
                fontWeight: 500,
                color: "#e2e8f0",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
