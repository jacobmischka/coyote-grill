/* eslint-env node */
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		bundle: './_js/bundle/index.js',
		promotions: process.env.NODE_ENV === 'production'
			? './_js/promotions/index.js'
			: [
				'preact/devtools',
				'./_js/promotions/index.js'
			],
		'promotions-homepage': './_js/promotions/homepage.js'
	},
	output: {
		path: './js/',
		publicPath: '/js/',
		filename: '[name].js'
	},
	target: 'web',
	resolve: {
		alias: {
			react: 'preact'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				include: /svelte-components/,
				loader: 'svelte-loader'
			},
			{
				test: /\.yaml$/,
				loaders: [
					'json-loader',
					'yaml-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'promotions-deps',
			chunks: [
				'promotions',
				'promotions-homepage'
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'promotions-deps',
			chunks: [
				'promotions-deps',
				'bundle'
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: process.env.NODE_ENV
			}
		})
	],
	devtool: 'source-map'
};
