"use client"

import { useState, useEffect } from "react"
import {
  FloatingNav,
  ProjectHero,
  BentoVitals,
  InteractivePipeline,
  FeatureGrid,
  ChallengesGrid,
  AppleCodeViewer,
  ProjectCTA,
} from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import TerminalIcon from "@mui/icons-material/Terminal"
import ApiIcon from "@mui/icons-material/Api"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import StorageIcon from "@mui/icons-material/Storage"
import PsychologyIcon from "@mui/icons-material/Psychology"
import RouteIcon from "@mui/icons-material/Route"
import BoltIcon from "@mui/icons-material/Bolt"
import RateReviewIcon from "@mui/icons-material/RateReview"
import LayersIcon from "@mui/icons-material/Layers"
import { cn } from "@/lib/utils"

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
  { step: "1", title: "Traveler Chats", description: "User describes their trip in natural language through the streaming chat interface." },
  { step: "2", title: "Intent Extraction", description: "A single LLM call classifies intent and extracts destination, dates, and budget constraints." },
  { step: "3", title: "Crew Orchestrates", description: "Seven CrewAI agents run sequentially, each building on the last agent's output." },
  { step: "4", title: "Itinerary Delivered", description: "A structured, budget-checked itinerary streams back as an interactive boarding-pass card." },
]

const agents = [
  { name: "Destination Researcher", role: "Attractions matched to interests", tool: "RAG + Web Search" },
  { name: "Food & Restaurant Curator", role: "Restaurants matched to budget and taste", tool: "Web Search + RAG" },
  { name: "Personalization Specialist", role: "Persona-based prioritize/avoid guidance", tool: "RAG + Web Search" },
  { name: "Accommodation Specialist", role: "2-4 lodging options matched to persona", tool: "Web Search + RAG" },
  { name: "Budget Analyst", role: "Category costs and within-budget check", tool: "Deterministic Tool" },
  { name: "Itinerary Planner", role: "Day-by-day plan and transport routing", tool: "RAG" },
  { name: "Quality Reviewer", role: "Fixes errors, verifies coherence, emits final JSON", tool: "Reflection" },
]

const challenges = [
  {
    title: "Sequential Agent Latency",
    problem: "Running 7 agents one after another risks a slow, expensive response for an interactive chat interface.",
    solution: "Kept the pipeline sequential for reliability, ran full evaluation sweeps on Vertex AI to avoid rate throttling, and reduced intent extraction to a single upfront LLM call.",
    icon: BoltIcon,
  },
  {
    title: "Grounding vs. Hallucination",
    problem: "LLM-only recommendations can invent restaurants or lodging that don't actually exist.",
    solution: "Gave every research-facing agent a RAG retriever over a curated ChromaDB knowledge base plus live web search as ground truth.",
    icon: PsychologyIcon,
  },
  {
    title: "Proving the Design Works",
    problem: "A multi-agent system is only worth the added complexity if it quantitatively beats a single LLM call.",
    solution: "Built an evaluation harness scoring both systems on task completion, budget accuracy, and hallucination count via an LLM-as-judge.",
    icon: RateReviewIcon,
  },
]

const architectureComponents = [
  {
    title: "Next.js Streaming Chat",
    description: "Streaming chat UI built with Next.js App Router and Tailwind CSS, consuming Server-Sent Events with fluid typing animation.",
    icon: LayersIcon,
  },
  {
    title: "FastAPI Backend",
    description: "Handles intent and slot extraction, streams responses, and triggers the CrewAI crew once trip parameters are complete.",
    icon: ApiIcon,
  },
  {
    title: "CrewAI Orchestration",
    description: "Seven agents run sequentially, each equipped with web search and ChromaDB RAG tools, culminating in a reflection pass.",
    icon: AutoAwesomeIcon,
  },
  {
    title: "PostgreSQL & ChromaDB",
    description: "Persists structured trip records while ChromaDB serves vector embeddings for grounded local attraction retrieval.",
    icon: StorageIcon,
  },
]

const agentCode = `destination_researcher = Agent(
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
)`

