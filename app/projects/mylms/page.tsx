"use client"

import {
  FloatingNav,
  ProjectHero,
  ProjectScreenshot,
  BentoVitals,
  InteractivePipeline,
  FeatureGrid,
  ChallengesGrid,
  AppleCodeViewer,
  ProjectCTA,
} from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import GroupsIcon from "@mui/icons-material/Groups"
import InsightsIcon from "@mui/icons-material/Insights"
import LayersIcon from "@mui/icons-material/Layers"
import ApiIcon from "@mui/icons-material/Api"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"

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

const challenges = [
  {
    title: "Flexible Progression Control",
    problem: "Google Classroom couldn't support an assessment-wall or mixed self-paced and lecturer-controlled progression.",
    solution: "Designed a configurable progression engine so lecturers toggle between self-paced and scheduled delivery per class.",
    icon: ManageAccountsIcon,
  },
  {
    title: "Cross-Team Coordination",
    problem: "Coordinating 10 engineers across frontend, backend, API, UI/UX, and DevOps under a fixed 2-month timeline.",
    solution: "Ran 2-week Agile Scrum sprints with clear service ownership and a single source of truth maintained with the tech lead.",
    icon: GroupsIcon,
  },
  {
    title: "Service-to-Service Consistency",
    problem: "Keeping independent Go microservices and their own databases in sync without tight coupling.",
    solution: "Adopted an event-driven architecture with RabbitMQ and Redis caching, so services react to events instead of polling each other.",
    icon: InsightsIcon,
  },
]

const architectureComponents = [
  {
    title: "Next.js Frontend",
    description: "Role-specific panels for director, lecturer, and student, calling the API through Kong.",
    icon: LayersIcon,
  },
  {
    title: "Kong API Gateway",
    description: "Validates JWTs, enforces coarse RBAC, and rate-limits traffic before routing REST requests.",
    icon: ApiIcon,
  },
  {
    title: "Go Microservices",
    description: "Independent user, course, assessment, and grading services communicating over gRPC.",
    icon: AccountTreeIcon,
  },
  {
    title: "Observability & Config",
    description: "OpenTelemetry collects logs, metrics, and traces into Loki, Prometheus, and OpenSearch.",
    icon: MonitorHeartIcon,
  },
]

const rbacCode = `// RBAC middleware enforced via Open Policy Agent
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
}`

export default function MyLmsCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <FloatingNav
        title="MyLMS"
        year="2026"
      />

      <ProjectHero
        category="Case Study"
        year="2026"
        title="Learn at Your Own"
        titleAccent="Pace"
        description="A microservice-based learning management system built for Paragon International University's English Preparatory Program, giving lecturers full control over content delivery and students flexible progression."
        glowColor="rgba(15, 143, 143, 0.22)"
        urlLabel="mylms.paragoniu.app"
      >
        <ProjectScreenshot
          src="/mylms_screenshot.png"
          alt="MyLMS dashboard interface"
          priority
        />
      </ProjectHero>

      <Reveal>
        <BentoVitals
          role="Project Manager"
          roleDetail="Led 10-engineer cross-functional team"
          timeline="2025 – 2026"
          methodology="Agile Scrum · 4 Sprints"
          architecture="Event-Driven Microservices"
          architectureDetail="Go, gRPC, RabbitMQ & Kong Gateway"
          techStack={techStack}
        />
      </Reveal>

      <Reveal>
        <InteractivePipeline
          sectionLabel="How It Works"
          title="Learning Pipeline"
          description="Structured progression with flexible educator gating and real-time mastery verification."
          steps={howItWorks}
        />
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Capabilities"
          title="Platform Features"
          description="Built for enterprise university requirements with high-concurrency role management."
          features={features}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <AppleCodeViewer
          sectionLabel="Implementation"
          title="RBAC Middleware"
          description="High-performance access control evaluated at line-rate via Open Policy Agent integration."
          fileName="middleware/rbac.go"
          language="go"
          code={rbacCode}
        />
      </Reveal>

      <Reveal>
        <ChallengesGrid
          sectionLabel="Engineering Deep Dive"
          title="Challenges & Architectural Solutions"
          description="Solving concurrency, state reconciliation, and multi-service orchestration under deadline."
          challenges={challenges}
        />
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Architecture"
          title="System Overview"
          description="Distributed microservice topology designed for horizontal scaling and fault isolation."
          features={architectureComponents}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <ProjectCTA />
      </Reveal>
    </main>
  )
}
