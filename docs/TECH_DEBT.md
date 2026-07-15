# Débitos Técnicos

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Críticos

### 1. Ausência total de testes automatizados

- **Impacto:** Alto — qualquer alteração pode introduzir regressões sem detecção.
- **Evidência:** Nenhum arquivo de teste encontrado; `tsconfig.app.json` exclui `__tests__`.
- **Ação sugerida:** Implementar Vitest + @vue/test-utils conforme recomendado em [TESTING.md](./TESTING.md).

### 2. Duplicação de headers de autorização

- **Impacto:** Médio — redundância entre interceptor do Axios e construção manual nos services.
- **Evidência:** `PhotoAnalysisService`, `AdAnalysisService`, `YouTubeAnalysisService` constroem `headers['Authorization']` manualmente, mas `api.ts` já injeta o token via interceptor.
- **Ação sugerida:** Remover construção manual de headers nos services; confiar no interceptor.

---

## Moderados

### 3. Inconsistência no padrão de exportação dos services

- **Impacto:** Baixo — gera confusão para novos desenvolvedores.
- **Evidência:** `AuthService` e `UserProfileService` usam `export default new Classe()` (singleton); os demais usam `export default class` com métodos estáticos.
- **Ação sugerida:** Padronizar para um único padrão (recomenda-se métodos estáticos ou singleton consistente).

### 4. Inconsistência snake_case/camelCase nos tipos

- **Impacto:** Baixo — afeta legibilidade e manutenibilidade.
- **Evidência:** `PhotoAnalysisResult` usa `snake_case` (`descricao_cena`, `objetos_identificados`); `AdAnalysisResult` e `YouTubeAnalysisResult` usam `camelCase`.
- **Ação sugerida:** Padronizar para camelCase no frontend, usando camada de mapeamento se o backend envia snake_case.

### 5. Inicialização duplicada do AuthStore

- **Impacto:** Baixo — operação redundante sem efeito funcional.
- **Evidência:** `authStore.initializeFromStorage()` é chamado em `main.ts` e em `App.vue` (`onMounted`).
- **Ação sugerida:** Manter apenas a chamada em `main.ts`.

### 6. Inconsistência de versão do Node.js

- **Impacto:** Baixo — pode causar divergência entre ambientes.
- **Evidência:** `.nvmrc` aponta para v24, mas `package.json` aceita `^20.19.0 || >=22.12.0`.
- **Ação sugerida:** Alinhar `.nvmrc` com a constraint do `package.json`.

---

## Menores

### 7. Sem CI/CD

- **Impacto:** Moderado — não há validação automatizada de build/test em PRs.
- **Evidência:** Nenhum workflow GitHub Actions ou similar encontrado em `.github/`.
- **Ação sugerida:** Implementar pipeline com lint + type-check + build.

### 8. `Content-Type: multipart/form-data` setado manualmente

- **Impacto:** Baixo — Axios pode setar automaticamente com boundary correto.
- **Evidência:** `PhotoAnalysisService.sendPhotoBinary()` seta `Content-Type` manualmente.
- **Ação sugerida:** Remover o header manual e deixar Axios detectar automaticamente, incluindo o boundary.

---

## Notas

- Zero TODO/FIXME encontrados no código-fonte — débitos são implícitos.
- A falta de testes é o item de maior risco e deve ser priorizado.
