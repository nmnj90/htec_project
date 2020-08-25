const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        './src/app/app.js',
        './src/scss/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle.js'
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, "../src"),
        historyApiFallback: true
    },
    module: {
        rules: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            minimize: !isDevelopment
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'webpack/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ] 
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
        }),

        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "[id].css"
        }),  
         
        new HtmlWebpackPlugin({
            title: 'Webpack starter',
            template: './src/templates/index.hbs',
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
        }),

        new CopyWebpackPlugin([{
           from: './src/img',
           to: path.resolve(__dirname, '../dist/img')
        }]),

        new ImageminPlugin({
            pngquant: ({ quality: [50] }),
            plugins: [imageminMozjpeg({ quality: 50 })]
        })
      ]
  };