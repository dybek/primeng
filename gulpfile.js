'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    sass = require('gulp-sass');
    
gulp.task('build-css', function() {
	gulp.src([
        'src/app/components/common/common.css',
		    'src/app/components/**/*.css'
    ])
	.pipe(concat('primeng.css'))
	.pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'src/app/components/common/common.css',
        'src/app/components/**/*.css'
    ])
	  .pipe(concat('primeng.css'))
	  .pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primeng.min.css'))
    .pipe(gulp.dest('resources'));
});

gulp.task('images', function() {
    return gulp.src(['src/app/components/**/images/*.png', 'src/app/components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/components/themes/**/*'])
        .pipe(gulp.dest('resources/themes'));
});
//Build CSS to run the showcase locally
gulp.task('build-assets-css', function(){
  return gulp.src('src/assets/components/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/components'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['resources']);
});

//Building project with run sequence
gulp.task('build-assets', ['clean','build-css-prod', 'images', 'themes']);

