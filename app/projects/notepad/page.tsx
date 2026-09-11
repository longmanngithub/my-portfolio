"use client"

import { useState, useEffect } from "react"
import {
  FloatingNav,
  ProjectHero,
  BentoVitals,
  FeatureGrid,
  ChallengesGrid,
  AppleCodeViewer,
  ProjectCTA,
} from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import CodeIcon from "@mui/icons-material/Code"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DescriptionIcon from "@mui/icons-material/Description"
import LayersIcon from "@mui/icons-material/Layers"
import KeyboardIcon from "@mui/icons-material/Keyboard"
import SaveIcon from "@mui/icons-material/Save"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import PaletteIcon from "@mui/icons-material/Palette"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import PrintIcon from "@mui/icons-material/Print"
import { cn } from "@/lib/utils"

const shortcuts = [
  { key: "Ctrl+N", action: "New File" },
  { key: "Ctrl+O", action: "Open File" },
  { key: "Ctrl+S", action: "Save Document" },
  { key: "Ctrl+Shift+S", action: "Save As..." },
  { key: "Ctrl+P", action: "Print & Preview" },
  { key: "Ctrl+Q", action: "Exit Application" },
  { key: "Ctrl+Z", action: "Undo Last Action" },
  { key: "Ctrl+Y", action: "Redo Last Action" },
  { key: "Ctrl+B", action: "Toggle Bold" },
  { key: "Ctrl+I", action: "Toggle Italic" },
  { key: "Ctrl+U", action: "Toggle Underline" },
  { key: "Ctrl+L", action: "Align Left" },
  { key: "Ctrl+E", action: "Center Align" },
  { key: "Ctrl+R", action: "Align Right" },
  { key: "Ctrl+J", action: "Justify Text" },
  { key: "Ctrl+A", action: "Select All" },
]

const pythonSignalSlotCode = `class NotePad(QMainWindow, Ui_NotePad):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.show()
        self.showMaximized()
        
        self.filename = None
        self.path = ''
        self.update_title()
        
        # Connect UI action signals to Python logic slots
        self.actionNew.triggered.connect(self.new_file)
        self.actionOpen.triggered.connect(self.open_file)
        self.actionSave.triggered.connect(self.save_file)
        self.actionSave_As.triggered.connect(self.save_file_as)
        self.actionBold.triggered.connect(self.bold)
        self.actionItalic.triggered.connect(self.italic)
        self.actionUnderline.triggered.connect(self.underline)
        self.actionPrint.triggered.connect(self.print_file)
        self.actionExport_to_PDF.triggered.connect(self.export_to_pdf)

    def save_file(self):
        if self.path == '':
            self.save_file_as()
            return
        content = self.textEdit.toPlainText().strip()
        with open(self.path, 'w', encoding='utf-8') as file:
            file.write(content)
            self.statusbar.showMessage(
                f'{self.filename} saved successfully', 3000
            )`

const techStack = [
  { name: "Python", category: "Language" },
  { name: "PyQt5", category: "GUI Framework" },
  { name: "Qt Designer", category: "UI Builder" },
  { name: "Fusion Style", category: "Theme" },
]

const features = [
  "New, Open, Save & Save-As File Lifecycle",
  "Rich Text Formatting (Bold, Italic, Underline)",
  "Text Alignment (Left, Center, Right, Justify)",
  "Live Font Family Picker & Dynamic Sizing",
  "Color Picker for Text & Background Highlighting",
  "Full Undo / Redo Command History Stack",
  "High-Resolution Print & Print Preview Dialogs",
  "One-Click Direct PDF Document Export",
]

const architectureFiles = [
  { name: "run.py", lines: "9 lines", role: "Application entry point setting Fusion theme and event loop." },
  { name: "main.py", lines: "277 lines", role: "NotePad class connecting UI signals to formatting and file slots." },
  { name: "NotePad.py", lines: "385 lines", role: "Qt Designer compiler output holding menu, toolbar, and layout classes." },
  { name: "functions.py", lines: "30 lines", role: "Helper routines for unsaved-change dialogs and document resets." },
]

const learnings = [
  {
    title: "Object-Oriented Programming",
    description: "Building the NotePad class inheriting from QMainWindow and Qt Designer's generated class taught me how inheritance and composition work in real production code.",
    icon: CodeIcon,
  },
  {
    title: "Event-Driven Paradigm",
    description: "Connecting UI signals to slots for clicks, menu triggers, and shortcuts gave me my foundational understanding of asynchronous event loops.",
    icon: AutoAwesomeIcon,
  },
  {
    title: "File I/O & Graceful Recovery",
    description: "Implementing buffer encoding, path management, and close-event confirmation prompts taught me defensive exception handling.",
    icon: DescriptionIcon,
  },
  {
    title: "Separation of Concerns",
    description: "Visually laying out UI in Qt Designer while keeping business logic strictly inside main.py established the clean separation of concerns I still practice today.",
    icon: LayersIcon,
  },
]

