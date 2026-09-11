"use client"

import { FloatingNav, AppleCodeViewer } from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import { assetUrl } from "@/lib/assets"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AmicroGitHubLink } from "@/components/ui/amicro-link-buttons"
import FilePresentIcon from "@mui/icons-material/Description"
import ExternalLinkIcon from "@mui/icons-material/OpenInNew"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { cn } from "@/lib/utils"

const techStack = [
  "Python",
  "Streamlit",
  "LangChain",
  "FAISS",
  "Sentence-Transformers",
  "Gemini API",
]

const pipeline = [
  {
    title: "Ingest & Chunk",
    detail:
      "LangChain loaders split each paper into ~120-word chunks with 20-word overlap, plus a synthetic metadata card per paper for acronym and title queries.",
  },
  {
    title: "Embed",
    detail:
      "BAAI/bge-small-en-v1.5 turns every chunk into a vector, run locally on Apple Silicon MPS, CUDA, or CPU.",
  },
  {
    title: "Vector Store",
    detail:
      "FAISS IndexFlatIP holds all 3,330 chunks as L2-normalized vectors for exact cosine search.",
  },
  {
    title: "Retrieve",
    detail:
      "A query recalls the 40 nearest candidates by cosine similarity in single-digit milliseconds.",
  },
  {
    title: "Rerank & Gate",
    detail:
      "A cross-encoder rescores each candidate against the query directly, then a calibrated relevance threshold drops anything that doesn't clear the bar.",
  },
  {
    title: "Generate",
    detail:
      "An extractive fallback or streamed Gemini answer is built strictly from what survives — cited, grounded, and never blank.",
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

const queryCode = `def query(self, query_text: str, top_k: int = 3):
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

    return [(candidates[i], float(relevance[i])) for i in order]`

/* ---------------------------------------------------------------------------
 * Architecture Diagram Components with Authentic Tech Logos
 * ------------------------------------------------------------------------- */
function ArchitectureDiagram() {
  return (
    <div className="relative my-10 w-full overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card/80 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-8 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 dark:before:via-white/20 before:to-transparent">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.16em] font-semibold text-primary">
          System Dataflow Architecture
        </span>
        <span className="font-mono text-[11px] text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full border border-black/[0.04] dark:border-white/[0.06]">
          arXiv Corpus → Streamlit UI
        </span>
      </div>

      {/* Responsive Diagram Grid / Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 relative">
        {/* Step 1: Document Corpus */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">01 · INGESTION</span>
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/10 text-red-500 font-bold font-mono text-xs">
              PDF
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">23 arXiv Papers</h4>
              <p className="text-[11px] text-muted-foreground font-mono">Foundational & RAG</p>
            </div>
          </div>
        </div>

        {/* Step 2: LangChain Loader */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">02 · CHUNKING</span>
            {/* LangChain Parrot Logo */}
            <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">LangChain</h4>
            <p className="text-[11px] text-muted-foreground font-mono">120-word + Meta cards</p>
          </div>
        </div>

        {/* Step 3: Hugging Face BAAI Embeddings */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">03 · DENSE EMBED</span>
            {/* Hugging Face Logo */}
            <svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">bge-small-en-v1.5</h4>
            <p className="text-[11px] text-muted-foreground font-mono">Apple Silicon MPS / CUDA</p>
          </div>
        </div>

        {/* Step 4: Meta FAISS Vector Store */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">04 · VECTOR INDEX</span>
            <span className="font-mono text-[10px] text-blue-500 font-bold">FAISS</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">IndexFlatIP</h4>
            <p className="text-[11px] text-muted-foreground font-mono">3,330 L2 Chunks</p>
          </div>
        </div>
      </div>

      {/* Downward / Cross connection indicator */}
      <div className="my-3 flex items-center justify-center gap-2 text-muted-foreground/40 font-mono text-xs">
        <ArrowDownwardIcon style={{ fontSize: 16 }} />
        <span>Two-Stage Retrieval & Grounded Generation</span>
        <ArrowDownwardIcon style={{ fontSize: 16 }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Step 5: Recall */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">05 · RECALL</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Dense Search</h4>
            <p className="text-[11px] text-muted-foreground font-mono">Top 40 Candidates</p>
          </div>
        </div>

        {/* Step 6: Cross-Encoder Reranker */}
        <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-primary/[0.03] p-4 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-primary font-bold">06 · RERANK & GATE</span>
            <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">ms-marco</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Cross-Encoder</h4>
            <p className="text-[11px] text-primary font-mono">Threshold &ge; 0.10 Gate</p>
          </div>
        </div>

        {/* Step 7: Google Gemini */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">07 · GENERATE</span>
            {/* Gemini Star Logo */}
            <svg className="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Gemini 2.5 Flash</h4>
            <p className="text-[11px] text-muted-foreground font-mono">Grounded Citations</p>
          </div>
        </div>

        {/* Step 8: Streamlit UI */}
        <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-secondary/30 p-4 transition-all hover:border-primary/40">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] text-muted-foreground font-semibold">08 · INTERFACE</span>
            {/* Streamlit Crown Logo */}
            <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2L18.2 8 12 11.8 5.8 8 12 4.2zM5.5 9.5l5.5 3.4v6.8l-5.5-3.4V9.5zm13 0v6.8l-5.5 3.4v-6.8l5.5-3.4z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Streamlit App</h4>
            <p className="text-[11px] text-muted-foreground font-mono">Live Citations + Scores</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RagSearchCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-28">
      <FloatingNav
        title="RAG Search"
        year="2026"
        github="https://github.com/longmanngithub/RAG-Based-AI-Search-System"
        liveDemo="https://seir-rag.bedrock.monster"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-36 space-y-24 sm:space-y-36">
        {/* Hero Section (Restored 2-Column Layout) */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 font-mono text-[11px] font-medium text-primary backdrop-blur-md">
              <span>Case Study</span>
              <span className="text-primary/40">•</span>
              <span>2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-foreground">
              RAG-Based AI <span className="text-primary">Search System</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Ask a question, get an answer grounded in and cited from 23 real AI/ML research papers — with visible sources and similarity scores, not a confident guess.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium pt-1">
              <span>2026</span>
              <span className="text-muted-foreground/40">•</span>
              <span>CS 382: Final Project</span>
              <span className="text-muted-foreground/40">•</span>
              <span>Solo Project</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex rounded-full border border-black/[0.06] dark:border-white/[0.1] bg-secondary/80 px-3 py-1 font-mono text-xs font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Video Demo Theater Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-black shadow-[0_24px_50px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.8)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/20 before:to-transparent">
              <video
                controls
                preload="metadata"
                className="w-full aspect-video bg-black object-contain"
                src={assetUrl("/rag-search/demo.mp4")}
              >
                Your browser doesn&apos;t support embedded video.
              </video>
            </div>

            <a
              href={assetUrl("/rag-search/slides.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <FilePresentIcon style={{ fontSize: 16 }} />
              <span>Prefer slides? View the deck (PDF)</span>
              <ExternalLinkIcon style={{ fontSize: 12 }} />
            </a>
          </div>
        </section>

        {/* Architecture Section (Restored + New System Architecture Diagram) */}
        <Reveal>
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Architecture
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              From PDF to Cited Answer
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              A dual-stage neural pipeline: dense vector recall over normalized FAISS embeddings, followed by pairwise cross-encoder score gating.
            </p>

            {/* Visual System Architecture Diagram */}
            <ArchitectureDiagram />

            {/* Pipeline Steps List */}
            <div className="max-w-2xl mt-8">
              {pipeline.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 sm:gap-8 py-5 sm:py-6 border-t border-black/[0.06] dark:border-white/[0.08] first:border-0 first:pt-0"
                >
                  <span className="font-display text-xl sm:text-2xl font-bold text-primary/30 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Design Decisions (Restored) */}
        <Reveal>
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Design Decisions
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-12">
              Built to Refuse What It Doesn&apos;t Know
            </h2>

            <div className="max-w-2xl">
              {decisions.map((d) => (
                <div
                  key={d.title}
                  className="py-6 sm:py-8 border-t border-black/[0.06] dark:border-white/[0.08] first:border-0 first:pt-0"
                >
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Evaluation Results (Restored) */}
        <Reveal>
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Proof, Not Just Claims
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-12">
              Evaluation Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-2xl">
              {evalStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-card/60 dark:bg-card/40 backdrop-blur-xl p-5"
                >
                  <p className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-snug text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 sm:mt-10 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              The one edge case worth naming: “What is the capital of France?” scores 0.945 because the Self-RAG paper quotes that exact question as a worked example — real retrieval, not a bug. The relevance gate lets it through; the grounded system prompt is what actually declines to answer “Paris.” Swapping in the faster <code className="text-foreground font-mono">gemini-3.1-flash-lite</code> model breaks that guarantee — it answers “Paris” outright — which is why the slower, stricter <code className="text-foreground font-mono">gemini-2.5-flash</code> stays the default.
            </p>

            <a
              href="https://github.com/longmanngithub/RAG-Based-AI-Search-System/blob/main/EVALUATION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
            >
              <span>Read the full evaluation write-up</span>
              <ExternalLinkIcon style={{ fontSize: 13 }} />
            </a>
          </section>
        </Reveal>

        {/* What I Learned (Restored) */}
        <Reveal>
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Retrospective
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
              What I Learned
            </h2>

            <ul className="max-w-2xl space-y-4">
              {lessons.map((line) => (
                <li
                  key={line}
                  className="relative pl-5 text-sm sm:text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary"
                >
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Code Sample (Restored) */}
        <Reveal>
          <AppleCodeViewer
            sectionLabel="Code Sample"
            title="Recall + Rerank Query"
            description="Two-stage query execution: candidate pool retrieval followed by pairwise cross-encoder score logits."
            fileName="rag/embed_store.py"
            language="python"
            code={queryCode}
          />
        </Reveal>

        {/* CTA (Restored) */}
        <Reveal>
          <section className="text-center max-w-xl mx-auto py-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Explore the Source Code
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Run it locally with Streamlit, or dig into the code on GitHub.
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              <AmicroGitHubLink
                href="https://github.com/longmanngithub/RAG-Based-AI-Search-System"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </AmicroGitHubLink>
              <Link href="/#contact">
                <Button variant="outline" className="border-black/[0.08] dark:border-white/[0.12] bg-secondary/80 hover:bg-secondary rounded-full px-6">
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
