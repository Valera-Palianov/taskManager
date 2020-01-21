const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const appMode = (process.env.APP_MODE == "dev") ? 'development' : 'production'
const publicPath = (appMode === "production") ? './' : '/'

const config = {
	entry: {
		main: __dirname + "/src/index.jsx",
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + "/build",
		chunkFilename: '[name].bundle.js',
		publicPath: publicPath
	},
	mode: appMode,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: [
					/node_modules/
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/static/index.html",
			inject: "body"
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
}

if(appMode === 'production') {
	config.optimization = {
		minimizer: [new UglifyJsPlugin()]
	}
	config.plugins.push(
		new CopyWebpackPlugin([{
			from: __dirname + "/src/static"
		}])
	)
}

if(appMode === 'development') {
	config.devServer = {
		contentBase: './src/static',
		port: 3000,
		hot: true,
	}
}

module.exports = config