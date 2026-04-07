import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Hand Interaction System | Case Study | Henglong Loeung",
  description: "A real-time 3D particle simulation controlled by hand gestures via webcam, built with Three.js and Google MediaPipe.",
}

export default function AIHandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
