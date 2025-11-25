# Copilot Instructions for Luxe Living Showcase

## Architecture Overview
This is a single-page React application built with Vite, TypeScript, and Tailwind CSS, showcasing a luxury real estate company's projects. The app uses a component-based architecture with static data.

- **Main Structure**: `src/App.tsx` sets up routing (currently only `/` and 404), `src/pages/Index.tsx` renders the full homepage with sections.
- **Components**: Located in `src/components/`, using shadcn/ui for consistent UI primitives. Key components include `Hero`, `FeaturedProjects` (with GSAP animations), and `ProjectDetailModal`.
- **Data Layer**: Static data in `src/data/projects.ts` and `src/data/contacts.ts`, typed with interfaces in `src/types/`.
- **Styling**: Tailwind CSS with custom theme colors (sage, gold) defined in `tailwind.config.ts`. Use `cn()` from `src/lib/utils.ts` for class merging.
- **Animations**: GSAP for scroll-triggered and interactive animations, registered in components like `FeaturedProjects.tsx`.

## Developer Workflows
- **Development**: `npm run dev` starts Vite dev server on port 8080.
- **Build**: `npm run build` for production build, `npm run build:dev` for development build.
- **Linting**: `npm run lint` uses ESLint with React hooks and refresh plugins.
- **Preview**: `npm run preview` serves the built app locally.
- No test suite; validate changes by running `npm run dev` and manual testing.

## Conventions and Patterns
- **Component Naming**: PascalCase, functional components with hooks (e.g., `useState`, `useEffect`).
- **Imports**: Use `@/` alias for `src/` (configured in `vite.config.ts`).
- **Data Handling**: Filter and map static arrays (e.g., projects by status in `FeaturedProjects.tsx`).
- **Modal Management**: Use state for modal open/close and selected item (e.g., `ProjectDetailModal`).
- **Animations**: Register GSAP plugins per component; use `ScrollTrigger` for entrance effects.
- **UI Components**: Prefer shadcn/ui from `src/components/ui/`; customize via `components.json` for new additions.
- **Project Types**: Use `ProjectStatus` enum ("ongoing" | "completed" | "upcoming") for filtering.

## Integration Points
- **External Libraries**: Radix UI primitives via shadcn/ui, GSAP for animations, TanStack Query (set up but unused), React Router (minimal routing).
- **Assets**: Images in `src/assets/`, organized by category (Logo, Office, Projects).
- **Deployment**: Via Lovable platform; no custom CI/CD.

Reference `src/pages/Index.tsx` for page structure, `src/components/FeaturedProjects.tsx` for data usage and animations, `src/data/projects.ts` for data schema.</content>
<parameter name="filePath">d:\Projects\luxe-living-showcase\.github\copilot-instructions.md