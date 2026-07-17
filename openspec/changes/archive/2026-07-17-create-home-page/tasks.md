## 1. Setup e Infraestrutura

- [x] 1.1 Registrar directive AnimateOnScroll no main.ts: `import AnimateOnScroll from 'primevue/animateconsroll'` + `app.directive('animateonscroll', AnimateOnScroll)`
- [x] 1.2 Criar `src/views/PhotoAnalysisView.vue` movendo conteúdo atual de HomeView.vue (upload de foto + PhotoUploadForm + PhotoDisplay + PhotoAnalysisDashboard + estilos)
- [x] 1.3 Adicionar rota `/photo-analysis` no router apontando para PhotoAnalysisView (lazy-load), com `meta: { requiresAuth: true }`

## 2. HomeHeader Component

- [x] 2.1 Criar `src/components/utils/HomeHeader.vue` com `<script setup lang="ts">`
- [x] 2.2 Implementar header responsivo: mobile (logo + hamburger Button + Drawer com menu), desktop (logo + links inline/MenuBar + Chip do usuário)
- [x] 2.3 Menu items: Início → `/`, Análise de foto → `/photo-analysis`, Análise de anúncio → `/ad-analysis`, Análise de vídeo → `/youtube-analysis`, Meu Perfil → `/profile`, Sair (clearToken + push login)
- [x] 2.4 Estilos mobile-first com breakpoints 768px e 1024px (hamburger some em 1024px, links inline aparecem)

## 3. HomeView — Hero Section

- [x] 3.1 Reescrever `src/views/HomeView.vue` removendo MainLayout e conteúdo antigo
- [x] 3.2 Implementar Hero section: título "Análise de Mídias", subtítulo sobre IA, botão CTA "Começar Agora" com router.push('/photo-analysis'), background com gradiente
- [x] 3.3 Estilos mobile-first: mobile (texto 1.8rem, btn full-width, padding 1.5rem 1rem), desktop (texto 3rem, btn auto-width, padding 4rem 3rem)
- [x] 3.4 Adicionar `v-animateonscroll` com fade-in + slide-from-top na Hero section

## 4. HomeView — Stats Section

- [x] 4.1 Criar `src/composables/useHomeStats.ts` que chama `listResults(1,1)` dos 3 services via `Promise.allSettled`, extrai `.total`, retorna refs reativos (photoCount, adCount, youtubeCount, loading)
- [x] 4.2 Implementar Stats section: 3 Cards com MeterGroup PrimeVue mostrando contagem de cada tipo de análise
- [x] 4.3 Loading state: ProgressSpinner enquanto services carregam
- [x] 4.4 Estilos mobile-first: mobile (cards empilhados vertical), desktop (3 cards em row)
- [x] 4.5 Adicionar `v-animateonscroll` com zoom-in staggered nos stats cards

## 5. HomeView — Features Cards

- [x] 5.1 Implementar Features section: 3 Cards PrimeVue (foto, anúncio, YouTube) com ícone, Tag badge (ex: "IA", "Popular"), descrição e Button "Acessar" navegando para rota correspondente
- [x] 5.2 Estilos mobile-first: mobile (cards empilhados), tablet (2+1 grid), desktop (3 colunas equal)
- [x] 5.3 Adicionar `v-animateonscroll` com slide-from-left/right staggered nos feature cards

## 6. HomeView — How It Works

- [x] 6.1 Implementar How It Works section: 3 passos (Upload/URL, IA Analisa, Resultado) com Avatar PrimeVue circulares contendo ícones (pi-upload, pi-sparkles/pi-cog, pi-chart-bar) e textos descritivos
- [x] 6.2 Estilos mobile-first: mobile (passos vertical com números), desktop (passos horizontal com setas entre Avatares)
- [x] 6.3 Adicionar `v-animateonscroll` com slide-from-bottom staggered nos passos

## 7. HomeView — Carousel

- [x] 7.1 Criar `src/composables/useRecentAnalyses.ts` que chama `listResults(1,5)` dos 3 services, combina e ordena por data, retorna ref reativo com array tipado
- [x] 7.2 Implementar Carousel section: Carousel PrimeVue com Cards mostrando tipo (Tag), título resumido e botão "Ver detalhes" → `/results`
- [x] 7.3 Estado vazio: exibir mensagem "Nenhuma análise realizada ainda" quando não há resultados
- [x] 7.4 Estilos mobile-first: mobile (1 item visível), tablet (2 itens), desktop (3 itens visíveis)
- [x] 7.5 Adicionar `v-animateonscroll` com fade-in no carousel section

## 8. HomeView — Footer e Integração

- [x] 8.1 Adicionar footer simples na HomeView (copyright, link para profile)
- [x] 8.2 HomeView compõe: HomeHeader + Hero + Stats + Features + HowItWorks + Carousel + Footer (tudo sem MainLayout)
- [x] 8.3 Garantir que scroll suave funciona entre seções (scroll-behavior: smooth no container)

## 9. MainLayout e Router Updates

- [x] 9.1 Atualizar MainLayout header title de "Análise de imagem" para "Análise de mídias"
- [x] 9.2 Atualizar menu items: renomear "Enviar Análise" para "Início" com icon `pi-home` e rota `/`, adicionar "Análise de foto" com icon `pi-upload` e rota `/photo-analysis`
- [x] 9.3 Verificar router guard: `/` continua com `requiresAuth: true`, `/photo-analysis` também

## 10. Validação

- [x] 10.1 Executar `npx vue-tsc --noEmit` para type-check sem erros
- [x] 10.2 Executar lint do projeto sem erros
- [x] 10.3 Validar manualmente: login → home renderiza com 5 seções, navegação funciona, stats carregam dados reais, carousel funciona, responsive em mobile/desktop
