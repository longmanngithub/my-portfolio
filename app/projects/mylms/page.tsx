"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import Calendar from "@mui/icons-material/CalendarMonth"
import Clock from "@mui/icons-material/Schedule"
import Users from "@mui/icons-material/People"
import Lock from "@mui/icons-material/Lock"
import CheckCircle2 from "@mui/icons-material/CheckCircle"
import Layers from "@mui/icons-material/Layers"
import Api from "@mui/icons-material/Api"
import AccountTree from "@mui/icons-material/AccountTree"
import MonitorHeart from "@mui/icons-material/MonitorHeart"
import ManageAccounts from "@mui/icons-material/ManageAccounts"
import Insights from "@mui/icons-material/Insights"
import ImageOutlined from "@mui/icons-material/ImageOutlined"
import type { SvgIconComponent } from "@mui/icons-material"

const techStack = [
  { name: "Go", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Cache" },
  { name: "RabbitMQ", category: "Event Broker" },
  { name: "Kong", category: "API Gateway" },
  { name: "FastAPI", category: "Integration" },
]

const features = [
  "Role-based Access Control (RBAC)",
  "CSV Bulk Onboarding with Auto-Invites",
  "Self-Paced or Lecturer-Controlled Progression",
  "Assessment-Wall Progress Gating",
  "Multi-Tier Progress Dashboards",
  "Observability & Configuration Panel",
  "Cloudflare R2 Lesson Material Storage",
  "Google OAuth Sign-In",
]

const howItWorks = [
  { step: "1", title: "Director Onboards", description: "Bulk-uploads students and lecturers via CSV, triggering automatic invite emails" },
  { step: "2", title: "Lecturer Builds Content", description: "Structures lessons and assessments, choosing self-paced or scheduled delivery" },
  { step: "3", title: "Student Progresses", description: "Works through lessons behind an assessment-wall that unlocks material on mastery" },
  { step: "4", title: "Dashboards Report", description: "Director and lecturer dashboards track individual and class-wide progress live" },
]

type Challenge = {
  title: string
  problem: string
  solution: string
  icon: SvgIconComponent
}

const challenges: Challenge[] = [
  {
    title: "Flexible Progression Control",
    problem: "Google Classroom couldn't support an assessment-wall or mixed self-paced and lecturer-controlled progression",
    solution: "Designed a configurable progression engine so lecturers toggle between self-paced and scheduled delivery per class",
    icon: ManageAccounts,
  },
  {
    title: "Cross-Team Coordination",
    problem: "Coordinating 10 engineers across frontend, backend, API, UI/UX, and DevOps under a fixed 2-month, budget-capped timeline",
    solution: "Ran 2-week Agile Scrum sprints with clear service ownership and a single source of truth maintained with the tech lead",
    icon: Users,
  },
  {
    title: "Service-to-Service Consistency",
    problem: "Keeping independent Go microservices and their own databases in sync without tight coupling",
    solution: "Adopted an event-driven architecture with RabbitMQ and Redis caching, so services react to events instead of polling each other",
    icon: Insights,
  },
]

function ScreenshotFrame() {
  const [errored, setErrored] = useState(false)

  return (
    <div className="relative">
      <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
      <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden glow-cyan">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto flex max-w-[220px] sm:max-w-[280px] flex-1 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-muted-foreground">
            <Lock className="text-[10px] sm:text-[12px]" />
            <span className="truncate">mylms.paragoniu.app</span>
          </div>
        </div>
        <div className="relative aspect-[16/10] bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60">
          {!errored && (
            <Image
              src="/mylms_screenshot.png"
              alt="MyLMS dashboard screenshot"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
              onError={() => setErrored(true)}
            />
          )}
          {errored && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOutlined className="text-[36px] sm:text-[44px] opacity-40" />
              <span className="text-xs">Screenshot coming soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MyLmsCaseStudy() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="text-[16px]" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-foreground">
                Learn at Your Own <span className="text-primary">Pace</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A microservice-based learning management system built for Paragon International University's English Preparatory Program, giving lecturers full control over content delivery and students flexible progression.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="text-[14px] sm:text-[16px] text-primary" />
                  <span>2025 - 2026</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="text-[14px] sm:text-[16px] text-primary" />
                  <span>Agile Scrum, 4 Sprints</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="text-[14px] sm:text-[16px] text-primary" />
                  <span>Project Manager, Team of 10</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="bg-secondary text-xs sm:text-sm">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            <ScreenshotFrame />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">How It Works</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Learning Pipeline</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}
                <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-3 sm:p-4 text-center glow-cyan-hover transition-all duration-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Features */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Capabilities</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Features</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-2xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="text-[16px] sm:text-[20px] text-primary flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Code Sample */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Code Sample</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">RBAC Middleware</h2>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-lg sm:rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">middleware/rbac.go</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`// RBAC middleware enforced via Open Policy Agent
func RequireRole() gin.HandlerFunc {
  return func(c *gin.Context) {
    claims, ok := c.Get("jwt_claims")
    if !ok {
      c.AbortWithStatusJSON(401, gin.H{"error": "unauthenticated"})
      return
    }

    user := claims.(*auth.Claims)
    allowed := opa.Evaluate(user.Role, c.FullPath(), c.Request.Method)

    if !allowed {
      c.AbortWithStatusJSON(403, gin.H{"error": "forbidden"})
      return
    }

    c.Next()
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* Challenges Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Technical Deep Dive</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Challenges & Solutions</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="text-[20px] sm:text-[24px] text-primary" />
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-destructive">Problem</p>
                        <p className="text-sm sm:text-base text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-primary">Solution</p>
                        <p className="text-sm sm:text-base text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* System Overview */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Architecture</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">System Overview</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Layers className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Next.js Frontend</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Role-specific panels for director, lecturer, and student, built with Next.js and Tailwind CSS, calling the API through Kong.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Api className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Kong API Gateway</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Validates JWTs, enforces coarse RBAC, and rate-limits traffic before routing REST requests to backend services.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <AccountTree className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Go Microservices</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Independent user, course, assessment, and grading services communicating over gRPC, each backed by its own PostgreSQL database.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <MonitorHeart className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Observability & Config</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                OpenTelemetry collects logs, metrics, and traces into Loki, Prometheus, and OpenSearch for live troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* CTA Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">Interested in Working Together?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            I'm always open to discussing new projects and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/#contact">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto border-border bg-transparent">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section></Reveal>
    </main>
  )
}
