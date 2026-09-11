"use client"

import GroupsIcon from "@mui/icons-material/Groups"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import MemoryIcon from "@mui/icons-material/Memory"
import { cn } from "@/lib/utils"

interface BentoVitalsProps {
  role: string
  roleDetail?: string
  timeline: string
  methodology?: string
  architecture: string
  architectureDetail?: string
  techStack: (string | { name: string; category?: string })[]
  className?: string
}

export function BentoVitals({
  role,
  roleDetail,
  timeline,
  methodology,
  architecture,
  architectureDetail,
  techStack,
  className,
}: BentoVitalsProps) {
  const normalizedTech = techStack.map((item) =>
    typeof item === "string" ? { name: item } : item
  )

  return (
    <section className={cn("max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Tile 1: Role & Team */}
        <div
          className={cn(
            "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
            "bg-card/80 dark:bg-card/50 backdrop-blur-xl",
            "border border-black/[0.06] dark:border-white/[0.08]",
            "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <GroupsIcon style={{ fontSize: 18 }} className="text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">
              Role & Leadership
            </span>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              {role}
            </h3>
            {roleDetail && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {roleDetail}
              </p>
            )}
          </div>
        </div>

        {/* Tile 2: Timeline & Cadence */}
        <div
          className={cn(
            "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
            "bg-card/80 dark:bg-card/50 backdrop-blur-xl",
            "border border-black/[0.06] dark:border-white/[0.08]",
            "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <CalendarMonthIcon style={{ fontSize: 18 }} className="text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">
              Timeline & Context
            </span>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              {timeline}
            </h3>
            {methodology && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {methodology}
              </p>
            )}
          </div>
        </div>

        {/* Tile 3: Architecture & Model */}
        <div
          className={cn(
            "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
            "bg-card/80 dark:bg-card/50 backdrop-blur-xl",
            "border border-black/[0.06] dark:border-white/[0.08]",
            "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <AccountTreeIcon style={{ fontSize: 18 }} className="text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">
              Architecture
            </span>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              {architecture}
            </h3>
            {architectureDetail && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {architectureDetail}
              </p>
            )}
          </div>
        </div>

        {/* Tile 4: Core Tech Stack */}
        <div
          className={cn(
            "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
            "bg-card/80 dark:bg-card/50 backdrop-blur-xl",
            "border border-black/[0.06] dark:border-white/[0.08]",
            "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
          )}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MemoryIcon style={{ fontSize: 18 }} className="text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">
              Key Technologies
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {normalizedTech.slice(0, 6).map((tech) => (
              <span
                key={tech.name}
                className="inline-flex rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-medium text-foreground/85 border border-black/[0.03] dark:border-white/[0.05]"
              >
                {tech.name}
              </span>
            ))}
            {normalizedTech.length > 6 && (
              <span className="inline-flex rounded-md bg-secondary/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{normalizedTech.length - 6}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
