/* eslint-env node */
module.exports = {
	entry: {
		bundle: './_js/main.js'
	},
	output: {
		path: './js/',
		publicPath: '/js/',
		filename: '[name].js'
	},
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	devtool: 'source-map'
};
