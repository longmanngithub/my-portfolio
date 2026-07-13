import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MyLMS | Case Study | Henglong Loeung",
  description:
    "A microservice-based learning management system for Paragon International University's English Preparatory Program, led as Project Manager for a 10-engineer team.",
}

export default function MyLmsLayout({ children }: { children: React.ReactNode }) {
  return children
}
