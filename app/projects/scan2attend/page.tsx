"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Calendar, Clock, Users, Fingerprint, Wifi, WifiOff, HardDrive, Server, Monitor, Cpu, CheckCircle2, Radio, Database, Shield } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const techStack = [
  { name: "ESP32", category: "Microcontroller" },
  { name: "C++ / Arduino", category: "Firmware" },
  { name: "Laravel 12", category: "Backend" },
  { name: "Nuxt.js", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "REST API", category: "Communication" },
]

const features = [
  "24/7 continuous fingerprint scanning",
  "Offline SD card queuing with auto-sync",
  "Wi-Fi Manager with captive portal",
  "RTC-based accurate timestamps",
  "LCD display & buzzer feedback",
  "RESTful API for device management",
  "Session-aware attendance check-in",
  "Fingerprint enrollment via web interface",
  "Admin dashboard for attendance records",
]

import { LucideIcon } from "lucide-react"

type Challenge = {
  title: string
  problem: string
  solution: string
  icon: LucideIcon
}

const challenges: Challenge[] = [
  {
    title: "Hardware–Software Integration",
    problem: "Coordinating multiple peripherals (AS608 sensor, DS3231 RTC, LCD, SD card, buzzer) on a single ESP32 without blocking the main scan loop",
    solution: "Used non-blocking timer patterns and modular header files for each peripheral, allowing the main loop to continuously scan while background tasks run on intervals",
    icon: Cpu,
  },
  {
    title: "Offline Resilience",
    problem: "Attendance records would be lost when Wi-Fi or the backend server was unreachable",
    solution: "Implemented JSONL-based queue on the SD card. Records are appended when offline and automatically replayed via /api/attendance/sync when connectivity is restored",
    icon: WifiOff,
  },
  {
    title: "Real-time Backend Sync",
    problem: "Ensuring attendance records arrive in the correct session with accurate timestamps despite network latency",
    solution: "The ESP32 uses a DS3231 RTC for precise local timestamps, and the Laravel backend resolves the active session server-side based on the scanned_at value",
    icon: Server,
  },
]

const howItWorks = [
  { step: "1", title: "Fingerprint Scan", description: "Student places finger on the AS608 sensor; image is captured and matched" },
  { step: "2", title: "ESP32 Processing", description: "Firmware identifies the fingerprint, timestamps with RTC, and builds JSON payload" },
  { step: "3", title: "Backend Sync", description: "Check-in is POSTed to the Laravel API, or queued to SD if offline" },
  { step: "4", title: "Dashboard View", description: "Attendance records are aggregated and displayed on the Nuxt.js frontend" },
]

const hardwareComponents = [
  { name: "ESP32 Dev Module", role: "Main controller", pin: "—" },
  { name: "AS608 Fingerprint", role: "Biometric input", pin: "GPIO 16/17 (UART2)" },
  { name: "DS3231 RTC", role: "Timekeeping", pin: "GPIO 21/22 (I2C)" },
  { name: "LCD 16×2 I2C", role: "User display", pin: "GPIO 21/22 (I2C)" },
  { name: "MicroSD Module", role: "Offline storage", pin: "GPIO 5/23/19/18 (SPI)" },
  { name: "Passive Buzzer", role: "Audio feedback", pin: "GPIO 25" },
]

