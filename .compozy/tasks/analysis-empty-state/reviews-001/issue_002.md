---
provider: manual
pr:
round: 1
round_created_at: 2026-07-22T22:39:54Z
status: resolved
file: src/components/utils/StepsSection.vue
line: 3
severity: medium
author: claude-code
provider_ref:
---

# Issue 002: Empty "Como Funciona" heading always renders inside empty state

## Review Comment

`StepsSection.vue` unconditionally renders `<h2 class="steps-section-title">{{ title }}</h2>` (line 3), and `title` defaults to `'Como Funciona'` (line 40) when not passed as a prop. `AnalysisEmptyState.vue` (line 7) invokes `<StepsSection :steps="steps" :accent-color="accentColor" :padded="false" />` without ever passing a `title` prop, so every instance of the empty state on the photo, ad, and video pages renders a visible "Como Funciona" `<h2>` above its 3 steps — text that was never part of the empty-state design in the PRD, TechSpec, or any ADR, and duplicates the identical heading already shown on the home page's own "Como Funciona" section (`HomeView.vue` via the same `StepsSection` component).

This is a direct consequence of reusing `StepsSection` (see Issue 001) without adapting it for this new call site: the component was designed for a single home-page section with its own heading, and nothing in `AnalysisEmptyState` suppresses or overrides that heading for the analysis-page use case. The result is an extra, unintended "Como Funciona" title appearing inside the empty state on all three analysis pages, which was never reviewed against the design (`_prd.md`'s Core Features section only describes "a 3-step timeline" and "a set of 4 cards," with no heading), and would be caught by any visual QA pass since it's a clearly visible, unstyled-for-context heading sitting above the timeline steps.

Suggested fix: pass an empty/explicit `title=""` (and adjust `StepsSection` to skip rendering the `<h2>` when `title` is falsy), or add a dedicated prop such as `showTitle`/`hideTitle` to `StepsSection` so `AnalysisEmptyState` can opt out of the heading entirely, matching the actual approved design.

## Triage

- Decision: `VALID`
- Notes: Confirmed — `StepsSection.vue` rendered its `<h2>` unconditionally with a `'Como Funciona'` default, and `AnalysisEmptyState.vue` never overrode it, so every empty-state instance showed a stray "Como Funciona" heading above the step cards. Fixed by (1) changing `StepsSection.vue`'s `<h2>` to `v-if="title"` so an empty/falsy `title` renders no heading at all, and (2) passing `title=""` explicitly from `AnalysisEmptyState.vue`'s `<StepsSection>` call site. `HomeView.vue` is unaffected — it still doesn't pass a `title` prop, so `StepsSection` falls back to its `'Como Funciona'` default there and the home page's heading is unchanged. Verified with `npm run type-check` and `npm run lint`, both exiting 0 with zero errors after the fix.
