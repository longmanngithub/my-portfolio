"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "kh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "AbouT",
    "nav.tech": "TecH",
    "nav.projects": "ProjecTs",
    "nav.contact": "ContacT",
    "nav.getInTouch": "Get in ToucH",
    "nav.searchPlaceholder": "Search sections...",
    "nav.noResults": "No results found",
    "nav.pressEnter": "Press Enter to navigate",

    // Hero Section
    "hero.welcome": "// Welcome to my portfolio",
    "hero.greeting": "Hi, I'm",
    "hero.name": "Henglong Loeung",
    "hero.subtitle": "Year 3 Computer Science Student · Web & Mobile Developer",
    "hero.viewProjects": "View Projects →",
    "hero.downloadResume": "Download Resume",

    // About Section
    "about.label": "// About Me",
    "about.title": "Who I Am",
    "about.description1": "Passionate about building real-world, user-focused applications. I have experience across full-stack web, mobile apps, and a little bit of IoT development.",
    "about.description2": "My focus is on clean UI, solid backend architecture, and maintainability. I believe in writing code that not only works but is elegant and scalable.",
    "about.careerGoal": "Career Goal",
    "about.careerGoalText1": "Software Engineer ~ Hopefully",
    "about.careerGoalText2": "Artificial Intelligence Engineer",
    "about.interests": "Interests",
    "about.interest1": "Basketball, Music, F1 & Art",
    "about.interest2": "Web & Mobile Development",
    "about.interest3": "Open Source Contribution",
    "about.interest4": "Cloud Computing & DevOps",
    "about.interest5": "AI & Machine Learning",
    "about.interest6": "System Design",

    // Tech Stack Section
    "tech.label": "// Tech Stack",
    "tech.title": "Technologies I Work With",
    "tech.languages": "Languages",
    "tech.frameworks": "Frameworks & Tools",
    "tech.other": "Other",

    // Tools Section
    "tool.label": "// Tools & Software",
    "tool.title": "Tools I'm Proficient With",
    "tool.adobe": "Adobe Creative Suite",

    // Projects Section
    "projects.label": "// Featured Projects",
    "projects.title": "What I've Built",
    "projects.code": "Code",
    "projects.demo": "Demo",
    "projects.caseStudy": "Case Study →",
    "projects.pinned": "● pinned",
    "projects.ecoInventoryTitle": "EcoInventory",
    "projects.ecoInventoryDesc": "E-Commerce inventory management system built using Laravel technology for both frontend and backend using API as a central system.",

    "projects.scan2AttendTitle": "Scan2Attend",
    "projects.scan2AttendDesc": "An IoT-powered classroom attendance system using ESP32 and fingerprint scanning, synced to a Laravel backend with offline SD card queuing.",

    "projects.localEventsTitle": "Local Event Discovery Platform",
    "projects.localEventsDesc": "Inherited a multi-app Laravel event platform from another team, fixed 8+ critical bugs, redesigned the entire UI, and deployed it to DigitalOcean with Cloudflare R2 storage.",

    "projects.aiHandTitle": "AI Hand Interaction System",
    "projects.aiHandDesc": "A real-time 3D particle simulation controlled by hand gestures via webcam. Built with Three.js and Google MediaPipe, featuring 5 mathematical shapes and neon post-processing VFX.",

    "projects.notepadTitle": "NotePad",
    "projects.notepadDesc": "My very first project — a Windows Notepad replica built with Python and PyQt5 in late 2023, before I started university. Where my Computer Science journey began.",

    // Mindset Section
    "mindset.label": "// Engineering Mindset",
    "mindset.title": "How I Will Approach Software Engineering as a CS Student",
    "mindset.p1": "Learning to design maintainable and scalable systems",
    "mindset.p2": "Prioritizing code quality and best practices",
    "mindset.p3": "Prioritizing user experience and accessibility",
    "mindset.p4": "Embracing collaboration and open source",
    "mindset.p5": "Continuous learning and adapting to new technologies",
    "mindset.p6": "Balancing performance with resource efficiency",
    "mindset.p7": "Balance between UI, backend, and system design",
    "mindset.p8": "Thinking about long-term impact and sustainability",

    // Achievements Section
    "achievements.label": "// GitHub Achievements",
    "achievements.title": "Recognition & Impact",
    "achievements.pullShark": "Pull Shark",
    "achievements.pullSharkDesc": "Active contributor with multiple merged PRs",
    "achievements.yolo": "YOLO",
    "achievements.yoloDesc": "Merged PRs without review (with confidence!)",

    // Resume Section
    "resume.label": "// Resume",
    "resume.title": "Download My CV",

    // Contact Section
    "contact.label": "// Get In Touch",
    "contact.title": "Let's Connect",
    "contact.portfolio": "Portfolio",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.location": "Location",
    "contact.locationValue": "Phnom Penh, Cambodia",
    "contact.quote": '"Always open to internships, collaboration, and building meaningful products."',
    "contact.buyMeCoffee": "Support My Work",
    "contact.buyMeCoffeeDesc": "If you enjoy my work or find it helpful, consider buying me a coffee! Your support helps me continue learning and creating.",
    "contact.buyMeCoffeeButton": "Buy Me a Coffee",
    "contact.copyright": "© 2026 Henglong Loeung.",
  },
  kh: {
    // Navigation
    "nav.about": "អំពីខ្ញុំ",
    "nav.tech": "បច្ចេកវិទ្យា",
    "nav.projects": "គម្រោង",
    "nav.contact": "ទំនាក់ទំនង",
    "nav.getInTouch": "ទាក់ទងមក",
    "nav.searchPlaceholder": "ស្វែងរកផ្នែក...",
    "nav.noResults": "រកមិនឃើញ",
    "nav.pressEnter": "ចុច Enter ដើម្បីរុករក",

    // Hero Section
    "hero.welcome": "// សូមស្វាគមន៍មកកាន់ Portfolio របស់ខ្ញុំ",
    "hero.greeting": "សួស្ដី ខ្ញុំឈ្មោះ",
    "hero.name": "លឿង ហេងឡុង",
    "hero.subtitle": "ជានិស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រឆ្នាំទី៣ · អ្នកអភិវឌ្ឍន៍ Web & Mobile",
    "hero.viewProjects": "មើលគម្រោង →",
    "hero.downloadResume": "ទាញយក Resume",

    // About Section
    "about.label": "// អំពីខ្ញុំ",
    "about.title": "ខ្ញុំជានរណា",
    "about.description1": "ខ្ញុំមានចំណាប់អារម្មណ៍ក្នុងការបង្កើត Application ដែលផ្តោតលើអ្នកប្រើប្រាស់។ ខ្ញុំមានបទពិសោធន៍លើ Full-stack web, Mobile apps និង IoT Development។",
    "about.description2": "ខ្ញុំផ្តោតលើ UI, Backend Architecture រឹងមាំ និងការថែរក្សាបាន។ ខ្ញុំជឿថា Code មិនត្រឹមតែត្រូវដំណើរការប៉ុណ្ណោះទេ ប៉ុន្តែត្រូវតែមានសោភ័ណ និង Scalable។",
    "about.careerGoal": "គោលដៅអាជីព",
    "about.careerGoalText1": "Software Engineer",
    "about.careerGoalText2": "Artificial Intelligence Engineer",
    "about.interests": "ចំណាប់អារម្មណ៍",
    "about.interest1": "បាល់បោះ តន្ត្រី F1 និងសិល្បៈ",
    "about.interest2": "Web & Mobile Development",
    "about.interest3": "Open Source Contribution",
    "about.interest4": "Cloud Computing & DevOps",
    "about.interest5": "AI & Machine Learning",
    "about.interest6": "System Design",

    // Tech Stack Section
    "tech.label": "// បច្ចេកវិទ្យា",
    "tech.title": "បច្ចេកវិទ្យាដែលខ្ញុំប្រើ",
    "tech.languages": "ភាសា",
    "tech.frameworks": "Frameworks & Tools",
    "tech.other": "ផ្សេងទៀត",

    // Tools Section
    "tool.label": "// ឧបករណ៍ និង Software",
    "tool.title": "ឧបករណ៍ដែលខ្ញុំមានជំនាញសម្រាប់ការប្រើប្រាស់",
    "tool.adobe": "Adobe Creative Suite",
    "tool.vectorizeDesign": "ឧបករណ៍ Vectorize & Design",
    "tool.videoEditing": "ឧបករណ៍កាត់តវីដេអូ",
    

    // Projects Section
    "projects.label": "// គម្រោងសំខាន់ៗ",
    "projects.title": "អ្វីដែលខ្ញុំបានបង្កើតឡើងមក",
    "projects.code": "Code",
    "projects.demo": "Demo",
    "projects.caseStudy": "Case Study →",
    "projects.pinned": "● ពិសេស",
    "projects.ecoInventoryTitle": "EcoInventory",
    "projects.ecoInventoryDesc": "ប្រព័ន្ធគ្រប់គ្រងសារពើភ័ណ្ឌ E-Commerce ដែលបានបង្កើតដោយប្រើបច្ចេកវិទ្យា Laravel សម្រាប់ទាំងផ្នែកមុខ និងផ្នែកខាងក្រោយដោយប្រើ API ជាប្រព័ន្ធមួយកណ្តាល។",
    
    "projects.scan2AttendTitle": "Scan2Attend",
    "projects.scan2AttendDesc": "ប្រព័ន្ធវត្តមានបន្ទប់រៀន IoT ដែលប្រើ ESP32 និងស្កែនម្រាមដៃ ភ្ជាប់ជាមួយ Laravel backend ជាមួយនឹងការរក្សាទុកក្នុង SD card ពេលគ្មានអ៊ីនធើណិត។",

    "projects.localEventsTitle": "Local Event Discovery Platform",
    "projects.localEventsDesc": "ទទួលកូដពីក្រុមផ្សេង កែកំហុស ៨+ ធ្ងន់ រចនា UI ទាំងអស់ និង Deploy ទៅ DigitalOcean ជាមួយ Cloudflare R2 storage។",

    "projects.aiHandTitle": "AI Hand Interaction System",
    "projects.aiHandDesc": "ក្រាហ្វិក 3D ដែលគ្រប់គ្រងដោយកាយវិការដៃតាម webcam។ បង្កើតដោយ Three.js និង MediaPipe ជាមួយរូបរាង ៥ និង VFX នេអុង។",

    "projects.notepadTitle": "NotePad",
    "projects.notepadDesc": "គម្រោងដំបូងបំផុតរបស់ខ្ញុំ — ការចម្លង Windows Notepad ដែលបង្កើតដោយ Python និង PyQt5 នៅចុងឆ្នាំ ២០២៣ មុនពេលចូលសាកលវិទ្យាល័យ។",

    // Mindset Section
    "mindset.label": "// ផ្នត់គំនិត",
    "mindset.title": "របៀបដែលខ្ញុំចូលទៅកាន់ជំនាញ Software Engineering ក្នុងនាមជា CS Student",
    "mindset.p1": "រៀនរចនា System ដែលអាចថែរក្សា និង Scalable បាន",
    "mindset.p2": "ផ្តោតលើគុណភាព Code និង Best Practices",
    "mindset.p3": "ផ្តោតលើ User Experience និង Accessibility",
    "mindset.p4": "ទទួលយកការសហការ និង Open Source",
    "mindset.p5": "រៀនសូត្រជាបន្តបន្ទាប់ និងសម្រប់ខ្លួនជាមួយបច្ចេកវិទ្យាថ្មី",
    "mindset.p6": "តុល្យភាពរវាង Performance និង Resource Efficiency",
    "mindset.p7": "តុល្យភាពរវាង UI, Backend និង System Design",
    "mindset.p8": "គិតពីផលប៉ះពាល់រយៈពេលវែង និង Sustainability",

    // Achievements Section
    "achievements.label": "// សមិទ្ធិផល GitHub",
    "achievements.title": "ការទទួលស្គាល់",
    "achievements.pullShark": "Pull Shark",
    "achievements.pullSharkDesc": "អ្នករួមចំណែកសកម្ម ជាមួយ PR ច្រើនដែលត្រូវបាន Merge",
    "achievements.yolo": "YOLO",
    "achievements.yoloDesc": "Merge PR ដោយគ្មានការត្រួតពិនិត្យ (ដោយទំនុកចិត្ត!)",

    // Resume Section
    "resume.label": "// ប្រវត្តិរូប",
    "resume.title": "ទាញយក CV របស់ខ្ញុំ",

    // Contact Section
    "contact.label": "// ទំនាក់ទំនង",
    "contact.title": "ទាក់ទងតាម",
    "contact.portfolio": "Portfolio",
    "contact.email": "អ៊ីមែល",
    "contact.github": "GitHub",
    "contact.location": "ទីតាំង",
    "contact.locationValue": "រាជធានីភ្នំពេញ កម្ពុជា",
    "contact.quote": '"រីករាយបើកទទួលសម្រាប់ ការសហការ និងការបង្កើតផលិតផលមានអត្ថន័យ។"',
    "contact.buyMeCoffee": "គាំទ្រការងាររបស់ខ្ញុំ",
    "contact.buyMeCoffeeDesc": "ប្រសិនបើអ្នកចូលចិត្តការងាររបស់ខ្ញុំ សូមពិចារណាទិញកាហ្វេមួយកែវ! ការគាំទ្ររបស់អ្នកជួយខ្ញុំបន្តរៀន និងបង្កើតអ្វីថ្មីៗ។",
    "contact.buyMeCoffeeButton": "ទិញកាហ្វេមួយកែវ",
    "contact.copyright": "© ២០២៦ លឿង ហេងឡុង។",
  },
}

// Default translation function for SSR
const defaultT = (key: string): string => {
  return translations.en[key] || key
}

// Create context with default value for SSR
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: defaultT,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "kh")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
