// Gulp
const gulp = require('gulp');

// Browser
const browserSync = require('browser-sync').create();

// HTML
const fileInclude = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');

// CSS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const groupMedia = require('gulp-group-css-media-queries');

// Files
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const fs = require('fs');

// Notification
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');


// JavaScript
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

// Images
const imagemin = require('gulp-imagemin');

// Watching for changed files
const changed = require('gulp-changed');

// Settings
const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
};

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%=  error.message %>',
            sound: false
        }),
    }
}

const renameSettings = {
    prefix: "",
    suffix: ".min"
};


// Tasks
gulp.task('clean:prod', function(done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false }).pipe(clean({ force: true}));
    }
    done();
})

gulp.task('html:prod', function(){
    return gulp
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html']) 
        .pipe(changed('./dist/',  { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('sass:prod', function(){
    return gulp
    .src('./src/scss/**/*.+(sass|scss)')
    .pipe(changed('./dist/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename(renameSettings))
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('images:prod', function(){
    return gulp
    .src('./src/img/**/*')
    .pipe(changed('./dist/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dist/img/'))
    .pipe(browserSync.stream());
});

gulp.task('fonts:prod', function(){
    return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./dist/fonts/'))
    .pipe(gulp.dest('./dist/fonts/'))
    .pipe(browserSync.stream());
});

gulp.task('icons:prod', function(){
    return gulp
    .src('./src/icons/**/*')
    .pipe(changed('./dist/icons/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dist/icons/'))
    .pipe(browserSync.stream());
});

gulp.task('js:prod', function(){
    return gulp
    .src('./src/js/*.js')
    .pipe(changed('./dist/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
})

gulp.task('server:prod', function() {

    browserSync.init({
        server: "./dist/"
    });
    gulp.watch("src/html/**/*.html").on('change', browserSync.reload);
});



