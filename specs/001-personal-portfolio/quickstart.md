# Quickstart: Personal Portfolio Validation

This guide describes validation after implementation. It does not run or install anything by itself.

## Prerequisites

- Node.js 22.12 or newer and npm.
- The implementation dependencies installed from the repository lockfile.
- Owner-supplied portrait, Portuguese and English résumé PDFs, verified contact/profile URLs, and at least one owner-reviewed fallback project for the final content pass.
- A network connection for uncached GitHub data and a Vercel preview for deployment-route checks.

## Local checks

1. Install dependencies from the lockfile with `npm ci`, then start the development server with `npm run dev` and open the local URL it prints.
2. Confirm `/` presents the four page areas in the required order, and the Projects action reaches the showcase without scrolling first.
3. Switch among all three tabs with pointer and arrow keys. Confirm only the active panel is rendered and its ARIA selection state follows focus/activation.
4. Switch language and theme, reload, and verify persisted choices plus the document `lang` value and root `.dark` class.
5. On a cache miss, confirm project cards enter a reserved-size loading state, show only repositories with the `portfolio` topic, use repository descriptions and `homepage`, show mapped local images or text-only cards, and make no more than one repository-list request.
6. Expire or remove the project cache and simulate a failed request. Confirm stale data appears when available; otherwise confirm the owner-verified static fallback is used, with a friendly error only when neither is available. Confirm a successful empty response uses the empty state.
7. Open `/projetos/{repo}` directly. Confirm README fetch occurs only on this route, is cached separately for one hour, renders Markdown with raw HTML ignored, rejects unsafe URL protocols, and resolves relative images. Check missing README and unknown slug states.
8. Check mobile and desktop sizes. At mobile width, confirm the static photo badge appears and no Three.js chunk is requested. At desktop width with reduced motion disabled and WebGL 2 available, confirm the separate badge chunk loads. With reduced motion or no WebGL 2, confirm the static badge remains.
9. Run the project gates:

   ```powershell
   npm run test
   npm run lint
   npm run build
   ```

   Expected: all Vitest/RTL assertions pass, ESLint reports no errors, and the production build succeeds. Inspect the generated asset graph to confirm the route and Three.js code are split from the initial entry.

## Preview and publish checks

1. Deploy a Vercel preview and open `/projetos/{repo}` directly, then refresh it. Confirm the rewrite serves the app and the internal route resolves.
2. Run Lighthouse in mobile mode on the preview. Require Performance >= 80 and Accessibility >= 90.
3. Verify the resume and contact destinations belong to the owner and that missing or unavailable external links are omitted. Check both themes and languages.
4. Merge to the primary branch only after tests and lint pass; publish from that branch using the existing Vercel project settings.
