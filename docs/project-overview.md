# Project Overview: reasnov.github.io

## 1. Introduction
`reasnov.github.io` is a modern, high-performance personal portfolio and technical blog platform. It serves as a professional showcase for **Andreas Novyanto (Reas Vyn)**, a Fullstack Web Developer specializing in the Laravel ecosystem and modern web technologies.

The project is designed with a focus on **speed**, **accessibility**, and **clean architecture**, following industry standards for static site generation (SSG).

## 2. Vision & Goals
*   **Professional Identity:** To provide a centralized hub for professional experience, projects, and contact information.
*   **Knowledge Sharing:** To maintain a localized technical blog for sharing insights on web development, specifically Laravel, design patterns, and emerging technologies.
*   **Performance Excellence:** To achieve near-perfect Lighthouse scores through Astro's Islands Architecture and modern asset optimization.
*   **Global Reach:** To support multi-language content (English and Indonesian) natively.

## 3. Key Features
*   **Localized Blog:** Full i18n support with features like draft mode, automated reading time calculation, and SEO-optimized metadata.
*   **Dynamic Portfolio:** Sections for Skills, Tools, Project Showcase, and a professional Career Timeline (Experience).
*   **Interactive UI:** A virtual terminal introduction (`FakeTerminal.astro`) and smooth scroll animations (AOS).
*   **SEO & Social:** Automatic JSON-LD structured data generation (Person and BlogPosting) and Open Graph support.
*   **Language Switcher:** Seamless transition between English (EN) and Indonesian (ID) locales.
*   **Responsive Design:** Mobile-first approach adaptive to all screen sizes.

## 4. Technology Stack
*   **Framework:** [Astro 5.x](https://astro.build/) (Core engine for SSG and Islands Architecture).
*   **UI Library:** [Svelte 5.x](https://svelte.dev/) (For interactive components).
*   **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/) with [DaisyUI 5.x](https://daisyui.com/).
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed).
*   **Animations:** [AOS](https://michalsnik.github.io/aos/) (Animate on Scroll).
*   **Testing:** [Vitest](https://vitest.dev/) (Unit/Logic) and [Playwright](https://playwright.dev/) (E2E).
*   **I18n:** [i18next](https://www.i18next.com/) (Backend logic) + Astro Native i18n (Routing).

## 5. Architecture Summary
The project follows a **Layered Architecture**:
1.  **Core Layer (`src/core/`):** Contains framework-agnostic business logic (Config, SEO, Content, Translator).
2.  **Data Layer (`src/data/`):** Centralized JSON data and Markdown/MDX content collections.
3.  **Component Layer (`src/components/`):** Divided into atomic `ui/` components and molecular `partials/`.
4.  **Routing Layer (`src/pages/`):** Locale-specific file-based routing.

## 6. Project Structure
```text
├── config/              # Centralized configuration and Zod schemas
├── docs/                # Project documentation (Architecture, SRS, Overview)
├── lang/                # Translation resource files (JSON)
├── public/              # Static assets (images, icons)
├── src/
│   ├── components/      # Astro and Svelte components
│   ├── core/            # Kernel logic and utility services
│   ├── data/            # Static data (JSON) and Blog content (MD)
│   ├── layouts/         # Page templates and partials (Head, Footer)
│   ├── pages/           # i18n-aware routes
│   └── styles/          # Global CSS and Tailwind configuration
└── vitest.config.ts     # Testing configuration
```

## 7. Development & Deployment
*   **Setup:** `npm install`
*   **Development:** `npm run dev`
*   **Testing:** `npm run test` (Unit tests)
*   **Production Build:** `npm run build`
*   **Deployment:** `npm run deploy` (Automated via `gh-pages` to GitHub Pages)
