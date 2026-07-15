## 1. Types & Service Layer

- [x] 1.1 Add `YouTubeTopVideo` and `YouTubeTopVideosResponse` interfaces to `src/types/YouTubeAnalysisTypes.ts`
- [x] 1.2 Add `getTopViews(limit)` and `getTopLikes(limit)` static methods to `src/services/YouTubeAnalysisService.ts`

## 2. Ranking List Component

- [x] 2.1 Create `src/components/youtube/YouTubeTopVideosList.vue` with PrimeVue DataView (layout="list"), props: videos, metric, loading
- [x] 2.2 Implement rank position display (🥇🥈🥉 for top 3, number for rest) in the list item template
- [x] 2.3 Implement YouTube thumbnail display with `@error` fallback in the list item template
- [x] 2.4 Implement Brazilian locale number formatting via `Intl.NumberFormat('pt-BR')` for metrics
- [x] 2.5 Implement "Assistir" link with `target="_blank"` and `rel="noopener noreferrer"` in the list item template
- [x] 2.6 Implement `#empty` slot with appropriate empty state message
- [x] 2.7 Add scoped CSS matching project visual style (cards, shadows, borders, colors)

## 3. View

- [x] 3.1 Create `src/views/YouTubeTopVideosView.vue` with MainLayout, header (icon, title, description), and InputNumber limit control (default 5, min 3, max 10, step 1)
- [x] 3.2 Implement two side-by-side YouTubeTopVideosList instances (top-views and top-likes) with responsive layout
- [x] 3.3 Implement data fetching on mount and on limit change (reactive watch)
- [x] 3.4 Handle loading states for both requests independently
- [x] 3.5 Handle error states with useErrorHandler composable
- [x] 3.6 Add scoped CSS for view layout (header, grid, responsive)

## 4. Routing & Navigation

- [x] 4.1 Add lazy-loaded route `/youtube-top-videos` to `src/router/index.ts` with `meta: { requiresAuth: true }`
- [x] 4.2 Add "Top Vídeos YouTube" menu item with `pi-chart-bar` icon to `src/components/utils/MainLayout.vue` sidebar menu

## 5. Validation

- [x] 5.1 Run TypeScript type-check to verify no type errors
- [x] 5.2 Run linter to verify no lint errors
- [x] 5.3 Manual verification: navigate to view, confirm loading skeletons, data display, limit control, and responsive layout
