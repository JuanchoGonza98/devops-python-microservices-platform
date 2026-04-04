FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend-web

COPY frontend-web/package*.json ./
RUN npm install

COPY frontend-web/ ./
RUN npm run build

FROM nginx:1.27-alpine

COPY gateway/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend-builder /app/frontend-web/dist /usr/share/nginx/html

EXPOSE 8080