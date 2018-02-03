const webpack = require("webpack");
let config = require("./webpack.config");

config.devServer = {
    contentBase: "./build",
    host: "0.0.0.0",
    publicPath: "/",
    hot: true,
    hotOnly: true,
    inline: true,
};

config.output.publicPath = "/";

config.module.rules.unshift({
    test: /\.css$/,
    use: [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader",
            options: {
                modules: true,
                sourceMap: true
            }
        }
    ]
});

config.entry.unshift("react-hot-loader/patch");

config.plugins.unshift(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());

config.devtool = "inline-source-map";

module.exports = config;