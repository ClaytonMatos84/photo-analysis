# Docker Setup - Photo Analysis App

## Descrição

Este diretório contém a configuração Docker para a aplicação Vue Photo Analysis.

## Componentes

- **Dockerfile**: Build multi-estágio que cria a imagem da aplicação Vue
- **docker-compose.yml**: Orquestra os containers (app Vue + servidor API)
- **nginx.conf**: Configuração do Nginx para servir a SPA

## Como usar

### 1. Build e iniciar os containers

```bash
docker-compose up -d
```

### 2. Acessar a aplicação

A aplicação estará disponível em: `http://localhost:9393`

### 3. Comandos úteis

```bash
# Ver logs
docker-compose logs -f photo-analysis

# Parar os containers
docker-compose down

# Reconstruir a imagem
docker-compose up -d --build

# Executar comando no container
docker-compose exec photo-analysis sh
```

## Configuração

### Portas

- **Máquina host**: 9393 → **Container**: 5173 (aplicação Vue)
- **Container API**: 3000 (servidor backend)

### Variáveis de ambiente

Edite o `docker-compose.yml` para alterar:

- `API_BASE_URL`: URL do servidor API

### Comunicação entre containers

Os containers se comunicam através da rede Docker `photo-analysis-network`:

- A app Vue acessa o servidor em: `http://api-server:3000`
- O servidor recebe requisições do container Vue

## Estrutura de build

1. **Estágio 1 (Builder)**: Instala dependências e faz build do projeto
2. **Estágio 2 (Production)**: Imagem Nginx Alpine com arquivos build

Isso reduz o tamanho final da imagem removendo ferramentas de build.

## Próximos passos

1. Configure o `api-server` no `docker-compose.yml` com a imagem/comando do seu servidor backend
2. Ajuste as variáveis de ambiente conforme necessário
3. Para desenvolvimento, você ainda pode usar `npm run dev` localmente
