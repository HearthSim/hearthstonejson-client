var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: __dirname + "/src/HearthstoneJSON.ts",
	output: {
		filename: "index.js",
		library: "hearthstonejson",
		libraryTarget: "commonjs2",
	},
	resolve: {
		root: path.resolve("./src"),
		extensions: ["", ".ts", ".d.ts", ".js"],
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: [
					"babel-loader?presets[]=es2015",
					"ts-loader",
				],
				exclude: /node_modules/
			}
		]
	},
};
