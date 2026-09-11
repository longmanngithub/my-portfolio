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
import CpuIcon from "@mui/icons-material/Memory"
import RadioIcon from "@mui/icons-material/SettingsInputAntenna"
import ServerIcon from "@mui/icons-material/Dns"
import DatabaseIcon from "@mui/icons-material/Storage"
import MonitorIcon from "@mui/icons-material/DesktopWindows"
import HardDriveIcon from "@mui/icons-material/SdStorage"
import WifiIcon from "@mui/icons-material/Wifi"
import ShieldIcon from "@mui/icons-material/Shield"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const techStack = [
  { name: "ESP32", category: "Microcontroller" },
  { name: "C++ / Arduino", category: "Firmware" },
  { name: "Laravel 12", category: "Backend" },
  { name: "Nuxt.js", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "REST API", category: "Protocol" },
]

const features = [
  "24/7 continuous biometric fingerprint scanning",
  "Offline SD card queuing with automatic sync",
  "Wi-Fi Manager with local captive portal",
  "DS3231 RTC hardware-backed millisecond timestamps",
  "LCD status display & acoustic buzzer feedback",
  "RESTful device management and health heartbeats",
  "Session-aware course & student check-in gating",
  "Fingerprint enrollment directly via web dashboard",
]

const pipelineSteps = [
  { step: "1", title: "Fingerprint Scanned", description: "Student places finger on AS608 optical sensor; template matched locally in under 400ms." },
  { step: "2", title: "RTC Timestamped", description: "DS3231 real-time clock records exact verified timestamp independent of internet connection." },
  { step: "3", title: "Connectivity Gate", description: "If Wi-Fi is active, POSTs JSON payload to Laravel; if offline, appends to SD card FIFO queue." },
  { step: "4", title: "Dashboard Aggregation", description: "Records sync to PostgreSQL and display immediately on lecturer Nuxt.js attendance tables." },
]

const hardwareComponents = [
  { name: "ESP32 Dev Module", role: "Dual-core 240MHz controller running FreeRTOS", pin: "Main Board" },
  { name: "AS608 Optical Sensor", role: "Biometric enrollment & 1:N fingerprint search", pin: "UART2 (GPIO 16/17)" },
  { name: "DS3231 RTC Module", role: "Battery-backed I2C real-time hardware clock", pin: "I2C (GPIO 21/22)" },
  { name: "LCD 16×2 Display", role: "Real-time student greeting and status display", pin: "I2C (GPIO 21/22)" },
  { name: "MicroSD Module", role: "Offline FIFO queue storage for power outages", pin: "SPI (GPIO 5/18/19/23)" },
  { name: "Passive Buzzer", role: "Distinct acoustic success, error & queue tones", pin: "PWM (GPIO 25)" },
]

const challenges = [
  {
    title: "Hardware–Software Integration",
    problem: "Coordinating 5 peripherals (AS608 sensor, DS3231 RTC, LCD, SD card, buzzer) on an ESP32 without blocking the optical scan loop.",
    solution: "Implemented non-blocking timer loops and modular drivers, keeping the main loop continuously polling biometric input.",
    icon: CpuIcon,
  },
  {
    title: "Offline Sync Reliability",
    problem: "Campus Wi-Fi drops must not lose student attendance check-ins or corrupt records during sudden power cuts.",
    solution: "Designed a FIFO text queue on the SD card with transactional cursor pointers, flushing buffered records sequentially upon Wi-Fi reconnect.",
    icon: HardDriveIcon,
  },
  {
    title: "Zero-Code Wi-Fi Provisioning",
    problem: "Hardcoding campus Wi-Fi credentials into C++ firmware prevents device relocation across different lecture halls.",
    solution: "Implemented an on-demand captive portal (AP mode) allowing lecturers to configure SSID and password from their phone.",
    icon: WifiIcon,
  },
]

