"use client"

import type { SvgIconComponent } from "@mui/icons-material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { cn } from "@/lib/utils"

export type FeatureItem = string | {
  title: string
  description?: string
  icon?: SvgIconComponent
}

interface FeatureGridProps {
  sectionLabel?: string
  title?: string
  description?: string
  features: FeatureItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGrid({
  sectionLabel = "Capabilities",
  title = "Core Features",
  description,
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  const colClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns]

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

      <div className={cn("grid grid-cols-1 gap-3 sm:gap-4", colClasses)}>
        {features.map((item, index) => {
          const isString = typeof item === "string"
          const titleText = isString ? item : item.title
          const descText = !isString ? item.description : undefined
          const Icon = !isString && item.icon ? item.icon : CheckCircleIcon

          return (
            <div
              key={index}
              className={cn(
                "relative flex items-start gap-3.5 rounded-2xl p-4 sm:p-5",
                "bg-card/75 dark:bg-card/50 backdrop-blur-xl",
                "border border-black/[0.06] dark:border-white/[0.08]",
                "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
                "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent",
                "transition-all duration-300"
              )}
            >
              <div className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon style={{ fontSize: 18 }} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-[-0.01em]">
                  {titleText}
                </h3>
                {descText && (
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {descText}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
