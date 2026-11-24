# Adam, Compiled: Project Scope & Build Instructions

*A museum-themed portfolio for Adam Khalloufi. Version 1.0 of the scope, written by the design lead.*

## 1. Mission statement

Build a personal portfolio website that is a **museum of Adam's work**: dark, warm, Renaissance in spirit, digital in execution. It must do two jobs at once:

- **Recruiter test (20 seconds):** a visitor learns who Adam is, what he builds, and how to contact him, without being blocked by any effect.
- **Showcase test (5 minutes):** a curious visitor is rewarded for exploring with craft, surprises, and depth.

**Governing rule:** creativity is the packaging, never the obstacle. Every effect either carries meaning or can be skipped.

## 2. Concept

**"The Creation of Adam, compiled."** The first Adam, the forbidden fruit, and the spark of creation, rebuilt as software. The painting's famous gap between two fingers is where code becomes a working thing. The red apple is the fruit of knowledge and the site's only saturated color.

Brand line candidates (pick one at the visual-spec stage): *"I build things from first principles."* or *"Knowledge, compiled."*

## 3. Goals and non-goals

### Goals

1. Present 6 to 9 projects as "paintings" in a consistent, curated format.
2. Deliver a memorable, skippable intro: the Creation of Adam in ASCII with the apple appearing in the gap.
3. Make the red apple an interactive element: a radial menu and a bite-as-you-scroll progress indicator.
4. Reach professional-grade performance, accessibility, and mobile behavior.
5. Make adding a new project a 10-minute job (one content file, no code changes).

### Non-goals for v1 (explicitly parked)

- Live in-browser ML demo of the C neural-network framework (v2; v1 ships a static case study).
- ASCII apple as a full-page cursor.
- Easter eggs (Newton fall, hidden terminal, theme switch).
- Blog, CMS, user accounts, analytics dashboards, comments.
- Any language other than English.

## 4. Audience

| Audience | Needs | Design consequence |
| --- | --- | --- |
| Recruiters and engineers (primary) | Fast scan, proof of skill, contact path | Clear hierarchy, plain-link fallbacks, short project cards |
| Founders and hackathon judges | Evidence of shipping and ambition | Hackathons exhibition, outcomes stated plainly |
| Curious visitors | Delight and discovery | Intro, apple interactions, random painting |

## 5. Information architecture: the museum

| Museum element | Site element | Route / anchor |
| --- | --- | --- |
| Entrance hall | Genesis intro, then hero with name and one-line pitch | `/` |
| Wing: Systems & Networks | Gallery of paintings | `/works/systems` |
| Wing: ML | Gallery of paintings (flagship: C neural-network framework) | `/works/ml` |
| Wing: Web apps | Gallery of paintings | `/works/web` |
| Wing: Aerospace | Gallery of paintings (Astre Club flight software) | `/works/aerospace` |
| Special exhibition | Hackathons strip (two so far; grows into a wing if needed) | `/hackathons` |
| The Workshop | Skills and tools drawn as anatomical-style diagrams | `/workshop` |
| The Journey | Timeline: INSA, Pole Star, 24H de Toulouse, Astre Club, HKU exchange | `/journey` |
| Guestbook / contact | Email, GitHub, LinkedIn, résumé PDF | `/contact` |
| Painting (a project) | Detail page with plaque, diagram, case study | `/works/<wing>/<slug>` |

**Requirement:** every page is reachable by plain links in a visible nav fallback, independent of the apple menu.

## 6. Functional requirements

Each requirement has an ID so we can track it.

### 6.1 Genesis intro

- **F-1.** On first visit, the intro plays: terminal cursor blink, then ASCII hands assemble, fingers stop short, a red apple appears in the gap, then transition to the hero.
- **F-2.** Total duration is 6 seconds or less.
- **F-3.** A visible "Skip" control and the Escape key end the intro immediately at any moment.
- **F-4.** The intro plays once per browser session; return visits within the session go straight to the hero. A "Replay intro" action exists in the apple menu.
- **F-5.** With `prefers-reduced-motion`, the intro is replaced by a static final frame (hands plus apple) with no animation.
- **F-6.** Site content loads in the background during the intro; skipping never shows an empty page.

### 6.2 The apple

