"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import * as Icons from "simple-icons"

import { useLanguage } from "@/lib/language-context"

type LogoKey =
  | "html"
  | "css"
  | "js"
  | "ts"
  | "react"
  | "next"
  | "tailwind"
  | "python"
  | "node"
  | "docker"
  | "postgres"
  | "git"
  | "figma"
  | "tensorflow"
  | "spring"
  | "cpp"
  | "java"

type LogoItem = {
  key: LogoKey
  size: number
  base?: { x: number; y: number; z: number }
}

const floatingLogos: LogoItem[] = [
  { key: "html", size: 110 },
  { key: "css", size: 105 },
  { key: "js", size: 110 },
  { key: "ts", size: 105 },
  { key: "react", size: 100 },
  { key: "next", size: 95 },
  { key: "tailwind", size: 100 },
  { key: "python", size: 105 },
  { key: "node", size: 100 },
  { key: "docker", size: 100 },
  { key: "postgres", size: 105 },
  { key: "git", size: 100 },
  { key: "figma", size: 100 },
  { key: "tensorflow", size: 100 },
  { key: "spring", size: 100 },
  { key: "cpp", size: 105 },
  { key: "java", size: 105 },
]

const techItems = {
  languages: [
    { name: "C++", proficiency: 70 },
    { name: "Python", proficiency: 75 },
    { name: "PHP", proficiency: 65 },
    { name: "JavaScript", proficiency: 70 },
    { name: "TypeScript", proficiency: 80 },
    { name: "Dart", proficiency: 50 },
  ],
  frameworks: [
    { name: "Expo", proficiency: 85 },
    { name: "Flutter", proficiency: 65 },
    { name: "Docker", proficiency: 80 },
    { name: "Git", proficiency: 95 },
    { name: "MySQL", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 75 },
  ],
  other: [
    { name: "Convex", proficiency: 80 },
    { name: "ESP32", proficiency: 50 },
    { name: "REST APIs", proficiency: 90 },
    { name: "DigitalOcean", proficiency: 80 },
  ],
}

