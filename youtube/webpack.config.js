'use strict';

module.exports = {
	entry: "./index",
	output: {
		filename: "build.js"
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: "source-map",

	module: {

		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	}
};