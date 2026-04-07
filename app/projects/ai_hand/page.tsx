"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Calendar, Clock, Users, Hand, Sparkles, Eye, Cpu, Box, Zap, CheckCircle2, Maximize2, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { type LucideIcon } from "lucide-react"

const techStack = [
  { name: "Three.js", category: "3D Engine" },
  { name: "MediaPipe Hands", category: "AI/ML" },
  { name: "WebGL", category: "Graphics" },
  { name: "EffectComposer", category: "Post-Processing" },
  { name: "lil-gui", category: "UI Controls" },
  { name: "ES Modules", category: "Architecture" },
]

const shapes = [
  { name: "Heart", formula: "x = 16sin³(t), y = 13cos(t) − 5cos(2t) − 2cos(3t) − cos(4t)", description: "Classic parametric heart curve with volumetric depth" },
  { name: "Saturn", formula: "Sphere + tilted ring (r = 13–19, tilt = π/6)", description: "Spherical planet body with a flat, tilted particle ring orbiting around it" },
  { name: "Flower", formula: "r = 10·sin(3u)·sin(v) — Harmonic Rose", description: "3D harmonic rose curve that creates petal-like formations" },
  { name: "Buddha", formula: "Head sphere + body ellipsoid + base ring", description: "Abstract seated figure constructed from 3 mathematical primitives" },
  { name: "Firework", formula: "Random spherical distribution (r ∈ [0, 18])", description: "Explosive random scatter simulating a fireworks burst" },
]

const gestures = [
  { gesture: "Idle / Relaxed Hand", effect: "Particles drift gently in shape", icon: Hand },
  { gesture: "Pinch (Thumb + Index)", effect: "Particles contract and implode to center", icon: Eye },
  { gesture: "Wide Open Hand", effect: "Particles explode outward with chaotic energy", icon: Zap },
]

const vfxFeatures = [
  "AfterimagePass — smooth motion blur trails that follow particle movement",
  "UnrealBloomPass — high-end neon glow effect for cyberpunk aesthetics",
  "AdditiveBlending — particles stack their luminance when overlapping",
  "Reinhard ToneMapping — preserves detail in bright bloom areas",
  "Fog (exponential) — depth-based particle fade for atmosphere",
  "Auto-rotate OrbitControls — continuous gentle camera rotation",
]

type ChallengeItem = {
  title: string
  problem: string
  solution: string
  icon: LucideIcon
}

const challenges: ChallengeItem[] = [
  {
    title: "Real-Time Hand Detection Performance",
    problem: "Running MediaPipe hand tracking at 30fps while simultaneously rendering 1,000 particles with post-processing effects caused frame drops",
    solution: "Used modelComplexity: 0 for lightweight detection, capped pixel ratio at 1.5, and disabled WebGL antialiasing since the bloom pass provides its own smoothing",
    icon: Cpu,
  },
  {
    title: "Mapping 2D Gestures to 3D Space",
    problem: "MediaPipe returns 2D normalized coordinates (0-1) for hand landmarks, but the particle system lives in 3D space with arbitrary camera angles",
    solution: "Instead of mapping position, I mapped the gesture intensity (pinch distance between thumb and index finger) to a scalar value that controls particle scale and explosion force",
    icon: Box,
  },
  {
    title: "Smooth Shape Transitions",
    problem: "Snapping particles instantly to new target positions looked jarring when switching shapes",
    solution: "Each frame interpolates particle positions toward targets using lerp (posArray += (target - posArray) * 0.05), creating smooth morphing transitions between any two shapes",
    icon: Sparkles,
  },
]

export default function AIHandCaseStudy() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <main className="min-h-screen bg-background">
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-[101] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <iframe
            src="/demos/ai-hand/index.html"
            className="w-full h-full border-0"
            allow="camera; microphone"
            title="AI Hand Interaction Demo — Fullscreen"
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/longmanngithub/AI-Hand-Interaction-System" target="_blank" rel="noopener noreferrer">
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
                <Badge variant="outline" className="border-purple-500 text-purple-500">
                  Interactive Demo
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                AI Hand <span className="text-primary text-glow">Interaction</span> System
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A real-time 3D particle simulation controlled by hand gestures via your webcam. 1,000 particles morph between 5 mathematical shapes and react to your pinch and spread gestures with neon post-processing effects.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Hobby Project</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Solo</span>
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

            {/* Live Demo Window */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden glow-cyan">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">Live Demo — Hand Tracking</span>
                  </div>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Open fullscreen"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                  </button>
                </div>
                
                <div className="relative" style={{ aspectRatio: '16/10' }}>
                  <iframe
                    ref={iframeRef}
                    src="/demos/ai-hand/index.html"
                    className="w-full h-full border-0"
                    allow="camera; microphone"
                    title="AI Hand Interaction Demo"
                  />
                </div>
              </div>
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                ↑ Click &quot;Start Hand Tracking&quot; to try it live • Use pinch and spread gestures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gesture Controls */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// How to Interact"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Hand Gesture Controls</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {gestures.map((g, index) => {
              const Icon = g.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">{g.gesture}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{g.effect}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mathematical Shapes */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Mathematical Morphology"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">5 Procedural Shapes</h2>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {shapes.map((shape, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm sm:text-base">{["💜", "🪐", "🌸", "🧘", "🎆"][index]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{shape.name}</h3>
                  </div>
                  <p className="text-xs text-primary font-mono mb-1 break-all sm:break-normal">{shape.formula}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{shape.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Pipeline"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How It Works</h2>
          </div>

          <div className="grid sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { step: "1", title: "Webcam Feed", desc: "Camera captures 640×480 video frames at ~30fps", icon: Eye },
              { step: "2", title: "MediaPipe AI", desc: "Detects 21 hand landmarks in real-time using ML", icon: Cpu },
              { step: "3", title: "Gesture Math", desc: "Calculates pinch distance between thumb & index tip", icon: Hand },
              { step: "4", title: "Particle Physics", desc: "Maps gesture intensity to particle scale & explosion force", icon: Sparkles },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-4 sm:p-5 glow-cyan-hover transition-all duration-300 relative">
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-primary bg-primary/10 w-5 h-5 rounded flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* VFX */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Visual Effects"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Post-Processing Pipeline</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {vfxFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Heart Shape Generator</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">index.html — calculateShape(&apos;Heart&apos;)</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`function calculateShape(type) {
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let x, y, z;

        if (type === 'Heart') {
            const t = Math.random() * Math.PI * 2;
            const thick = (Math.random() - 0.5) * 5;

            // Parametric heart equations
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t)
              - 5 * Math.cos(2 * t)
              - 2 * Math.cos(3 * t)
              - Math.cos(4 * t);
            z = thick;  // volumetric depth

            x *= 0.5;
            y *= 0.5;
        }

        targetArray[i3] = x;
        targetArray[i3 + 1] = y;
        targetArray[i3 + 2] = z;
    }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Try It Yourself</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            The full source code is a single HTML file — open it with a local server and grant camera access. Have fun! 🖐
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Button onClick={() => setIsFullscreen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
              <Maximize2 className="h-4 w-4 mr-2" />
              Open Fullscreen Demo
            </Button>
            <a href="https://github.com/longmanngithub/AI-Hand-Interaction-System" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-border bg-transparent">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </a>
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
