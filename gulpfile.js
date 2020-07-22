let gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  del = require("del"),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  minify = require('gulp-minify'),
  cssnano = require('gulp-cssnano'),
  plumber = require("gulp-plumber"),
  eslint = require("gulp-eslint"),
  gulpStylelint = require('gulp-stylelint'),
  autoprefixer = require('gulp-autoprefixer');

const paths = {
  scss: {
    src: './src/scss/style.scss',
    dest: './dist/css',
    watch: './src/scss/**/*.scss',
    attached: './src/scss/**/attached/*.scss',
    bootstrap: './node_modules/bootstrap/scss/bootstrap.scss'
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    jquery: './node_modules/jquery/dist/jquery.min.js',
    popper: 'node_modules/popper.js/dist/umd/popper.min.js',
    src: './src/js/**/*',
    dest: './dist/js'
  },
  assets: {
    src: './src/images',
    dest: './dist/images',
  }
}

// ------------ Development Tasks -------------
// Clean assets
function clean() {
  return del(["./dist/"]);
}

// Compile Sass into CSS
function styles() {
  return gulp.src([paths.scss.bootstrap, paths.scss.src, paths.scss.attached])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssnano()) // Use cssnano to minify CSS
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.dest))
};

// ------------ Optimization Tasks -------------
// Copies image files to dist
function images() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin ([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ])))
    .pipe(gulp.dest(paths.assets.dest));
};

// Concatenating js files
function scripts() {
  return gulp.src([paths.js.bootstrap, paths.js.jquery, paths.js.popper, paths.js.src])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(minify())
    .pipe(gulp.dest(paths.js.dest))
};

// Lint scripts
function scriptsLint() {
  return gulp
    .src([paths.js.src, "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Lint scss
function scssLint() {
  return gulp
    .src([paths.scss.src, paths.scss.watch])
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

// Watches for changes while gulp is running
function watchFiles() {
  gulp.watch(['src/js/**/*.js'], gulp.series(scriptsLint, scripts));
  gulp.watch(['src/scss/**/*'], gulp.series(scssLint, styles));
  gulp.watch(['src/images/**/*'], images);
  console.log('Watching for changes');
};

// define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, images, scripts));
const watch = gulp.parallel(watchFiles)

// export tasks
exports.build = build;
exports.watch = watch;
exports.default = build;