- **F-7.** The apple is persistent (fixed position, small) on every page after the intro.
- **F-8.** **Click opens a radial menu** with these actions: Tour the museum, Résumé, GitHub, Contact, Random painting.
- **F-9.** **Random painting** navigates to a randomly chosen project page, never the current one.
- **F-10.** **Bite-as-you-scroll:** the apple shows progressive bites as the visitor scrolls through the museum; at the end it is a core, and clicking the seed scrolls to top.
- **F-11.** The menu is fully keyboard operable (Tab, arrow keys, Enter, Escape) and every action also exists as a normal link elsewhere on the page.
- **F-12.** The apple never covers essential content; on small screens it docks to a corner and the menu opens as a bottom sheet.

### 6.3 Paintings (projects)

- **F-13.** Each project is one content file with a fixed schema (see section 9) and appears as a framed card in its wing and as a detail page.
- **F-14.** The card shows title, year, one-line problem, stack tags, and a plaque caption (for example: *"CloudBox, 2026. FastAPI, PostgreSQL, Docker. Resumable uploads."*).
- **F-15.** The detail page shows: problem, one hard decision, result with a concrete metric when one exists, an inside-view diagram, links (repo, demo), and previous/next painting navigation.
- **F-16.** Adding a project requires only adding one content file and, optionally, one diagram asset.

### 6.4 Hackathons exhibition

- **F-17.** Each hackathon is a "limited run" entry: name, date, team size, challenge, what was built, outcome (placement or lesson).
- **F-18.** Hackathon entries can link to a full painting page when a project deserves one.

### 6.5 Workshop, Journey, Contact

- **F-19.** Workshop: skills grouped by wing, each drawn as a diagram, never as a plain bullet wall.
- **F-20.** Journey: a vertical timeline with the five experiences above, each a short plaque.
- **F-21.** Contact: email link, GitHub, LinkedIn, résumé PDF download. No contact form in v1 (no backend needed).

## 7. Design requirements

### 7.1 Palette (starting values; finalized in the visual spec)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0b0908` | Page background (warm near-black) |
| `--surface` | `#15110f` | Cards and frames |
| `--text` | `#e8dcc0` | Body text (parchment) |
| `--gold` | `#d9c9a3` | Fine lines, plaques, diagrams |
| `--apple` | `#c8102e` | The single saturated accent |

**Rule:** red appears only where something matters (the apple, the active item, the primary call to action). If red is everywhere, it means nothing.

### 7.2 Typography

- Headings and plaques: a Renaissance serif (Cormorant Garamond or EB Garamond).
- Code, ASCII, tags: JetBrains Mono.
- Body text: the serif at comfortable size, or a clean sans if readability testing demands it.
- Self-host fonts (no third-party font requests) with a real fallback stack.

### 7.3 ASCII usage policy

- Allowed: intro, section dividers, corner ornaments, optional per-project ASCII thumbnails.
- Not allowed: body text, navigation labels, anything a screen reader must read.
- Maximum one large ASCII moment per screen.

### 7.4 Motion policy

- Every animation respects `prefers-reduced-motion`.
- No animation blocks reading or interaction.
- Easing is slow and weighty (Renaissance calm), not bouncy.

## 8. Non-functional requirements

| ID | Requirement | Target |
| --- | --- | --- |
| N-1 | Performance | Lighthouse Performance 95 or higher on mobile; Largest Contentful Paint under 2.0 s on a mid-range phone |
| N-2 | Weight | Initial JavaScript under 100 KB gzipped (intro assets loaded separately and lazily) |
| N-3 | Accessibility | Lighthouse Accessibility 100; WCAG AA contrast; full keyboard navigation; ASCII art marked `aria-hidden` with a text alternative |
| N-4 | Responsiveness | Works from 360 px phones to 4K desktop; no horizontal scroll |
| N-5 | Browsers | Current Chrome, Safari, Firefox, Edge; graceful behavior on iOS Safari |
| N-6 | SEO and sharing | Titles, meta descriptions, Open Graph image (the apple), sitemap, `robots.txt` |
| N-7 | Resilience | Site is fully usable with JavaScript disabled (content and nav), only effects degrade |
| N-8 | Privacy | No cookies, no third-party trackers; optional privacy-friendly analytics only |

## 9. Content model

Every painting is one Markdown/MDX file with this front matter:

```yaml
title: "CloudBox"
slug: "cloudbox"
wing: "systems"        # systems | ml | web | aerospace
year: 2026
status: "shipped"      # shipped | in-progress | prototype
plaque: "FastAPI, PostgreSQL, Docker. Resumable uploads."
problem: "One sentence: what hurt."
decision: "One hard design decision and why."
result: "Concrete outcome or metric."
stack: ["FastAPI", "PostgreSQL", "Docker", "pytest"]
links: { repo: "...", demo: "" }
diagram: "/diagrams/cloudbox.svg"
featured: true
```

