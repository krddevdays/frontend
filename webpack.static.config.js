const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('style.css');
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

let config = require("./webpack.config");

config.module.rules.unshift({
    test: /\.css$/,
    loader: extractCSS.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader?modules"
    })
});

config.output.publicPath = "./";

config.plugins = [
    extractCSS,
    new StaticSiteGeneratorPlugin('main', 'index.html', {}, {
        window: {}
    }),
    new CopyWebpackPlugin([
        {
            fromType: "glob",
            from: "./static"
        }
    ])
];

module.exports = config;