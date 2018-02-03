const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: [
        "./src/index.jsx"
    ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|png)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[hash].[ext]"
                        }
                    },
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            mimetype: "image/svg+xml",
                            name: "fonts/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.woff$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            mimetype: "application/font-woff",
                            name: "fonts/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.woff2$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            mimetype: "application/font-woff2",
                            name: "fonts/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            mimetype: "application/octet-stream",
                            name: "fonts/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.eot$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            mimetype: "application/vnd.ms-fontobject",
                            name: "fonts/[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "src", "app.html"),
                to: "./index.html"
            }
        ]),
        new webpack.EnvironmentPlugin("NODE_ENV")
    ]
};