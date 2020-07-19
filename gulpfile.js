const {
    src,
    dest,
    task,
    series,
    watch,
    parallel
} = require("gulp");

const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const svgo = require('gulp-svgo');
// const svgSprite = require("gulp-svg-sprite");
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {
    DIST_PATH,
    SRC_PATH,
    STYLES_LIBS,
    JS_LIBS
} = require('./gulp.config');

sass.compilier = require('node-sass');

task('clean', () => {
    return src(`${DIST_PATH}/**/**/*`, ).pipe(rm());
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({
            stream: true
        }));
});

task('copy:images', () => {
    return src(`${SRC_PATH}/img/**/*`)
        .pipe(dest(`${DIST_PATH}/img`))
        .pipe(reload({
            stream: true
        }));
});

task('copy:videos', () => {
    return src(`${SRC_PATH}/videos/**/*`)
        .pipe(dest(`${DIST_PATH}/videos`))
        .pipe(reload({
            stream: true
        }));
});

task('sass', () => {
    return src("src/scss/main.scss")
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${SRC_PATH}/styles`))
        .pipe(reload({
            stream: true
        }))
});

task('styles', () => {
    return src([...STYLES_LIBS, "src/styles/main.min.css"])
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.min.css'))
        // .pipe(px2rem())
        .pipe(gulpif(env == 'dev',
            autoprefixer({
                cascade: false
            })))
        .pipe(gulpif(env == 'prod', gcmq()))
        .pipe(gulpif(env == 'prod', cleanCSS({
            compatibility: 'ie8'
        })))
        .pipe(gulpif(env == 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({
            stream: true
        }))
});

task('scripts', () => {
    return src([...JS_LIBS, "src/scripts/*.js"])
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', {
            newLine: ";"
        }))
        .pipe(gulpif(env == 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env == 'prod', uglify()))
        .pipe(gulpif(env == 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({
            stream: true
        }))
})

// task('icons', () => {
//     return src('src/images/icons/*.svg') <--- После раскомментирования поменять прямое указание папок srs и dist на _LIBS, как в других тасках
//     .pipe(svgo({
//         plugins: [
//             {
//                 removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
//             }
//         ]
//     }))
//     .pipe(svgSprite({
//         mode: {
//             symbol: {
//                 sprite: "../sprite.svg"
//             }
//         }
//     }))
//     .pipe(dest('dist/images/icons'));
// });

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/**/*.scss', series('sass', 'styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/scripts/*.js', series('scripts'));
    watch('./src/img/**/*', series('copy:images'));
    // watch('./src/images/icons/*.svg', series('icons')); <--- После раскомментирования не забыть добавить в default после scripts
})

task(
    'default',
    series(
        'clean', 'sass',
        parallel('copy:html', 'copy:images', 'copy:videos', 'styles', 'scripts'),
        parallel('watch', 'server')
    ));

task(
    'build',
    series(
        'clean', 'sass',
        parallel('copy:html', 'copy:images', 'copy:videos', 'styles', 'scripts')
    ));
