"use client"

import Image from "next/image"
import {
  FloatingNav,
  FeatureGrid,
  ChallengesGrid,
  AppleCodeViewer,
  ProjectCTA,
} from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import DnsIcon from "@mui/icons-material/Dns"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import StorageIcon from "@mui/icons-material/Storage"
import WebIcon from "@mui/icons-material/Web"
import TargetIcon from "@mui/icons-material/TrackChanges"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import { cn } from "@/lib/utils"

const techStack = [
  { name: "PHP", category: "Language" },
  { name: "Laravel", category: "Framework" },
  { name: "Blade", category: "Templating" },
  { name: "MySQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Alpine.js", category: "JavaScript" },
]

const features = [
  "Multi-tenant Organization Support",
  "Role-based Access & Permission Matrix",
  "Real-time Inventory & SKU Tracking",
  "Automated Low-stock Reorder Alerts",
  "Centralized REST API for All Operations",
  "Order & Shipment Lifecycle Management",
  "Customer & Vendor Directory",
  "Exportable Audit Logs & Financial Summaries",
]

const timeline = [
  { phase: "Research & Planning", duration: "1 week", status: "completed", desc: "Audited existing SME inventory bottlenecks and finalized single-source-of-truth API data models." },
  { phase: "UI/UX Architecture", duration: "1 week", status: "completed", desc: "Designed mobile-friendly dashboard workflows for desktop and handheld warehouse barcode scanners." },
  { phase: "Core Development", duration: "4 weeks", status: "completed", desc: "Built Laravel models, transactional stock mutators, and queue-based audit trail tracking." },
  { phase: "Testing & QA", duration: "2 weeks", status: "completed", desc: "Simulated concurrent checkout fulfillment and verified row-level locking against race conditions." },
  { phase: "Launch & Iteration", duration: "Ongoing", status: "active", desc: "Deployed production environment with automated backups and real-time error telemetry." },
]

const challenges = [
  {
    title: "Inventory Scalability & Locking",
    problem: "Concurrent checkout sessions risk selling the same inventory item twice under high volume.",
    solution: "Implemented pessimistic database row-locking during checkout transaction blocks, ensuring strict serial stock decrements.",
    icon: CheckCircleIcon,
  },
  {
    title: "Real-time Multi-Device Sync",
    problem: "Warehouse staff on mobile scanners and managers on desktop require immediate stock synchronization.",
    solution: "Built an event-driven broadcast layer triggering optimistic Alpine.js UI updates backed by background queue reconciliation.",
    icon: DnsIcon,
  },
  {
    title: "Intuitive Non-Technical UX",
    problem: "Warehouse operators need fast, low-friction scanning without navigating complex nested forms.",
    solution: "Simplified item intake to a 1-tap barcode workflow with instant audio and visual confirmation states.",
    icon: LightbulbIcon,
  },
]

const architectureOverview = [
  {
    title: "Laravel REST Backend",
    description: "Centralized API with controller-level request validation, rate limiting, and transactional Eloquent mutators.",
    icon: DnsIcon,
  },
  {
    title: "MySQL Relational Core",
    description: "Normalized schema with indexed foreign keys, automated timestamps, and immutable inventory transaction logs.",
    icon: StorageIcon,
  },
  {
    title: "Alpine.js & Tailwind",
    description: "Lightweight, reactive client-side micro-interactions without the heavy bundle size of a full SPA framework.",
    icon: WebIcon,
  },
]

const apiCode = `// routes/api.php - Centralized Inventory API endpoints
Route::middleware('auth:sanctum')->group(function () {
    // Inventory Transactions with pessimistic locking
    Route::post('/inventory/checkout', [InventoryController::class, 'checkout']);
    Route::post('/inventory/restock', [InventoryController::class, 'restock']);
    Route::get('/inventory/stock-levels', [InventoryController::class, 'stockLevels']);
    
    // Low stock automated alerts
    Route::get('/inventory/alerts', [AlertController::class, 'index']);
});`

