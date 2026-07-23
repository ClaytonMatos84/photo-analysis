---
provider: manual
pr:
round: 1
round_created_at: 2026-07-22T22:39:54Z
status: resolved
file: src/components/utils/AnalysisEmptyState.vue
line: 7
severity: high
author: claude-code
provider_ref:
---

# Issue 001: Steps rendered with StepsSection/Avatar, not PrimeVue Timeline

## Review Comment

The PRD, TechSpec, and all three ADRs (ADR-001, ADR-002, ADR-003) explicitly and repeatedly specify that `AnalysisEmptyState.vue` renders its 3-step flow using PrimeVue's `Timeline` component (vertical layout, no `layout="horizontal"` override). Task 1's requirements state verbatim: "MUST render a PrimeVue `Timeline` ... driven by `steps`, each entry showing its `number`, `title`, and `description`," and subtask 1.2 is "Implement the vertical `Timeline` section rendering `steps`" (checked off as done).

The actual implementation does not use `Timeline` at all. `AnalysisEmptyState.vue` line 7 delegates to `<StepsSection :steps="steps" ... />`, which in turn renders a manual flex layout of `StepCard` components (`Avatar` + numbered circle + title + description), the same visual pattern used by the old `HomeHowItWorks.vue` (now refactored into `StepsSection`/`StepCard` and reused on `HomeView`). This is a different PrimeVue component family entirely — no `Timeline`, no `TimelineEvent` markers/connectors — and reintroduces the exact "manual `isDesktop` resize listener" complexity that ADR-003's "Alternative 3" explicitly rejected in favor of `Timeline`'s built-in responsiveness ("Horizontal layout requires extra responsive logic ... added complexity for a component meant to be simple and reusable... The user chose the default vertical layout for simplicity and built-in responsiveness").

This is a genuine spec/architecture deviation, not a cosmetic difference: `_tests.md` UT-001, UT-002, and UT-003 all assert behavior specifically framed as `Timeline` component behavior, and task_01's own checklist claims `Timeline` was implemented when it was not. Reusing `StepsSection` was likely a reasonable-looking shortcut (it already existed after the home-page refactor and produces a similar visual result), but it was never approved as a substitution for `Timeline` in any ADR, PRD, or task file — no deviation is documented anywhere.

Suggested fix: either (a) reimplement the steps section using PrimeVue `Timeline` as specified by all governing documents, or (b) if the team now prefers the `StepsSection`/`Avatar` pattern, get that decision explicitly approved and update ADR-003/TechSpec/`_tests.md` to reflect the new component choice before merging, so the documentation and the code stay in sync.

## Triage

- Decision: `VALID` (documentation gap only — code choice itself is now retroactively approved)
- Notes: The `StepsSection`/`StepCard` implementation itself is intentional and will remain (per explicit user direction: "não temos mais o Timeline do PrimeVue"). The actual defect flagged here was that the PRD, TechSpec, and all three ADRs still described a PrimeVue `Timeline` that was never built, with no documented deviation anywhere. Resolved by updating `_prd.md`, `_techspec.md`, `adr-001.md`, `adr-002.md`, `adr-003.md`, `_tests.md`, and `task_01.md`/`task_02.md`/`task_03.md` to describe the `StepsSection`/`StepCard` step-timeline implementation as the approved design (ADR-003's "Alternatives Considered" now documents PrimeVue `Timeline` as the rejected alternative). No source code changes were needed for this issue; it was a spec/documentation synchronization problem, now closed.
