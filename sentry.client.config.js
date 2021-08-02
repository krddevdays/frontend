import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://816197d7ddc64ed2bbb1b0e49dbe2c40@o260762.ingest.sentry.io/1461263',
    tracesSampleRate: 1.0
});