function NotePadSimulator() {
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
  }, [fullText])

  return (
    <div className="relative w-full bg-card/90 flex flex-col font-mono text-left">
      {/* NotePad Menu Bar */}
      <div className="flex items-center gap-3 sm:gap-4 px-4 py-1.5 bg-secondary/30 border-b border-black/[0.04] dark:border-white/[0.06] text-[11px] text-muted-foreground select-none">
        <span className="hover:text-foreground cursor-default">File</span>
        <span className="hover:text-foreground cursor-default">Edit</span>
        <span className="hover:text-foreground cursor-default">Format</span>
        <span className="hover:text-foreground cursor-default">View</span>
        <span className="hover:text-foreground cursor-default">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-secondary/15 border-b border-black/[0.04] dark:border-white/[0.06] flex-wrap">
        {[DescriptionIcon, SaveIcon, FormatBoldIcon, FormatItalicIcon, FormatUnderlinedIcon, FormatAlignLeftIcon, UndoIcon, RedoIcon, PaletteIcon, PrintIcon].map((Icon, i) => (
          <div key={i} className="p-1 rounded hover:bg-primary/10 transition-colors cursor-default">
            <Icon style={{ fontSize: 14 }} className="text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Text Canvas with typing animation */}
      <div className="p-4 sm:p-6 min-h-[220px] sm:min-h-[280px] bg-card/60 text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
        {typedText}
        <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-secondary/20 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px] text-muted-foreground select-none">
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}

export default function NotepadCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <FloatingNav
        title="NotePad (2023)"
        year="2023"
        github="https://github.com/longmanngithub/NotePad"
      />

      <ProjectHero
        category="The Origin"
        year="2023"
        title="Note"
        titleAccent="Pad"
        description="My very first project ever — a Windows Notepad replica built with Python and PyQt5 in late 2023, before university. The spark that ignited my computer science journey."
        glowColor="rgba(100, 116, 139, 0.22)"
        urlLabel="notepad.py"
      >
        <NotePadSimulator />
      </ProjectHero>

      <Reveal>
        <BentoVitals
          role="Self-Taught Creator"
          roleDetail="First programming project before university"
          timeline="Late 2023"
          methodology="Self-Directed Exploration & Qt GUI Design"
          architecture="Event-Driven Signal & Slot"
          architectureDetail="PyQt5, QMainWindow, QPrinter & File Streams"
          techStack={techStack}
        />
      </Reveal>

      {/* The Origin Story Narrative */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6 sm:mb-8 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              The Spark
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Before University, Before Everything
            </h2>
          </div>

          <div className="relative rounded-3xl p-6 sm:p-8 bg-card/75 dark:bg-card/50 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              In late 2023, before I had started my Computer Science degree at Paragon International University, I decided to teach myself programming. I picked <span className="text-foreground font-medium">Python</span> — and the very first real project I set out to build was a replica of Windows Notepad.
            </p>
            <p>
              I discovered <span className="text-foreground font-medium">PyQt5</span> and <span className="text-foreground font-medium">Qt Designer</span>, visually sculpting the menus, toolbars, and dialogs before wiring each signal into Python methods. I spent days deciphering how file buffers, font metrics, and print preview pipelines fit together.
            </p>
            <p>
              This project taught me the mental models that everything else would build upon: object-oriented hierarchies, event-driven signal routing, defensive file I/O, and UI/UX ergonomics.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Code Architecture Files */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Architecture
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              File Structure & Separation of Concerns
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              How visual UI layout and Python business logic were decoupled.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {architectureFiles.map((file) => (
              <div
                key={file.name}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl p-4 sm:p-5",
                  "bg-card/75 dark:bg-card/50 backdrop-blur-xl",
                  "border border-black/[0.06] dark:border-white/[0.08]",
                  "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]",
                  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/15 before:to-transparent"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {file.name}
                  </span>
                  <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {file.lines}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {file.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <AppleCodeViewer
          sectionLabel="Signal-Slot Pattern"
          title="Action Binding Implementation"
          description="Connecting Qt Designer action triggers to Python file handlers and format routines."
          fileName="main.py"
          language="python"
          code={pythonSignalSlotCode}
        />
      </Reveal>

      {/* Keyboard Shortcuts */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Keyboard Shortcuts
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Full Shortcut Support
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Mapped through PyQt5 QKeySequence bindings for rapid, mouse-free rich document manipulation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {shortcuts.map((shortcut, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between p-3 sm:p-3.5 rounded-2xl",
                  "bg-card/75 dark:bg-card/50 backdrop-blur-xl",
                  "border border-black/[0.06] dark:border-white/[0.08]",
                  "shadow-[0_2px_12px_-3px_rgba(0,0,0,0.03)]",
                  "hover:border-primary/40 transition-colors group"
                )}
              >
                <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {shortcut.action}
                </span>
                <kbd className="text-[10px] sm:text-xs font-mono font-semibold bg-secondary/80 dark:bg-secondary/60 text-primary px-2 py-0.5 rounded-lg border border-black/[0.06] dark:border-white/[0.08] shadow-2xs">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Capabilities"
          title="Features Built from Scratch"
          description="Rich-text editing, dialog hooks, and document export mechanisms."
          features={features}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <ChallengesGrid
          sectionLabel="Foundational Lessons"
          title="Core Engineering Lessons Learned"
          description="Concepts first explored on this project that shaped my architectural thinking."
          challenges={learnings}
        />
      </Reveal>

      <Reveal>
        <ProjectCTA />
      </Reveal>
    </main>
  )
}
