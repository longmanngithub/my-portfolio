import { Navigation } from "@/components/navigation"
import { ProfileCard } from "@/components/profile-card"
import { HeroSection } from "@/components/hero-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { ServicesSection } from "@/components/services-section"
import { GitHubStatsSection } from "@/components/github-stats-section"
import { ContactSection } from "@/components/contact-section"
import { Reveal } from "@/components/reveal"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 lg:px-8 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-14">
          {/* Sticky profile card */}
          <aside
            className="animate-fade-in-up opacity-0 lg:sticky lg:top-28 lg:self-start"
            style={{ animationDelay: "80ms" }}
          >
            <ProfileCard />
          </aside>

          {/* Scrolling content */}
          <div className="min-w-0 space-y-24">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "180ms" }}>
              <HeroSection />
            </div>
            <Reveal>
              <TechStackSection />
            </Reveal>
            <Reveal>
              <ProjectsSection />
            </Reveal>
            <Reveal>
              <ExperienceSection />
            </Reveal>
            <Reveal>
              <ServicesSection />
            </Reveal>
            <Reveal>
              <GitHubStatsSection />
            </Reveal>
            <Reveal>
              <ContactSection />
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  )
}
