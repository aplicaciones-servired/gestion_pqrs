FROM node:lts AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:stable-alpine3.19-slim

COPY --from=build /app/dist /usr/share/nginx/html
