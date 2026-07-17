## Context

Hoje existem dois "shells" visuais coexistindo no app:

1. **HomeView** (novo, rico): renderiza `HomeHeader` + `HomeHero` + seções específicas + `HomeFooter` diretamente, sem passar por `MainLayout`. Tem nav com links, drawer mobile, user chip, hero com gradiente/CTA, animações `v-animateonscroll` e footer temático escuro.
2. **Demais views autenticadas** (Foto, Anúncio, YouTube, Top Vídeos, Perfil, Resultados): usam `MainLayout.vue`, que renderiza um header simples (só título "Análise de mídias" + chip de usuário), uma sidebar fixa com `Menu` do PrimeVue (desktop) / `Drawer` (mobile), e um footer fixo simples. Cada view then desenha seu próprio `<header class="prime-header">` estático como "hero" da página, sem animação.

O objetivo é eliminar essa duplicação: um único shell (`MainLayout`) compartilhado por todas as páginas autenticadas, incluindo a Home, usando os componentes visuais já validados na home.

## Goals / Non-Goals

**Goals:**
- Um único `MainLayout` usado por todas as views autenticadas (Home incluída), compondo `AppHeader` (topo) + `<slot>` + `AppFooter` (rodapé).
- `AppHeader` e `AppFooter` são versões promovidas/renomeadas de `HomeHeader`/`HomeFooter`, movidas para `src/components/utils/` por serem genéricas.
- `PageHero` é um componente reutilizável (promovido de `HomeHero`) em `src/components/utils/`, parametrizado por `title`, `icon`, `description` e `accentColor`, com um slot opcional para conteúdo extra (ex: CTA da home, formulário de upload/URL).
- Navegação da sidebar antiga é totalmente substituída pelo nav do `AppHeader`: submenu "YouTube" (TieredMenu) agrupa Análise de Vídeo + Top Vídeos; dropdown do user chip (Menu) agrupa Meu Perfil + Minhas Análises + Sair (apenas desktop — no drawer mobile os itens continuam explícitos e planos).
- Animação `v-animateonscroll` com `fadeSlideTop` em todo `PageHero`; `zoom-in` nos formulários de entrada (upload de foto, inputs de URL); `slide-bottom` nos dashboards de resultado quando exibidos.
- Nenhuma mudança de comportamento de negócio, API ou autenticação.

**Non-Goals:**
- Não é uma refatoração de design system completa (cores, tipografia) — reaproveita os estilos já existentes na home.
- Não introduz testes automatizados.
- Não altera o conteúdo interno dos dashboards de análise além de adicionar animação de entrada.
- Não muda rotas existentes nem adiciona rotas novas.

## Decisions

### 1. `MainLayout` absorve `AppHeader` + `AppFooter`, sidebar é removida
A sidebar (`Menu` do PrimeVue com item por rota) fica redundante quando o `AppHeader` já expõe todas as rotas via nav + submenu. Removê-la simplifica o layout (`layout-body` com `sidebar` + `main-content` vira apenas `<slot>` full-width dentro do header/footer) e elimina duplicação de links de navegação (hoje a sidebar e o header não estão sincronizados).
**Alternativa considerada**: manter a sidebar como navegação secundária/contextual. Rejeitada porque o usuário confirmou explicitamente que o nav do header (com submenu) cobre todas as rotas, e manter duas navegações paralelas geraria inconsistência.

### 2. `HomeHero` generalizado para `PageHero` via props + slot, sem CTA fixo
O CTA "Começar Agora" é específico da home. Extraí-lo do componente e movê-lo para o slot padrão do `PageHero` mantém o componente genérico. As demais páginas passam apenas `title`/`icon`/`description` e usam o slot para o formulário específico (upload de foto, input de URL de anúncio/YouTube) quando aplicável — replicando a estrutura visual (gradiente + texto) sem forçar conteúdo.
**Alternativa considerada**: manter `HomeHero` intocado e criar um `PageHero` novo do zero. Rejeitado — geraria duplicação de CSS/gradiente; melhor evoluir o componente existente já que a estrutura visual é idêntica.

