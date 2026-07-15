# Arquitetura

> **Gerado em:** 2026-07-15 | **Branch:** master | **Commit:** d137093

## Visão Geral

A aplicação segue uma arquitetura **SPA baseada em componentes** com separação em camadas lógicas: Views → Components → Services → Stores → API Client. O roteamento é gerido pelo Vue Router e o estado global pelo Pinia.

---

## Diagrama de Camadas

```mermaid
graph TB
    subgraph "Camada de Apresentação"
        Views[Views/Páginas]
        Components[Componentes UI]
    end

    subgraph "Camada de Lógica"
        Composables[Composables]
        Stores[Pinia Stores]
    end

    subgraph "Camada de Dados"
        Services[Services]
        APIClient[Cliente Axios]
    end

    subgraph "Externo"
        Backend[API Backend]
        LocalStorage[localStorage]
    end

    Views --> Components
    Views --> Composables
    Views --> Services
    Views --> Stores
    Components --> Stores
    Components --> Composables
    Services --> APIClient
    Services --> Stores
    Stores --> LocalStorage
    APIClient --> Backend
```

---

## Diagrama de Fluxo de Dados — Análise de Foto

```mermaid
sequenceDiagram
    participant U as Usuário
    participant HV as HomeView
    participant PUF as PhotoUploadForm
    participant PAS as PhotoAnalysisService
    participant API as Axios Client
    participant BE as Backend

    U->>HV: Seleciona imagem
    HV->>PUF: Exibe formulário de upload
    U->>PUF: Submete foto (Blob)
    PUF->>PAS: sendPhotoBinary(photo)
    PAS->>API: POST /photo-analysis/analyze (multipart)
    API->>BE: Requisição HTTP
    BE-->>API: PhotoAnalysisResult (JSON)
    API-->>PAS: Response data
    PAS-->>PUF: Resultado da análise
    PUF-->>HV: Emissão evento "analysis"
    HV->>HV: Renderiza PhotoAnalysisDashboard
```

---

## Diagrama de Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LF as LoginForm
    participant AS as AuthService
    participant API as Axios Client
    participant Store as AuthStore
    participant LS as localStorage

    U->>LF: Insere credenciais
    LF->>AS: login(email, password)
    AS->>API: POST /auth/login
    API->>BE: Backend
    BE-->>API: { access_token }
    API-->>AS: { token, success: true }
    AS-->>LF: AuthResponse
    LF->>Store: setToken(token)
    Store->>LS: setItem("auth_token", token)
    Store->>API: defaults.headers.Authorization = token
    LF->>LF: Redireciona para home
```

---

## Estrutura de Roteamento

```mermaid
graph TD
    Router[Vue Router] --> Guard[beforeEach Guard]
    Guard -->|requiresAuth: true| CheckToken{isTokenValid?}
    CheckToken -->|Sim| Allow[Permite acesso]
    CheckToken -->|Não| RedirectToLogin[Redireciona /login]
    Guard -->|requiresAuth: false| AllowPublic[Permite acesso público]
    AllowPublic -->|Autenticado + login/register| RedirectHome[Redireciona /]
```

---

## Layout da Aplicação

A aplicação utiliza `MainLayout.vue` como wrapper comum com:
- **Header** fixo com título e chip do usuário
- **Sidebar** com navegação (Menu PrimeVue) — drawer no mobile (< 1024px), fixa no desktop
- **Footer** fixo com copyright
- **Slot default** para conteúdo da view

---

## Notas

- O interceptor de resposta no Axios (`api.ts`) trata erros 401 globalmente, limpando o token e redirecionando para login.
- O `authStore.initializeFromStorage()` é chamado duas vezes: em `main.ts` e em `App.vue` (`onMounted`), o que é redundante.
- Cada Service constrói headers de Authorization manualmente em vez de depender exclusivamente do interceptor.
