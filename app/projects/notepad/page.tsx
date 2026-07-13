"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ArrowLeft from "@mui/icons-material/ArrowBack"
import Github from "@mui/icons-material/GitHub"
import Calendar from "@mui/icons-material/CalendarMonth"
import Clock from "@mui/icons-material/Schedule"
import Users from "@mui/icons-material/People"
import Heart from "@mui/icons-material/Favorite"
import FileText from "@mui/icons-material/Description"
import Save from "@mui/icons-material/Save"
import Printer from "@mui/icons-material/Print"
import Type from "@mui/icons-material/TextFields"
import AlignLeft from "@mui/icons-material/FormatAlignLeft"
import Bold from "@mui/icons-material/FormatBold"
import Italic from "@mui/icons-material/FormatItalic"
import Underline from "@mui/icons-material/FormatUnderlined"
import Palette from "@mui/icons-material/Palette"
import Undo2 from "@mui/icons-material/Undo"
import Redo2 from "@mui/icons-material/Redo"
import FileDown from "@mui/icons-material/FileDownload"
import CheckCircle2 from "@mui/icons-material/CheckCircle"
import Sparkles from "@mui/icons-material/AutoAwesome"
import Code2 from "@mui/icons-material/Code"
import Layers from "@mui/icons-material/Layers"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { useState, useEffect } from "react"
import type { SvgIconComponent as LucideIcon } from "@mui/icons-material"

const techStack = [
  { name: "Python", category: "Language" },
  { name: "PyQt5", category: "GUI Framework" },
  { name: "Qt Designer", category: "UI Builder" },
  { name: "Fusion Style", category: "Theme" },
]

const features = [
  { icon: FileText, name: "New / Open / Save / Save As", desc: "Full file lifecycle with unsaved-changes detection on close" },
  { icon: Bold, name: "Bold / Italic / Underline", desc: "Rich text formatting with toolbar buttons and keyboard shortcuts" },
  { icon: AlignLeft, name: "Text Alignment", desc: "Left, center, right, and justify alignment controls" },
  { icon: Type, name: "Font Picker & Size", desc: "QFontComboBox with live preview and SpinBox for font size" },
  { icon: Palette, name: "Font & Background Color", desc: "QColorDialog for text color and text background color" },
  { icon: Undo2, name: "Undo / Redo", desc: "Full undo/redo stack with Ctrl+Z and Ctrl+Y shortcuts" },
  { icon: Printer, name: "Print & Print Preview", desc: "QPrinter integration with high-resolution print dialog and preview" },
  { icon: FileDown, name: "Export to PDF", desc: "One-click PDF export using QPrinter's PDF output format" },
  { icon: Calendar, name: "Insert Date / Time", desc: "Insert current date or time at cursor position" },
  { icon: Save, name: "Save Prompt on Exit", desc: "Smart close event detects unsaved changes and prompts to save" },
] as const

type ChallengeItem = {
  title: string
  description: string
  icon: LucideIcon
}

const learnings: ChallengeItem[] = [
  {
    title: "Object-Oriented Programming",
    description: "Building the NotePad class that inherits from both QMainWindow and the Qt Designer-generated Ui_NotePad taught me how inheritance and composition work in practice — connecting UI elements to methods through signals and slots.",
    icon: Code2,
  },
  {
    title: "Event-Driven Programming",
    description: "Every button click, menu action, and keyboard shortcut is a Qt signal connected to a slot. This was my introduction to the event-driven paradigm that powers all modern GUI applications.",
    icon: Sparkles,
  },
  {
    title: "File I/O & Error Handling",
    description: "Implementing New, Open, Save, Save As, and the close-event save prompt taught me file handling, path management, and wrapping everything in try/except for graceful error recovery.",
    icon: FileText,
  },
  {
    title: "UI/UX Design with Qt Designer",
    description: "Using Qt Designer to visually build the interface, then connecting the generated Python class to my logic code, taught me the separation between UI layout and business logic — a pattern I still use today.",
    icon: Layers,
  },
]

