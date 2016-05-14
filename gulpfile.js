var gulp = require('gulp');
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var buildPath = 'dist';
var webpack = require('webpack-stream');
var livereload = require('gulp-livereload');
var webpackConfig = require('./webpack.config');
var childProcess = require('child_process');
var nodemon = require('gulp-nodemon');
gulp.task('sass-build', function (done) {
    return runSequence(
        'sass-app',
        'sass',
        'autoprefix',
        done
    );
});
gulp.task('copy-assets', function () {
    return gulp.src([
            'client/fonts',
            'client/images',
            'client/livereload.js'
        ])
        .pipe(gulp.dest(path.join(buildPath)))
});

gulp.task('copy-sass', function () {
    return gulp.src([
            'client/scss/**/*.scss'
        ])
        .pipe(gulp.dest(path.join(buildPath, 'scss')))
});

gulp.task('copy-bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap-sass/assets/fonts/bootstrap/*'
    ]).pipe(gulp.dest(path.join(buildPath, 'fonts')));

    return gulp.src([
            'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/*.scss'
        ])
        .pipe(gulp.dest(path.join(buildPath, 'scss/partials/bootstrap')))
});

gulp.task('sass-app', function () {

    return gulp.src(['shared/**/*.scss'])
        .pipe(concat('_app.scss'))
        .pipe(gulp.dest(path.join(buildPath, 'scss/partials')));
});

gulp.task('append-app', function () {
    return gulp.src(['client/scss/style.scss'])
        .pipe(gulp.dest(path.join(buildPath, 'scss')))
        .on('end', function () {
            fs.appendFileSync(path.join(buildPath, 'scss/style.scss'),
                '\n@import "partials/app";');
        });
});

gulp.task('sass', function () {
    return gulp.src([
            path.join(buildPath, 'scss/style.scss')
        ])
        .pipe(sass({
            style: 'expanded',
            sourceComments: 'normal'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest(path.join(buildPath, 'css')))
        .pipe(livereload());
});

gulp.task('build', function (done) {
    return runSequence(
        'cleanup',
        'copy-assets',
        'copy-sass',
        'copy-bootstrap',
        'sass-app',
        'append-app',
        'sass',
        'webpack',
        done
    )
});

gulp.task('cleanup', function () {
    return gulp.src([
        path.join(buildPath, 'scss'),
        path.join(buildPath, 'css')
    ]).pipe(rimraf());
});

gulp.task('shared-sass-watch', function (done) {
    runSequence(
        'sass-app', 'append-app', 'sass', done
    );
});

gulp.task('client-sass-watch', function (done) {
    runSequence(
        'copy-sass', 'sass', done
    );
});

gulp.task('webpack', function () {
    return gulp.src('./client')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/'));
});

gulp.task('run-server', (function () {
    nodemon({
        script: 'index.js',
        ext: 'js html ejs',
        env: {
            NODE_PATH: './shared'
        }
    });
})());
gulp.task('watch', ['run-server', 'build'], function () {
    livereload.listen();

    gulp.watch('shared/**/*.scss', ['shared-sass-watch']);
    gulp.watch('client/scss/**/*.scss', ['client-sass-watch']);
    gulp.watch('shared/**/*.js', ['webpack']);
});


function runScript(scriptPath, callback) {
    var invoked = false;
    console.log('forever ' + scriptPath);
    var process = childProcess.spawn('node', [scriptPath], {
        cwd: __dirname,
        env: {
            NODE_PATH: './shared'
        }
    });

    process.on('error', function (err) {
        if (invoked) {
            return;
        }
        invoked = true;
        callback(err);
    });

    process.on('data', function(data) {
        callback(null, data);
    });

    process.on('exit', function (code) {
        if (invoked) {
            return;
        }

        invoked = true;
        callback('exit');
    });

    return process;
}
