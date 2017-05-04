'use strict';

var gulp = require("gulp"),
    scss = require("gulp-sass"),
    autoprefixer = require("autoprefixer"),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    useref = require("gulp-useref"),
    svgstore = require("gulp-svgstore"),
    svgmin = require("gulp-svgmin"),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    mqsort = require("gulp-group-css-media-queries"),
    postcss = require("gulp-postcss"),
    imagemin = require("gulp-imagemin"),
    browserSync = require("browser-sync").create();







//Запуск
gulp.task("default", ["clean"], function() {
    gulp.run("dev");
});

gulp.task("production", ["clean"], function() {
    gulp.run("build");
});



gulp.task("dev", ["build", "watch", "browser-sync"]);
gulp.task("build", ["html", "styles", "scripts", "assets","images"]);


gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["styles"]);
    gulp.watch("src/js/**/*.js", ["scripts"]);
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/assets/**/*.*", ["assets"]);
    gulp.watch("src/**/*.*").on("change", browserSync.reload);

});


//Svg спрайты
gulp.task("symbols", function() {
    return gulp.src("src/assets/img/svg/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('symbols.svg'))
        .pipe(gulp.dest('src/assets/img/svg/'));
});


//Стили
gulp.task("styles", function() {
    return gulp.src("src/scss/*.scss")
        
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 2 versions",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            })

        ]))
        .pipe(mqsort())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'))

});

//Очистка build
gulp.task('clean', function() {
    return gulp.src('./build/')
        .pipe(clean());
})

//Html
gulp.task("html", function() {
    gulp.src("src/*.html")
        .pipe(gulp.dest("build/"))
        .on("end", function() {
            gulp.run("useref");
        })
});

gulp.task("useref", function() {
    return gulp.src('./build/index.html')
        .pipe(useref())
        .pipe(gulp.dest('./build/'));
});

//Js
gulp.task("scripts", function() {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('./build/js/'))
        .pipe(uglify())
        .pipe(rename("interface.min.js"))
        .pipe(gulp.dest('./build/js/'));

});


//Минификация изображений
gulp.task("images", function() {
    return gulp.src("assets/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest("./build/assets/img/"));
});



gulp.task("browser-sync", function() {
    return browserSync.init({
        server: {
            baseDir: './build/'
        },
        startPath: "/ganna_product_03.html"

    });
});

gulp.task("assets", function() {
    return gulp.src("src/assets/**/*.*")
        .pipe(gulp.dest('./build/assets/'));
});



