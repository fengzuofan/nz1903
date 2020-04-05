const gulp = require('gulp');
gulp.task('copyfile',() => {
    return gulp.src('src/font/').pipe(gulp.dest)('dest/')
});