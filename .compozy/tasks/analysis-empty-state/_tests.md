# Test Specification: Pre-Analysis Empty State

Canonical test contract for the pre-analysis empty state feature. Companion to `_techspec.md`.
Derived from `_user_stories.md` (behavior) and `_techspec.md` (components).

## Strategy

- **No automated test framework.** The project has zero automated tests today (`docs/TESTING.md`); this feature does not introduce Vitest or any runner, per explicit user decision. Every case below is a **manual verification checklist item** with a stable ID for traceability — "executing" a case means exercising the running dev server (`npm run dev`) in a browser and confirming the described observable behavior.
- **Static checks**: `npm run type-check` and `npm run lint` must both pass with zero errors/warnings after all changes, and are required prerequisites before any manual case is considered checked.
- **Conventions**: Unit-style cases (`UT-`) verify a single component/file's contract in isolation by code inspection plus rendering it on its page (no test harness exists to mount it standalone). Integration-style cases (`IT-`) verify a view's wiring between its state and the empty state's visibility. End-to-end cases (`E2E-`) walk a full user journey in the browser exactly as a user would.

## Coverage Matrix

| Source | Behavior | Unit | Integration | E2E |
|--------|----------|------|--------------|-----|
| US-001 | Empty state shown on photo page before submission | UT-001, UT-002 | IT-001 | E2E-001 |
| US-001.EC-1 | Narrow mobile viewport reflow | UT-003 | — | — |
| US-001.EC-2 | Reduced-motion still fully visible | UT-004 | — | — |
| US-002 | Empty state shown on ad page before submission | UT-005, UT-006 | IT-002 | E2E-002 |
| US-002.EC-1 | Invalid URL keeps empty state visible | — | IT-003 | E2E-002 |
| US-002.EC-2 | Clearing valid URL brings empty state back | — | IT-004 | E2E-002 |
| US-003 | Empty state shown on video page before submission | UT-007, UT-008 | IT-005 | E2E-003 |
| US-003.EC-1 | Invalid YouTube URL keeps empty state visible | — | IT-006 | E2E-003 |
| US-003.EC-2 | Analysis error keeps empty state visible | — | IT-007 | E2E-003 |
| US-004 | Photo preview appears only with the result | UT-009 | IT-008 | E2E-001 |
| US-004.EC-1 | New file selection after a result resets to empty state | — | IT-009 | E2E-001 |
| US-004.EC-2 | Failed upload keeps empty state visible, no preview | — | IT-010 | E2E-001 |
| US-005 | Empty state hides when ad URL preview appears | — | IT-002 | E2E-002 |
| US-005.EC-1 | Broken image URL still hides empty state (preview shows error) | — | IT-011 | — |
| US-006 | Empty state stays visible during loading on all pages | UT-010 | IT-012 | E2E-002, E2E-003 |
| US-006.EC-1 | Empty state does not flicker during long-running loading | — | IT-012 | — |
| US-007 | Visual/structural consistency across all three pages | UT-011 | — | — |
| US-007.EC-1 | Out-of-scope page-load error states | — | — | (not applicable, documented) |
| `AnalysisEmptyState.vue` component contract | Props render steps/benefits/accent correctly | UT-001, UT-005, UT-007, UT-012 | — | — |
| Content files (`photoEmptyState.ts`, `adEmptyState.ts`, `youtubeEmptyState.ts`) | Exported constants match shape and 3/4 counts | UT-013 | — | — |
| `PhotoAnalysisView` visibility computed | `showEmptyState` derives correctly from `analysisResult` | UT-009 | IT-008 | — |
| `AdAnalysisView` visibility computed | `showEmptyState` derives correctly from URL validity + result | UT-006 | IT-002, IT-003, IT-004 | — |
| `YouTubeAnalysisView` visibility computed | `showEmptyState` derives correctly from result | UT-008 | IT-005, IT-006, IT-007 | — |
| Static checks | Type-check and lint pass | UT-014 | — | — |

## Unit Tests

