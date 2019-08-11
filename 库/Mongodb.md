<!--use-mongodb-->

学习使用 mongodb。

<!--more-->

教程地址：<http://www.mongodb.org.cn/tutorial/>

# 开始

## 安装

Mac 安装

```bash
brew install mongodb
```

查看使用提示

```bash
brew info mongodb
```

查看数据库

```bash
show dbs
```

## 基础用法

```bash
mongo

show dbs

use movie-trailer

show tables

db.dogs.find({})
```

# 核心概念

## MongoDB

### document

相当于关系型数据库的一行记录

### collection

集合，相当于关系型数据库的一张表

### database

多个有联系的集合组织在一起，就是一个数据库了

## Mongoose

### schema

表结构定义，映射到 collection，不具备操作数据的能力，是纯定义

### model

由 schema 发布的模型，具备某张表操作能力的一个函数集合

### entity

model 所创建的一个数据实体，某条数据，集合了一些方法.

# 使用 Mongoose

## 定义模型

模型是 Schema 类的实例。

```js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  author: ObjectId,
  title: {
    type: String,
    default: 'Untitled',
  },
  body: String,
  date: Date,
});

// 通过 mongoose 来注册一个模型
const Post = mongoose.model('BlogPost', PostSchema);

// 获取模型
const Post = mongoose.model('BlogPost');

// 操作模型
new Post({title: 'My title'})
  .save((err) => {
    if (err) { return; }
    console.log('That was easy!');
  })

```

Schema 只是一种简单的抽象，用来描述模型的样子以及它是如何工作的，数据交互发生在模型上，不是 Schema 上。

所以如果要查询，不是使用 `new Post` 而是使用静态方法 `Post.find`。

## 定义嵌套键

```js
const PostSchema = new Schema({
  author: ObjectId,
  title: {
    type: String,
    default: 'Untitled',
  },
  body: String,
  date: Date,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

可以使用点来操作属性

```js
db.blogposts.find({
  'meta.votes': 5,
});
```

## 定义嵌套文档

```js
const Comments = new Schema({
  title: String,
  body: String,
  date: Date,
});

const PostSchema = new Schema({
  author: ObjectId,
  title: {
    type: String,
    default: 'Untitled',
  },
  body: String,
  date: Date,
  meta: {
    votes: Number,
    favs: Number,
  },
  comments: [Comments],
});
```

## 构建索引

对指定的键做索引，需要传递一个 index 选项，并设置为 true

```js
const BlogPost = new Schema({
  author: ObjectId,
  title: { type: String, index: true },
  uid: { type: Number, unique: true },
});
```

组合索引，可以使用静态的 index 方法

```js
BlogPost.index({ key: -1, otherKey: 1 });
```

## 中间件

有时候会在不同的地方以不同的方式对同样的数据进行修改。

可以定义一些方法，在特定动作前执行：sava、remove

```js
BlogPost.pre('remove', (next) => {
  emailAuthor(this.email, 'Blog post removed!');
});
```

## 探测模型状态

有时候我们需要根据对当前模型做的不同更改进行不同的操作。

```js
BlogPost.pre('save', (next) => {
  if (this.isNew) {
    // doSomething
  } else {
    // doSomethingElse
  }
});
```

还可以通过 `this.dirtyPaths` 来侦测什么键被改了。

## 查询

在 Model 实例上暴露的常见操作有

- find
- findOne
- remove
- update
- count

## 扩展查询

如果对某个查询不提供回调函数，直到调用 run 它才会执行

```js
postMessage
  .find({ author: '4ef2cb' })
  .where('title', 'My title')
  .sort('content', -1)
  .limit(5)
  .run((err, post) => {
    // doSomething
  });
```

## 排序

要进行排序，只需提供排序的键和排序的顺序即可

```js
query.sort('key', 1);
query.sort('some.key', -1);
```

## 选择

若文档很大，想要的知识部分指定的键

```js
Post
  .find()
  .select('field', 'field2');
```

## 限制

想要限制查询结果的数量，用 limit

```js
query.limit(5);
```

## 跳过

跳过指定数量的文档数据

```js
query.skip(10);
```

这个功能结合 Model#count 对做分页非常有用

```js
postMessage.count((err, totalPosts) => {
  const numPages = Math.ceil(totalPosts / 10);
});
```

## 自动产生建

在查询一个博文时，我们还需要获取对应的作者。

```js
const BlogPost = new Schema({
  author: { type: ObjectId, ref: 'Author' },
  title: String,
  body: String,
});
```

之后就能自动产生作者数据，通过简单的对指定键调用 populate 即可

```js
BlogPost
  .find({ title: 'My title' })
  .populate('author')
  .run((err, doc) => {
    console.log(doc.author.email);
  });
```

## 转换

因为 Mongoose 提前知道需要什么数据类型，所以总是尝试做类型转换。如果在 Schema 中描述的是 Number 类型，存储前会将 `'21'` 转换为 `21`。
