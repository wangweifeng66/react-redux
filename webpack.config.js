const path = require('path');

module.exports = {
    entry: "./www/app/main.js",  
    output: {
        path: path.resolve(__dirname, "./www/dist"),
        filename: "all.js"
    },
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/ ,
				use: {
					loader: 'babel-loader',
					options: {
				  		presets: ['es2015','react'],
				  		plugins : ['transform-object-rest-spread']
					}
				}
			}
		]
	},
	watch : true
}