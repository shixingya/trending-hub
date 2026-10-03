FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY docs/ ./docs/

RUN apk add --no-cache cron && \
    echo "0 */2 * * * cd /app && node dist/fetch-docs.js >> /var/log/trending.log 2>&1" | crontab -

EXPOSE 3000
CMD crond && serve docs -l 3000
