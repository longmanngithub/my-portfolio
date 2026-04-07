"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Calendar, Clock, Users, Cloud, Server, Monitor, Database, Shield, Bug, Paintbrush, Rocket, CheckCircle2, AlertTriangle, ArrowRight, Globe, HardDrive, Mail } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { type LucideIcon } from "lucide-react"

const techStack = [
  { name: "Laravel 11", category: "Framework" },
  { name: "PHP 8.2", category: "Language" },
  { name: "MySQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vite", category: "Build" },
  { name: "DigitalOcean", category: "Cloud" },
  { name: "Cloudflare R2", category: "Storage" },
  { name: "Laravel Sanctum", category: "Auth" },
]

const bugsFixed = [
  "Organizer info in each event was showing user info instead",
  "Events on Home page redirected to the Events listing instead of the specific event",
  "Category routing broken on Home page",
  "Search function was case-sensitive",
  "Deleted users remained logged in instead of being redirected",
  "Navbar inconsistent across pages",
  "Age calculation was incorrect (now derived from DOB)",
  "Event images were being cut off / cropped incorrectly",
]

const featuresAdded = [
  "Complete UI redesign with Tailwind CSS",
  "Light / Dark theme support",
  "Sanctum token-based authentication",
  "Cloudflare R2 object storage for images",
  "Brevo / Mailtrap email integration",
  "Forgot password with email reset",
  "Admin dashboard with Chart.js analytics",
  "Search, filter, and sort across all views",
  "Custom modals for delete & ban/unban",
  "Client-side validation & loading states",
  "Custom 404 error page",
  "Soft deletes for events (preserves analytics)",
]

type ChallengeItem = {
  title: string
  problem: string
  solution: string
  icon: LucideIcon
}

const challenges: ChallengeItem[] = [
  {
    title: "Inheriting Unfamiliar Code",
    problem: "The codebase was written by another team with different conventions, incomplete documentation, and bugs scattered across three separate Laravel applications",
    solution: "Methodically audited every controller, migration, and route file. Created a unified CHANGELOG to document every fix, addition, and removal across all three apps",
    icon: Bug,
  },
  {
    title: "Multi-App Database Sharing",
    problem: "Three Laravel apps (front-app, api-app, back-app) sharing a single MySQL database caused migration conflicts and inconsistent schema states",
    solution: "Unified all migration files into a shared /database directory, ensured consistent model definitions across apps, and used a single migration runner",
    icon: Database,
  },
  {
    title: "Cloud Deployment on DigitalOcean",
    problem: "Moving from a local MAMP environment to a production cloud server required configuring PHP, MySQL, Nginx, SSL, environment variables, and storage drivers from scratch",
    solution: "Set up a DigitalOcean Droplet with Nginx, configured Laravel's filesystem to use Cloudflare R2 (S3-compatible), and integrated Brevo for transactional email delivery",
    icon: Cloud,
  },
]

const appArchitecture = [
  { name: "front-app", port: "8080", purpose: "Public web UI for users & organizers", icon: Globe },
  { name: "api-app", port: "8090", purpose: "RESTful API with Sanctum token auth", icon: Server },
  { name: "back-app", port: "8091", purpose: "Admin dashboard & moderation panel", icon: Monitor },
]

