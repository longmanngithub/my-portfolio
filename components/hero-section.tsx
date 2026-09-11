"use client"

import { useEffect, useRef, useState } from "react"
import { AmicroDownloadLink } from "@/components/ui/amicro-link-buttons"
import { assetUrl } from "@/lib/assets"

// Placeholder stats — edit these to your real numbers.
const stats = [
  { value: "3+", label: "Years Coding" },
  { value: "10+", label: "Projects Built" },
  { value: "20+", label: "Technologies" },
]

const COUNT_DURATION = 1400

/** Counts up from 0 to the numeric part of `value` once it scrolls into
 *  view, keeping any non-numeric suffix (e.g. the "+") static. */
function StatValue({ value }: { value: string }) {
  const target = parseInt(value, 10)
  const suffix = value.slice(String(target).length)
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || Number.isNaN(target)) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target)
      return
    }

    let raf = 0
    const animate = () => {
      const start = performance.now()
      const from = 0
      const tick = (now: number) => {
        const t = Math.min((now - start) / COUNT_DURATION, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(Math.round(from + (target - from) * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate()
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary tabular-nums">
      {Number.isNaN(target) ? value : display}
      {suffix}
    </div>
  )
}

const TITLES = [
  "Junior Software Engineer",
  "Full-Stack Developer",
  "AI & Backend Engineer",
  "Microservice & Cloud Builder",
  "Software Engineer & Tech Lead",
]

function TypewriterTitle() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(media.matches)
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentText(TITLES[0])
      return
    }

    const fullText = TITLES[titleIndex]

    if (isPaused) {
      const pauseDuration = isDeleting ? 420 : 2200
      const timeout = setTimeout(() => {
        setIsPaused(false)
        if (isDeleting) {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % TITLES.length)
        } else {
          setIsDeleting(true)
        }
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        // Human-paced typing with subtle variation
        const delay = 45 + Math.random() * 35
        const timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        }, delay)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, pause to let the visitor read
        setIsPaused(true)
      }
    } else {
      if (currentText.length > 0) {
        // Fast, smooth backspacing
        const delay = 24 + Math.random() * 15
        const timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1))
        }, delay)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, brief pause before next word
        setIsPaused(true)
      }
    }
  }, [currentText, isDeleting, isPaused, titleIndex, prefersReducedMotion])

  const targetTitle = TITLES[titleIndex]

  return (
    <h1
      className="block font-display text-4xl font-bold leading-[1.12] tracking-[-0.03em] text-foreground min-h-[2.4em] sm:min-h-[2.2em] sm:text-5xl md:text-6xl lg:text-7xl"
      aria-label={targetTitle}
    >
      <span className="sr-only">{targetTitle}</span>
      <span aria-hidden="true" className="inline">
        {currentText}
        <span
          className="ml-1.5 inline-block h-[0.82em] w-[3px] shrink-0 rounded-full bg-primary align-baseline md:ml-2 md:w-[4.5px]"
          style={{
            animation: isPaused
              ? "cursor-blink 1s step-end infinite"
              : "none",
            opacity: 1,
          }}
        />
      </span>
    </h1>
  )
}

export function HeroSection() {
  return (
    <section id="home" className="scroll-mt-28">
      <TypewriterTitle />

      <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
        Crafting clean interfaces and solid backends. I lead teams building
        microservice architectures and AI-powered systems across web,
        mobile, and a little bit of IoT, turning ideas into things people
        can actually use.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
        {stats.map((s) => (
          <div key={s.label}>
            <StatValue value={s.value} />
            <div className="mt-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AmicroDownloadLink
          href={assetUrl("/Henglong-Loeung_CV.pdf")}
          download="Henglong-Loeung_CV.pdf"
          className="h-11 px-6 font-medium"
        >
          Download CV
        </AmicroDownloadLink>
      </div>
    </section>
  )
}
