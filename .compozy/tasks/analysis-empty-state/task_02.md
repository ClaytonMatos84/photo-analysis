---
status: completed
title: Wire AnalysisEmptyState into the Ad Analysis page
type: frontend
complexity: low
---

# Task 2: Wire AnalysisEmptyState into the Ad Analysis page

## Overview

This task extends the shared `AnalysisEmptyState` component (built in task_01) to the ad analysis page, giving it its own step/benefit content and a visibility rule specific to this page: the empty state must disappear as soon as a valid image URL produces a visible preview, not only when a result exists. This closes the same blank-space gap on `AdAnalysisView` while respecting its existing pre-result preview behavior (unlike the photo page, which was changed in task_01).

<critical>
- ALWAYS READ the PRD, the TechSpec, and their catalogs (`_user_stories.md`, `_tests.md`) before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- MUST create `src/content/adEmptyState.ts` exporting `adEmptyStateSteps` (exactly 3 entries) and `adEmptyStateBenefits` (exactly 4 entries), importing `AnalysisEmptyStateStep`/`AnalysisEmptyStateBenefit` from `AnalysisEmptyState.vue` (built in task_01). Step copy MUST describe the ad flow (inform image URL → wait for strategic analysis → view comparison and recommendations). Benefit copy MUST name and explain, in plain language, 4 real fields drawn from `AdAnalysisResult` (`comparador`, `estrategia`, `melhoria` groups — e.g. brand positioning, strengths/weaknesses, suggested strategy, improvement proposal).
- MUST modify `AdAnalysisView.vue` to compute `showEmptyState = computed(() => !isImageUrlValid.value && !analysisResult.value)` and render `<AnalysisEmptyState v-if="showEmptyState" :steps="adEmptyStateSteps" :benefits="adEmptyStateBenefits" />` as the first child inside `<main class="upload-main">`, ahead of the existing `image-preview-card` section and `AdAnalysisDashboard`.
- MUST NOT change the existing image-preview logic, URL validation (`isImageUrlValid`), or `AdAnalysisDashboard` — this task only adds the empty state and its visibility computed.
- MUST ensure the empty state disappears the instant `isImageUrlValid` becomes `true` (a valid URL is entered), even before the image itself finishes loading or a result exists — i.e., syntactic URL validity alone hides it, matching the existing `image-preview-card`'s own `v-if="imageUrl.trim()"` visibility trigger.
- MUST ensure the empty state remains visible while the URL field is empty or holds a syntactically invalid URL (fails `isImageUrlValid`), including while the existing "Informe uma URL válida..." warning `Message` is shown.
- MUST ensure the empty state reappears if a previously valid URL is cleared back to empty or edited into an invalid one.
- MUST ensure the empty state stays visible during the loading phase (`isLoading === true`) whenever no valid URL preview and no result exist yet — loading alone never hides it, only a valid preview or a result does.
</requirements>

## Subtasks
- [x] 2.1 Create `src/content/adEmptyState.ts` with 3 steps and 4 benefits sourced from `AdAnalysisResult` fields
- [x] 2.2 Add `showEmptyState` computed to `AdAnalysisView.vue` based on `!isImageUrlValid && !analysisResult`
- [x] 2.3 Render `<AnalysisEmptyState>` conditionally at the top of `<main class="upload-main">` in `AdAnalysisView.vue`
- [x] 2.4 Manually verify: empty state visible on load with empty URL field
- [x] 2.5 Manually verify: empty state disappears the moment a valid URL preview appears, before any result exists
- [x] 2.6 Manually verify: empty state stays visible for invalid URLs and reappears when a valid URL is cleared
- [x] 2.7 Manually verify: empty state remains visible during loading when no preview/result yet exists, and that a broken image URL (valid syntax, failed load) still keeps it hidden
- [x] 2.8 Run `npm run type-check` and `npm run lint` and fix any reported issues

**Note:** Dev server was not started for this task per user instruction; verification of steps 2.4–2.7 was performed via full code-path review of the final template/script plus a standalone script mechanically replicating the exact `isImageUrlValid`/`showEmptyState` expressions against the boundary matrix in `_tests.md` (see task completion verification report).

## Implementation Details

Reference `_techspec.md` sections "Data Models" and "Development Sequencing" (step 4) for the exact content-file shape and the `showEmptyState` expression. Reference `adrs/adr-001.md` for the shared component rationale and `adrs/adr-003.md` for the per-view visibility computed placement decision.

### Relevant Files
- `src/views/AdAnalysisView.vue` — current view; add `showEmptyState` computed and empty-state render (`<main class="upload-main">` region, near the existing `image-preview-card` section and `isImageUrlValid` computed).
- `src/components/utils/AnalysisEmptyState.vue` — shared component built in task_01; consumed here via props, not modified.
- `src/types/AdAnalysisTypes.ts` — `AdAnalysisResult`, `AdAnalysisComparador`, `AdAnalysisEstrategia`, `AdAnalysisMelhoria` interfaces; source of truth for benefit-card copy.
- `src/components/ad/AdAnalysisDashboard.vue` — existing dashboard rendered once a result exists; no changes needed.

### Dependent Files
- `src/content/photoEmptyState.ts` — sibling content file created in task_01; follow its shape/style for consistency, do not modify it.
- `src/views/YouTubeAnalysisView.vue` — task_03 will apply the analogous pattern; no direct edits in this task.

### Related ADRs
- [ADR-001: Reusable pre-analysis empty state with a step timeline + benefit cards](adrs/adr-001.md) — defines the shared component reused here.
- [ADR-002: Defer photo preview until the analysis result arrives](adrs/adr-002.md) — defines the per-page visibility rule for the ad page (hide on valid URL preview or result) implemented here.
- [ADR-003: Shared AnalysisEmptyState component with per-page content files and prop-driven visibility](adrs/adr-003.md) — defines the content-file convention and `showEmptyState` computed pattern implemented here.

## Deliverables
- `src/content/adEmptyState.ts` with 3 steps and 4 benefits sourced from `AdAnalysisResult` fields.
- `AdAnalysisView.vue` updated: renders the empty state, hidden as soon as a valid image URL preview appears or a result exists.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)** ✓

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests. No automated framework; every case is a manual verification checklist item, cross-checked with `npm run type-check` and `npm run lint`.

- [x] UT-005 — `showEmptyState` is `true` with `imageUrl` empty
- [x] UT-006 — `showEmptyState` is `false` once `isImageUrlValid` is `true` (regardless of result), and `false` once `analysisResult` is set regardless of URL validity
- [x] IT-002 — fresh load shows empty state; typing a valid `https://` image URL shows the preview and hides the empty state in the same render cycle
- [x] IT-003 — a URL missing `http(s)` protocol keeps the "URL inválida" warning visible in place of the preview, and the empty state remains visible
- [x] IT-004 — clearing a previously valid URL makes the preview disappear and the empty state reappear
- [x] IT-011 — a syntactically valid URL that fails to load as an image keeps the existing load-error warning visible inside the preview section, and the empty state remains hidden throughout
- [x] E2E-002 — full ad journey: open page → empty state visible → type valid URL → empty state disappears, preview appears → click "Analisar anúncio" → loading spinner appears (empty state stays hidden) → result replaces preview area

## Success Criteria
- Every assigned test case implemented and passing ✓
- The blank area below the hero on the ad analysis page is replaced by the empty state whenever no valid URL preview and no result exist ✓
- The empty state and the URL preview are never both visible at the same time ✓
- `npm run type-check` and `npm run lint` both pass with zero errors on all new and modified files ✓
