var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// path
var SCRIPTS_PATH = 'public/js/**/*.js';
//var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var HTML_PATH = 'public/**/*.htm';
var IMAGES_PATH = 'public/img/**/*.{png,jpeg,jpg,svg,gif}';

//task
gulp.task('scripts', function () {
    return gulp.src(SCRIPTS_PATH)
      .pipe(plumber(function (err) {
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});
// For CSS
// gulp.task('styles',function(){
//     return gulp.src(CSS_PATH)
//         .pipe(autoprefix())
//         .pipe(concat('styles.css'))
//         .pipe(clean())
//         .pipe(gulp.dest('public/dist'))
//         .pipe(livereload());
// });

 //For SCSS

 gulp.task('styles',function(){
    return gulp.src(SCSS_PATH)
 		.pipe(plumber(function (err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())       
        .pipe(autoprefix())
        .pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

gulp.task('html', function () {
    return gulp.src(HTML_PATH)
        .pipe(livereload());
});

gulp.task('images', function () {
	return gulp.src(IMAGES_PATH)
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegRecompress()
			]
		))
		.pipe(gulp.dest('public/dist/img'));
});

gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
    gulp.watch(HTML_PATH,gulp.series('html'));
	gulp.watch(SCSS_PATH,gulp.series('styles'));
	gulp.watch(IMAGES_PATH,gulp.series('images'));
});