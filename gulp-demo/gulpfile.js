const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//1.test
gulp.task('first',() => {
    console.log('first');
    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
});

//2.html 压缩
gulp.task('htmlmin',() => {
    gulp.src('./src/*.html')
        .pipe(fileinclude()) //抽取公共部分并加入各自文件方法
        .pipe(htmlmin({ collapseWhitespace:true}))
        .pipe(gulp.dest('dist'));
        
});

//3.css 压缩
gulp.task('cssmin',() => {
    gulp.src(['./src/css/*.less','./src/css/*.css']) //src可接受数组
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
})

//4.js 压缩
gulp.task('jsmin' ,() => {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets:['@babel/env']
        })) //判断环境并进行es6转换
        .pipe(uglify()) 
        .pipe(gulp.dest('dist/js'))
})

//5.文件夹复制
gulp.task('copy',() => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'))
    gulp.src('./src/lib/*')
        .pipe(gulp.dest('dist/lib'))
})

//6.构建任务
gulp.task('default',['htmlmin','cssmin','jsmin','copy']);