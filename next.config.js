const { withSentryConfig } = require('@sentry/nextjs');

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

const SentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