The body of the file is the optional long-form case study.

## 10. Content inventory (what we need from Adam)

| Painting | Wing | Status | Needed from Adam |
| --- | --- | --- | --- |
| C neural-network framework | ML | In progress (flagship) | Name, scope so far (layers, autodiff, optimizers), one benchmark or accuracy result, repo link |
| CloudBox | Systems | Shipped | Hard decision (resumable uploads design), one metric, repo link |
| NetSentinel | Systems | Shipped | What it detects, one hard decision, repo link |
| Raspberry Cloud | Systems | Shipped | Hardware setup, what it hosts, one lesson |
| 24H de Toulouse platform | Web | Shipped | Scale (users or tickets handled), your role, one hard decision |
| Astre Club flight software | Aerospace | In progress | Subsystem scope, launch plan, what you can say publicly |
| Hackathon 1 | Hackathons | Done | Name, date, challenge, what was built, outcome |
| Hackathon 2 | Hackathons | Done | Same as above |
| Other GitHub projects | TBD | TBD | The repo list (GitHub could not be fetched during planning); we decide which earn a painting |

**Rule:** 6 to 9 paintings maximum at launch. Fewer, deeper entries beat a long grid. Each painting must have a problem, a decision, and a result, or it stays off the site.

## 11. Technical approach

### 11.1 Recommended stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | **Astro** (static output) | Ships almost no JS by default, content collections fit the painting schema, great performance |
| Language | TypeScript for interactive parts | Safety for the apple menu and intro logic |
| Styling | Plain CSS with custom properties (design tokens) | Full control, tiny footprint, easy theming |
| Animation | CSS plus small vanilla JS; GSAP only if a sequence truly needs it | Keeps the JS budget |
| Diagrams | Hand-authored SVG | Crisp, themeable, tiny |
| Hosting | Cloudflare Pages, Vercel, or GitHub Pages | Free, fast, simple CI |
| Domain | Custom domain (for example `adamkhalloufi.dev`) | Credibility; optional for v1 |

*Alternative:* plain HTML/CSS/JS with Vite if you prefer zero framework. The content schema and requirements stay identical.

### 11.2 ASCII hands pipeline

The hands are the riskiest asset, so they are built offline, not at runtime.

1. Start from a high-contrast silhouette of the two hands (a redrawn or heavily simplified version of the fresco, not a photo of the original, to get clean edges).
2. Convert to characters with a script (Python or C, your choice) using a small density ramp and a fixed grid (for example 120 columns by 40 rows).
3. Export the result as one text asset plus a reveal order (for example, characters appear sorted by distance from the center of each hand).
4. At runtime, a tiny JS routine reveals characters in that order inside a `<pre>`, then runs a slow shimmer on a subset of characters.
5. The apple is a separate SVG element placed in the gap, so it stays crisp and is the only red thing on screen.

**Fallback:** if the animated version is not convincing by the end of milestone M2, ship the static ASCII frame with a simple fade-in. The concept survives either way.

### 11.3 Apple interactions

- Apple is an inline SVG with bite masks (about 6 stages) toggled by scroll progress (`IntersectionObserver` or a scroll listener throttled with `requestAnimationFrame`).
- Radial menu is a positioned list of buttons (real `<button>` and `<a>` elements) arranged with CSS transforms, so it is accessible by default.
- Random painting picks from a build-time generated list of paintings.

### 11.4 Repository and workflow

- One GitHub repository, `main` branch protected by CI.
- CI runs build, link check, and Lighthouse CI against the budgets in section 8.
- Every milestone ends with a tagged release and a deployed preview URL.

## 12. Milestones

Timings assume part-time work alongside studies; adjust freely, but keep the order.

