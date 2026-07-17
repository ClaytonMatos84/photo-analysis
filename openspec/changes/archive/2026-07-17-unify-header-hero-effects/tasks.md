## 1. Promover componentes para utils/

- [x] 1.1 Mover `src/components/home/HomeHeader.vue` para `src/components/utils/AppHeader.vue` (renomear classes CSS `home-header*` se necessário para evitar confusão, manter comportamento)
- [x] 1.2 Mover `src/components/home/HomeFooter.vue` para `src/components/utils/AppFooter.vue`
- [x] 1.3 Mover `src/components/home/HomeHero.vue` para `src/components/utils/PageHero.vue`, generalizando: remover título/subtítulo/CTA fixos, adicionar props `title: string`, `icon: string`, `description?: string`, `accentColor?: string`, e um `<slot />` renderizado após a descrição
- [x] 1.4 Ajustar o gradiente de fundo do `PageHero` para usar `accentColor` (com fallback para o azul padrão `#357ae8`) via style binding ou CSS var
- [x] 1.5 Atualizar todos os imports que referenciavam `HomeHeader`, `HomeFooter`, `HomeHero` para os novos caminhos/nomes (`grep -r "HomeHeader\|HomeFooter\|HomeHero" src/`)

## 2. Adicionar submenu YouTube e dropdown de usuário no AppHeader

- [x] 2.1 Importar `TieredMenu` do PrimeVue no `AppHeader` e substituir o nav-link "Análise de vídeo" por um item "YouTube" que abre o `TieredMenu` com "Análise de Vídeo" (`/youtube-analysis`) e "Top Vídeos" (`/youtube-top-videos`)
- [x] 2.2 Importar `Menu` do PrimeVue e transformar o clique no chip de usuário (desktop) em abertura de dropdown com itens "Meu Perfil" (`/profile`), "Minhas Análises" (`/results`) e "Sair" (chama `handleLogout`)
- [x] 2.3 Atualizar o `Drawer` mobile para incluir os itens "Top Vídeos" e "Minhas Análises" como itens de lista simples (mantendo estrutura plana existente, sem submenu)
- [x] 2.4 Verificar destaque de link ativo (`active-class="nav-link-active"`) continua funcionando para as rotas `/youtube-analysis` e `/youtube-top-videos` quando agrupadas no item "YouTube"

## 3. Refatorar MainLayout

- [x] 3.1 Remover do `MainLayout.vue` o header simples (`<header class="header">` com `<h1>`), a sidebar (`<aside class="sidebar">`, `Menu`, `menuItems`) e o `Drawer` de sidebar antigo, e o footer fixo antigo
- [x] 3.2 Compor `MainLayout.vue` como `<AppHeader /> <main><slot /></main> <AppFooter />`
- [x] 3.3 Remover lógica não mais usada do `MainLayout` (ex: `sidebarVisible`, `menuItems`, `isDesktop` se não for mais necessário, `handleLogout` se movido para `AppHeader`)
- [x] 3.4 Ajustar CSS do `MainLayout` para layout full-width sem `layout-body`/`sidebar`/`main-content` com margens fixas antigas

## 4. Atualizar HomeView para usar MainLayout + PageHero

- [x] 4.1 Editar `src/views/HomeView.vue` para envolver o conteúdo em `<MainLayout>` no lugar de renderizar `HomeHeader`/`HomeFooter` diretamente
- [x] 4.2 Substituir `<HomeHero />` por `<PageHero title="Análise de Mídias" icon="pi pi-images" description="...">` com o botão CTA "Começar Agora" movido para dentro do slot
- [x] 4.3 Confirmar que `HomeStats`, `HomeFeatures`, `HomeHowItWorks`, `HomeCarousel` continuam renderizando normalmente dentro do slot do `MainLayout`

## 5. Atualizar views internas para usar PageHero

