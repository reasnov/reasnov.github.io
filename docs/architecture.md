# System Architecture Document

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive architectural overview of the `reasnov.github.io` web application. It describes the design decisions, component organization, and technical standards used to ensure maintainability, scalability, and performance.

### 1.2 Scope
The scope covers the frontend architecture, content management, core utilities, and the hybrid hydration strategy using Astro and Svelte.

## 2. Architectural Overview

### 2.1 Architectural Pattern
The system follows a **Component-Based Architecture** utilizing Astro's **Islands Architecture**. This ensures a fast TTI (Time to Interactive) by only hydrating interactive elements.

### 2.2 Technology Stack
*   **Core Framework:** Astro 5.x (with Native i18n Routing)
*   **UI Framework:** Svelte 5.x
*   **Styling:** Tailwind CSS 4.x
*   **Language:** TypeScript (Strict)
*   **Testing:** Vitest (Unit/Logic) & Playwright (E2E)
*   **Runtime/Build:** Node.js / Vite

## 3. System Structure

### 3.1 Directory Organization
| Directory | Role | Description |
| :--- | :--- | :--- |
| `src/core/` | **Core Logic** | Framework-agnostic kernel (Config, Env, Utils). |
| `config/` | **Configuration** | Centralized settings and Zod schemas. |
| `src/components/` | **Presentation** | UI components (`ui/`, `partials/`). |
| `src/layouts/` | **Layouts** | Global wrappers including SEO & JSON-LD logic. |
| `src/pages/` | **Routing** | i18n-aware file-based routing. |
| `src/data/` | **Data Source** | JSON data and Markdown collections. |

## 4. Key Subsystems

### 4.1 Core Logic Layer (`src/core/`)
*   **Config Service:** Aggregates settings with strict type validation.
*   **Translation Service:** Complements Astro's native i18n by providing dynamic translation keys for non-route content.
*   **Content Processors:** Logic for calculating reading time and filtering draft content.

### 4.2 Content & Media Management
*   **Astro Content Collections:** Uses Zod for frontmatter validation, including `draft` status and `tags`.
*   **Asset Optimization:** Utilizes `astro:assets` for automated image processing (WebP/AVIF, lazy loading).

### 4.3 SEO & Metadata Strategy
*   **JSON-LD:** Dynamic generation of `Person` and `BlogPosting` schemas.
*   **Open Graph:** Automated metadata management for social sharing.

## 5. Design Decisions & Standards

### 5.1 Hydration Strategy
Components use specific directives to optimize performance:
*   `client:visible`: For components like `Dock` or `Footer`.
*   `client:idle`: For non-critical background interactions.

### 5.2 Accessibility (A11y)
*   **Reduced Motion:** Animations must respect `prefers-reduced-motion` settings.
*   **Semantic HTML:** Enforced to ensure screen reader compatibility.

### 5.3 Testing Strategy
*   **Logic:** 100% coverage for `src/core/` using Vitest.
*   **Interactions:** Critical paths (e.g., Terminal, Navigation) verified via Playwright.