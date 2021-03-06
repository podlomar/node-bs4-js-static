const gulp   = require('gulp'),
      csso   = require('gulp-csso'),
      sass   = require('gulp-sass'),
			del    = require('del'),
			minify = require('gulp-minify');

// Delete all CSS files
gulp.task('css:clean', function() {
	return del('dist/css/*.css', { force: true });
});

// Compile CSS
gulp.task('css:compile', ['css:clean'], function() {
	return gulp.src('src/scss/*.scss')
			.pipe(sass())
			.pipe(csso())
			.pipe(gulp.dest('dist/css'));
});

// Delete all HTML files
gulp.task('html:clean', function() {
	return del('dist/**/*.html', { force: true });
});

// Copy all HTML files 
gulp.task('html:copy', ['html:clean'], function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'));
});

// Delete all JavaScript files
gulp.task('js:clean', function() {
	return del('dist/js/*.js', { force: true });
});

// Compile all JavaScript files 
gulp.task('js:compile', ['js:clean'], function() {
	return gulp.src('src/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('dist/js'));
});

// Delete all static files such as images etc.
gulp.task('static:clean', function() {
	return del([
			'dist/**/*', // delete all files
			'!dist/**/*.html', // except html
			'!dist/**/*.css' // except css
	], { force: true });
});

gulp.task('static:copy', ['static:clean'], function() {
	return gulp.src('src/static/**/*')
			.pipe(gulp.dest('dist'));
});

gulp.task('build', ['css:compile', 'html:copy', 'js:compile', 'static:copy']);

gulp.task('develop', ['build'], function() {
	gulp.watch('src/scss/*', ['css:compile']); // watch for changes in SCSS
	gulp.watch('src/**/*.html', ['html:copy']); // watch for changes in HTML
	gulp.watch('src/js/*.js', ['js:copy']); // watch for changes in JS
	gulp.watch('src/static/**/*', ['static:copy']); // watch for changes in static files
});
