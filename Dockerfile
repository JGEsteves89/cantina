FROM node:20-alpine AS production
WORKDIR /app

COPY dist ./dist
COPY package*.json ./

RUN npm ci --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "./dist/server/index.js"]