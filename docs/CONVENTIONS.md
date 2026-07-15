# Convenções e Padrões

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos Vue (views) | PascalCase + `View.vue` | `HomeView.vue`, `AdAnalysisView.vue` |
| Arquivos Vue (components) | PascalCase + `.vue` | `PhotoUploadForm.vue`, `LoginForm.vue` |
| Arquivos TypeScript (services) | PascalCase + `Service.ts` | `AuthService.ts`, `AdAnalysisService.ts` |
| Arquivos TypeScript (composables) | camelCase com prefixo `use` | `useToast.ts`, `useFormValidator.ts` |
| Arquivos TypeScript (types) | PascalCase + `Types.ts` | `PhotoAnalysisTypes.ts` |
| Arquivos TypeScript (store) | kebab-case + `.ts` | `auth.ts` |
| Classes | PascalCase | `AuthService`, `PhotoAnalysisService` |
| Interfaces | PascalCase | `PhotoAnalysisResult`, `PaginatedResponse` |
| Composables (funções) | camelCase com prefixo `use` | `useToast()`, `useLoadingState()` |
| Rotas | kebab-case | `/ad-analysis`, `/youtube-analysis` |
| Variáveis de env | SCREAMING_SNAKE_CASE | `VITE_BASE_SERVER_URL` |

---

## Estrutura de Diretórios

```
src/
├── assets/          # CSS global (base.css, main.css)
├── components/      # Componentes de UI organizados por domínio
│   ├── ad/          # Componentes de análise de anúncios
│   ├── auth/        # Componentes de autenticação e perfil
│   ├── photo/       # Componentes de análise de fotos
│   ├── youtube/     # Componentes de análise de YouTube
│   └── utils/       # Componentes utilitários (layout, títulos)
├── composables/     # Funções composáveis reutilizáveis
├── router/          # Configuração de rotas
├── services/        # Camada de comunicação com API
├── stores/          # Stores Pinia (estado global)
├── types/           # Definições de tipos TypeScript
└── views/           # Páginas/views da aplicação
```

---

## Formatação de Código

| Regra | Valor |
|-------|-------|
| Indentação | 4 espaços |
| Aspas | Simples |
| Ponto-e-vírgula | Não (semi: false) |
| Largura de linha | 100 caracteres |
| Charset | UTF-8 |
| Fim de linha | LF |
| Trim trailing whitespace | Sim |
| Insert final newline | Sim |

Configurados em `.editorconfig` e `.prettierrc.json`.

---

## Vue/TypeScript

| Convenção | Detalhe |
|-----------|---------|
| `<script setup lang="ts">` | Script setup com TypeScript em todos os componentes |
| Path alias | `@/*` → `./src/*` |
| PrimeVue import | Importação direta de componentes (`import Button from 'primevue/button'`) |
| Scoped CSS | Estilos com `<style scoped>` em todos os componentes |
| Lazy loading | Views importadas com `() => import()` no router |

---

## Padrões de Componente

| Padrão | Descrição |
|--------|-----------|
| MainLayout wrapper | Todas as views autenticadas envolvem conteúdo em `<MainLayout>` |
| SectionTitle | Títulos de seções usam `<SectionTitle title="" description="" />` |
| PrimeVue components | Componentes de UI usam PrimeVue (Button, InputText, Card, Tabs, etc.) |
| Scoped CSS | Estilos CSS com escopo por componente |
| Responsive | Breakpoint mobile/desktop em 1024px (sidebar → drawer) |

---

## Git

| Convenção | Detalhe |
|-----------|---------|
| Branch padrão | `master` |
| Chave de auth no localStorage | `auth_token` |

---

## Notas

- O diretório `src/components/` segue organização por domínio (ad, auth, photo, youtube, utils), o que é uma boa prática.
- Views são wrappers finos; toda lógica de UI reside nos componentes de formulário/dashboard.
