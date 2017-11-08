
var path = require('path');
var base = require("./base");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = base.isProd;
var mode = base.mode;

var dist = path.join(__dirname,'dist');
var projectSrc = path.join(__dirname,base.projectName);



var extractCSS = new ExtractTextPlugin('css/[name].css?[hash:8]');
var extractSASS = new ExtractTextPlugin('css/[name].css?[hash:8]');

var plugins = [];
var entryObj = {
	nav: path.resolve(projectSrc,'js/nav.js')
};
var copyTo = path.resolve(dist,'js/');
if(isProd || mode == 'devprod'){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			// exclude: [/component\/contactsEdit\./, /vendor\/placeholder\./],
		 //    compress: {
		 //        warnings: false,
		 //        properties: false,
		 //        screw_ie8: true
   //      	},
   //      	mangle: { screw_ie8: true }
		   	 mangle: {
                screw_ie8: false,
                keep_fnames: true
        	},
		      mangleProperties: {
		        screw_ie8: false,
		        //ignore_quoted: true,      // do not mangle quoted properties and object keys
		      },
		      compress: {
		        screw_ie8: false, 
		        //properties: true // optional: don't convert foo["bar"] to foo.bar
		      },
		      output: {
		        screw_ie8: false         
		      }
		})
	);
}
plugins.push(extractCSS);
plugins.push(extractSASS);

// plugins.push(new webpack.ProvidePlugin({
// 	$:"jquery",
// 	jQuery:"jquery",
// 	"window.jQuery":"jquery"
// }));

base.pageConfig.map(function(item,i) {
	base.pageConfig[i].template = projectSrc+base.pageConfig[i].template;
	base.pageConfig[i].chunks.map(function(_item,_i){
		if(entryObj[_item] != base.sourceList.jsList[_item]){
			entryObj[_item] = base.sourceList.jsList[_item]	
		}
	})
	plugins.push(new HtmlWebpackPlugin(base.pageConfig[i]));
});

// plugins.push(new CopyWebpackPlugin([
// 	{ from: entryObj.nav, to: copyTo }
// ]))

module.exports = {
    entry: entryObj,
    output: {
        path: dist,
        filename: "js/[name].js",
        chunkFilename: "js/[chunkhash].js",
        publicPath: isProd ? "/" : (mode == 'devprod' ? '/kkweb/' : "/")
    },
    resolve: {
	    extensions: ['', '.coffee', '.js','.es6','.css','.scss','.png','.jpg','.jpeg','.gif'],
	},
    module: {
        loaders: [
	        {
	            test: /\.css$/,
	            loader: extractCSS.extract(['css','postcss'])
	        },
	        {
	        	test: /\.ejs$/, 
	        	loader: 'ejs-compiled?src='+path.join(projectSrc,'views/')
	        },
	        {
	            test: /\.js$/,
	            exclude: /node_modules/,
	            loader: ["babel-loader"],
	            query: {
	                presets: ['es2015', 'stage-2'],
	                cacheDirectory:'',
	                plugins: ["transform-es3-property-literals","transform-es3-member-expression-literals","transform-es2015-modules-commonjs"]
	            }
	        }, 
	        {
	            test: /\.scss$/,
	            loader: extractSASS.extract(['css','postcss','sass']),
	            exclude: /node_modules/
	        },
	        {
				test: /\.(png|gif|jpe?g|svg|eot|ttf|woff|woff2)$/,
				loader: 'url?limit=8192&name=images/[name].[ext]?[hash:8]!image-webpack?{mozjpeg:{progressive:true,quality: 85}, optipng:{ optimizationLevel: 4}}',
				exclude: /node_modules/
			}
        ]
    },
    // externals:{
    //     'jquery':'window.jQuery'
    // },
    'ejs-compiled-loader': {
		'htmlmin': false,
		'htmlminOptions': {
			removeComments: false
		}
	},
    postcss:[autoprefixer()],
    plugins:plugins,
	devServer: {
		contentBase:dist,
		colors: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		outputPath: dist,
		proxy: {
	        '/kkapi': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/kkapi' : '/kkapi'},
	          changeOrigin: true
	        },
	        '/Kkzc': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/Kkzc' : '/Kkzc'},
	          changeOrigin: true
	        },
	        '/resources': {
	          target: 'http://192.168.1.240/',
	          pathRewrite: {'^/resources' : '/resources'},
	          changeOrigin: true
	        }
	    }
	},
	devtool: (isProd || mode == 'devprod') ? '' : 'source-map'
}