| Milestone | Deliverable | Acceptance criteria |
| --- | --- | --- |
| **M0: Foundations** (about 2 days) | Repo, Astro skeleton, design tokens, fonts, deploy pipeline, empty pages for every route | Site builds, deploys, and shows the palette and type on a placeholder page |
| **M1: Museum shell** (about 1 week) | Nav, wing pages, painting card component, painting detail template, plaque styling | Two real paintings render end to end from content files (F-13 to F-16) |
| **M2: Genesis intro** (about 1 week) | ASCII hands asset, reveal animation, apple appears, skip, reduced-motion path | F-1 to F-6 pass on desktop and phone; fallback decision made |
| **M3: The apple** (about 1 week) | Persistent apple, radial menu, random painting, bite-on-scroll | F-7 to F-12 pass; full keyboard test passes |
| **M4: Content** (about 1 to 2 weeks, in parallel from M1) | All 6 to 9 paintings, hackathons strip, Workshop, Journey, Contact, résumé PDF | Content inventory (section 10) fully filled; no placeholder text anywhere |
| **M5: Polish and launch** (about 1 week) | Performance, accessibility, SEO, Open Graph image, cross-browser pass, custom domain | All non-functional targets in section 8 met; launch checklist (section 14) complete |
| **M6 (post-launch)** | Backlog items: easter eggs, ASCII cursor, live ML demo via WebAssembly | Each added as its own mini-project |

## 13. Roles and working agreement

- **Adam (owner):** supplies content and decisions, reviews each milestone, makes final calls on taste.
- **Claude (design lead and collaborator):** writes the specs, produces designs and code for each milestone, flags risks early, and keeps this scope current.

**Working rules:**

1. One milestone at a time; no starting M(n+1) before M(n) acceptance criteria pass.
2. Every change request is checked against the non-goals list; anything outside it goes to the backlog, not into the current milestone.
3. Decisions are written down in this document's decision log (section 16) so they are never relitigated.
4. For any piece Adam wants to genuinely learn (for example the ASCII conversion script in C, or the scroll logic), he says so and the work switches to step-by-step teaching mode with small tasks to code himself; everything else is delivered ready to review.
5. Claude pushes back honestly when a request threatens the recruiter test, the performance budget, or accessibility.

## 14. Launch checklist (definition of done for v1)

- [ ] All functional requirements F-1 to F-21 verified
- [ ] Lighthouse mobile: Performance 95+, Accessibility 100, Best Practices 95+, SEO 100
- [ ] Tested on real iPhone Safari, Android Chrome, desktop Chrome, Firefox, Safari
- [ ] Intro skippable, reduced-motion path verified
- [ ] Every page reachable without the apple and without JavaScript
- [ ] No broken links, no placeholder text, no lorem ipsum
- [ ] Each painting has problem, decision, result, and a diagram or visual
- [ ] Open Graph image and favicon (the apple) in place
- [ ] Résumé PDF current
- [ ] Custom domain and HTTPS live
- [ ] Repository README explains the project and how to add a painting

## 15. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| ASCII hands look muddy or amateur | Medium | High | Prototype in M2 first; silhouette-based approach; static fallback frame |
| Intro annoys recruiters | Medium | High | Skippable, 6 s cap, once per session, replay on demand |
| Effects hurt performance, especially on mobile | Medium | Medium | Budgets enforced in CI; offline-generated assets; vanilla JS |
| Scope creep (cursor, easter eggs, live demo) | High | Medium | Non-goals list; backlog; milestone discipline |
| Content is thin or late | High | High | Content work starts at M1 in parallel; the content inventory is the real critical path |
| Too many weak projects dilute the strong ones | Medium | Medium | 6 to 9 paintings maximum; the problem/decision/result rule |
| Accessibility is neglected because of the aesthetic | Medium | Medium | `aria-hidden` ASCII with text alternatives; keyboard-first apple menu; automated checks |

## 16. Decision log

| Decision | Status |
| --- | --- |
| Concept: Creation of Adam, compiled; museum structure; projects as paintings | Decided |
| Dark warm background, single red accent, serif plus monospace | Decided |
| English only | Decided |
| Apple: radial menu with Random painting, plus bite-as-you-scroll | Decided |
| ML flagship is a static case study at launch; live demo is v2 | Decided |
| ASCII cursor and easter eggs | Parked for after v1 |
| Hackathons: strip vs full wing | Open (default: strip) |
| Tone of voice: serious-elegant vs with dry wit | Open |
| Brand line | Open |
| Stack: Astro (recommended) vs plain Vite | Open |
| Domain name | Open |

## 17. Immediate next steps

1. Adam confirms the open decisions above (or accepts the defaults).
2. Adam shares the list of GitHub repositories worth considering, plus the two hackathon names and outcomes.
3. Design lead delivers the **intro storyboard** (frame by frame, with timings and the skip behavior) and the **visual spec** (final palette, type scale, painting card layout, plaque style).
4. Start M0 once both are approved.
