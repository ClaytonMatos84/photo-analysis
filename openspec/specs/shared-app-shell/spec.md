# Shared App Shell

## Purpose

Casca de aplicação compartilhada por todas as views autenticadas: um `MainLayout` sem sidebar que compõe `AppHeader` (navegação, submenu YouTube, dropdown de usuário) e `AppFooter` unificado, além do componente reutilizável `PageHero` para as seções de destaque de cada página e das convenções de animação de entrada usadas em formulários e dashboards de resultado.

## Requirements

### Requirement: MainLayout compartilhado com AppHeader e AppFooter
O `MainLayout.vue` SHALL renderizar `AppHeader` no topo, um `<slot>` para o conteúdo da página, e `AppFooter` no rodapé, sem sidebar. Todas as views autenticadas (Home, Análise de Foto, Análise de Anúncio, Análise de Vídeo, Top Vídeos, Perfil, Resultados) SHALL usar `MainLayout` como wrapper.

#### Scenario: Estrutura do layout
- **WHEN** qualquer view autenticada monta dentro de `MainLayout`
- **THEN** `AppHeader` é renderizado antes do slot e `AppFooter` é renderizado depois do slot, sem elementos de sidebar

#### Scenario: Sidebar removida
- **WHEN** `MainLayout` renderiza
- **THEN** nenhum elemento de sidebar/menu lateral (`Menu` do PrimeVue fixo) é exibido; a navegação ocorre inteiramente via `AppHeader`

### Requirement: AppHeader com navegação, submenu YouTube e dropdown de usuário
O `AppHeader` (`src/components/utils/AppHeader.vue`) SHALL exibir logo clicável (navega para `/`), nav desktop com links para Início, Análise de Foto, Análise de Anúncio, e um item "YouTube" que expande um submenu (`TieredMenu` do PrimeVue) com "Análise de Vídeo" (`/youtube-analysis`) e "Top Vídeos" (`/youtube-top-videos`). No desktop, o chip do usuário SHALL abrir um dropdown (`Menu` do PrimeVue) ao clique com os itens "Meu Perfil" (`/profile`), "Minhas Análises" (`/results`) e "Sair". Em mobile (< 1024px), o header SHALL exibir um botão hambúrguer que abre um `Drawer` com todos os itens de navegação e de usuário listados de forma plana (sem submenu/dropdown).

#### Scenario: Navegação desktop com submenu YouTube
- **WHEN** viewport ≥ 1024px e usuário clica no item "YouTube" do nav
- **THEN** um `TieredMenu` abre exibindo "Análise de Vídeo" e "Top Vídeos"; clicar em qualquer um navega para a rota correspondente e fecha o menu

#### Scenario: Dropdown de usuário desktop
- **WHEN** viewport ≥ 1024px e usuário clica no chip de usuário
- **THEN** um `Menu` abre exibindo "Meu Perfil", "Minhas Análises" e "Sair"; clicar em "Sair" limpa o token de autenticação e navega para `/login`

#### Scenario: Drawer mobile com itens planos
- **WHEN** viewport < 1024px e usuário clica no botão hambúrguer
- **THEN** um `Drawer` abre com os itens: Início, Análise de Foto, Análise de Anúncio, Análise de Vídeo, Top Vídeos, Meu Perfil, Minhas Análises, Sair — todos como itens de lista simples, sem agrupamento em submenu

#### Scenario: Link ativo destacado
- **WHEN** usuário está na rota `/photo-analysis`
- **THEN** o nav-link "Análise de Foto" recebe destaque visual (classe ativa)

### Requirement: AppFooter unificado
O `AppFooter` (`src/components/utils/AppFooter.vue`) SHALL exibir o mesmo conteúdo/estilo do footer temático da home (fundo escuro, copyright com ano atual, link para "Meu Perfil") em todas as páginas que usam `MainLayout`.

#### Scenario: Footer consistente entre páginas
- **WHEN** qualquer view autenticada renderiza via `MainLayout`
- **THEN** o footer exibido é idêntico (mesmo componente `AppFooter`) independente da página

### Requirement: PageHero reutilizável
O `PageHero` (`src/components/utils/PageHero.vue`) SHALL aceitar as props `title` (string, obrigatório), `icon` (string, classe do PrimeIcons, obrigatório), `description` (string, opcional) e `accentColor` (string, opcional, cor do gradiente de fundo). O componente SHALL expor um slot padrão para conteúdo adicional (ex: botão CTA, formulário de entrada) renderizado abaixo do título/descrição. O componente SHALL aplicar `v-animateonscroll` com `enterClass: 'animate-fade-slide-top'` na seção raiz.

#### Scenario: PageHero com props mínimas
- **WHEN** uma view usa `<PageHero title="Análise de Foto" icon="pi pi-upload" description="Envie uma imagem..." />` sem slot
- **THEN** o componente renderiza ícone, título e descrição com gradiente de fundo, sem conteúdo adicional

#### Scenario: PageHero com conteúdo via slot
- **WHEN** uma view usa `<PageHero title="Análise de Mídias" icon="pi pi-images"><Button label="Começar Agora" /></PageHero>`
- **THEN** o botão é renderizado dentro da seção do hero, abaixo do título/descrição

#### Scenario: Animação de entrada
- **WHEN** o `PageHero` entra no viewport durante o scroll
- **THEN** a seção anima com a classe `animate-fade-slide-top` (fade + slide de cima para baixo)

### Requirement: Animação de entrada em formulários e dashboards de resultado
Os formulários de entrada de cada página de análise (`PhotoUploadForm`, campo de URL em Análise de Anúncio, campo de URL em Análise de Vídeo) SHALL usar `v-animateonscroll` com `enterClass: 'animate-zoom-in'`. Os dashboards de resultado (`PhotoAnalysisDashboard`, `AdAnalysisDashboard`, `YouTubeAnalysisDashboard`) SHALL usar `v-animateonscroll` com `enterClass: 'animate-slide-bottom'` quando exibidos após uma análise concluída.

#### Scenario: Formulário anima ao entrar no viewport
- **WHEN** a página de Análise de Foto/Anúncio/Vídeo monta e o formulário de entrada entra no viewport
- **THEN** o formulário anima com `animate-zoom-in`

#### Scenario: Dashboard de resultado anima ao aparecer
- **WHEN** uma análise é concluída e o dashboard de resultado correspondente é renderizado
- **THEN** o dashboard anima com `animate-slide-bottom`
