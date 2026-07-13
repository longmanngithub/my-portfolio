"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Full-Stack Development",
    description:
      "Building responsive, scalable web apps with clean UI and solid backend architecture — from database to deployment.",
  },
  {
    title: "System Design & Architecture",
    description:
      "Designing microservice-based systems that scale cleanly, with clear boundaries between services.",
  },
  {
    title: "DevOps & Cloud",
    description:
      "Deploying projects to the cloud and maintaining CI/CD pipelines that keep releases fast and reliable.",
  },
  {
    title: "IoT & Embedded",
    description:
      "Connected hardware wired to real backends — sensors, firmware, and realtime sync that just works.",
  },
  {
    title: "AI & Agentic Systems",
    description:
      "Designing multi-agent AI systems with LLM orchestration, retrieval-augmented generation, and semantic search.",
  },
  {
    title: "Project Leadership",
    description:
      "Planning sprints, coordinating cross-functional engineering teams, and shipping production systems with Agile Scrum.",
  },
]

export function ServicesSection() {
  // On touch devices there's no hover, so tapping a card toggles its
  // description directly; desktop keeps the CSS hover flip.
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="services" className="scroll-mt-28">
      <h2 className="section-label mb-6">What Can I Do?</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service, i) => {
          const isOpen = openIndex === i
          return (
            <button
              key={service.title}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group relative h-[190px] w-full overflow-hidden rounded-2xl bg-card text-left [perspective:1000px] shadow-[0_0_0_2px_rgba(15,143,143,0.22)] transition-all duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.04] hover:shadow-[0_14px_30px_rgba(15,143,143,0.2)]"
            >
              {/* base state — title centered */}
              <div className="flex h-full w-full items-center justify-center px-4">
                <h3 className="text-center text-[22px] font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
              </div>

              {/* hover/tap state — flips up from the bottom edge */}
              <div
                className={cn(
                  "absolute inset-0 flex origin-bottom flex-col items-center justify-center bg-card p-6 text-center [transform:rotateX(-90deg)] transition-transform duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:[transform:rotateX(0deg)]",
                  isOpen && "[transform:rotateX(0deg)]"
                )}
              >
                <p className="text-[17px] font-semibold tracking-tight text-foreground">
                  {service.title}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
