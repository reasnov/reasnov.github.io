# System Architecture Document
**Project:** reasnov.github.io  
**Date:** 2026-01-30  
**Standard Reference:** Aligned with ISO/IEC/IEEE 42010:2011 (Architecture Description)

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive architectural overview of the `reasnov.github.io` web application. It describes the design decisions, component organization, and technical standards used to ensure maintainability, scalability, and performance.

### 1.2 Scope
The scope of this document covers the frontend architecture, content management strategies, and core application utilities. It includes the directory structure, key subsystems (Configuration, I18n), and the integration of the Astro framework with Svelte.

## 2. Architectural Overview

### 2.1 Architectural Pattern
The system follows a **Component-Based Architecture** utilizing Astro's **Islands Architecture**. This approach allows for static site generation (SSG) by default, with interactive components (Svelte) hydrated only when necessary, ensuring optimal performance.

### 2.2 Technology Stack
*   **Core Framework:** Astro 5.x
*   **UI Framework:** Svelte 5.x
*   **Styling:** Tailwind CSS 4.x (Utility-first)
*   **Language:** TypeScript (Strict typing)
*   **Runtime/Build:** Node.js / Vite

## 3. System Structure

### 3.1 Directory Organization
The codebase is structured to separate concerns between configuration, core logic, and presentation.

| Directory | Role | Description |
| :--- | :--- | :--- |
| `src/core//` | **Core Logic** | Contains framework-agnostic business logic and utilities (Config, Env, Translator). Acts as the application's "kernel". |
| `config/` | **Configuration** | Centralized configuration files (App, Blog, Settings). |
| `src/components/` | **Presentation** | Reusable UI components, categorized into `ui/` (atomic) and `partials/` (molecular/organism). |
| `src/layouts/` | **Layouts** | Global page wrappers (AppLayout, BlogLayout). |
| `src/pages/` | **Routing** | File-based routing for the application. |
| `src/data/` | **Data Source** | Static data files (JSON) and Content Collections (Markdown). |
| `public/` | **Static Assets** | Direct-access static files (favicon, robots.txt). |

## 4. Key Subsystems

### 4.1 Core Logic Layer (`src/core//`)
This layer provides essential services to the application, abstracting external dependencies.

*   **Config Service (`Config.ts`):** Implements a dynamic configuration loader. It aggregates settings from the `config/` directory, allowing strictly typed access to application-wide constants.
*   **Environment Service (`Env.ts`):** Wraps `import.meta.env` to provide type-safe access to environment variables.
*   **Translation Service (`Translator.ts`):** A lightweight Internationalization (i18n) utility that loads JSON-based locales from `lang/`. It is architected to support multiple languages concurrently, with primary support for English (EN) and Indonesian (ID).

### 4.2 Content Management
The application utilizes **Astro Content Collections** for structured content.

*   **Schema Definition:** Defined in `config/blog.config.ts` using Zod for validation.
*   **Storage:** Markdown files located in `src/data/blog/`.
*   **Access:** Queried via Astro's `getCollection` API, ensuring type safety for frontmatter data.

### 4.3 UI Component Hierarchy
*   **Atoms (`src/components/ui/`):** Base elements like `Brand.astro`, `Dock.astro`, `Navbar.astro`. These are pure presentational components.
*   **Molecules/Organisms (`src/components/partials/`):** Complex sections like `Hero.astro` or `Skills.astro` that compose multiple atomic components.

## 5. Design Decisions & Standards

### 5.1 Separation of Concerns
*   **Logic vs. View:** Business logic is encapsulated in `src/core/`, keeping Astro components focused purely on rendering and data fetching.
*   **Config vs. Code:** Hardcoded values are strictly avoided in components; they must be referenced via the `Config` service.

### 5.2 Styling Strategy
*   **Tailwind CSS:** Used for all styling needs. Custom CSS is minimal (`src/styles/global.css`) and reserved for global resets or complex animations not easily handled by utility classes.
*   **Responsiveness:** Mobile-first design principles are enforced via Tailwind breakpoints.

### 5.3 Type Safety
*   **TypeScript:** Enforced across the codebase. `tsconfig.json` is configured for strict null checks and explicit any avoidance.
*   **DTOs/Interfaces:** Data structures (like Skills or Tools) are defined via TypeScript interfaces or Zod schemas.
