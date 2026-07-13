# Henglong Loeung | Portfolio

A personal portfolio site built with Next.js 16 and React 19. It showcases my work as a Computer Science student, project manager, and software engineer, with an interactive 3D tech stack visualization, animated case study pages, and a responsive dark and light theme.

## Tech Stack

- Framework: [Next.js 16](https://nextjs.org/) (App Router)
- Library: [React 19](https://react.dev/)
- Styling: [Tailwind CSS 4](https://tailwindcss.com/)
- UI Components: [Radix UI](https://www.radix-ui.com/) (via [shadcn/ui](https://ui.shadcn.com/))
- Icons: [MUI Icons](https://mui.com/material-ui/material-icons/) and [Simple Icons](https://simpleicons.org/)
- Fonts: JetBrains Mono, Poppins, and Zalando Sans Expanded
- Analytics: [Vercel Analytics](https://vercel.com/analytics)

## Features

- Interactive 3D tech stack cloud with a synced, auto-scrolling carousel
- Detailed case study pages for each project, including animated architecture diagrams and browser-frame screenshots
- Dark and light mode powered by `next-themes`
- Scroll-triggered reveal animations throughout the page
- Responsive layout for desktop and mobile
- GitHub stats section pulling live repository data

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm (preferred package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure

```
app/
  layout.tsx          Root layout with global providers and fonts
  page.tsx             Main landing page
  projects/            Case study pages, one folder per project
components/
  ui/                  Reusable UI primitives (shadcn/ui)
  *-section.tsx        Feature-specific homepage sections
hooks/                 Custom React hooks
lib/                   Utility functions and shared data
public/                Static assets, including project screenshots and logos
```

## Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Runs the built production application.
- `pnpm lint`: Runs ESLint to check for code quality issues.

## License

This project is open source and available under the [MIT License](LICENSE).
