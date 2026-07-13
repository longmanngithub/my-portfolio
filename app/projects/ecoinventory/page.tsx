"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import ExternalLink from "@mui/icons-material/OpenInNew"
import Github from "@mui/icons-material/GitHub"
import Calendar from "@mui/icons-material/CalendarMonth"
import Clock from "@mui/icons-material/Schedule"
import Users from "@mui/icons-material/People"
import Zap from "@mui/icons-material/Bolt"
import Target from "@mui/icons-material/TrackChanges"
import Lightbulb from "@mui/icons-material/Lightbulb"
import Code2 from "@mui/icons-material/Code"
import Smartphone from "@mui/icons-material/Smartphone"
import Server from "@mui/icons-material/Dns"
import CheckCircle2 from "@mui/icons-material/CheckCircle"
import CheckRounded from "@mui/icons-material/CheckRounded"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import Image from "next/image"

const techStack = [
  { name: "PHP", category: "Language" },
  { name: "Laravel", category: "Framework" },
  { name: "Blade", category: "Templating" },
  { name: "MySQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Alpine.js", category: "JavaScript" },
]

const features = [
  "Multi-tenant Support",
  "Role-based Access Control",
  "Product Management",
  "Inventory Management",
  "Order Management",
  "Customer Management",
  "Subscription Plans",
]

const challenges = [
  {
    title: "Inventory Scalability",
    problem: "Handling large volumes of products and transactions without performance degradation",
    solution: "Optimized database queries and implemented indexing strategies to ensure fast data retrieval",
    icon: CheckCircle2,
  },
  {
    title: "Real-time Sync",
    problem: "Keeping inventory data synchronized across devices without data loss",
    solution: "Built a conflict resolution system with optimistic updates and queue-based syncing",
    icon: Server,
  },
  {
    title: "User-friendly Interface",
    problem: "Designing an intuitive UI for non-technical users",
    solution: "Conducted user testing and iterated on design based on feedback to improve usability",
    icon: Lightbulb,
  },
]

const timeline = [
  { phase: "Research & Planning", duration: "1 week", status: "completed" },
  { phase: "UI/UX Design", duration: "1 week", status: "completed" },
  { phase: "Core Development", duration: "4 weeks", status: "completed" },
  { phase: "Testing & QA", duration: "2 weeks", status: "completed" },
  { phase: "Launch & Iteration", duration: "Ongoing", status: "active" },
]

