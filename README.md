# photo-analysis

Aplicação frontend em Vue 3 + Vite para análise de fotos, anúncios e vídeos do YouTube.

## Stack

- Vue 3
- Vite 7
- TypeScript
- Vue Router
- Pinia
- PrimeVue (tema Aura)
- Axios

## Requisitos

- Node.js: `^20.19.0` ou `>=22.12.0`
- npm

## Configuração de ambiente

Crie o arquivo `.env` a partir do exemplo:

```sh
cp .env.example .env
```

Variável utilizada pela aplicação:

```sh
VITE_BASE_SERVER_URL=http://localhost:3000
```

Essa URL é usada pelo cliente Axios central em `src/services/api.ts`.
As requisições incluem o token JWT salvo em `localStorage` (`auth_token`) quando presente.

## Instalação

```sh
npm install
```

## Desenvolvimento local

```sh
npm run dev
```

Por padrão, o Vite sobe em `http://localhost:5173`.

## Scripts disponíveis

```sh
# Desenvolvimento
npm run dev

# Build de produção (inclui type-check)
npm run build

# Preview do build
npm run preview

# Type-check
npm run type-check

# Lint (com --fix)
npm run lint

# Formatação com Prettier (src/)
npm run format
```

## Docker

O projeto possui `Dockerfile` multiestágio com build do Vite e entrega via Nginx.

Para subir com Docker Compose:

```sh
docker compose up -d --build
```

Com a configuração atual de `docker-compose.yml`, a aplicação fica disponível em:

```text
http://localhost:9393
```

Comandos úteis:

```sh
docker compose logs -f photo-analysis
docker compose down
docker compose exec photo-analysis sh
```

Atalho via Makefile:

```sh
make create
```

## Rotas principais

- `/`: dashboard inicial (requer autenticação)
- `/results`: resultados de análise de foto (requer autenticação)
- `/profile`: perfil do usuário (requer autenticação)
- `/ad-analysis`: análise de anúncios (requer autenticação)
- `/youtube-analysis`: análise de vídeos do YouTube (requer autenticação)
- `/login`: login
- `/register`: cadastro

## Estrutura principal

- `src/components`: componentes de UI e dashboards
- `src/views`: páginas principais
- `src/services`: comunicação com API (Axios)
- `src/stores`: estado global (Pinia)
- `src/router`: rotas da aplicação
- `src/composables`: composables reutilizáveis
