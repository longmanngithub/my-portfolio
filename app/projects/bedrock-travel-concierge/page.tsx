"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import ExternalLink from "@mui/icons-material/OpenInNew"
import Github from "@mui/icons-material/GitHub"
import Calendar from "@mui/icons-material/CalendarMonth"
import Clock from "@mui/icons-material/Schedule"
import Users from "@mui/icons-material/People"
import CheckCircle2 from "@mui/icons-material/CheckCircle"
import Layers from "@mui/icons-material/Layers"
import Api from "@mui/icons-material/Api"
import AutoAwesome from "@mui/icons-material/AutoAwesome"
import Storage from "@mui/icons-material/Storage"
import Terminal from "@mui/icons-material/Terminal"
import Bolt from "@mui/icons-material/Bolt"
import Psychology from "@mui/icons-material/Psychology"
import RateReview from "@mui/icons-material/RateReview"
import Route from "@mui/icons-material/Route"
import type { SvgIconComponent } from "@mui/icons-material"

const techStack = [
  { name: "Python", category: "Language" },
  { name: "CrewAI", category: "Orchestration" },
  { name: "FastAPI", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "ChromaDB", category: "RAG" },
  { name: "Google Gemini", category: "LLM" },
]

const features = [
  "Streaming Chat with Server-Sent Events",
  "Intent & Slot Extraction in One LLM Call",
  "RAG-Grounded Recommendations via ChromaDB",
  "Deterministic Budget Calculator",
  "Structured Itinerary + Boarding-Pass Card",
  "Evaluation Harness vs. Single-LLM Baseline",
  "Hierarchical & RAG-Ablation Experiment Modes",
  "Persona-Aware Personalization",
]

const howItWorks = [
  { step: "1", title: "Traveler Chats", description: "User describes their trip in natural language through the streaming chat interface" },
  { step: "2", title: "Intent Extraction", description: "A single LLM call classifies intent and extracts destination, dates, and budget" },
  { step: "3", title: "Crew Orchestrates", description: "Seven CrewAI agents run sequentially, each building on the last agent's output" },
  { step: "4", title: "Itinerary Delivered", description: "A structured, budget-checked itinerary streams back as a boarding-pass card" },
]

const agents = [
  { name: "Destination Researcher", role: "Attractions matched to interests", tool: "RAG + Web Search" },
  { name: "Food & Restaurant Curator", role: "Restaurants matched to budget and taste", tool: "Web Search + RAG" },
  { name: "Personalization Specialist", role: "Persona-based prioritize/avoid guidance", tool: "RAG + Web Search" },
  { name: "Accommodation Specialist", role: "2-4 lodging options matched to persona", tool: "Web Search + RAG" },
  { name: "Budget Analyst", role: "Category costs and within-budget check", tool: "Deterministic Tool" },
  { name: "Itinerary Planner", role: "Day-by-day plan and transport", tool: "RAG" },
  { name: "Quality Reviewer", role: "Fixes errors, emits final itinerary", tool: "Reflection" },
]

type Challenge = {
  title: string
  problem: string
  solution: string
  icon: SvgIconComponent
}

const challenges: Challenge[] = [
  {
    title: "Sequential Agent Latency",
    problem: "Running 7 agents one after another risks a slow, expensive response for a chat interface",
    solution: "Kept the pipeline sequential for reliability, ran the full evaluation sweep on Vertex AI to avoid rate-limit throttling, and reduced intent extraction to a single upfront LLM call",
    icon: Bolt,
  },
  {
    title: "Grounding vs. Hallucination",
    problem: "LLM-only recommendations can invent restaurants or lodging that don't actually exist",
    solution: "Gave every research-facing agent a RAG retriever over a curated ChromaDB knowledge base plus live web search as ground truth",
    icon: Psychology,
  },
  {
    title: "Proving the Design Works",
    problem: "A multi-agent system is only worth the added complexity if it actually beats a single LLM call",
    solution: "Built an evaluation harness that scores both systems on task completion, budget accuracy, and hallucination count via an LLM-as-judge, with RAG-ablation and hierarchical-topology controls",
    icon: RateReview,
  },
]

