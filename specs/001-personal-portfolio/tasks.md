---
description: "Dependency-ordered implementation tasks for the personal portfolio"
---

# Tasks: Personal Portfolio

**Input**: Design documents from `/specs/001-personal-portfolio/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Included because the specification and constitution require Vitest and React Testing Library coverage for critical behavior.

**Organization**: Tasks are grouped by the four user stories in `spec.md`. Shared framework work is completed first; each story then adds its independently testable user-facing increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other marked tasks because it touches separate files and has no unmet dependency.
- **[Story]**: User story traced to `spec.md` (`US1`–`US4`). Setup, foundation, and polish tasks have no story label.
- Every task names its implementation or test file paths.

## Phase 1: Setup

**Purpose**: Install the approved stack and configure the project for application implementation.

- [X] T001 Add React Router, Tailwind CSS 4 with `@tailwindcss/vite`, Three.js, `react-markdown`, Vitest, React Testing Library, user-event, jest-dom, and jsdom dependencies in `package.json` and update the repository lockfile.
- [X] T002 Configure Vite, Tailwind, and Vitest/jsdom in `vite.config.js` and `src/index.css`; add `test` and preserve `dev`, `build`, `preview`, and `lint` scripts in `package.json`.
- [X] T003 [P] Replace starter document metadata and mount point in `index.html` for the portfolio application.

---

## Phase 2: Foundational

**Purpose**: Build shared structures needed by all stories before story-specific UI work.

**⚠️ CRITICAL**: Complete this phase before beginning user story implementation.

- [X] T004 Create the application entry, provider tree, React Router route table, lazy route boundary, and global not-found route in `src/main.jsx` and `src/App.jsx`.
- [X] T005 [P] Define centralized light/dark color, typography, and spacing tokens; import Tailwind and add subtle grid, focus, reduced-motion, and base layout styles in `src/index.css`.
- [X] T006 [P] Implement resilient localStorage read/write helpers with JSON validation and storage-exception handling in `src/utils/storage.js`.
- [X] T007 [P] Implement versioned, one-hour cache envelopes and expiration helpers for repository and README entries in `src/services/cacheService.js`.
- [X] T008 [P] Create reusable semantic `Button`, `Card`, and `Section` components with variants, accessible focus states, and responsive defaults in `src/components/Button.jsx`, `src/components/Card.jsx`, and `src/components/Section.jsx`.
- [X] T009 Create the Portuguese and English content object schemas, default locale selection, persistence, and `<html lang>` synchronization in `src/data/pt.js`, `src/data/en.js`, `src/contexts/LanguageContext.jsx`, and `src/hooks/useLanguage.js`; include only supplied/verified personal facts and omit unknown identity assets or destinations.
- [X] T010 Implement persisted light/dark preference state and root `.dark` class synchronization in `src/contexts/ThemeContext.jsx` and `src/hooks/useTheme.js`.
- [X] T011 Add shared RTL setup and browser API mocks in `tests/setup.js` and register the setup file in `vite.config.js`.

**Checkpoint**: Shared routing, styling, preferences, storage, and test infrastructure are ready.

---

## Phase 3: User Story 1 - Understand the candidate and reach projects (Priority: P1) 🎯 MVP

**Goal**: Present the candidate's factual profile, photo badge, résumé action, and an immediate route to projects.

**Independent Test**: Render the landing page at mobile and desktop widths; verify the factual introduction, supplied portrait handling, résumé action when a PDF exists, and projects anchor action.

### Tests for User Story 1

- [X] T012 [P] [US1] Add landing-page RTL coverage for introduction content, project-anchor navigation, and omission of unsupplied portrait/résumé assets in `tests/pages/HomePage.test.jsx`.

### Implementation for User Story 1

- [X] T013 [P] [US1] Add localized presentation, résumé, and navigation copy in `src/data/pt.js` and `src/data/en.js`, using only verified owner details and gracefully absent asset paths.
- [X] T014 [US1] Implement the responsive presentation section, profile text, résumé download, and projects anchor action in `src/components/Presentation.jsx`.
- [X] T015 [US1] Implement a dimension-stable static photo badge with meaningful alt text or graceful omission when no owner portrait is supplied in `src/components/ProfileBadge.jsx`.
- [X] T016 [US1] Implement the shared pill navigation and wire it with presentation and section anchors in `src/components/Navigation.jsx` and `src/pages/HomePage.jsx`.
- [X] T017 [US1] Add the projects showcase section placeholder and compose the required home-page section order in `src/pages/HomePage.jsx`.

**Checkpoint**: The candidate and primary action are clear on first load; projects are reachable without scrolling.

---

## Phase 4: User Story 2 - Explore projects and technical details (Priority: P1)

**Goal**: List only portfolio-tagged public repositories, expose available project links, and render README details on an internal route.

**Independent Test**: Use mocked GitHub responses with tagged/untagged repositories and projects with/without homepage, README, or local image; verify filtering, loading/empty/fallback states, card actions, and direct detail navigation.

### Tests for User Story 2

- [X] T018 [P] [US2] Test local filtering for the exact `portfolio` topic, single-page request behavior, cache expiry, stale-cache fallback, static fallback, malformed response, and storage failure in `tests/services/githubService.test.js`.
- [X] T019 [P] [US2] Test project loading skeleton, selected-project cards, text-only cards, safe homepage omission, and empty/error states in `tests/components/ProjectShowcase.test.jsx`.
- [X] T020 [P] [US2] Test README success, stale cache, missing README, unsafe raw HTML/URL handling, and relative image resolution in `tests/pages/ProjectDetailsPage.test.jsx`.
- [X] T021 [P] [US2] Test unknown project slug and global not-found navigation in `tests/pages/NotFoundPage.test.jsx`.

### Implementation for User Story 2

- [X] T022 [US2] Implement the one-request public GitHub repository fetch, response validation, exact topic filter, stale-cache path, and verified static fallback in `src/services/githubService.js` and `src/data/fallbackProjects.js`; request `https://api.github.com/users/AndreyDurante/repos?per_page=100&sort=pushed` and never fabricate fallback entries.
- [X] T023 [US2] Expose project-list and on-demand README lifecycle state through hooks in `src/hooks/useProjects.js` and `src/hooks/useProjectReadme.js`.
- [X] T024 [P] [US2] Implement fixed-space loading skeletons and accessible project cards with optional local images, details links, and validated `homepage` actions in `src/components/LoadingSkeleton.jsx` and `src/components/ProjectCard.jsx`.
- [X] T025 [US2] Implement the three-tab showcase shell's Projects panel, localized loading/empty/error messaging, and hook integration in `src/components/ShowcaseTabs.jsx` and `src/pages/HomePage.jsx`.
- [X] T026 [US2] Implement case-insensitive slug lookup constrained to `AndreyDurante`, README API retrieval/cache, UTF-8 Base64 decoding, and missing/stale states in `src/services/githubService.js` and `src/hooks/useProjectReadme.js`.
- [X] T027 [P] [US2] Implement safe relative README image URL resolution using repository, default branch, and README path in `src/utils/readmeImages.js`.
- [X] T028 [US2] Implement the lazy project detail route with lazy-loaded `react-markdown`, ignored raw HTML, safe links/images, stale/missing states, and return-to-projects action in `src/pages/ProjectDetailsPage.jsx` and `src/App.jsx`.
- [X] T029 [P] [US2] Add optional repository-slug-to-optimized-local-image mapping in `src/data/projectImages.js` and place only supplied image assets under `src/assets/projects/`.
- [X] T030 [US2] Configure Vercel SPA rewrites for direct `/projetos/:repo` navigation in `vercel.json`.

