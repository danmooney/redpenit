const gulp = require('gulp');
const concat = require('gulp-concat');
const through = require('through2');
const path = require('path');
const watch = require('gulp-watch');
gulp.task('scripts', function () {
    return gulp.src('src/**/*.js').pipe(through.obj(function (file, enc, cb) {
        if (file.isBuffer()) {
            const filePath = path.relative(file.cwd, file.path);
            const comment = `// ${filePath}\n`;
            const wrappedContent = `document.addEventListener('DOMContentLoaded', function() {\n${file.contents.toString()}\n});\n`;
            file.contents = Buffer.concat([Buffer.from(comment), Buffer.from(wrappedContent)]);
        }
        cb(null, file);
    })).pipe(concat('main.js')).pipe(gulp.dest('build'));
});
gulp.task('watch', function () {
    watch('src/**/*.js', gulp.series('scripts'));
});
gulp.task('default', gulp.series('scripts', 'watch'));
