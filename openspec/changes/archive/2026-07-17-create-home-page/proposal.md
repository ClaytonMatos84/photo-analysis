## Why

Hoje a HomeView é a página de análise de foto — ao logar, o usuário já cai direto no upload sem nenhuma apresentação do produto. Não existe uma "página inicial" que contextualize as funcionalidades, mostre stats do uso ou navague entre os tipos de análise. Isso torna a primeira impressão pobre e não diferencia as 3 capacidades do sistema (foto, anúncio, YouTube).

## What Changes

- **BREAKING**: Rota `/` deixa de ser a página de análise de foto e passa a ser uma landing page chamativa (HomeView reescrita)
- Criar nova rota `/photo-analysis` com view dedicada para análise de foto (conteúdo atual do HomeView)
- Reescrever HomeView como landing page full-width (sem sidebar/MainLayout) com seções: Hero, Stats, Features Cards, How It Works, Carousel
- Registrar directive `AnimateOnScroll` do PrimeVue 4 no main.ts para animações ao scroll
- Atualizar MainLayout: header muda para "Análise de mídias", menu inclui "Início" → `/` e "Análise de foto" → `/photo-analysis`
- Home deve ser responsiva mobile-first com breakpoints 768px / 1024px / 1280px
- Stats section usa dados reais da API (`listResults(1,1).total` de cada service)
- Carousel mostra últimas análises do usuário consumindo serviços existentes

## Capabilities

### New Capabilities

- `home-landing-page`: Landing page inicial full-width, responsiva mobile-first, com seções Hero (CTA), Stats (dados reais), Feature Cards (3 tipos de análise), How It Works (3 passos) e Carousel (últimas análises), usando componentes PrimeVue 4 (Card, MeterGroup, Carousel, Avatar, Tag, Button, AnimateOnScroll)

### Modified Capabilities

(Nenhuma capability existente tem requisito mudando — a análise de foto apenas muda de rota)

## Impact

- **Views**: HomeView.vue reescrita, novo PhotoAnalysisView.vue criado
- **Router**: Nova rota `/photo-analysis`, rota `/` aponta para nova HomeView
- **Main.ts**: Import e registro da directive AnimateOnScroll
- **MainLayout.vue**: Menu items atualizados, header title alterado para "Análise de mídias"
- **Services**: HomeView consumirá PhotoAnalysisService.listResults, AdAnalysisService.listResults, YouTubeAnalysisService.listResults para stats e carousel
- **PrimeVue**: Uso de novos componentes (Card, MeterGroup, Carousel, Avatar, Tag, AnimateOnScroll) — já disponíveis no PrimeVue 4.5

## Non-goals

- Não criar nova API endpoint — usamos os listResults existentes
- Não implementar dark mode na home
- Não criar testes automatizados (projeto não tem testes)
- Não alterar o layout das views de análise (foto, anúncio, YouTube) — apenas mover a de foto para nova rota
- Não adicionar autenticação ou autorização nova — home requer auth como hoje
