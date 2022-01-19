var gulp = require('gulp'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    amountOfStages = 10;

for (var i = 1; i < amountOfStages; i++) {
    (function () {
        var j = i;
        gulp.task('test-stage-' + j, function () {
            return gulp
                .src('spec/stage-' + j + '/index.html')
                .pipe(mochaPhantomJS());
        });
    })();
}