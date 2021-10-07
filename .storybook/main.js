module.exports = {
    stories: ['../stories/*.stories.@(tsx|md)'],
    addons: [
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss')
                }
            }
        }
    ]
};
