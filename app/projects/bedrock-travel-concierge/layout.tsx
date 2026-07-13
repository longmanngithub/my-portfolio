import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedrock - AI Travel Concierge | Case Study | Henglong Loeung",
  description:
    "A multi-agent AI travel planner where seven CrewAI agents orchestrate to research, budget, and craft a grounded, personalized itinerary.",
}

export default function BedrockLayout({ children }: { children: React.ReactNode }) {
  return children
}
