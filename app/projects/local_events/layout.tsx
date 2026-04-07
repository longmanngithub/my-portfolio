import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Local Event Discovery Platform | Case Study | Henglong Loeung",
  description: "Inherited a multi-app Laravel event platform, fixed critical bugs, redesigned the UI, and deployed to DigitalOcean — CS 426: Cloud Computing at Paragon International University",
}

export default function LocalEventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
