/* eslint-env node */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: process.env.NODE_ENV === 'production'
		? './_js/main.js'
		: [
			'preact/devtools',
			'./_js/main.js'
		],
	output: {
		path: './js/',
		publicPath: '/js/',
		filename: 'bundle.js'
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
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
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json'
		})
	],
	devtool: 'source-map'
};
