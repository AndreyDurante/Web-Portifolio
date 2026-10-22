# Feature Specification: Personal Portfolio

**Feature Branch**: `001-personal-portfolio`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Portfólio pessoal de um estudante de Engenharia de Software em busca do primeiro emprego ou estágio em desenvolvimento, para apresentar seu perfil, formação, competências e projetos a recrutadores e desenvolvedores."

## Clarifications

### Session 2026-10-22

- Q: Which GitHub username should supply the portfolio projects? → A: AndreyDurante.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the candidate and reach projects (Priority: P1)

A recruiter or developer opens the portfolio and quickly understands who the owner is, what role they seek, and how to reach the projects or download a résumé. A prominent photo badge helps identify the owner.

**Why this priority**: The portfolio must communicate the candidate's purpose and make the primary evidence of their work immediately reachable.

**Independent Test**: Open the landing page at desktop and mobile widths; confirm the introduction communicates the candidate's profile and goal, and both primary actions work.

**Acceptance Scenarios**:

1. **Given** a visitor opens the portfolio, **When** the presentation appears, **Then** it includes a brief factual introduction, a prominent photo badge, and actions to download the résumé and view projects.
2. **Given** a visitor selects “Ver projetos” or “View projects”, **When** the action is activated, **Then** the projects section is brought into view.
3. **Given** a résumé file is available, **When** the visitor activates the résumé action, **Then** the file downloads or opens for download in one action.

---

### User Story 2 - Explore projects and technical details (Priority: P1)

A recruiter or developer browses the projects selected for the portfolio, opens the technical documentation for a project, and visits its published site when one is available.

**Why this priority**: Project work is the strongest evidence of the candidate's skills and the main reason visitors use the portfolio.

**Independent Test**: Provide a set of public repositories selected for the portfolio, including projects with and without images, READMEs, and published sites; verify their cards and available actions.

**Acceptance Scenarios**:

1. **Given** project data is available, **When** the visitor opens the showcase, **Then** the “Projetos” / “Projects” tab is selected initially and each selected project has a card with its title and short description.
2. **Given** a project has a README, **When** the visitor selects “Detalhes” / “Details”, **Then** an internal project page presents that project's README content.
3. **Given** a project has a published site, **When** the visitor selects “Ver online” / “View online”, **Then** the published site opens.
4. **Given** a project lacks a README or published site, **When** its card is shown, **Then** the unavailable action is omitted or its absence is clearly explained, and the other available action remains usable.
5. **Given** a project has no image, **When** its card is shown, **Then** it remains understandable as a text-only card.

---

### User Story 3 - Review skills and career path (Priority: P2)

A visitor reviews the candidate's technologies, soft skills, and education and work history, and can download the résumé from the trajectory section as well.

**Why this priority**: These details help visitors assess the candidate's fit after they understand the profile and see project evidence.

**Independent Test**: Open the skills and trajectory sections in both supported languages and confirm every item and résumé action is available.

**Acceptance Scenarios**:

1. **Given** the visitor selects the Technologies tab, **When** its content is displayed, **Then** HTML, CSS, JavaScript, React, Node.js, Python, Tailwind CSS, and UX/UI appear as one ungrouped list.
2. **Given** the visitor selects the Competencies / Soft skills tab, **When** its content is displayed, **Then** teamwork, clear communication, adaptability, and commitment to deadlines are listed.
3. **Given** the visitor reaches the trajectory section, **When** its content is displayed, **Then** it presents Software Engineering at FIAP, Technical Education in IT, and the Operational Assistant role at Adalta Engenharia, with a résumé download action.

---

### User Story 4 - Use the portfolio in preferred language, theme, and device (Priority: P2)

A visitor switches the portfolio between Portuguese and English and between light and dark themes, then uses it comfortably on a phone or computer.

**Why this priority**: Language, theme, and responsive layout make the same portfolio usable by a wider range of visitors and viewing preferences.

**Independent Test**: Switch language and theme, reload the page, and navigate the primary sections at narrow and wide viewport sizes.

**Acceptance Scenarios**:

1. **Given** a first-time visitor opens the portfolio, **When** the page is displayed, **Then** Portuguese is active by default.
2. **Given** a visitor selects English or changes the theme, **When** the preference is applied, **Then** the interface updates consistently and retains that preference on a later visit.
3. **Given** the portfolio is viewed on a phone or computer, **When** the visitor navigates sections, tabs, project actions, and footer links, **Then** content remains readable and controls usable without horizontal overflow.

### Edge Cases

