FROM node:14.17-slim

EXPOSE 3000
WORKDIR /usr/src/krddevdays

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates

COPY package*.json ./
RUN NODE_ENV=production npm ci

ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN

ENV SENTRY_URL $SENTRY_URL
ENV SENTRY_ORG $SENTRY_ORG
ENV SENTRY_PROJECT $SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
