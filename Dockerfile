FROM node:16.14-slim

EXPOSE 3000
WORKDIR /usr/src/krddevdays

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates

COPY package*.json ./
RUN NODE_ENV=production npm ci

ARG SENTRY_URL=https://sentry.io/
ARG SENTRY_ORG=krddev
ARG SENTRY_PROJECT=frontend
ARG SENTRY_AUTH_TOKEN

ARG BACKEND_DOMAIN=krd.dev/backend
ARG BACKEND_PROTOCOL=https:

ENV SENTRY_URL $SENTRY_URL
ENV SENTRY_ORG $SENTRY_ORG
ENV SENTRY_PROJECT $SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN
ENV BACKEND_DOMAIN=$BACKEND_DOMAIN
ENV BACKEND_PROTOCOL=$BACKEND_PROTOCOL

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
