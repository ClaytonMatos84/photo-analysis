# PRD: Pre-Analysis Empty State

## Overview

The photo, ad, and video analysis pages each show a hero section with an upload/URL form, but the area below it is empty until the user submits something and a result comes back. This leaves a large, unexplained blank space that makes the pages feel unfinished and gives no indication of how the analysis flow works or what value the user will get from it.

This feature replaces that blank space with a consistent, reusable "empty state" shown on all three analysis pages before a result exists: a short timeline of the steps the user will go through, followed by a set of cards previewing the concrete insights the analysis will return. It is for anyone landing on these pages — first-time or returning — and it makes each page feel purposeful and inviting instead of incomplete.

## Goals

- Users see informative content instead of blank space below the hero on the photo, ad, and video analysis pages before any result exists.
- Users understand, at a glance, the 3-step flow they are about to go through on the page they are on.
- Users can preview, before submitting anything, roughly what kind of insights the analysis will return for that content type.
- The same visual pattern (steps + insight cards) is recognizable across all three pages, reinforcing a consistent product experience.
- On the photo page, the image preview and the analysis result always appear together — never a preview sitting alone above a blank area.
- The informative content stays visible during an in-progress analysis (loading), so the page never appears empty at any pre-result moment.

## User Stories

Full behavior catalog: [Full user stories](_user_stories.md)

- US-001 to US-003: Empty state (timeline + benefit cards) shown on first load of the photo, ad, and video pages respectively, before any submission.
- US-004: Photo page — preview appears only together with the result; empty state fills the entire pre-result window, including during upload and analysis.
- US-005: Ad page — empty state disappears as soon as a valid image URL preview is shown.
- US-006: All pages — empty state stays visible during the loading/analyzing phase.
- US-007: Visual and structural consistency of the empty state across all three pages.

## Core Features

### Reusable pre-analysis empty state

A single visual pattern reused on the photo, ad, and video analysis pages whenever no result (and, where applicable, no preview) is currently shown:

- A 3-step timeline, headed by a short "Passo a passo" title, describing the flow for that specific page (e.g., for photos: select an image → wait for analysis → view the result; for ads: inform the ad image URL → wait for the strategic analysis → view the comparison and recommendations; for videos: inform the YouTube URL → wait for the analysis → view video identification and engagement data).
- A set of 4 cards below the timeline, headed by a short "Benefícios" title with a checkmark icon, each describing one concrete field/insight the analysis for that page will return, using a plain-language explanation of what that field means for the user (not the raw technical field name). Content is derived from that page's actual result type so it accurately previews the real output:
  - Photo page: insights drawn from `PhotoAnalysisResult` fields (e.g., identified objects, transmitted feeling, photo style, people/environment).
  - Ad page: insights drawn from `AdAnalysisResult` fields (e.g., brand positioning comparison, strengths/weaknesses, suggested strategy, improvement proposal).
  - Video page: insights drawn from `YouTubeAnalysisResult` fields (e.g., video identification, channel/engagement metrics, description, metadata).
- The same accent color already established per page by `PageHero` is reused for the timeline and cards, and the same scroll-in entrance animation convention already used on these pages applies to this new content.

### Page-specific visibility rules

Each page shows and hides the empty state according to what content would otherwise occupy that space:

- **Photo page**: the empty state is visible from page load through file selection and through the entire analysis/loading phase. It disappears only when the analysis result arrives, at which point the image preview and the result dashboard appear together, replacing the empty state entirely.
- **Ad page**: the empty state is visible while the URL field is empty or holds an invalid URL. It disappears as soon as a valid image URL produces a visible preview, and reappears if the URL is cleared or becomes invalid again. It also disappears once a result exists.
- **Video page**: the empty state is visible from page load through the entire analysis/loading phase (there is no separate pre-result preview on this page). It disappears once the analysis result arrives.
- On all three pages, the empty state remains visible throughout the loading/analyzing phase — it is never hidden just because a request is in flight; it is only hidden by an actual preview or result taking its place.

### Photo preview timing change

On the photo analysis page specifically, the existing behavior of showing the selected file's preview immediately upon selection is removed. The preview now appears only once the analysis result is available, shown together with the result dashboard. This keeps the pre-result experience on the photo page fully occupied by the empty state, with no intermediate "preview with nothing below it" moment.

## Business Rules

- The empty state's step count is fixed at 3 and the benefit-card count is fixed at 4 on every page; this structure does not vary by page, only its text content and accent color do.
- Benefit-card copy must reference an actual field returned by that page's analysis result type and must include a plain-language explanation of what that field represents — generic or unrelated copy is not acceptable.
- The empty state and a result/preview are mutually exclusive within the same page region: exactly one of "empty state" or "preview-and-or-result content" is visible at any time for a given page, per that page's visibility rule.
- The empty state must never disappear solely because a request is loading; it may only be hidden by the arrival of a preview (ad page) or a result (all pages).
- The photo page must not display the file preview before an analysis result exists, regardless of file selection state.

## User Experience

- **Novo usuário**: lands on any of the three analysis pages, sees the hero and form as before, and now also sees a clear "how this works" timeline and a preview of "what you'll learn" directly below it — no more blank space, no confusion about the feature's purpose.
- **Usuário recorrente**: returns to submit a new analysis; while filling the form or waiting for a previous submission's result, still sees the same informative content rather than a flash of emptiness, and sees it swapped for real preview/result content exactly when that content becomes available.
- The empty state must adapt to mobile and desktop widths without horizontal overflow, reflowing the timeline and cards into a single column on narrow viewports.
- The empty state's entrance animation respects reduced-motion preferences already handled elsewhere in the app's animation approach; when animation is not shown, the content must still be fully visible and legible.

## High-Level Technical Constraints

- Must be built with components available in the project's existing PrimeVue 4 design system (no new UI library dependency).
- Must reuse the existing per-page accent color mechanism already established by `PageHero` (`--hero-accent`) for visual consistency.
- Must reuse the existing scroll-in animation convention (`v-animateonscroll`) already applied across these pages.
- Must not alter the API contracts, timeout behavior (120s), or business logic of the existing analysis services.

## Non-Goals (Out of Scope)

- Page-specific decorative illustrations, custom SVGs, or artwork beyond PrimeVue-based components and existing iconography (`pi` icon classes) — out of scope per the decision to keep the pattern simple and PrimeVue-driven.
- Interactive or clickable calls-to-action inside the empty state (e.g., "try a sample analysis" buttons) — not requested; the existing form above remains the only call to action.
- Changing the ad or video page's existing preview timing (image URL preview, video embed) — only the photo page's preview timing changes (see ADR-002); the ad and video pages keep their current preview triggers.
- Persisting or personalizing empty-state content based on user history or prior analyses — content is static per page and per result type, not user-specific.
- Any change to the underlying analysis result data returned by the API — this feature only previews existing fields, it does not add, remove, or modify them.

## Architecture Decision Records

- [ADR-001: Reusable pre-analysis empty state with a step timeline + benefit cards](adrs/adr-001.md) — One shared `AnalysisEmptyState` component (`StepsSection`/`StepCard` step timeline + PrimeVue `Card`) reused across the three pages, with per-page step/benefit content derived from each page's result type.
- [ADR-002: Defer photo preview until the analysis result arrives](adrs/adr-002.md) — The photo page's image preview now renders only alongside the result, removing the previous immediate-on-selection preview; the ad and video pages keep their existing preview timing.

## Open Questions

None. All load-bearing decisions were resolved during brainstorming with the user, and both ADRs above have been accepted.