const architectureFiles = [
  { name: "run.py", lines: 9, purpose: "Entry point — creates QApplication, sets Fusion style, launches the NotePad window" },
  { name: "main.py", lines: 277, purpose: "Core logic — NotePad class with all file operations, formatting, printing, and event handlers" },
  { name: "NotePad.py", lines: 385, purpose: "Qt Designer output — auto-generated UI class with menu bar, toolbar, status bar, and all actions" },
  { name: "functions.py", lines: 30, purpose: "Helpers — new file reset, unsaved-changes detection, and About dialog" },
  { name: "res_rc.py", lines: "874K", purpose: "Compiled Qt resources — all toolbar icons embedded as binary data" },
]

export default function NotepadCaseStudy() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Hello World! This is my very first project.\nI built this NotePad with Python and PyQt5.\nThis is where my CS journey began..."

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 45)
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
            <a href="https://github.com/longmanngithub/NotePad" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="text-[14px] sm:text-[16px] mr-1.5 sm:mr-2" />
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
                  <Heart className="text-[12px] mr-1 fill-amber-500" />
                  Where It All Began
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Pinned
                </Badge>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-foreground">
                Note<span className="text-primary">Pad</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                My very first project ever — a fully-featured Windows Notepad replica built with Python and PyQt5 in late 2023, before I even started university. This is where I fell in love with Computer Science.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[16px] text-primary" />
                  <span>Late 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-[16px] text-primary" />
                  <span>Personal Project</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-[16px] text-primary" />
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

            {/* Animated NotePad Mockup */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl sm:rounded-2xl overflow-hidden glow-cyan">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">Untitled - NotePad</span>
                </div>
                
                {/* Menu bar */}
                <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/30 border-b border-border text-[10px] sm:text-xs text-muted-foreground">
                  <span className="hover:text-foreground cursor-default">File</span>
                  <span className="hover:text-foreground cursor-default">Edit</span>
                  <span className="hover:text-foreground cursor-default">Change</span>
                  <span className="hover:text-foreground cursor-default">Insert</span>
                  <span className="hover:text-foreground cursor-default">Help</span>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary/20 border-b border-border flex-wrap">
                  {[FileText, Save, Bold, Italic, Underline, AlignLeft, Undo2, Redo2, Palette, Printer].map((Icon, i) => (
                    <div key={i} className="p-1 sm:p-1.5 rounded hover:bg-primary/10 transition-colors">
                      <Icon className="text-[12px] sm:text-[14px] text-muted-foreground" />
                    </div>
                  ))}
                </div>

                {/* Text area with typing animation */}
                <div className="p-3 sm:p-5 min-h-[200px] sm:min-h-[260px] bg-card font-mono text-xs sm:text-sm text-foreground whitespace-pre-wrap">
                  {typedText}
                  <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
                </div>

                {/* Status bar */}
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/30 border-t border-border">
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground">Ready</span>
                </div>
              </div>
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                Animated recreation of the PyQt5 NotePad interface
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Origin Story */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">The Origin Story</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Before University, Before Everything</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="relative space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base sm:text-lg">
                In late 2023, before I had even started my Computer Science degree at Paragon International University, I decided to teach myself programming. I picked <span className="text-foreground font-medium">Python</span> — and the very first project I set out to build was a replica of <span className="text-foreground font-medium">Windows Notepad</span>.
              </p>
              <p className="text-base sm:text-lg">
                I discovered <span className="text-foreground font-medium">PyQt5</span> and <span className="text-foreground font-medium">Qt Designer</span>, which let me visually design the interface and then wire it up with Python code. I spent hours figuring out how signals and slots work, how to read and write files, and how to make the toolbar buttons actually <em>do</em> something.
              </p>
              <p className="text-base sm:text-lg">
                This project taught me the fundamentals that everything else would build upon: <span className="text-primary font-medium">object-oriented programming</span>, <span className="text-primary font-medium">event-driven architecture</span>, <span className="text-primary font-medium">file I/O</span>, and <span className="text-primary font-medium">GUI design</span>. It was the spark that made me fall in love with Computer Science — and I have never looked back since.
              </p>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* Features */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Features</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Everything a NotePad Needs</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 sm:p-4 bg-card border border-border rounded-2xl glow-cyan-hover transition-all duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[16px] sm:text-[20px] text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{feature.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section></Reveal>

      {/* Architecture */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Architecture</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">How the App Is Structured</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {architectureFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-2xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code2 className="text-[20px] sm:text-[24px] text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground font-mono">{file.name}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                      {typeof file.lines === "number" ? `${file.lines} lines` : file.lines}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate sm:whitespace-normal">{file.purpose}</p>
                </div>
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
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Signal-Slot Pattern in Action</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">main.py — NotePad class</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`class NotePad(QMainWindow, Ui_NotePad):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.show()
        self.showMaximized()
        
        self.filename = None
        self.path = ''
        self.update_title()
        
        # Connect signals to slots
        self.actionNew.triggered.connect(self.new_file)
        self.actionOpen.triggered.connect(self.open_file)
        self.actionSave.triggered.connect(self.save_file)
        self.actionBold.triggered.connect(self.bold)
        self.actionItalic.triggered.connect(self.italic)
        self.actionUnderline.triggered.connect(self.underline)
        self.actionPrint.triggered.connect(self.print_file)
        self.actionExport_to_PDF.triggered.connect(self.export_to_pdf)

    def save_file(self):
        if self.path == '':
            self.save_file_as()
        content = self.textEdit.toPlainText().strip()
        with open(self.path, 'w') as file:
            file.write(content)
            self.statusbar.showMessage(
                f'{self.filename} saved successfully'
            )`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* What I Learned */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">What I Learned</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Lessons From My First Project</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {learnings.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-[20px] sm:text-[24px] text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Keyboard Shortcuts */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="section-label mb-3">Keyboard Shortcuts</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Full Shortcut Support</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {[
              { key: "Ctrl+N", action: "New" },
              { key: "Ctrl+O", action: "Open" },
              { key: "Ctrl+S", action: "Save" },
              { key: "Ctrl+Shift+S", action: "Save As" },
              { key: "Ctrl+P", action: "Print" },
              { key: "Ctrl+Q", action: "Exit" },
              { key: "Ctrl+Z", action: "Undo" },
              { key: "Ctrl+Y", action: "Redo" },
              { key: "Ctrl+B", action: "Bold" },
              { key: "Ctrl+I", action: "Italic" },
              { key: "Ctrl+L", action: "Align Left" },
              { key: "Ctrl+E", action: "Center" },
              { key: "Ctrl+R", action: "Align Right" },
              { key: "Ctrl+J", action: "Justify" },
              { key: "Ctrl+A", action: "Select All" },
              { key: "Ctrl+X/C/V", action: "Cut/Copy/Paste" },
            ].map((shortcut, i) => (
              <div key={i} className="flex items-center gap-2 p-2 sm:p-3 bg-card border border-border rounded-lg">
                <kbd className="text-[10px] sm:text-xs font-mono bg-secondary text-primary px-1.5 py-0.5 rounded border border-border">
                  {shortcut.key}
                </kbd>
                <span className="text-xs sm:text-sm text-muted-foreground">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* CTA Section */}
      <Reveal><section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Heart className="text-[32px] text-amber-500 fill-amber-500" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">This Is Where It Started</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base max-w-xl mx-auto">
            From a simple Python Notepad to building full-stack web applications, IoT systems, and cloud deployments. Every expert was once a beginner — and this was my beginning.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://github.com/longmanngithub/NotePad" target="_blank" rel="noopener noreferrer">
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
