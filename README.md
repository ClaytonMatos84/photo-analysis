# photo-analysis

Aplicacao frontend em Vue 3 + Vite para analise de fotos e anuncios.

## Stack

- Vue 3
- Vite 7
- TypeScript
- Vue Router
- Pinia
- PrimeVue
- Axios

## Requisitos

- Node.js: `^20.19.0` ou `>=22.12.0`
- npm

## Configuracao de ambiente

Crie o arquivo `.env` a partir do exemplo:

```sh
cp .env.example .env
```

Variavel utilizada pela aplicacao:

```sh
VITE_BASE_SERVER_URL=http://localhost:3000
```

Essa URL e usada pelo cliente Axios central em `src/services/api.ts`.
As requisicoes incluem o token JWT salvo em `localStorage` (`auth_token`) quando presente.

## Instalar dependencias

```sh
npm install
```

## Rodar em desenvolvimento

```sh
npm run dev
```

Por padrao, o Vite sobe em `http://localhost:5173`.

## Scripts disponiveis

```sh
# Desenvolvimento
npm run dev

# Build de producao (inclui type-check)
npm run build

# Preview do build
npm run preview

# Type-check
npm run type-check

# Lint (com --fix)
npm run lint

# Formatacao com Prettier (src/)
npm run format
```

## Docker

O projeto possui `Dockerfile` multi-stage com build do Vite e entrega via Nginx.

Para subir com Docker Compose:

```sh
docker compose up -d --build
```

Com a configuracao atual de `docker-compose.yml`, a aplicacao fica disponivel em:

```text
http://localhost:9393
```

Comandos uteis:

```sh
docker compose logs -f photo-analysis
docker compose down
docker compose exec photo-analysis sh
```

Atalho via Makefile:

```sh
make create
```

## Estrutura principal

- `src/components`: componentes de UI e dashboards
- `src/views`: paginas principais
- `src/services`: comunicacao com API (Axios)
- `src/stores`: estado global (Pinia)
- `src/router`: rotas da aplicacao
- `src/composables`: hooks reutilizaveis
