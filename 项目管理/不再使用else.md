<!--JAVASCRIPT-BUT-LESS-IFFY-->

“这很难，是因为它很复杂，还是因为对它不熟悉？熟悉度是接受更复杂代码的充分理由吗？“

发现一篇好文，看完之后写代码瞬间好理解了很多！！！翻译一下全文。

<!--more-->

原文地址：<https://jrsinclair.com/articles/2017/javascript-but-less-iffy/>

这是关于降低 JavaScript 代码复杂性的一系列文章的第三部分。在以前的文章中，我们认为[缩进是复杂性的一个指标](https://jrsinclair.com/articles/2017/indentation-is-the-enemy-less-complex-javascript/)。这不是一个准确或全面的指标，但它可以成为一个有用的指南。然后，我们研究了[如何用更高级别的抽象来代替循环](https://jrsinclair.com/articles/2017/javascript-without-loops/)。在这篇文章中，我们将注意力转向条件句。


不幸的是，我们不能完全摆脱条件句，这将意味着对大多数代码库进行彻底的重新设计(尽管技术上是可能的)。但是，我们可以改变我们写条件句的方式，使它们不那么复杂。我们将研究两种处理 if 语句的策略。之后，我们将把注意力转向转换语句。

# 没有 else 的 if 语句

重构条件句的第一种方法是去掉 else。我们写代码就好像 JavaScript 里面没有 else 语句一样。这似乎是一件奇怪的事情，但是大多数时候，我们根本不需要 else。

想象一下我们正在开发一个网站，我们通过AJAX加载。加载数据后，我们有一些用于呈现菜单的代码:

```js
function renderMenu(menuData) {
  let menuHTML = '';
  if ((menuData === null) || (!Array.isArray(menuData))) {
    menuHTML = '<div class="menu-error">Most profuse apologies. Our server seems to have failed in it’s duties</div>';
  } else if (menuData.length === 0) {
    menuHTML = '<div class="menu no-notifications">No new notifications</div>';
  } else {
    menuHTML = `
          <ul class="menu notifications">
            ${menuData.map((item) => `<li><a href="${item.link}">${item.content}</a></li>`).join('')}
          </ul>
        `;
  }
  return menuHTML;
}

```

这个代码可以工作。但是一旦我们确定没有要渲染的 notifications，再看其他语句有什么意义呢？为什么不直接 return `menuHTML` 呢？让我们重构一下，看看它是什么样子:

```js
function renderMenu(menuData) {
  if ((menuData === null) || (!Array.isArray(menuData))) {
    return '<div class="menu-error">Most profuse apologies. Our server seems to have failed in it’s duties</div>';
  }
  if (menuData.length === 0) {
    return '<div class="menu-no-notifications">No new notifications</div>';
  }

  return '<ul class="menu-notifications">'
    + menuData.map((item) => `<li><a href="${item.link}">${item.content}</a></li>`).join('')
    + '</ul>';
}
```

所以，我们已经修改了代码，这样，如果我们碰到了一个 `edge case`，我们就返回一些东西，然后离开那里。对于代码阅读者来说，如果你只关心这个 `edge case`，就没有必要再阅读下去了。我们知道在 if 语句之后不可能有任何相关的代码。不需要小心翼翼的向下细看和检查。

这个代码的另一个好处是“主”路径(返回一个 list)已经降低了缩进级别。这使得更容易看出这是代码中预期的“常规”路径。if 语句用于处理主路径的【例外】。这使得我们代码的意图更加清晰。

这种不使用 else 的策略称之为“提前 return、总是 return”。总的来说，我发现它使代码更清晰，有时可以减少计算量。例如，在上一篇文章中，我们看了 `find()`：

```js
function find(predicate, arr) {
  for (let item of arr) {
    if (predicate(item)) {
      return item;
    }
  }
}
```

在 `find()` 函数中，我们一找到要查找的项目，就返回退出循环，这使得代码更加高效。

- 早点返回，经常返回
- 去除 else 是一个好的开始，但是仍然会给我们留下很多缩进。更好的策略是采用三元运算符

# 不要害怕三元运算符

三元运算符名声不好，说它在降低代码可读性。三元运算符确实让代码难以阅读。但是，与传统的 if 语句相比，三元运算符有着巨大的优势。为了说明为什么我们必须深入研究 if 语句的作用。让我们来看一个例子:

```js
let foo;
if (bar === 'some value') {
  foo = baz;
}
else {
  foo = bar;
}
```

这很简单。但是，如果我们将这些块包装在立即调用函数表达式( IIFEs )中会发生什么呢？

```js
let foo;
if (bar === 'some value') (function () {
  foo = baz;
}())
else (function () {
  foo = qux;
}());
```

到目前为止，我们什么也没有改变，两个代码示例都做了同样的事情。但是请注意，IIFE 没有返回任何东西。这意味着它是不纯的。这是意料之中的，因为我们只是复制了原始的 if 语句。我们能把这些 IIFEs 函数重构为纯函数吗？事实上，我们不能。至少，每个块没有一个函数。我们不能这样做的原因是 if 语句不返回任何内容。[有人提议改变这一点](https://ponyfoo.com/articles/proposal-statements-as-expressions-using-do)，但是目前，我们必须接受这一点，除非我们早点 return，否则 if 语句也变得不纯。例如需要做点什么事，要么存个变量，要么在条件句里面产生一点副作用，除非我们可以早点 return。

如果我们将一个函数包装在整个 if 语句中会怎么样？我们可以让包装函数变得更纯吗？让我们试试。首先，我们将整个 if 语句包装在 IIFE 中:

```js
let foo = null;
(function () {
  if (bar === 'some value') {
    foo = baz;
  }
  else {
    foo = qux;
  }
})();
```

然后我们通过将条件语句包在一个立即执行函数中返回结果：

```js
let foo = (function () {
  if (bar === 'some value') {
    return baz;
  }
  else {
    return qux;
  }
})();
```

这是一个改进，因为我们不再改变任何变量。我们的 LIFE 对 foo 一无所知。但是它仍然在访问其范围之外的变量: bar、baz 和 qux。让我们先处理 baz 和 qux。我们将使它们成为函数的参数(注意最后一行) :

```js
let foo = (function (returnForTrue, returnForFalse) {
  if (bar === 'some value') {
    return returnForTrue;
  }
  else {
    return returnForFalse;
  }
})(baz, qux);
```

最后，我们需要处理 bar。我们也可以把它作为一个变量传入，但是我们总是把它和“某个值”相比较。如果我们将整个条件语句作为一个参数，我们可以增加一点灵活性:

```js
let foo = (function (returnForTrue, returnForFalse, condition) {
  if (condition) {
    return returnForTrue;
  }
  else {
    return returnForFalse;
  }
})(baz, qux, (bar === 'some value'));
```

现在，我们可以独立地将我们的 function 移出(并且去掉了 else) :

```js
function conditional(returnForTrue, returnForFalse, condition) {
  if (condition) {
    return returnForTrue;
  }
  return returnForFalse;
}

let foo = conditional(baz, qux, (bar === 'some value'));
```

我们做了什么？我们已经为设定值的 if 语句创建了一个抽象。如果我们愿意，我们可以用这种方式重构(几乎)所有的 if 语句，只要它们设置了一个值。因此，我们没有到处使用 if 语句，而是使用了纯函数调用。我们将删除一堆缩进并改进代码。

但是……我们并不真正需要有 `conditional()`。我们已经有了三元运算符，它执行完全相同的操作:

```js
let foo = (bar === 'some value') ? baz : qux;
```

三元运算符简洁，并内置于语言中。我们不需要编写或导入特殊函数来获得所有相同的能力。唯一真正的缺点是你不能真正使用`curry()` 和 `compose()` 搭配三元运算。所以，试试看。看看你是否可以用三元运算重构你的 if 语句。至少你将获得一个关于如何构造代码的新视角。

# 移除 switches

JavaScript 还有另一个条件结构，和 if 语句一样。switch 语句是另一种引入缩进和复杂性的控制结构。过一会儿，我们将研究如何编写没有 switch 的语句。但是首先，我想对他们说几句好话：

switch 语句是 JavaScript 中最接近模式匹配的东西。模式匹配是件好事。模式匹配是计算机科学家推荐我们使用的，而不是 if语句。因此，是可以很好地使用 switch 语句的。

switch 语句还允许您定义对多种情况的单个响应。这同样类似于其他语言中的模式匹配。在某些情况下，这可能非常方便。switch 语句也不总是不好的。

尽管这样，但在许多情况下，我们应该重构 switch 语句。让我们看一个例子，我们有三种不同类型的通知：

- 有人引用了他们写的一篇论文
- 有人开始“跟踪”他们的工作
- 有人在帖子中提到了他们

我们有不同的图标和文本格式，每种通知有不同的显示：

```js
let notificationPtrn;
switch (notification.type) {
  case 'citation':
    notificationPtrn = 'You received a citation from {{actingUser}}.';
    break;
  case 'follow':
    notificationPtrn = '{{actingUser}} started following your work';
    break;
  case 'mention':
    notificationPtrn = '{{actingUser}} mentioned you in a post.';
    break;
  default:
  // Well, this should never happen
}

// Do something with notificationPtrn
```

switch 语句有点讨厌的一件事是，忘记一次 `break` 太容易了。但是如果我们把它变成一个函数，我们可以使用以前的“提前 return，经常 return”技巧。这意味着我们可以摆脱 `break` 语句:

```js
function getnotificationPtrn(n) {
  switch (n.type) {
    case 'citation':
      return 'You received a citation from {{actingUser}}.';
    case 'follow':
      return '{{actingUser}} started following your work';
    case 'mention':
      return '{{actingUser}} mentioned you in a post.';
    default:
    // Well, this should never happen
  }
}

let notificationPtrn = getNotificationPtrn(notification);
```

这好多了。我们现在有了一个纯函数，而不是改变一个变量。但是，我们也可以使用一个 plain ol' JavaScript object (POJO) 来获得相同的结果:

```js
function getNotificationPtrn(n) {
  const textOptions = {
    citation: 'You received a citation from {{actingUser}}.',
    follow: '{{actingUser}} started following your work',
    mention: '{{actingUser}} mentioned you in a post.',
  }
  return textOptions[n.type];
}
```

这产生了与 `getnotificationPtrn` 相同的结果。它更紧凑。但是这更简单吗？

我们所做的是用数据替换控制结构。这比听起来更重要。现在，如果我们愿意，我们可以让 `TextOptions` 成为 `GetNotification()` 的一个参数。例如:

```js
const textOptions = {
  citation: 'You received a citation from {{actingUser}}.',
  follow: '{{actingUser}} started following your work',
  mention: '{{actingUser}} mentioned you in a post.',
}

function getNotificationPtrn(txtOptions, n) {
  return txtOptions[n.type];
}

const notificationPtrn = getNotificationPtrn(txtOptions, notification);
```

这可能不太有趣。但是现在考虑一下，`TextOptions` 是一个变量。这个变量不再需要硬编码。我们可以将它移动到 JSON 配置文件中，或者从服务器获取它。如果愿意，我们现在可以增加或者删除选项。我们可以合并不同的选项。这个版本中的缩进也少得多…

但是，您可能已经注意到，这些代码都没有处理我们未知类型的情况。在 switch 语句中，我们有 default 选项。如果遇到未知类型，我们可以用它来抛出错误。或者我们可以向用户返回一个的消息。例如:

```js
function getNotificationPtrn(n) {
  switch (n.type) {
    case 'citation':
      return 'You received a citation from {{actingUser}}.';
    case 'follow':
      return '{{actingUser}} started following your work';
    case 'mention':
      return '{{actingUser}} mentioned you in a post.';
    default:
      throw new Error('You’ve received some sort of notification we don’t know about.';
  }
}
```

我们处理了未知的情况，但是我们又使用了 switch 语句。我们能在 POJO 中处理这个问题吗？

一种选择是使用 if 语句:

```js
function getNotificationPtrn(txtOptions, n) {
  if (typeof txtOptions[n.type] === 'undefined') {
    return 'You’ve received some sort of notification we don’t know about.';
  }
  return txtOptions[n.type];
}
```

但是我们正试图减少我们的 if 语句。所以这也不理想。相反，我们将利用 JavaScript 的松散类型，结合一些布尔逻辑。如果 OR 表达式的第一部分是错误的，JavaScript 将只检查第二部分(||)。如果在对象中找不到类型，则类型将是 `undefined` 的。JavaScript将把 `undefined` 解释为 `false`。所以，我们像这样使用OR表达式:

```js
function getNotificationPtrn(txtOptions, n) {
    return txtOptions[n.type]
        || 'You’ve received some sort of notification we don’t know about.';
}
```

此外，我们也可以将默认值作为参数:

```js
const defaultTxt = 'You’ve received some sort of notification we don’t know about.';

function getNotificationPtrn(defaultTxt, txtOptions, n) {
  return txtOptions[n.type] || defaultTxt;
}

const notificationPtrn = getNotificationPtrn(defaultTxt, txtOptions, notification.type);
```

现在，这种方法比 `switch` 语句好吗？一如往常，答案是“这取决于...”。有些人可能会认为这个版本对于初学者来说很难阅读。这是一个合理的担忧。为了理解正在发生的事情，你必须了解 JavaScript 是如何强制值变成布尔值的。但是要问的问题是，“这很难，是因为它很复杂，还是因为对它不熟悉？熟悉度是接受更复杂代码的充分理由吗？“

但是可以减少代码的复杂度吗？让我们看看我们创建的最后一个函数。如果我们把它的名字改成更通用的名字(并调整最后一个参数)会怎么样？

```js
function optionOrDefault(defaultOption, optionsObject, switchValue) {
  return optionsObject[switchValue] || defaultOption;
}
```

然后，我们可以像这样构建 `getNotificationPtrn` 函数:

```js
const dflt = 'You’ve received some sort of notification we don’t know about.';

const textOptions = {
  citation: 'You received a citation from {{actingUser}}.',
  follow: '{{actingUser}} started following your work',
  mention: '{{actingUser}} mentioned you in a post.',
}

function getNotificationPtrn(notification) {
  return optionOrDefault(dflt, textOptions, notification.type);
}
```

我们现在有一个非常明确的概念。文本选项和默认消息现在是纯数据。它们不再嵌入控制结构中。我们还有一个方便的函数 `optionOrDefault()`，用于构建类似类型的构造。数据与选择显示哪个选项的任务完全分开。

当我们处理返回静态值时，这个模式很方便。根据我的经验，在大约 60-70% 的情况下，它可以取代 switch 语句。但是如果我们想做一些更有趣的事情呢？想象一下，如果我们的 options 对象包含函数而不是字符串，会发生什么？这篇文章已经太长了，所以我们不在这里深入讨论细节。但是这很值得考虑。

现在，像往常一样，小心使用你的大脑。`OptionOrDefault()` 这样的函数可以替换许多 `switch` 语句。但不是全部。在某些情况下，使用 `switch` 语句更有意义。没关系。

# 总结

重构条件比移除循环要更有用点。这部分是因为我们以许多不同的方式使用它们。然而，循环主要(但不总是)与数组一起使用。但是我们可以应用一些简单的模式来减少条件句之间的纠缠。它们包括:“提前 return”，“使用三元运算符”，以及“用对象替换 switch 语句”。这些不是银弹，而是用于对抗复杂情况的便利武器。