export function TechStackSection() {
  const { t } = useLanguage()

  const techCategories = [
    { title: t("tech.languages"), items: techItems.languages },
    { title: t("tech.frameworks"), items: techItems.frameworks },
    { title: t("tech.other"), items: techItems.other },
  ]

  return (
    <section id="tech" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("tech.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("tech.title")}</h2>
        </div>

        <p className="max-w-3xl text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
          3D sphere tag cloud: hover to steer, click to bring a logo to the front, idle keeps a slow spin.
        </p>

        <FloatingLogoCloud />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-base font-semibold text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group relative bg-card border border-border rounded-lg p-3 text-center text-sm text-foreground glow-cyan-hover transition-all duration-300 hover:border-primary/50 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-primary transition-colors">{item.name}</span>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50">
                      <div
                        className="h-full bg-primary/60 transition-all duration-500 ease-out origin-left md:scale-x-0 md:group-hover:scale-x-100"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>

                    <span className="absolute top-1 right-1 text-[10px] text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {item.proficiency}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FloatingLogoCloud() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const yawRef = useRef(0)
  const pitchRef = useRef(0)
  const targetYawRef = useRef<number | null>(null)
  const targetPitchRef = useRef<number | null>(null)
  const idleYawRef = useRef(0.35) // rad/s
  const idlePitchRef = useRef(0.08)
  const rafRef = useRef<number>()
  const [, forceTick] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const items = useMemo(() => {
    const count = floatingLogos.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return floatingLogos.map((logo, i) => {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = golden * i
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      return { ...logo, base: { x, y, z } }
    })
  }, [])

  useEffect(() => {
    let last = performance.now()
    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now

      if (targetYawRef.current !== null && targetPitchRef.current !== null) {
        yawRef.current = lerpAngle(yawRef.current, targetYawRef.current, Math.min(1, dt * 3))
        pitchRef.current = lerpAngle(pitchRef.current, targetPitchRef.current, Math.min(1, dt * 3))
      } else {
        yawRef.current += idleYawRef.current * dt
        pitchRef.current += idlePitchRef.current * dt
      }

      forceTick((x) => x + 1)
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const yaw = yawRef.current
  const pitch = pitchRef.current

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/70 via-secondary/10 to-background/80 shadow-[0_30px_120px_rgba(0,0,0,0.15)]"
      onMouseMove={(event) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const nx = (event.clientX - rect.left) / rect.width - 0.5
        const ny = (event.clientY - rect.top) / rect.height - 0.5
        targetYawRef.current = yawRef.current + nx * 0.8
        targetPitchRef.current = pitchRef.current + ny * 0.6
        setTilt({ x: nx * 12, y: ny * -12 })
      }}
      onMouseLeave={() => {
        targetYawRef.current = null
        targetPitchRef.current = null
        setTilt({ x: 0, y: 0 })
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_38%)]" />

      <div
        className="absolute inset-0 origin-center"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 160ms ease-out",
        }}
      >
        {items.map((logo) => {
          if (!logo.base) return null
          const rotated = rotatePoint(logo.base, yaw, pitch)
          const scale = 0.8 + ((rotated.z + 1) / 2) * 0.5
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768
          const mobileScale = isMobile ? 0.45 : 1
          const left = 50 + rotated.x * 32
          const top = 50 + rotated.y * 32
          const depth = rotated.z * 260
          const opacity = 0.65 + ((rotated.z + 1) / 2) * 0.35

          return (
            <div
              key={logo.key}
              className="logo-chip"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${logo.size * scale * mobileScale}px`,
                height: `${logo.size * scale * mobileScale}px`,
                transform: `translate3d(-50%, -50%, ${depth}px) scale(${scale})`,
                opacity,
                zIndex: Math.round((rotated.z + 1) * 1000),
                filter: rotated.z < 0 ? `blur(${Math.abs(rotated.z) * 2}px)` : "blur(0px)",
              }}
              onClick={() => {
                const targetRotation = pointToFront(logo.base!)
                targetYawRef.current = targetRotation.yaw
                targetPitchRef.current = targetRotation.pitch
              }}
            >
              <div className="flex h-full w-full items-center justify-center transition duration-300 ease-out hover:scale-110">
                <LogoIcon name={logo.key} />
              </div>
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        .logo-chip {
          position: absolute;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}

function normalizeAngle(angle: number) {
  const twoPi = Math.PI * 2
  return ((angle % twoPi) + twoPi) % twoPi
}

function lerpAngle(from: number, to: number, t: number) {
  const a = normalizeAngle(from)
  const b = normalizeAngle(to)
  const diff = normalizeAngle(b - a)
  const shortest = diff > Math.PI ? diff - Math.PI * 2 : diff
  return normalizeAngle(a + shortest * t)
}

function rotatePoint(p: { x: number; y: number; z: number }, yaw: number, pitch: number) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)

  const x1 = p.x * cy - p.z * sy
  const z1 = p.x * sy + p.z * cy
  const y2 = p.y * cp - z1 * sp
  const z2 = p.y * sp + z1 * cp
  return { x: x1, y: y2, z: z2 }
}

function pointToFront(p: { x: number; y: number; z: number }) {
  const yaw = Math.atan2(p.x, p.z)
  const hyp = Math.sqrt(p.x * p.x + p.z * p.z)
  const pitch = Math.atan2(p.y, hyp)
  return { yaw, pitch }
}

function LogoIcon({ name }: { name: LogoKey }) {
  const iconMap: Record<LogoKey, { slug: string; title: string }> = {
    html: { slug: "html5", title: "HTML5" },
    css: { slug: "css3", title: "CSS3" },
    js: { slug: "javascript", title: "JavaScript" },
    ts: { slug: "typescript", title: "TypeScript" },
    react: { slug: "react", title: "React" },
    next: { slug: "nextdotjs", title: "Next.js" },
    tailwind: { slug: "tailwindcss", title: "Tailwind CSS" },
    python: { slug: "python", title: "Python" },
    node: { slug: "nodedotjs", title: "Node.js" },
    docker: { slug: "docker", title: "Docker" },
    postgres: { slug: "postgresql", title: "PostgreSQL" },
    git: { slug: "git", title: "Git" },
    figma: { slug: "figma", title: "Figma" },
    tensorflow: { slug: "tensorflow", title: "TensorFlow" },
    spring: { slug: "spring", title: "Spring" },
    cpp: { slug: "cplusplus", title: "C++" },
    java: { slug: "openjdk", title: "Java" },
  }

  const iconConfig = iconMap[name]
  const icon = Icons[`si${iconConfig.slug.charAt(0).toUpperCase()}${iconConfig.slug.slice(1)}` as keyof typeof Icons] as typeof Icons.siReact | undefined

  if (!icon) return null

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[70%] w-[70%]"
      fill={`#${icon.hex}`}
      role="img"
      aria-label={iconConfig.title}
    >
      <path d={icon.path} />
    </svg>
  )
}
