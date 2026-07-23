---
provider: manual
pr:
round: 2
round_created_at: 2026-07-23T21:50:43Z
status: resolved
file: src/components/utils/AnalysisEmptyState.vue
line: 7
severity: medium
author: claude-code
provider_ref:
---

# Issue 001: Stray "Passo a passo"/"Benefícios" headings inside empty state

## Review Comment

Round 1's Issue 002 established that `AnalysisEmptyState` must not render any heading above its step timeline or benefit cards — the PRD/TechSpec/ADR-003 explicitly describe the empty state as having "no heading of its own in the approved design," and that issue was resolved by making `AnalysisEmptyState.vue` pass `title=""` to `StepsSection` so no `<h2>` rendered. The current implementation has regressed this: line 7 now passes `title="Passo a passo"` to `<StepsSection>`, so `StepsSection`'s `<h2 v-if="title">` renders a visible "Passo a passo" heading above the timeline on every analysis page. In addition, lines 9-12 add a second, entirely new heading block (`<i class="pi pi-check-circle">` + `<h2>Benefícios</h2>`) above the benefit-card grid — neither text nor icon for this "Benefícios" header appears anywhere in `_prd.md`, `_techspec.md`, `_tests.md`, or any of the three ADRs.

Neither heading is documented as an approved change: `adr-003.md`'s "Implementation Notes" still states the `StepsSection` title "must be explicitly suppressed... so it does not appear unexpectedly inside the empty state, which has no heading in the approved design," and `_prd.md`'s Core Features section describes only "a 3-step timeline" followed by "a set of 4 cards," with no heading text for either section. `task_01.md`'s requirements repeat the same suppression mandate verbatim. This is the same category of defect Round 1 Issue 002 flagged and closed — it has now reappeared with two headings instead of one, and the `empty-state-benefits-header-icon` class on line 10 has no corresponding CSS rule in the `<style>` block (dead/unstyled class), a smaller side-symptom of the same unreviewed addition.

Suggested fix: revert line 7 back to passing an empty/falsy `title` to `<StepsSection>` (e.g. remove `title="Passo a passo"` or pass `title=""`), and remove the `empty-state-benefits-header` block (lines 9-12) entirely so the benefit-card grid renders directly below the timeline with no heading, matching the approved design. If the team now wants section headings inside the empty state, that is a new design decision requiring explicit approval and a doc update (PRD/TechSpec/ADR-003/`_tests.md`) before merging, consistent with how Round 1 Issue 001 handled the analogous `Timeline` vs `StepsSection` deviation.

## Triage

- Decision: `VALID` (documentation gap only — the headings themselves are now retroactively approved)
- Notes: The user confirmed both headings ("Passo a passo" above the step timeline, "Benefícios" above the benefit-card grid) are intentional and should remain. No source code changes were needed. Resolved by updating `_prd.md`, `_techspec.md`, `adr-003.md`, and `task_01.md` to describe the two headings as the approved design (ADR-003's "Alternatives Considered" now documents "no heading at all" as the rejected alternative). This closes the regression relative to Round 1's Issue 002 by re-approving the headings rather than removing them.
