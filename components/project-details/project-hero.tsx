"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ProjectHeroProps {
  category?: string
  year: string
  title: string
  titleAccent?: string
  description: string
  glowColor?: string
  urlLabel?: string
  children: React.ReactNode
}

export function ProjectHero({
  category = "Case Study",
  year,
  title,
  titleAccent,
  description,
  glowColor = "rgba(15, 143, 143, 0.2)",
  urlLabel,
  children,
}: ProjectHeroProps) {
  return (
    <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Dynamic atmospheric radial background */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 -z-10 h-[480px] w-full max-w-4xl opacity-50 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${glowColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header Content */}
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 font-mono text-[11px] font-medium text-primary backdrop-blur-md">
            <span>{category}</span>
            <span className="text-primary/40">•</span>
            <span>{year}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-foreground">
            {title} {titleAccent && <span className="text-primary">{titleAccent}</span>}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
            {description}
          </p>
        </div>

        {/* Apple Display Canvas Frame */}
        <div className="relative mt-8 sm:mt-12">
          {/* Ambient rim glow */}
          <div
            className="pointer-events-none absolute -inset-2 sm:-inset-4 -z-10 rounded-3xl opacity-60 blur-2xl transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${glowColor}, transparent 75%)`,
            }}
            aria-hidden="true"
          />

          <div
            className={cn(
              "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden",
              "border border-black/[0.08] dark:border-white/[0.12]",
              "bg-card text-card-foreground",
              "shadow-[0_24px_50px_-16px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]",
              "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-30 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 dark:before:via-white/20 before:to-transparent"
            )}
          >
            {/* Minimalist Floating Address / Status Bar */}
            {urlLabel && (
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary/40 border-b border-black/[0.05] dark:border-white/[0.08]">
                <div className="flex items-center gap-1.5 opacity-60">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-background/60 border border-black/[0.06] dark:border-white/[0.08] px-3 py-0.5 text-[10px] sm:text-xs text-muted-foreground font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{urlLabel}</span>
                </div>
                <div className="w-10 opacity-0" aria-hidden="true" />
              </div>
            )}

            {/* Media canvas */}
            <div className="relative w-full overflow-hidden bg-secondary/30">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
