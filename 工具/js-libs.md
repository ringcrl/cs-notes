# localForage

https://github.com/localForage/localForage

- 类似于 localStorage，但提供异步 API、存储多种类型不只是字符串
- 优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage

```js
// Set
localforage.setItem('key', 'value').then(doSomethingElse);
// localForage 同样支持回调函数
localforage.setItem('key', 'value', doSomethingElse);

// Get
localforage.getItem('somekey').then(function(value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
// 回调版本：
localforage.getItem('somekey', function(err, value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
});
```

# clientjs

获取浏览器唯一指纹：

- https://github.com/jackspirou/clientjs
- https://github.com/Valve/fingerprintjs2

```js
// Create a new ClientJS object
var client = new ClientJS();

// Get the client's fingerprint id
var fingerprint = client.getFingerprint();

// Print the 32bit hash id to the console
console.log(fingerprint);
```

# koa && koa-router

- https://github.com/koajs/koa
- https://github.com/ZijianHe/koa-router

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'body';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5555);
```

# jsdom

https://github.com/jsdom/jsdom

WHATWG DOM 和 HTML 标准的 JavaScript 实现，用于 NodeJS

```js
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM(htmlStr)).window;
```

# ejs

https://github.com/mde/ejs

嵌入式 JavaScript 模板

```html
<% if (HtmlData) { %>
  <h2><%= user.name %></h2>
<% } %>
```

```js
const template = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, "email.ejs"), "utf8")
);
const html = template(HtmlData);
```

# nodemailer

https://github.com/nodemailer/nodemailer

使用 NodeJS 发送邮件

```js
const nodemailer = require("nodemailer");

async function main(){
  // 使用 SMTP 传输创建可重用的传输器对象
  // 已知的服务：https://nodemailer.com/smtp/well-known/
  let transporter = nodemailer.createTransport({
    host: "QQ",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

(async () => {
  main().catch(console.error);
});

main().catch(console.error);
```

# chalk

https://github.com/chalk/chalk

让命令行内容样式好看

```js
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
```

# yargs

https://github.com/yargs/yargs

命令行参数解析器

```js
const argv = require('yargs').argv

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!')
} else {
  console.log('Retreat from the xupptumblers!')
}
```

# concurrently

https://github.com/kimmobrunfeldt/concurrently

`package.json` 的 script 中并发运行多个命令，例如 `gulp` 命令和 `tsc` 命令

```json
{
  "scripts": {
    "watch": "concurrently \"gulp --watch\" \"tsc --watch\""
  }
}
```

# prompts

https://github.com/terkelg/prompts

命令行对话框

```js
const prompts = require('prompts');

let questions = [
  {
    type: 'text',
    name: 'username',
    message: 'What is your GitHub username?'
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?'
  }
];

let response = await prompts(questions);

// => response => { username, age, about }
```

# eslint

https://cn.eslint.org/

配置好本地 `.eslintrc.js` 后全局安装依赖，可以在 VSCode 中直接使用

```sh
npm install -g eslint eslint-plugin-react
```

# images

https://github.com/zhangyuanwei/node-images

Node.js 轻量级跨平台图像编码库，用于处理下载下来的图片

```sh
yarn add images
```

```js
var images = require("images");

images("input.jpg")                     //Load image from file 
  //加载图像文件
  .size(400)                          //Geometric scaling the image to 400 pixels width
  //等比缩放图像到400像素宽
  .draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
  //在(10,10)处绘制Logo
  .save("output.jpg", {               //Save the image to a file, with the quality of 50
    quality: 50                    //保存图片到文件,图片质量为50
  });
```

# tesseract.js

https://github.com/naptha/tesseract.js

纯 JS 实现的 OCR（光学字符识别）工具，用于图像内容识别

```js
var Tesseract = require('tesseract.js')

Tesseract.recognize(myImage)
.then(function(result){
  console.log(result)
})
```

# socks5-http-client

https://github.com/mattcg/socks5-http-client

SOCKS v5，用于设置代理，在需要拉取某些不能直接访问的资源时使用，[request proxy 例子](https://github.com/request/request/tree/master/examples#proxys)

```js
var Agent = require('socks5-http-client/lib/Agent');

request({
  url: 'http://en.wikipedia.org/wiki/SOCKS',
  agentClass: Agent,
  agentOptions: {
    socksHost: 'my-tor-proxy-host', // Defaults to 'localhost'.
    socksPort: 9050 // Defaults to 1080.
  }
}, function (err, res) {
  console.log(err || res.body);
});
```

# 产品步骤引导库

https://juejin.im/post/5e972664518825736b74a24d

# wavesurfer.js

使用 Web Audio 和 Canvas 的交互式可导航音频可视化

https://github.com/katspaugh/wavesurfer.js

# JavaScript解释器

https://github.com/bplok20010/eval5