const withCSS = require('@zeit/next-css');
const nextSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');

let config = {
    publicRuntimeConfig: {
        sentryDSN: process.env.SENTRY_DSN,
        backendDomain: process.env.BACKEND_DOMAIN || 'localhost:8000',
        backendProtocol: process.env.BACKEND_PROTOCOL || 'http:'
    },
    webpack: (config, { isServer, buildId }) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
            })
        );

        if (isServer) {
            config.resolve.alias['@sentry/browser'] = '@sentry/node';
        } else {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }

        return config;
    }
};

config = withCSS(config);
config = nextSourceMaps(config);

module.exports = config;
