var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
gulp.task('sass', function() {
  // convert sass into css
  return gulp.src('sass/app.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('css/'))
});

gulp.task('watch', function(){
  gulp.watch('sass/*.scss', ['sass']);
  // Other watchers
});


// Default Task
gulp.task('default', ['watch', 'sass']);
