"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import ExternalLink from "@mui/icons-material/OpenInNew"
import Github from "@mui/icons-material/GitHub"
import Calendar from "@mui/icons-material/CalendarMonth"
import Clock from "@mui/icons-material/Schedule"
import Users from "@mui/icons-material/People"
import CheckCircle2 from "@mui/icons-material/CheckCircle"
import FilePresent from "@mui/icons-material/Description"
import Layers from "@mui/icons-material/Layers"
import Storage from "@mui/icons-material/Storage"
import FilterAlt from "@mui/icons-material/FilterAlt"
import AutoAwesome from "@mui/icons-material/AutoAwesome"
import Terminal from "@mui/icons-material/Terminal"
import Shield from "@mui/icons-material/Shield"
import Search from "@mui/icons-material/Search"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { useState, useEffect } from "react"

const techStack = [
  { name: "Python", category: "Language" },
  { name: "Streamlit", category: "Interface" },
  { name: "LangChain", category: "Ingestion" },
  { name: "FAISS", category: "Vector Search" },
  { name: "Sentence-Transformers", category: "Embeddings" },
  { name: "Gemini API", category: "Generation" },
]

const features = [
  "Answers grounded in and cited from the source papers",
  "Two-stage retrieval: bi-encoder recall + cross-encoder rerank",
  "Extractive mode with zero LLM calls, or streamed Gemini generation",
  "Relevance threshold blocks hallucinated out-of-corpus answers",
  "Expandable source cards with similarity scores per chunk",
  "Jailbreak-resistant system prompt for grounded generation",
  "Synthetic per-paper metadata cards for acronym/title queries",
  "Cached FAISS index keyed to a corpus + model fingerprint",
  "Dynamic arXiv metadata lookup with local caching",
]

import type { SvgIconComponent as MuiIcon } from "@mui/icons-material"

type Challenge = {
  title: string
  problem: string
  solution: string
  icon: MuiIcon
}

const challenges: Challenge[] = [
  {
    title: "Hallucination on Out-of-Corpus Queries",
    problem:
      "Raw cosine similarity can't separate in-corpus from out-of-corpus queries — both land in the same ~0.54–0.65 band, so the model would confidently answer questions the corpus can't support",
    solution:
      "Gate on the cross-encoder rerank score instead: a corpus-calibrated MIN_RELEVANCE_SCORE = 0.10 threshold, where genuine out-of-corpus queries score ≈0.00 and real queries score ≥0.6",
    icon: FilterAlt,
  },
  {
    title: "Bare-Acronym & Title Queries",
    problem:
      "Queries like \"ScaNN\" or \"What is FAISS?\" barely appear in a paper's own body text, so pure chunk embeddings often miss the paper the query is actually about",
    solution:
      "A synthetic per-paper metadata card (title, common name, authors, opening text) is embedded alongside real chunks, and the cross-encoder reranks the joint (query, passage) pair rather than comparing independent vectors",
    icon: Search,
  },
  {
    title: "Prompt Injection & Jailbreak Attempts",
    problem:
      "A grounded system prompt still needs to resist adversarial prompts that try to make the model ignore its sources or answer from world knowledge",
    solution:
      "A strict system prompt enforces citation and grounding; verified against a battery of jailbreak and mixed legitimate/adversarial prompts documented in EVALUATION.md, degrading to a safe refusal rather than an ungrounded answer",
    icon: Shield,
  },
]

const howItWorks = [
  { step: "1", title: "Ask a Question", description: "User submits a query in natural language through the Streamlit interface" },
  { step: "2", title: "Recall + Rerank", description: "FAISS pulls 40 candidate chunks by cosine similarity, then a cross-encoder re-scores them for precision" },
  { step: "3", title: "Grounded Generation", description: "Gemini (or extractive fallback) generates an answer strictly from the top-ranked chunks" },
  { step: "4", title: "Cited Answer", description: "Streamed answer is shown with expandable source cards and per-chunk relevance scores" },
]

const pipelineStages = [
  { name: "Ingest & Chunk", role: "LangChain loaders", detail: "~120 words/chunk, 20-word overlap" },
  { name: "Embed", role: "BAAI/bge-small-en-v1.5", detail: "Local bi-encoder, MPS/CUDA/CPU" },
  { name: "Vector Store", role: "FAISS IndexFlatIP", detail: "Exact cosine over ~3,300 chunks" },
  { name: "Retrieve", role: "Bi-encoder recall", detail: "Top 40 candidates per query" },
  { name: "Rerank", role: "ms-marco-MiniLM-L-6-v2", detail: "Cross-encoder relevance scoring" },
  { name: "Generate", role: "Extractive or Gemini", detail: "Grounded, cited, streamed" },
]