const firmwareCode = `// 24/7 Continuous Fingerprint Scanning & Dual-Mode Dispatch
if (sensorConnected && !enrollRequested) {
  uint8_t p = finger.getImage();

  if (p == FINGERPRINT_OK) {
    p = finger.image2Tz();
    p = finger.fingerSearch();

    if (p == FINGERPRINT_OK) {
      int fpId = finger.fingerID;

      // Check cooldown (prevent duplicate accidental scans)
      if (fpId == lastScannedID && millis() - lastScanTime < SCAN_COOLDOWN) {
        return;
      }

      String scannedAt = getRTCDateTime();

      // Dispatch: Online REST Post or Offline SD Card FIFO
      if (backendConnected) {
        String response = httpPostJson(checkInURL, fpId, scannedAt);
        showStudent(displayName, timeStr);
        buzzerSuccess();
      } else {
        queueAttendance(fpId, scannedAt);
        showOfflineSaved(displayName);
        buzzerOfflineSave();
      }
    }
  }
}`

function IoTSchematic() {
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
    <div className="relative p-6 sm:p-10 min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
      <div className="w-full max-w-lg relative">
        {/* Hardware Layer: SD Card + ESP32 side-by-side */}
        <div className="relative mb-6 sm:mb-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto relative">
            {/* Node 0A: MicroSD Card Module (Offline Fallback Queue) */}
            <div
              className={cn(
                "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500",
                "border bg-card/85 backdrop-blur-md",
                activeNode === 0
                  ? "border-amber-500/70 text-amber-500 shadow-[0_0_20px_-2px_rgba(245,158,11,0.25)] bg-amber-500/[0.05]"
                  : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-1 mb-1">
                <HardDriveIcon style={{ fontSize: 20 }} className={activeNode === 0 ? "text-amber-500" : "text-muted-foreground"} />
                <span className="text-[9px] font-mono font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded">
                  SPI
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground">SD Card Module</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 text-center">
                Offline FIFO Queue
              </span>
            </div>

            {/* Node 0B: ESP32 Device */}
            <div
              className={cn(
                "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500",
                "border bg-card/85 backdrop-blur-md",
                activeNode === 0
                  ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(20,184,166,0.3)] scale-102"
                  : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
              )}
            >
              <CpuIcon style={{ fontSize: 22 }} className="mb-1" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">ESP32 Device</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 text-center">
                AS608 + RTC + LCD
              </span>
            </div>
          </div>

          {/* Bi-directional SPI Bus Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-card/95 border border-black/[0.08] dark:border-white/[0.1] text-[8px] font-mono text-muted-foreground shadow-sm">
              <span className={cn("w-1.5 h-1.5 rounded-full", activeNode === 0 ? "bg-amber-500 animate-pulse" : "bg-muted-foreground/40")} />
              <span>SPI Bus</span>
            </div>
          </div>
        </div>

        {/* Line 1: Wi-Fi / REST Link to Backend */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
          <div className="w-px h-8 sm:h-10 bg-black/[0.08] dark:bg-white/[0.1] relative">
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500",
                dataPacket === 1 ? "bg-primary shadow-[0_0_10px_rgba(20,184,166,0.8)] top-0" : "bg-muted-foreground/30 top-1/2"
              )}
            />
          </div>
          <div className="absolute right-[10%] sm:right-[18%] top-1/2 -translate-y-1/2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono transition-all duration-500",
                dataPacket === 1 ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground"
              )}
            >
              <RadioIcon style={{ fontSize: 10 }} />
              <span>Wi-Fi / REST POST</span>
            </div>
          </div>
        </div>

        {/* Node 2: Laravel Backend */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-48",
              "border bg-card/85 backdrop-blur-md",
              activeNode === 1 || activeNode === 2
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(20,184,166,0.3)] scale-102"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <ServerIcon style={{ fontSize: 22 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">Laravel Backend</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">REST API & Auth Validation</span>
          </div>
        </div>

        {/* Line 2: PostgreSQL / WebSocket Sync */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
          <div className="w-px h-8 sm:h-10 bg-black/[0.08] dark:bg-white/[0.1] relative">
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500",
                dataPacket === 3 ? "bg-primary shadow-[0_0_10px_rgba(20,184,166,0.8)] top-0" : "bg-muted-foreground/30 top-1/2"
              )}
            />
          </div>
          <div className="absolute left-[10%] sm:left-[18%] top-1/2 -translate-y-1/2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono transition-all duration-500",
                dataPacket === 3 ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground"
              )}
            >
              <DatabaseIcon style={{ fontSize: 10 }} />
              <span>PostgreSQL Sync</span>
            </div>
          </div>
        </div>

        {/* Node 3: Nuxt.js Frontend */}
        <div className="flex justify-center">
          <div
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-500 w-36 sm:w-48",
              "border bg-card/85 backdrop-blur-md",
              activeNode === 3
                ? "border-primary text-primary shadow-[0_0_24px_-4px_rgba(20,184,166,0.3)] scale-102"
                : "border-black/[0.08] dark:border-white/[0.1] text-muted-foreground"
            )}
          >
            <MonitorIcon style={{ fontSize: 22 }} className="mb-1" />
            <span className="text-xs sm:text-sm font-semibold text-foreground">Nuxt.js Dashboard</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Real-Time Attendance UI</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Scan2AttendCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <FloatingNav
        title="Scan2Attend"
        year="2025"
        github="https://github.com/longmanngithub/Scan2Attend-esp"
      />

      <ProjectHero
        category="Case Study"
        year="2025"
        title="Scan2"
        titleAccent="Attend"
        description="An IoT-powered classroom attendance system that records student check-ins via fingerprint scanning on an ESP32 device, synced to a Laravel backend with offline SD card queuing."
        glowColor="rgba(20, 184, 166, 0.22)"
        urlLabel="scan2attend.internal"
      >
        <IoTSchematic />
      </ProjectHero>

      <Reveal>
        <BentoVitals
          role="Firmware & IoT Engineer"
          roleDetail="With Visoth Kim · CS 397: Internet of Everything"
          timeline="2025 – 2026"
          methodology="Hardware Prototyping & Modular C++"
          architecture="Hybrid Online / Offline Queue"
          architectureDetail="ESP32, AS608, DS3231 RTC, SD & Laravel API"
          techStack={techStack}
        />
      </Reveal>

      <Reveal>
        <InteractivePipeline
          sectionLabel="How It Works"
          title="Attendance Pipeline"
          description="From optical biometric scanning to real-time sync and fault-tolerant local SD queuing."
          steps={pipelineSteps}
        />
      </Reveal>

      {/* Hardware Wiring Specs */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
              Hardware Engineering
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Component Wiring & Architecture
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Peripherals mapped across hardware UART, I2C, SPI, and PWM bus interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {hardwareComponents.map((comp) => (
              <div
                key={comp.name}
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
                      <CpuIcon style={{ fontSize: 16 }} />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-black/[0.03] dark:border-white/[0.05]">
                      {comp.pin}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {comp.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {comp.role}
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
          title="System Capabilities"
          description="Built for uninterrupted campus classroom operations regardless of network outages."
          features={features}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <AppleCodeViewer
          sectionLabel="Firmware Implementation"
          title="Scan & Offline Dispatch Loop"
          description="Non-blocking scan loop polling AS608 image buffers and routing between online REST and offline SD storage."
          fileName="ESP32_Fingerprint_Attendance.ino"
          language="cpp"
          code={firmwareCode}
        />
      </Reveal>

      <Reveal>
        <ChallengesGrid
          sectionLabel="Engineering Deep Dive"
          title="Challenges & Architectural Solutions"
          description="Resolving bus concurrency, SD queue data integrity, and dynamic captive portal provisioning."
          challenges={challenges}
        />
      </Reveal>

      <Reveal>
        <ProjectCTA />
      </Reveal>
    </main>
  )
}
