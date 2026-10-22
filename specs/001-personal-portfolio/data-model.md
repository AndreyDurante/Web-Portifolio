# Data Model: Personal Portfolio

## PortfolioRepository

Projection of one public GitHub repository, selected for the portfolio when its returned `topics` contains the exact lowercase value `portfolio`.

| Field | Source/type | Rules and use |
|---|---|---|
| `id` | GitHub numeric identifier | Stable identity for React list rendering. |
| `name` | GitHub string | Repository slug; route parameter in `/projetos/:repo`. |
| `full_name` | GitHub string | Owner/repository key for cache and API requests. |
| `description` | GitHub string or null | Short card description; use localized fallback when absent. |
| `topics` | GitHub string array | Filter locally; include only repositories with `portfolio`. |
| `homepage` | GitHub string or null | Online action destination; action is omitted if blank or invalid. |
| `imageSrc` | Optional local asset mapping | Supplied by `projectImages.js` using repository slug; omit for a text-only card. It is not inferred from API text. |
| `html_url` | GitHub URL | Link back to the public repository when shown in details. |
| `default_branch` | GitHub string | Default reference for README-relative assets. |
| `updated_at` | GitHub timestamp | Optional display/sort metadata; not used to invent project activity. |

The service requests `per_page=100` and uses one page only. The repository collection can therefore contain at most 100 items before local filtering.

## ReadmeDocument

On-demand content for a single repository. A missing document is a valid unavailable state, not a fatal page error.

| Field | Type | Rules and use |
|---|---|---|
| `repositoryKey` | `owner/name` string | Identifies which repository owns this document. |
| `markdown` | UTF-8 string | Decoded from GitHub's README response; rendered with raw HTML skipped. |
| `path` | string | Repository path of the selected README; cached and used with owner, repository, and default branch to resolve directory-relative and root-relative image paths into stable raw GitHub URLs. |
| `defaultBranch` | string | Used to construct repository-root-relative image URLs. |
| `fetchedAt` | timestamp | Cache freshness metadata. |
| `expiresAt` | timestamp | One hour after fetch. |

## RepositoryListCache

Versioned localStorage envelope separate from README entries.

| Field | Type | Rules and use |
|---|---|---|
| `version` | integer/string | Allows invalidating incompatible cached shapes. |
| `fetchedAt` | timestamp | Time the list was retrieved successfully. |
| `expiresAt` | timestamp | Fresh for one hour. |
| `repositories` | `PortfolioRepository[]` | The raw public repository page (maximum 100) needed for filtering and display. |

State flow: **fresh** → return immediately without a network request; **missing/expired** → request the list; **request success** → replace cache and expose filtered results; **request failure with stale cache** → expose stale filtered results; **request failure without cache** → expose the verified static fallback list; **no cache and no fallback** → localized error state; **empty successful result** → localized empty state. Storage failure must not prevent showing fetched data.

## VerifiedFallbackProject

A small release-managed snapshot of public portfolio projects copied from verified GitHub metadata. Every entry must have been public and marked with `portfolio` when verified; the owner must review names, descriptions, repository URLs, and homepage URLs before publication. Do not invent projects or contact/credential claims. Keep the fallback small and refresh it when project metadata materially changes.

## ReadmeCache

Each repository has its own versioned cache entry keyed by `owner/name`, with the same one-hour expiry. State flow is **fresh** → show cached document; **missing/expired** → request README; **success** → update entry and show rendered markdown; **404/failure with stale entry** → show stale markdown with a non-blocking stale indication where practical; **404/failure without entry** → show a friendly missing/unavailable message and a return-to-projects action.

## Static PortfolioContent

One localized object per supported language (`pt` and `en`) contains:

- Presentation text and localized action labels.
- Technologies, soft skills, and trajectory entries.
- LinkedIn, GitHub, and email destinations.
- Local résumé file path (`/cv-pt.pdf` or `/cv-en.pdf`).
- Accessible names for controls and localized loading, error, empty, missing README, and not-found messages.

The owner must supply factual identity details and the two résumé PDFs. Missing content is not fabricated. The README stays in the author's language.

## VisitorPreferences

| Field | Allowed values | Default/persistence |
|---|---|---|
| `language` | `pt`, `en` | `pt`; persist in localStorage and mirror to `<html lang>`. |
| `theme` | `light`, `dark` | Default to `dark`, matching the project constitution; persist selection and apply/remove `.dark` on `<html>`. |

## UI State

- `projectList`: `loading`, `fresh`, `stale`, `fallback`, `empty`, `error`.
- `readme`: `loading`, `fresh`, `stale`, `missing`, `error`.
- `showcaseTab`: `projects` initially, `technologies`, or `competencies`; only one panel is mounted at a time.
- `badgeMode`: static by default; 3D only when desktop, WebGL 2-capable, and reduced motion is not requested. Any failed capability/import/context falls back to the static badge without changing reserved dimensions.
