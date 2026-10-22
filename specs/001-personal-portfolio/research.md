# Research: Personal Portfolio

## Decisions

### React, Vite, JavaScript, and route splitting

- **Decision**: Keep the existing React 19 and Vite 8 JavaScript application. Add React Router 7 with the browser history router for `/`, `/projetos/:repo`, and `*`. Lazy-load the project details page and its Markdown dependency.
- **Rationale**: This matches the project constitution and the requested routes. React `lazy` loads a component's code on first render, and Vite converts dynamic imports into lazy chunks.
- **Alternatives considered**: Server-rendered routing or a separate backend; rejected because the portfolio is explicitly static and front-end only. Eagerly importing the details page; rejected because it puts README rendering code on the initial route.
- **Sources**: [React `lazy`](https://react.dev/reference/react/lazy), [Vite dynamic imports and code splitting](https://vite.dev/guide/features.html), [React Router BrowserRouter](https://reactrouter.com/api/declarative-routers/BrowserRouter).

### Tailwind and theme tokens

- **Decision**: Integrate Tailwind CSS 4 using the first-party `@tailwindcss/vite` plugin. Define the dark variant against the `.dark` class and centralize theme colors and typography in CSS theme variables.
- **Rationale**: The current Vite project can use Tailwind's Vite integration directly; CSS variables keep the two theme palettes and design tokens centralized. Set the saved theme class before first paint to reduce theme flashing.
- **Alternatives considered**: Tailwind 3's JavaScript configuration; not selected for this new integration because the current Tailwind Vite setup is CSS-first. A second theme library; rejected as unnecessary.
- **Sources**: [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite), [Tailwind dark mode with a manual class](https://tailwindcss.com/docs/dark-mode).

### GitHub repository list and selection

- **Decision**: Request `GET /users/AndreyDurante/repos?per_page=100&sort=pushed` once on a list-cache miss/expiry. Filter the returned `topics` locally for `portfolio`, and map `name`, `full_name`, `description`, `homepage`, `topics`, `html_url`, and `default_branch` into the view model. Use `homepage` for the online button and omit it when empty.
- **Rationale**: GitHub documents that this endpoint returns public repositories for a user, supports `per_page` up to 100, and its repository representation includes `topics`, `description`, and `homepage`. The request is public and needs no token. Client filtering avoids per-repository topic requests.
- **Alternatives considered**: One topics request per repository or GraphQL; rejected because the user requires one listing request and local filtering. Multiple REST pages; rejected because it violates that constraint.
- **Tradeoff**: A single page cannot return more than 100 repositories. If the account exceeds that number, only the selected first page can be considered; `sort=pushed` prioritizes recently active repositories. Revisit only if the portfolio needs older projects beyond that page.
- **Sources**: [GitHub REST repository endpoints](https://docs.github.com/en/rest/repos/repos), [GitHub REST pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api).

### Optional project images

- **Decision**: Keep project images as optional, owner-provided optimized local assets under `src/assets/projects/`, mapped by repository slug in `src/data/projectImages.js`. If no asset is mapped, render the text-only card.
- **Rationale**: The requested GitHub repository list fields do not include a standard project screenshot field. A local optional map avoids per-project API or image-source requests, allows dimensions and compression to be controlled, and honors the no-image card behavior.
- **Alternatives considered**: Guessing an image from repository contents, using GitHub social-preview scraping, or fetching an image from a README; rejected because those sources are inconsistent and add requests or external dependencies.

### README retrieval, cache, and safe Markdown

- **Decision**: On the details route only, call `GET /repos/AndreyDurante/{repo}/readme` and use the JSON representation's base64 content and path. Decode UTF-8 and cache the Markdown and README path for one hour. Do not persist GitHub's `download_url` as a durable URL because GitHub documents download URLs as expiring; build image bases from the fixed owner, repository, the repository's `default_branch`, and README path. Render with `react-markdown` using `skipHtml`. Do not use `rehype-raw`. Keep the default URL sanitizer; rewrite only relative image `src` values to raw GitHub URLs, handling README-directory-relative paths and repository-root paths separately.
- **Rationale**: The GitHub README endpoint supplies content and its path and works unauthenticated for a public repository. Building asset URLs from repository metadata avoids relying on GitHub's expiring `download_url`. `react-markdown`'s safe URL transform restricts protocols; raw HTML is deliberately disabled. Relative image resolution preserves README assets without allowing arbitrary URL transformations.
- **Alternatives considered**: Rendering GitHub-produced HTML or enabling `rehype-raw`; rejected because the user explicitly prohibits raw HTML and it adds security and bundle risks. Fetching all READMEs with the list; rejected because details are on demand and this multiplies network work.
- **Sources**: [GitHub Get a repository README](https://docs.github.com/en/rest/repos/contents#get-a-repository-readme), [GitHub repository-content download URL guidance](https://docs.github.com/en/rest/repos/contents#notes), [react-markdown API and security](https://github.com/remarkjs/react-markdown#security), [GitHub relative links and images](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#relative-links).

### One-hour cache and stale fallback

- **Decision**: Use separate versioned localStorage entries for repository-list data and each README, with `fetchedAt`/`expiresAt` metadata and a one-hour freshness window. Return fresh cache without a request. On expiry, display available stale data while refreshing; if refresh fails, retain stale data, then use a small owner-verified static project snapshot. If neither exists, show a localized friendly error. Guard storage reads/writes so quota or privacy-mode failures do not break rendering.
- **Rationale**: This implements the constitution's cache and fallback requirements while keeping the homepage independent from README detail requests.
- **Alternatives considered**: A shared single cache key; rejected because list and README freshness/lifecycles are independent. Treating expired cache as unusable on request failure; rejected because the spec and constitution require last-known data or a minimal fallback.

### Three.js badge

- **Decision**: Use the `three` package directly in `ProfileBadge3D.jsx`, not `@react-three/fiber`. Render a small badge scene with minimal geometry/material and the owner-provided photo. Keep a same-size static badge as the default. A capability gate checks desktop width, `prefers-reduced-motion: no-preference`, and WebGL availability before dynamically importing the 3D component. Render only on pointer interaction if motion is desired; dispose renderer, geometry, materials, texture, observers, and listeners on unmount.
- **Rationale**: For one small scene, raw Three.js avoids an additional React renderer and its abstraction/dependency layer. Dynamic import keeps Three and its dependent code out of the eager mobile path. The static version remains available on mobile, reduced-motion preferences, and unsupported WebGL.
- **Alternatives considered**: React Three Fiber; declarative and capable of on-demand rendering, but an unnecessary extra package for this isolated card and not smaller by evidence available. CSS-only 3D; rejected because the user explicitly chose Three.js. Continuous animation; rejected in favor of an event-driven effect to reduce work.
- **Measurement note**: No bundle-size benchmark was available before implementation. Confirm the built initial entry and mobile network do not load the Three.js chunk; if the desktop chunk is material, use Three.js tree-shaking and trim scene features before reconsidering a different renderer.
- **Sources**: [Three.js fundamentals](https://threejs.org/manual/pages/fundamentals.html), [Three.js WebGLRenderer (WebGL 2 requirement)](https://threejs.org/docs/pages/WebGLRenderer.html), [React Three Fiber](https://r3f.docs.pmnd.rs/), [Vite dynamic imports](https://vite.dev/guide/features.html), [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### Vercel direct-route support

- **Decision**: Add a root `vercel.json` rewrite from `/(.*)` to `/index.html`; let React Router resolve valid project routes and the in-app not-found route.
- **Rationale**: Vercel otherwise treats a direct nested path as a server file path. The SPA rewrite permits refreshes and direct links to `/projetos/:repo` while leaving the URL unchanged.
- **Alternatives considered**: Hash routing; rejected because the requested routes are clean paths. A server route/backend; rejected by the static-site scope.
- **Sources**: [Vercel SPA rewrite guidance](https://vercel.com/kb/guide/why-is-my-deployed-project-giving-404), [Vercel `vercel.json` rewrite reference](https://vercel.com/docs/project-configuration/vercel-json).

### Testing setup

- **Decision**: Add Vitest on the existing Vite config, jsdom for DOM tests, React Testing Library plus `@testing-library/dom`, and `@testing-library/jest-dom` for assertions. Add a `test` script and retain `lint` as a separate required gate.
- **Rationale**: Vitest is built for Vite and current guidance requires Vite >=6.4 and Node >=22.12; the environment reports Node 22.20 and Vite 8.3.4. React Testing Library tests user-visible DOM behavior rather than implementation details.
- **Alternatives considered**: Jest and Enzyme; rejected because the user requested Vitest/RTL and the app already uses Vite. Browser-only end-to-end suite; not added to the specified minimum test scope.
- **Sources**: [Vitest getting started](https://vitest.dev/guide/), [Vitest DOM environments](https://vitest.dev/guide/environment.html), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Use `@testing-library/user-event` for tab-keyboard, language/theme, and other interaction tests so tests model user actions rather than dispatching isolated events. This is a small test-only dependency justified by the required keyboard behavior. Source: [Testing Library user-event](https://testing-library.com/docs/user-event/intro/).
