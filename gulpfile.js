var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['scss/**/*.scss'],
  js: ['js/app/**/*.js']
};

gulp.task('default', ['scss']);

gulp.task('scss', function(done) {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('css/'))
    .on('end', done);
});

gulp.task('js', function() {
  gulp.src([
    'js/lib/angular.js',
    'js/lib/angular-animate.js',
    'js/lib/ui-bootstrap-0.12.1.js',
    'js/app/app.js',
    'js/app/controllers/MainController.js',
    'js/app/controllers/FirstPageController.js',
    'js/app/controllers/SecondPageController.js',
    'js/app/controllers/ThirdPageController.js',
    'js/app/controllers/ForthPageController.js',
    'js/app/controllers/FifthPageController.js',
    'js/app/controllers/SixthPageController.js',
    'js/app/services/utils.js',
    'js/app/services/retirment.js',
    'js/app/directives/animatedNumber.js',
    'js/app/directives/formatMoney.js',
    'js/app/directives/pageCarousel.js',
    'js/app/directives/slotMachineText.js'
      ])
      .pipe(concat('app.min.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('js/dist/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['scss']);
  gulp.watch(paths.js, ['js']);
});