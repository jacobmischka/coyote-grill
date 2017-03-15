/* eslint-env node */
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		bundle: [
			'core-js/modules/es6.object.assign',
			'core-js/modules/es6.array.from',
			'core-js/modules/es6.array.iterator',
			'core-js/modules/es6.symbol',
			'core-js/modules/es6.promise',
			'./_js/bundle/index.js'
		],
		promotions: (process.env.NODE_ENV === 'production' ? [] : ['preact/devtools']).concat([
			'core-js/modules/es6.object.assign',
			'core-js/modules/es6.array.from',
			'core-js/modules/es6.array.iterator',
			'core-js/modules/es6.symbol',
			'core-js/modules/es6.promise',
			'./_js/promotions/index.js'
		]),
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
				use: 'babel-loader'
			},
			{
				test: /\.html$/,
				include: /svelte-components/,
				use: [
					'babel-loader',
					'svelte-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				include: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'assets/[name].[ext]'
					}
				}
			},
			{
				test: /\.yaml$/,
				use: 'yaml-loader'
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
