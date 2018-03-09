/* eslint-env node */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => ({
	entry: {
		bundle: [
			'./_js/polyfills.js',
			'./_js/bundle/index.js'
		],
		promotions: (
			argv.mode === 'production'
				? []
				: ['preact/devtools']
			).concat([
				'./_js/polyfills.js',
				'./_js/promotions/index.js'
			]),
		'promotions-homepage': './_js/promotions/homepage.js'
	},
	output: {
		path: path.join(__dirname, 'js'),
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
					{
						loader: 'svelte-loader',
						options: {
							emitCss: true,
							cascade: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: argv.mode === 'production'
					? ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
					: [
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
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
			disable: argv.mode !== 'production'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json'
		})
	],
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, '_site'),
		port: 3000,
		hot: true
	}
});