- While project data is loading, the page shows a loading indication in reserved space so surrounding content does not shift.
- If the project source is unavailable, the portfolio displays the last known project data when available; otherwise, it shows a friendly unavailable message and keeps the rest of the page usable.
- If project data is empty or contains no portfolio-selected projects, the visitor receives a clear empty-state message.
- If the résumé file or the owner's photo has not been supplied, the related presentation must not fabricate an asset or identity detail; the unavailable action or image is omitted gracefully.
- A README may contain content in a language different from the selected interface language; project-authored README content is presented as supplied.
- Long project titles, descriptions, and README content remain readable and do not make primary controls inaccessible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST present a brief, factual introduction identifying the owner as a Software Engineering student seeking a first development job or internship in Front-End, Back-End, or Full Stack work.
- **FR-002**: The presentation MUST provide a prominent owner photo badge and actions to download the résumé and reach the projects section.
- **FR-003**: The project showcase MUST contain Projects, Technologies, and Competencies / Soft skills tabs, with Projects selected initially.
- **FR-004**: The portfolio MUST display only public repositories from the `AndreyDurante` GitHub account marked with the `portfolio` topic, showing each project's title and short description.
- **FR-005**: Each project with available documentation MUST provide a Details action that opens an internal page presenting its README content.
- **FR-006**: Each project with an available published site MUST provide an action that opens that site. Unavailable project actions MUST be omitted or clearly identified as unavailable.
- **FR-007**: A project without an image MUST remain represented by a readable text-only card.
- **FR-008**: The Technologies tab MUST present HTML, CSS, JavaScript, React, Node.js, Python, Tailwind CSS, and UX/UI as one ungrouped list.
- **FR-009**: The Competencies / Soft skills tab MUST present teamwork, clear communication, adaptability, and commitment to deadlines.
- **FR-010**: The trajectory section MUST present Software Engineering at FIAP, Technical Education in IT, and the Operational Assistant role at Adalta Engenharia, and MUST provide a résumé download action.
- **FR-011**: The portfolio MUST provide Portuguese and English interface languages, use Portuguese by default, and retain the visitor's language selection on subsequent visits.
- **FR-012**: The portfolio MUST provide light and dark themes and retain the visitor's theme selection on subsequent visits.
- **FR-013**: The portfolio MUST adapt its content and controls for comfortable use on mobile phones and computers.
- **FR-014**: The portfolio MUST show a loading indication while projects load without causing surrounding content to shift.
- **FR-015**: If project data cannot be retrieved, the portfolio MUST use the latest available data or show a friendly message while keeping other sections usable.
- **FR-016**: The footer MUST provide LinkedIn, GitHub, and email contact links, and MUST NOT include a contact form.
- **FR-017**: The portfolio MUST NOT include comments, login, an administrative panel, or database-backed functionality.
- **FR-018**: The interface MUST NOT fabricate the owner's identity, photo, résumé, credentials, project content, or contact details when those materials have not been supplied.
- **FR-019**: The portfolio MUST use semantic structure, provide text alternatives for informative images, support keyboard navigation with visible focus, maintain adequate contrast in both themes, and respect reduced-motion preferences.

### Key Entities *(include if feature involves data)*

- **Portfolio project**: A public repository selected for display, with a title, short description, optional image, optional README, and optional published-site link.
- **Owner profile**: The factual introduction, photo, résumé, education, work experience, skills, and contact links supplied for the portfolio.
- **Visitor preferences**: The selected interface language and visual theme.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a first-impression review, at least 4 out of 5 representative visitors can identify the owner's study area and job-seeking goal within 5 seconds of opening the portfolio.
- **SC-002**: At common mobile and desktop viewport sizes, the projects action is visible in the initial presentation without requiring a page scroll.
- **SC-003**: A visitor can open the available project details or published site from its card in one action, with unavailable actions absent or clearly explained for every project.
- **SC-004**: A visitor can download the supplied résumé from either the presentation or trajectory section in one action.
- **SC-005**: All named technology, soft-skill, education, work, and contact entries are present in both supported interface languages.
- **SC-006**: At phone and desktop viewport sizes, the primary navigation, tabs, project actions, and contact links remain readable and usable without horizontal scrolling.
- **SC-007**: An accessibility review confirms that every primary action is keyboard-operable with visible focus, informative images have text alternatives, both themes have adequate contrast, and reduced-motion preferences are respected.

## Assumptions

- The owner will supply or confirm their name, photo, résumé file, contact URLs, and any other personal details before publication. Missing personal assets are omitted gracefully rather than invented.
- Public repositories from the `AndreyDurante` GitHub account are considered selected for the portfolio when they carry the `portfolio` topic, as defined by the existing project constitution.
- Project README content is displayed in its authored language and is not automatically translated when the interface language changes.
- A published-site action is available only when a valid project destination has been supplied or can be established from the project's public repository data.
- The visual experience follows the project's existing constitution, including its monochrome palette, restrained dark-red accent, light and dark themes, and minimal presentation.
