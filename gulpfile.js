var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng-compress'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: true
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});
gulp.task('jquery', function () {
    return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('app/js'))
});


gulp.task('tiny', function () {
    return gulp.src('app/img/**/*.+(png|jpg|jpeg)')
        .pipe(cache(tinypng({
            key: 'IVBCPg0Rjh1AsWpQzuH9VSK5qla51OIx',
            sigFile: 'images/.tinypng-sigs',
            sameDest: true,
            log: true
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('img', ['tiny'], function () {
    return gulp.src('app/img/**/*.+(svg|ico)')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'jquery'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('clean', function () {
    return del.sync('dist');
});
gulp.task('build', ['clean', 'sass', 'jquery', 'img'], function () {
    var buildCss = gulp.src('app/css/**/*')
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);