**Checkpoint**: Project data and README routes work independently of presentation assets; unavailable project metadata never breaks the rest of the page.

---

## Phase 5: User Story 3 - Review skills and career path (Priority: P2)

**Goal**: Present the required technologies, soft skills, education, and work history in both languages, with a second résumé action.

**Independent Test**: Select each skills tab and inspect the trajectory in both locales; verify all named items and that the résumé action appears only when its localized PDF is supplied.

### Tests for User Story 3

- [X] T031 [P] [US3] Test all required ungrouped technology chips, soft-skill entries, trajectory items, bilingual labels, and résumé omission/download behavior in `tests/components/SkillsAndTrajectory.test.jsx`.

### Implementation for User Story 3

- [X] T032 [P] [US3] Add the required technology names, translated soft skills, education/work entries, and résumé paths to `src/data/pt.js` and `src/data/en.js` without inventing dates, qualifications, or job outcomes.
- [X] T033 [US3] Implement ungrouped technology and soft-skill chip panels using the shared tab shell in `src/components/ShowcaseTabs.jsx` and `src/components/SkillList.jsx`.
- [X] T034 [US3] Implement the education/work timeline and second conditional résumé action in `src/components/Trajectory.jsx` and `src/pages/HomePage.jsx`.
- [ ] T035 [P] [US3] Add supplied Portuguese and English résumé PDFs as `public/cv-pt.pdf` and `public/cv-en.pdf`; keep corresponding actions absent until the files are available.

