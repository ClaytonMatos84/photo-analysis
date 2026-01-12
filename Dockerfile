# Estágio 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build do projeto
RUN npm run build

# Estágio 2: Produção com Nginx
FROM nginx:alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar arquivos build do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta 5173 (padrão do Vite)
EXPOSE 5173

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
