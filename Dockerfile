# Etapa 1: Build de React
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx para producción
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copia el build compilado desde la etapa anterior
COPY --from=build /app/build .

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]