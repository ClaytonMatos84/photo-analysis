# Photo Analysis — Visão Geral da Codebase

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Resumo Executivo

O **photo-analysis** é uma aplicação SPA (Single Page Application) frontend para análise de mídias — fotos, anúncios e vídeos do YouTube — construída com **Vue 3**, **Vite 7**, **TypeScript**, **Pinia** e **PrimeVue**. A aplicação consome uma API REST backend separada (servida em `VITE_BASE_SERVER_URL`) para autenticação JWT, envio de imagens, análise de anúncios e extração de metadados de vídeos. É empacotada em Docker com Nginx para produção.

---

## Sumário

| Arquivo | Descrição |
|---------|-----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura, camadas e fluxos de dados |
| [TECH_STACK.md](./TECH_STACK.md) | Stack tecnológica completa |
| [DOMAIN_MODEL.md](./DOMAIN_MODEL.md) | Entidades de domínio e regras de negócio |
| [MODULES.md](./MODULES.md) | Mapa de módulos e responsabilidades |
| [PATTERNS.md](./PATTERNS.md) | Padrões recorrentes de código |
| [DATA_LAYER.md](./DATA_LAYER.md) | Camada de dados e persistência |
| [API_SURFACE.md](./API_SURFACE.md) | Superfície de API (endpoints e contratos) |
| [TESTING.md](./TESTING.md) | Estratégia de testes e cobertura |
| [BUILD_AND_DEPLOY.md](./BUILD_AND_DEPLOY.md) | Build, CI/CD e deploy |
| [TECH_DEBT.md](./TECH_DEBT.md) | Débitos técnicos conhecidos |
| [CONVENTIONS.md](./CONVENTIONS.md) | Convenções e padrões do projeto |
| [GLOSSARY.md](./GLOSSARY.md) | Glossário de termos de domínio |

---

## Métricas Factual

| Métrica | Valor |
|---------|-------|
| Arquivos de código-fonte (`.ts` + `.vue`) | 45 |
| Linhas de código (aprox.) | 5 441 |
| Módulos de serviço (API) | 5 |
| Stores Pinia | 1 |
| Composables | 4 |
| Views (páginas) | 7 |
| Componentes | 17 |
| Tipos TypeScript | 4 arquivos |
| Testes automatizados | 0 |
| TODO/FIXME | 0 |

---

## Rotas da Aplicação

| Rota | View | Autenticação |
|------|------|-------------|
| `/` | HomeView | Sim |
| `/results` | PhotoAnalysisResultsView | Sim |
| `/profile` | ProfileView | Sim |
| `/ad-analysis` | AdAnalysisView | Sim |
| `/youtube-analysis` | YouTubeAnalysisView | Sim |
| `/login` | LoginView | Não |
| `/register` | RegisterView | Não |

---

## Notas

- A aplicação é puramente frontend; toda lógica de negócio de análise reside no backend.
- Não existem testes automatizados no repositório.
- A autenticação é gerida via JWT armazenado em `localStorage`.
