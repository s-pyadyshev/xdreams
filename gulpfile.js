import gulp from "gulp";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import webpackConfig from "./webpack.config.js";
import gcmq from "gulp-group-css-media-queries";
import { deleteAsync } from "del";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import { createRequire } from "module";
import gulpSass from "gulp-sass";
import sassCompiler from "sass";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import browserSync from "browser-sync";
import historyApiFallback from "connect-history-api-fallback";
import emitty from "emitty";
import pug from "gulp-pug";
import webpackStream from "webpack-stream";
import formatHtml from "gulp-format-html";
import newer from "gulp-newer";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import mergeStream from "merge-stream";
import spritesmith from "gulp.spritesmith";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import replace from "gulp-replace";
import rename from "gulp-rename";
import vinylBuffer from "vinyl-buffer";
import postcss from "gulp-postcss";
import stylelint from "stylelint";
import postcssReporter from "postcss-reporter";
import postcssScss from "postcss-scss";
import eslint from "gulp-eslint";
// TODO https://github.com/center-key/w3c-html-validator

const sass = gulpSass(sassCompiler);
const server = browserSync.create();

// Configuration
const argv = yargs(hideBin(process.argv)).default({
  cache: true,
  debug: true,
  fix: false,
  minifyHtml: null,
  minifyCss: null,
  minifyJs: true,
  minifySvg: null,
  notify: true,
  open: true,
  port: 3000,
  spa: false,
  throwErrors: false,
}).argv;

argv.minify = !!argv.minify;
argv.minifyHtml = argv.minifyHtml !== null ? !!argv.minifyHtml : argv.minify;
argv.minifyCss = argv.minifyCss !== null ? !!argv.minifyCss : argv.minify;
argv.minifyJs = argv.minifyJs !== null ? !!argv.minifyJs : argv.minify;
argv.minifySvg = argv.minifySvg !== null ? !!argv.minifySvg : argv.minify;

if (argv.ci) {
  argv.cache = false;
  argv.notify = false;
  argv.open = false;
  argv.throwErrors = true;
  webpackConfig.mode = "production";
} else {
  webpackConfig.mode = webpackConfig.mode || "development";
}

const errorHandler = argv.throwErrors
  ? false
  : argv.notify
  ? notify.onError("<%= error.message %>")
  : null;

const svgoConfig =
  (minify = argv.minifySvg) =>
  (file) => ({
    js2svg: {
      pretty: !minify,
      indent: 2,
    },
    plugins: [
      {
        name: "cleanupIDs",
        params: {
          minify: true,
          prefix: `${path.basename(
            file.relative,
            path.extname(file.relative)
          )}-`,
        },
      },
      { removeViewBox: false },
      "removeTitle",
      "sortAttrs",
    ],
  });

let emittyPug = emitty.setup("src", "pug", {
  makeVinylFile: true,
});

const copy = () =>
  gulp
    .src(
      [
        "src/resources/**/*.*",
        "src/resources/**/.*",
        "!src/resources/**/.keep",
      ],
      {
        base: "src/resources",
        dot: true,
      }
    )
    .pipe(argv.cache ? newer("build") : debug())
    .pipe(argv.debug ? debug({ title: "copy" }) : debug())
    .pipe(gulp.dest("build"));

const images = () =>
  gulp
    .src("src/images/**/*.*")
    .pipe(argv.cache ? newer("build/images") : debug())
    .pipe(argv.debug ? debug() : debug())
    .pipe(gulp.dest("build/images"));

const spritesPng = () => {
  const spritesData = gulp
    .src("src/images/sprites/png/*.png")
    .pipe(plumber({ errorHandler }))
    .pipe(argv.debug ? debug({ title: "sprites:png" }) : debug())
    .pipe(
      spritesmith({
        cssName: "_sprites.scss",
        cssTemplate: "src/scss/_sprites.hbs",
        imgName: "sprites.png",
        retinaImgName: "sprites@2x.png",
        retinaSrcFilter: "src/images/sprites/png/*@2x.png",
        padding: 2,
      })
    );

  return mergeStream(
    spritesData.img
      .pipe(plumber({ errorHandler }))
      .pipe(vinylBuffer())
      .pipe(imagemin())
      .pipe(gulp.dest("build/images")),
    spritesData.css.pipe(gulp.dest("src/scss"))
  );
};