### `AnalysisEmptyState.vue` (TechSpec: Core Interfaces, Component Overview)

- **UT-001** (happy): Render `AnalysisEmptyState` with 3 `steps` and 4 `benefits` props on the photo page — the component renders a step timeline (`StepsSection`/`StepCard`) with exactly 3 entries, each showing its `number`, `title`, and `description`, and a grid with exactly 4 `Card`s, each showing its `icon`, `title`, and `description`.
- **UT-002** (happy): Inspect the rendered root element of `AnalysisEmptyState` — it carries `v-animateonscroll` with `enterClass: 'animate-slide-bottom'`, matching the convention used by the dashboards on the same pages.
- **UT-003** (boundary): Resize the browser viewport to ~375px width with the empty state visible — the step timeline and benefit-card grid reflow into a single column with no horizontal scrollbar or overflow.
- **UT-004** (boundary): Enable OS-level "reduce motion" (or equivalent browser emulation) with the empty state visible — the steps and cards render fully visible and legible without relying on the entrance animation completing.
- **UT-012** (boundary): Render `AnalysisEmptyState` without passing `accentColor` — the component falls back to the default `#357ae8` accent, matching `PageHero`'s own default.

### Content files (TechSpec: Data Models)

- **UT-013** (happy): Import `photoEmptyStateSteps`/`photoEmptyStateBenefits`, `adEmptyStateSteps`/`adEmptyStateBenefits`, and `youtubeEmptyStateSteps`/`youtubeEmptyStateBenefits` — each `*Steps` array has exactly 3 entries and each `*Benefits` array has exactly 4 entries, each entry's fields are non-empty strings (or a valid `number` for `step.number`), and each benefit's title/description plausibly names and explains a real field of the corresponding result type (`PhotoAnalysisResult`, `AdAnalysisResult`, `YouTubeAnalysisResult`) by manual content review.

### `PhotoAnalysisView` visibility (TechSpec: Development Sequencing step 3)

- **UT-009** (happy): With `analysisResult` unset (`null`) and any `imageFile` state, `showEmptyState` evaluates to `true`; with `analysisResult` set, `showEmptyState` evaluates to `false`.

### `AdAnalysisView` visibility (TechSpec: Development Sequencing step 4)

- **UT-005** (happy): With `imageUrl` empty, `showEmptyState` evaluates to `true`.
- **UT-006** (happy): With `imageUrl` set to a valid `http(s)` URL (`isImageUrlValid` true) and no `analysisResult`, `showEmptyState` evaluates to `false`; with `analysisResult` set, `showEmptyState` evaluates to `false` regardless of URL validity.

### `YouTubeAnalysisView` visibility (TechSpec: Development Sequencing step 5)

- **UT-007** (happy): With `youtubeUrl` empty or invalid and no `analysisResult`, `showEmptyState` evaluates to `true`.
- **UT-008** (happy): With `analysisResult` set, `showEmptyState` evaluates to `false` regardless of `youtubeUrl` state.

### Cross-page consistency (TechSpec: Component Overview)

- **UT-011** (happy): Compare the rendered structure of the empty state across `PhotoAnalysisView`, `AdAnalysisView`, `YouTubeAnalysisView` — all three show exactly 3 timeline steps and exactly 4 benefit cards, using the same `AnalysisEmptyState` component and the same default accent color, differing only in step/benefit text content.

### Loading behavior (TechSpec: Impact Analysis — `AdAnalysisView`, `YouTubeAnalysisView`)

- **UT-010** (state): With `isLoading` set to `true` on the ad or video page and no `analysisResult`, the empty state (`showEmptyState`) remains `true` — loading state alone never hides it.

### Static checks (TechSpec: Testing Approach)

- **UT-014** (error): Run `npm run type-check` and `npm run lint` after implementing all new/modified files — both commands exit with code 0 and report zero errors.

## Integration Tests

### Photo page empty-state and preview wiring (US-001, US-004)

