# GitHub Data Contract

## Repository list

- **Request**: `GET https://api.github.com/users/AndreyDurante/repos?per_page=100&sort=pushed`.
- **Authentication**: None; request public resources only.
- **Request count**: At most one list request for a missing or expired cache. A fresh one-hour cache avoids a request. Never fetch topics one repository at a time.
- **Expected response**: Array of repository objects with `id`, `name`, `full_name`, `description`, `homepage`, `topics`, `html_url`, `default_branch`, and update metadata.
- **Selection**: Keep entries whose `topics` array includes exactly `portfolio`; filter in the browser.
- **Order**: Use the API's most-recently-pushed order; do not imply that this is a user-defined featured order.
- **Limit**: `per_page` is capped at 100. No pagination is performed under the one-request constraint.
- **Cache**: Store the successful response in a versioned localStorage envelope for one hour. On expiry, retain stale data unless a new response succeeds. Catch storage errors and still expose network results.
- **Failure**: Non-success status, network exception, malformed JSON, or wrong response shape is a failure. Return stale cached data if available; otherwise use the minimal owner-verified fallback snapshot. If neither is available, expose a localized friendly error. A valid empty response maps to an empty state, not a network error.

## README

- **Request**: On the details page only, `GET https://api.github.com/repos/AndreyDurante/{repo}/readme` with the repository slug safely URL-encoded.
- **Expected response**: README metadata and content (path, encoding/content, and download URL). Decode Base64 UTF-8 when the response uses that encoding. Use the path with the repository's default branch to build raw GitHub image URLs; do not persist the API's expiring `download_url` as a durable asset base.
- **Cache**: Separate versioned one-hour entry per `AndreyDurante/{repo}`. Keep stale content on refresh failure.
- **Absent content**: Treat 404/empty README as missing; show localized text and a return link, without breaking route navigation.
- **Rendering**: Lazy-load `react-markdown` with the route. Ignore raw HTML (`skipHtml`); do not add `rehype-raw`. Keep its safe URL transform. Resolve relative image paths against the README location, treating leading `/` as repository-root-relative, then validate the resulting URL. Build the raw URL from owner, repository, default branch, and README path. Preserve alt text and lazy-load README images.

## External destinations

- A project web destination is taken from `homepage`. Trim whitespace; only allow safe `http:` or `https:` destinations. If missing or invalid, omit the action.
- The GitHub repository action uses `html_url`; no arbitrary external URL is derived from repository text.
- Relative README images use the GitHub raw host and the repository's default branch. Absolute URLs remain subject to the Markdown renderer's safe URL policy.
