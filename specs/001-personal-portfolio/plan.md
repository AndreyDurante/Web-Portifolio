# Implementation Plan: Personal Portfolio

**Branch**: `001-personal-portfolio` | **Date**: 2026-10-22 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-personal-portfolio/spec.md`; technical decisions supplied with `$speckit-plan`.

## Summary

Build a bilingual, responsive portfolio that introduces the owner and presents project work, skills, education, and contact links. Extend the existing React 19/Vite starter with React Router, Tailwind CSS, local static language data, and dedicated GitHub services and hooks. Fetch the owner's public repositories in one request, select the `portfolio` topic in the browser, and cache project-list and on-demand README data separately for one hour. Render README Markdown safely in a lazy-loaded detail route. Keep the photo badge static by default and load raw Three.js only after a desktop and reduced-motion capability check. Publish as a Vercel single-page application with direct-route rewrites.

## Technical Context

**Language/Version**: JavaScript (ES modules); existing React 19.3.1 and Vite 8.3.4; Node.js 22.20.0 is available locally.

**Primary Dependencies**: React Router 7, Tailwind CSS 4 with `@tailwindcss/vite`, Three.js (raw library, no React renderer), `react-markdown`, Vitest, React Testing Library, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event`, and jsdom. Resolve mutually compatible package versions when installing.

**Storage**: Browser `localStorage` for separately keyed project-list and README cache entries and language/theme preferences; static profile, verified minimum project fallback, and translations in `src/data/`; résumé PDFs in `public/`. No server-side storage.

**Testing**: Vitest with jsdom and React Testing Library. Required unit/component coverage includes GitHub topic filtering and stale-cache fallback, language and theme switching, tab roles and arrow-key behavior, and relevant loading, empty, not-found, and missing-README states. ESLint remains mandatory.

**Target Platform**: Vercel-hosted static web app; responsive modern mobile and desktop browsers. Desktop browsers with WebGL 2 support may receive the 3D badge; all other cases receive the static badge.

**Project Type**: Single React web application (client-routed static site).

**Performance Goals**: Mobile Lighthouse Performance score >= 80 and Accessibility score >= 90. Reserve project-card space while loading. Optimize images, define dimensions, and lazy-load images below the fold. The initial/mobile bundle must not load Three.js; only the detail route may load the Markdown renderer. Limit typography to two families and use `font-display: swap`.

**Constraints**: Exactly one public GitHub repository-list request per expired/missing list cache; filter the response locally. GitHub pagination returns at most 100 repositories per request, so request `per_page=100` and document the first-page limitation. On failure use stale cache, then a small owner-verified static fallback list, then a friendly state only if no verified fallback is available. README requests are separate, on demand, and cached independently. No backend, database, authentication, contact form, raw README HTML, or internationalization library. Keep TypeScript out of the project.

**Scale/Scope**: One owner's public GitHub account, up to 100 repositories returned by the single list request, two routes plus a not-found route, two languages, two themes, three showcase tabs, and three top-level page sections plus footer.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Before research

- **Fixed stack and boundaries — PASS**: React, Vite, JavaScript, Tailwind, React Router, type-based folders, and service/hook separation are explicit. Three.js and the Markdown renderer are justified by the requested 3D badge and README detail page; no broader UI or i18n library is added.
- **Quality, testing, and accessibility — PASS**: Vitest, React Testing Library, ESLint, semantic structure, image text alternatives, keyboard operation, focus visibility, contrast, reduced-motion handling, and Lighthouse Accessibility >= 90 are included.
- **Performance — PASS**: Mobile Performance >= 80, two-font maximum with swap display, reserved project skeletons, and desktop-only lazy Three.js with static mobile/reduced-motion fallback are included.
- **Project data and localization — PASS**: One public GitHub list request, local topic filtering, one-hour `localStorage` cache, stale cache and verified minimal fallback, Portuguese default, English option, locale data files, persisted preferences, and synchronized document language are included.
- **Design and product scope — PASS**: Reusable `Button`, `Card`, and `Section`; centralized color/theme tokens; subtle grid, pill navigation, monochrome palette and restrained red accent; static site and links-only contact are retained.
- **Workflow and governance — PASS**: Vercel deployment, direct-route rewrite, lint/test gates, mobile Lighthouse review, and Conventional Commits are planned.

