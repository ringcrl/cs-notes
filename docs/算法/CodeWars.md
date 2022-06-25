本文件构建启发自 30-seconds-of-code，由 JS 文件打包生成 MD 文件

# CodeWars

- 非常好的刷题平台，面向测试用例编程，`cmd + s` 即可跑测试用例
- 题目有趣味且实用，习得的编码技巧很容易用到日常工作中
- 利用筛选条件例如【正则相关 + 好评度 + 难度】，能较为全面的掌握一个方向的知识
- 完成后发现更好的答案，重写一遍，有利于自己的编码习惯国际化

另一个刷题战场：[LeetCode](https://github.com/ringcrl/LeetCode)

docsify 阅读：[https://static.chenng.cn](https://static.chenng.cn/#/%E7%AE%97%E6%B3%95/CodeWars)

# 个人主页

[![CodeWars](https://www.codewars.com/users/ringcrl/badges/large)](https://www.codewars.com/users/ringcrl)

（所有图片会被 Github 包装一层，超过 4s 即超时，如无法显示可刷新重试）

# 刷题参数

- Sort By: Positive Feedback，>= 90%
- Language：JavaScript
- Status：Approved
- Progress：Kata I hava not completed
- Diffculty：To 6 kyu

[每日刷题](https://www.codewars.com/kata/search/my-languages?q=&xids=completed&beta=false&order_by=satisfaction_percent+desc%2Ctotal_completed+desc)

# 已刷题目

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [CodeWars](#codewars)
- [个人主页](#%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5)
- [刷题参数](#%E5%88%B7%E9%A2%98%E5%8F%82%E6%95%B0)
- [已刷题目](#%E5%B7%B2%E5%88%B7%E9%A2%98%E7%9B%AE)
- [API](#api)
  - [午夜时分.js](#%E5%8D%88%E5%A4%9C%E6%97%B6%E5%88%86js)
  - [计算餐费.js](#%E8%AE%A1%E7%AE%97%E9%A4%90%E8%B4%B9js)
- [位运算](#%E4%BD%8D%E8%BF%90%E7%AE%97)
  - [不用加减乘除做加法.js](#%E4%B8%8D%E7%94%A8%E5%8A%A0%E5%87%8F%E4%B9%98%E9%99%A4%E5%81%9A%E5%8A%A0%E6%B3%95js)
  - [二进制中1的个数.js](#%E4%BA%8C%E8%BF%9B%E5%88%B6%E4%B8%AD1%E7%9A%84%E4%B8%AA%E6%95%B0js)
  - [数组中只出现一次的数字.js](#%E6%95%B0%E7%BB%84%E4%B8%AD%E5%8F%AA%E5%87%BA%E7%8E%B0%E4%B8%80%E6%AC%A1%E7%9A%84%E6%95%B0%E5%AD%97js)
- [动态规划](#%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92)
  - [丑数.js](#%E4%B8%91%E6%95%B0js)
  - [变态跳台阶.js](#%E5%8F%98%E6%80%81%E8%B7%B3%E5%8F%B0%E9%98%B6js)
  - [斐波那契数列.js](#%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97js)
  - [跳台阶.js](#%E8%B7%B3%E5%8F%B0%E9%98%B6js)
- [哈希](#%E5%93%88%E5%B8%8C)
  - [字符流中第一个不重复的字符.js](#%E5%AD%97%E7%AC%A6%E6%B5%81%E4%B8%AD%E7%AC%AC%E4%B8%80%E4%B8%AA%E4%B8%8D%E9%87%8D%E5%A4%8D%E7%9A%84%E5%AD%97%E7%AC%A6js)
  - [找出高频数字.js](#%E6%89%BE%E5%87%BA%E9%AB%98%E9%A2%91%E6%95%B0%E5%AD%97js)
  - [第一个只出现一次的字符位置.js](#%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8F%AA%E5%87%BA%E7%8E%B0%E4%B8%80%E6%AC%A1%E7%9A%84%E5%AD%97%E7%AC%A6%E4%BD%8D%E7%BD%AEjs)
- [回溯](#%E5%9B%9E%E6%BA%AF)
  - [字符串的排列.js](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%8E%92%E5%88%97js)
  - [把数组排成最小的数.js](#%E6%8A%8A%E6%95%B0%E7%BB%84%E6%8E%92%E6%88%90%E6%9C%80%E5%B0%8F%E7%9A%84%E6%95%B0js)
- [堆](#%E5%A0%86)
  - [数据流中的中位数.js](#%E6%95%B0%E6%8D%AE%E6%B5%81%E4%B8%AD%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0js)
  - [最小的K个数.js](#%E6%9C%80%E5%B0%8F%E7%9A%84k%E4%B8%AA%E6%95%B0js)
  - [滑动窗口的最大值.js](#%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BCjs)
- [排序](#%E6%8E%92%E5%BA%8F)
  - [冒泡排序.js](#%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8Fjs)
  - [合并排序.js](#%E5%90%88%E5%B9%B6%E6%8E%92%E5%BA%8Fjs)
  - [快速排序.js](#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8Fjs)
  - [插入排序.js](#%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8Fjs)
  - [选择排序.js](#%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8Fjs)
- [数学](#%E6%95%B0%E5%AD%A6)
  - [延长的周末.js](#%E5%BB%B6%E9%95%BF%E7%9A%84%E5%91%A8%E6%9C%ABjs)
  - [父亲年龄是儿子两倍.js](#%E7%88%B6%E4%BA%B2%E5%B9%B4%E9%BE%84%E6%98%AF%E5%84%BF%E5%AD%90%E4%B8%A4%E5%80%8Djs)
  - [环形数字.js](#%E7%8E%AF%E5%BD%A2%E6%95%B0%E5%AD%97js)
  - [等概率随机函数.js](#%E7%AD%89%E6%A6%82%E7%8E%87%E9%9A%8F%E6%9C%BA%E5%87%BD%E6%95%B0js)
- [数组](#%E6%95%B0%E7%BB%84)
  - [Array.diff.js](#arraydiffjs)
  - [n个数之和.js](#n%E4%B8%AA%E6%95%B0%E4%B9%8B%E5%92%8Cjs)
  - [n个随机不重复的整数.js](#n%E4%B8%AA%E9%9A%8F%E6%9C%BA%E4%B8%8D%E9%87%8D%E5%A4%8D%E7%9A%84%E6%95%B4%E6%95%B0js)
  - [两个数组为子集关系.js](#%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E4%B8%BA%E5%AD%90%E9%9B%86%E5%85%B3%E7%B3%BBjs)
  - [二维数组的查找.js](#%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84%E7%9A%84%E6%9F%A5%E6%89%BEjs)
  - [产生间隔数组.js](#%E4%BA%A7%E7%94%9F%E9%97%B4%E9%9A%94%E6%95%B0%E7%BB%84js)
  - [大数求和.js](#%E5%A4%A7%E6%95%B0%E6%B1%82%E5%92%8Cjs)
  - [找到唯一不同的数字.js](#%E6%89%BE%E5%88%B0%E5%94%AF%E4%B8%80%E4%B8%8D%E5%90%8C%E7%9A%84%E6%95%B0%E5%AD%97js)
  - [把数组排成最小的数.js](#%E6%8A%8A%E6%95%B0%E7%BB%84%E6%8E%92%E6%88%90%E6%9C%80%E5%B0%8F%E7%9A%84%E6%95%B0js-1)
  - [排名位置.js](#%E6%8E%92%E5%90%8D%E4%BD%8D%E7%BD%AEjs)
  - [数组中重复的数字.js](#%E6%95%B0%E7%BB%84%E4%B8%AD%E9%87%8D%E5%A4%8D%E7%9A%84%E6%95%B0%E5%AD%97js)
  - [构建乘积数组.js](#%E6%9E%84%E5%BB%BA%E4%B9%98%E7%A7%AF%E6%95%B0%E7%BB%84js)
  - [树状结构转换.js](#%E6%A0%91%E7%8A%B6%E7%BB%93%E6%9E%84%E8%BD%AC%E6%8D%A2js)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API

## 午夜时分.js

```js
/**
 * 编写一个采用负整数或正整数的函数，表示(-)周日午夜前或(+)周日午夜后的分钟数，
 * 并以24小时格式(“hh:mm”)作为字符串返回一周中的当前日期和当前时间
 * 
  dayAndTime(0)       should return 'Sunday 00:00'
  dayAndTime(-3)      should return 'Saturday 23:57'
  dayAndTime(45)      should return 'Sunday 00:45'
  dayAndTime(759)     should return 'Sunday 12:39'
  dayAndTime(1236)    should return 'Sunday 20:36'
  dayAndTime(1447)    should return 'Monday 00:07'
  dayAndTime(7832)    should return 'Friday 10:32'
  dayAndTime(18876)   should return 'Saturday 02:36'
  dayAndTime(259180)  should return 'Thursday 23:40' 
  dayAndTime(-349000) should return 'Tuesday 15:20'
 */
function dayAndTime(n) {
  const ms = new Date('2019 4 7 00:00:00').setMinutes(n);
  const date = new Date(ms);
  const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${map[date.getDay()]} ${date.toTimeString().slice(0, 5)}`;
}
```

## 计算餐费.js

```js
/**
 * 
 * @param {*} subtotal 餐费
 * @param {*} tax 税率整数
 * @param {*} tip 消费整数
 */
function calculate_total(subtotal, tax, tip) {
  // toFixed 接收【数字】入参，返回值是【字符串】
  return (subtotal + tax / 100 * subtotal + tip / 100 * subtotal).toFixed(2) - 0;
}
```

# 位运算

## 不用加减乘除做加法.js

```js
/**
 * 写一个函数，求两个整数之和，要求不得使用 +、-、*、/ 四则运算符号
 * 
 * a ^ b 表示没有考虑进位的情况下两数的和，(a & b) << 1 就是进位
 * 递归会终止的原因是 (a & b) << 1 最右边会多一个 0
 * 那么继续递归，进位最右边的 0 会慢慢增多，最后进位会变为 0，递归终止
 */
function Add(a, b) {
  return b == 0 ? a : Add(a ^ b, (a & b) << 1);
}

console.log(Add(2, 3));
```

## 二进制中1的个数.js

```js
/**
 * 输入一个整数，输出该数二进制表示中 1 的个数
 */
function numberOf1(n) {
  let cnt = 0;
  while (n !== 0) {
    cnt++;
    n &= (n - 1);
  }
  return cnt;
}

console.log(numberOf1(10));
// (10).toString(2) 1010
```

## 数组中只出现一次的数字.js

```js
/**
 * 一个整型数组里除了一个数字之外，其他的数字都出现了两次，找出这两个数
 * 
 * 1. 两个相同的数字 ^ 结果是 0
 * 2. 0 ^ n 结果是 n
 * 3. n ^ m ^ n 结果是 m
 */
const singleNumber = function (nums) {
  let diff = nums.reduce((prev, curr) => {
    return prev ^= curr;
  });
  return diff;
};

console.log(singleNumber([4, 1, 2, 1, 2]));
```

# 动态规划

## 丑数.js

```js
/**
 * 把只包含因子 2、3 和 5 的数称作丑数（Ugly Number）。
 * 例如 6、8 都是丑数，但 14 不是，因为它包含因子 7。
 * 习惯上我们把 1 当做是第一个丑数。
 * 求按从小到大的顺序的第 N 个丑数
 */
function getNUglyNumber(n) {
  if (n <= 6) {
    return n;
  }

  let i2 = 0;
  let i3 = 0;
  let i5 = 0;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  for (let i = 1; i < n; i++) {
    const next2 = dp[i2] * 2;
    const next3 = dp[i3] * 3;
    const next5 = dp[i5] * 5;
    dp[i] = Math.min(
      next2,
      Math.min(next3, next5),
    );
    if (dp[i] === next2) {
      i2++;
    }
    if (dp[i] === next3) {
      i3++;
    }
    if (dp[i] === next5) {
      i5++;
    }
  }
  return dp[n - 1];
}

console.log(getNUglyNumber(10));
```

## 变态跳台阶.js

```js
/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级
 * 它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法
 * 
 * 1. 跳上 n-1 级台阶，可以从 n-2 级跳 1 级上去，也可以从 n-3 级跳 2 级上去
 *    f(n-1) = f(n-2) + f(n-3) + ... + f(0)
 * 2. 跳上 n 级台阶，可以从 n-1 级跳 1 级上去，也可以从 n-2 级跳 2 级上去.
 *    f(n) = f(n-1) + f(n-2) + ... + f(0)
 * 3. f(n) - f(n-1) = f(n-1) => f(n) = 2*f(n-1)
 */

function JumpFloorII(target) {
  const dp = new Array(target).fill(1);
  for (let i = 1; i < target; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j];
    }
  }
  return dp[target - 1];
}
```

## 斐波那契数列.js

```js
/**
 * 求斐波那契数列的第 n 项，n <= 39
 * 
 * 递归是将一个问题划分成多个子问题求解，动态规划也是如此，
 * 但是动态规划会把子问题的解缓存起来，从而避免重复求解子问题
 */
function fibonacci(n) {
  if (n <= 1) { return n; }
  const fib = [];
  fib[0] = 0;
  fib[1] = 1;
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}
```

## 跳台阶.js

```js
/**
 * 一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级
 * 求该青蛙跳上一个 n 级的台阶总共有多少种跳法
 */
function JumpFloor(n) {
  if (n <= 2) {
    return n;
  }
  let total;
  let pre2 = 1;
  let pre1 = 2;
  for (let i = 2; i < n; i++) {
    total = pre2 + pre1;
    pre2 = pre1;
    pre1 = total;
  }
  return total;
}
```

# 哈希

## 字符流中第一个不重复的字符.js

```js
/**
 * 请实现一个函数用来找出字符流中第一个只出现一次的字符
 * 例如，当从字符流中只读出前两个字符 "go" 时，第一个只出现一次的字符是 "g"
 * 当从该字符流中读出前六个字符“google" 时，第一个只出现一次的字符是 "l"
 */
function FirstAppearingOnce(str) {
  const map = str.split('').reduce((prev, curr) => {
    prev[curr] = prev[curr] ?
      prev[curr] + 1 :
      1;
    return prev;
  }, {});
  for (const key in map) {
    if (map[key] === 1) {
      return key;
    }
  }
}

console.log(FirstAppearingOnce('google'));
```

## 找出高频数字.js

```js
/**
  已知⼀一个 int 数组，数组中每个数字出现的频率都不不相同，实现⼀个 topKFrequent 函数返回
  该数组中频率前 K ⾼高的数字。

  例例⼦子1:
  let nums = [1,1,1,2,2,3], k = 3;
  topKFrequent(nums, k); // 输出为:[1,2,3]
  例例⼦子2:
  let nums = [1,1,2,2,2,3], k = 2;
  topKFrequent(nums, k); // 输出为:[2,1] // 例例⼦子3
  let nums = [1,1,1,2,2,3,3,3,3], k = 1;
  console.log(topKFrequent(nums, k)); // 输出为:[3]
 */
function topKFrequent(nums, k) {
  const numberMap = nums.reduce((prev, curr) => {
    prev[curr] ? (prev[curr] += 1) : (prev[curr] = 1);
    return prev;
  }, {});

  const values = Object.entries(numberMap);
  const valuesSorted = values.sort((a, b) => {
    return b[1] - a[1];
  });
  return valuesSorted.slice(0, k).map((item) => {
    return item[0];
  });
}

```

## 第一个只出现一次的字符位置.js

```js
/**
 * 在一个字符串中找到第一个只出现一次的字符，并返回它的位置
 */
function FirstNotRepeatingChar(str) {
  const cnts = Array(str.length).fill(0);
  for (let i = 0; i < str.length; i++) {
    cnts[str[i]]++;
  }
  for (let i = 0; i < str.length; i++) {
    if (cnts[str[i]] === 1) {
      return i;
    }
  }
  return -1;
}

console.log(FirstNotRepeatingChar([1, 2, 3, 4, 3, 2, 1]));
```

# 回溯

## 字符串的排列.js

```js
/**
 * 输入一个字符串，按字典序打印出该字符串中字符的所有排列。
 * 例如输入字符串 abc，则打印出由字符 a, b, c 所能排列出来的所有字符串
 * abc, acb, bac, bca, cab 和 cba
 */
function Permutation(str) {
  if (!str || str.length === 0) {
    return [];
  }
  let result = [];
  const arr = str.split('');
  let temp = '';
  ordering(arr);
  result = result.filter(function (item, index) {  //去重
    return result.indexOf(item) === index;
  });
  return result;

  function ordering(tempArr) {
    if (tempArr.length === 0) {
      result.push(temp);
      return;
    }
    for (let i = 0; i < tempArr.length; i++) {
      temp += tempArr[i];
      const insideArr = tempArr.concat();
      insideArr.splice(i, 1);
      ordering(insideArr);
      temp = temp.substring(0, temp.length - 1);   //回溯
    }
  }
}
```

## 把数组排成最小的数.js

```js
/**
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 * 例如输入数组 {3，32，321}，
 * 则打印出这三个数字能排成的最小数字为 321323。
 */
function PrintMinNumber(numbers) {
  if (!numbers || numbers.length === 0) {
    return [];
  }
  let result = [];
  let temp = '';
  ordering(numbers);

  result = result.map(Number).reduce(function (min, a) {  //最小值
    return min < a ? min : a;
  }, Infinity);
  return result;

  function ordering(tempArr) {
    let innerLen = 0;
    if (tempArr.length === 0) {
      result.push(temp);
      return;
    }
    for (let i = 0; i < tempArr.length; i++) {
      innerLen = tempArr[i].toString().length;
      temp += tempArr[i];
      const insideArr = tempArr.concat();
      insideArr.splice(i, 1);
      ordering(insideArr);
      temp = temp.substring(0, temp.length - innerLen);   //回溯
    }
  }
}
```

# 堆

## 数据流中的中位数.js

```js
/**
 * 如何得到一个数据流中的中位数？
 * 如果从数据流中读出奇数个数值，
 * 那么中位数就是所有数值排序之后位于中间的数值。
 * 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值
 * 
 * 使用 5、6 来区分中位数
 */
function getMedian(arr) {
  arr.sort((a, b) => a - b);
  if (arr.lenth % 2 === 0) {
    const left = Math.floor(arr.lenth / 2);
    const right = left + 1;
    return (arr[left] + arr[right]) / 2;
  } else {
    const mid = Math.ceil(arr.lenth / 2);
    return arr[mid];
  }
}
```

## 最小的K个数.js

```js
/**
 * 返回数组最小的 K 个数
 * 
 * 1. 使用堆，需要构建堆这个数据结构
 * 2. 直接快排
 */
function findKthSmallest(arr, k) {
  arr.sort((a, b) => a - b);
  return arr.slice(0, k);
}
```

## 滑动窗口的最大值.js

```js
/**
 * 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
 * 例如，如果输入数组 {2, 3, 4, 2, 6, 2, 5, 1} 及滑动窗口的大小 3，
 * 那么一共存在 6 个滑动窗口，他们的最大值分别为 {4, 4, 6, 6, 6, 5}。
 */
function maxInWindows(arr, size) {
  if (size > arr.length || size === 0) {
    return [];
  }
  const res = [];
  let maxIndex = -1;
  for (let l = 0, r = size - 1; r < arr.length; l++, r++) {
    if (maxIndex < l) {
      maxIndex = getMaxIndex(arr, l, r);
    }
    if (arr[r] > arr[maxIndex]) {
      maxIndex = r;
    }
    res.push(arr[maxIndex]);
  }
  return res;
}

function getMaxIndex(arr, l, r) {
  let index = l;
  for (let i = l; i <= r; i++) {
    if (arr[i] > arr[index]) {
      index = i;
    }
  }

  return index;
}
```

# 排序

## 冒泡排序.js

```js
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 内循环 - 外循环中已经跑过的轮数，避免内循环不必要的比较
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

function swap(arr, i, j) {
  [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
}

console.log(bubbleSort([ 2, 3, 4, 1, 7, 4, 3, 6, 9, 7 ]));

```

## 合并排序.js

```js
/**
 * 并归排
 * 1. 归并排序使用了分治的思想，而这个过程需要使用递归来实现
 * @param {Array} arr 
 */
function mergeSort(arr) {
  // 如果分解到只剩下一个数，返回该数
  if (arr.length === 1) { return arr; }

  // 将数组分成左右两半
  const mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  // 对两半分别进行排序
  left = mergeSort(left);
  right = mergeSort(right);

  // 合并排序后的两半
  return merge(left, right);
}

function merge(a, b) {
  const merged = [];
  let mi = 0;
  let ai = 0;
  let bi = 0;

  // 轮流从两个数组中取出较小的值，放入合并后的数组
  while (ai < a.length && bi < b.length) {
    if (a[ai] <= b[bi]) {
      merged[mi++] = a[ai++];
    } else {
      merged[mi++] = b[bi++];
    }
  }

  // 将某个数组内剩余的数字合并后放入数组中
  if (ai < a.length) {
    for (let i = ai; i < a.length; i++) {
      merged[mi++] = a[i];
    }
  } else {
    for (let i = bi; i < b.length; i++) {
      merged[mi++] = b[i];
    }
  }

  return merged;
}

console.log(mergeSort([2, 3, 4, 1, 7, 4, 3, 6, 9, 7]));
```

## 快速排序.js

```js
/**
 * 快排
 * @param {Array} arr 
 */
function quickSort(arr) {
  if (arr.length === 0) { return arr; }

  const [pivot, ...rest] = arr;
  const smaller = [];
  const bigger = [];
  
  rest.forEach((x) => {
    return x < pivot ? 
      smaller.push(x) :
      bigger.push(x);
  });

  return [...quickSort(smaller), pivot, ...quickSort(bigger)];
}

console.log(quickSort([2, 3, 4, 1, 7, 4, 3, 6, 9, 7]));
```

## 插入排序.js

```js
function insertionSort(arr) {
  const len = arr.length;
  let j;
  let temp;

  // 认为第一项已经排序了，所以从索引 1 开始
  // 迭代数组来给第 i 项找到正确的位置
  for (let i = 1; i < len; i++) {
    j = i; // 使用 i 来初始化一个辅助变量
    temp = arr[i]; // 将上一步对应的值存储于一个临时变量中，便于之后将其插入到正确的位置上
    // 找到正确的位置来插入项目
    // 只要变量 j 比 0 大（数组的第一个索引为 0）,并且数组中前面的值比待比较的值大
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]; // 把这个值移到当前位置上，并减小 j
      j--;
    }
    arr[j] = temp;
  }

  return arr;
}

console.log(insertionSort([ 2, 3, 4, 1, 7, 4, 3, 6, 9, 7 ]));

```

## 选择排序.js

```js
function selectionSort(arr) {
  const len = arr.length;
  let indexMin;
  for (let i = 0; i < len - 1; i++) { // 控制迭代轮次
    indexMin = i; // 假设本轮迭代的 i 值为数组的 indexMin
    for (let j = i; j < len; j++) { // 从当前 i 的值开始到数组结束
      if (arr[indexMin] > arr[j]) { // 比较是否位置 j 的值比当前最小值小
        indexMin = j; // 如果是，则改变 indexMin 为新的 j
      }
    }

    // 内循环结束，得出 indexMin 的值

    if (i !== indexMin) { // 如果该最小值与原最小值不同，则交换其值
      swap(arr, i, indexMin);
    }
  }

  return arr;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(selectionSort([2, 3, 4, 1, 7, 4, 3, 6, 9, 7]));
```

# 数学

## 延长的周末.js

```js
/**
 * 如果一个月的第一天是周五
 * 大多数时候这个月有 5 个周五、周六、周天
 * 给定一个年份区间，找出所有的情况，返回格式
   solve(2016,2020) = ['Jan','May',5]
 */

function solve(begin, end) {
  const month = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
  let count = 0;
  const res = [];
  for (let i = begin; i <= end; i++) {
    for (const m of month) {
      const date = `${m} 1, ${i}`;
      if (new Date(date).getDay() === 5) {
        res.push(m);
        count++;
      }
    }
  }
  return [res[0], res[res.length - 1], count];
}
```

## 父亲年龄是儿子两倍.js

```js
/**
 * 多少年前(后)，父亲的年龄是儿子的两倍
 */
function twiceAsOld(dadYearsOld, sonYearsOld) {
  return Math.abs(dadYearsOld - 2 * sonYearsOld);
}
```

## 环形数字.js

```js
/**
 * 给定一个 n 和 firstNumber
 * 从 0 到 n - 1 组成一个圆环
 * 找出 firstNumber 的对面的那个数字
 */
function circleOfNumbers(n, firstNumber) {
  const half = n / 2;
  return firstNumber >= half ?
    firstNumber - half :
    firstNumber + half;
}

console.log(circleOfNumbers(10, 2)); // 7
```

## 等概率随机函数.js

```js
/**
 * 已知函数 oneToFive 可以生成 [1, 5] 的随机数
 * 利用这个 oneToFive 函数生成一个可以产生 [1, 7] 随机数的函数
 */
function oneToFive() {
  return Math.floor(Math.random() * 5 + 1);
}

// 利用 oneToFive()函数生成 1-25 之间的数字
// 然后将其中的 1-21 映射成 1-7，丢弃 22-25
// 例如生成 (1，1)，(1，2)，(1，3)，则看成 oneToSeven()中的 1，如果出现剩下的 4 种，则丢弃重新生成
// 此题中 N 为5，因此可以使用rand5()*5+rand5()来产生 2 位的 5 进制数，范围就是 1 到 25
// 再去掉 22~25，剩余的除 3，以此作为 oneToSeven()的产生器。
function oneToSeven() {
  let result = 0;
  do {
    result = 5 * (oneToFive() - 1) + oneToFive();
  } while (result > 21);

  return 1 + result % 7;
}

const result = {};
for (let i = 0; i < 100000; i++) {
  const num = oneToSeven();
  if (!result[String(num)]) {
    result[String(num)] = 1;
  }
  result[String(num)] += 1;
}

console.log(result);

```

# 数组

## Array.diff.js

```js
/**
 * 实现一个 diff 方法
 * 从数组 a 中移除所有 数组 b 的元素
   array_diff([1,2,2,2,3],[2]) == [1,3]
 */
function array_diff(a, b) {
  return a.filter(item => {
    return !b.includes(item);
  });
}
```

## n个数之和.js

```js
/**
调用说明：
  array: 数据源数组。必选。
  sum: 相加的和。必选。
  tolerance: 容差。如果不指定此参数，则相加的和必须等于sum参数，指定此参数可以使结果在容差范围内浮动。可选。
  targetCount: 操作数数量。如果不指定此参数，则结果包含所有可能的情况，指定此参数可以筛选出固定数量的数相加，假如指定为3，那么结果只包含三个数相加的情况。可选。
  返回值：返回的是数组套数组结构，内层数组中的元素是操作数，外层数组中的元素是所有可能的结果。
*/

function getCombBySum(array, sum, tolerance, targetCount) {
  const util = {
    // get combination from array
    // arr: target array
    // num: combination item length
    // return: one array that contain combination arrays
    getCombination(arr, num) {
      const r = [];
      (function f(t, a, n) {
        if (n == 0) {
          return r.push(t);
        }
        for (let i = 0, l = a.length; i <= l - n; i++) {
          f(t.concat(a[i]), a.slice(i + 1), n - 1);
        }
      })([], arr, num);
      return r;
    },
    //take array index to a array
    getArrayIndex(array) {
      let i = 0,
        r = [];
      for (i = 0; i < array.length; i++) {
        r.push(i);
      }
      return r;
    }
  }

  let fun = {
    //sort the array,then get what's we need
    init(array, sum) {
      //clone array
      let _array = array.concat()
      let r = []
      let i = 0
      //sort by asc
      _array.sort((a, b) => {
        return a - b;
      });
      //get all number when it's less than or equal sum
      for (i = 0; i < _array.length; i++) {
        if (_array[i] <= sum) {
          r.push(_array[i]);
        } else {
          break;
        }
      }
      return r;
    },
    //important function
    core(array, sum, arrayIndex, count, r) {
      let i = 0
      let k = 0
      let combArray = []
      let _sum = 0
      let _cca = []
      let _cache = []
      if (count == _returnMark) {
        return;
      }
      //get current count combination
      combArray = util.getCombination(arrayIndex, count);
      for (i = 0; i < combArray.length; i++) {
        _cca = combArray[i];
        _sum = 0;
        _cache = [];
        //calculate the sum from combination
        for (k = 0; k < _cca.length; k++) {
          _sum += array[_cca[k]];
          _cache.push(array[_cca[k]]);
        }
        if (Math.abs(_sum - sum) <= _tolerance) {
          r.push(_cache);
        }
      }
      fun.core(array, sum, arrayIndex, count - 1, r);
    }
  }

  let r = []
  let _array = []
  let _targetCount = 0
  let _tolerance = 0
  let _returnMark = 0;
  //check data
  _targetCount = targetCount || _targetCount;
  _tolerance = tolerance || _tolerance;
  _array = fun.init(array, sum);
  if (_targetCount) {
    _returnMark = _targetCount - 1;
  }
  fun.core(_array, sum, util.getArrayIndex(_array), (_targetCount || _array.length), r);
  return r;
}
```

## n个随机不重复的整数.js

```js
/**
 * 函数 uniqueNums，该函数有两个参数 `range:[min, max]`, n
 * 其返回值是一个数组，该数组内是 n 个随机且不重复的整数，且整数取值范围是 range
 */
const uniqueNums = (range, n) => {
  const len = range[1] - range[0] + 1;
  return Array(len).fill(0)
    .map((_, i) => i + range[0])
    .sort(() => Math.random() - Math.random())
    .slice(0, n);
};

console.log(uniqueNums([5, 20], 5));
```

## 两个数组为子集关系.js

```js
/**
 * 1. 数组有序
 * 2. B.length > A.length
 * 3. 有重复
 * 4. A 是否是 B 的子数组
 * @param {*} A 
 * @param {*} B 
 */
function isSubArr(A, B) {
  let ai = 0;
  let bi = 0;
  while (ai <= A.length - 1 && bi <= B.length - 1) {
    if (A[ai] === B[bi]) {
      ai++;
      bi++;
      continue;
    }
    if (A[ai] > B[bi]) {
     bi++;
     continue; 
    }
    if (A[ai] < B[bi]) {
      return false;
    }
  }

  return true;
}

console.log(isSubArr([1, 1, 2], [1, 1, 1, 2, 3, 4])); // true
console.log(isSubArr([1, 1, 3], [1, 1, 1, 2, 4])); // false
```

## 二维数组的查找.js

```js
/**
 * 给定一个二维数组，其每一行从左到右递增排序，从上到下也是递增排序。
 * 给定一个数，判断这个数是否在该二维数组中。
 * 
 * Consider the following matrix:
 * [
 *  [1,   4,  7, 11, 15],
 *  [2,   5,  8, 12, 19],
 *  [3,   6,  9, 16, 22],
 *  [10, 13, 14, 17, 24],
 *  [18, 21, 23, 26, 30]
 * ]
 * 
 * Given target = 5, return true.
 * Given target = 20, return false.
 */
function matrixFind(target, matrix) {
  if (
    matrix === null ||
    matrix.length === 0 ||
    matrix[0].length === 0
  ) {
    return false;
  }

  let rows = matrix.length;
  let cols = matrix[0].length;
  let row = 0;
  let col = cols - 1;
  while (row <= rows - 1 && col >= 0) {
    if (target === matrix[row][col]) {
      return true;
    } else if (target > matrix[row][col]) {
      row++;
    } else {
      col--;
    }
  }
  return false;
}

const matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
]

console.log(matrixFind(5, matrix));
```

## 产生间隔数组.js

```js
/**
  generateRange(2, 10, 2) // should return array of [2,4,6,8,10]
  generateRange(1, 10, 3) // should return array of [1,4,7,10]
 */
function generateRange(min, max, step) {
  const arr = [];
  for (let i = min; i <= max; i += step) {
    arr.push(i);
  }
  return arr;
}
```

## 大数求和.js

```js
/**
 * 对两个超过JavaScript安全范围的数求和
 * @param {string} d1 - 参与计算的数
 * @param {string} d2 - 参与计算的数
 * @returns {string} -返回计算结果
 */
function add(d1, d2) {
  // 如果第一个数较大则交换两个数
  if (d1.length < d2.length) {
    [d1, d2] = [d2, d1];
  }
  // 将两个数转为数组形式
  const [arr1, arr2] = [[...d1].reverse(), [...d2].reverse()];
  // num 用作当对应位数相加大于 10 时做进位
  let num = 0;
  // 循环 arr1.length 次求和
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i]) {
      arr1[i] = Number.parseInt(arr1[i]) + Number.parseInt(arr2[i]) + num;
    } else {
      arr1[i] = Number.parseInt(arr1[i]) + num;
    }
    if (arr1[i] >= 10) {
      [arr1[i], num] = [arr1[i] % 10, 1];
    } else {
      num = 0;
    }
  }
  // 如果最后进位为 1，则结果前应加 1 为
  if (num === 1) {
    arr1[arr1.length] = num;
  }
  // 返回结果字符串
  return arr1.reverse().join('');
}
```

## 找到唯一不同的数字.js

```js
/**
 * 数组中所有数字都相同，除了一个不同
 */
function findUniq(arr) {
  arr.sort();
  return arr[0] !== arr[1] ?
    arr[0] :
    arr.pop();
}
```

## 把数组排成最小的数.js

```js
/**
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 * 例如输入数组 {3，32，321}，则打印出这三个数字能排成的最小数字为 321323
 * 
 * 可以看成是一个排序问题，在比较两个字符串 S1 和 S2 的大小时
 * 应该比较的是 S1+S2 和 S2+S1 的大小
 * 如果 S1+S2 < S2+S1，那么应该把 S1 排在前面，否则应该把 S2 排在前面
 */

function printMinNumber(nums) {
  if (nums === null || nums.length === 0) {
    return '';
  }

  for(let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] + '';
  }
  nums.sort((s1, s2) => (s1 + s2) - (s2 + s1));
  return nums.reduce((prev, curr) => {
    return prev + curr;
  }, '');
}

console.log(printMinNumber([3, 32, 321]));
```

## 排名位置.js

```js
// 在一些排名中，人们收集分数。
// 挑战是按 points 排序，并计算每个人的位置。
// 但是请记住，如果两个或两个以上的人有相同的 points，
// 他们应该有相同的位置编号并按姓名排序(姓名是唯一的)。
// 例如:输入结构:
// [
//   {
//     name: "John",
//     points: 100,
//   },
//   {
//     name: "Bob",
//     points: 130,
//   },
//   {
//     name: "Mary",
//     points: 120,
//   },
//   {
//     name: "Kate",
//     points: 120,
//   },
// ]
// 输出为
// [
//   {
//     name: "Bob",
//     points: 130,
//     position: 1,
//   },
//   {
//     name: "Kate",
//     points: 120,
//     position: 2,
//   },
//   {
//     name: "Mary",
//     points: 120,
//     position: 2,
//   },
//   {
//     name: "John",
//     points: 100,
//     position: 4,
//   },
// ]
function ranking(people) {
  people.sort((a, b) => {
    if (a.points === b.points) {
      // 字符串对比使用这个 api
      return a.name.localeCompare(b.name);
    }
    return b.points - a.points;
  });


  const res = [];
  people.forEach((item, index) => {
    const prevItem = res[res.length - 1] || {};
    res.push({
      ...item,
      position: item.points === prevItem.points ?
        prevItem.position :
        index + 1,
    });
  });

  return res;
}
```

## 数组中重复的数字.js

```js
/**
 * 在一个长度为 n 的数组里的所有数字都在 0 到 n-1 的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字是重复的，也不知道每个数字重复几次。请找出数组中任意一个重复的数字。
 * 
 * Input:
 * {2, 3, 1, 0, 2, 5}
 * 
 * Output:
 * 2
 */

/**
 *
 * @param {Array} nums 
 */
function duplicate(nums) {
  if (nums === null || nums.length === 0) { return false; }

  const map = {};

  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      return nums[i];
    }
    map[nums[i]] = 1;
  }

  return false;
}

console.log(duplicate([2, 3, 1, 0, 2, 5]));
```

## 构建乘积数组.js

```js
/**
 * 给定一个数组 A[0, 1,..., n-1]，请构建一个数组 B[0, 1,..., n-1]
 * 其中 B 中的元素 B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]
 * 要求不能使用除法
 */
function multiply(arr) {
  const res = [];
  let product = 1;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    res[i] = product;
    product *= arr[i];
  }
  product = 1;
  for (let i = len - 1; i >= 0; i--) {
    res[i] *= product;
    product *= arr[i];
  }
  return res;
}

console.log(multiply([1, 2, 3, 4, 5]));
```

## 树状结构转换.js

```js
/**
 * 
    const array = [
      { id: 3, value: '1-1', parent_id: 1 },
      { id: 1, value: '1', parent_id: null },
      { id: 4, value: '1-2', parent_id: 1 },
      { id: 6, value: '2-2', parent_id: 2 },
      { id: 2, value: '2', parent_id: null },
      { id: 5, value: '2-1', parent_id: 2 },
    ];
    ```

    变成

    ```js
    [
      {
        id: 1,
        value: '1',
        children: [
          {id:3, value: '1-1', children: null},
          {id:4, value: '1-2', children: null},
        ]
      },
      {
        id: 2,
        value: '2',
        children: [
          {id: 5, value: '2-1', children: null},
          {id: 5, value: '2-2', children: null},
        ]
      },
    ]
 * 
 */
function convert(array) {
  array.sort((a, b) => {
    const aId = a.parent_id === null ? 0 : a.parent_id;
    const bId = b.parent_id === null ? 0 : b.parent_id;
    return aId - bId;
  });

  return array.reduce((prev, curr) => {
    if (curr.parent_id === null) {
      return prev.concat({
        id: curr.id,
        value: curr.value,
        children: [],
      });
    }

    const parent = prev.find((item) => item.id === curr.parent_id);
    parent.children.push({
      id: curr.id,
      value: curr.value,
      children: [],
    });

    return prev;
  }, []);
}

```

## 树状结构转换2.js

```js
/**
  - 约10W量级
  - id<20W,
  - 父子节点通过id-pid进行关联，父节点id小于子节点
  - 没有重复的id
  - 树的层级不确定有多少级，但不会太大
  - 整理好的数据，children中节点需要按照id从小到大排序

[
  {id : 25, pid : 10, name : 'apple'}, 
  {id : 100,  pid :1, name : 'tree'}, 
  {id : 10, pid : 1, name : 'fruit'}, 
  {id : 35, pid : 10, name : 'grape'}, 
  {id : 1,  pid :0, name : 'plant'}, 
  {id : 123,  pid :100, name : 'pine tree'}, 
  {id : 155,  pid :100, name : 'elm'}, 
]

 {
  id: 1,
  pid: 0,
  name: 'plant',
  children: [
    {
      id: 10,
      pid: 1,
      name: 'fruit',
      children: [{
        id: 25,
        pid: 10,
        name: 'apple'
      }, {
        id: 35,
        pid: 10,
        name: 'grape'
      }],
    },
    {
      id : 100,
      pid : 1,
      name: 'tree',
      children: [{
        id : 123,
        pid : 100,
        name: 'pine tree'
      }, {
        id : 155,
        pid : 100,
        name: 'elm'
      }],
    }
  ]
}
 */
module.exports = function toTree(list) {
  list = list.sort((a, b) => {
    return a.id - b.id;
  });

  return getNode(list, 0)[0];
};

function getNode(list, id) {
  const node = [];
  for (let i = 0; i < list.length; i++) {
    const currNode = list[i];
    if (currNode.pid === id) {
      const children = getNode(list, currNode.id);
      currNode.children = children;
      node.push(currNode);
    }
  }

  if (node.length === 0) {
    return;
  }

  return node;
}

```

## 洗牌算法.js

```js
/**
 * 概率随机的洗牌算法
 */
function random_shuffle(A) {
  for (let i = 0; i < A.length; i++) {
    const j = Math.floor(Math.random() * (A.length - i) + i);
    swap(A, i, j);
  }
  return A;
}

function swap(A, i, j) {
  [ A[i], A[j] ] = [ A[j], A[i] ];
}

// 模拟用户数组

const users = [];
for (let i = 0; i < 400; i++) {
  users.push(i);
}

random_shuffle(users);

// 前10个中奖的 - 1等奖
const award1 = users.slice(0, 10);

// 后10个中奖 - 2等奖
const award2 = users.slice(10, 20);

console.log(award1);
console.log(award2);

```

## 调整数组顺序使奇数位于偶数前面.js

```js
/**
 * 调整数组顺序使奇数位于偶数前面
 * 需要保证偶数和偶数之间的相对位置不变
 */
function reOrderArray(nums) {
  // 奇数个数
  let oddCount = 0;
  for (const num of nums) {
    if (num % 2 === 1) {
      oddCount++;
    }
  }

  let i = 0;
  let k = 0;
  j = oddCount;
  const res = [];
  while (k < nums.length) {
    const num = nums[k];
    if (num % 2 === 1) {
      res[i++] = num;
    } else {
      res[j++] = num;
    }
    k++;
  }

  return res;
}

console.log(reOrderArray([1, 2, 3, 4, 5]));
```

## 连续子数组的最大和.js

```js
/**
 * {6, -3, -2, 7, -15, 1, 2, 2}
 * 连续子数组的最大和为 8（从第 0 个开始，到第 3 个为止）
 */
function maxSequence(nums) {
  if (nums === null || nums.length === 0) {
    return 0;
  }

  let greatestSum = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  for (const num of nums) {
    sum = sum <= 0 ? num : num + sum;
    greatestSum = Math.max(greatestSum, sum);
  }

  return greatestSum;
}

function maxSequence2(arr) {
  let min = 0;
  let ans = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    min = Math.min(sum, min);
    ans = Math.max(ans, sum - min);
  }
  return ans;
}


console.log(maxSequence([6, -3, -2, 7, -15, 1, 2, 2]));
```

## 逻辑运算.js

```js
/**
 * https://www.codewars.com/kata/logical-calculator/train/javascript
 * 
 * 逻辑运算
 * - 有点像 Ramda 模式
 * 
 * @param {array} array 
 * @param {'AND'|'OR'|'XOR'} op 
 */
function logicalCalc(array, op){
  const ops = {
    'AND': function (a, b) { return a && b; },
    'OR': function (a, b) { return a || b; },
    'XOR': function (a, b) { return a !== b; },
  }
  
  return array.reduce(ops[op]);
}
```

## 顺时针打印矩阵.js

```js
/**
 * 
 * [
 * [1, 2, 3, 4],
 * [5, 6, 7, 8],
 * [9, 10, 11, 12],
 * [13, 14, 15, 16],
 * ]
 * 
 * 矩阵顺时针打印结果为
 * 1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10
 */

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]

function printMatrix(matrix) {
  const res = [];
  let r1 = 0;
  let r2 = matrix.length - 1;
  let c1 = 0;
  let c2 = matrix[0].length - 1;
  while (r1 <= r2 && c1 <= c2) {
    for (let i = c1; i <= c2; i++) {
      res.push(matrix[r1][c2]);
    }
    for (let i = r1 + 1; i <= r2; i++) {
      res.push(matrix[i][c2]);
    }
    if (r1 !== r2) {
      for (let i = c2 - 1; i >= c1; i--) {
        res.push(matrix[r2][i]);
      }
    }
    if (c1 !== c2) {
      for (let i = r2 - 1; i > r1; i--) {
        res.push(matrix[i][c1]);
      }
    }
    r1++;
    r2--;
    c1++;
    c2--;
  }
  return res;
}

console.log(printMatrix(matrix));
```

# 查找

## 数字在排序数组中出现的次数.js

```js
/**
 * Input:
 * nums = 1, 2, 3, 3, 3, 3, 4, 6
 * K = 3
 * 
 * Output:
 * 4
 */
function GetNumberOfK() {
  
}
```

## 旋转数组的最小数字.js

```js
/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
 * 
 * 例如数组 {3, 4, 5, 1, 2} 为 {1, 2, 3, 4, 5} 的一个旋转，该数组的最小值为 1。
 */
function minNumberInRotateArray() {
  
}
```

# 栈

## 包含min函数的栈.js

```js
/**
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈最小元素的 min 函数。
 */
class Stack {
  constructor() {
    this.stack = [];
  }
  push(node) {
    this.stack.push(node);
  }

  pop() {
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  min() {
    // return Math.min.apply(null, this.stack);
    return Math.min(...this.stack);
  }
}
```

## 栈的压入弹出序列.js

```js
/**
 * 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
 * 假设压入栈的所有数字均不相等。
 * 例如序列 1,2,3,4,5 是某栈的压入顺序，序列 4,5,3,2,1 是该压栈序列对应的一个弹出序列，
 * 但 4,3,5,1,2 就不可能是该压栈序列的弹出序列。
 */
function IsPopOrder(pushV, popV) {
  if (!pushV.length || !popV.length) {
    return false;
  }
  const temp = [];
  let popIndex = 0;
  const len = pushV.length;
  for (let i = 0; i < len; i++) {
    temp.push(pushV[i]);
    while (temp.length && temp[temp.length - 1] === popV[popIndex]) {
      temp.pop();
      popIndex++;
    }
  }
  return temp.length === 0;
}
```

## 用两个栈实现队列.js

```js
/**
 * 用两个栈来实现一个队列，完成队列的 Push 和 Pop 操作。
 */

 class stackToQueue {
   constructor() {
    this.stack1 = [];
    this.stack2 = [];
   }

   push(node) {
     this.stack1.push(node);
   }

   pop() {
     let temp = this.stack1.pop();
     while (temp) {
       this.stack2.push(temp);
       temp = this.stack1.pop();
     }
     const result = this.stack2.pop();
     temp = this.stack2.pop();
     while (temp) {
       this.stack1.push(temp);
       temp = this.stack2.pop();
     }
     return result;
   }
 }
```

# 正则

## 表示数值的字符串.js

```js
/**
 * true
 * "+100"
 * "5e2"
 * "-123"
 * "3.1416"
 * "-1E-16"
 * 
 * false
 * "12e"
 * "1a3.14"
 * "1.2.3"
 * "+-5"
 * "12e+4.3"
 * 
 * 使用正则表达式进行匹配
 */
function isNumeric(str) {
  if (str === null || str === '') {
    return false;
  }
  return /[+-]?\\d*(\\.\\d+)?([eE][+-]?\\d+)?/.test(str);
}
```

# 递归

## 字符串所有组合.js

```js
// 对于给定的字符串，写一个函数combinations(str)，
// 求所有可能的组合。（结果不考虑顺序）
// 字符串长度不大于12
// 字符串遵循字典顺序

/**
 * @param {string} str 
 */
function combinations(string) {
  const res = [];
  
  for (let i = 0; i < string.length; i++) {
    helper(0, i, '');
  }

  return [...new Set(res)];

  /**
   * @param {number} start
   * @param {number} depth 0 ~ 11
   * @param {string} prefix 
   */
  function helper(start, depth, prefix) {
    for (let i = start; i < string.length; i++) {
      const next = prefix + string[i];
      if (depth === 0) {
        res.push(next);
        continue;
      }
      helper(i + 1, depth - 1, next);
    }
  }
}

console.log(combinations('abc')); // ['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc']
console.log(combinations('aac')); // ['a', 'c', 'aa', 'ac',  'aac']
```

## 最大长度单词分词.js

```js
/**
 * https://www.codewars.com/kata/word-segmentation-maxmatch/train/javascript
 * 
 * MaxMatch 句子分词
 * - 找到最大长度单词进行分词
 * 
 * @param {string} sentence 
 */
function maxMatch(sentence){
  for (let i = sentence.length; i > 0; i--) {
    const word = sentence.slice(0, i);
    if (
      i === 1 ||
      VALID_WORDS.has(word)
    ) {
      return [word].concat(maxMatch(sentence.slice(i)));
    }
  }  
  
  return [];
}
```

## 根据ID查找元素.js

```js
function findNodeById(root, id) {
  if (id === root.id) {
    return root;
  }

  const children = root.children;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const result = findNodeById(child, id);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

const tree = {
  id: '1',
  label: 'first',
  children: [
    { id: '2', label: 'second' },
    {
      id: '3',
      label: 'third',
      children: [
        {
          id: '4',
          label: 'fourth',
        },
        {
          id: '5',
          label: 'fifth',
          children: [
            {
              id: '6',
              label: 'sixth',
            },
            {
              id: '7',
              label: 'seven',
            },
          ],
        },
      ],
    },
  ],
};

console.log(findNodeById(tree, '1'));
console.log(findNodeById(tree, '2'));
console.log(findNodeById(tree, '3'));
console.log(findNodeById(tree, '4'));
console.log(findNodeById(tree, '5'));
console.log(findNodeById(tree, '6'));
console.log(findNodeById(tree, '7'));
console.log(findNodeById(tree, '8'));

```

# 链表

## 两个链表的第一个公共结点.js

```js
/**
 * 输入两个链表，找出它们的第一个公共结点
 */
function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) {
    return null;
  }

  const len1 = getLength(pHead1);
  const len2 = getLength(pHead2);
  let lenDiff = len1 - len2;

  let curr1 = pHead1;
  let curr2 = pHead2;
  if (len2 > len1) {
    curr1 = pHead2;
    curr2 = pHead1;
    lenDiff = len2 - len1;
  }

  for (let i = 0; i < lenDiff; i++) {
    curr1 = curr1.len1;
  }

  while (curr1 && curr2 && curr1 !== curr2) {
    curr1 = curr1.next;
    curr2 = curr2.next;
  }

  return curr1;

  function getLength(node) {
    let len = 0;
    let curr = node;
    while (curr) {
      len++;
      curr = curr.next;
    }
    return len;
  }
}
```

## 从头到尾打印链表.js

```js
/**
 * 输入一个链表，从尾到头打印链表每个节点的值
 */
function printListFromTailToHead(head) {
  if (!head) {
    return 0;
  } else {
    const arr = [];
    let curr = head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    return arr.reverse();
  }
}
```

## 链表indexOf.js

```js
/**
    function Node(data, next = null) {
      this.data = data;
      this.next = next;
    }

    给定链表: 1 -> 2 -> 3 -> 3, 和 3
    indexOf(node, value) 返回 2
 */

function indexOf(node, value) {
  let i = 0;
  let curr = node;
  while (curr !== null) {
    if (curr.data === value) { return i; }
    curr = curr.next;
    i++;
  }
  return -1;
}
```

## 链表map.js

```js
/**
 * 实现一个 map 方法处理链表
 * list: 1 -> 2 -> 3, mapping function x => x * 2, map return 2 -> 4 -> 6

  function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
 */

 function LinkedListMap(head, f) {
   if (!head) { return null; }

   let curr = head;
   let newLinkedList = new Node(-1);
   const dummy = newLinkedList;
   while (curr !== null) {
     newLinkedList.next = new Node(f(curr.data));
     newLinkedList = newLinkedList.next;
     curr = curr.next;
   }

   return dummy.next;
 }
```

