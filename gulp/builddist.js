'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('dist', function () {
    var lessOptions = {
      options: [
        // 'bower_components',
        options.src + '/app',
        options.src + '/components',
        '!' + options.src + '/app/vendor.less'
      ]
    };

    var injectFiles = gulp.src([
      options.src + '/{app,components}/**/*.less',
      '!' + options.src + '/app/index.less',
      '!' + options.src + '/app/vendor.less'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.src + '/app/', '');
        filePath = filePath.replace(options.src + '/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter('index.less');

    return gulp.src([
      options.src + '/app/index.less',
      // options.src + '/app/vendor.less'
    ])
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe($.rename('underscore.css'))
    .pipe(gulp.dest(options.dist + '/'))
    .pipe($.minifyCss({keepSpecialComments:'*'}))
    .pipe($.sourcemaps.write())
    .pipe($.rename('underscore.min.css'))
    .pipe(gulp.dest(options.dist + '/'));
    // .pipe(browserSync.reload({ stream: true }));
  });


  // gulp.task('builddist', ['clean'], function () {
  //   gulp.start('dist');
  // });
};
