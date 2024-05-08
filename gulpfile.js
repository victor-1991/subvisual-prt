const gulp = require('gulp');

//Tasks
require('./gulp/development');
require('./gulp/prod');

gulp.task(
    'default',
    gulp.series(
    'clean:dev', 
    gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'icons:dev', 'fonts:dev', 'js:dev'),
    gulp.parallel('server:dev', 'watch:dev')
));

gulp.task('prod', gulp.series(
    'clean:prod', 
    gulp.parallel('html:prod', 'sass:prod', 'images:prod', 'icons:prod', 'fonts:prod', 'js:prod'),
    gulp.parallel('server:prod')
));