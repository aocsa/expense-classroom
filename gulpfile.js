var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var    livereload = require('gulp-livereload');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
 var historyApiFallback = require('connect-history-api-fallback');
var glob = require('glob-all');


gulp.task('styles', function() {
   return gulp.src('./build/bundled/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', function() {
  return gulp.src('./build/bundled/**/*')
    .pipe(ghPages());
});
 
// Watch files for changes & reload
gulp.task('serve', ['styles'], function() {
    browserSync({
        port: 3000,
        notify: false,
        logPrefix: 'PSK',
        snippetOptions: {
            rule: {
                match: '<span id="browser-sync-binding"></span>',
                fn: function(snippet) {
                    return snippet;
                }
            }
        },
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['.tmp', ''],
            middleware: [historyApiFallback()]
        }
    });

    gulp.watch(['**/*.html', '!bower_components/**/*.html'], reload);
    gulp.watch(['src/*.html'], reload);
    gulp.watch(['js/*'], reload);
    gulp.watch(['images/*'], reload);
    gulp.watch(['index.html'], reload);


});