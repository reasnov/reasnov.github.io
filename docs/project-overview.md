# Project Overview: reasnov.github.io

## 1. Introduction

`reasnov.github.io` is a modern, high-performance personal portfolio and technical blog platform. It serves as a professional showcase for **Andreas Novyanto (Reas Vyn)**, a Fullstack Web Developer.

The project is uniquely designed with a **Terminal UI (TUI)** aesthetic, combining the nostalgic feel of a command-line interface with modern web performance and responsiveness.

## 2. Vision & Goals

- **Professional Identity:** A centralized hub for professional experience, projects, and contact info.
- **Knowledge Sharing:** A localized technical blog for sharing insights on web development.
- **TUI Aesthetic:** Delivering a "hacker-style" user experience through a Terminal-inspired interface.
- **Performance Excellence:** Near-perfect Lighthouse scores through Astro's Islands Architecture and self-hosted assets.
- **Global Reach:** Native multi-language support (English and Indonesian).

## 3. Key Features

- **Terminal UI (TUI):** A cohesive design language inspired by retro terminals, featuring boxy borders, monospaced typography, and functional windows.
- **Command Palette (Ctrl+K):** Instant navigation and command execution via a Svelte-powered modal.
- **Keyboard Navigation:** Power-user shortcuts (e.g., `T` for theme, `G+H` for home, `G+B` for blog).
- **Localized Blog:** Full i18n support, draft mode, reading time calculation, and automated Table of Contents (ToC).
- **Dynamic Portfolio:** Sections for Skills, Tools, Showcase, and professional Career Timeline.
- **SEO & Social:** Automatic JSON-LD (Person/BlogPosting), Open Graph, and Twitter metadata.
- **Responsive TUI:** Mobile-first design including a specialized TUI-style mobile navigation menu.

## 4. Technology Stack

- **Framework:** [Astro 5.x](https://astro.build/) (SSG & Islands Architecture).
- **UI Library:** [Svelte 5.x](https://svelte.dev/) (Interactive components like Command Palette).
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/) & [DaisyUI 5.x](https://daisyui.com/).
- **Typography:** [Geist Mono](https://vercel.com/font/mono) (Self-hosted for performance).
- **I18n:** [i18next](https://www.i18next.com/) (Logic) + Astro Native i18n (Routing).
- **Testing:** [Vitest](https://vitest.dev/) (Unit/Logic) with 100% core coverage.

## 5. Architecture Summary

The project follows a **Layered Architecture**:

1.  **Core Layer (`src/core/`):** Framework-agnostic kernel (Translator, Config, SEO, Env).
2.  **Content Layer (`src/content/`):** Astro Content Collections for blog posts.
3.  **Data Layer (`src/data/`):** Centralized JSON sources for skills, experience, and projects.
4.  **Component Layer (`src/components/`):**
    - `ui/`: Atomic UI elements and Svelte components.
    - `partials/`: Molecular TUI windows and section layouts.
5.  **Routing Layer (`src/pages/`):** i18n-aware file-based routing.

## 6. Project Structure

```text
├── config/              # Application configuration (Laravel-style)
├── docs/                # Project documentation
├── locales/             # Translation resource files (JSON)
├── public/              # Static assets and Self-hosted fonts
├── src/
│   ├── components/      # UI (Atomic) and Partials (Molecular TUI)
│   ├── content/         # Markdown content collections (Blog)
│   ├── core/            # Kernel logic and utility services (with tests)
│   ├── data/            # Static data sources (JSON)
│   ├── layouts/         # Page templates (App, Blog)
│   ├── pages/           # i18n-aware routes
│   └── styles/          # Global TUI-themed CSS
└── vitest.config.ts     # Testing configuration
```

## 7. Development & Deployment

- **Setup:** `npm install`
- **Development:** `npm run dev`
- **Testing:** `npm run test`
- **Production Build:** `npm run build`
- **Deployment:** Automated via `gh-pages` to GitHub Pages.
