var gulp = require('gulp'),
	///引入组件
	jshint = require('gulp-jshint'), //js检测
	uglify = require('gulp-uglify'), //js压缩
	concat = require('gulp-concat'), //文件合并
	rename = require('gulp-rename'), //文件更名
	notify = require('gulp-notify'), //提示信息
	sass = require('gulp-sass'), //编译sass
	minifycss = require('gulp-minify-css'),
	babel = require('gulp-babel'),
	spriter = require('gulp-css-spriter'); //css图片合并
//合并,压缩css文件
gulp.task('sass', function() {
	return gulp.src('gulpcss/*.scss')
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('css'))
		.pipe(notify({
			message: 'sass task ok'
		}));
});
// 合并、压缩js文件
var createTask = function(pagejs, src) {
	return gulp.task(pagejs, function() {
		return gulp.src(src)
			.pipe(concat(pagejs + '.js'))
		// .pipe(babel({
		// 	presets: ['es2015']
		// }))
			.pipe(gulp.dest('js'))
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('js'))
			.pipe(notify({
				message: pagejs + ' task ok'
			}));
	});
};

var pageList = ['index', 'publicjs', 'blog', 'personcenter', 'personblog', 'sass'];
var listjs = function() {
	var src = [];
	for (var i = 0; i < pageList.length; i++) {
		var pagejs = "";
		pagejs = pageList[i];
		switch (pagejs) {
			case 'index':
				src = ['gulpjs/index/index.js'];
				createTask(pagejs, src);
				break;
			case 'publicjs':
				src = ['gulpjs/account/account.js'];
				createTask(pagejs, src);
				break;
			case 'blog':
				src = ['gulpjs/blog/blog.js'];
				createTask(pagejs, src);
				break;
			case 'personcenter':
				src = ['gulpjs/personcenter/personcenter.js'];
				createTask(pagejs, src);
				break;
			case 'personblog':
				src = ['gulpjs/personblog/personblog.js'];
				createTask(pagejs, src);
				break;
		};
	};
};
listjs();
// 默认任务
gulp.task('default', pageList, function() {
	// Watch .js files
	gulp.watch('gulpjs/index/*.js', ['index']);
	gulp.watch('gulpjs/account/*.js', ['publicjs']);
	gulp.watch('gulpjs/blog/*.js', ['blog']);
	gulp.watch('gulpjs/personcenter/*.js', ['personcenter']);
	gulp.watch('gulpjs/personblog/*.js', ['personblog']);
	gulp.watch('gulpcss/*.scss', ['sass']);
});