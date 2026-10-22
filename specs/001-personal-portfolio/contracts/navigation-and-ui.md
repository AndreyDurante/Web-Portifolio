# Navigation and UI Contract

## Routes

| Path | Result | Failure behavior |
|---|---|---|
| `/` | Home page containing presentation, showcase, trajectory, and footer sections in that order. | Project data may show loading, stale, empty, or friendly error states; the rest of the page remains usable. |
| `/projetos/:repo` | Internal details page for a repository slug from the portfolio list; renders that repository README. | Unknown slug, missing README, or fetch failure shows localized status and a link back to `/` or the projects section. |
| `*` | Localized not-found page. | Provide a return-to-home link. |

Vercel rewrites incoming application routes to `/index.html`; the browser URL remains unchanged and React Router selects the route. Project slugs map to repository `name` values; matching is case-insensitive to align with GitHub's repository naming behavior. The route must not accept an arbitrary owner: the owner is fixed as `AndreyDurante`.

## Home page order

1. Presentation with factual introduction, photo badge, résumé download, and projects anchor action.
2. Showcase with tabs: Projects initially, Technologies, Competencies/Soft skills.
3. Trajectory with education/work entries and a second résumé action.
4. Footer with LinkedIn, GitHub, and email links only.

Project cards show title and repository description, an optional optimized local image mapped by repository slug, a text-only layout when no image is mapped, a Details action that opens the on-demand detail route, and a View online action only when `homepage` contains a usable URL. Because README availability is discovered on demand, an absent README is explained on the detail page with a return-to-projects action.

## Showcase tabs

- Use one `tablist`, three `tab` buttons, and one stable `tabpanel` associated with the selected tab.
- Exactly one tab has `aria-selected="true"` and `tabIndex=0`; inactive tabs are not in the sequential tab order.
- Left/Right Arrow keys move focus and activate the adjacent tab, wrapping at either end. Home/End may move to first/last tab.
- Only the active tab's panel content is rendered. Preserve the one panel ID referenced by `aria-controls` on each tab.
- All tab names and accessible text are localized.

## Language and theme

- Portuguese is active by default. Switching language updates all interface strings and `<html lang>` (`pt-BR` / `en`) and persists the selected language.
- Dark mode is the first-visit default. Switching theme applies/removes `.dark` on the root element and persists the visitor's choice. Theme color variables remain centralized.
- Apply stored theme before first paint where feasible to avoid flashing the wrong theme.

## Accessibility and responsive behavior

- Use semantic landmarks and visible focus. All controls are keyboard-operable; theme and language toggles have accessible names and state.
- Informative images have text alternatives. Both color themes meet contrast needs. Reduced-motion preference suppresses the Three.js badge and nonessential motion. Load the 3D version only at desktop widths of at least 64rem (1024 CSS px), with WebGL 2 available and reduced motion disabled.
- Test at representative phone and desktop viewport sizes. No horizontal page overflow; sections, cards, tabs, and action links remain usable.
- The static and 3D badges reserve identical layout dimensions. Loading project cards use fixed/minimum space to avoid layout shifts.
