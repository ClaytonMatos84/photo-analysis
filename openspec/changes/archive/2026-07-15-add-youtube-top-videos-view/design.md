## Context

The project has a YouTube analysis flow where users submit video URLs and get back metadata (views, likes, author, etc.). Currently the only way to browse results is via a paginated DataTable (`YouTubeAnalysisResults.vue`) or individual analysis detail. There is no ranking or "top N" view.

The backend already exposes two endpoints:
- `GET /youtube-analysis/top-views?limit=N`
- `GET /youtube-analysis/top-likes?limit=N`

Both return `{ metric, totalReturned, videos: [...] }` where each video has `id`, `youtubeUrl`, `videoId`, `title`, `author`, `viewCount`, `likeCount`, `createdAt`.

## Goals / Non-Goals

**Goals:**
- Create a dedicated view showing top-views and top-likes rankings side-by-side
- Reuse PrimeVue DataView component with custom list template for each ranking
- YouTube thumbnails for visual richness (free, no API cost)
- Brazilian number formatting (1.000.000)
- Skeleton placeholders during loading
- Rank position indicators (🥇🥈🥉 for top 3, number for rest)
- InputNumber control for limit with default 5
- Follow existing project patterns (MainLayout, SectionTitle, service layer, types)

**Non-Goals:**
- Pagination within each ranking (limit param controls result count)
- Pinia store for top videos data (component-local state is sufficient)
- User-defined sort order (API defines order)
- Caching or offline support
- Test suite (project has no automated tests)

## Decisions

### 1. Use PrimeVue DataView with `layout="list"` template

**Decision**: Use `DataView` with custom `#list` slot template for each ranking list.

**Rationale**: DataView provides built-in `loading` prop (enables skeleton), `#empty` slot for zero-state, and semantic structure. The `#list` slot gives full control over item rendering (thumbnail, rank badge, metrics, link). Alternative: manual v-for with cards — simpler but misses skeleton/empty states for free.

**Alternative considered**: DataTable (already used in `YouTubeAnalysisResults.vue`) — rows don't suit a ranking card layout with thumbnails.

### 2. Reusable `YouTubeTopVideosList.vue` component

**Decision**: Create a single component that receives `videos`, `metric`, and `loading` as props, used twice in the view (once for views, once for likes).

**Rationale**: Avoids template duplication. The component handles: DataView rendering, rank position logic, thumbnail URL construction, number formatting, and link behavior.

### 3. YouTube thumbnails via img.youtube.com

**Decision**: Use `https://img.youtube.com/vi/{videoId}/mqdefault.jpg` for medium-quality thumbnails.

**Rationale**: Free, no API key required, always available for public videos. `mqdefault` (320x180) is good for card layout. Alternative: store thumbnails from API response — not available in current API contract.

### 4. Number formatting with Intl.NumberFormat('pt-BR')

**Decision**: Use `Intl.NumberFormat('pt-BR')` for metric display (e.g., 1.115.427).

**Rationale**: Native browser API, no dependencies, correctly handles Brazilian locale (dot as thousands separator). Consistent with existing `formatDate` pattern using `Intl.DateTimeFormat('pt-BR')`.

### 5. Service methods follow existing pattern

**Decision**: New `getTopViews(limit)` and `getTopLikes(limit)` methods follow the same auth header pattern as existing methods in `YouTubeAnalysisService.ts`.

**Rationale**: Consistency with existing code. While the Axios interceptor already injects the header, the existing methods explicitly set it — keeping this pattern avoids a subtle refactor mid-feature.

### 6. Route and menu placement

**Decision**: Route `/youtube-top-videos` lazy-loaded. Menu item "Top Vídeos YouTube" with `pi-chart-bar` icon, placed after "Análise de vídeo YouTube".

**Rationale**: Follows the router lazy-loading pattern. `pi-chart-bar` signals ranking/analytics. Placement groups YouTube features together in the nav.

## Risks / Trade-offs

- **Thumbnail availability**: If a video is deleted or made private, the thumbnail URL may 404 → **Mitigation**: Handle `<img @error>` to show a fallback placeholder
- **API contract assumes `viewCount`/`likeCount` as number**: The existing types use `string`, but the top endpoints return `number` → **Mitigation**: New types (`YouTubeTopVideo`) use `number` for these fields, matching actual API response
- **No loading state coordination**: Two parallel API calls (top-views + top-likes) → each manages its own loading independently via the DataView `loading` prop
