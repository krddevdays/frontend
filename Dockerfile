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
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" && \
    export SENTRY_AUTH_TOKEN && \
    ASSET_PREFIX="https://krddev-frontend.storage.yandexcloud.net" npm run build

FROM amazon/aws-cli:2.15.4 as uploader
WORKDIR /app
COPY --from=builder /app/.next/static ./.next/static
RUN --mount=type=secret,id=S3_ACCESS_KEY_ID \
    --mount=type=secret,id=S3_SECRET_ACCESS_KEY \
    aws configure set aws_access_key_id $(cat /run/secrets/S3_ACCESS_KEY_ID) && \
    aws configure set aws_secret_access_key $(cat /run/secrets/S3_SECRET_ACCESS_KEY) && \
    aws configure set region ru-central1 && \
    aws configure set endpoint_url https://storage.yandexcloud.net && \
    aws s3 cp --recursive --no-progress --cache-control "public,max-age=31536000" ./.next/static s3://krddev-frontend/_next/static

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=uploader --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0
CMD ["node", "server.js"]
