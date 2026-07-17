# Home Landing Page

## Purpose

Landing page que serve como ponto de entrada pós-login, renderizada dentro do `MainLayout` compartilhado (com `AppHeader`/`AppFooter`), apresentando as capacidades de análise de mídias (foto, anúncio, YouTube) e dando acesso rápido a cada funcionalidade.

## Requirements

### Requirement: Home landing page com MainLayout compartilhado
A HomeView SHALL renderizar dentro de `MainLayout` (com `AppHeader` e `AppFooter` compartilhados com as demais páginas autenticadas), em vez de renderizar header/footer próprios sem `MainLayout`. A home SHALL conter 5 seções na ordem: Hero (via `PageHero`), Stats, Feature Cards, How It Works, Carousel.

#### Scenario: Usuário autenticado acessa a raiz
- **WHEN** usuário autenticado navega para `/`
- **THEN** sistema renderiza HomeView dentro de `MainLayout`, com `AppHeader` no topo, `AppFooter` no rodapé, e as 5 seções visíveis entre eles

#### Scenario: Navegação para análise de foto
- **WHEN** usuário clica no CTA "Começar Agora" ou no card de Feature "Análise de foto"
- **THEN** sistema navega para `/photo-analysis`

### Requirement: Hero section com CTA via PageHero
A Hero section da HomeView SHALL usar o componente reutilizável `PageHero` (título "Análise de Mídias", ícone `pi pi-images`, descrição sobre IA) e SHALL passar o botão CTA "Começar Agora" através do slot do `PageHero`. A section SHALL manter o background com gradiente do `PageHero`.

#### Scenario: Hero renderiza conteúdo
- **WHEN** HomeView monta
- **THEN** `PageHero` exibe título "Análise de Mídias", descrição contendo "inteligência artificial", e o botão "Começar Agora" é renderizado via slot dentro do hero

#### Scenario: CTA navigation
- **WHEN** usuário clica em "Começar Agora"
- **THEN** router navega para `/photo-analysis`

### Requirement: MainLayout sem header/menu específicos da home
O `MainLayout` usado pela HomeView SHALL ser o mesmo componente compartilhado por todas as views autenticadas (`AppHeader` com nav + submenu YouTube + dropdown de usuário, `AppFooter` unificado), sem um header title fixo "Análise de mídias" nem menu de sidebar específico.

#### Scenario: Header consistente com as demais páginas
- **WHEN** HomeView renderiza
- **THEN** o header exibido é o `AppHeader` compartilhado (logo, nav com links, submenu YouTube, chip/dropdown de usuário), idêntico ao usado em `/photo-analysis`, `/ad-analysis`, etc.

#### Scenario: Sem sidebar na home
- **WHEN** HomeView renderiza
- **THEN** nenhum menu lateral (sidebar) é exibido; a navegação ocorre via `AppHeader`

### Requirement: Stats section com dados reais
A Stats section SHALL exibir contagem total de análises de cada tipo (foto, anúncio, YouTube) usando MeterGroup do PrimeVue. Os dados SHALL ser obtidos via `PhotoAnalysisService.listResults(1,1)`, `AdAnalysisService.listResults(1,1)` e `YouTubeAnalysisService.listResults(1,1)` — usando o campo `total` da resposta.

#### Scenario: Stats com dados disponíveis
- **WHEN** os 3 services retornam sucesso com totals {foto: 47, anuncio: 12, youtube: 23}
- **THEN** stats section exibe 3 cards com contagens 47, 12, 23 e MeterGroup proporcional

#### Scenario: Stats com service falhando
- **WHEN** um dos services falha (ex: AdAnalysisService rejeita)
- **THEN** stats section exibe contagem 0 para aquele tipo, sem bloquear renderização dos demais

#### Scenario: Stats loading state
- **WHEN** services ainda estão carregando
- **THEN** stats section exibe indicador de loading (ProgressSpinner ou skeleton)