export default function EcoinventoryCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <FloatingNav
        title="EcoInventory"
        year="2025"
        github="https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel"
      />

      {/* Hero Section with Apple iPhone Frame */}
      <section className="pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 font-mono text-[11px] font-medium text-primary backdrop-blur-md">
                <span>Case Study</span>
                <span className="text-primary/40">•</span>
                <span>2025</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-foreground">
                Manage Your <span className="text-primary">Inventory</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                A comprehensive inventory management system focused on mobile usability, performance, and clean UX. Built with modern Laravel technologies and a single-source-of-truth API design.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium pt-1">
                <span>2025 – Present</span>
                <span className="text-muted-foreground/40">•</span>
                <span>~8 weeks</span>
                <span className="text-muted-foreground/40">•</span>
                <span>Solo Project</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex rounded-full border border-black/[0.06] dark:border-white/[0.1] bg-secondary/80 px-3 py-1 font-mono text-xs font-medium text-foreground/80"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Apple iPhone Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                {/* Luminous ambient glow behind the phone */}
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-[4rem] opacity-60 blur-2xl"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.25), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* iPhone Frame */}
                <div className="relative rounded-[3.2rem] p-[10px] sm:p-[12px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_28px_60px_-14px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#3a3a3a] via-[#222222] to-[#121212] border border-white/20 dark:border-white/15">
                  {/* Outer buttons */}
                  <div className="absolute -left-[3px] top-[90px] w-[3px] h-8 bg-[#444] rounded-l-sm" />
                  <div className="absolute -left-[3px] top-[135px] w-[3px] h-10 bg-[#444] rounded-l-sm" />
                  <div className="absolute -left-[3px] top-[185px] w-[3px] h-10 bg-[#444] rounded-l-sm" />
                  <div className="absolute -right-[3px] top-[140px] w-[3px] h-14 bg-[#444] rounded-r-sm" />

                  {/* Inner screen */}
                  <div className="relative bg-black rounded-[2.6rem] overflow-hidden ring-1 ring-black/50 aspect-[9/19.5]">
                    {/* Dynamic Island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[84px] h-[22px] bg-black rounded-full z-30 shadow-inner flex items-center justify-end px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-white/10" />
                    </div>

                    {/* Screenshot in natural phone aspect */}
                    <Image
                      src="/ecoinventory_screenshot.png"
                      alt="EcoInventory mobile app interface"
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                      priority
                    />

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-black/40 dark:bg-white/40 rounded-full z-30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Overview Pillars */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 sm:p-6 bg-card/75 dark:bg-card/50 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-3">
                <TargetIcon style={{ fontSize: 20 }} />
              </div>
              <h3 className="text-base font-bold text-foreground">The Goal</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Create a responsive inventory management system that simplifies tracking, reordering, and multi-tenant stock governance for SMEs.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 bg-card/75 dark:bg-card/50 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-3">
                <LightbulbIcon style={{ fontSize: 20 }} />
              </div>
              <h3 className="text-base font-bold text-foreground">The Approach</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Adopted an API-first single source of truth, pairing Laravel's robust transactional backend with lightweight reactive Alpine.js UI components.
              </p>
            </div>

            <div className="rounded-2xl p-5 sm:p-6 bg-card/75 dark:bg-card/50 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-3">
                <CheckCircleIcon style={{ fontSize: 20 }} />
              </div>
              <h3 className="text-base font-bold text-foreground">The Result</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A clean, mobile-first inventory application that eliminates overselling race conditions and accelerates warehouse barcode intake.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Development Journey Timeline */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Project Timeline
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Development Journey
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              From business requirements analysis through database concurrency design and staging verification.
            </p>
          </div>

          <div className="relative">
            {/* Gradient vertical rail: dead-center at 22px to align with the 44px (h-11 w-11) node */}
            <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />

            <div className="space-y-3.5 sm:space-y-4">
              {timeline.map((item, index) => {
                const isDone = item.status === "completed"
                const isActive = item.status === "active"

                return (
                  <div key={item.phase} className="group relative flex items-center gap-3.5 sm:gap-5">
                    {/* Node indicator: 44px container with opaque background so the rail never bleeds through */}
                    <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background">
                      <div
                        className={cn(
                          "absolute inset-0 grid place-items-center rounded-full border transition-all duration-300",
                          isActive
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_rgba(15,143,143,0.18)]"
                            : isDone
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground"
                        )}
                      >
                        {isDone ? (
                          <CheckRoundedIcon style={{ fontSize: 18 }} />
                        ) : (
                          <span className="font-mono text-xs font-semibold">{index + 1}</span>
                        )}
                      </div>
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-primary/25 animate-ping" />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-card/75 dark:bg-card/50 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 group-hover:border-primary/30 group-hover:-translate-y-0.5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary font-semibold">
                          Phase {index + 1}
                        </span>
                        <h3 className="mt-0.5 text-sm sm:text-base font-bold text-foreground">
                          {item.phase}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <span className={cn(
                          "rounded-full px-3 py-1 font-mono text-[11px] font-medium whitespace-nowrap",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "bg-secondary text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]"
                        )}>
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Features Grid */}
      <Reveal>
        <FeatureGrid
          sectionLabel="Capabilities"
          title="Core Features"
          description="Built for operational speed, accurate stock balances, and auditable accounting standards."
          features={features}
          columns={4}
        />
      </Reveal>

      {/* Challenges & Solutions */}
      <Reveal>
        <ChallengesGrid
          sectionLabel="Engineering Deep Dive"
          title="Challenges & Architectural Solutions"
          description="Solving race conditions, multi-device synchronization, and ergonomics for warehouse scanning."
          challenges={challenges}
        />
      </Reveal>

      {/* Code Viewer */}
      <Reveal>
        <AppleCodeViewer
          sectionLabel="API Implementation"
          title="Centralized REST Endpoints"
          description="Single-source-of-truth endpoints with Sanctum authentication and transactional stock guards."
          fileName="routes/api.php"
          language="php"
          code={apiCode}
        />
      </Reveal>

      {/* Architecture Overview */}
      <Reveal>
        <FeatureGrid
          sectionLabel="Architecture"
          title="Technical Architecture"
          description="Robust monolithic design with clean boundaries and fast execution."
          features={architectureOverview}
          columns={3}
        />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <ProjectCTA />
      </Reveal>
    </main>
  )
}
