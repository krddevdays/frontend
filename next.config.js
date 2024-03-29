// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import("next").NextConfig} */
const moduleExports = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    assetPrefix: process.env.ASSET_PREFIX,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                pathname: '/krddev-content/**',
            },
        ],
    },
    sentry: {
        hideSourceMaps: true,
    },
    async redirects() {
        return [
            {
                source: '/cfp',
                destination: 'https://forms.yandex.ru/cloud/5adc61cf6162d77e2714831c',
                permanent: false,
            },
        ];
    },
};

module.exports = withSentryConfig(moduleExports);
