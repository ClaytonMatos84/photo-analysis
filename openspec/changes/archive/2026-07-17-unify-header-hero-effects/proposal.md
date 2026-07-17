## Why

A nova HomeView (`src/views/HomeView.vue`) ganhou um header rico com navegação (`HomeHeader.vue`), um hero com gradiente e CTA (`HomeHero.vue`), animações de entrada via `v-animateonscroll`, e um footer temático (`HomeFooter.vue`). As demais páginas internas (Foto, Anúncio, YouTube, Top Vídeos, Perfil, Resultados) ainda usam o `MainLayout.vue` antigo — header genérico com apenas um título, sidebar fixa com `Menu` do PrimeVue, e um `prime-header` estático sem gradiente ou animação. O resultado é uma experiência visual inconsistente entre a home e o restante do app. Queremos levar a identidade visual da home (header, hero, efeitos, footer) para todas as páginas internas.

## What Changes

- **BREAKING**: `MainLayout.vue` é refatorado para usar o header rico (nav com links, drawer mobile, user chip) e o footer temático no lugar do header simples + sidebar `Menu` + footer fixo atuais. A sidebar lateral é removida; toda navegação passa a viver no header.
- `HomeHeader.vue` é renomeado/promovido para `src/components/utils/AppHeader.vue`, passando a ser usado pelo `MainLayout` (e não mais direto pela `HomeView`).
- `HomeFooter.vue` é renomeado/promovido para `src/components/utils/AppFooter.vue`, com o mesmo motivo.
- `HomeHero.vue` é generalizado e renomeado para `src/components/utils/PageHero.vue`, recebendo props `title`, `icon`, `description` e `accentColor` (sem CTA fixo — CTA passa a ser conteúdo opcional via slot). A home usa `PageHero` com CTA via slot; as demais páginas usam `PageHero` apenas com título/descrição.
- O nav do `AppHeader` ganha um submenu "YouTube" (via `TieredMenu` do PrimeVue) agrupando "Análise de Vídeo" e "Top Vídeos", e o user chip (desktop) ganha um dropdown (via `Menu` do PrimeVue) com "Meu Perfil", "Minhas Análises" e "Sair". O drawer mobile lista todos os itens explicitamente (sem submenu).
- As views `PhotoAnalysisView`, `AdAnalysisView`, `YouTubeAnalysisView`, `YouTubeTopVideosView`, `ProfileView` e `PhotoAnalysisResultsView` substituem o bloco `<header class="prime-header">` estático pelo componente `PageHero`, mantendo o formulário/conteúdo específico de cada página como slot/conteúdo abaixo do hero.
- `HomeView.vue` passa a se apoiar no `MainLayout` refatorado (que já injeta `AppHeader`/`AppFooter`), em vez de renderizar `HomeHeader`/`HomeFooter` diretamente. O hero da home (`HomeHero`) é substituído pelo uso de `PageHero` com o CTA "Começar Agora" via slot.
- É adicionada a animação `v-animateonscroll` (`fadeSlideTop`) em todas as instâncias de `PageHero`, `zoom-in` nos formulários de entrada de cada página (`PhotoUploadForm`, campo de URL em Anúncio/YouTube), e `slide-bottom` nos dashboards de resultado (`PhotoAnalysisDashboard`, `AdAnalysisDashboard`, `YouTubeAnalysisDashboard`) quando o resultado é exibido.
- `HomeStats.vue`, `HomeFeatures.vue`, `HomeHowItWorks.vue` e `HomeCarousel.vue` permanecem em `src/components/home/` — são específicos da home e não migram.

## Capabilities

### New Capabilities
- `shared-app-shell`: cobre o `MainLayout` refatorado, `AppHeader` (nav com submenu YouTube e dropdown de usuário), `AppFooter` e o componente reutilizável `PageHero`, usados por todas as páginas autenticadas.

### Modified Capabilities
- `home-landing-page`: a home deixa de renderizar `HomeHeader`/`HomeFooter` próprios e passa a usar o `MainLayout` (com `AppHeader`/`AppFooter`) como as demais páginas; o hero da home passa a usar o componente genérico `PageHero` em vez de `HomeHero`; os requisitos "MainLayout atualizado" (header title fixo + menu de sidebar) são substituídos pelo novo comportamento do `MainLayout` compartilhado.

## Impact

- **Componentes renomeados/movidos**: `src/components/home/HomeHeader.vue` → `src/components/utils/AppHeader.vue`; `src/components/home/HomeFooter.vue` → `src/components/utils/AppFooter.vue`; `src/components/home/HomeHero.vue` → `src/components/utils/PageHero.vue`.
- **Componente refatorado**: `src/components/utils/MainLayout.vue` (remove header/sidebar/footer antigos, passa a compor `AppHeader` + `<slot>` + `AppFooter`).
- **Views ajustadas**: `src/views/HomeView.vue`, `src/views/PhotoAnalysisView.vue`, `src/views/AdAnalysisView.vue`, `src/views/YouTubeAnalysisView.vue`, `src/views/YouTubeTopVideosView.vue`, `src/views/ProfileView.vue`, `src/views/PhotoAnalysisResultsView.vue`.
- **Dependências**: nenhuma nova lib; usa `primevue/tieredmenu` e `primevue/menu` (já disponíveis via PrimeVue instalado) e a directive `animateonscroll` (já registrada em `main.ts`).
- **Rotas**: nenhuma rota nova ou removida; apenas reorganização de onde os links aparecem na navegação (submenu YouTube, dropdown de usuário).
- **Specs existentes**: `openspec/specs/home-landing-page/spec.md` precisa de delta spec removendo/atualizando os requisitos "Home landing page full-width" (não é mais "sem MainLayout") e "MainLayout atualizado" (sidebar/menu antigos deixam de existir).

## Non-goals

- Não altera regras de negócio, chamadas de API, services ou stores — é uma mudança puramente de apresentação/composição de UI.
- Não introduz testes automatizados novos (projeto não possui suíte de testes; validação continua manual + type-check/lint).
- Não altera o fluxo de autenticação, guards de rota ou o formato do JWT/localStorage.
- Não redesenha o conteúdo interno dos dashboards de análise (`PhotoAnalysisDashboard`, `AdAnalysisDashboard`, `YouTubeAnalysisDashboard`) além de adicionar a animação de entrada.
- Não adiciona novas rotas ou páginas.
