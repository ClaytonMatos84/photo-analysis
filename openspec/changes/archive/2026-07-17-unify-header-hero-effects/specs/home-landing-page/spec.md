## MODIFIED Requirements

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