### 3. Submenu "YouTube" via `TieredMenu`, dropdown de usuário via `Menu` (ambos PrimeVue, clique)
Ambos os componentes já fazem parte do PrimeVue instalado (mesma lib usada em `MainLayout` atual para `Menu`), evitando nova dependência. Ativação por clique (não hover) é mais previsível em telas touch e consistente com o padrão de `Drawer`/`Menu` já usado no projeto.
**Alternativa considerada**: implementar dropdown customizado com CSS puro. Rejeitado — reinventa funcionalidade (posicionamento, acessibilidade, fechar ao clicar fora) que o PrimeVue já resolve.

### 4. Renomear em vez de duplicar: `Home*` → `App*`/`Page*` em `utils/`
Em vez de criar componentes novos do zero e manter os antigos "mortos" em `components/home/`, os três componentes (`HomeHeader`, `HomeFooter`, `HomeHero`) são movidos para `components/utils/` com nomes genéricos (`AppHeader`, `AppFooter`, `PageHero`), seguindo a convenção já usada por `SectionTitle.vue` (utilitário compartilhado). Os componentes que permanecem exclusivos da home (`HomeStats`, `HomeFeatures`, `HomeHowItWorks`, `HomeCarousel`) continuam em `components/home/`.
**Alternativa considerada**: duplicar componentes (manter versões "Home" e criar versões "App" separadas). Rejeitado — geraria manutenção duplicada de CSS/lógica para um componente visualmente idêntico.

### 5. `HomeView` passa a usar `MainLayout` como as demais views
Hoje `HomeView` NÃO usa `MainLayout` (renderiza tudo manualmente). Após a mudança, `HomeView` usa `<MainLayout><PageHero>...CTA slot...</PageHero><HomeStats /><HomeFeatures />...</MainLayout>`, ficando consistente com o padrão das outras views (thin wrapper compondo MainLayout + componentes de domínio).

## Risks / Trade-offs

- **[Risco]** Remover a sidebar pode reduzir a "descoberta" de rotas menos óbvias (Top Vídeos, Minhas Análises) para usuários acostumados com o menu lateral. → **Mitigação**: essas rotas foram explicitamente realocadas para locais previsíveis (submenu YouTube e dropdown de usuário), mantendo-as a no máximo 2 cliques de distância.
- **[Risco]** `PageHero` sem CTA fixo pode deixar a home menos "chamativa" se o slot não for bem preenchido. → **Mitigação**: o CTA "Começar Agora" continua existindo, apenas migrado para dentro do slot do `PageHero` na `HomeView`, preservando a aparência atual.
- **[Risco]** Renomear arquivos (`HomeHeader.vue` → `AppHeader.vue`, etc.) quebra imports existentes. → **Mitigação**: tasks.md deve cobrir a atualização de todos os pontos de import (grep por `HomeHeader`, `HomeFooter`, `HomeHero` antes de finalizar).
- **[Trade-off]** Perde-se a separação estrita "home é diferente das demais páginas" em troca de consistência visual — decisão intencional do usuário.

## Migration Plan

1. Mover/renomear `HomeHeader.vue` → `utils/AppHeader.vue`, `HomeFooter.vue` → `utils/AppFooter.vue`, `HomeHero.vue` → `utils/PageHero.vue` (com props/slot novos).
2. Refatorar `MainLayout.vue` para compor `AppHeader` + `<slot>` + `AppFooter`, removendo sidebar/menu antigos.
3. Adicionar submenu YouTube (TieredMenu) e dropdown de usuário (Menu) no `AppHeader`.
4. Atualizar `HomeView.vue` para usar `MainLayout` + `PageHero` (com CTA via slot) no lugar dos componentes antigos.
5. Atualizar as 6 views internas para substituir `<header class="prime-header">` por `<PageHero>`.
6. Adicionar `v-animateonscroll` nos pontos definidos (PageHero, formulários, dashboards de resultado).
7. Validar manualmente com `npm run type-check` e `npm run lint`, e navegação visual em mobile/desktop.

Rollback: reverter o commit/PR único da mudança (sem migração de dados, sem impacto em backend).

## Open Questions

Nenhuma pendente — todas as decisões de UX foram validadas com o usuário durante a exploração (header/footer no MainLayout, PageHero genérico, submenu YouTube via TieredMenu, dropdown de usuário via Menu, nomes de componentes em `utils/`).
