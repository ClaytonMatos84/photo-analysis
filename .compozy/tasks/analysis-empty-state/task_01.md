---
status: completed
title: Build shared AnalysisEmptyState component and wire it into the Photo Analysis page
type: frontend
complexity: medium
---

# Task 1: Build shared AnalysisEmptyState component and wire it into the Photo Analysis page

## Overview

This task delivers the foundational piece the whole feature depends on: a new reusable `AnalysisEmptyState.vue` component (a step timeline built on the pre-existing `StepsSection`/`StepCard` components, extracted from `HomeHowItWorks.vue`, plus a PrimeVue `Card` grid) that replaces the large blank area below the hero on the analysis pages. It wires this component into `PhotoAnalysisView` with its own step/benefit content, and changes the photo page's preview timing so `PhotoDisplay` renders only once the analysis result exists (ADR-002), instead of immediately on file selection.

<critical>
- ALWAYS READ the PRD, the TechSpec, and their catalogs (`_user_stories.md`, `_tests.md`) before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- MUST create `src/components/utils/AnalysisEmptyState.vue` as a presentational, content-agnostic component with no internal state, no API calls, and no store access.
- MUST export two TypeScript interfaces from `AnalysisEmptyState.vue`'s `<script setup lang="ts">` block: `AnalysisEmptyStateStep { number: number; title: string; description: string }` and `AnalysisEmptyStateBenefit { icon: string; title: string; description: string }`.
- MUST accept props `steps: AnalysisEmptyStateStep[]`, `benefits: AnalysisEmptyStateBenefit[]`, and optional `accentColor?: string` defaulting to `'#357ae8'` (matching `PageHero`'s own default).
- MUST render a step timeline via the pre-existing `StepsSection`/`StepCard` components (extracted from `HomeHowItWorks.vue`), not PrimeVue `Timeline`, driven by `steps`, each entry showing its `number`, `title`, and `description`. `StepsSection`'s own `title` heading MUST be overridden with `title="Passo a passo"` when rendered inside `AnalysisEmptyState`, per the approved design.
- MUST render a responsive CSS grid of PrimeVue `Card`s driven by `benefits`, each showing its `icon` (rendered via `<i :class="icon" />`), `title`, and `description`, preceded by a local "Benefícios" heading (with a `pi pi-check-circle` icon) labeling the grid; the grid MUST reflow to a single column on narrow viewports (~375px) with no horizontal overflow.
- MUST apply `v-animateonscroll="{ enterClass: 'animate-slide-bottom' }"` on the component's root element, matching the convention already used by the dashboards on these pages (`src/main.ts` already registers the `animateonscroll` directive globally — no new registration needed).
- MUST apply `accentColor` as a scoped CSS custom property (e.g. `--empty-state-accent`) consumed by the timeline markers and card icon backgrounds, following the same pattern `PageHero.vue` uses for `--hero-accent`.
- MUST create `src/content/photoEmptyState.ts` exporting `photoEmptyStateSteps` (exactly 3 entries) and `photoEmptyStateBenefits` (exactly 4 entries), importing the two interfaces from `AnalysisEmptyState.vue`. Step copy MUST describe the photo flow (select image → wait for analysis → view result). Benefit copy MUST name and explain, in plain language, 4 real fields of `PhotoAnalysisResult` (e.g. `objetos_identificados`, `sentimento_transmitido`, `estilo_foto`, `pessoas`/`local_ambiente`).
- MUST modify `PhotoAnalysisView.vue` to compute `showEmptyState = computed(() => !analysisResult.value)` and render `<AnalysisEmptyState v-if="showEmptyState" :steps="photoEmptyStateSteps" :benefits="photoEmptyStateBenefits" />` as the first child inside `<main class="upload-main">`, ahead of the existing `PhotoDisplay`/`PhotoAnalysisDashboard` conditionals.
- MUST change `PhotoDisplay`'s render condition in `PhotoAnalysisView.vue` from `v-if="imageFile"` to a condition requiring both `imageFile` AND `analysisResult` (e.g. `v-if="imageFile && analysisResult"`), so the preview never appears before the result (ADR-002). Do not modify `PhotoDisplay.vue` itself — only its call site.
- MUST NOT change `PageHero.vue`, any service, any store, or any API contract.
- MUST keep the empty state visible throughout file selection and the entire loading/analyzing phase on the photo page — it is hidden only once `analysisResult` is populated.
</requirements>

## Subtasks
- [x] 1.1 Create `AnalysisEmptyState.vue` with the `steps`/`benefits`/`accentColor` props and exported interfaces
- [x] 1.2 Implement the step timeline section rendering `steps` via `StepsSection`/`StepCard`
- [x] 1.3 Implement the responsive `Card` grid section rendering `benefits`, with per-benefit icon
- [x] 1.4 Apply `v-animateonscroll` and the `accentColor`-driven CSS custom property, matching `PageHero`'s pattern
- [x] 1.5 Add scoped CSS for mobile single-column reflow (~375px) and verify no horizontal overflow
- [x] 1.6 Create `src/content/photoEmptyState.ts` with 3 steps and 4 benefits sourced from `PhotoAnalysisResult` fields
- [x] 1.7 Wire `AnalysisEmptyState` into `PhotoAnalysisView.vue` with a `showEmptyState` computed gated on `analysisResult`
- [x] 1.8 Change `PhotoDisplay`'s render condition in `PhotoAnalysisView.vue` to require `analysisResult` alongside `imageFile`
- [x] 1.9 Manually verify: empty state visible on load, stays visible through file selection and loading, disappears only when the result (and preview) appear together
- [x] 1.10 Manually verify mobile reflow and reduced-motion visibility (UT-003, UT-004)
- [x] 1.11 Run `npm run type-check` and `npm run lint` and fix any reported issues

**Note (discovered during verification):** `handleFile` originally left a stale `analysisResult` in place when a new file was selected after a completed analysis, which would have violated IT-009 (empty state must reappear until the next result). Fixed within task scope by resetting `analysisResult.value = null` inside `handleFile`.

## Implementation Details

Reference `_techspec.md` sections "Core Interfaces", "Data Models", and "Development Sequencing" (steps 1-3) for the exact prop contract and content-file shape. Reference `adrs/adr-001.md` and `adrs/adr-003.md` for the component/content-file rationale, and `adrs/adr-002.md` for the photo preview timing change.

### Relevant Files
- `src/views/PhotoAnalysisView.vue` — current view; add empty-state render and change `PhotoDisplay` gating (`<main class="upload-main">` region, lines with `PhotoDisplay v-if="imageFile"` and `PhotoAnalysisDashboard v-if="analysisResult"`).
- `src/components/utils/PageHero.vue` — reference for the `--hero-accent` CSS custom property pattern and `v-animateonscroll="{ enterClass: 'animate-fade-slide-top' }"` convention to mirror (do not modify).
- `src/components/home/HomeHowItWorks.vue` (superseded during this task) — original step-numbering visual pattern (Avatar + numbered circle), extracted into the new reusable `src/components/utils/StepsSection.vue` and `src/components/utils/StepCard.vue` components, which `AnalysisEmptyState` consumes directly for its step timeline (replacing the originally-planned PrimeVue `Timeline`) and which the refactored `HomeView.vue` also now consumes.
- `src/components/utils/SectionTitle.vue` — reference for existing `Card`-based component conventions (`<template #title>`, `<template #content>`) used across dashboards.
- `src/components/photo/PhotoDisplay.vue` — component whose render condition changes at its call site; no internal changes needed.
- `src/components/photo/PhotoAnalysisDashboard.vue` — existing dashboard rendered alongside the preview once a result exists; no changes needed, just confirm it renders together with `PhotoDisplay` per the new gating.
- `src/types/PhotoAnalysisTypes.ts` — `PhotoAnalysisResult` interface; source of truth for benefit-card copy.
- `src/main.ts` — confirms `AnimateOnScroll` directive is already globally registered (`app.directive('animateonscroll', AnimateOnScroll)`); no changes needed here.

### Dependent Files
- `src/views/AdAnalysisView.vue` — task_02 will reuse `AnalysisEmptyState` created here; no direct edits in this task.
- `src/views/YouTubeAnalysisView.vue` — task_03 will reuse `AnalysisEmptyState` created here; no direct edits in this task.

### Related ADRs
- [ADR-001: Reusable pre-analysis empty state with a step timeline + benefit cards](adrs/adr-001.md) — defines the component's structure (3-step timeline + 4 benefit cards) implemented here.
- [ADR-002: Defer photo preview until the analysis result arrives](adrs/adr-002.md) — defines the `PhotoDisplay` gating change implemented here.
- [ADR-003: Shared AnalysisEmptyState component with per-page content files and prop-driven visibility](adrs/adr-003.md) — defines the exact prop contract, content-file convention, and `StepsSection`/`StepCard` step-timeline choice implemented here.

## Deliverables
- `src/components/utils/AnalysisEmptyState.vue` implemented per the prop contract, rendering a step timeline (via `StepsSection`/`StepCard`) and a responsive benefit-card grid with entrance animation and accent-color theming.
- `src/content/photoEmptyState.ts` with 3 steps and 4 benefits sourced from `PhotoAnalysisResult` fields.
- `PhotoAnalysisView.vue` updated: renders the empty state pre-result, and gates `PhotoDisplay` on `analysisResult` in addition to `imageFile`; `handleFile` now resets `analysisResult` so re-selecting a file after a result correctly brings the empty state back.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)** ✓

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests. This project has no automated test framework (see `_techspec.md` "Testing Approach"); every case below is a manual verification checklist item confirmed in a running dev server, cross-checked with `npm run type-check` and `npm run lint`.

