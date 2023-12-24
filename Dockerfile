FROM node:18.19-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG SENTRY_URL=https://sentry.io/
ARG SENTRY_ORG=krddev
ARG SENTRY_PROJECT=frontend
ARG BACKEND_DOMAIN=krd.dev/backend
ARG BACKEND_PROTOCOL=https:
ENV SENTRY_URL $SENTRY_URL
ENV SENTRY_ORG $SENTRY_ORG
ENV SENTRY_PROJECT $SENTRY_PROJECT
ENV BACKEND_DOMAIN=$BACKEND_DOMAIN
ENV BACKEND_PROTOCOL=$BACKEND_PROTOCOL
RUN --mount=type=secret,id=sentry-auth-token \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry-auth-token)" && \
    export SENTRY_AUTH_TOKEN && \
    npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0
CMD ["node", "server.js"]