### Requirement: Feature cards de navegação
A Features section SHALL exibir 3 Cards PrimeVue (foto, anúncio, YouTube), cada um com ícone, Tag badge, descrição e botão "Acessar" que navega para a rota correspondente (`/photo-analysis`, `/ad-analysis`, `/youtube-analysis`).

#### Scenario: Card de foto
- **WHEN** usuário clica "Acessar" no card "Análise de foto"
- **THEN** router navega para `/photo-analysis`

#### Scenario: Card de anúncio
- **WHEN** usuário clica "Acessar" no card "Análise de anúncio"
- **THEN** router navega para `/ad-analysis`

#### Scenario: Card de YouTube
- **WHEN** usuário clica "Acessar" no card "Análise de vídeo"
- **THEN** router navega para `/youtube-analysis`

### Requirement: How It Works section
A How It Works section SHALL exibir 3 passos (1. Upload/URL, 2. IA Analisa, 3. Resultado) com Avatares circulares PrimeVue contendo ícones e textos descritivos.

#### Scenario: Passos visíveis
- **WHEN** HomeView monta
- **THEN** section exibe 3 passos numerados com ícones e descrições em português

### Requirement: Carousel de últimas análises
A Carousel section SHALL exibir últimas análises do usuário em cards dentro de um Carousel PrimeVue. Dados SHALL ser obtidos via `listResults(1,5)` de cada service, combinados e ordenados por data. Cada card SHALL ter Tag indicando o tipo e botão "Ver detalhes" navegando para `/results`.

#### Scenario: Carousel com análises disponíveis
- **WHEN** services retornam análises recentes
- **THEN** carousel exibe cards com tipo, resumo e botão "Ver detalhes"

#### Scenario: Carousel sem análises
- **WHEN** nenhum service retorna resultados
- **THEN** carousel exibe mensagem "Nenhuma análise realizada ainda"

#### Scenario: Carousel navigation
- **WHEN** usuário clica nas setas do carousel
- **THEN** carousel navega entre os cards de análise

### Requirement: Home responsiva mobile-first
A HomeView SHALL ser responsiva usando abordagem mobile-first. CSS base SHALL ser para mobile (< 768px), com progressive enhancement via `@media (min-width: 768px)` para tablet e `@media (min-width: 1024px)` para desktop.

#### Scenario: Layout mobile
- **WHEN** viewport width < 768px
- **THEN** hero: texto 1.8rem, botão full-width; stats: cards empilhados vertical; features: cards empilhados; how-it-works: passos vertical; carousel: 1 item visível; header: hamburger + Drawer

#### Scenario: Layout desktop
- **WHEN** viewport width ≥ 1024px
- **THEN** hero: texto 3rem, botão auto-width; stats: 3 cards em row; features: 3 colunas; how-it-works: 3 passos horizontal com setas; carousel: 3 itens visíveis; header: navbar horizontal com links

### Requirement: AnimateOnScroll registrado globalmente
A directive AnimateOnScroll do PrimeVue SHALL ser registrada globalmente em `main.ts` via `app.directive('animateonscroll', AnimateOnScroll)`. As seções da home SHALL usar `v-animateonscroll` com animações de entrada (fade, slide, zoom).

#### Scenario: Directive disponível
- **WHEN** app inicializa
- **THEN** `v-animateonscroll` está disponível em qualquer componente

#### Scenario: Animações ao scroll
- **WHEN** usuário scrolla e uma seção entra no viewport
- **THEN** seção anima com fade-in + slide/zoom conforme configuração

### Requirement: Análise de foto em rota dedicada
A análise de foto (upload + display + dashboard) SHALL ser movida para a rota `/photo-analysis` com view `PhotoAnalysisView.vue`. O conteúdo SHALL ser idêntico ao HomeView atual.

#### Scenario: Rota photo-analysis acessível
- **WHEN** usuário autenticado navega para `/photo-analysis`
- **THEN** sistema renderiza PhotoAnalysisView com PhotoUploadForm, PhotoDisplay e PhotoAnalysisDashboard

#### Scenario: Rota não autenticada
- **WHEN** usuário não autenticado navega para `/photo-analysis`
- **THEN** router guard redireciona para `/login`

