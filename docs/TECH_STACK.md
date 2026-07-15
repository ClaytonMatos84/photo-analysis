# Stack Tecnológica

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Stack Principal

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework UI | Vue | ^3.5.25 |
| Build Tool | Vite | ^7.2.4 |
| Linguagem | TypeScript | ~5.9.0 |
| Roteamento | Vue Router | ^4.6.3 |
| Gerenciamento de Estado | Pinia | ^2.2.6 |
| Biblioteca de Componentes | PrimeVue | ^4.5.0 |
| Tema PrimeVue | @primeuix/themes (Aura) | ^2.0.1 |
| Ícones | PrimeIcons | ^7.0.0 |
| Cliente HTTP | Axios | ^1.13.2 |

## Ferramentas de Desenvolvimento

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Linter | ESLint | ^9.39.1 |
| Plugin Vue ESLint | eslint-plugin-vue | ~10.5.1 |
| Config TypeScript ESLint | @vue/eslint-config-typescript | ^14.6.0 |
| Config Prettier ESLint | @vue/eslint-config-prettier | ^10.2.0 |
| Formatador | Prettier | 3.6.2 |
| Type Checker | vue-tsc | ^3.1.5 |
| Plugin Vite | @vitejs/plugin-vue | ^6.0.2 |
| DevTools | vite-plugin-vue-devtools | ^8.0.5 |
| Execução Paralela | npm-run-all2 | ^8.0.4 |
| JIT Import | jiti | ^2.6.1 |

## Runtime

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Node.js | Engine | ^20.19.0 \|\| >=22.12.0 |
| NVVMRC | Node | v24 |

## Infraestrutura e Deploy

| Categoria | Tecnologia |
|-----------|-----------|
| Containerização | Docker (multiestágio) |
| Servidor Web | Nginx (Alpine) |
| Orquestração Local | Docker Compose |
| Imagem Base Build | node:22-alpine |
| Imagem Base Prod | nginx:alpine |

## Configuração TypeScript

| Arquivo | Propósito |
|---------|-----------|
| `tsconfig.json` | Referência aos sub-configs |
| `tsconfig.app.json` | Config da aplicação (DOM, paths `@/*`) |
| `tsconfig.node.json` | Config do Node/Vite |

---

## Notas

- O tema Aura do PrimeVue é configurado com `darkModeSelector: false`, desativando o modo escuro.
- O `nvmrc` aponta para v24, enquanto o `package.json` aceita Node ^20.19.0 ou >=22.12.0 — potencial inconsistência de versão.
