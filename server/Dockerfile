FROM node:lts

WORKDIR /app

COPY . /app
COPY .env /app

# Instalar dependencias necesarias
RUN apt-get update && \
    apt-get install -y 

# Instalar dependencias desarrollo y construir la aplicación dentro de la imagen
RUN npm install && \
    npm run build

EXPOSE 80

CMD ["npm", "start"]