export default function EcoinventoryCaseStudy() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="text-[16px]" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">View Code</span>
                <span className="sm:hidden">Code</span>
              </Button>
            </a>
          
            {/* <a href="https://track-your-fitness-beta.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <ExternalLink className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            </a> */}
          </div>
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
                Manage Your <span className="text-primary">Inventory</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A comprehensive inventory management system focused on usability, performance, and clean UI. Built with modern Laravel technologies.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="text-[14px] sm:text-[16px] text-primary" />
                  <span>2025 - Present</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="text-[14px] sm:text-[16px] text-primary" />
                  <span>~8 weeks</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="text-[14px] sm:text-[16px] text-primary" />
                  <span>Solo Project</span>
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

            {/* App Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <div className="relative">
                {/* Desktop: iPhone frame with embedded iframe */}
                <div className="hidden md:block">
                  <div className="relative max-w-[400px] mx-auto">
                    {/* Outer titanium frame */}
                    <div className="relative rounded-[3.5rem] p-[14px] shadow-2xl bg-gradient-to-b from-[#4a4a4a] via-[#2d2d2d] to-[#1a1a1a] border-2 border-[#5a5a5a]">
                      {/* Side buttons - Silent switch */}
                      <div className="absolute -left-[5px] top-[100px] w-[5px] h-8 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Volume up */}
                      <div className="absolute -left-[5px] top-[145px] w-[5px] h-12 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Volume down */}
                      <div className="absolute -left-[5px] top-[210px] w-[5px] h-12 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Power button */}
                      <div className="absolute -right-[5px] top-[165px] w-[5px] h-16 bg-gradient-to-l from-[#3a3a3a] to-[#5a5a5a] rounded-r-sm shadow-md" />
                      
                      {/* Inner screen area */}
                      <div className="relative bg-black rounded-[2.8rem] overflow-hidden ring-1 ring-black/50">
                        {/* Dynamic Island */}
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[120px] h-[36px] bg-black rounded-full z-20 shadow-inner" />
                        
                        {/* Screen content - static screenshot */}
                        <div className="aspect-[9/19.5] bg-secondary/50 overflow-hidden relative">
                          <Image
                            src="/ecoinventory_screenshot.png"
                            alt="Ecoinventory app screenshot"
                            fill
                            className="object-cover"
                            sizes="400px"
                            priority
                          />
                        </div>
                        
                        {/* Home indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-white/40 rounded-full z-20" />
                      </div>
                    </div>
                    
                    {/* Reflection highlight on frame */}
                    <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>
                </div>
                
                {/* Mobile: Interactive preview card with iPhone frame */}
                <div className="md:hidden">
                    {/* iPhone Frame */}
                    <div className="relative max-w-[280px] mx-auto">
                      {/* Outer titanium frame */}
                      <div className="relative rounded-[3rem] p-[12px] shadow-2xl bg-gradient-to-b from-[#4a4a4a] via-[#2d2d2d] to-[#1a1a1a] border-2 border-[#5a5a5a]">
                        {/* Side buttons - Silent switch */}
                        <div className="absolute -left-[4px] top-[80px] w-[4px] h-6 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Volume up */}
                        <div className="absolute -left-[4px] top-[115px] w-[4px] h-10 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Volume down */}
                        <div className="absolute -left-[4px] top-[165px] w-[4px] h-10 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Power button */}
                        <div className="absolute -right-[4px] top-[130px] w-[4px] h-14 bg-gradient-to-l from-[#3a3a3a] to-[#5a5a5a] rounded-r-sm shadow-md" />
                        
                        {/* Inner screen area */}
                        <div className="relative bg-black rounded-[2.3rem] overflow-hidden ring-1 ring-black/50">
                          {/* Dynamic Island */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-20 shadow-inner" />
                          
                          {/* Screen content - static screenshot */}
                          <div className="aspect-[9/19.5] bg-secondary/50 overflow-hidden relative">
                            <Image
                              src="/ecoinventory_screenshot.png"
                              alt="Ecoinventory app screenshot"
                              fill
                              className="object-cover"
                              sizes="280px"
                              priority
                            />
                          </div>
                          
                          {/* Home indicator */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/40 rounded-full" />
                        </div>
                      </div>
                      
                      {/* Reflection highlight on frame */}
                      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Target className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Goal</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create a user-friendly inventory management system that simplifies tracking and managing products for small to medium businesses.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Lightbulb className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Approach</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Focus on intuitive UI/UX design, robust backend architecture with Laravel, and seamless integration of essential inventory features.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Code2 className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Stack</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Leveraged PHP and Laravel for backend development, Blade for templating, MySQL for database management, and Tailwind CSS with Alpine.js for a responsive and dynamic frontend.
              </p>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* Features Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Key Features</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">What Makes It Special</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-2xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="text-[16px] sm:text-[20px] text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Challenges Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Technical Deep Dive</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
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

      {/* Timeline Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Project Timeline</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Development Journey</h2>
          </div>
          
          <div className="relative">
            {/* gradient rail */}
            <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            <div className="space-y-3">
              {timeline.map((phase, index) => {
                const done = phase.status === "completed"
                const active = phase.status === "active"
                return (
                  <div key={index} className="group relative flex items-center gap-4">
                    {/* node — opaque backdrop first so the rail behind never bleeds through a tinted ring */}
                    <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background">
                      <div
                        className={`absolute inset-0 grid place-items-center rounded-full border transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_rgba(15,143,143,0.15)]"
                            : done
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {done ? (
                          <CheckRounded className="text-[20px]" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      {active && (
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      )}
                    </div>
                    {/* card */}
                    <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_26px_rgba(16,35,59,0.08)]">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                          Phase {index + 1}
                        </p>
                        <h3 className="mt-0.5 font-semibold text-foreground">{phase.phase}</h3>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* CTA Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
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