- [x] UT-001, UT-002 — `AnalysisEmptyState` renders 3 timeline steps and 4 benefit cards with correct fields; root element carries `v-animateonscroll` with `enterClass: 'animate-slide-bottom'`
- [x] UT-003 — mobile viewport (~375px) reflows timeline/card grid to single column, no overflow
- [x] UT-004 — reduced-motion setting still shows content fully visible and legible
- [x] UT-009 — `PhotoAnalysisView`'s `showEmptyState` computed is `true` when `analysisResult` is unset (regardless of `imageFile`), `false` once `analysisResult` is set
- [x] UT-012 — `AnalysisEmptyState` falls back to default `#357ae8` accent when `accentColor` prop is omitted
- [x] IT-001 — fresh load of `PhotoAnalysisView` (no file, no result) renders the empty state, no `PhotoDisplay`/`PhotoAnalysisDashboard` in the DOM
- [x] IT-008 — selecting a valid image file before submitting does NOT render `PhotoDisplay`; empty state remains visible
- [x] IT-009 — after one successful analysis, selecting a new file clears the previous preview/result and shows the empty state again until the next result arrives
- [x] IT-010 — a failed photo upload shows the existing error message, no preview/dashboard, empty state remains visible
- [x] E2E-001 — full photo journey: open page → empty state visible → select file → still no premature preview → submit → empty state disappears → preview and dashboard appear together

## Success Criteria
- Every assigned test case implemented and passing ✓
- The blank area below the hero on the photo analysis page is replaced by the empty state whenever no result exists ✓
- The photo preview never appears before the analysis result, in any observed state (idle, file selected, loading, error) ✓
- `npm run type-check` and `npm run lint` both pass with zero errors on all new and modified files ✓
