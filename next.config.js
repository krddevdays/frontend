const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const PacktrackerPlugin = require('@packtracker/webpack-plugin');

function withPacktracker(nextConfig = {}) {
    return {
        ...nextConfig,
        webpack(config, options) {
            const { isServer } = options;

            if (!isServer) {
                config.plugins.push(new PacktrackerPlugin());
            }

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options);
            }
            return config;
        }
    };
}

module.exports = withPacktracker(
    withCSS(
        withTypescript(
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
                }
            })
        )
    )
);
