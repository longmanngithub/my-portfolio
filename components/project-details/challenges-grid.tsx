"use client"

import type { SvgIconComponent } from "@mui/icons-material"
import ConstructionIcon from "@mui/icons-material/Construction"
import { cn } from "@/lib/utils"

export interface ChallengeItem {
  title: string
  problem?: string
  solution?: string
  description?: string
  icon?: SvgIconComponent
}

interface ChallengesGridProps {
  sectionLabel?: string
  title?: string
  description?: string
  challenges: ChallengeItem[]
  className?: string
}

export function ChallengesGrid({
  sectionLabel = "Technical Deep Dive",
  title = "Challenges & Engineering Solutions",
  description,
  challenges,
  className,
}: ChallengesGridProps) {
  return (
    <section className={cn("max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16", className)}>
      <div className="mb-8 sm:mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
          {sectionLabel}
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4 sm:space-y-5">
        {challenges.map((item) => {
          const Icon = item.icon || ConstructionIcon

          return (
            <div
              key={item.title}
              className={cn(
                "relative rounded-2xl p-5 sm:p-6",
                "bg-card/75 dark:bg-card/50 backdrop-blur-xl",
                "border border-black/[0.06] dark:border-white/[0.08]",
                "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
                "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent",
                "transition-all duration-300"
              )}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon style={{ fontSize: 20 }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
                      {item.problem && (
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
                            The Challenge
                          </span>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.problem}
                          </p>
                        </div>
                      )}

                      {item.solution && (
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold text-primary">
                            Architectural Solution
                          </span>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