- [x] 5.1 `PhotoAnalysisView.vue`: substituir `<header class="upload-header prime-header">` por `<PageHero title="Enviar imagem" icon="pi pi-upload" description="...">`, movendo `PhotoUploadForm` para dentro do slot
- [x] 5.2 `AdAnalysisView.vue`: substituir o `prime-header` por `<PageHero title="Análise de anúncio por URL" icon="pi pi-megaphone" description="..." accentColor="#10b981">`, movendo o formulário de URL e mensagens de erro para o slot
- [x] 5.3 `YouTubeAnalysisView.vue`: substituir o `prime-header` por `<PageHero title="Análise de vídeo do YouTube" icon="pi pi-youtube" description="..." accentColor="#ef4444">`, movendo o formulário de URL para o slot
- [x] 5.4 `YouTubeTopVideosView.vue`: substituir o `prime-header` por `<PageHero title="Top Vídeos do YouTube" icon="pi pi-chart-bar" description="..." accentColor="#ef4444">`, movendo o controle de limite (Slider) para o slot
- [x] 5.5 `ProfileView.vue`: substituir o `prime-header` por `<PageHero title="Meu Perfil" icon="pi pi-user" description="Visualize e edite suas informações pessoais" />`
- [x] 5.6 `PhotoAnalysisResultsView.vue`: adicionar `<PageHero title="Minhas Análises" icon="pi pi-list" description="...">` acima das Tabs (view hoje não tem nenhum header/hero)
- [x] 5.7 Remover CSS `prime-header*` duplicado das views após migração para `PageHero` (manter apenas estilos específicos de cada página, ex: `.url-form`, `.image-preview-card`)

## 6. Aplicar animações de entrada

- [x] 6.1 Confirmar que `PageHero` já aplica `v-animateonscroll` com `enterClass: 'animate-fade-slide-top'` na seção raiz (herdado da migração do `HomeHero`)
- [x] 6.2 Adicionar `v-animateonscroll="{ enterClass: 'animate-zoom-in' }"` no formulário de upload (`PhotoUploadForm` wrapper) em `PhotoAnalysisView`
- [x] 6.3 Adicionar `v-animateonscroll="{ enterClass: 'animate-zoom-in' }"` no `.url-form` de `AdAnalysisView` e `YouTubeAnalysisView`
- [x] 6.4 Adicionar `v-animateonscroll="{ enterClass: 'animate-slide-bottom' }"` em `PhotoAnalysisDashboard`, `AdAnalysisDashboard` e `YouTubeAnalysisDashboard` quando renderizados (`v-if="analysisResult"`)
- [x] 6.5 Garantir que as classes CSS `animate-zoom-in` e `animate-slide-bottom` (keyframes) estejam disponíveis nos componentes que as usam (copiar do padrão já usado em `HomeStats.vue`/`HomeFeatures.vue`, ou centralizar em um CSS compartilhado se preferível)

## 7. Validação

- [x] 7.1 Rodar `npm run type-check` e corrigir erros de tipos decorrentes das novas props/imports
- [x] 7.2 Rodar `npm run lint` (ou equivalente configurado no projeto) e corrigir violações
- [x] 7.3 Validar visualmente em mobile (<768px), tablet (768-1023px) e desktop (≥1024px): header, submenu YouTube, dropdown de usuário, drawer mobile, hero de cada página, footer
- [x] 7.4 Validar navegação: todos os links do nav, submenu YouTube, dropdown de usuário e drawer mobile levam às rotas corretas
- [x] 7.5 Validar que `grep -r "HomeHeader\|HomeFooter\|HomeHero\|class=\"prime-header\"" src/` não retorna mais ocorrências órfãs (nota: `prime-header` permanece em `PhotoAnalysisResults.vue`, `AdAnalysisResults.vue` e `YouTubeAnalysisResults.vue` — headers internos de cada aba de `PhotoAnalysisResultsView`, fora do escopo desta change; decisão validada com o usuário)
