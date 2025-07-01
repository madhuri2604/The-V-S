# Stage 1: Build
FROM node:20 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