const spritesSvg = () =>
  gulp
    .src("src/images/sprites/svg/*.svg")
    .pipe(plumber({ errorHandler }))
    .pipe(argv.debug ? debug() : debug())
    .pipe(svgmin(svgoConfig()))
    .pipe(svgstore())
    .pipe(!argv.minifySvg ? replace(/^\t+$/gm, "") : debug())
    .pipe(!argv.minifySvg ? replace(/\n{2,}/g, "\n") : debug())
    .pipe(!argv.minifySvg ? replace("?><!", "?>\n<!") : debug())
    .pipe(!argv.minifySvg ? replace("><svg", ">\n<svg") : debug())
    .pipe(!argv.minifySvg ? replace("><defs", ">\n\t<defs") : debug())
    .pipe(!argv.minifySvg ? replace("><symbol", ">\n<symbol") : debug())
    .pipe(!argv.minifySvg ? replace("></svg", ">\n</svg") : debug())
    .pipe(rename("sprites.svg"))
    .pipe(gulp.dest("build/images"));

const pugCompile = () => {
  if (!argv.cache) {
    return gulp
      .src("src/*.pug")
      .pipe(plumber({ errorHandler }))
      .pipe(argv.debug ? debug() : debug())
      .pipe(
        pug({
          pretty: argv.minifyHtml ? false : 2,
        })
      )
      .pipe(gulp.dest("build"));
  }

  return new Promise((resolve, reject) => {
    emittyPug.scan(global.emittyPugChangedFile).then(() => {
      gulp
        .src("src/*.pug")
        .pipe(plumber({ errorHandler }))
        .pipe(emittyPug.filter(global.emittyPugChangedFile))
        .pipe(argv.debug ? debug() : debug())
        .pipe(
          pug({
            pretty: argv.minifyHtml ? false : "\t",
          })
        )
        .pipe(gulp.dest("build"))
        .on("end", resolve)
        .on("error", reject);
    });
  });
};

const runFormatHtml = () =>
  gulp
    .src("build/*.html")
    .pipe(
      formatHtml({
        indent_size: 4,
        indent_char: " ",
        eol: "\n",
        indent_level: 0,
        indent_with_tabs: false,
        preserve_newlines: true,
        max_preserve_newlines: 10,
        jslint_happy: false,
        space_after_anon_function: false,
        brace_style: "collapse",
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: true,
        break_chained_methods: false,
        eval_code: false,
        unescape_strings: false,
        wrap_line_length: 0,
        wrap_attributes: "auto",
        wrap_attributes_indent_size: 4,
        end_with_newline: false,
        extra_liners: ["head", "body", "main", "section"],
        inline: [
          "abbr",
          "area",
          "audio",
          "b",
          "bdi",
          "bdo",
          "br",
          "canvas",
          "cite",
          "code",
          "data",
          "datalist",
          "del",
          "dfn",
          "em",
          "embed",
          "i",
          "iframe",
          "input",
          "ins",
          "kbd",
          "keygen",
          "label",
          "map",
          "mark",
          "math",
          "meter",
          "noscript",
          "object",
          "output",
          "progress",
          "q",
          "ruby",
          "s",
          "samp",
          "select",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "template",
          "textarea",
          "time",
          "u",
          "var",
          "video",
          "wbr",
          "text",
          "acronym",
          "big",
          "dt",
          "ins",
          "strike",
          "tt",
        ],
      })
    )
    .pipe(gulp.dest("build"));

const scss = () => {
  const postcssPlugins = [
    autoprefixer({ grid: "autoplace" }),
    ...(argv.minifyCss
      ? [
          cssnano({
            preset: ["default", { discardComments: { removeAll: true } }],
          }),
        ]
      : []),
  ];

  return gulp
    .src(["src/scss/*.scss", "!src/scss/_*.scss"])
    .pipe(plumber({ errorHandler }))
    .pipe(argv.debug ? debug({ title: "scss" }) : debug())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gcmq())
    .pipe(gulp.dest("build/css"));
};

