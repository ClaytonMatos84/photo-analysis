## Why

Atualmente não existe uma forma visual de ver quais vídeos do YouTube analisados têm melhor desempenho. O usuário só pode consultar análises individuais ou a lista paginada, sem uma visão de ranking por visualizações ou likes. Uma view de top vídeos dá visibilidade imediata sobre os destaques das análises.

## What Changes

- Nova view `YouTubeTopVideosView.vue` com ranking side-by-side de Top Views e Top Likes
- Novo componente `YouTubeTopVideosList.vue` usando PrimeVue `DataView` com thumbnails, posição (🥇🥈🥉), métricas formatadas (padrão BR) e link para assistir
- Novos métodos no `YouTubeAnalysisService.ts`: `getTopViews(limit)` e `getTopLikes(limit)`
- Novos tipos em `YouTubeAnalysisTypes.ts`: `YouTubeTopVideo` e `YouTubeTopVideosResponse`
- Nova rota `/youtube-top-videos` no router
- Novo item no menu lateral após "Análise de vídeo YouTube"
- Controle de limite via `InputNumber` do PrimeVue (default: 5)
- Skeleton placeholders durante loading
- Números formatados no padrão brasileiro (1.000.000)

## Capabilities

### New Capabilities
- `youtube-top-videos-ranking`: Exibição de ranking dos vídeos mais assistidos (top-views) e mais curtidos (top-likes) das análises do YouTube, com thumbnails, posição, métricas e navegação para assistir

### Modified Capabilities

## Impact

- **src/types/YouTubeAnalysisTypes.ts**: adição de 2 interfaces
- **src/services/YouTubeAnalysisService.ts**: adição de 2 métodos estáticos
- **src/components/youtube/**: novo componente `YouTubeTopVideosList.vue`
- **src/views/**: nova view `YouTubeTopVideosView.vue`
- **src/router/index.ts**: nova rota lazy-loaded
- **src/components/utils/MainLayout.vue**: novo item no menu lateral
- Dependência API: endpoints `/youtube-analysis/top-views` e `/youtube-analysis/top-likes` (query param `?limit=N`)

## Non-goals

- Não implementar paginação nos rankings (o limite controla quantos结果 retornar)
- Não implementar cache ou store Pinia para os dados de top
- Não implementar ordenação customizada pelo usuário (a ordem vem da API)
- Não criar testes automatizados (projeto não possui suite de testes)
- Não refatorar a duplicação de auth header nos métodos existentes do service
