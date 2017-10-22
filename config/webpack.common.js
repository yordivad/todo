const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const helpers = require("./helpers");
const ConcatPlugin = require("webpack-concat-plugin");
const {InsertConcatAssetsWebpackPlugin } = require("@angular/cli/plugins/webpack");

module.exports = {
    entry: {
        "polyfills": "./src/polyfills.ts",
        "vendor": "./src/vendor.ts",
        "app": "./src/main.ts"
    },

    externals: {

    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {

        loaders: [
            {
                test: /\.pug$/,
                loaders: [
                    "apply-loader",
                    {
                        loader: "pug-loader?self",
                        query: { doctype: "html", plugins: [require("pug-plugin-ng")] }
                    }
                ],

            },

            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: "awesome-typescript-loader",
                        options: { configFileName: helpers.root("src","tsconfig.json") }
                    },
                    "angular2-template-loader"
                ]
            },

            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"],
                    plugins: ["transform-decorators-legacy"]
                }
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file-loader?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "to-string-loader"},
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            },
            {
                test: /\.css/,
                loader: "css-loader"
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        }),

        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root("./src"), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: "src/index.pug"
        }),

        new ConcatPlugin({
            "uglify": false,
            "sourceMap": true,
            "name": "scripts",
            "fileName": "[name].bundle.js",
            "filesToConcat": [
                "node_modules\\quill\\dist\\quill.js"
            ]
        }),
        new InsertConcatAssetsWebpackPlugin([
            "scripts"
        ])

    ]
};