**Checkpoint**: Skills and trajectory content is complete and factual in both supported locales.

---

## Phase 6: User Story 4 - Use the portfolio in preferred language, theme, and device (Priority: P2)

**Goal**: Let visitors choose and retain locale and theme, use keyboard-operable tabs, and receive a responsive experience with a static badge fallback.

**Independent Test**: Change language and theme, reload, navigate tabs with arrow keys, and inspect phone/desktop plus reduced-motion behavior.

### Tests for User Story 4

- [X] T036 [P] [US4] Test language selection, persistence, default Portuguese, and document `lang` synchronization in `tests/contexts/LanguageContext.test.jsx`.
- [X] T037 [P] [US4] Test theme selection, persistence, default dark mode, and root `.dark` synchronization in `tests/contexts/ThemeContext.test.jsx`.
- [X] T038 [P] [US4] Test tab roles, selected state, roving tab focus, arrow/Home/End activation, and active-panel-only rendering in `tests/components/ShowcaseTabs.test.jsx`.
- [X] T039 [P] [US4] Test locale/theme controls and static badge fallback under mobile or reduced-motion preferences in `tests/components/Navigation.test.jsx` and `tests/components/ProfileBadge.test.jsx`.

### Implementation for User Story 4

- [X] T040 [US4] Implement accessible language and theme controls in the navigation, with localized accessible names and persisted context updates in `src/components/Navigation.jsx`.
- [X] T041 [US4] Implement ARIA tablist/tab/tabpanel semantics, roving focus, arrow/Home/End activation, and only-active-panel rendering in `src/components/ShowcaseTabs.jsx`.
- [X] T042 [US4] Implement responsive page, navigation, showcase, project cards, timeline, and footer layouts with no horizontal overflow in `src/index.css`, `src/components/Navigation.jsx`, `src/components/ProjectCard.jsx`, and `src/components/Trajectory.jsx`.
- [X] T043 [US4] Implement capability-gated desktop Three.js badge loading through dynamic import only at widths of at least 64rem with WebGL 2 and reduced motion disabled; preserve the same-size static fallback on all failures in `src/components/ProfileBadge.jsx` and `src/components/ProfileBadge3D.jsx`.
- [X] T044 [US4] Add bilingual footer links for verified LinkedIn, GitHub, and email destinations, omitting any unsupplied destination and keeping the footer form-free in `src/components/Footer.jsx` and `src/pages/HomePage.jsx`.

**Checkpoint**: Preferences persist, controls are keyboard-operable, and mobile/reduced-motion users never load the Three.js badge.

---

## Phase 7: Polish and release readiness

**Purpose**: Verify cross-story quality, truthful owner content, and the deployment acceptance gates.

