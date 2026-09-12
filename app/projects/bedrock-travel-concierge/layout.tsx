import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Bedrock - AI Travel Concierge | Case Study",
  description:
    "A multi-agent AI travel planner where seven CrewAI agents orchestrate to research, budget, and craft a grounded, personalized itinerary from a single conversation.",
  alternates: {
    canonical: "/projects/bedrock-travel-concierge",
  },
  openGraph: {
    type: "article",
    title: "Bedrock - AI Travel Concierge | Case Study | Henglong Loeung",
    description:
      "A multi-agent AI travel planner where seven CrewAI agents orchestrate to research, budget, and craft a grounded, personalized itinerary.",
    url: `${siteConfig.url}/projects/bedrock-travel-concierge`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Bedrock AI Travel Concierge Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bedrock - AI Travel Concierge | Case Study",
    description:
      "A multi-agent AI travel planner where seven CrewAI agents orchestrate to research and budget itineraries.",
    images: [siteConfig.ogImage],
  },
}

export default function BedrockLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CaseStudyJsonLd
        title="Bedrock - AI Travel Concierge"
        description="A multi-agent AI travel planner where seven CrewAI agents orchestrate to research, budget, and craft a grounded, personalized itinerary."
        slug="bedrock-travel-concierge"
        year="2026"
        technologies={["Python", "CrewAI", "Next.js", "PostgreSQL", "Google Gemini"]}
        githubUrl="https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge"
      />
      {children}
    </>
  )
}