export default function Scan2AttendCaseStudy() {
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
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/longmanngithub/Scan2Attend-esp" target="_blank" rel="noopener noreferrer">
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
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Scan2<span className="text-primary text-glow">Attend</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                An IoT-powered classroom attendance system that records student check-ins via fingerprint scanning on an ESP32 device, synced to a Laravel backend with offline SD card queuing.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2025 – 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>CS 397: Internet of Everything</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    With{" "}
                    <a href="https://github.com/vistis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Visoth Kim
                    </a>
                  </span>
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

            {/* Animated System Architecture Diagram */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden glow-cyan">
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground truncate">system_architecture.svg — Live</span>
                </div>
                
                {/* Architecture Diagram */}
                <div className="p-4 sm:p-8 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Node Row 1: ESP32 Device */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 0 
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' 
                          : 'border-border bg-card/50'
                      }`}>
                        <Cpu className={`h-6 w-6 sm:h-8 sm:w-8 mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">ESP32 Device</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Fingerprint + RTC + LCD</span>
                      </div>
                    </div>

                    {/* Connection Line 1 */}
                    <div className="flex justify-center mb-6 sm:mb-8 relative">
                      <div className="w-px h-8 sm:h-10 bg-border relative">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                          dataPacket === 1 ? 'bg-primary shadow-lg shadow-primary/50 top-0' : 'bg-muted top-1/2'
                        }`} />
                      </div>
                      <div className="absolute right-[15%] sm:right-[18%] top-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] transition-all duration-500 ${
                          dataPacket === 1 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <Radio className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                          <span>Wi-Fi / REST</span>
                        </div>
                      </div>
                    </div>

                    {/* Node Row 2: Backend */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 1 || activeNode === 2
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' 
                          : 'border-border bg-card/50'
                      }`}>
                        <Server className={`h-6 w-6 sm:h-8 sm:w-8 mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 1 || activeNode === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">Laravel Backend</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">API + PostgreSQL</span>
                      </div>
                    </div>

                    {/* Connection Line 2 */}
                    <div className="flex justify-center mb-6 sm:mb-8 relative">
                      <div className="w-px h-8 sm:h-10 bg-border relative">
                        <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                          dataPacket === 3 ? 'bg-primary shadow-lg shadow-primary/50 top-0' : 'bg-muted top-1/2'
                        }`} />
                      </div>
                      <div className="absolute left-[12%] sm:left-[18%] top-1/2 -translate-y-1/2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] transition-all duration-500 ${
                          dataPacket === 3 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                        }`}>
                          <Database className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                          <span>JSON / SSR</span>
                        </div>
                      </div>
                    </div>

                    {/* Node Row 3: Frontend */}
                    <div className="flex justify-center">
                      <div className={`flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-500 w-36 sm:w-44 ${
                        activeNode === 3 
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' 
                          : 'border-border bg-card/50'
                      }`}>
                        <Monitor className={`h-6 w-6 sm:h-8 sm:w-8 mb-1.5 sm:mb-2 transition-colors duration-500 ${activeNode === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">Nuxt.js Frontend</span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Admin Dashboard</span>
                      </div>
                    </div>

                    {/* Offline Fallback Node (side) */}
                    <div className="absolute top-[38%] left-2 sm:left-4">
                      <div className={`flex flex-col items-center p-2 sm:p-3 rounded-lg border transition-all duration-500 ${
                        activeNode === 0 
                          ? 'border-amber-500/50 bg-amber-500/5' 
                          : 'border-border/50 bg-card/30'
                      }`}>
                        <HardDrive className={`h-4 w-4 sm:h-5 sm:w-5 mb-1 transition-colors duration-500 ${activeNode === 0 ? 'text-amber-500' : 'text-muted-foreground/50'}`} />
                        <span className="text-[8px] sm:text-[9px] text-muted-foreground">SD Card</span>
                        <span className="text-[7px] sm:text-[8px] text-muted-foreground/70">Offline Queue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Demo note */}
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                ↑ Animated system architecture — ESP32 → Backend → Frontend data flow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// How It Works"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Attendance Pipeline</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}
                <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center glow-cyan-hover transition-all duration-300 h-full">
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
      </section>

      {/* Hardware Components */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Hardware"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Component Wiring</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {hardwareComponents.map((component, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-foreground truncate">{component.name}</p>
                  <p className="text-xs text-muted-foreground">{component.role}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground/70 font-mono truncate">{component.pin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Capabilities"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Features</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Fingerprint Scan Loop</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">ESP32_Fingerprint_Attendance.ino</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
                <code className="text-foreground">{`// 24/7 Continuous Fingerprint Scanning
if (sensorConnected && !enrollRequested) {
  uint8_t p = finger.getImage();

  if (p == FINGERPRINT_OK) {
    p = finger.image2Tz();
    p = finger.fingerSearch();

    if (p == FINGERPRINT_OK) {
      int fpId = finger.fingerID;

      // Check cooldown (prevent duplicate scans)
      if (fpId == lastScannedID &&
          millis() - lastScanTime < SCAN_COOLDOWN) {
        return;  // Same finger, too fast
      }

      String scannedAt = getRTCDateTime();

      // Build JSON payload
      JsonDocument doc;
      doc["fingerprint_id"] = fpId;
      doc["scanned_at"] = scannedAt;

      // POST to Laravel backend
      if (backendConnected) {
        String response = httpPostJson(checkInURL, payload);
        showStudent(displayName, timeStr);
        buzzerSuccess();
      } else {
        // Offline: queue to SD card
        queueAttendance(fpId, scannedAt);
        showOfflineSaved(displayName);
        buzzerOfflineSave();
      }
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
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
                className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-400">Problem</p>
                        <p className="text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-400">Solution</p>
                        <p className="text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture Detail */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Architecture"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">System Overview</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">ESP32 Firmware</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Runs a 24/7 scan loop with non-blocking timers. Manages AS608 sensor, DS3231 RTC, LCD display, SD card queue, and buzzer — all through modular header files.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Laravel Backend</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                RESTful API handles check-ins, session resolution, enrollment, and attendance sync. Models the university structure with courses, sections, and sessions.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Nuxt.js Dashboard</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Admin-facing frontend for viewing attendance records, managing students, enrolling fingerprints, and monitoring device health in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Explore the Source Code</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            The project is split across two repositories — ESP32 firmware and the web platform.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://github.com/longmanngithub/Scan2Attend-esp" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                <Github className="h-4 w-4 mr-2" />
                ESP32 Firmware
              </Button>
            </a>
            <a href="https://github.com/vistis/ScanToAttend-web" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-border bg-transparent">
                <Github className="h-4 w-4 mr-2" />
                Web Platform
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Get In Touch
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
