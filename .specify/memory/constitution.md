<!--
Sync Impact Report
- Version change: 1.0.0 → 1.0.1
- Modified principles: consolidated the existing nine principles into five template sections; wording clarified as enforceable project rules.
- Added sections: Additional Constraints; Development Workflow.
- Removed sections: none; existing requirements are retained in the consolidated principles and constraints.
- Follow-up TODOs: none.
-->

# Portfólio Pessoal Constitution

## Core Principles

### I. Fixed Stack and Clear Boundaries
The application MUST use React, Vite, Tailwind CSS, and JavaScript; TypeScript MUST NOT be introduced. Routes MUST use React Router. New dependencies require a clear need, no simple existing alternative, and justification in the implementation plan. Code MUST be organized by type (`components/`, `pages/`, `hooks/`, `services/`, `utils/`). GitHub API access MUST live in `services/` and be exposed to components through hooks. Components MUST remain small and have one responsibility.

### II. Quality, Testing, and Accessibility (NON-NEGOTIABLE)
Critical behavior MUST have Vitest and React Testing Library coverage, including GitHub project search and filtering, language switching, and theme switching. Lint MUST pass before merge, and a feature is not complete while its tests or lint fail. The interface MUST use semantic HTML, provide appropriate `alt` text for all images, maintain sufficient contrast in both themes, support keyboard navigation with visible focus, and respect `prefers-reduced-motion`. The mobile Lighthouse Accessibility score MUST be at least 90 before publication.

### III. Performance (NON-NEGOTIABLE)
The mobile Lighthouse Performance score MUST be at least 80 before publication. The site MUST use no more than two font families, loaded with `font-display: swap`. Images MUST be optimized, have defined dimensions, and use `loading="lazy"` below the fold. Network-dependent content MUST reserve space and use a skeleton so it does not block the first render or cause layout shifts. The 3D card MUST load only on desktop through a lazy or dynamic import; mobile users and users who prefer reduced motion MUST receive the static badge. The 3D library MUST NOT be included in the initial mobile bundle.

### IV. Reliable, Minimal Project Data and Internationalization
Projects MUST be fetched in the browser from the public GitHub API with one request. The client MUST show only repositories with the `portfolio` topic, filtering the returned topics locally. The response MUST be cached in `localStorage` with an expiry, such as one hour. On API failure, the site MUST use available cached data or a minimal fallback list and remain usable. Repositories without images MUST render as text-only rounded cards with a project summary. Portuguese MUST be the default language, and visitors MUST be able to switch between Portuguese and English. User-visible copy MUST come from language-specific files or objects, not be hard-coded in components. The selected language MUST persist in `localStorage`, and the document's `lang` attribute MUST match it. The lightweight project context-and-copy solution MUST NOT add an internationalization library.

### V. Consistent Design and Product Scope
The interface MUST use reusable Tailwind components, including `Button`, `Card`, and `Section`. Colors, typography, and spacing MUST use centralized Tailwind configuration and theme variables instead of scattered values. The site MUST provide light and dark themes with a toggle. Its visual system MUST use a monochrome base with restrained dark red accents; red text and links MUST retain adequate contrast, including a lighter red variant in dark mode. Typography MUST use wide, bold headings, clean sans-serif supporting text, and monospace navigation and details. The visual direction MUST remain dark, minimal, and use a subtle grid, pill-shaped navigation, and rounded cards. The product MUST remain a static front-end site: no backend, database, comments, or file uploads. Contact MUST be offered through email and social links, with no contact form.

## Additional Constraints

- The project MUST be hosted on Vercel and deployed from the primary branch.
- Project and owner information MUST remain factual; credentials, outcomes, endorsements, and other personal claims MUST NOT be invented.

## Development Workflow

- Each feature MUST be developed on its own branch. Merge to the primary branch requires passing tests and lint.
- Commits MUST follow Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
- Before publication, run Lighthouse in mobile mode and confirm the Performance and Accessibility minimums defined above.

## Governance

This constitution takes precedence over other project practices. Every feature plan and review MUST check the affected requirements in this constitution; exceptions require an explicit amendment before implementation or merge. Amendments MUST record their rationale and update this document's version and last-amended date. Versioning follows semantic versioning: MAJOR for incompatible removals or redefinitions, MINOR for new principles or materially expanded guidance, and PATCH for clarifications and non-semantic wording changes.

**Version**: 1.0.1 | **Ratified**: 2026-10-22 | **Last Amended**: 2026-10-22
