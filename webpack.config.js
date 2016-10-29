/* eslint-env node */
module.exports = {
	entry: './_js/main.js',
	output: {
		path: './js/',
		publicPath: '/js/',
		filename: 'bundle.js'
	},
	target: 'web',
	module: {
		loaders: [
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
	devtool: 'source-map'
};
