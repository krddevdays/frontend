const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
    output: 'standalone',
    reactStrictMode: true,
    publicRuntimeConfig: {
        backendDomain: process.env.BACKEND_DOMAIN || 'krd.dev/backend',
        backendProtocol: process.env.BACKEND_PROTOCOL || 'https:'
    },
    images: {
        domains: ['storage.yandexcloud.net']
    },
    sentry: {
        hideSourceMaps: true,
    },
    async redirects() {
        return [
            {
                source: '/cfp',
                destination: 'https://forms.yandex.ru/cloud/5adc61cf6162d77e2714831c/\n',
                permanent: false,
            },
        ]
    }
};

module.exports = withSentryConfig(moduleExports);
