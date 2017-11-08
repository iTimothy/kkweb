
var files = [];
var path = require('path');
var fs = require('fs');
var minimist = require('minimist');

var root = ''; //项目总目录

var argv = minimist(process.argv.slice(2), {
    string: ['src', 'mode']
});
var src = 'src/';
var mode = argv.mode;
var isProd = argv.mode === 'prod'; //运行模式

var ScanDir = function(path) {
    var that = this
    if (fs.statSync(path).isFile()) {
        return files.push(path)
    }
    try {
        fs.readdirSync(path).forEach(function(file) {
            ScanDir.call(that, path + '/' + file)
        })
    } catch (e) {}
};

var projectList = fs.readdirSync('./');

var project = path.join(__dirname,root,src);
var pageConfigFile = path.join(project,'page.js');


var isExists = fs.existsSync(pageConfigFile);
if(!isExists){
	console.error('page.js not found!');
	process.exit()
}

var pageConfig = require(pageConfigFile);


ScanDir(path.join(project));

var sourceList = {
	jsList:{},
	imgList:{},
	scssList:{},
	cssList:{},
	htmlList:{}
};

var jsStr = '/js/',strLen = jsStr.length;
files.map((item,i)=>{

	var extname = path.extname(item);
	var basename = path.basename(item,extname);
	switch(extname){
		case '.js':
			var temp = item.substring(item.indexOf(jsStr)+strLen);
			var entryJs = temp.substring(0,temp.indexOf(extname));
			sourceList.jsList[entryJs] = item;
			break;
		case '.gif':
			sourceList.imgList[basename] = item;
			break;
		case '.jpg':
			sourceList.imgList[basename] = item;
			break;
		case '.png':
			sourceList.imgList[basename] = item;
			break;
		case '.jpeg':
			sourceList.imgList[basename] = item;
			break;
		case '.scss':
			sourceList.scssList[basename] = item;
			break;
		case '.css':
			sourceList.cssList[basename] = item;
			break;
		case '.html':
			sourceList.htmlList[basename] = item;
			break;
	}
});

module.exports = {
	projectName: src,
	sourceList: sourceList,
	pageConfig: pageConfig,
	isProd: isProd,
	root: root,
	mode: mode
};
