"use client"

import { Button } from "@/components/ui/button"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import ExternalLink from "@mui/icons-material/OpenInNew"
import Github from "@mui/icons-material/GitHub"
import FilePresent from "@mui/icons-material/Description"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { assetUrl } from "@/lib/assets"

const techStack = ["Python", "Streamlit", "LangChain", "FAISS", "Sentence-Transformers", "Gemini API"]

// Six pipeline stages, PDF to cited answer — see EVALUATION.md in the repo
// for the full methodology and raw numbers behind every figure below.
const pipeline = [
  {
    title: "Ingest & Chunk",
    detail: "LangChain loaders split each paper into ~120-word chunks with 20-word overlap, plus a synthetic metadata card per paper for acronym and title queries.",
  },
  {
    title: "Embed",
    detail: "BAAI/bge-small-en-v1.5 turns every chunk into a vector, run locally on MPS, CUDA, or CPU.",
  },
  {
    title: "Vector Store",
    detail: "FAISS IndexFlatIP holds all 3,330 chunks as L2-normalized vectors for exact cosine search.",
  },
  {
    title: "Retrieve",
    detail: "A query recalls the 40 nearest candidates by cosine similarity.",
  },
  {
    title: "Rerank & Gate",
    detail: "A cross-encoder rescores each candidate against the query directly, then a calibrated relevance threshold drops anything that doesn't clear the bar.",
  },
  {
    title: "Generate",
    detail: "An extractive fallback or streamed Gemini answer is built strictly from what survives — cited, grounded, and never blank.",
  },
]

const decisions = [
  {
    title: "Gate on rerank score, not cosine",
    text: "Raw cosine similarity puts in-corpus and out-of-corpus queries in the same 0.54–0.65 band — no cosine cutoff separates them. Gating on the cross-encoder's rerank score instead opens a ~0.95-wide margin between the two.",
  },
  {
    title: "Metadata cards for bare acronyms",
    text: "A query like “What is ScaNN?” barely touches that paper's own body text. A synthetic per-paper card — title, common name, authors — sits alongside the real chunks so the reranker has something to match against.",
  },
  {
    title: "A strict prompt over a bigger gate",
    text: "Even a clean relevance gate can't stop every jailbreak. A grounded system prompt enforces citations and treats retrieved text as data, not instructions — verified against a battery of adversarial prompts.",
  },
]

const evalStats = [
  { value: "9/10", label: "Retrieval queries fully correct" },
  { value: "0/4", label: "Jailbreak attempts got through" },
  { value: "0.10", label: "Relevance threshold, in a ~0.95-wide margin" },
]

const lessons = [
  "Pick the signal, not just a threshold — cosine similarity alone can't gate hallucinations; the cross-encoder's rerank score can.",
  "Short queries break bi-encoders — acronyms need a second, joint-scoring pass to be found at all.",
  "Grounding lives in the prompt, not just the gate — a faster model happily guessed “Paris” the moment a borderline query slipped past retrieval.",
]

export default function RagSearchCaseStudy() {
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-24 sm:pb-32 space-y-28 sm:space-y-40">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">Case Study</p>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              RAG-Based AI <span className="text-primary">Search System</span>
            </h1>
            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              Ask a question, get an answer grounded in and cited from 23 real AI/ML research papers — with visible sources and similarity scores, not a confident guess.
            </p>

            <p className="mt-6 text-sm text-muted-foreground/80">
              2026 · CS 382: Final Project · Solo Project
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs text-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="relative rounded-3xl overflow-hidden glow-cyan">
              <video controls preload="metadata" className="w-full aspect-video bg-black" src={assetUrl("/rag-search/demo.mp4")}>
                Your browser doesn&apos;t support embedded video.{" "}
                <a href={assetUrl("/rag-search/demo.mp4")} className="text-primary underline">Download it here</a>.
              </video>
            </div>
            <a
              href={assetUrl("/rag-search/slides.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <FilePresent className="text-[15px]" />
              Prefer slides? View the deck (PDF)
            </a>
          </div>
        </section>

        {/* How It Works */}
        <Reveal>
          <section>
            <p className="section-label mb-3">Architecture</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              From PDF to Cited Answer
            </h2>

            <div className="max-w-2xl">
              {pipeline.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 sm:gap-8 py-5 sm:py-6 border-t border-border first:border-0 first:pt-0"
                >
                  <span className="font-display text-xl sm:text-2xl font-bold text-primary/30 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm sm:text-base leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Design Decisions */}
        <Reveal>
          <section>
            <p className="section-label mb-3">Design Decisions</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              Built to Refuse What It Doesn&apos;t Know
            </h2>

            <div className="max-w-2xl">
              {decisions.map((d, index) => (
                <div key={d.title} className="py-6 sm:py-8 border-t border-border first:border-0 first:pt-0">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{d.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">{d.text}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Evaluation Results */}
        <Reveal>
          <section>
            <p className="section-label mb-3">Proof, Not Just Claims</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              Evaluation Results
            </h2>

            <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl">
              {evalStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-snug text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 sm:mt-12 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              The one edge case worth naming: “What is the capital of France?” scores 0.945 because the Self-RAG paper quotes that exact question as a worked example — real retrieval, not a bug. The relevance gate lets it through; the grounded system prompt is what actually declines to answer “Paris.” Swapping in the faster <code className="text-foreground">gemini-3.1-flash-lite</code> model breaks that guarantee — it answers “Paris” outright — which is why the slower, stricter <code className="text-foreground">gemini-2.5-flash</code> stays the default.
            </p>

            <a
              href="https://github.com/longmanngithub/RAG-Based-AI-Search-System/blob/main/EVALUATION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Read the full evaluation write-up <ExternalLink className="text-[14px]" />
            </a>
          </section>
        </Reveal>

        {/* What I Learned */}
        <Reveal>
          <section>
            <p className="section-label mb-3">Retrospective</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8 sm:mb-10">
              What I Learned
            </h2>

            <ul className="max-w-2xl space-y-4 sm:space-y-5">
              {lessons.map((line) => (
                <li key={line} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Code Sample */}
        <Reveal>
          <section>
            <p className="section-label mb-3">Code Sample</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
              Recall + Rerank Query
            </h2>

            <p className="font-mono text-xs text-muted-foreground/70 mb-3">rag/embed_store.py</p>
            <pre className="rounded-2xl border border-border bg-card p-4 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
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
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="text-center max-w-xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Explore the Source Code
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Run it locally with Streamlit, or dig into the code on GitHub.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a href="https://github.com/longmanngithub/RAG-Based-AI-Search-System" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
          </section>
        </Reveal>
      </div>
    </main>
  )
}
