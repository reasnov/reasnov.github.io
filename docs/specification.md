# Software Requirements Specification (SRS)
**Project:** reasnov.github.io  
**Date:** 2026-01-30  
**Standard Reference:** Aligned with ISO/IEC/IEEE 29148:2018 (Requirements Engineering)

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to specify the software requirements for the `reasnov.github.io` personal portfolio and blog platform. It details the functional and non-functional requirements, data models, and interface constraints to guide development and testing.

### 1.2 Scope
The software is a static web application serving as a professional portfolio. It includes:
*   A landing page showcasing skills, tools, and projects.
*   A blog system for technical writing.
*   Internationalization capabilities.
*   A highly optimized, responsive user interface.

### 1.3 Definitions, Acronyms, and Abbreviations
*   **SSG:** Static Site Generation.
*   **I18n:** Internationalization.
*   **Frontmatter:** Metadata at the top of markdown files.
*   **Astro Islands:** Architecture pattern for partial hydration of interactive components.

## 2. Functional Requirements

### 2.1 Portfolio & Showcase
*   **REQ-001 (Hero Section):** The system shall display a "Hero" section with a terminal-style introduction (`FakeTerminal.astro`) and personal branding (`Brand.astro`).
*   **REQ-002 (Skill Display):** The system shall render a list of technical skills from a structured data source (`skills.json`).
*   **REQ-003 (Tooling Display):** The system shall render a list of development tools/software used, sourced from `tools.json`.

### 2.2 Blog System
*   **REQ-004 (Post Listing):** The system shall display a paginated list of blog posts.
*   **REQ-005 (Post Rendering):** The system shall render individual blog posts written in Markdown/MDX, supporting code syntax highlighting.
*   **REQ-006 (Metadata):** Each post must display a title, publication date, description, and optional tags defined in the frontmatter.

### 2.3 Core Services
*   **REQ-007 (Configuration):** The application must initialize a global configuration singleton (`App.Core.Config`) that aggregates settings from `config/*.config.ts`.
*   **REQ-008 (Localization):** The system shall support full multi-language capabilities. It must support at least English (EN) and Indonesian (ID) locales, utilizing the `App.Core.Translator` service for dynamic text replacement.

## 3. Data Specifications

### 3.1 Content Collections (`src/data/blog/`)
The blog content follows a strict schema enforced by Zod.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Headline of the article. |
| `description` | String | Yes | Short summary for SEO and previews. |
| `pubDate` | Date | Yes | Publication date. |
| `updatedDate` | Date | No | Last modification date. |
| `heroImage` | String | No | Path to the cover image. |

### 3.2 Static Data Models (`src/data/*.json`)
**Skills Model (`skills.json`):**
```json
[
  {
    "name": "Technology Name",
    "icon": "icon-class-name",
    "level": "proficiency-level" // Optional
  }
]
```

## 4. Non-Functional Requirements

### 4.1 Performance
*   **NFR-001 (Core Web Vitals):** The site must achieve a Lighthouse performance score of >90 on mobile and desktop.
*   **NFR-002 (Load Time):** Largest Contentful Paint (LCP) must occur within 2.5 seconds.
*   **NFR-003 (Build Optimization):** Unused CSS must be purged during the build process (handled by Tailwind).

### 4.2 Usability & Accessibility
*   **NFR-004 (Responsive Design):** The UI must adapt to viewports ranging from 320px (mobile) to 1920px+ (desktop).
*   **NFR-005 (A11y):** All interactive elements must be keyboard accessible and include ARIA labels where visual context is insufficient. Colors must meet WCAG AA contrast ratios.

### 4.3 Reliability
*   **NFR-006 (Type Safety):** The codebase must compile with strict TypeScript settings (`strict: true`), ensuring zero implicit `any` types.

## 5. System Interfaces

### 5.1 User Interfaces
*   **Navigation:** A top-level component (`Header.astro` / `Navbar.astro`) providing links to Home, Blog, and About pages.
*   **Footer:** A global footer (`Footer.astro`) containing social links and copyright info.
*   **Dock:** A macOS-like floating dock (`Dock.astro`) for quick access to primary tools or links.

### 5.2 Software Interfaces
*   **Astro API:** The system interfaces with `Astro.glob` and `getCollection` for file system access at build time.
*   **Svelte Integration:** Svelte components utilize the custom `astro-svelte` integration for reactivity.

## 6. Constraints
*   **Hosting:** The output must be static HTML/CSS/JS files suitable for hosting on GitHub Pages.
*   **Browser Support:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge) last 2 versions.
