# build stage
FROM node:20-alpine as builder
WORKDIR /app

# Build-time arguments
ARG VITE_DAYS_TO_BE_SCHEDULES
ARG VITE_MY_JSON_SERVER_URL
ARG VITE_MY_JSON_SERVER_API

# Make them available as environment variables for npm run build
ENV VITE_DAYS_TO_BE_SCHEDULES=$VITE_DAYS_TO_BE_SCHEDULES
ENV VITE_MY_JSON_SERVER_URL=$VITE_MY_JSON_SERVER_URL
ENV VITE_MY_JSON_SERVER_API=$VITE_MY_JSON_SERVER_API


COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