No constitution violations require an exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-portfolio/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── navigation-and-ui.md
│   └── github-data.md
└── tasks.md              # Produced by $speckit-tasks, not by this command
```

### Source Code (repository root)

```text
public/
├── cv-pt.pdf                 # Owner-provided Portuguese résumé
├── cv-en.pdf                 # Owner-provided English résumé
└── ...
src/
├── assets/
│   ├── owner-photo.*         # Owner-provided portrait; do not use starter art as identity
│   └── projects/              # Optional optimized owner-provided project images
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Section.jsx
│   ├── Navigation.jsx
│   ├── ShowcaseTabs.jsx
│   ├── ProjectCard.jsx
│   ├── LoadingSkeleton.jsx
│   ├── ProfileBadge.jsx
│   └── ProfileBadge3D.jsx   # Isolated dynamic chunk; imports three
├── contexts/
│   ├── LanguageContext.jsx
│   └── ThemeContext.jsx
├── data/
│   ├── pt.js
│   ├── en.js
│   ├── projectImages.js      # Optional repository-slug-to-asset map
│   └── fallbackProjects.js  # Minimal owner-verified project snapshot
├── hooks/
│   ├── useProjects.js
│   ├── useProjectReadme.js
│   ├── useLanguage.js
│   └── useTheme.js
├── pages/
│   ├── HomePage.jsx
│   ├── ProjectDetailsPage.jsx  # Lazy route; owns react-markdown import
│   └── NotFoundPage.jsx
├── services/
│   ├── githubService.js
│   └── cacheService.js
├── utils/
│   ├── readmeImages.js
│   └── storage.js
├── App.jsx
├── index.css                 # Tailwind import and centralized CSS theme tokens
└── main.jsx
tests/
├── services/
├── components/
└── contexts/
vercel.json
vite.config.js
```

**Structure Decision**: Use one Vite application and the requested type-based `src/` folders. Keep API and cache logic in services and call them through hooks. Place cross-cutting state providers in `contexts/`, content in `data/`, and user-visible flows in page components. Co-locate tests by area under `tests/`; do not add backend or database directories.

## Phase 0: Research

Research decisions and alternatives are recorded in [research.md](research.md). Main outcome: use raw Three.js in a separately imported badge component rather than React Three Fiber, gate its import on desktop and `prefers-reduced-motion: no-preference`, and retain a same-size static badge fallback. Use `react-markdown` with raw HTML skipped and only narrowly transform relative image sources. Use Vite's lazy dynamic chunks and Vercel's all-path rewrite to `/index.html`.

## Phase 1: Design & Contracts

- Domain shapes, cache envelopes, and lifecycle states are specified in [data-model.md](data-model.md).
- Browser navigation, tabs, accessibility, and user-facing route behavior are specified in [contracts/navigation-and-ui.md](contracts/navigation-and-ui.md).
- GitHub list and README retrieval, local filtering, one-hour cache, stale fallback, and URL behavior are specified in [contracts/github-data.md](contracts/github-data.md).
- Runnable implementation validation scenarios are in [quickstart.md](quickstart.md).
- The source tree above is the intended structure for implementation; exact profile copy, contact URLs, portrait, and PDF files remain owner-supplied content.

### Post-design Constitution Re-check

- **Boundaries**: PASS — no new application layers outside the authorized static React site; the data flow remains `services/` → `hooks/` → components/pages.
- **Accessibility and quality**: PASS — tab semantics and keyboard arrows are part of the UI contract; automated tests and Lighthouse gates are in scope.
- **Performance**: PASS — Three.js and `react-markdown` are isolated in lazy chunks; responsive static fallback, font and image constraints, and layout-stable loading are covered.
- **Data and i18n**: PASS — one repository-list page, local topic filtering, independent one-hour caches, stale-cache then verified static fallback behavior, locale data and persisted language/theme are defined. The release content gate requires at least one owner-reviewed fallback project so the required fallback is real and factual.
- **Product and design**: PASS — no backend or form; the existing design direction, reusable components, Vercel target, and branch/commit/test workflow are preserved.

No exceptions or unresolved technical clarifications remain. The 100-repository single-page limit is an explicit tradeoff required by the one-request constraint.

## Complexity Tracking

No constitution violations.
