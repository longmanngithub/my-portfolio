"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    )
    window.location.href = `mailto:henglong0000@gmail.com?subject=${subject}&body=${body}`
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50"

  return (
    <section id="contact" className="scroll-mt-28">
      <h2 className="section-label mb-6">Get In Touch</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm interested in working with you!"
            className={`${fieldClass} resize-y`}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-11 rounded-full bg-primary px-8 font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
          >
            Send
          </Button>
        </div>
      </form>
    </section>
  )
}
