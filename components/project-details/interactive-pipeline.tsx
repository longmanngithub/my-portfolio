"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface PipelineStep {
  step?: string | number
  title: string
  description?: string
  detail?: string
}

interface InteractivePipelineProps {
  sectionLabel?: string
  title: string
  description?: string
  steps: PipelineStep[]
  className?: string
}

export function InteractivePipeline({
  sectionLabel = "Architecture & Flow",
  title,
  description,
  steps,
  className,
}: InteractivePipelineProps) {
  const [activeStep, setActiveStep] = useState(0)

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {steps.map((item, index) => {
          const stepNum = item.step ? String(item.step).padStart(2, "0") : String(index + 1).padStart(2, "0")
          const text = item.description || item.detail || ""
          const isSelected = activeStep === index

          return (
            <motion.div
              key={item.title}
              onClick={() => setActiveStep(index)}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl p-5 cursor-pointer text-left transition-all duration-300",
                "border",
                isSelected
                  ? "border-primary/40 bg-card shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
                  : "border-black/[0.06] dark:border-white/[0.08] bg-card/60 dark:bg-card/40 hover:bg-card/90",
                "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold tracking-wider transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary"
                    )}
                  >
                    {stepNum}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-300",
                      isSelected ? "bg-primary scale-125" : "bg-muted-foreground/20 group-hover:bg-muted-foreground/50"
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    "text-sm sm:text-base font-bold tracking-tight transition-colors duration-200",
                    isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                  )}
                >
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {text}
                </p>
              </div>

              {/* Bottom active accent rail */}
              <div
                className={cn(
                  "mt-4 h-0.5 w-full rounded-full transition-all duration-300",
                  isSelected ? "bg-primary" : "bg-transparent"
                )}
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