export default function BedrockCaseStudy() {
  // Animated architecture diagram state
  const [activeNode, setActiveNode] = useState(0)
  const [dataPacket, setDataPacket] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4)
      setDataPacket((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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
            <a href="https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">View Code</span>
                <span className="sm:hidden">Code</span>
              </Button>
            </a>
            <a href="https://ai.bedrock.monster" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <ExternalLink className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
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
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-foreground">
                AI Travel <span className="text-primary">Concierge</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A multi-agent AI travel planner where seven CrewAI agents collaborate through orchestration, researching a destination, curating food, reading the traveler's persona, and budgeting to produce a personalized, structured itinerary.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="text-[14px] sm:text-[16px] text-primary" />
                  <span>2025 - 2026</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="text-[14px] sm:text-[16px] text-primary" />
                  <span>CS 342: Artificial Intelligence</span>
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

            {/* Animated System Architecture Diagram */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden glow-cyan">
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground truncate">agent_orchestration.svg (Live)</span>
                </div>

                {/* Architecture Diagram */}
                <div className="p-4 sm:p-8 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Node 1: Chat UI */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 0
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <Terminal className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">Next.js Chat</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Streaming UI (SSE)</span>
                      </div>
                    </div>

                    {/* Connection Line 1 */}
                    <div className="flex justify-center mb-6 sm:mb-8 relative">
                      <div className="w-px h-8 sm:h-10 bg-border relative">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                          dataPacket === 1 ? 'bg-primary shadow-lg shadow-primary/50 top-0' : 'bg-muted top-1/2'
                        }`} />
                      </div>
                      <div className="absolute right-[10%] sm:right-[14%] top-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] transition-all duration-500 ${
                          dataPacket === 1 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <Api className="text-[8px] sm:text-[10px]" />
                          <span>/chat/stream</span>
                        </div>
                      </div>
                    </div>

                    {/* Node 2: FastAPI */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 1
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <Api className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 1 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">FastAPI Backend</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Intent + Slot Extraction</span>
                      </div>
                    </div>

                    {/* Connection Line 2 */}
                    <div className="flex justify-center mb-6 sm:mb-8 relative">
                      <div className="w-px h-8 sm:h-10 bg-border relative">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                          dataPacket === 2 ? 'bg-primary shadow-lg shadow-primary/50 top-0' : 'bg-muted top-1/2'
                        }`} />
                      </div>
                      <div className="absolute right-[10%] sm:right-[14%] top-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] transition-all duration-500 ${
                          dataPacket === 2 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <Route className="text-[8px] sm:text-[10px]" />
                          <span>Agent Handoff</span>
                        </div>
                      </div>
                    </div>

                    {/* Node 3: CrewAI Crew */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 2
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <AutoAwesome className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">CrewAI Crew</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">7 Sequential Agents</span>
                      </div>
                    </div>

                    {/* Connection Line 3 */}
                    <div className="flex justify-center mb-6 sm:mb-8 relative">
                      <div className="w-px h-8 sm:h-10 bg-border relative">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                          dataPacket === 3 ? 'bg-primary shadow-lg shadow-primary/50 top-0' : 'bg-muted top-1/2'
                        }`} />
                      </div>
                      <div className="absolute left-[8%] sm:left-[14%] top-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] transition-all duration-500 ${
                          dataPacket === 3 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <Storage className="text-[8px] sm:text-[10px]" />
                          <span>Itinerary</span>
                        </div>
                      </div>
                    </div>

                    {/* Node 4: PostgreSQL */}
                    <div className="flex justify-center">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 3
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <Storage className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">PostgreSQL</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Itinerary + Boarding Pass</span>
                      </div>
                    </div>

                    {/* ChromaDB RAG Node (side) */}
                    <div className="absolute top-[42%] left-2 sm:left-4">
                      <div className={`flex flex-col items-center p-2 sm:p-3 rounded-lg border transition-all duration-500 ${
                        activeNode === 2
                          ? 'border-amber-500/50 bg-amber-500/5'
                          : 'border-border/50 bg-card/30'
                      }`}>
                        <Psychology className={`text-[16px] sm:text-[20px] mb-1 transition-colors duration-500 ${activeNode === 2 ? 'text-amber-500' : 'text-muted-foreground/50'}`} />
                        <span className="text-[8px] sm:text-[9px] text-muted-foreground">ChromaDB</span>
                        <span className="text-[7px] sm:text-[8px] text-muted-foreground/70">RAG Knowledge Base</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                Animated system architecture: chat to intent extraction to agent crew to structured itinerary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">How It Works</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Conversation to Itinerary</h2>
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

      {/* The Seven Agents */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Orchestration</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">The Seven Agents</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-2xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AutoAwesome className="text-[16px] sm:text-[20px] text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-foreground truncate">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground/70 font-mono truncate">{agent.tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Features Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
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
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Code Sample</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Agent & Task Definition</h2>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-lg sm:rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">crew/agents.py</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`destination_researcher = Agent(
    role="Destination Researcher",
    goal="Surface attractions matched to the traveler's interests",
    tools=[web_search_tool, rag_retriever],
    llm=llm,
    verbose=True,
)

research_task = Task(
    description="Research {destination} for a {duration}-day trip "
                 "focused on {interests}",
    agent=destination_researcher,
    expected_output="A list of attractions with why each fits the traveler",
)`}</code>
              </pre>
            </div>
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

      {/* System Architecture Detail */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Next.js Chat</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Streaming chat UI built with Next.js App Router and Tailwind CSS v4, consuming Server-Sent Events.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Api className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">FastAPI Backend</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Handles intent and slot extraction, streams responses, and triggers the CrewAI crew once trip details are complete.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <AutoAwesome className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">CrewAI Orchestration</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Seven agents run sequentially, each with web search and RAG tools, culminating in a Quality Reviewer pass.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <Storage className="text-[20px] sm:text-[24px] text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">PostgreSQL + ChromaDB</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Persists structured itineraries while ChromaDB serves as the RAG knowledge base for grounded recommendations.
              </p>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* CTA Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">Explore the Source Code</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            The full project, including the evaluation harness, is available on GitHub.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                <Github className="text-[16px] mr-2" />
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
        </div>
      </section></Reveal>
    </main>
  )
}