const js = () =>
  gulp
    .src(webpackConfig.entry)
    .pipe(plumber({ errorHandler }))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(webpackConfig.output.path));

const lintPug = () =>
  gulp.src(["src/*.pug", "src/pug/**/*.pug"]).pipe(plumber({ errorHandler }));

const lintScss = () =>
  gulp
    .src(["src/scss/**/*.scss", "!src/scss/vendor/**/*.scss"])
    .pipe(plumber({ errorHandler }))
    .pipe(
      postcss(
        [
          stylelint(),
          postcssReporter({
            clearReportedMessages: true,
            throwError: argv.throwErrors,
          }),
        ],
        { parser: postcssScss }
      )
    );

const lintJs = () =>
  gulp
    .src(["*.js", "src/js/**/*.js", "!src/js/vendor/**/*.js"], { base: "." })
    .pipe(plumber({ errorHandler }))
    .pipe(eslint({ fix: argv.fix }))
    .pipe(eslint.format())
    .pipe(gulpIf((file) => file.eslint?.fixed, gulp.dest(".")));

const validateHtml = () =>
  gulp.src("build/**/*.html").pipe(plumber({ errorHandler }));

const optimizeImages = () =>
  gulp
    .src("src/images/**/*.*")
    .pipe(plumber({ errorHandler }))
    .pipe(argv.debug ? debug({ title: "optimize:images" }) : debug())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imageminMozjpeg({ progressive: true, quality: 80 }),
      ])
    )
    .pipe(gulp.dest("src/images"));

const optimizeSvg = () =>
  gulp
    .src("src/images/**/*.svg", { base: "src/images" })
    .pipe(plumber({ errorHandler }))
    .pipe(argv.debug ? debug({ title: "optimize:svg" }) : debug())
    .pipe(svgmin(svgoConfig(false)))
    .pipe(gulp.dest("src/images"));

const watch = () => {
  gulp.watch(["src/resources/**/*.*", "src/resources/**/.*"], copy);

  gulp.watch("src/images/**/*.*", images);

  gulp.watch(
    ["src/images/sprites/png/*.png", "src/scss/_sprites.hbs"],
    spritesPng
  );

  gulp.watch("src/images/sprites/svg/*.svg", spritesSvg);

  gulp
    .watch(["src/*.pug", "src/pug/**/*.pug"], { delay: 0 }, pugCompile)
    .on("all", (event, file) => {
      global.emittyPugChangedFile = event === "unlink" ? undefined : file;
    });

  gulp.watch("src/scss/**/*.scss", scss);
  gulp.watch("src/js/**/*.js", js);
};

const serve = () => {
  const middleware = argv.spa ? [historyApiFallback()] : [];

  server.init({
    notify: true,
    open: argv.open,
    port: argv.port,
    files: ["./build/**/*"],
    server: {
      baseDir: "./build",
      middleware,
    },
  });
};

gulp.task("copy", copy);
gulp.task("images", images);
gulp.task("sprites:png", spritesPng);
gulp.task("sprites:svg", spritesSvg);
gulp.task("pug", pugCompile);
gulp.task("format-html", runFormatHtml);
gulp.task("scss", scss);
gulp.task("js", js);
gulp.task("lint:pug", lintPug);
gulp.task("lint:scss", lintScss);
gulp.task("lint:js", lintJs);
gulp.task("validate:html", validateHtml);
gulp.task("optimize:images", optimizeImages);
gulp.task("optimize:svg", optimizeSvg);
gulp.task("watch", watch);
gulp.task("serve", serve);

// Composite tasks
gulp.task("lint", gulp.series(lintPug, lintScss, lintJs));
gulp.task(
  "build",
  gulp.series(
    copy,
    pugCompile,
    gulp.parallel(images, spritesPng, spritesSvg, scss, js, runFormatHtml)
  )
);

gulp.task("default", gulp.series("build", gulp.parallel(watch, serve)));
