# TechSpec: Pre-Analysis Empty State

## Executive Summary

Add a single reusable `AnalysisEmptyState.vue` component, rendered inside `<main class="upload-main">` on `PhotoAnalysisView`, `AdAnalysisView`, and `YouTubeAnalysisView` whenever no result (and, on the ad page, no valid URL preview) is showing. It renders a 3-step timeline via the shared `StepsSection`/`StepCard` components (a manual, mobile-first step layout using PrimeVue `Avatar` for the numbered icon, the same pattern originally used by `HomeHowItWorks.vue` and now factored out for reuse) and a responsive grid of 4 PrimeVue `Card`s describing the analysis's return fields in plain language. Per-page copy lives in new typed content files under `src/content/`; each view supplies its own content and computes its own visibility flag. The photo page additionally changes `PhotoDisplay`'s render condition so the image preview appears only alongside the analysis result, never before it. No API, store, or service changes; no new PrimeVue dependency — everything is built from PrimeVue components already installed (`Avatar`, `Card`) plus the existing `v-animateonscroll` directive and the pre-existing `StepsSection`/`StepCard` components (extracted from `HomeHowItWorks.vue` during this feature).

## System Architecture

### Component Overview

- **`AnalysisEmptyState.vue`** (new, `src/components/utils/`) — presentational component. Receives `steps: AnalysisEmptyStateStep[]`, `benefits: AnalysisEmptyStateBenefit[]`, and optional `accentColor?: string`. Renders a step timeline headed by a "Passo a passo" title (passed to `StepsSection`'s `title` prop) and a card grid of benefits headed by its own "Benefícios" title with a `pi pi-check-circle` icon. No internal state, no API calls, no store access. Exports the two prop-shape interfaces for content files to import.
- **Content files** (new, `src/content/`) — `photoEmptyState.ts`, `adEmptyState.ts`, `youtubeEmptyState.ts`. Each exports a `steps` and a `benefits` constant array conforming to the interfaces above. Pure data, no logic.
- **`PhotoAnalysisView.vue`, `AdAnalysisView.vue`, `YouTubeAnalysisView.vue`** (modified) — each imports its content file and `AnalysisEmptyState`, computes a page-specific `showEmptyState` boolean, and renders `<AnalysisEmptyState v-if="showEmptyState" :steps="..." :benefits="..." />` as the first child of `<main class="upload-main">`, ahead of existing conditional preview/dashboard blocks.
- **`PhotoDisplay.vue`** (unchanged) — no internal changes; only its call site in `PhotoAnalysisView.vue` changes (render condition).

Data flow: content files → view's template bindings → `AnalysisEmptyState` props → rendered `StepsSection`/`StepCard`/`Card` markup. No data flows back out of `AnalysisEmptyState`; it has no emits. Visibility state (`showEmptyState`) is derived entirely from state each view already owns (`analysisResult`, `isImageUrlValid`) — no new reactive state is introduced beyond the computed itself.

## Implementation Design

### Core Interfaces

```ts
// Defined and exported from AnalysisEmptyState.vue's <script setup lang="ts"> block
export interface AnalysisEmptyStateStep {
    number: number
    title: string
    description: string
}

export interface AnalysisEmptyStateBenefit {
    icon: string // PrimeIcons class, e.g. 'pi pi-images'
    title: string
    description: string
}
```

```ts
// AnalysisEmptyState.vue props contract
withDefaults(
    defineProps<{
        steps: AnalysisEmptyStateStep[]
        benefits: AnalysisEmptyStateBenefit[]
        accentColor?: string
    }>(),
    { accentColor: '#357ae8' },
)
```

### Data Models

Content file shape (identical across the three files, values differ):

```ts
// src/content/photoEmptyState.ts
import type { AnalysisEmptyStateStep, AnalysisEmptyStateBenefit } from '@/components/utils/AnalysisEmptyState.vue'

export const photoEmptyStateSteps: AnalysisEmptyStateStep[] = [
    { number: 1, title: 'Envie uma imagem', description: 'Selecione uma foto em PNG, JPG ou JPEG.' },
    { number: 2, title: 'Aguarde a análise', description: 'Nossa IA processa a imagem em poucos instantes.' },
    { number: 3, title: 'Veja o resultado', description: 'Visualize a imagem enviada junto com os insights.' },
]

export const photoEmptyStateBenefits: AnalysisEmptyStateBenefit[] = [
    { icon: 'pi pi-images', title: 'Objetos identificados', description: 'Lista dos principais objetos e elementos reconhecidos na foto.' },
    { icon: 'pi pi-heart', title: 'Sentimento transmitido', description: 'A emoção ou clima geral que a imagem comunica.' },
    { icon: 'pi pi-palette', title: 'Estilo da foto', description: 'Características visuais e estéticas identificadas.' },
    { icon: 'pi pi-map-marker', title: 'Pessoas e ambiente', description: 'Quantidade de pessoas e descrição do local/ambiente da cena.' },
]
```

`adEmptyState.ts` and `youtubeEmptyState.ts` follow the same shape, with copy sourced from `AdAnalysisResult` (`comparador`, `estrategia`, `melhoria` fields) and `YouTubeAnalysisResult` (video identification, channel/engagement, description, metadata) respectively. No runtime schema — these are compile-time constants, type-checked only for shape, not for semantic accuracy against the result types (see ADR-003 risk).

No new API request/response types, no database/storage changes.

### API Endpoints

None. This feature is purely presentational and does not touch any service or endpoint.

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|----------------------|------------------|
| `AnalysisEmptyState.vue` | New | New shared component; low risk, no external deps beyond the pre-existing `StepsSection`/`StepCard` components and PrimeVue `Card` already installed | Implement, verify via manual QA |
| `src/content/photoEmptyState.ts` | New | Static content; risk is content drifting from actual `PhotoAnalysisResult` fields over time | Implement; keep in sync manually when types change |
| `src/content/adEmptyState.ts` | New | Static content; same drift risk against `AdAnalysisResult` | Implement; keep in sync manually |
| `src/content/youtubeEmptyState.ts` | New | Static content; same drift risk against `YouTubeAnalysisResult` | Implement; keep in sync manually |
| `PhotoAnalysisView.vue` | Modified | Adds `showEmptyState` computed and empty-state render; changes `PhotoDisplay` render condition from `imageFile` to `imageFile && analysisResult` — removes the previously-immediate photo preview on file selection (intentional, per ADR-002) | Implement; manually verify preview no longer shows before result |
| `AdAnalysisView.vue` | Modified | Adds `showEmptyState` computed (`!isImageUrlValid && !analysisResult`) and empty-state render; no change to existing preview/result logic | Implement; manually verify empty state hides when URL preview appears |
| `YouTubeAnalysisView.vue` | Modified | Adds `showEmptyState` computed (`!analysisResult`) and empty-state render; no change to existing preview/result logic | Implement; manually verify empty state hides only when result appears |
| `PhotoDisplay.vue` | Unaffected | No internal changes | None |
| `PageHero.vue` | Unaffected | No prop or slot changes | None |
| Services (`PhotoAnalysisService`, `AdAnalysisService`, `YouTubeAnalysisService`) | Unaffected | No API contract changes | None |

## Testing Approach

The project has no automated test framework configured (`docs/TESTING.md` confirms zero automated tests today; Vitest is only a documented future recommendation, not adopted here). Per user decision, this feature does not introduce Vitest or any automated test runner. `_tests.md` therefore documents every case as a **manual verification checklist** item instead of an automated test ID's execution mechanism — each case still gets a stable ID for traceability from `cy-create-tasks` and review rounds, but "running" a case means manually exercising the UI in a browser (dev server) and confirming the described observable behavior, cross-checked with:

- `npm run type-check` — must pass with no errors after adding the new interfaces, content files, and view changes.
- `npm run lint` — must pass with no errors/warnings on all new and modified files.
- Manual visual check in Chrome/Firefox at common breakpoints (mobile ~375px, tablet ~768px, desktop ~1280px) for the single-column reflow requirement (US-001.EC-1).
- Manual check with OS-level "reduce motion" enabled (or by inspecting that `v-animateonscroll` degrades gracefully, since the directive is PrimeVue's own and already used elsewhere without issue) for US-001.EC-2.

No fixtures, no mocked services, no CI test job changes are introduced by this feature.

## Development Sequencing

### Build Order

1. `AnalysisEmptyState.vue` — no dependencies beyond the pre-existing `StepsSection`/`StepCard` components and PrimeVue `Card` (already installed).
2. `src/content/photoEmptyState.ts`, `src/content/adEmptyState.ts`, `src/content/youtubeEmptyState.ts` — depend on step 1 for the exported interfaces.
3. `PhotoAnalysisView.vue` changes (empty-state render + `PhotoDisplay` gating change) — depends on steps 1–2.
4. `AdAnalysisView.vue` changes (empty-state render + visibility computed) — depends on steps 1–2.
5. `YouTubeAnalysisView.vue` changes (empty-state render + visibility computed) — depends on steps 1–2.
6. Manual verification pass (type-check, lint, visual/responsive/reduced-motion checks) — depends on steps 1–5.

### Technical Dependencies

None external. All required PrimeVue components (`Avatar`, `Card`) and the `AnimateOnScroll` directive are already installed and globally registered in `main.ts`. `StepsSection`/`StepCard` are pre-existing project components (extracted from `HomeHowItWorks.vue` as part of this feature) reused, not new PrimeVue dependencies.

## Technical Considerations

### Key Decisions

- **Decision**: One generic `AnalysisEmptyState.vue` driven entirely by props, with per-page content in separate `src/content/*EmptyState.ts` files.
  **Rationale**: Keeps the component free of page-specific knowledge, keeps content easy to review/update independently, matches the user's explicit preference.
  **Trade-offs**: Introduces a new `src/content/` directory and naming convention not previously present in the codebase.
  **Alternatives rejected**: per-page wrapper components (triples component count for pure data); inline content in views (bloats view files).
- **Decision**: Reuse the `StepsSection`/`StepCard` components (extracted from `HomeHowItWorks.vue`) for the step timeline, instead of PrimeVue `Timeline`.
  **Rationale**: `HomeHowItWorks.vue` already implemented the exact numbered-step visual pattern (`Avatar` + numbered circle + title/description, with a manual `isDesktop` resize listener collapsing a horizontal row to a vertical column on mobile) that this feature also needs; factoring it into reusable `StepsSection`/`StepCard` components avoided introducing `Timeline` as a second, visually inconsistent step-rendering pattern in the app and let the home page adopt the same reusable components in the same change.
  **Trade-offs**: Reintroduces the manual `isDesktop` resize-listener responsiveness approach (with proper `onUnmounted` cleanup) instead of relying on `Timeline`'s built-in vertical/horizontal layout switching; `StepsSection` renders its own `title` heading (defaulting to "Como Funciona" on the home page), which `AnalysisEmptyState` overrides with `title="Passo a passo"` to make the section heading contextually accurate for the analysis pages, and pairs it with its own "Benefícios" heading above the benefit-card grid (see revised decision below).
  **Alternatives rejected**: PrimeVue `Timeline` (original ADR-001/ADR-003 decision, since revised) — rejected in favor of visual and code consistency with the already-existing home page step pattern.
- **Decision**: Per-page `showEmptyState` computed lives in each view, not centralized in the shared component.
  **Rationale**: Visibility rules differ meaningfully per page (photo: gated on result only; ad: gated on URL validity or result; video: gated on result only) and depend on state each view already owns.
  **Trade-offs**: Slight duplication of the "hide when result exists" clause across three views.
  **Alternatives rejected**: passing a `visible` prop computed by a shared composable — rejected as unnecessary abstraction for three short, already-different boolean expressions.
- **Decision**: `PhotoDisplay` render condition changes from `imageFile` to `imageFile && analysisResult`.
  **Rationale**: Directly implements ADR-002's decision that the photo preview must not appear before the result.
  **Trade-offs**: Users lose the earlier confirmation that the correct file was selected (documented risk in ADR-002, accepted by the user).
- **Decision**: No automated tests introduced; `_tests.md` cases are manual-verification checklist items.
  **Rationale**: Matches explicit user decision and the project's current, deliberate no-automated-tests posture.
  **Trade-offs**: Regressions in this feature will only be caught by manual QA or code review, not CI.
- **Decision**: `AnalysisEmptyState` renders a "Passo a passo" heading above the step timeline and a "Benefícios" heading (with a `pi pi-check-circle` icon) above the benefit-card grid, instead of no heading at all.
  **Rationale**: Revised, user-approved decision (superseding the original "no heading" design) — short section titles improve scannability of the empty state by labeling the two distinct content blocks (flow vs. outcomes) for the user, at negligible visual cost.
  **Trade-offs**: `StepsSection`'s default "Como Funciona" title (still used as-is on the home page) is overridden per call site with a context-specific title (`"Passo a passo"`) instead of being suppressed; the "Benefícios" heading/icon is local markup in `AnalysisEmptyState.vue`, not part of `StepsSection`, so it must be kept visually consistent with the timeline's heading by hand if either is restyled later.
  **Alternatives rejected**: no heading at all (original ADR-003 decision, since revised) — rejected in favor of clearer content grouping.

### Known Risks

- **Content/type drift**: static copy in content files can fall out of sync with the actual result-type fields if those types change later without updating the content files. Likelihood: low-to-moderate over time. Mitigation: content files import the shared interfaces (shape-checked at compile time); semantic accuracy review is called out explicitly in `_tests.md` manual cases.
- **No automated regression safety net**: since no tests are added, a future unrelated change could silently break the visibility logic (e.g., an edit to `AdAnalysisView`'s URL validation could inadvertently change `showEmptyState` behavior). Likelihood: low for this specific change, ongoing for the codebase in general. Mitigation: out of scope to address here; consistent with the project's existing accepted technical debt (`docs/TECH_DEBT.md`).

## Architecture Decision Records

- [ADR-001: Reusable pre-analysis empty state with a step timeline + benefit cards](adrs/adr-001.md) — One shared component combining a 3-step timeline (`StepsSection`/`StepCard`) and 4 benefit Cards, reused across all three analysis pages.
- [ADR-002: Defer photo preview until the analysis result arrives](adrs/adr-002.md) — The photo page's image preview now renders only alongside the result; per-page empty-state visibility rules for all three pages.
- [ADR-003: Shared `AnalysisEmptyState` component with per-page content files and prop-driven visibility](adrs/adr-003.md) — Concrete component shape, prop contract, content-file convention, `StepsSection`/`StepCard` step timeline, and per-view visibility computed logic.