- [ ] T045 [P] Populate remaining profile copy, contact destinations, résumé PDFs, and at least one owner-reviewed GitHub fallback project using verified material in `src/data/pt.js`, `src/data/en.js`, `src/data/fallbackProjects.js`, `src/assets/owner-photo.webp`, `public/cv-pt.pdf`, and `public/cv-en.pdf` before publication; convert a supplied portrait to optimized WebP and omit any item not supplied or confirmed.
- [X] T046 Update `specs/001-personal-portfolio/quickstart.md` with implementation-specific commands and manual checks for direct detail-route refresh, locale/theme persistence, narrow/wide layouts, reduced motion, safe Markdown rendering, and Vercel preview behavior.
- [X] T047 Run `npm run test`, `npm run lint`, and `npm run build`; resolve failures in the affected `tests/`, `src/`, `package.json`, or `vite.config.js` files before merge.
- [ ] T048 Run Lighthouse in mobile mode on a Vercel preview and meet Performance >= 80 and Accessibility >= 90; correct relevant UI/assets in `src/` and verify direct route rewrites in `vercel.json` before publication.
- [X] T049 Create a Conventional Commit for the implementation using an approved prefix and keep any merge/deploy on the primary branch after tests and lint pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; establishes the toolchain.
- **Foundational (Phase 2)**: Depends on Setup; blocks story implementation.
- **US1 (Phase 3)**: Depends on Foundation; defines the home-page shell and immediate visitor path.
- **US2 (Phase 4)**: Depends on Foundation and the US1 home-page section shell (T017); project cards/details are independently testable with mocked data.
- **US3 (Phase 5)**: Depends on Foundation and the showcase tab shell from US2 (T025); trajectory can be implemented alongside the tab content after the shell exists.
- **US4 (Phase 6)**: Depends on Foundation plus the navigation, tabs, and badge surfaces introduced by US1–US3. Its tests should be written before its behavior changes.
- **Polish (Phase 7)**: Depends on all desired stories; owner-supplied material is a publication gate.

### User Story Dependencies

- **US1 (P1)**: Can start after Foundation and is the MVP.
- **US2 (P1)**: Requires the home showcase anchor/section from US1; otherwise independent of US3 and US4.
- **US3 (P2)**: Uses the showcase tabs from US2; trajectory content is independent of GitHub fetch behavior.
- **US4 (P2)**: Applies preferences and responsive behavior across already-created controls, so it follows the core story surfaces.

### Within Each User Story

- Write the story's listed tests before its implementation; run them during implementation and ensure they pass before its checkpoint.
- Add locale data before rendering story copy; implement service behavior before consuming it in page components.
- Keep each task scoped to its named paths; coordinate tasks that touch the same file sequentially.

### Parallel Opportunities

- Setup T003 can run alongside T001/T002 where package/config edits are not involved.
- After setup, T005–T008 and T011 can proceed in parallel; T009 and T010 are separate preference contexts.
- US2 tests T018–T021 can be written in parallel. T024 and T027/T029 are independent of service implementation after their test contracts are clear.
- US3 data task T032 and PDF asset task T035 can proceed independently; T031 can be prepared before either implementation task.
- US4 context/tab tests T036–T039 can proceed in parallel; implementation tasks touching the same navigation, tab, or badge files should be sequenced by file ownership.

## Parallel Example: User Story 2

```text
Task: "Test local filtering and fallback in tests/services/githubService.test.js"
Task: "Test project cards and loading states in tests/components/ProjectShowcase.test.jsx"
Task: "Test README and missing-content states in tests/pages/ProjectDetailsPage.test.jsx"
Task: "Test not-found navigation in tests/pages/NotFoundPage.test.jsx"
```

## Implementation Strategy

### MVP First (US1)

1. Complete Setup and Foundational phases.
2. Complete US1 and validate the first-impression/profile journey.
3. Add US2 for the primary project evidence and README flow.
4. Add US3 and US4, then complete all publication gates.

### Independent Story Validation

- **US1**: Landing page renders factual intro; project action reaches the showcase; supplied résumé downloads and missing assets are omitted.
- **US2**: Mocked GitHub tagged/untagged results filter correctly; stale/fallback/error paths work; README route and optional homepage behave per contract.
- **US3**: Both locales contain every required technology, soft skill, education/work entry, and conditional résumé action.
- **US4**: Preferences survive reload and update `<html>` state; tabs work with keyboard; mobile/reduced-motion retains static badge.

## Notes

- `[P]` means separate files and no unmet dependency; tasks sharing a listed file must be sequenced.
- `[Story]` labels provide traceability to `spec.md`.
- Personal content, portrait, résumé files, contact destinations, and fallback projects must be supplied or owner-verified; never fabricate them.
- Lighthouse targets are publication gates: mobile Performance >= 80 and Accessibility >= 90.
