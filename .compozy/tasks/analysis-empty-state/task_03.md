---
status: completed
title: Wire AnalysisEmptyState into the YouTube Analysis page and verify cross-page consistency
type: frontend
complexity: low
---

# Task 3: Wire AnalysisEmptyState into the YouTube Analysis page and verify cross-page consistency

## Overview

This task extends the shared `AnalysisEmptyState` component (built in task_01) to the video analysis page, with its own step/benefit content and the simplest visibility rule of the three pages: hidden only once a result exists (this page has no separate pre-result preview). It also closes out the feature by verifying structural and visual consistency across all three pages and running the final static checks, since only once all three pages are wired can that consistency be observed.

<critical>
- ALWAYS READ the PRD, the TechSpec, and their catalogs (`_user_stories.md`, `_tests.md`) before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- MUST create `src/content/youtubeEmptyState.ts` exporting `youtubeEmptyStateSteps` (exactly 3 entries) and `youtubeEmptyStateBenefits` (exactly 4 entries), importing `AnalysisEmptyStateStep`/`AnalysisEmptyStateBenefit` from `AnalysisEmptyState.vue` (built in task_01). Step copy MUST describe the video flow (inform YouTube URL → wait for analysis → view video identification and engagement data). Benefit copy MUST name and explain, in plain language, 4 real fields drawn from `YouTubeAnalysisResult` (e.g. video identification/title, channel and engagement metrics, description, metadata such as category/duration).
- MUST modify `YouTubeAnalysisView.vue` to compute `showEmptyState = computed(() => !analysisResult.value)` and render `<AnalysisEmptyState v-if="showEmptyState" :steps="youtubeEmptyStateSteps" :benefits="youtubeEmptyStateBenefits" />` as the first child inside `<main class="upload-main">`, ahead of the existing `video-preview-card` section and `YouTubeAnalysisDashboard`.
- MUST NOT change the existing URL validation (`isYoutubeUrlValid`), video embed/preview logic, or `YouTubeAnalysisDashboard` — this task only adds the empty state and its visibility computed.
- MUST ensure the empty state remains visible while the URL field is empty or invalid, and during the entire loading phase (`isLoading === true`), disappearing only once `analysisResult` is populated (there is no earlier pre-result preview to hide it sooner, unlike the ad page).
- MUST ensure the empty state remains visible alongside the existing error `Message` when an analysis fails (e.g., timeout).
- MUST verify, across `PhotoAnalysisView`, `AdAnalysisView`, and `YouTubeAnalysisView`, that the empty state renders with the same structure everywhere: exactly 3 timeline steps and exactly 4 benefit cards, the same `AnalysisEmptyState` component, and the same default accent color — differing only in step/benefit text content.
- MUST verify all three content files (`photoEmptyState.ts`, `adEmptyState.ts`, `youtubeEmptyState.ts`) each export exactly 3 steps and exactly 4 benefits, with non-empty fields, and that each benefit plausibly names and explains a real field of its page's result type.
- MUST run `npm run type-check` and `npm run lint` across the full feature (all files touched in task_01, task_02, and this task) and confirm both exit with code 0 and zero reported errors/warnings.
</requirements>

## Subtasks
- [x] 3.1 Create `src/content/youtubeEmptyState.ts` with 3 steps and 4 benefits sourced from `YouTubeAnalysisResult` fields
- [x] 3.2 Add `showEmptyState` computed to `YouTubeAnalysisView.vue` based on `!analysisResult`
- [x] 3.3 Render `<AnalysisEmptyState>` conditionally at the top of `<main class="upload-main">` in `YouTubeAnalysisView.vue`
- [x] 3.4 Manually verify: empty state visible on load, stays visible through URL entry, invalid URL, and the entire loading phase
- [x] 3.5 Manually verify: empty state remains visible alongside an analysis error message; disappears only when the result and video preview appear together
- [x] 3.6 Manually verify cross-page structural consistency: 3 steps + 4 cards, same component, same default accent color across photo/ad/video pages
- [x] 3.7 Manually review all three content files for correct 3/4 counts and accurate, plain-language field explanations
- [x] 3.8 Run `npm run type-check` and `npm run lint` for the whole feature and fix any reported issues

## Implementation Details

