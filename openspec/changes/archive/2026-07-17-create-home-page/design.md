## Context

O app Photo Analysis é um SPA Vue 3 + PrimeVue 4 com 3 capacidades de análise (foto, anúncio, YouTube). Hoje a rota `/` renderiza diretamente o upload de foto dentro de MainLayout (com sidebar). Não existe página de apresentação — o usuário loga e cai num formulário técnico. O PrimeVue 4.5 oferece componentes ricos (Card, MeterGroup, Carousel, AnimateOnScroll) que não são utilizados. A directive AnimateOnScroll não está registrada no app.

## Goals / Non-Goals

**Goals:**
- Criar landing page chamativa que apresenta o produto e navega para as 3 capacidades
- Separar análise de foto da home (nova rota `/photo-analysis`)
- Home full-width sem sidebar, responsiva mobile-first
- Stats com dados reais via services existentes (listResults)
- Animações ao scroll usando AnimateOnScroll do PrimeVue
- Carousel com últimas análises do usuário

**Non-Goals:**
- Criar novas API endpoints
- Alterar layout das views de análise existentes
- Implementar dark mode
- Criar testes automatizados
- SSR ou pré-renderização da home

## Decisions

### 1. Home SEM MainLayout (full-width)

**Decisão**: HomeView não usa `<MainLayout>`. Renderiza seu próprio header simplificado e footer.

**Alternativa considerada**: Usar MainLayout com sidebar colapsada — rejeitada porque landing pages ficam visualmente pobres dentro de um layout com sidebar fixa. A home deve ser imersiva.

**Racional**: O header da home terá: logo/título à esquerda, links de navegação no centro (desktop) ou hamburger menu (mobile), e chip do usuário à direita. Usa PrimeVue `Drawer` para menu mobile e `Menubar` para desktop.

### 2. Mobile-first CSS com breakpoints progressivos

**Decisão**: CSS base = mobile. Progressive enhancement via `@media (min-width: 768px)` e `@media (min-width: 1024px)`.

**Racional**: Alinhado com o breakpoint existente do projeto (MainLayout usa 1024px para sidebar). Garante que mobile funciona sem media queries e desktop aprimora.

| Breakpoint | Layout |
|---|---|
| < 768px (base) | Single column, full-width buttons, hamburger menu |
| ≥ 768px | 2-col grid onde aplicável, navbar compact |
| ≥ 1024px | 3-col grids, navbar full, max-width container |

### 3. Seções da Home e componentes PrimeVue

| Seção | Componentes PrimeVue | Dados |
|---|---|---|
| Hero | `Button` (CTA grande com gradiente) | Estático |
| Stats | `Card`, `MeterGroup` | `listResults(1,1).total` de cada service |
| Features | `Card` (header/title/content/footer), `Tag`, `Button` | Estático + router.push |
| How It Works | `Card`, `Avatar` (circulares com ícones) | Estático |
| Carousel | `Carousel`, `Card` | `listResults(1,5)` de cada service |

### 4. Registro do AnimateOnScroll

**Decisão**: Registrar globalmente em `main.ts`:
```ts
import AnimateOnScroll from 'primevue/animateonscroll'
app.directive('animateonscroll', AnimateOnScroll)
```

**Racional**: Uso em múltiplas seções da home — registro global evita import repetido. Não impacta outras views (directive é opt-in via `v-animateonscroll`).

### 5. Header da Home — component dedicado

**Decisão**: Criar `src/components/utils/HomeHeader.vue` com comportamiento responsivo:
- Mobile: logo + hamburger (`Button` icon) → `Drawer` com menu
- Desktop: logo + `Menubar` ou links inline + Chip do usuário

**Alternativa considerada**: Reusar o header do MainLayout — rejeitada porque o header do MainLayout tem estilo fixo (bg azul, sticky) e não suporta navbar horizontal.

### 6. Rota da análise de foto

**Decisão**: Nova rota `/photo-analysis` com lazy-loaded `PhotoAnalysisView.vue`. O conteúdo atual de `HomeView.vue` (upload de foto + PhotoUploadForm + PhotoDisplay + PhotoAnalysisDashboard) é movido integralmente para `PhotoAnalysisView.vue`.

### 7. Stats — chamadas paralelas

**Decisão**: Usar `Promise.allSettled()` para chamar os 3 services concurrentemente. Se um falha, mostra 0 para aquele tipo — nunca bloqueia a renderização da home.

### 8. Carousel — últimas análises mistas

**Decisão**: Buscar 5 resultados de cada tipo (foto, anúncio, YouTube), combinar num array único ordenado por data, e exibir no Carousel. Each card mostra tipo (Tag), título resumido e botão "Ver detalhes" que navega para `/results`.

## Risks / Trade-offs

- **[AnimateOnScroll não funciona sem Tailwind]** → PrimeVue 4 AnimateOnScroll usa classes Tailwind (fade-in-10, slide-in-from-t-20). O projeto NÃO usa Tailwind. **Mitigação**: Usar CSS custom properties/manual para animações em vez das classes Tailwind, ou verificar se o PrimeVue preset Aura inclui as classes de animação. Se não, implementar animações com CSS `@keyframes` e `IntersectionObserver` manual, mantendo a directive注册 mas com classes customizadas.
- **[3 chamadas API na home]** → Pode ser lento se backend demora. **Mitigação**: `Promise.allSettled` + timeout curto (5s) + fallback para dados zerados.
- **[Home sem MainLayout]** → Comportamento inconsistente com outras views (sidebar some na home). **Mitigação**: Links de navegação na home cobrem todas as rotas do sidebar. Transição visual suave ao navegar para views com MainLayout.