export default function LocalEventsCaseStudy() {
  const [activeApp, setActiveApp] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveApp((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/longmanngithub/CS426-cloud-final-project" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">View Code</span>
                <span className="sm:hidden">Code</span>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  Case Study
                </Badge>
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  Inherited Codebase
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Local Event <span className="text-primary text-glow">Discovery</span> Platform
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Inherited a multi-app Laravel event management system from another team&apos;s Advanced Web course — fixed all critical bugs, completely redesigned the UI, and deployed it live to DigitalOcean with Cloudflare R2 storage.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2025 – 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>CS 426: Cloud Computing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Solo Project</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="bg-secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Animated Multi-App Architecture */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden glow-cyan">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground truncate">cloud_architecture.svg — DigitalOcean</span>
                </div>
                
                <div className="p-4 sm:p-8 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
                  <div className="w-full max-w-md space-y-4 sm:space-y-5">
                    {/* Three app nodes */}
                    {appArchitecture.map((app, index) => {
                      const Icon = app.icon
                      return (
                        <div key={app.name} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 ${
                          activeApp === index
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'border-border bg-card/50'
                        }`}>
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                            activeApp === index ? 'bg-primary/20' : 'bg-secondary'
                          }`}>
                            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-500 ${
                              activeApp === index ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-semibold text-foreground">{app.name}</span>
                              <span className={`text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded transition-colors duration-500 ${
                                activeApp === index ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                              }`}>:{app.port}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">{app.purpose}</p>
                          </div>
                          {activeApp === index && (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                          )}
                        </div>
                      )
                    })}

                    {/* Shared database node */}
                    <div className="flex justify-center pt-2">
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5">
                        <Database className="h-4 w-4 text-amber-500" />
                        <span className="text-xs sm:text-sm font-medium text-amber-500">Shared MySQL Database</span>
                      </div>
                    </div>

                    {/* Cloud services */}
                    <div className="flex justify-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 px-2 py-1 rounded text-[9px] sm:text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Cloud className="h-2.5 w-2.5" />
                        DigitalOcean
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded text-[9px] sm:text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <HardDrive className="h-2.5 w-2.5" />
                        Cloudflare R2
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded text-[9px] sm:text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">
                        <Mail className="h-2.5 w-2.5" />
                        Brevo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                ↑ Three Laravel apps sharing one database, deployed to DigitalOcean
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// The Story"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How This Project Came to Be</h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Randomized Assignment</h3>
              <p className="text-sm text-muted-foreground">
                In CS 426 Cloud Computing, each student was randomly assigned a codebase from a previous course (CS 262: Advanced Web Development). I received Team 1 Section 2&apos;s &quot;Local Event Discovery Platform&quot;.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Bug className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Fix Every Bug</h3>
              <p className="text-sm text-muted-foreground">
                The first objective was to audit the entire codebase and fix all bugs the previous developers had left behind — from broken routing and incorrect data display to authentication loopholes.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Deploy to the Cloud</h3>
              <p className="text-sm text-muted-foreground">
                The final mission: deploy the fixed and improved application live to DigitalOcean, configure cloud storage with Cloudflare R2, and set up transactional email via Brevo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bugs Fixed */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// What Was Fixed"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              <span className="text-red-400">8</span> Critical Bugs Squashed
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {bugsFixed.map((bug, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-6 h-6 bg-red-500/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bug className="h-3.5 w-3.5 text-red-400" />
                </div>
                <span className="text-sm text-foreground">{bug}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Added */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// What Was Added"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Major Improvements & Features</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {featuresAdded.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Architecture"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Three Apps, One Database</h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">front-app</h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">:8080</span>
              </div>
              <p className="text-sm text-muted-foreground">
                User-facing web app with event browsing, search/filter/sort, user & organizer registration, favorites, profile management, and password reset.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Server className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">api-app</h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">:8090</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Full RESTful API with Sanctum token auth, separate endpoints for users, organizers, and admins, rate-limited auth, and public event browsing endpoints.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300 sm:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">back-app</h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">:8091</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Admin dashboard with real-time analytics (Chart.js), user/organizer moderation (ban/unban), event management with soft-deletes, and category CRUD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Event Search with Guard Auth</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">front-app/app/Http/Controllers/EventController.php</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`public function browse(Request $request)
{
    $query = Event::with('category', 'organizer')
        ->whereNull('deleted_at');

    // Case-insensitive search (v2.0 fix)
    if ($request->search) {
        $query->whereRaw(
            'LOWER(title) LIKE ?',
            ['%' . strtolower($request->search) . '%']
        );
    }

    // Filter by category
    if ($request->category) {
        $query->where('category_id', $request->category);
    }

    // Sort by date or price
    $sortBy = $request->sort ?? 'start_date';
    $query->orderBy($sortBy, 'asc');

    $events = $query->paginate(12);
    $categories = Category::all();

    return view('events.browse', compact(
        'events', 'categories'
    ));
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Deployment */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Cloud Infrastructure"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Deployed to DigitalOcean</h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Cloud className="h-6 w-6 text-blue-400" />
                <h3 className="text-base font-semibold text-foreground">DigitalOcean Droplet</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ubuntu server with Nginx, PHP-FPM, and MySQL. All three Laravel apps configured behind a single reverse proxy with port routing.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <HardDrive className="h-6 w-6 text-orange-400" />
                <h3 className="text-base font-semibold text-foreground">Cloudflare R2</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                S3-compatible object storage for event images and media. Migrated from local file storage to cloud-managed buckets with CDN distribution.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-6 w-6 text-green-400" />
                <h3 className="text-base font-semibold text-foreground">Brevo Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Transactional email service for password resets, registration confirmations, and contact form submissions. Replaced local Mailtrap with production-grade delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Technical Deep Dive"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-400">Problem</p>
                        <p className="text-sm text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-400">Solution</p>
                        <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Explore the Source Code</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            View the full codebase with the CHANGELOG documenting every fix, addition, and removal.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://github.com/longmanngithub/CS426-cloud-final-project" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="outline" className="border-border bg-transparent">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View More Projects
              </Button>
            </Link>
          </div>
          
          {/* Buy Me a Coffee */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Enjoyed this project? Consider supporting my work ☕</p>
              <a
                href="https://link.payway.com.kh/wt410024D"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 cursor-pointer"
              >
                <span>☕</span>
                Buy Me a Coffee
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
