# Estratégia de Testes

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Situação Atual

**Não existem testes automatizados no repositório.**

| Categoria | Status |
|-----------|--------|
| Testes unitários | ❌ Ausentes |
| Testes de integração | ❌ Ausentes |
| Testes E2E | ❌ Ausentes |
| Testes de componentes | ❌ Ausentes |
| Coverage | ❌ Não configurado |

---

## Ferramentas de Qualidade Existentes

Apesar da ausência de testes, o projeto possui ferramentas de qualidade estática:

| Ferramenta | Propósito | Comando |
|-----------|-----------|---------|
| vue-tsc | Type-check em tempo de build | `npm run type-check` |
| ESLint | Linting de código | `npm run lint` |
| Prettier | Formatação de código | `npm run format` |

O script de build (`npm run build`) inclui type-check como etapa obrigatória:

```
"build": "run-p type-check \"build-only {@}\" --"
```

---

## Áreas Críticas para Testes

Baseado na complexidade e risco, as seguintes áreas seriam prioritárias:

| Prioridade | Módulo | Justificativa |
|-----------|--------|---------------|
| 🔴 Alta | `auth.ts` (store) | Lógica de validade de JWT, ciclo de vida do token |
| 🔴 Alta | `useFormValidator` | Regras de validação, edge cases |
| 🔴 Alta | `useErrorHandler` | Mapeamento de códigos HTTP |
| 🟡 Média | `router/index.ts` | Guard de navegação, redirecionamentos |
| 🟡 Média | Services | Contratos de API, tratamento de erro |
| 🟡 Média | `useLoadingState` | Estado reativo, wrapper `withLoading` |
| 🟢 Baixa | Components de dashboard | Renderização de dados |

---

## Recomendação de Stack de Testes

| Ferramenta | Uso |
|-----------|-----|
| Vitest | Test runner (já integrado ao Vite) |
| @vue/test-utils | Teste de componentes Vue |
| happy-dom ou jsdom | Ambiente DOM para testes |
| @pinia/testing | Testes com stores Pinia |
| Cypress ou Playwright | Testes E2E |

---

## Notas

- O `tsconfig.app.json` exclui `src/**/__tests__/*`, indicando que a estrutura de testes foi prevista mas não implementada.
- A ausência de testes é o débito técnico mais significativo do projeto.
