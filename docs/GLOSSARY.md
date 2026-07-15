# Glossário

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

| Termo | Definição |
|-------|-----------|
| **Análise de Foto** | Processo de envio de imagem para o backend, que retorna descrição da cena, objetos, pessoas, local, estilo, sentimento e observações |
| **Análise de Anúncio** | Análise estratégica de uma imagem de anúncio por URL, retornando comparador (SWOT), estratégia sugerida e pontos de melhoria |
| **Análise de YouTube** | Extração de metadados de um vídeo do YouTube (título, autor, visualizações, categoria, etc.) via URL |
| **AuthStore** | Store Pinia responsável pelo gerenciamento do token JWT e estado de autenticação |
| **AuthGuard** | Guard de navegação (`beforeEach`) no Vue Router que verifica `isTokenValid` para rotas com `requiresAuth: true` |
| **Composable** | Função composável Vue 3 que encapsula lógica reutilizável (ex: `useToast`, `useFormValidator`) |
| **Comparador** | Sub-entidade de `AdAnalysisResult` com análise comparativa de marca (forças, fraquezas, oportunidades, ameaças) |
| **Dashboard** | Componente que apresenta o resultado completo de uma análise (foto, anúncio ou YouTube) |
| **JWT** | JSON Web Token — formato de token de autenticação usado pelo backend e armazenado no `localStorage` como `auth_token` |
| **MainLayout** | Componente de layout principal com header, sidebar, área de conteúdo (slot) e footer |
| **PaginatedResponse** | Container genérico para respostas paginadas com `data`, `total`, `page`, `limit`, `totalPages` |
| **PrimeVue** | Biblioteca de componentes UI usada como design system (tema Aura) |
| **Service** | Classe TypeScript que encapsula chamadas HTTP ao backend via cliente Axios centralizado |
| **VITE_BASE_SERVER_URL** | Variável de ambiente que define a URL base do backend API consumida pelo Axios |

---

## Notas

- Termos técnicos mantidos em inglês quando são identificadores de código (ex: `AuthStore`, `Composable`).
- Termos de domínio de negócio são descritos em português.
