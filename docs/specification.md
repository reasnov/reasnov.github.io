# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
Specifies the requirements for the `reasnov.github.io` portfolio and blog.

### 1.2 Scope
Includes a landing page, a localized blog system, and high-performance UI components.

## 2. Functional Requirements

### 2.1 Portfolio & Showcase
*   **REQ-001 (Hero):** Terminal-style intro with `prefers-reduced-motion` support.
*   **REQ-002 (Skills/Tools):** Dynamic rendering from JSON sources.

### 2.2 Blog System
*   **REQ-004 (Workflow):** Support for `draft` mode; draft posts are excluded from production builds.
*   **REQ-005 (Analytics):** Automatic calculation of "Reading Time" for each post.
*   **REQ-006 (Rich Content):** Markdown/MDX with optimized images via `astro:assets`.

### 2.3 Core Services
*   **REQ-007 (Localization):** Native Astro i18n routing (`/en/`, `/id/`) with `hreflang` support.
*   **REQ-008 (SEO):** Automatic generation of JSON-LD structured data for every page.

## 3. Data Specifications

### 3.1 Blog Schema (`src/data/blog/`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Article headline. |
| `description` | String | Yes | SEO summary. |
| `pubDate` | Date | Yes | Publication date. |
| `draft` | Boolean | Yes | If true, post is not published. |
| `tags` | Array | No | List of categories. |
| `heroImage` | String | No | Path to optimized image. |

## 4. Non-Functional Requirements

### 4.1 Performance & SEO
*   **NFR-001:** Lighthouse Performance Score > 95.
*   **NFR-002:** Cumulative Layout Shift (CLS) < 0.1.
*   **NFR-003:** Images must be served in modern formats (WebP/AVIF).

### 4.2 Quality Assurance
*   **NFR-004:** Strict TypeScript enforcement.
*   **NFR-005:** Unit tests for all utility functions in `src/core/`.
*   **NFR-006:** Accessibility compliance with WCAG 2.1 Level AA.

## 5. System Interfaces

### 5.1 User Interfaces
*   **Responsive UI:** Mobile-first, adaptive from 320px to 4K.
*   **SEO Layout:** Includes canonical URLs and Meta OG tags.

## 6. Constraints
*   **Static Hosting:** Optimized for GitHub Pages.
*   **Build Time:** Efficient asset processing to keep CI/CD pipelines under 5 minutes.