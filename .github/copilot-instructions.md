<!-- START-CODEBASE-CONTEXT-MAPPER -->

# photo-analysis — Copilot Instructions

> Generated: 2026-07-15 | Repo: photo-analysis | Branch: master

## Project Overview

Aplicação SPA frontend em Vue 3 + Vite 7 + TypeScript para análise de mídias (fotos, anúncios e vídeos do YouTube). Usa PrimeVue como design system, Pinia para estado global e Axios para comunicação com API REST backend autenticada via JWT. Empacotada em Docker com Nginx para produção.

## How This Project Is Organized

When working on this codebase, consult the following context files before
making changes. They contain the authoritative description of how the system
is structured and why.

- [CODEBASE.md](./docs/CODEBASE.md) — Visão geral e índice de navegação
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Arquitetura, camadas e fluxos de dados
- [TECH_STACK.md](./docs/TECH_STACK.md) — Stack tecnológica completa
- [DOMAIN_MODEL.md](./docs/DOMAIN_MODEL.md) — Entidades de domínio e regras de negócio
- [MODULES.md](./docs/MODULES.md) — Mapa de módulos e responsabilidades
- [PATTERNS.md](./docs/PATTERNS.md) — Padrões recorrentes de código
- [DATA_LAYER.md](./docs/DATA_LAYER.md) — Camada de dados e persistência
- [API_SURFACE.md](./docs/API_SURFACE.md) — Superfície de API (endpoints e contratos)
- [TESTING.md](./docs/TESTING.md) — Estratégia de testes e cobertura
- [BUILD_AND_DEPLOY.md](./docs/BUILD_AND_DEPLOY.md) — Build, CI/CD e deploy
- [TECH_DEBT.md](./docs/TECH_DEBT.md) — Débitos técnicos conhecidos
- [CONVENTIONS.md](./docs/CONVENTIONS.md) — Convenções e padrões do projeto
- [GLOSSARY.md](./docs/GLOSSARY.md) — Glossário de termos de domínio

## Key Conventions

- Use `<script setup lang="ts">` em todos os componentes Vue
- Componentes organizados por domínio em `src/components/` (ad, auth, photo, youtube, utils)
- Services encapsulam chamadas HTTP em classes com cliente Axios centralizado (`src/services/api.ts`)
- Composables com prefixo `use` para lógica reutilizável (`useToast`, `useFormValidator`, `useErrorHandler`, `useLoadingState`)
- Views são wrappers finos que compõem MainLayout + componentes de domínio
- Indentação: 4 espaços, aspas simples, sem ponto-e-vírgula, largura máxima 100 caracteres
- Path alias `@/` mapeia para `src/`
- Views com lazy loading no router: `const XView = () => import('@/views/XView.vue')`

## Tech Stack Summary

Vue 3.5 + Vite 7 + TypeScript 5.9 + Pinia 2.x + PrimeVue 4.x (Aura) + Axios, deploy via Docker + Nginx Alpine.

## Entry Points

- `src/main.ts` — Bootstrap da aplicação (Pinia, Router, PrimeVue, AuthStore init)
- `src/App.vue` — Componente raiz (Toast, RouterView, AuthStore re-init)
- `src/router/index.ts` — Definição de rotas e guard de autenticação

## Important Constraints

- Não existem testes automatizados — toda alteração deve ser validada manualmente ou via type-check/lint
- O interceptor Axios em `api.ts` já injeta Authorization header; services não precisam construí-lo manualmente
- JWT é persistido em localStorage (`auth_token`) — não adicionar outros secrets em localStorage
- O upload de fotos usa multipart/form-data; não alterar Content-Type manualmente (delegar ao Axios)
- Endpoints de análise (anúncio e YouTube) têm timeout de 120s — respeitar esse limite
- Não há cache de dados de API — cada chamada é uma requisição direta ao backend
<!-- END-CODEBASE-CONTEXT-MAPPER -->

<!-- headroom:rtk-instructions -->

# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands

```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules

- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