export default function RagSearchCaseStudy() {
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
            <a href="https://github.com/longmanngithub/RAG-Based-AI-Search-System" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">View Code</span>
                <span className="sm:hidden">Code</span>
              </Button>
            </a>
            <a href="https://seir-rag.bedrock.monster" target="_blank" rel="noopener noreferrer">
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
                RAG-Based AI <span className="text-primary">Search System</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A Retrieval-Augmented Generation search engine over 23 AI/ML research papers — ask a question, get an answer grounded in and cited from the actual papers, with visible sources and similarity scores.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[16px] text-primary" />
                  <span>2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-[16px] text-primary" />
                  <span>CS 382: Final Project</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-[16px] text-primary" />
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

            {/* Animated Pipeline Diagram */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl sm:rounded-2xl overflow-hidden glow-cyan">
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground truncate">rag_pipeline.svg — Live</span>
                </div>

                {/* Pipeline Diagram */}
                <div className="p-4 sm:p-8 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Node Row 1: Corpus */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-40 sm:w-48 ${
                        activeNode === 0
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <FilePresent className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">23 arXiv Papers</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Chunk + Embed</span>
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
                          <Layers className="text-[8px] sm:text-[10px]" />
                          <span>~3,300 chunks</span>
                        </div>
                      </div>
                    </div>

                    {/* Node Row 2: Vector Store */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-40 sm:w-48 ${
                        activeNode === 1 || activeNode === 2
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <Storage className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 1 || activeNode === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">FAISS + Reranker</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Recall → Rerank</span>
                      </div>
                    </div>

                    {/* Connection Line 2 */}
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
                          <AutoAwesome className="text-[8px] sm:text-[10px]" />
                          <span>Top-k chunks</span>
                        </div>
                      </div>
                    </div>

                    {/* Node Row 3: Interface */}
                    <div className="flex justify-center">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 w-40 sm:w-48 ${
                        activeNode === 3
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                          : 'border-border bg-card/50'
                      }`}>
                        <Terminal className={`text-[24px] sm:text-[32px] mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">Streamlit UI</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Cited, streamed answer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                Animated pipeline — corpus → retrieval → generation → interface
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
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Query Pipeline</h2>
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

      {/* Pipeline Stages */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Architecture</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">From PDF to Answer</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {pipelineStages.map((stage, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-2xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layers className="text-[16px] sm:text-[20px] text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-foreground truncate">{stage.name}</p>
                  <p className="text-xs text-muted-foreground">{stage.role}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground/70 font-mono truncate">{stage.detail}</p>
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
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Recall + Rerank Query</h2>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-lg sm:rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">rag/embed_store.py</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`def query(self, query_text: str, top_k: int = 3):
    """Two-stage retrieval: bi-encoder recall, then
    cross-encoder rerank. Returns (chunk, relevance)."""
    query_vec = self.model.encode(
        [QUERY_INSTRUCTION + query_text], convert_to_numpy=True
    ).astype(np.float32)
    faiss.normalize_L2(query_vec)

    # Stage 1: recall a wide candidate pool via FAISS
    pool = min(RERANK_CANDIDATE_POOL, len(self.chunks))
    _, indices = self.index.search(query_vec, pool)
    candidates = [self.chunks[i] for i in indices[0] if i != -1]

    # Stage 2: cross-encoder re-scores each (query, passage) pair
    logits = self.reranker.predict(
        [[query_text, c.text] for c in candidates]
    )
    relevance = 1.0 / (1.0 + np.exp(-logits))
    order = np.argsort(relevance)[::-1][:top_k]

    return [(candidates[i], float(relevance[i])) for i in order]`}</code>
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
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-destructive">Problem</p>
                        <p className="text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Solution</p>
                        <p className="text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* CTA Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">Explore the Source Code</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Run it locally with Streamlit, or read the full retrieval/generation evaluation write-up in the repo.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://github.com/longmanngithub/RAG-Based-AI-Search-System" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                <Github className="text-[16px] mr-2" />
                View on GitHub
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section></Reveal>
    </main>
  )
}
