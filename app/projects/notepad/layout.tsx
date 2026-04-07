import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NotePad | Case Study | Henglong Loeung",
  description: "My very first project — a Windows Notepad replica built with Python and PyQt5 in late 2023, before I started university. Where my Computer Science journey began.",
}

export default function NotepadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
