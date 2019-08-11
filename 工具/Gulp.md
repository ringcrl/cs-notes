https://www.gulpjs.com.cn/

# 入门

## 安装

```sh
# 全局安装
npm install --global gulp

# 项目安装
npm install --save-dev gulp
```

## gulpfile.js

```js
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

## 运行

```sh
# 默认的名为 default 的任务（task）将会被运行
gulp

# 执行特定的任务（task）
gulp <task> <othertask>
```

# 实践

## gulp_imagemin

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () => {
  console.log('压缩中...', __dirname);
  return gulp
    .src(`${__dirname}/src/*`)
    .pipe(
      imagemin(
        [
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe(gulp.dest(`${__dirname}/dist`));
});
```

## less_to_ts

### less_to_ts.js

```js
const fs = require('fs');
const rimraf = require('rimraf');

const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');

const {
  src,
  blink_less,
  blink_css,
  css_ts_temp,
} = require('./alias');

console.log(src, blink_css)

// Transfer blink.less to blink.css
const less_to_css = () => gulp.src(blink_less)  
  .pipe(less())
  .pipe(gulp.dest(src));

// Add prefix to blink.css
const autoprefixer_css = () => gulp.src(blink_css)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({}))
  .pipe(gulp.dest(src));

// Minify the blink.css
const minify_css = () => gulp.src(blink_css)
  .pipe(minifycss())
  .pipe(rename({}))
  .pipe(gulp.dest(src));

// Write css data to css.temp.ts
// Custom gulp function needs to be async function or promise.
const write_to_ts = async () => {
  const css_str = fs.readFileSync(blink_css, 'utf-8');
  const css_ts_temp_str = `export const BLINK_CSS_CONTENT =  \`${ css_str }\`;`;

  // Write data to css.temp.ts
  fs.writeFileSync(css_ts_temp, css_ts_temp_str);

  // Delete the useless blink.css
  rimraf(blink_css, {}, (err) => {
    err && console.warn(err);
  });
};

// Connect all the tasks and export it.
module.exports = gulp.series(
  less_to_css,
  autoprefixer_css,
  minify_css,
  write_to_ts,
);
```

### index

```js
const gulp = require('gulp');
const build_css = require('./build_css');
exports.default = gulp.series(
  build_css,
)
```
