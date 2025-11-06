# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "./dist/server.js"]