Reference `_techspec.md` sections "Data Models", "Development Sequencing" (step 5), and "Testing Approach" for the content-file shape, the `showEmptyState` expression, and the manual-verification strategy. Reference `adrs/adr-001.md` for the component rationale, `adrs/adr-002.md` for the per-page visibility rules (video page mirrors the photo page's "hidden only by result" rule), and `adrs/adr-003.md` for the content-file and computed-placement conventions.

### Relevant Files
- `src/views/YouTubeAnalysisView.vue` — current view; add `showEmptyState` computed and empty-state render (`<main class="upload-main">` region, near the existing `video-preview-card` section and `isYoutubeUrlValid` computed).
- `src/components/utils/AnalysisEmptyState.vue` — shared component built in task_01; consumed here via props, not modified.
- `src/types/YouTubeAnalysisTypes.ts` — `YouTubeAnalysisResult` interface; source of truth for benefit-card copy.
- `src/components/youtube/YouTubeAnalysisDashboard.vue` — existing dashboard rendered once a result exists; no changes needed. Its field-label groupings (`videoItems`, `channelItems`, `metadataItems`) are a useful reference for naming benefit cards accurately.
- `src/views/PhotoAnalysisView.vue` and `src/views/AdAnalysisView.vue` — completed in task_01/task_02; read for the cross-page consistency verification (structure, default accent, animation convention).
- `src/content/photoEmptyState.ts` and `src/content/adEmptyState.ts` — completed in task_01/task_02; reviewed here for shape/count consistency alongside the new `youtubeEmptyState.ts`.

### Dependent Files
- None — this is the final task in the chain; no other task depends on it.

### Related ADRs
- [ADR-001: Reusable pre-analysis empty state with a step timeline + benefit cards](adrs/adr-001.md) — defines the shared component reused here and the cross-page consistency requirement verified here.
- [ADR-002: Defer photo preview until the analysis result arrives](adrs/adr-002.md) — defines the video page's visibility rule (hidden only by result, mirroring the photo page).
- [ADR-003: Shared AnalysisEmptyState component with per-page content files and prop-driven visibility](adrs/adr-003.md) — defines the content-file convention and computed pattern implemented here.

## Deliverables
- `src/content/youtubeEmptyState.ts` with 3 steps and 4 benefits sourced from `YouTubeAnalysisResult` fields.
- `YouTubeAnalysisView.vue` updated: renders the empty state, hidden only once a result exists.
- Verified structural/visual consistency of the empty state across all three analysis pages.
- Confirmed `npm run type-check` and `npm run lint` pass cleanly for the entire feature.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests. No automated framework; every case is a manual verification checklist item, cross-checked with `npm run type-check` and `npm run lint`.

- [x] UT-007, UT-008 — `showEmptyState` is `true` with `youtubeUrl` empty/invalid and no result; `false` once `analysisResult` is set regardless of URL state
- [x] UT-010 — empty state remains `true` on the ad or video page while `isLoading` is `true` and no result exists yet (loading alone never hides it)
- [x] UT-011 — cross-page structural consistency: all three pages render exactly 3 timeline steps and exactly 4 benefit cards via the same `AnalysisEmptyState` component with the same default accent color
- [x] UT-013 — all three content files export exactly 3 steps / 4 benefits each, with non-empty, plausible field-derived copy
- [x] UT-014 — `npm run type-check` and `npm run lint` both exit 0 with zero errors across the full feature
- [x] IT-005 — fresh load of `YouTubeAnalysisView` (empty URL, no result) renders the empty state, no video preview/dashboard in the DOM
- [x] IT-006 — an unrecognized YouTube URL keeps the empty state visible (analysis is prevented by existing validation)
- [x] IT-007 — a failed analysis (e.g., simulated timeout) shows the existing error message, no preview/dashboard, empty state remains visible
- [x] IT-012 — starting an analysis on the ad or video page shows the empty state and the loading spinner simultaneously; once the result arrives, the empty state disappears and the dashboard appears
- [x] E2E-003 — full video journey: open page → empty state visible → type valid YouTube URL → empty state remains visible (no pre-result preview on this page) → click "Analisar video" → loading spinner appears alongside the empty state → result arrives → empty state disappears, video preview and dashboard appear together

## Success Criteria
- Every assigned test case implemented and passing
- The blank area below the hero on the video analysis page is replaced by the empty state whenever no result exists
- All three analysis pages (photo, ad, video) show a structurally and visually consistent empty state, differing only in text content
- `npm run type-check` and `npm run lint` both pass with zero errors across the entire feature's files

## Verification Notes

Per user instruction, the dev server was not started for this task (same non-dev-server convention established in task_02). Verification was performed via:
1. `showEmptyState` boolean logic extracted verbatim and exercised against a case matrix covering UT-007/008/010, IT-005/006/007/012, E2E-003 — all passed (`node` script, output captured).
2. Code-path inspection of `handleAnalyze`: `analysisResult.value = null` is set synchronously before the try block and only reassigned on success, so it remains `null` throughout loading and after any caught error — confirming the empty state stays visible during loading and after failures (IT-007, IT-012) without needing a live run.
3. Cross-page consistency (UT-011) and content shape (UT-013) confirmed via `grep -c` counts across all three content files (3 steps / 4 benefits each) and confirming all three views import the same `AnalysisEmptyState.vue` path with no `accentColor` override (all use the shared default `#357ae8`).
4. Fresh `npm run type-check`, `npm run lint`, and `npm run build` all exited 0 with zero errors/warnings across the whole feature (task_01 + task_02 + task_03 files). `dist/` removed after the build check.
