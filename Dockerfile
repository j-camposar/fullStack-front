# Etapa 1: Build de React
FROM node:20-alpine AS build
# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo, incluyendo .env
COPY . .

# Ejecutar build de React (React tomará las variables del .env)
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar build
COPY --from=build /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
