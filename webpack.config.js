'use strict';

const path = require('path');

module.exports = {
    entry: {
        costructor: './src/Constructor',
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
            '.css',
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-inline-svg')(),
                                require('autoprefixer')(),
                                require('cssnano')(),
                            ],
                        },
                    },
                ]
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
                ]
            }
        ]
    },
};
