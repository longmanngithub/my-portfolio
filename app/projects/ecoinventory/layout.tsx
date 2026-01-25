import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "EcoInventory | Case Study | Henglong Loeung",
  description: "E-Commerce inventory management system built using Laravel technology for both frontend and backend using API as a central system.",
}

export default function FitnessAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
