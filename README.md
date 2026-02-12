# JobBoard — Job Listing Interface

A modern, responsive Job Board application built with **Vite**, **TypeScript**, **React**, **shadcn/ui**, and **Tailwind CSS**. Users can search, filter, and sort curated job listings in real time.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Application Flow](#application-flow)
4. [Performance](#performance)
5. [Folder Structure](#folder-structure)
6. [File-by-File Explanation](#file-by-file-explanation)
7. [Hooks & Their Roles](#hooks--their-roles)
8. [Assumptions & Future Improvements](#assumptions--future-improvements)

---
## 🌐 Live Demo
Check out the live project here:  
🔗 [https://jobfilt.netlify.app/](https://jobfilt.netlify.app/)

---

## 📸 Demo Preview
![Project Screenshot](https://res.cloudinary.com/dp8gu4t9m/image/upload/v1770907213/Screenshot_2026-02-12_200418_uofdwp.png)

## Getting Started

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate into the project
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the dev server (hot-reload enabled)
npm run dev
```

The app will be available at `http://localhost:8080`.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
│  ┌───────────────────────────────────────────┐  │
│  │              React App (SPA)              │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────┐  │  │
│  │  │ Router  │→ │  Pages   │→ │Components│  │  │
│  │  │(React   │  │(Index,   │  │(JobCard, │  │  │
│  │  │ Router) │  │NotFound) │  │ Filters) │  │  │
│  │  └─────────┘  └────┬─────┘  └────┬────┘  │  │
│  │                    │              │        │  │
│  │              ┌─────▼──────────────▼────┐   │  │
│  │              │    Data Layer (jobs.ts)  │   │  │
│  │              └─────────────────────────┘   │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Built & served by Vite (ESBuild + Rollup)      │
│  Styled with Tailwind CSS + shadcn/ui tokens    │
└─────────────────────────────────────────────────┘
```

### Technology Roles

| Technology | Role |
|---|---|
| **Vite** | Dev server with instant HMR, optimized production builds via Rollup |
| **TypeScript** | Static type checking across all components, data, and hooks |
| **React 18** | Component-based UI with hooks for state management |
| **React Router v6** | Client-side routing (SPA navigation) |
| **Tailwind CSS** | Utility-first styling with a custom design-token system |
| **shadcn/ui** | Pre-built, accessible UI primitives (Toast, Tooltip, Dialog, etc.) |
| **TanStack Query** | Data-fetching and cache layer (available for future API integration) |

---

## Application Flow

```
User opens app
  │
  ▼
main.tsx renders <App />
  │
  ▼
App.tsx sets up providers:
  QueryClientProvider → TooltipProvider → Toaster → BrowserRouter
  │
  ▼
Router matches "/" → renders <Index />
  │
  ▼
Index.tsx:
  1. Loads static job data from data/jobs.ts
  2. Initialises state: searchTerm, locationFilter, typeFilter, sortAlpha
  3. Computes displayedJobs via useMemo (filter + sort)
  4. Renders <Filters /> and a grid of <JobCard /> components
  │
  ▼
User interacts (types, clicks filters)
  │
  ▼
State updates → useMemo recomputes → UI re-renders instantly
```

---

## Performance

### Build-Time Optimisations

| Technique | Detail |
|---|---|
| **Vite + ESBuild** | TypeScript/JSX transpilation is 20-100× faster than traditional bundlers. Dev server starts in < 1 second. |
| **SWC Plugin** | `@vitejs/plugin-react-swc` replaces Babel with SWC for even faster React transforms. |
| **Tree Shaking** | Rollup (production build) eliminates unused code — only imported shadcn components are bundled. |
| **Code Splitting** | React Router enables lazy-loadable routes (ready to add `React.lazy()` per page). |

### Runtime Optimisations

| Technique | Where | Detail |
|---|---|---|
| **`useMemo`** | `Index.tsx` | The filtered/sorted job list is memoised. It only recomputes when `searchTerm`, `locationFilter`, `typeFilter`, or `sortAlpha` change — not on every render. |
| **Minimal Re-renders** | `Filters.tsx` | State is lifted to `Index.tsx`; filter components are pure and only re-render when their specific props change. |
| **CSS-only Animations** | `JobCard.tsx` | Hover effects (shadow, translate) use CSS `transition` — zero JavaScript, GPU-accelerated. |
| **Static Data** | `jobs.ts` | The jobs array is defined outside any component, so it's created once and shared across renders (no allocation on re-render). |

### Rendering Cost

With 12 jobs and simple DOM, each filter interaction triggers:
- 1 state update → 1 `useMemo` recompute (O(n) filter) → React diffs ~12 card elements.
- Total re-render time: **< 1 ms** on modern hardware.

---

## Folder Structure

```
project-root/
│
├── public/                     # Static assets served as-is
│   ├── favicon.ico             # Browser tab icon
│   ├── placeholder.svg         # Generic placeholder image
│   └── robots.txt              # Search engine crawling rules
│
├── src/                        # Application source code
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui primitives (auto-generated)
│   │   │   ├── button.tsx      # Button component with variants
│   │   │   ├── card.tsx        # Card container component
│   │   │   ├── dialog.tsx      # Modal dialog component
│   │   │   ├── toast.tsx       # Toast notification component
│   │   │   ├── toaster.tsx     # Toast container/renderer
│   │   │   ├── tooltip.tsx     # Tooltip component
│   │   │   ├── use-toast.ts    # Re-export of toast hook
│   │   │   └── ... (40+ ui primitives)
│   │   ├── Filters.tsx         # Search bar + filter chip controls
│   │   ├── JobCard.tsx         # Individual job listing card
│   │   └── NavLink.tsx         # Navigation link helper
│   │
│   ├── data/                   # Static data & type definitions
│   │   └── jobs.ts             # Job interface + mock dataset (12 jobs)
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx      # Responsive breakpoint detection
│   │   └── use-toast.ts        # Toast notification state management
│   │
│   ├── lib/                    # Shared utility functions
│   │   └── utils.ts            # cn() — Tailwind class merge helper
│   │
│   ├── pages/                  # Route-level page components
│   │   ├── Index.tsx           # Main job board page (home route)
│   │   └── NotFound.tsx        # 404 catch-all page
│   │
│   ├── test/                   # Test configuration
│   │   ├── setup.ts            # Vitest setup file
│   │   └── example.test.ts     # Example test
│   │
│   ├── App.tsx                 # Root component (providers + router)
│   ├── App.css                 # Additional global styles
│   ├── main.tsx                # Entry point — mounts React to DOM
│   ├── index.css               # Design tokens, fonts, Tailwind layers
│   └── vite-env.d.ts           # Vite client type declarations
│
├── index.html                  # HTML shell (Vite entry)
├── vite.config.ts              # Vite configuration (port, aliases, plugins)
├── tailwind.config.ts          # Tailwind theme extensions + custom colours
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # TS config for app source code
├── tsconfig.node.json          # TS config for Node tooling (vite.config)
├── postcss.config.js           # PostCSS plugins (Tailwind + autoprefixer)
├── eslint.config.js            # ESLint configuration
├── vitest.config.ts            # Vitest test runner configuration
├── components.json             # shadcn/ui CLI configuration
└── README.md                   # This file
```

### Folder Purposes

| Folder | Purpose |
|---|---|
| `public/` | Files served directly without processing. Accessed via absolute URLs (e.g., `/favicon.ico`). |
| `src/components/` | Reusable, composable React components. Split into app-specific (`Filters`, `JobCard`) and generic UI primitives (`ui/`). |
| `src/components/ui/` | shadcn/ui components — copy-pasted, fully customisable primitives. These are **not** a node_module; they live in the repo for full control. |
| `src/data/` | Static data files and their TypeScript interfaces. Acts as a mock backend — easily replaceable with API calls. |
| `src/hooks/` | Custom React hooks encapsulating reusable stateful logic (responsive detection, toast notifications). |
| `src/lib/` | Pure utility functions with no React dependency. The `cn()` helper merges Tailwind classes intelligently. |
| `src/pages/` | Top-level components mapped 1:1 to routes. Each page composes components from `components/`. |
| `src/test/` | Test infrastructure — setup files and test suites using Vitest. |

---

## File-by-File Explanation

### Configuration Files

| File | Purpose |
|---|---|
| `index.html` | The single HTML page. Contains `<div id="root">` where React mounts. Vite injects the JS bundle automatically. |
| `vite.config.ts` | Configures dev server (port 8080, IPv6), SWC React plugin, and the `@/` path alias pointing to `src/`. |
| `tailwind.config.ts` | Extends the default Tailwind theme with semantic colour tokens (`primary`, `secondary`, `muted`, etc.), custom border radii, and accordion animations. |
| `tsconfig.json` | Root TypeScript config using project references to split app and node configs. Defines `@/*` path alias. |
| `tsconfig.app.json` | App-specific TS settings: ES2020 target, JSX support, bundler module resolution, relaxed strictness for rapid development. |
| `tsconfig.node.json` | Strict TS config for build tooling files (`vite.config.ts`). |
| `postcss.config.js` | Registers Tailwind CSS and autoprefixer as PostCSS plugins. |
| `components.json` | Tells the shadcn CLI where components, utils, and styles live for code generation. |
| `vitest.config.ts` | Test runner config — integrates with Vite's transform pipeline for fast test execution. |

### Source Files

| File | Purpose |
|---|---|
| `src/main.tsx` | **Entry point.** Creates the React root and renders `<App />`. This is the file Vite loads first. |
| `src/App.tsx` | **Root component.** Wraps the entire app in providers: `QueryClientProvider` (data caching), `TooltipProvider`, `Toaster` (notifications), and `BrowserRouter` (routing). Defines all routes. |
| `src/index.css` | **Design system.** Defines CSS custom properties (HSL colour tokens) for light and dark themes, imports Google Fonts (Space Grotesk + DM Sans), and sets up Tailwind's base layer. |
| `src/App.css` | Additional global CSS styles beyond Tailwind utilities. |
| `src/vite-env.d.ts` | TypeScript declaration for Vite's client types (import.meta.env, asset imports). |

### Pages

| File | Purpose |
|---|---|
| `src/pages/Index.tsx` | **Main page.** Manages all filter/search state with `useState`. Uses `useMemo` to derive the filtered job list. Renders the header, hero section, `<Filters />`, result count, and a responsive grid of `<JobCard />` components. |
| `src/pages/NotFound.tsx` | **404 page.** Displayed for any unmatched route via the `*` catch-all in the router. |

### Components

| File | Purpose |
|---|---|
| `src/components/Filters.tsx` | **Filter controls.** Renders a search input with icon and rows of filter chips (Location: All/Remote/On-site, Type: All/Internship/Full-time, Sort: A→Z). Fully controlled — all state lives in the parent. |
| `src/components/JobCard.tsx` | **Job card.** Displays job title (with search-term highlighting), description, company, location badge, type badge, and "posted X days ago". Uses colour-coded badges via CSS custom properties. |
| `src/components/NavLink.tsx` | **Navigation helper.** Reusable link component for router-aware navigation styling. |
| `src/components/ui/*` | **shadcn/ui library.** 40+ accessible, composable primitives (Button, Dialog, Select, Toast, Tooltip, etc.). Each is a standalone file that can be customised directly. |

### Data

| File | Purpose |
|---|---|
| `src/data/jobs.ts` | Exports the `Job` TypeScript interface and an array of 12 mock job objects. Fields: `id`, `title`, `company`, `location` (Remote/On-site), `type` (Internship/Full-time), `description`, `postedDaysAgo`. |

### Utilities

| File | Purpose |
|---|---|
| `src/lib/utils.ts` | Exports `cn()` — combines `clsx` (conditional classes) with `tailwind-merge` (deduplicates conflicting Tailwind classes). Used throughout shadcn components. |

---

## Hooks & Their Roles

### `useIsMobile` — `src/hooks/use-mobile.tsx`

**Purpose:** Detects whether the viewport is below the mobile breakpoint (768px).

**How it works:**
1. On mount, attaches a `matchMedia` listener for `(max-width: 767px)`.
2. Updates a boolean state whenever the viewport crosses the breakpoint.
3. Cleans up the listener on unmount.

**Usage:** Conditionally render mobile-specific layouts or toggle between mobile/desktop component variants.

```tsx
const isMobile = useIsMobile();
// → true on phones, false on tablets/desktop
```

### `useToast` — `src/hooks/use-toast.ts`

**Purpose:** Manages toast notification state (queue of messages shown to the user).

**How it works:**
1. Maintains an array of toast objects (id, title, description, variant).
2. Provides `toast()` to add a notification and `dismiss()` to remove one.
3. Auto-dismisses toasts after a timeout.

**Usage:** Show success/error feedback after user actions.

```tsx
const { toast } = useToast();
toast({ title: "Saved!", description: "Your changes were saved." });
```

### Built-in React Hooks Used

| Hook | Where | Purpose |
|---|---|---|
| `useState` | `Index.tsx` | Tracks search term, location filter, type filter, and sort toggle. Four independent state variables drive the entire UI. |
| `useMemo` | `Index.tsx` | Memoises the filtered + sorted job array. Prevents re-filtering on unrelated re-renders. Dependency array: `[searchTerm, locationFilter, typeFilter, sortAlpha]`. |
| `useEffect` | `use-mobile.tsx` | Subscribes to viewport resize events on mount, cleans up on unmount. |

---

## Assumptions & Future Improvements

### Assumptions
- Job data is static (mock). In production, this would come from an API.
- No authentication is required for browsing jobs.
- The 12-job dataset is small enough that client-side filtering is performant without debouncing.

### Improvements with More Time
- **API Integration:** Replace static data with a real backend (Lovable Cloud / REST API).
- **Pagination / Infinite Scroll:** Handle hundreds or thousands of listings efficiently.
- **Job Detail Page:** Click a card to see full description, requirements, and an apply button.
- **Bookmarking:** Let users save jobs to a personal list (persisted in a database).
- **Dark Mode Toggle:** The CSS tokens already support dark mode — just needs a theme switcher.
- **Debounced Search:** Add a small delay before filtering on keystroke for larger datasets.
- **Accessibility Audit:** Add ARIA labels, keyboard navigation, and screen reader announcements.
- **Unit Tests:** Expand test coverage for filter logic and component rendering.
