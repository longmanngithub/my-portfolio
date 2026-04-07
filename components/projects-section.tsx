"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("projects.ecoInventoryTitle"),
      description: t("projects.ecoInventoryDesc"),
      tech: ["Laravel", "Alpine.js", "Tailwind CSS"],
      pinned: true,
      github: "https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel",
      // demo: "",
      caseStudy: "/projects/ecoinventory",
      filename: "ecoinventory.blade.php",
      code: [
        { text: "@extends('layouts.app')", color: "text-primary" },
        { text: "@section('content')", color: "text-primary" },
        { text: "<div class=\"container mx-auto\">", color: "text-foreground" },
        { text: "  <h1>Inventory</h1>", color: "text-foreground" },
        { text: "  <ul>", color: "text-foreground" },
        { text: "    @foreach($products as $product)", color: "text-primary" },
        { text: "      <li>{{ $product->name }} — Stock: {{ $product->stock }}</li>", color: "text-muted-foreground" },
        { text: "    @endforeach", color: "text-primary" },
        { text: "  </ul>", color: "text-foreground" },
        { text: "</div>", color: "text-foreground" },
        { text: "@endsection", color: "text-primary" },
      ],
    },
    {
      title: t("projects.notepadTitle"),
      description: t("projects.notepadDesc"),
      tech: ["Python", "PyQt5", "Qt Designer"],
      pinned: true,
      github: "https://github.com/longmanngithub/NotePad",
      // demo: "",
      caseStudy: "/projects/notepad",
      filename: "main.py",
      code: [
        { text: "class NotePad(QMainWindow, Ui_NotePad):", color: "text-primary" },
        { text: "    def __init__(self):", color: "text-foreground" },
        { text: "        super().__init__()", color: "text-foreground" },
        { text: "        self.setupUi(self)", color: "text-foreground" },
        { text: "        self.show()", color: "text-muted-foreground" },
        { text: "        self.filename = None", color: "text-foreground" },
        { text: "        self.actionSave.triggered.connect(", color: "text-foreground" },
        { text: "            self.save_file)", color: "text-primary" },
      ],
    },
    {
      title: t("projects.scan2AttendTitle"),
      description: t("projects.scan2AttendDesc"),
      tech: ["ESP32", "Laravel", "Nuxt.js", "PostgreSQL"],
      pinned: false,
      github: "https://github.com/longmanngithub/Scan2Attend-esp",
      // demo: "",
      caseStudy: "/projects/scan2attend",
      filename: "ESP32_Fingerprint_Attendance.ino",
      code: [
        { text: "if (p == FINGERPRINT_OK) {", color: "text-primary" },
        { text: "  int fpId = finger.fingerID;", color: "text-foreground" },
        { text: "  String scannedAt = getRTCDateTime();", color: "text-foreground" },
        { text: '  doc["fingerprint_id"] = fpId;', color: "text-foreground" },
        { text: '  doc["scanned_at"] = scannedAt;', color: "text-muted-foreground" },
        { text: "  httpPostJson(checkInURL, payload);", color: "text-foreground" },
        { text: "  showStudent(name, timeStr);", color: "text-foreground" },
        { text: "  buzzerSuccess();", color: "text-primary" },
      ],
    },
    {
      title: t("projects.localEventsTitle"),
      description: t("projects.localEventsDesc"),
      tech: ["Laravel 11", "Tailwind CSS", "MySQL", "DigitalOcean"],
      pinned: false,
      github: "https://github.com/longmanngithub/CS426-cloud-final-project",
      // demo: "",
      caseStudy: "/projects/local_events",
      filename: "EventController.php",
      code: [
        { text: "public function browse(Request $request)", color: "text-primary" },
        { text: "{", color: "text-foreground" },
        { text: "  $events = Event::with('category')", color: "text-foreground" },
        { text: "    ->when($request->search, fn($q) =>", color: "text-foreground" },
        { text: "      $q->whereRaw('LOWER(title) LIKE ?',", color: "text-muted-foreground" },
        { text: "        ['%'.strtolower($request->search).'%']))", color: "text-muted-foreground" },
        { text: "    ->paginate(12);", color: "text-foreground" },
        { text: "  return view('events.browse', compact('events'));", color: "text-primary" },
      ],
    },
    {
      title: t("projects.aiHandTitle"),
      description: t("projects.aiHandDesc"),
      tech: ["Three.js", "MediaPipe", "WebGL"],
      pinned: false,
      github: "https://github.com/longmanngithub/AI-Hand-Interaction-System",
      // demo: "",
      caseStudy: "/projects/ai_hand",
      filename: "index.html",
      code: [
        { text: "hands.onResults((results) => {", color: "text-primary" },
        { text: "  const landmarks = results.multiHandLandmarks[0];", color: "text-foreground" },
        { text: "  const thumbTip = landmarks[4];", color: "text-foreground" },
        { text: "  const indexTip = landmarks[8];", color: "text-foreground" },
        { text: "  const distance = Math.sqrt(", color: "text-muted-foreground" },
        { text: "    (thumbTip.x - indexTip.x) ** 2 +", color: "text-muted-foreground" },
        { text: "    (thumbTip.y - indexTip.y) ** 2);", color: "text-muted-foreground" },
        { text: "  handInteraction.pinchDistance = distance;", color: "text-primary" },
      ],
    },
  ]

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{t("projects.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("projects.title")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="relative bg-card border border-border rounded-xl overflow-hidden glow-cyan-hover transition-all duration-300">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-muted-foreground">{project.filename}</span>
                  {project.pinned && (
                    <span className="ml-auto text-[10px] text-primary">{t("projects.pinned")}</span>
                  )}
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm glass-subtle no-font-change">
                  {project.code.map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-6">
                      <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                        {String(lineIndex + 1).padStart(2, "0")}
                      </span>
                      <span className={line.color}>{line.text}</span>
                    </div>
                  ))}
                  <div className="mt-1">
                    <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                      {String(project.code.length + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-block w-1.5 h-4 bg-primary terminal-cursor" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 space-y-4 border-t border-border/50">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs text-muted-foreground bg-secondary/60 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground bg-transparent h-8 text-xs transition-colors duration-200 hover:bg-gray-400 hover:border-gray-400 dark:hover:bg-zinc-200 dark:hover:border-zinc-200"
                      >
                        {t("projects.code")}
                      </Button>
                    </a>
                    {/* <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs">
                        {t("projects.demo")}
                      </Button>
                    </a> */}
                    <Link href={project.caseStudy}>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 h-8 text-xs">
                        {t("projects.caseStudy")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Me a Coffee */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6 glow-cyan text-center max-w-md mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">☕</div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {t("contact.buyMeCoffee")}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t("contact.buyMeCoffeeDesc")}
              </p>
            </div>
            <a
              href="https://link.payway.com.kh/wt410024D"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 cursor-pointer"
            >
              <span>☕</span>
              {t("contact.buyMeCoffeeButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
