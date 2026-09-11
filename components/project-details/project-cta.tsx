"use client"

import Link from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import MailOutlineIcon from "@mui/icons-material/MailOutlineRounded"
import { cn } from "@/lib/utils"

export function ProjectCTA({ className }: { className?: string }) {
  return (
    <section className={cn("max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center", className)}>
      <div className="relative rounded-3xl p-8 sm:p-12 bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/15 before:to-transparent">
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          Interested in Working Together?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          I'm always open to discussing microservice architectures, AI systems, and engineering leadership.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/#contact"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
          >
            <MailOutlineIcon style={{ fontSize: 16 }} />
            <span>Get In Touch</span>
          </Link>

          <Link
            href="/#projects"
            replace
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-secondary/80 hover:bg-secondary px-6 text-sm font-medium text-foreground transition-all active:scale-95 w-full sm:w-auto"
          >
            <ArrowBackIcon style={{ fontSize: 15 }} />
            <span>All Projects</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
