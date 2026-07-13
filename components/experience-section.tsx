"use client"

type Entry = {
  role: string
  company: string
  period: string
  bullets: string[]
}

const timeline: Entry[] = [
  {
    role: "Project Manager",
    company: "MyLMS & STEM-ArKH+",
    period: "2025 – Present",
    bullets: [
      "Leading two cross-functional engineering teams (10 and 13 members) building microservice-based platforms from architecture to production",
      "Planning sprint scope, timelines, and risk across both projects using Agile Scrum",
      "Coordinating stakeholder communication, deployment pipelines, and cross-service integration",
    ],
  },
  {
    role: "BSc in Computer Science",
    company: "Paragon International University",
    period: "2023 – Present",
    bullets: [
      "Studying software engineering, cloud computing, and system design",
      "Shipping real full-stack and IoT projects alongside coursework",
      "Focused on clean architecture and maintainable, scalable code",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28">
      <h2 className="section-label mb-8">Experience</h2>

      <ol className="relative">
        {timeline.map((entry, i) => (
          <li key={entry.company} className="relative pb-10 pl-10 last:pb-0">
            {/* dashed connector */}
            {i < timeline.length - 1 && (
              <span className="absolute bottom-1 left-[7px] top-5 border-l-2 border-dashed border-primary/40" />
            )}
            {/* node */}
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/15" />

            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {entry.role}
            </h3>
            <p className="mt-1 font-semibold text-primary">{entry.company}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{entry.period}</p>

            <ul className="mt-3 space-y-2">
              {entry.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