- **IT-001**: Load `PhotoAnalysisView` fresh (no file selected, no result) — the empty state renders inside `<main class="upload-main">`, above where `PhotoDisplay`/`PhotoAnalysisDashboard` would render; neither `PhotoDisplay` nor `PhotoAnalysisDashboard` is present in the DOM.
- **IT-008**: Select a valid image file on the photo page (before submitting) — `PhotoDisplay` does NOT render (no preview yet) and the empty state remains visible.
- **IT-009**: Complete one successful analysis (preview + dashboard shown, empty state hidden), then select a new file before submitting again — the previous result/preview are cleared from view per existing `handleAnalysis`/`handleFile` wiring, and the empty state becomes visible again until the next result arrives.
- **IT-010**: Trigger a failed photo upload (e.g., oversized file or simulated network error) — `errorMessage` renders via the existing `PhotoUploadForm` error `Message`, neither `PhotoDisplay` nor `PhotoAnalysisDashboard` renders, and the empty state remains visible alongside the error message.

### Ad page empty-state and preview wiring (US-002, US-005)

- **IT-002**: Load `AdAnalysisView` fresh (empty URL field) — the empty state renders; typing a valid `https://` image URL causes the image preview section to appear and the empty state to disappear in the same render cycle (no moment where both are visible).
- **IT-003**: Type a URL missing the `http(s)` protocol (fails `isImageUrlValid`) — the "URL inválida" warning `Message` renders in place of the image preview, and the empty state remains visible (not hidden by an invalid preview attempt).
- **IT-004**: With a valid URL entered and the preview visible (empty state hidden), clear the URL field entirely — the preview section disappears and the empty state reappears.
- **IT-011**: Enter a syntactically valid URL that fails to load as an image (404/CORS) — the existing "não foi possível carregar" warning renders inside the preview section, and the empty state remains hidden throughout (a syntactically valid URL already satisfied the hide condition).

### Video page empty-state wiring (US-003, US-006)

- **IT-005**: Load `YouTubeAnalysisView` fresh (empty URL field) — the empty state renders inside `<main class="upload-main">`; no video preview or dashboard is present.
- **IT-006**: Type a URL that is not a recognizable YouTube URL (fails `isYoutubeUrlValid`) — the existing validation prevents analysis, and the empty state remains visible.
- **IT-007**: Trigger an analysis that fails (e.g., simulated timeout) — the existing error `Message` renders, no video preview/dashboard renders, and the empty state remains visible alongside the error message.

### Loading visibility across ad and video pages (US-006)

- **IT-012**: Start an analysis on the ad page (or video page) and observe the UI while `isLoading` is `true` — the empty state and the `ProgressSpinner`/loading message are simultaneously visible (empty state is never removed merely because a request is in flight); once the result arrives, the empty state disappears and the dashboard appears.

## End-to-End Tests

### Photo analysis journey (US-001, US-004)

- **E2E-001**: Open the photo analysis page → see the empty state (3-step timeline + 4 benefit cards, no blank space below the hero) → select a valid PNG/JPG file → empty state still visible, no premature preview → click "Enviar" → submit completes → empty state disappears, image preview and analysis dashboard appear together as the final observable outcome.

### Ad analysis journey (US-002, US-005, US-006)

- **E2E-002**: Open the ad analysis page → see the empty state → type a valid image URL → empty state disappears, image preview appears → click "Analisar anúncio" → loading spinner appears (empty state stays hidden, since the preview already replaced it) → analysis completes → dashboard replaces the preview area as the final observable outcome.

### Video analysis journey (US-003, US-006)

- **E2E-003**: Open the video analysis page → see the empty state → type a valid YouTube URL → empty state remains visible (no pre-result preview exists on this page) → click "Analisar video" → loading spinner appears alongside the still-visible empty state → analysis completes → empty state disappears, video preview and dashboard appear together as the final observable outcome.

## Out-of-Scope Notes

- US-007.EC-1 (page-level load failures unrelated to the analysis flow) is explicitly out of scope per `_user_stories.md` and requires no test case here.