function ArchitectureSchematic() {
  const [activeNode, setActiveNode] = useState(0)
  const [dataPacket, setDataPacket] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4)
      setDataPacket((prev) => (prev + 1) % 4)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative p-6 sm:p-10 min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
      <div className="w-full max-w-md relative">
        {/* Node 1: Chat UI */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-44",
              "border bg-card/80 backdrop-blur-md",
              activeNode === 0
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)] scale-105"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <TerminalIcon style={{ fontSize: 24 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">Next.js Chat</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Streaming UI (SSE)</span>
          </div>
        </div>

        {/* Connection Line 1 */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
          <div className="w-px h-8 sm:h-10 bg-black/[0.08] dark:bg-white/[0.1] relative">
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500",
                dataPacket === 1 ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] top-0" : "bg-muted-foreground/30 top-1/2"
              )}
            />
          </div>
          <div className="absolute right-[8%] sm:right-[14%] top-1/2 -translate-y-1/2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono transition-all duration-500",
                dataPacket === 1 ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground"
              )}
            >
              <ApiIcon style={{ fontSize: 10 }} />
              <span>/chat/stream</span>
            </div>
          </div>
        </div>

        {/* Node 2: FastAPI */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-44",
              "border bg-card/80 backdrop-blur-md",
              activeNode === 1
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)] scale-105"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <ApiIcon style={{ fontSize: 24 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">FastAPI</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Intent + Extraction</span>
          </div>
        </div>

        {/* Connection Line 2 */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
          <div className="w-px h-8 sm:h-10 bg-black/[0.08] dark:bg-white/[0.1] relative">
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500",
                dataPacket === 2 ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] top-0" : "bg-muted-foreground/30 top-1/2"
              )}
            />
          </div>
          <div className="absolute right-[8%] sm:right-[14%] top-1/2 -translate-y-1/2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono transition-all duration-500",
                dataPacket === 2 ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground"
              )}
            >
              <RouteIcon style={{ fontSize: 10 }} />
              <span>Agent Handoff</span>
            </div>
          </div>
        </div>

        {/* Node 3: CrewAI */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-44",
              "border bg-card/80 backdrop-blur-md",
              activeNode === 2
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)] scale-105"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <AutoAwesomeIcon style={{ fontSize: 24 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">CrewAI Crew</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">7 Sequential Agents</span>
          </div>
        </div>

        {/* Node 4: PostgreSQL */}
        <div className="flex justify-center">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-44",
              "border bg-card/80 backdrop-blur-md",
              activeNode === 3
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)] scale-105"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <StorageIcon style={{ fontSize: 24 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">PostgreSQL</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Boarding Pass Card</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BedrockCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <FloatingNav
        title="Bedrock Concierge"
        year="2026"
        github="https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge"
        liveDemo="https://ai.bedrock.monster"
      />

      <ProjectHero
        category="Case Study"
        year="2026"
        title="AI Travel"
        titleAccent="Concierge"
        description="A multi-agent AI travel planner where seven CrewAI agents collaborate through orchestration to research, budget, and craft a grounded, personalized itinerary from a single conversation."
        glowColor="rgba(139, 92, 246, 0.22)"
        urlLabel="ai.bedrock.monster"
      >
        <ArchitectureSchematic />
      </ProjectHero>

      <Reveal>
        <BentoVitals
          role="AI Engineer & Architect"
          roleDetail="Solo Project · CS 342: Artificial Intelligence"
          timeline="2025 – 2026"
          methodology="Vertex AI Sweep · 7-Agent Pipeline"
          architecture="Hierarchical Multi-Agent Crew"
          architectureDetail="CrewAI, FastAPI, SSE & ChromaDB RAG"
          techStack={techStack}
        />
      </Reveal>

      <Reveal>
        <InteractivePipeline
          sectionLabel="How It Works"
          title="Conversation to Itinerary"
          description="From natural language prompt to structured, budget-checked itinerary cards with continuous validation."
          steps={howItWorks}
        />
      </Reveal>

      {/* The Seven Agents Roster */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Multi-Agent Team
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              The Seven Specialized Agents
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Each agent has specialized prompts, curated toolkits, and clear handoff contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
                  "bg-card/75 dark:bg-card/50 backdrop-blur-xl",
                  "border border-black/[0.06] dark:border-white/[0.08]",
                  "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
                  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                      <AutoAwesomeIcon style={{ fontSize: 16 }} />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-black/[0.03] dark:border-white/[0.05]">
                      {agent.tool}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {agent.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {agent.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Capabilities"
          title="Platform Capabilities"
          description="Engineered for real-time responsiveness, zero hallucinations, and rigorous budget guardrails."
          features={features}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <AppleCodeViewer
          sectionLabel="Implementation"
          title="Agent & Task Definition"
          description="Declarative agent construction with scoped tools and persona-aligned objectives."
          fileName="crew/agents.py"
          language="python"
          code={agentCode}
        />
      </Reveal>

      <Reveal>
        <ChallengesGrid
          sectionLabel="Engineering Deep Dive"
          title="Challenges & Architectural Solutions"
          description="Balancing sequential latency with grounding accuracy and comparative ablation testing."
          challenges={challenges}
        />
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Architecture"
          title="System Overview"
          description="End-to-end multi-agent orchestration architecture."
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
