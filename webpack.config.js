'use strict';

const path = require('path');

const styleLoaderConfig ={
    loader: 'style-loader',
    options: {
        singleton: true,
    },
};

const postCssLoaderConfig = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-nested')(),
            require('postcss-cssnext')({
                warnForDuplicates: false,
            }),
            require('postcss-url')({
                url: 'inline',
            }),
            require('cssnano')(),
        ],
    },
};

module.exports = {
    entry: {
        costructor: './src',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        jsonpFunction: 'animationConstructorJSONP',
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
        ],
    },
    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: [
                    styleLoaderConfig,
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: true,
                            camelCase: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]-[name]--[local]',
                            minimize: true,
                        },
                    },
                    postCssLoaderConfig,
                ],
            },
            {
                test: /\.css$/,
                use: [
                    styleLoaderConfig,
                    postCssLoaderConfig,
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'es6-promise',
                                'transform-object-assign',
                                'transform-undefined-to-void',
                            ],
                        },
                    },
                    'awesome-typescript-loader',
                ],
            },
        ],
    },
};
