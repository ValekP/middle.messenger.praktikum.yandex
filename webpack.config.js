const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV == 'production'
const isDev = !isProd

const config = {
    entry: './src/app.ts',
    output: {
        filename: isProd ? "bundle.[hash].js" : "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        host: 'localhost',
        compress: true,
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            },
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            filename: isProd ? 'bundle.[hash].css' : 'bundle.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                    mode: "local",
                    auto: true,
                    exportGlobals: true,
                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                    localIdentContext: path.resolve(__dirname, "src"),
                    localIdentHashSalt: "my-custom-hash",
                    namedExport: true,
                    exportLocalsConvention: "camelCase",
                    exportOnlyLocals: false,
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader'
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.sass', '...'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
}
