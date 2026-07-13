"use client"

import { useEffect, useMemo, useRef, type CSSProperties } from "react"

import { TECH_STACK, resolveIcon, type Tech } from "@/lib/tech-stack"

/* On a light canvas, darken any near-white brand marks so they stay visible. */
function displayHex(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 225 ? "10233b" : hex
}

function TechGlyph({ slug, className }: { slug: string; className?: string }) {
  const icon = resolveIcon(slug)
  if (!icon) return null
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={`#${displayHex(icon.hex)}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}

export function TechStackSection() {
  return (
    <section id="tech" className="scroll-mt-28">
      <h2 className="section-label mb-8">Tech Stack</h2>

      <FloatingLogoCloud />

      <TechCarousel />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3D tag cloud — Fibonacci sphere, rAF, tap-to-center focus           */
/* ------------------------------------------------------------------ */

const BASE_YAW = 0.1 // rad/s idle spin (eased down for a calmer feel)
const MAX_POINTER = 1.25 // rad/s at cursor edge
const APPROACH = 3 // velocity easing rate (gentler ramp)
const FOCUS_MS = 950 // tap-to-center animation duration

function FloatingLogoCloud() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const yaw = useRef(0)
  const pitch = useRef(0.32)
  const velYaw = useRef(BASE_YAW)
  const velPitch = useRef(0)

  const hovering = useRef(false)
  const pointer = useRef<{ dx: number; dy: number } | null>(null)
  const touch = useRef<{ x: number; y: number; startX: number; startY: number; moved: number; t: number } | null>(null)

  // tap-to-center focus animation
  const focusing = useRef(false)
  const focusStart = useRef(0)
  const focusFrom = useRef({ yaw: 0, pitch: 0 })
  const focusTo = useRef({ yaw: 0, pitch: 0 })

  const running = useRef(true)
  const radiusX = useRef(240)
  const radiusY = useRef(180)
  const depth = useRef(160)
  const sizeScale = useRef(1)
  const reduced = useRef(false)

  const points = useMemo(() => {
    const n = TECH_STACK.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return TECH_STACK.map((tech, i) => {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      return { tech, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
    })
  }, [])

  const measure = useRef(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const min = Math.min(w, h)
    // Ellipsoidal spread so the sphere fills the (often wide) canvas.
    radiusX.current = w * 0.4
    radiusY.current = h * 0.42
    depth.current = min * 0.34
    sizeScale.current = Math.min(Math.max(min / 440, 0.55), 1.15)
  }).current

  const rotate = (p: { x: number; y: number; z: number }, y: number, pt: number) => {
    const cy = Math.cos(y)
    const sy = Math.sin(y)
    const cp = Math.cos(pt)
    const sp = Math.sin(pt)
    const x1 = p.x * cy - p.z * sy
    const z1 = p.x * sy + p.z * cy
    const y2 = p.y * cp - z1 * sp
    const z2 = p.y * sp + z1 * cp
    return { x: x1, y: y2, z: z2 }
  }

  const render = useRef(() => {
    const RX = radiusX.current
    const RY = radiusY.current
    const D = depth.current
    const S = sizeScale.current
    for (const p of points) {
      const el = chipRefs.current.get(p.tech.key)
      if (!el) continue
      const r = rotate(p, yaw.current, pitch.current)
      const depthFactor = (r.z + 1) / 2
      const scale = (0.62 + depthFactor * 0.52) * S
      el.style.transform = `translate(-50%, -50%) translate3d(${r.x * RX}px, ${r.y * RY}px, ${r.z * D}px) scale(${scale})`
      el.style.opacity = (0.32 + depthFactor * 0.68).toFixed(3)
      el.style.zIndex = String(Math.round(depthFactor * 1000))
    }
  }).current

  // Bring the tapped tech to the front-center.
  const focusNearest = (clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = clientX - rect.left - rect.width / 2
    const cy = clientY - rect.top - rect.height / 2
    const RX = radiusX.current
    const RY = radiusY.current

    // Nearest node in screen space — considers every node (front, back, side)
    // so a tap anywhere brings that tech to the center.
    let best: (typeof points)[number] | null = null
    let bestDist = Infinity
    for (const p of points) {
      const r = rotate(p, yaw.current, pitch.current)
      const dx = r.x * RX - cx
      const dy = r.y * RY - cy
      // slight bias toward front nodes so overlapping picks feel natural,
      // but back nodes remain fully selectable
      const d = dx * dx + dy * dy - r.z * 260
      if (d < bestDist) {
        bestDist = d
        best = p
      }
    }
    if (!best) return

    // absolute angles that rotate this point to (0,0,1)
    const targetYaw = Math.atan2(best.x, best.z)
    const targetPitch = Math.atan2(best.y, Math.sqrt(best.x * best.x + best.z * best.z))
    const norm = (d: number) => {
      const twoPi = Math.PI * 2
      const n = ((d % twoPi) + twoPi) % twoPi
      return n > Math.PI ? n - twoPi : n
    }
    focusFrom.current = { yaw: yaw.current, pitch: pitch.current }
    focusTo.current = {
      yaw: yaw.current + norm(targetYaw - yaw.current),
      pitch: pitch.current + norm(targetPitch - pitch.current),
    }
    focusStart.current = performance.now()
    focusing.current = true
  }

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    measure()
    render()
    if (reduced.current) return

    let last = performance.now()
    let raf = 0
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const frame = (now: number) => {
      let dt = (now - last) / 1000
      last = now
      raf = requestAnimationFrame(frame)
      if (!running.current) return
      if (dt > 0.05) dt = 0.05

      if (focusing.current) {
        const t = Math.min((now - focusStart.current) / FOCUS_MS, 1)
        const e = easeOut(t)
        yaw.current = focusFrom.current.yaw + (focusTo.current.yaw - focusFrom.current.yaw) * e
        pitch.current = focusFrom.current.pitch + (focusTo.current.pitch - focusFrom.current.pitch) * e
        if (t >= 1) {
          focusing.current = false
          velYaw.current = 0
          velPitch.current = 0
        }
      } else if (!touch.current) {
        let tgtYaw: number
        let tgtPitch: number
        if (hovering.current && pointer.current) {
          tgtYaw = pointer.current.dx * MAX_POINTER
          tgtPitch = -pointer.current.dy * MAX_POINTER
        } else {
          tgtYaw = BASE_YAW
          tgtPitch = Math.sin(now * 0.0003) * 0.12
        }
        const a = 1 - Math.exp(-APPROACH * dt)
        velYaw.current += (tgtYaw - velYaw.current) * a
        velPitch.current += (tgtPitch - velPitch.current) * a
        yaw.current += velYaw.current * dt
        pitch.current += velPitch.current * dt
      }
      render()
    }
    raf = requestAnimationFrame(frame)

    const onResize = () => {
      measure()
      render()
    }
    window.addEventListener("resize", onResize)

    const io = new IntersectionObserver(
      ([entry]) => {
        running.current = entry.isIntersecting && !document.hidden
        last = performance.now()
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) io.observe(containerRef.current)

    const onVis = () => {
      running.current =
        !document.hidden &&
        !!containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom > 0
      last = performance.now()
    }
    document.addEventListener("visibilitychange", onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
      io.disconnect()
    }
  }, [measure, points, render])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[4/5] sm:aspect-[4/3] min-h-[520px] sm:min-h-[680px] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_rgba(16,35,59,0.06)] touch-none cursor-pointer"
      style={{ perspective: "1100px" }}
      onClick={(e) => focusNearest(e.clientX, e.clientY)}
      onMouseMove={(e) => {
        const el = containerRef.current
        if (!el) return
        hovering.current = true
        const rect = el.getBoundingClientRect()
        pointer.current = {
          dx: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
          dy: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        }
      }}
      onMouseLeave={() => {
        hovering.current = false
        pointer.current = null
      }}
      onTouchStart={(e) => {
        const t = e.touches[0]
        touch.current = { x: t.clientX, y: t.clientY, startX: t.clientX, startY: t.clientY, moved: 0, t: performance.now() }
      }}
      onTouchMove={(e) => {
        if (!touch.current) return
        const t = e.touches[0]
        const ddx = t.clientX - touch.current.x
        const ddy = t.clientY - touch.current.y
        touch.current.moved += Math.abs(ddx) + Math.abs(ddy)
        yaw.current += ddx * 0.006
        pitch.current += -ddy * 0.006
        touch.current.x = t.clientX
        touch.current.y = t.clientY
        render()
      }}
      onTouchEnd={() => {
        const tc = touch.current
        touch.current = null
        if (tc && tc.moved < 10 && performance.now() - tc.t < 350) {
          focusNearest(tc.startX, tc.startY)
        } else {
          velYaw.current = BASE_YAW
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(15,143,143,0.08),transparent_62%)]" />

      {points.map((p) => (
        <div
          key={p.tech.key}
          ref={(el) => {
            if (el) chipRefs.current.set(p.tech.key, el)
            else chipRefs.current.delete(p.tech.key)
          }}
          className="absolute left-1/2 top-1/2 grid place-items-center will-change-transform"
          style={{
            width: p.tech.size,
            height: p.tech.size,
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          <TechGlyph slug={p.tech.slug} className="h-[62%] w-[62%]" />
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        hover · tap to center
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Auto carousel — seamless CSS marquee, label under each tech         */
/* ------------------------------------------------------------------ */

function CarouselItem({ tech }: { tech: Tech }) {
  return (
    <div className="flex w-[108px] shrink-0 flex-col items-center gap-2.5 px-2">
      <TechGlyph slug={tech.slug} className="h-8 w-8 transition-transform duration-300 hover:-translate-y-1" />
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {tech.label}
      </span>
    </div>
  )
}

function TechCarousel() {
  const duration = `${Math.max(TECH_STACK.length * 3.2, 40)}s`
  const loop = [...TECH_STACK, ...TECH_STACK]

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Everything in orbit
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="marquee-mask overflow-hidden py-2">
        <div
          className="flex w-max animate-marquee"
          style={{ "--marquee-duration": duration } as CSSProperties}
        >
          {loop.map((tech, i) => (
            <CarouselItem key={`${tech.key}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  )
}
