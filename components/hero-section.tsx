"use client"

import { useEffect, useRef, useState } from "react"
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import { Button } from "@/components/ui/button"
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

export function HeroSection() {
  return (
    <section id="home" className="scroll-mt-28">
      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
        Junior Software
        <br />
        Engineer
      </h1>

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
        <a href={assetUrl("/Henglong-Loeung_CV.pdf")} download="Henglong-Loeung_CV.pdf">
          <Button className="group h-11 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90">
            Download CV
            <DownloadRoundedIcon
              style={{ fontSize: 18 }}
              className="ml-1.5 transition-transform group-hover:translate-y-0.5"
            />
          </Button>
        </a>
      </div>
    </section>
  )
}
