import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Scan2Attend | Case Study | Henglong Loeung",
  description: "An IoT-powered classroom attendance system using ESP32, fingerprint scanning, Laravel backend, and Nuxt.js frontend — CS 397: Internet of Everything at Paragon International University",
}

export default function Scan2AttendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
