var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var fs = require("fs");
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');  //插件，将图片换为base64的

//https://www.npmjs.com/package/gulp-less
//定义了一个任务叫做less
gulp.task('less', function () {
  return gulp.src('./www/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
    .pipe(gulp.dest('./www/css'));
});


//定义了一个合并任务
gulp.task('cssconcat', function() {
  return gulp.src('./www/css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./www/dist/'));
});

//定义一个删除文件夹的任务，NodeJS规定只能删除空文件夹，这里使用了递归来循环删除
gulp.task("clean",function(){
    var deleteFolder = function(path) {
    	var files = [];
    	if( fs.existsSync(path) ) {
        	files = fs.readdirSync(path);
        	files.forEach(function(file,index){
            	var curPath = path + "/" + file;
            	if(fs.statSync(curPath).isDirectory()) { // recurse
                	deleteFolder(curPath);
            	} else { // delete file
               	 fs.unlinkSync(curPath);
           	 	}
       		 });
        	fs.rmdirSync(path);
    	}
	};

	deleteFolder("./www/css");
});

//工作流
gulp.task("dev",["less"]);
gulp.task("build",["less" , "cssconcat" , "clean"]);

//监听
gulp.watch('./www/less/**/*.less' , ["dev"]);