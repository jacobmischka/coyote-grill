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
				loaders: [
					'babel-loader',
					'svelte-loader'
				]
			},
			{
				test: /\.css$/,
				include: /typeface-/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]'
				}
			},
			{
				test: /\.yaml$/,
				loader: 'yaml-loader'
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
