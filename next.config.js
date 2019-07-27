const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const nextSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');

module.exports = {
    ...withCSS(
        nextSourceMaps(
            withBundleAnalyzer({
                analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
                analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
                bundleAnalyzerConfig: {
                    server: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/server.html'
                    },
                    browser: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/client.html'
                    }
                },
                ...nextSourceMaps({
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
                })
            })
        )
    ),
    publicRuntimeConfig: {
        sentryDSN: process.env.SENTRY_DSN,
        backendDomain: process.env.BACKEND_DOMAIN || 'localhost:8000',
        backendProtocol: process.env.BACKEND_PROTOCOL || 'http:'
    }
};
