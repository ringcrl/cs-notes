本文件构建启发自 30-seconds-of-code，由 JS 文件打包生成 MD 文件

# LeetCode

另一个刷题战场：[CodeWars](https://github.com/ringcrl/CodeWars)

刷题插件：[vscode-leetcode](https://github.com/jdneo/vscode-leetcode)

docsify 阅读：[https://static.chenng.cn](https://static.chenng.cn/#/%E7%AE%97%E6%B3%95/LeetCode)

# 实时进度

![](https://static.chenng.cn/api/dynamic_image/leetcode)

# 已刷题目

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [LeetCode](#leetcode)
- [实时进度](#%E5%AE%9E%E6%97%B6%E8%BF%9B%E5%BA%A6)
- [已刷题目](#%E5%B7%B2%E5%88%B7%E9%A2%98%E7%9B%AE)
- [array](#array)
  - [189.rotate-array.js](#189rotate-arrayjs)
  - [238.product-of-array-except-self.js](#238product-of-array-except-selfjs)
  - [41.first-missing-positive.js](#41first-missing-positivejs)
- [backtracking](#backtracking)
  - [17.letter-combinations-of-a-phone-number.js](#17letter-combinations-of-a-phone-numberjs)
  - [22.generate-parentheses.js](#22generate-parenthesesjs)
  - [46.permutations.js](#46permutationsjs)
  - [78.subsets.js](#78subsetsjs)
- [binary-search](#binary-search)
  - [69.sqrtx.js](#69sqrtxjs)
- [bit-manipulation](#bit-manipulation)
  - [136.single-number.js](#136single-numberjs)
- [depth-first-search](#depth-first-search)
  - [104.maximum-depth-of-binary-tree.js](#104maximum-depth-of-binary-treejs)
  - [111.minimum-depth-of-binary-tree.js](#111minimum-depth-of-binary-treejs)
  - [112.path-sum.js](#112path-sumjs)
  - [200.number-of-islands.js](#200number-of-islandsjs)
  - [98.validate-binary-search-tree.js](#98validate-binary-search-treejs)
- [divide-and-conquer](#divide-and-conquer)
  - [148.sort-list.js](#148sort-listjs)
  - [215.kth-largest-element-in-an-array.js](#215kth-largest-element-in-an-arrayjs)
  - [23.merge-k-sorted-lists.js](#23merge-k-sorted-listsjs)
  - [4.median-of-two-sorted-arrays.js](#4median-of-two-sorted-arraysjs)
- [dynamic-programming](#dynamic-programming)
  - [120.triangle.js](#120trianglejs)
  - [121.best-time-to-buy-and-sell-stock.js](#121best-time-to-buy-and-sell-stockjs)
  - [152.maximum-product-subarray.js](#152maximum-product-subarrayjs)
  - [32.longest-valid-parentheses.js](#32longest-valid-parenthesesjs)
  - [322.coin-change.js](#322coin-changejs)
  - [5.longest-palindromic-substring.js](#5longest-palindromic-substringjs)
  - [64.minimum-path-sum.js](#64minimum-path-sumjs)
  - [70.climbing-stairs.js](#70climbing-stairsjs)
- [greedy](#greedy)
  - [392.is-subsequence.js](#392is-subsequencejs)
- [hash-table](#hash-table)
  - [1.two-sum.js](#1two-sumjs)
  - [169.majority-element.js](#169majority-elementjs)
  - [217.contains-duplicate.js](#217contains-duplicatejs)
  - [3.longest-substring-without-repeating-characters.js](#3longest-substring-without-repeating-charactersjs)
  - [347.top-k-frequent-elements.js](#347top-k-frequent-elementsjs)
- [heap](#heap)
  - [239.sliding-window-maximum.js](#239sliding-window-maximumjs)
- [linked-list](#linked-list)
  - [141.linked-list-cycle.js](#141linked-list-cyclejs)
  - [142.linked-list-cycle-ii.js](#142linked-list-cycle-iijs)
  - [160.intersection-of-two-linked-lists.js](#160intersection-of-two-linked-listsjs)
  - [2.add-two-numbers.js](#2add-two-numbersjs)
  - [206.reverse-linked-list.js](#206reverse-linked-listjs)
  - [21.merge-two-sorted-lists.js](#21merge-two-sorted-listsjs)
  - [237.delete-node-in-a-linked-list.js](#237delete-node-in-a-linked-listjs)
- [math](#math)
  - [231.power-of-two.js](#231power-of-twojs)
  - [43.multiply-strings.js](#43multiply-stringsjs)
  - [633.sum-of-square-numbers.js](#633sum-of-square-numbersjs)
  - [7.reverse-integer.js](#7reverse-integerjs)
  - [8.string-to-integer-atoi.js](#8string-to-integer-atoijs)
- [queue](#queue)
  - [641.design-circular-deque.js](#641design-circular-dequejs)
- [stack](#stack)
  - [20.valid-parentheses.js](#20valid-parenthesesjs)
- [string](#string)
  - [10.regular-expression-matching.js](#10regular-expression-matchingjs)
  - [14.longest-common-prefix.js](#14longest-common-prefixjs)
  - [151.reverse-words-in-a-string.js](#151reverse-words-in-a-stringjs)
  - [345.reverse-vowels-of-a-string.js](#345reverse-vowels-of-a-stringjs)
  - [557.reverse-words-in-a-string-iii.js](#557reverse-words-in-a-string-iiijs)
  - [680.valid-palindrome-ii.js](#680valid-palindrome-iijs)
- [tree](#tree)
  - [102.binary-tree-level-order-traversal.js](#102binary-tree-level-order-traversaljs)
  - [226.invert-binary-tree.js](#226invert-binary-treejs)
  - [236.lowest-common-ancestor-of-a-binary-tree.js](#236lowest-common-ancestor-of-a-binary-treejs)
  - [94.binary-tree-inorder-traversal.js](#94binary-tree-inorder-traversaljs)
- [two-pointers](#two-pointers)
  - [11.container-with-most-water.js](#11container-with-most-waterjs)
  - [15.3sum.js](#153sumjs)
  - [16.3sum-closest.js](#163sum-closestjs)
  - [167.two-sum-ii-input-array-is-sorted.js](#167two-sum-ii-input-array-is-sortedjs)
  - [26.remove-duplicates-from-sorted-array.js](#26remove-duplicates-from-sorted-arrayjs)
  - [344.reverse-string.js](#344reverse-stringjs)
  - [88.merge-sorted-array.js](#88merge-sorted-arrayjs)
  - [9.palindrome-number.js](#9palindrome-numberjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# array

## 189.rotate-array.js

```js
/*
 * @lc app=leetcode id=189 lang=javascript
 *
 * [189] Rotate Array
 *
 * https://leetcode.com/problems/rotate-array/description/
 *
 * algorithms
 * Easy (28.74%)
 * Total Accepted:    262.7K
 * Total Submissions: 913.5K
 * Testcase Example:  '[1,2,3,4,5,6,7]\n3'
 *
 * Given an array, rotate the array to the right by k steps, where k is
 * non-negative.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,2,3,4,5,6,7] and k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation:
 * rotate 1 steps to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [-1,-100,3,99] and k = 2
 * Output: [3,99,-1,-100]
 * Explanation: 
 * rotate 1 steps to the right: [99,-1,-100,3]
 * rotate 2 steps to the right: [3,99,-1,-100]
 * 
 * 
 * Note:
 * 
 * 
 * Try to come up as many solutions as you can, there are at least 3 different
 * ways to solve this problem.
 * Could you do it in-place with O(1) extra space?
 * 
 */
/**
 * 从 index 为 k 开始翻转数组
 * 1. splice 的 index 取值
 * 2. array.unshift 多参数传递，最后的结果和入参顺序一致
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function(nums, k) {
  nums.unshift(...nums.splice(nums.length - k));
};

```

## 238.product-of-array-except-self.js

```js
/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 *
 * https://leetcode.com/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (53.64%)
 * Total Accepted:    222K
 * Total Submissions: 413.7K
 * Testcase Example:  '[1,2,3,4]'
 *
 * Given an array nums of n integers where n > 1,  return an array output such
 * that output[i] is equal to the product of all the elements of nums except
 * nums[i].
 * 
 * Example:
 * 
 * 
 * Input:  [1,2,3,4]
 * Output: [24,12,8,6]
 * 
 * 
 * Note: Please solve it without division and in O(n).
 * 
 * Follow up:
 * Could you solve it with constant space complexity? (The output array does
 * not count as extra space for the purpose of space complexity analysis.)
 * 
 */
/**
 * 除自身以外数组的乘积
 * 1. 从右边往左边找到该数右边的乘积
 * 2. 从左边往右边找到左边的乘积
 * @param {number[]} nums
 * @return {number[]}
 */

const productExceptSelf = function (nums) {
  const res = [];
  let leftMult = 1;
  let rightMult = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] = rightMult;
    rightMult *= nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    res[i] *= leftMult;
    leftMult *= nums[i];
  }
  return res;
};
```

## 41.first-missing-positive.js

```js
/*
 * @lc app=leetcode id=41 lang=javascript
 *
 * [41] First Missing Positive
 *
 * https://leetcode.com/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (28.05%)
 * Total Accepted:    187.1K
 * Total Submissions: 666.8K
 * Testcase Example:  '[1,2,0]'
 *
 * Given an unsorted integer array, find the smallest missing positive
 * integer.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,2,0]
 * Output: 3
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [3,4,-1,1]
 * Output: 2
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: [7,8,9,11,12]
 * Output: 1
 * 
 * 
 * Note:
 * 
 * Your algorithm should run in O(n) time and uses constant extra space.
 * 
 */
/**
 * 求缺失的第一个正数
 * 1. O(n)的时间，所以一般的排序方法都不能用
 * 2. 遍历找到第一个不存在的值
 * 
 * @param {number[]} nums
 * @return {number}
 */
function firstMissingPositive (nums) {
  if (nums.length === 0) { return 1; }

  let curr = 1;
  while (nums.indexOf(curr) !== -1) {
    curr++;
  }

  return curr;
}
```

# backtracking

## 17.letter-combinations-of-a-phone-number.js

```js
/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 *
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (40.06%)
 * Total Accepted:    340.4K
 * Total Submissions: 848.2K
 * Testcase Example:  '"23"'
 *
 * Given a string containing digits from 2-9 inclusive, return all possible
 * letter combinations that the number could represent.
 * 
 * A mapping of digit to letters (just like on the telephone buttons) is given
 * below. Note that 1 does not map to any letters.
 * 
 * 
 * 
 * Example:
 * 
 * 
 * Input: "23"
 * Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * 
 * Note:
 * 
 * Although the above answer is in lexicographical order, your answer could be
 * in any order you want.
 * 
 */
/**
 *   0   1
 * 
 *       d
 *   a   e
 *       f
 * 
 *       d
 *   b   e
 *       f
 *       
 *       d
 *   c   e
 *       f
 * 
 * 1. 使用一个 prefix 记录已经进入的层次
 * 2. 在 dfs 之前 push、dfs 之后 pop
 * 3. 在 base cast 的时候讲结果 push 进 res
 * 
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function(digits) {
  const wordMap = ['0', '1', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const res = [];
  const prefix = [];
  
  if (digits.length) {
    dfsHelper(0);
  }
  return res;

  function dfsHelper(index) {
    // base case
    if (index === digits.length) {
      return res.push(prefix.join(''));
    }
    
    const str = wordMap[Number(digits[index])];
    for (let i = 0; i < str.length; i++) {
      prefix.push(str[i]);
      dfsHelper(index + 1);
      prefix.pop();
    }
  }
};


```

## 22.generate-parentheses.js

```js
/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 *
 * https://leetcode.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (52.74%)
 * Total Accepted:    296.1K
 * Total Submissions: 560.2K
 * Testcase Example:  '3'
 *
 * 
 * Given n pairs of parentheses, write a function to generate all combinations
 * of well-formed parentheses.
 * 
 * 
 * 
 * For example, given n = 3, a solution set is:
 * 
 * 
 * [
 * ⁠ "((()))",
 * ⁠ "(()())",
 * ⁠ "(())()",
 * ⁠ "()(())",
 * ⁠ "()()()"
 * ]
 * 
 */
/**
 * backtracking 题目
 * 1. time：O(n!)
 * 2. 左右的初始值都是 n
 * 3. left - 1，string + '('
 * 4. right - 1, string + ')'
 * 5. 在终止条件的时候 res 加入结果
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function(n) {
  const res = [];
  if (n === 0) { return res; }
  helper(res, '', n, n);

  return res;

  function helper(res, string, left, right) {
    if (left > right) {
      return;
    }

    if (left === 0 && right === 0) {
      res.push(string);
      return;
    }

    if (left > 0) {
      helper(res, string + '(', left - 1, right);
    }

    if (right > 0) {
      helper(res, string + ')', left, right - 1);
    }
  }
};

```

## 46.permutations.js

```js
/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 *
 * https://leetcode.com/problems/permutations/description/
 *
 * algorithms
 * Medium (52.96%)
 * Total Accepted:    333.8K
 * Total Submissions: 629.1K
 * Testcase Example:  '[1,2,3]'
 *
 * Given a collection of distinct integers, return all possible permutations.
 * 
 * Example:
 * 
 * 
 * Input: [1,2,3]
 * Output:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 * 
 * 
 */
/**
 * 数组的所有排序结果
 * 1. backtracking 题目一般要定义 helper 函数改 res
 * 2. helper 找到终止条件，推入的结果要做一次拷贝，防止后面被引用
 * 3. list 在 backtracking 前后 push 和 pop 内容，保证下一次循环为 []
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function(nums) {
  if (nums === null || nums.length === 0) { return nums; }

  const res = [];
  
  helper(res, []);

  return res;

  function helper(res, list) {
    // 找到终止条件
    if (list.length === nums.length) {
      res.push(list.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 不需要再加入自身
      if (list.includes(nums[i])) { continue; }
      list.push(nums[i]);
      helper(res, list);
      list.pop();
    }
  }
};

```

## 78.subsets.js

```js
/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 *
 * https://leetcode.com/problems/subsets/description/
 *
 * algorithms
 * Medium (50.65%)
 * Total Accepted:    325.9K
 * Total Submissions: 643.1K
 * Testcase Example:  '[1,2,3]'
 *
 * Given a set of distinct integers, nums, return all possible subsets (the
 * power set).
 * 
 * Note: The solution set must not contain duplicate subsets.
 * 
 * Example:
 * 
 * 
 * Input: nums = [1,2,3]
 * Output:
 * [
 * ⁠ [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 * 
 */
/**
 * 数组的所有子集，包括自身和 []
 * 1. 定义 helper，需要长度、index he list
 * 2. list 的长度为需要的长度的时候，推入结果，注意 slice 一份
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function(nums) {
  const res = [nums];
  for (let i = 0; i < nums.length; i++) {
    helper(i, 0, []);
  }
  
  return res;

  function helper(length, index, list) {
    if (list.length === length) {
      res.push(list.slice());
      return;
    }

    for (let i = index; i < nums.length; i++) {
      list.push(nums[i]);
      helper(length, i + 1, list);
      list.pop();
    }
  }
};

console.log(subsets([1,2,3]));

```

# binary-search

## 69.sqrtx.js

```js
/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 *
 * https://leetcode.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (30.47%)
 * Total Accepted:    322.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '4'
 *
 * Implement int sqrt(int x).
 * 
 * Compute and return the square root of x, where x is guaranteed to be a
 * non-negative integer.
 * 
 * Since the return type is an integer, the decimal digits are truncated and
 * only the integer part of the result is returned.
 * 
 * Example 1:
 * 
 * 
 * Input: 4
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 8
 * Output: 2
 * Explanation: The square root of 8 is 2.82842..., and since 
 * the decimal part is truncated, 2 is returned.
 * 
 * 
 */
/**
 * x 的平方根
 * 1. 使用二分查找法实现.
 * 2. 范围是 1 ~ x/2
 * 
 * @param {number} x
 * @return {number}
 */
function mySqrt(x) {
  if (x === 0 || x === 1) { return x; }

  let start = 1;
  let end = Math.floor(x / 2);

  while (start <= end) {
    const mid = Math.floor((end - start) / 2 + start);
    const v1 = mid ** 2;
    const v2 = (mid + 1) ** 2;
    if (v1 === x || (v1 < x && v2 > x)) { return mid; }

    if (v1 < x) {
      start = mid + 1;
    } else if (v1 > x) {
      end = mid - 1;
    }
  }

  return null;
}
```

# bit-manipulation

## 136.single-number.js

```js
/*
 * @lc app=leetcode id=136 lang=javascript
 *
 * [136] Single Number
 *
 * https://leetcode.com/problems/single-number/description/
 *
 * algorithms
 * Easy (58.78%)
 * Total Accepted:    413.1K
 * Total Submissions: 702K
 * Testcase Example:  '[2,2,1]'
 *
 * Given a non-empty array of integers, every element appears twice except for
 * one. Find that single one.
 * 
 * Note:
 * 
 * Your algorithm should have a linear runtime complexity. Could you implement
 * it without using extra memory?
 * 
 * Example 1:
 * 
 * 
 * Input: [2,2,1]
 * Output: 1
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [4,1,2,1,2]
 * Output: 4
 * 
 * 
 */
/**
 * 找到只出现一次的数字，其余数字出现两次（或偶数次）
 * 1. 两个相同的数字 ^ 结果是 0
 * 2. 0 ^ n 结果是 n
 * 3. n ^ m ^ n 结果是 m
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function(nums) {
  return nums.reduce((prev, curr) => {
    return prev ^= curr;
  });
};

```

# depth-first-search

## 104.maximum-depth-of-binary-tree.js

```js
/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
 *
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (58.84%)
 * Total Accepted:    444.4K
 * Total Submissions: 755.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * Given a binary tree, find its maximum depth.
 * 
 * The maximum depth is the number of nodes along the longest path from the
 * root node down to the farthest leaf node.
 * 
 * Note: A leaf is a node with no children.
 * 
 * Example:
 * 
 * Given binary tree [3,9,20,null,null,15,7],
 * 
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * return its depth = 3.
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 求二叉树最大深度
 * 1. 判断边界条件
 * 2. 左子树的最大高度或右子树的最大高度 + 1
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
  if (root == null) { return 0; }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

## 111.minimum-depth-of-binary-tree.js

```js
/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
 *
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (34.78%)
 * Total Accepted:    272.5K
 * Total Submissions: 782.7K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * Given a binary tree, find its minimum depth.
 * 
 * The minimum depth is the number of nodes along the shortest path from the
 * root node down to the nearest leaf node.
 * 
 * Note: A leaf is a node with no children.
 * 
 * Example:
 * 
 * Given binary tree [3,9,20,null,null,15,7],
 * 
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * return its minimum depth = 2.
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = function (root) {
  if (!root) return 0;

  let result;
  minHeight(root, 1);
  return result;

  function minHeight(root, depth) {
    if (!root.left && !root.right) {
      result = Math.min(result || depth, depth);
    }
    if (root.left) { minHeight(root.left, depth + 1); }
    if (root.right) { minHeight(root.right, depth + 1); }
  }
};


```

## 112.path-sum.js

```js
/*
 * @lc app=leetcode id=112 lang=javascript
 *
 * [112] Path Sum
 *
 * https://leetcode.com/problems/path-sum/description/
 *
 * algorithms
 * Easy (36.85%)
 * Total Accepted:    280.6K
 * Total Submissions: 761.3K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22'
 *
 * Given a binary tree and a sum, determine if the tree has a root-to-leaf path
 * such that adding up all the values along the path equals the given sum.
 * 
 * Note: A leaf is a node with no children.
 * 
 * Example:
 * 
 * Given the below binary tree and sum = 22,
 * 
 * 
 * ⁠     5
 * ⁠    / \
 * ⁠   4   8
 * ⁠  /   / \
 * ⁠ 11  13  4
 * ⁠/  \      \
 * 7    2      1
 * 
 * 
 * return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
 * 
 */
/**
 * 二叉树是否有和为 sum 的 path
 * 1. 判空
 * 2. 找到叶子节点，看叶子节点的值是否为 newSum
 * 3. sum - root.val 为 newSum
 * 4. 寻找左子树或者右子树
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = function(root, sum) {
  if (root === null) { return false; }
  
  // 叶子节点
  if (root.left === null && root.right === null) {
    return root.val === sum;
  }
  
  const newSum = sum - root.val;
  
  return hasPathSum(root.left, newSum) || hasPathSum(root.right, newSum);
};
```

## 200.number-of-islands.js

```js
/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 *
 * https://leetcode.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (39.96%)
 * Total Accepted:    292.4K
 * Total Submissions: 731.5K
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * Given a 2d grid map of '1's (land) and '0's (water), count the number of
 * islands. An island is surrounded by water and is formed by connecting
 * adjacent lands horizontally or vertically. You may assume all four edges of
 * the grid are all surrounded by water.
 * 
 * Example 1:
 * 
 * 
 * Input:
 * 11110
 * 11010
 * 11000
 * 00000
 * 
 * Output: 1
 * 
 * 
 * Example 2:
 * 
 * 
 * Input:
 * 11000
 * 11000
 * 00100
 * 00011
 * 
 * Output: 3
 * 
 */
/**
 * 岛屿的数量
 * 1. 二维数组遍历
 * 2. 找到岛屿后进行深度优先搜索
 * 3. 把深度的结果变成 0，表示已经搜索过了
 * 4. 返回累加值
 * 
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function(grid) {
  const m = grid.length;
  if (m === 0) { return 0; }
  const n = grid[0].length;
  let res = 0;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        res++;
      }
    }
  }
  
  function dfs(grid, i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') { return; }
    grid[i][j] = '0';
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
  }
  
  return res;
};
```

## 98.validate-binary-search-tree.js

```js
/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
 *
 * https://leetcode.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (25.14%)
 * Total Accepted:    349K
 * Total Submissions: 1.4M
 * Testcase Example:  '[2,1,3]'
 *
 * Given a binary tree, determine if it is a valid binary search tree (BST).
 * 
 * Assume a BST is defined as follows:
 * 
 * 
 * The left subtree of a node contains only nodes with keys less than the
 * node's key.
 * The right subtree of a node contains only nodes with keys greater than the
 * node's key.
 * Both the left and right subtrees must also be binary search trees.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * Output: false
 * Explanation: The input is: [5,1,4,null,null,3,6]. The root node's
 * value
 * is 5 but its right child's value is 4.
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 验证是否是二叉树搜索树
 * 1. 如果左子树存在大于 node.val 则不是
 * 2. 如果右子树存在小于 node.val 则不是
 * 3. dfs 检查所有左右节点都符合二叉搜索树的条件
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {

  return isValid(root);

  function isValid (node, min = null, max = null) {
    if (!node) { return true; }

    if (min !== null && node.val <= min) { return false; }
    if (max !== null && node.val >= max) { return false; }

    return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
  }
};
```

# divide-and-conquer

## 148.sort-list.js

```js
/*
 * @lc app=leetcode id=148 lang=javascript
 *
 * [148] Sort List
 *
 * https://leetcode.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (33.70%)
 * Total Accepted:    168.2K
 * Total Submissions: 498.9K
 * Testcase Example:  '[4,2,1,3]'
 *
 * Sort a linked list in O(n log n) time using constant space complexity.
 * 
 * Example 1:
 * 
 * 
 * Input: 4->2->1->3
 * Output: 1->2->3->4
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: -1->5->3->4->0
 * Output: -1->0->3->4->5
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 排序链表
 * 1. 使用快慢链表找到中点
 * 2. 左右分别再次排序
 * 3. 合并排序后的结果
 * @param {ListNode} head
 * @return {ListNode}
 */
function sortList(head) {
  if (!head || !head.next) { return head; }
  let fast = head;
  let slow = head;
  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let second = slow.next;
  slow.next = null;
  head = sortList(head);
  second = sortList(second);
  return mergeTwo(head, second);
}

function mergeTwo(one, two) {
  const dummy = new ListNode(-1);
  let head = dummy;
  while (one && two) {
    if (one.val < two.val) {
      head.next = one;
      one = one.next;
    } else {
      head.next = two;
      two = two.next;
    }
    head = head.next;
  }
  if (one) {
    head.next = one;
  }
  if (two) {
    head.next = two;
  }
  return dummy.next;
}
```

## 215.kth-largest-element-in-an-array.js

```js
/*
 * @lc app=leetcode id=215 lang=javascript
 *
 * [215] Kth Largest Element in an Array
 *
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (45.51%)
 * Total Accepted:    316.2K
 * Total Submissions: 693.8K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * Find the kth largest element in an unsorted array. Note that it is the kth
 * largest element in the sorted order, not the kth distinct element.
 * 
 * Example 1:
 * 
 * 
 * Input: [3,2,1,5,6,4] and k = 2
 * Output: 5
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [3,2,3,1,2,4,5,5,6] and k = 4
 * Output: 4
 * 
 * Note: 
 * You may assume k is always valid, 1 ≤ k ≤ array's length.
 * 
 */
/**
 * 时间复杂度 O(NlogN)，空间复杂度 O(1)
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k, start = 0, end = nums.length - 1) {
  const pivot = nums[start + Math.floor((end - start) / 2)];
  let l = start;
  let r = end;
  // move values >= pivot to the left, values <= pivot to the right
  while (l <= r) {
    while (l <= r && nums[l] > pivot) l++;
    while (l <= r && nums[r] < pivot) r--;
    if (l <= r) {
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
      l++;
      r--;
    }
  }

  // check if kth largest element is in the left part
  if (start + k - 1 <= r) return findKthLargest(nums, k, start, r);
  // otherwise, check if kth largest element is in the right part
  if (start + k - 1 >= l) return findKthLargest(nums, k - l + start, l, end);
  return nums[r + 1];
};
```

## 23.merge-k-sorted-lists.js

```js
/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
 *
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (32.56%)
 * Total Accepted:    331.5K
 * Total Submissions: 1M
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * Merge k sorted linked lists and return it as one sorted list. Analyze and
 * describe its complexity.
 * 
 * Example:
 * 
 * 
 * Input:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * Output: 1->1->2->3->4->4->5->6
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 合并 K 的有序链表
 * 1. mergeKLists
 * 2. mergeTwoLists
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = (lists, low = 0, height = lists.length - 1) => {
  if (lists.length === 0) {
    return null;
  }

  if (low === height) {
    return lists[low];
  }

  const mid = Math.floor((height + low) / 2);
  const left = mergeKLists(lists, low, mid);
  const right = mergeKLists(lists, mid + 1, height);

  return mergeTwoLists(left, right);
};

const mergeTwoLists = (l1, l2) => {
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

## 4.median-of-two-sorted-arrays.js

```js
/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 *
 * https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (25.32%)
 * Total Accepted:    374.4K
 * Total Submissions: 1.5M
 * Testcase Example:  '[1,3]\n[2]'
 *
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * 
 * Find the median of the two sorted arrays. The overall run time complexity
 * should be O(log (m+n)).
 * 
 * You may assume nums1 and nums2 cannot be both empty.
 * 
 * Example 1:
 * 
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 
 * The median is 2.0
 * 
 * 
 * Example 2:
 * 
 * 
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 
 * The median is (2 + 3)/2 = 2.5
 * 
 * 
 */
/**
 * 寻找两个数组的中间数
 * 1. 主要考点是时间复杂度，不能使用排序
 * 2. 采用分治法，对两个数组分别求解
 * 3. 采用 curr 和 last 两个变量来记录状态
 * 4. 先把 curr 赋值给 last，再根据四个条件改变 curr
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function(nums1, nums2) {
  const totalLen = nums1.length + nums2.length;
  let index1 = 0;
  let index2 = 0;
  let curr;
  let last;

  while (index1 + index2 <= totalLen / 2) {
    if (curr) {
      last = curr;
    }

    const el1 = nums1[index1];
    const el2 = nums2[index2];

    if (el1 === undefined) {
      curr = el2;
      index2++;
      continue;
    }

    if (el2 === undefined) {
      curr = el1;
      index1++;
      continue;
    }

    if (el1 < el2) {
      curr = el1;
      index1++;
      continue;
    }

    curr = el2;
    index2++;
  }

  return totalLen % 2 === 0 ? (last + curr) / 2 : curr;
};
```

# dynamic-programming

## 120.triangle.js

```js
/*
 * @lc app=leetcode id=120 lang=javascript
 *
 * [120] Triangle
 *
 * https://leetcode.com/problems/triangle/description/
 *
 * algorithms
 * Medium (38.10%)
 * Total Accepted:    166.9K
 * Total Submissions: 438K
 * Testcase Example:  '[[2],[3,4],[6,5,7],[4,1,8,3]]'
 *
 * Given a triangle, find the minimum path sum from top to bottom. Each step
 * you may move to adjacent numbers on the row below.
 * 
 * For example, given the following triangle
 * 
 * 
 * [
 * ⁠    [2],
 * ⁠   [3,4],
 * ⁠  [6,5,7],
 * ⁠ [4,1,8,3]
 * ]
 * 
 * 
 * The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
 * 
 * Note:
 * 
 * Bonus point if you are able to do this using only O(n) extra space, where n
 * is the total number of rows in the triangle.
 * 
 */
/**
 * 三角形最小路径和
   1. 定义状态 dp[i][j] : 从底部到 triangel[i][j] 的路径的最小值
   2. 转移方程式（左下的点与右下的点的最小值加上自身的值）: dp[i][j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
   3. 定义 dp 初始值: dp[rowMax][j] = triangle[rowMax][j]
   4. 往上递推，最后推到 dp[0][0] 就是答案
   5. 时间复杂度O(row x col)
 * 
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = function (triangle) {
  if (triangle.length === 0 || triangle[0].length === 0) {
    return 0;
  }

  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = triangle[i].length - 1; j >= 0; j--) {
      // DP 方程
      let min = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
      min += triangle[i][j];
      triangle[i][j] = min;
    }
  }

  return triangle[0][0];
};
```

## 121.best-time-to-buy-and-sell-stock.js

```js
/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 *
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
 *
 * algorithms
 * Easy (45.95%)
 * Total Accepted:    425.9K
 * Total Submissions: 926.9K
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * Say you have an array for which the ith element is the price of a given
 * stock on day i.
 * 
 * If you were only permitted to complete at most one transaction (i.e., buy
 * one and sell one share of the stock), design an algorithm to find the
 * maximum profit.
 * 
 * Note that you cannot sell a stock before you buy one.
 * 
 * Example 1:
 * 
 * 
 * Input: [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit
 * = 6-1 = 5.
 * Not 7-1 = 6, as selling price needs to be larger than buying price.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transaction is done, i.e. max profit = 0.
 * 
 * 
 */
/**
 * 买卖股票的最好时机
 * 1. 一次遍历，找到最小值与最大利润
 * 2. 当前 price - min 就是当前利润
 * 
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  let min = prices[0];
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    min = Math.min(min, price);
    profit = Math.max(profit, price - min);
  }

  return profit;
};
```

## 152.maximum-product-subarray.js

```js
/*
 * @lc app=leetcode id=152 lang=javascript
 *
 * [152] Maximum Product Subarray
 *
 * https://leetcode.com/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (28.40%)
 * Total Accepted:    186.3K
 * Total Submissions: 655.8K
 * Testcase Example:  '[2,3,-2,4]'
 *
 * Given an integer array nums, find the contiguous subarray within an array
 * (containing at least one number) which has the largest product.
 * 
 * Example 1:
 * 
 * 
 * Input: [2,3,-2,4]
 * Output: 6
 * Explanation: [2,3] has the largest product 6.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [-2,0,-1]
 * Output: 0
 * Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 * 
 */
/**
 * 乘积最大子序列
 * 1. 一次循环，找出最小值最大值
 * 2. 同时更新 min 和 max
 * 
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
  let res = -Number.MAX_VALUE;
  let min = 1;
  let max = 1;
  for (const num of nums) {
    [min, max] = [
      Math.min(num, min * num, max * num),
      Math.max(num, min * num, max * num),
    ];
    res = Math.max(res, max);
  }
  return res;
}
```

## 32.longest-valid-parentheses.js

```js
/*
 * @lc app=leetcode id=32 lang=javascript
 *
 * [32] Longest Valid Parentheses
 *
 * https://leetcode.com/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (24.77%)
 * Total Accepted:    169.5K
 * Total Submissions: 684K
 * Testcase Example:  '"(()"'
 *
 * Given a string containing just the characters '(' and ')', find the length
 * of the longest valid (well-formed) parentheses substring.
 * 
 * Example 1:
 * 
 * 
 * Input: "(()"
 * Output: 2
 * Explanation: The longest valid parentheses substring is "()"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: ")()())"
 * Output: 4
 * Explanation: The longest valid parentheses substring is "()()"
 * 
 * 
 */
/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
  const ts = s.split('');
  const stack = [];
  let max = 0;

  ts.forEach(function (t, i) {
    if (t == '(') {
      stack.push(i);
    } else {
      if (stack.length === 0 || ts[stack[stack.length - 1]] == ')') {
        stack.push(i);
      } else {
        stack.pop();
      }
    }
  });

  // add two ends                                                                      
  stack.push(ts.length);
  stack.splice(0, 0, -1);

  for (let i = 0; i < stack.length - 1; i++) {
    const v = stack[i + 1] - stack[i] - 1;
    max = Math.max(max, v);
  }

  return max;
}
```

## 322.coin-change.js

```js
/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 *
 * https://leetcode.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (28.76%)
 * Total Accepted:    158K
 * Total Submissions: 549.1K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * You are given coins of different denominations and a total amount of money
 * amount. Write a function to compute the fewest number of coins that you need
 * to make up that amount. If that amount of money cannot be made up by any
 * combination of the coins, return -1.
 * 
 * Example 1:
 * 
 * 
 * Input: coins = [1, 2, 5], amount = 11
 * Output: 3 
 * Explanation: 11 = 5 + 5 + 1
 * 
 * Example 2:
 * 
 * 
 * Input: coins = [2], amount = 3
 * Output: -1
 * 
 * 
 * Note:
 * You may assume that you have an infinite number of each kind of coin.
 * 
 */
/**
 * 零钱兑换
 * 1. 状态：dp[i] 的最小步数
 * 2. dp 方程：Math.min{ dp[i - coins[j]] }
 * 
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  const dp = new Array(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    dp[i] = Number.MAX_SAFE_INTEGER;
    coins.forEach(coin => {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    });
  }
  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};

/**
 * 零钱兑换
 * 1. 递归版本，无法通过测试，但是思路简单
 * 2. 使用 hepler 方法，每次深入的时候传入剩余值和 list
 * 3. 穷举出所有可能的结果，返回最短的结果
 * 
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  const res = [];
  hepler(amount, []);
  return res.reduce((prev, curr) => {
    return Math.min(curr.length, prev);
  }, Number.MAX_SAFE_INTEGER);


  function hepler(amount, list) {
    if (amount === 0) {
      res.push(list.slice());
      return;
    }

    if (amount < 0) {
      return;
    }
    
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const newList = list.slice();
      newList.push(coin);
      hepler(amount - coin, newList);
    }
  }
};
```

## 5.longest-palindromic-substring.js

```js
/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 *
 * https://leetcode.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (26.33%)
 * Total Accepted:    467.6K
 * Total Submissions: 1.8M
 * Testcase Example:  '"babad"'
 *
 * Given a string s, find the longest palindromic substring in s. You may
 * assume that the maximum length of s is 1000.
 * 
 * Example 1:
 * 
 * 
 * Input: "babad"
 * Output: "bab"
 * Note: "aba" is also a valid answer.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "cbbd"
 * Output: "bb"
 * 
 * 
 */
/**
 * b a b a d
 *         d // i = 4 
 * b // j = 0
 * 
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function(s) {
  if (s === null || s.length === 0) { return s; }
  const len = s.length;
  let res = '';
  let max = 0;
  const dp = Array(len)
    .fill(0)
    .map(() => Array(len).fill(0));
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= i; j++) {
      dp[j][i] = s[j] === s[i] &&
        ((i - j <= 2) || dp[j + 1][i - 1]);
      if (dp[j][i]) {
        if (i - j + 1 > max) {
          max = i - j + 1;
          res = s.slice(j, i + 1);
        }
      }
    }
  }

  return res;
};
```

## 64.minimum-path-sum.js

```js
/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 *
 * https://leetcode.com/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (45.21%)
 * Total Accepted:    205K
 * Total Submissions: 453.2K
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * Given a m x n grid filled with non-negative numbers, find a path from top
 * left to bottom right which minimizes the sum of all numbers along its path.
 * 
 * Note: You can only move either down or right at any point in time.
 * 
 * Example:
 * 
 * 
 * Input:
 * [
 * [1,3,1],
 * ⁠ [1,5,1],
 * ⁠ [4,2,1]
 * ]
 * Output: 7
 * Explanation: Because the path 1→3→1→1→1 minimizes the sum.
 * 
 * 
 */
/**
 * 二维数组从上往下最小路径和
 * 1. dp[x][y] = dp[x-1][y] 或 dp[x][y-1] 的最小值 + grid[x][y]
 * 2. 注意二维数组要干净，避免引用类型导致的引用修改
 * 
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function(grid) {
  // Edge
  if (!grid) { return; }

  const row = grid.length;
  const col = grid[0].length;

  // 创建 DP 矩阵，用于记录 dp[x][y] 的最小值
  // 注意创新二维数组要防止引用类型
  const dp = Array(row)
    .fill(0)
    .map(() => Array(col).fill(0));
  dp[0][0] = grid[0][0];

  // 填充第一行
  for (let i = 1; i < col; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }

  // 填充第一列
  for (let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 使用 DP 方程进行递推
  for(let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[row - 1][col - 1];
};
```

## 70.climbing-stairs.js

```js
/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 *
 * https://leetcode.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (43.16%)
 * Total Accepted:    346.6K
 * Total Submissions: 803K
 * Testcase Example:  '2'
 *
 * You are climbing a stair case. It takes n steps to reach to the top.
 * 
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can
 * you climb to the top?
 * 
 * Note: Given n will be a positive integer.
 * 
 * Example 1:
 * 
 * 
 * Input: 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 * 
 * 
 */
/**
 * 爬楼梯
 * - dp 方法求解
 * - 定义 allWays、twoStepBefore、oneStepBefore
 * - 分别处理三个变量
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  if (n <= 2) { return n; }

  let allWays = 0;
  let twoStepBefore = 1;
  let oneStepBefore = 2;

  for (let i = 2; i < n; i++) {
    allWays = oneStepBefore + twoStepBefore;
    twoStepBefore = oneStepBefore;
    oneStepBefore = allWays;
  }

  return allWays;
}

// 递归写法存在大量重复计算
// const map = new Map();
// function climbStairs(n) {
//   if (n <= 2) {
//     return n;
//   }

//   if (map.has(n)) { return map.get(n); }

//   const stairs = climbStairs(n - 1) + climbStairs(n - 2);
//   map.set(n, stairs);
//   return stairs;
// }
```

# greedy

## 392.is-subsequence.js

```js
/*
 * @lc app=leetcode id=392 lang=javascript
 *
 * [392] Is Subsequence
 *
 * https://leetcode.com/problems/is-subsequence/description/
 *
 * algorithms
 * Medium (46.06%)
 * Total Accepted:    78.4K
 * Total Submissions: 170.1K
 * Testcase Example:  '"abc"\n"ahbgdc"'
 *
 * 
 * Given a string s and a string t, check if s is subsequence of t.
 * 
 * 
 * 
 * You may assume that there is only lower case English letters in both s and
 * t. t is potentially a very long (length ~= 500,000) string, and s is a short
 * string (
 * 
 * 
 * A subsequence of a string is a new string which is formed from the original
 * string by deleting some (can be none) of the characters without disturbing
 * the relative positions of the remaining characters. (ie, "ace" is a
 * subsequence of "abcde" while "aec" is not).
 * 
 * 
 * Example 1:
 * s = "abc", t = "ahbgdc"
 * 
 * 
 * Return true.
 * 
 * 
 * Example 2:
 * s = "axc", t = "ahbgdc"
 * 
 * 
 * Return false.
 * 
 * 
 * Follow up:
 * If there are lots of incoming S, say S1, S2, ... , Sk where k >= 1B, and you
 * want to check one by one to see if T has its subsequence. In this scenario,
 * how would you change your code?
 * 
 * Credits:Special thanks to @pbrother for adding this problem and creating all
 * test cases.
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function(s, t) {
  let index = 0;
  for (let i = 0; i < t.length; i++) {
    const c = s[index];
    if (!c) { return true; }
    const ti = t.indexOf(c, i);
    if (ti === -1) {
      return false;
    } else {
      index++;
    }
  }
  return true;
};

```

# hash-table

## 1.two-sum.js

```js
/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 *
 * https://leetcode.com/problems/two-sum/description/
 *
 * algorithms
 * Easy (40.21%)
 * Total Accepted:    1.4M
 * Total Submissions: 3.5M
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * Given an array of integers, return indices of the two numbers such that they
 * add up to a specific target.
 * 
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 * 
 * Example:
 * 
 * 
 * Given nums = [2, 7, 11, 15], target = 9,
 * 
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 * 
 * 
 * 
 * 
 */
/**
 * 
 * 数组中两数之和为 target
 * 1. 一次循环
 * 2. 如果 target - nums[i] 为 undefined，则记录结果到 hash
 * 3. 如果找到对应的值，则返回两个值的索引
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash[target - nums[i]] === undefined) {
      hash[nums[i]] = i;
    } else {
      return [hash[target - nums[i]], i];      
    }
  }
  
  return false;
};
```

## 169.majority-element.js

```js
/*
 * @lc app=leetcode id=169 lang=javascript
 *
 * [169] Majority Element
 *
 * https://leetcode.com/problems/majority-element/description/
 *
 * algorithms
 * Easy (51.22%)
 * Total Accepted:    341.7K
 * Total Submissions: 667K
 * Testcase Example:  '[3,2,3]'
 *
 * Given an array of size n, find the majority element. The majority element is
 * the element that appears more than ⌊ n/2 ⌋ times.
 * 
 * You may assume that the array is non-empty and the majority element always
 * exist in the array.
 * 
 * Example 1:
 * 
 * 
 * Input: [3,2,3]
 * Output: 3
 * 
 * Example 2:
 * 
 * 
 * Input: [2,2,1,1,1,2,2]
 * Output: 2
 * 
 * 
 */
/**
 * 求出现频率大于一半的众数
 * 1. 用 map 记录每个数字出现的次数
 * 2. 当计数器大于一半的时候返回此值
 * 
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];

    hash[curr] = hash[curr] === undefined ?
      1 :
      hash[curr] + 1;

    if (hash[curr] > nums.length / 2) {
      return curr;
    }
  }
  return null;
}
```

## 217.contains-duplicate.js

```js
/*
 * @lc app=leetcode id=217 lang=javascript
 *
 * [217] Contains Duplicate
 *
 * https://leetcode.com/problems/contains-duplicate/description/
 *
 * algorithms
 * Easy (50.62%)
 * Total Accepted:    298.5K
 * Total Submissions: 589.6K
 * Testcase Example:  '[1,2,3,1]'
 *
 * Given an array of integers, find if the array contains any duplicates.
 * 
 * Your function should return true if any value appears at least twice in the
 * array, and it should return false if every element is distinct.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,2,3,1]
 * Output: true
 * 
 * Example 2:
 * 
 * 
 * Input: [1,2,3,4]
 * Output: false
 * 
 * Example 3:
 * 
 * 
 * Input: [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 * 
 */
/**
 * 存在重复元素
 * - hash 表使用
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = function(nums) {
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (!hash[nums[i]]) {
      hash[nums[i]] = 1;
      continue;
    } else {
      return true;
    }
  }
  return false;
};

```

## 3.longest-substring-without-repeating-characters.js

```js
/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (26.09%)
 * Total Accepted:    741.6K
 * Total Submissions: 2.8M
 * Testcase Example:  '"abcabcbb"'
 *
 * Given a string, find the length of the longest substring without repeating
 * characters.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: "abcabcbb"
 * Output: 3 
 * Explanation: The answer is "abc", with the length of 3. 
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * 
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3. 
 * ⁠            Note that the answer must be a substring, "pwke" is a
 * subsequence and not a substring.
 * 
 * 
 * 
 * 
 * 
 */
/**
 * 滑动窗口算法
 * 1. 用字符作 key，index + 1 作 val，记录 hashmap
 * 2. 如果有重复的，把 i 往右移动
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  const n = s.length;
  let ans = 0;
  const map = new Map();
  // j 负责向右边遍历，i 根据重复字符的情况进行调整
  for (let i = 0, j = 0; j < n; j++) {
    // 当发现重复的字符时, 将字符的索引与窗口的左边进行对比，
    // 将窗口的左边直接跳到该重复字符的索引处
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]), i);
    }

    // 记录子字符串的最大的长度
    ans = Math.max(ans, j - i + 1);
    //map 记录第一次遍历到 key 时的索引位置
    // j + 1 保证 i 跳到不包含重复字母的位置
    map.set(s[j], j + 1);
  }

  return ans;
};


```

## 347.top-k-frequent-elements.js

```js
/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 *
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (53.06%)
 * Total Accepted:    171.6K
 * Total Submissions: 323.1K
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * Given a non-empty array of integers, return the k most frequent elements.
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [1], k = 1
 * Output: [1]
 * 
 * 
 * Note: 
 * 
 * 
 * You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
 * Your algorithm's time complexity must be better than O(n log n), where n is
 * the array's size.
 * 
 * 
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function(nums, k) {
  const hash = nums.reduce((prev, curr) => {
    prev[curr] ?
      prev[curr]++ :
      prev[curr] = 1;
    return prev;
  }, {});
  const tuple = Object.entries(hash)
    .sort((a, b) => b[1] - a[1]);
  const sortedNumber = tuple.map(item => Number(item[0]));
  return sortedNumber.slice(0, k);
};

```

# heap

## 239.sliding-window-maximum.js

```js
/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 *
 * https://leetcode.com/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (36.82%)
 * Total Accepted:    133.9K
 * Total Submissions: 363.5K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * Given an array nums, there is a sliding window of size k which is moving
 * from the very left of the array to the very right. You can only see the k
 * numbers in the window. Each time the sliding window moves right by one
 * position. Return the max sliding window.
 * 
 * Example:
 * 
 * 
 * Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
 * Output: [3,3,5,5,6,7] 
 * Explanation: 
 * 
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 * 
 * 
 * Note: 
 * You may assume k is always valid, 1 ≤ k ≤ input array's size for non-empty
 * array.
 * 
 * Follow up:
 * Could you solve it in linear time?
 * 
 */
/**
 * https://leetcode.com/problems/sliding-window-maximum/
 * 
 * 滑动窗口最大值
 * 1. 使用 Monotonic queue，time O(n)，space O(k)
 * 2. 来了个队列最大值就把队列清空
 * 3. Monotonic queue 的结果就是最后结果
 * 
 * https://www.youtube.com/watch?v=2SXqBsTR6a8
 * Monotonic queue   max
 *  [ 1 ]              -
 *  [ 3 ]              -
 *  [ 3, -1 ]          3
 *  [ 3, -1, -3 ]      3
 *  [ 5 ]              5
 *  [ 5, 3 ]           5
 *  [ 6 ]              6
 *  [ 7 ]              7
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
  const res = [];
  const mq = [];

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    while (mq.length && curr > mq[mq.length - 1]) {
      mq.pop();
    }

    mq.push(curr);

    const startIndex = i - k + 1;

    if (startIndex < 0) { continue; }

    res.push(mq[0]);

    if (nums[startIndex] === mq[0]) {
      mq.shift(); // 确保没有重复
    }
  }

  return res;
}
```

# linked-list

## 141.linked-list-cycle.js

```js
/*
 * @lc app=leetcode id=141 lang=javascript
 *
 * [141] Linked List Cycle
 *
 * https://leetcode.com/problems/linked-list-cycle/description/
 *
 * algorithms
 * Easy (35.46%)
 * Total Accepted:    354.1K
 * Total Submissions: 998.3K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * Given a linked list, determine if it has a cycle in it.
 * 
 * To represent a cycle in the given linked list, we use an integer pos which
 * represents the position (0-indexed) in the linked list where tail connects
 * to. If pos is -1, then there is no cycle in the linked list.
 * 
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where tail connects to the
 * second node.
 * 
 * 
 * 
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = [1,2], pos = 0
 * Output: true
 * Explanation: There is a cycle in the linked list, where tail connects to the
 * first node.
 * 
 * 
 * 
 * 
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: head = [1], pos = -1
 * Output: false
 * Explanation: There is no cycle in the linked list.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Follow up:
 * 
 * Can you solve it using O(1) (i.e. constant) memory?
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 检测链表是否有环
 * 1. 使用两个指针，slow 和 fast
 * 2. slow 一步一步地移动，fast 一次移动两步
 * 3. 如果链表有环则 slow 和 fast 会相遇
 * 
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  if (head === null || head.next === null) { return false; }

  let slow = head;
  let fast = head;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) { return true; }
  }

  return false;
}
```

## 142.linked-list-cycle-ii.js

```js
/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
 *
 * https://leetcode.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (30.72%)
 * Total Accepted:    194.2K
 * Total Submissions: 631K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * Given a linked list, return the node where the cycle begins. If there is no
 * cycle, return null.
 * 
 * To represent a cycle in the given linked list, we use an integer pos which
 * represents the position (0-indexed) in the linked list where tail connects
 * to. If pos is -1, then there is no cycle in the linked list.
 * 
 * Note: Do not modify the linked list.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [3,2,0,-4], pos = 1
 * Output: tail connects to node index 1
 * Explanation: There is a cycle in the linked list, where tail connects to the
 * second node.
 * 
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = [1,2], pos = 0
 * Output: tail connects to node index 0
 * Explanation: There is a cycle in the linked list, where tail connects to the
 * first node.
 * 
 * 
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: head = [1], pos = -1
 * Output: no cycle
 * Explanation: There is no cycle in the linked list.
 * 
 * 
 * 
 * 
 * 
 * 
 * Follow up:
 * Can you solve it without using extra space?
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function detectCycle(head) {
  if (head === null || head.next === null || head.next.next === null) { return null; }

  let slow = head.next;
  let fast = head.next.next;

  while (slow !== fast) {
    slow = slow.next;
    if (fast.next === null || fast.next.next === null) { return null; }
    fast = fast.next.next;
  }

  fast = head;

  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }

  return fast;
}

```

## 160.intersection-of-two-linked-lists.js

```js
/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
 *
 * https://leetcode.com/problems/intersection-of-two-linked-lists/description/
 *
 * algorithms
 * Easy (32.04%)
 * Total Accepted:    270.5K
 * Total Submissions: 842.5K
 * Testcase Example:  '8\n[4,1,8,4,5]\n[5,0,1,8,4,5]\n2\n3'
 *
 * Write a program to find the node at which the intersection of two singly
 * linked lists begins.
 * 
 * For example, the following two linked lists:
 * 
 * 
 * begin to intersect at node c1.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * 
 * Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA =
 * 2, skipB = 3
 * Output: Reference of the node with value = 8
 * Input Explanation: The intersected node's value is 8 (note that this must
 * not be 0 if the two lists intersect). From the head of A, it reads as
 * [4,1,8,4,5]. From the head of B, it reads as [5,0,1,8,4,5]. There are 2
 * nodes before the intersected node in A; There are 3 nodes before the
 * intersected node in B.
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * 
 * Input: intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3,
 * skipB = 1
 * Output: Reference of the node with value = 2
 * Input Explanation: The intersected node's value is 2 (note that this must
 * not be 0 if the two lists intersect). From the head of A, it reads as
 * [0,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes
 * before the intersected node in A; There are 1 node before the intersected
 * node in B.
 * 
 * 
 * 
 * 
 * Example 3:
 * 
 * 
 * 
 * Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB =
 * 2
 * Output: null
 * Input Explanation: From the head of A, it reads as [2,6,4]. From the head of
 * B, it reads as [1,5]. Since the two lists do not intersect, intersectVal
 * must be 0, while skipA and skipB can be arbitrary values.
 * Explanation: The two lists do not intersect, so return null.
 * 
 * 
 * 
 * 
 * Notes:
 * 
 * 
 * If the two linked lists have no intersection at all, return null.
 * The linked lists must retain their original structure after the function
 * returns.
 * You may assume there are no cycles anywhere in the entire linked
 * structure.
 * Your code should preferably run in O(n) time and use only O(1) memory.
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 查找两个链表是否有公共节点
 * 1. 遍历 A 链表，为每个节点增加一个 visited 的属性
 * 2. 遍历 B 链表，如果已经存在 visited 属性，则返回这个节点
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function (headA, headB) {
  let currA = headA;
  let currB = headB;
  while (currA) {
    currA.visited = true;
    currA = currA.next;
  }
  while (currB) {
    if (currB.visited) { return currB; }
    currB = currB.next;
  }
  return null;
};

```

## 2.add-two-numbers.js

```js
/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
 *
 * https://leetcode.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (30.42%)
 * Total Accepted:    745.9K
 * Total Submissions: 2.5M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * You are given two non-empty linked lists representing two non-negative
 * integers. The digits are stored in reverse order and each of their nodes
 * contain a single digit. Add the two numbers and return it as a linked list.
 * 
 * You may assume the two numbers do not contain any leading zero, except the
 * number 0 itself.
 * 
 * Example:
 * 
 * 
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807.
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 链表两数相加
 * 1. 定义 dummy
 * 2. 记录进位进行运算
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0);
  let cur = new ListNode(0);
  let carry = 0;
  dummy.next = cur;
  while (l1 || l2 || carry !== 0) {
    const sum = carry + (l1 === null ? 0 : l1.val) + (l2 === null ? 0 : l2.val);
    l1 = l1 === null ? null : l1.next;
    l2 = l2 === null ? null : l2.next;
    carry = (sum >= 10 ? 1 : 0);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
  }
  return dummy.next.next;
};

```

## 206.reverse-linked-list.js

```js
/*
 * @lc app=leetcode id=206 lang=javascript
 *
 * [206] Reverse Linked List
 *
 * https://leetcode.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (52.40%)
 * Total Accepted:    506.9K
 * Total Submissions: 967.2K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * Reverse a singly linked list.
 * 
 * Example:
 * 
 * 
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
 * 
 * 
 * Follow up:
 * 
 * A linked list can be reversed either iteratively or recursively. Could you
 * implement both?
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 反转链表
 * 1. 先记录一个 newNext 为 null
 * 2. 四部曲，每次下一步要改的值为上一步的右边的值
 * 3. 返回 newNext
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
  if (head === null || head.next === null) {
    return head;
  }

  let newNext = null;
  while (head !== null) {
    const oldNext = head.next;
    head.next = newNext;
    newNext = head;
    head = oldNext;
  }

  return newNext;
};

```

## 21.merge-two-sorted-lists.js

```js
/*
 * @lc app=leetcode id=21 lang=javascript
 *
 * [21] Merge Two Sorted Lists
 *
 * https://leetcode.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (45.59%)
 * Total Accepted:    503K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * Merge two sorted linked lists and return it as a new list. The new list
 * should be made by splicing together the nodes of the first two lists.
 * 
 * Example:
 * 
 * Input: 1->2->4, 1->3->4
 * Output: 1->1->2->3->4->4
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 合并两个有序链表
 * 1. 定义 dummy 和 cur 链表
 * 2. 进行链表查找，并更新 cur 的值
 * 3. 如果最后 l1 不为空，则 curr 接上 l1、否则接上 l2
 * 4. 返回 dummy.next
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      cur.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      cur.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    cur = cur.next;
  }
  if (l1 !== null) {
    cur.next = l1;
  } else {
    cur.next = l2;
  }

  return dummy.next;
};

```

## 237.delete-node-in-a-linked-list.js

```js
/*
 * @lc app=leetcode id=237 lang=javascript
 *
 * [237] Delete Node in a Linked List
 *
 * https://leetcode.com/problems/delete-node-in-a-linked-list/description/
 *
 * algorithms
 * Easy (51.73%)
 * Total Accepted:    262.9K
 * Total Submissions: 507.5K
 * Testcase Example:  '[4,5,1,9]\n5'
 *
 * Write a function to delete a node (except the tail) in a singly linked list,
 * given only access to that node.
 * 
 * Given linked list -- head = [4,5,1,9], which looks like following:
 * 
 * 
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [4,5,1,9], node = 5
 * Output: [4,1,9]
 * Explanation: You are given the second node with value 5, the linked list
 * should become 4 -> 1 -> 9 after calling your function.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = [4,5,1,9], node = 1
 * Output: [4,5,9]
 * Explanation: You are given the third node with value 1, the linked list
 * should become 4 -> 5 -> 9 after calling your function.
 * 
 * 
 * 
 * 
 * Note:
 * 
 * 
 * The linked list will have at least two elements.
 * All of the nodes' values will be unique.
 * The given node will not be the tail and it will always be a valid node of
 * the linked list.
 * Do not return anything from your function.
 * 
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
const deleteNode = function(node) {
  if (node === null) { return null; }

  node.val = node.next.val;
  node.next = node.next.next;
};

```

# math

## 231.power-of-two.js

```js
/*
 * @lc app=leetcode id=231 lang=javascript
 *
 * [231] Power of Two
 *
 * https://leetcode.com/problems/power-of-two/description/
 *
 * algorithms
 * Easy (41.57%)
 * Total Accepted:    211.7K
 * Total Submissions: 509.2K
 * Testcase Example:  '1'
 *
 * Given an integer, write a function to determine if it is a power of two.
 * 
 * Example 1:
 * 
 * 
 * Input: 1
 * Output: true 
 * Explanation: 20 = 1
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 16
 * Output: true
 * Explanation: 24 = 16
 * 
 * Example 3:
 * 
 * 
 * Input: 218
 * Output: false
 * 
 */
/**
 * 判断一个数是不是 2 的幂次方
 * 1. 如果这个数是 1，为 true
 * 2. 如果这个数 >= 2 并且是偶数，递归
 * 3. 否则为 false
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = function (n) {
  if (n == 1) {
    return true;
  }
  if (n >= 2 && n % 2 == 0) {
    return isPowerOfTwo(n / 2);
  }
    
  return false;
};

```

## 43.multiply-strings.js

```js
/*
 * @lc app=leetcode id=43 lang=javascript
 *
 * [43] Multiply Strings
 *
 * https://leetcode.com/problems/multiply-strings/description/
 *
 * algorithms
 * Medium (29.84%)
 * Total Accepted:    181.8K
 * Total Submissions: 608.9K
 * Testcase Example:  '"2"\n"3"'
 *
 * Given two non-negative integers num1 and num2 represented as strings, return
 * the product of num1 and num2, also represented as a string.
 * 
 * Example 1:
 * 
 * 
 * Input: num1 = "2", num2 = "3"
 * Output: "6"
 * 
 * Example 2:
 * 
 * 
 * Input: num1 = "123", num2 = "456"
 * Output: "56088"
 * 
 * 
 * Note:
 * 
 * 
 * The length of both num1 and num2 is < 110.
 * Both num1 and num2 contain only digits 0-9.
 * Both num1 and num2 do not contain any leading zero, except the number 0
 * itself.
 * You must not use any built-in BigInteger library or convert the inputs to
 * integer directly.
 * 
 * 
 */
/**
 * 两个字符串相乘
 * 1. 不允许直接乘，直接乘也会超出 JS 17 位的精度，后面显示 0
 * 2. 采用原始的纸写乘法的方法
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = function (num1, num2) {
  if (num1 == 0 || num2 == 0) {
    return '0';
  }
  const sum = [];
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      if (sum[i + j] == undefined) {
        sum[i + j] = num1[i] * num2[j];
      } else {
        sum[i + j] += num1[i] * num2[j];
      }
    }
  }

  sum.reverse();
  for (let i = 0; i < sum.length; i++) {
    if (sum[i] > 9) {
      if (sum[i + 1] == undefined) {
        sum[i + 1] = Math.floor(sum[i] / 10);
      } else {
        sum[i + 1] += Math.floor(sum[i] / 10);
      }
      sum[i] = sum[i] % 10;
    }
  }
  return sum.reverse().join('');
};
```

## 633.sum-of-square-numbers.js

```js
/*
 * @lc app=leetcode id=633 lang=javascript
 *
 * [633] Sum of Square Numbers
 *
 * https://leetcode.com/problems/sum-of-square-numbers/description/
 *
 * algorithms
 * Easy (32.77%)
 * Total Accepted:    38K
 * Total Submissions: 116K
 * Testcase Example:  '5'
 *
 * Given a non-negative integer c, your task is to decide whether there're two
 * integers a and b such that a2 + b2 = c.
 * 
 * Example 1:
 * 
 * 
 * Input: 5
 * Output: True
 * Explanation: 1 * 1 + 2 * 2 = 5
 * 
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 3
 * Output: False
 * 
 * 
 * 
 * 
 */
/**
 * 判断一个数是否为两个数的平方和
 * @param {number} c
 * @return {boolean}
 */
const judgeSquareSum = function(c) {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
    const powSum = left * left + right * right;
    if (powSum === c) {
      return true;
    }

    if (powSum > c) {
      right--;
    }

    if (powSum < c) {
      left++;
    }
  }

  return false;
};

```

## 7.reverse-integer.js

```js
/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 *
 * https://leetcode.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (25.08%)
 * Total Accepted:    601.9K
 * Total Submissions: 2.4M
 * Testcase Example:  '123'
 *
 * Given a 32-bit signed integer, reverse digits of an integer.
 * 
 * Example 1:
 * 
 * 
 * Input: 123
 * Output: 321
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: -123
 * Output: -321
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: 120
 * Output: 21
 * 
 * 
 * Note:
 * Assume we are dealing with an environment which could only store integers
 * within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of
 * this problem, assume that your function returns 0 when the reversed integer
 * overflows.
 * 
 */
/**
 * 反转数字
 * 1. 带正负号的云翔可以用 1、-1 做 sign
 * 2. 然后正常的反转、翻转后 * sign
 * 3. 无聊的越界判断
 * @param {number} x
 * @return {number}
 */
const reverse = function (x) {
  const sign = (x > 0) ? 1 : -1;
  x = Math.abs(x);
  const str = x.toString().split('').reverse().join('');
  const result = sign * Number(str);
  if (result > 2147483647 || result < -2147483648) return 0;
  
  return result;
};

```

## 8.string-to-integer-atoi.js

```js
/*
 * @lc app=leetcode id=8 lang=javascript
 *
 * [8] String to Integer (atoi)
 *
 * https://leetcode.com/problems/string-to-integer-atoi/description/
 *
 * algorithms
 * Medium (14.44%)
 * Total Accepted:    321.9K
 * Total Submissions: 2.2M
 * Testcase Example:  '"42"'
 *
 * Implement atoi which converts a string to an integer.
 * 
 * The function first discards as many whitespace characters as necessary until
 * the first non-whitespace character is found. Then, starting from this
 * character, takes an optional initial plus or minus sign followed by as many
 * numerical digits as possible, and interprets them as a numerical value.
 * 
 * The string can contain additional characters after those that form the
 * integral number, which are ignored and have no effect on the behavior of
 * this function.
 * 
 * If the first sequence of non-whitespace characters in str is not a valid
 * integral number, or if no such sequence exists because either str is empty
 * or it contains only whitespace characters, no conversion is performed.
 * 
 * If no valid conversion could be performed, a zero value is returned.
 * 
 * Note:
 * 
 * 
 * Only the space character ' ' is considered as whitespace character.
 * Assume we are dealing with an environment which could only store integers
 * within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical
 * value is out of the range of representable values, INT_MAX (231 − 1) or
 * INT_MIN (−231) is returned.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: "42"
 * Output: 42
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "   -42"
 * Output: -42
 * Explanation: The first non-whitespace character is '-', which is the minus
 * sign.
 * Then take as many numerical digits as possible, which gets 42.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: "4193 with words"
 * Output: 4193
 * Explanation: Conversion stops at digit '3' as the next character is not a
 * numerical digit.
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: "words and 987"
 * Output: 0
 * Explanation: The first non-whitespace character is 'w', which is not a
 * numerical 
 * digit or a +/- sign. Therefore no valid conversion could be performed.
 * 
 * Example 5:
 * 
 * 
 * Input: "-91283472332"
 * Output: -2147483648
 * Explanation: The number "-91283472332" is out of the range of a 32-bit
 * signed integer.
 * Thefore INT_MIN (−231) is returned.
 * 
 */
/**
 * 考虑 edge case
 * 1. JS 的 parseInt 函数做了大量的工作
 * 2. 无聊的越界处理。。。
 * @param {string} str
 * @return {number}
 */
const myAtoi = function(str) {
  const res = parseInt(str) || 0;
  if (res < -2147483648) {
    return -2147483648;
  }
  if (res > 2147483647) {
    return 2147483647;
  }
  return res;
};

```

# queue

## 641.design-circular-deque.js

```js
/*
 * @lc app=leetcode id=641 lang=javascript
 *
 * [641] Design Circular Deque
 *
 * https://leetcode.com/problems/design-circular-deque/description/
 *
 * algorithms
 * Medium (48.81%)
 * Total Accepted:    4.7K
 * Total Submissions: 9.5K
 * Testcase Example:  '["MyCircularDeque","insertLast","insertLast","insertFront","insertFront","getRear","isFull","deleteLast","insertFront","getFront"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]'
 *
 * Design your implementation of the circular double-ended queue (deque).
 * 
 * Your implementation should support following operations:
 * 
 * 
 * MyCircularDeque(k): Constructor, set the size of the deque to be k.
 * insertFront(): Adds an item at the front of Deque. Return true if the
 * operation is successful.
 * insertLast(): Adds an item at the rear of Deque. Return true if the
 * operation is successful.
 * deleteFront(): Deletes an item from the front of Deque. Return true if the
 * operation is successful.
 * deleteLast(): Deletes an item from the rear of Deque. Return true if the
 * operation is successful.
 * getFront(): Gets the front item from the Deque. If the deque is empty,
 * return -1.
 * getRear(): Gets the last item from Deque. If the deque is empty, return
 * -1.
 * isEmpty(): Checks whether Deque is empty or not. 
 * isFull(): Checks whether Deque is full or not.
 * 
 * 
 * 
 * 
 * Example:
 * 
 * 
 * MyCircularDeque circularDeque = new MycircularDeque(3); // set the size to
 * be 3
 * circularDeque.insertLast(1);            // return true
 * circularDeque.insertLast(2);            // return true
 * circularDeque.insertFront(3);            // return true
 * circularDeque.insertFront(4);            // return false, the queue is full
 * circularDeque.getRear();              // return 2
 * circularDeque.isFull();                // return true
 * circularDeque.deleteLast();            // return true
 * circularDeque.insertFront(4);            // return true
 * circularDeque.getFront();            // return 4
 * 
 * 
 * 
 * 
 * Note:
 * 
 * 
 * All values will be in the range of [0, 1000].
 * The number of operations will be in the range of [1, 1000].
 * Please do not use the built-in Deque library.
 * 
 * 
 */
/**
 * 设计一个双端队列
 * 1. 使用变量 size 记录大小，使用 [] 来存储数据
 * 2. 添加与删除注意边界条件的判断，先判断再操作
 * 
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
const MyCircularDeque = function (k) {
  this.size = k;
  this.queue = [];
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.queue.length === this.size) {
    return false;
  }

  this.queue.unshift(value);
  return true;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.queue.length === this.size) {
    return false;
  }

  this.queue.push(value);
  return true;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.queue.length === 0) {
    return false;
  }
  this.queue.shift();
  return true;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.queue.length === 0) {
    return false;
  }
  this.queue.pop();
  return true;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  return this.queue[0] === undefined ?
    -1 :
    this.queue[0];
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  return this.queue[this.queue.length - 1] === undefined ?
    -1 :
    this.queue[this.queue.length - 1];
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.queue.length === 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return this.queue.length === this.size;
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = Object.create(MyCircularDeque).createNew(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```

# stack

## 20.valid-parentheses.js

```js
/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 *
 * https://leetcode.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (35.73%)
 * Total Accepted:    502.8K
 * Total Submissions: 1.4M
 * Testcase Example:  '"()"'
 *
 * Given a string containing just the characters '(', ')', '{', '}', '[' and
 * ']', determine if the input string is valid.
 * 
 * An input string is valid if:
 * 
 * 
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 * 
 * 
 * Note that an empty string is also considered valid.
 * 
 * Example 1:
 * 
 * 
 * Input: "()"
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "()[]{}"
 * Output: true
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: "(]"
 * Output: false
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: "([)]"
 * Output: false
 * 
 * 
 * Example 5:
 * 
 * 
 * Input: "{[]}"
 * Output: true
 * 
 * 
 */
/**
 * 有效的括号
 * 1. 处理 0、1 的边界条件
 * 2. 定义反向的 map
 * 3. 如果是正向的括号，推入
 * 4. 如果是反向的括号，看栈顶元素是否匹配，匹配推出，不匹配推入
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  if (s === '') { return true; }

  if (s.length === 1) { return false; }

  const arr = s.split('');

  const stack = [];
  const pairMap = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (!pairMap[curr]) {
      stack.push(curr);
      continue;
    }

    if (pairMap[curr] === stack[stack.length - 1]) {
      stack.pop();
    } else { // 如果当前元素和最后一个元素不匹配，继续推
      stack.push(curr);
    }
  }

  if (stack.length !== 0) {
    return false;
  }

  return true;
}
```

# string

## 10.regular-expression-matching.js

```js
/*
 * @lc app=leetcode id=10 lang=javascript
 *
 * [10] Regular Expression Matching
 *
 * https://leetcode.com/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (24.87%)
 * Total Accepted:    270.7K
 * Total Submissions: 1.1M
 * Testcase Example:  '"aa"\n"a"'
 *
 * Given an input string (s) and a pattern (p), implement regular expression
 * matching with support for '.' and '*'.
 * 
 * 
 * '.' Matches any single character.
 * '*' Matches zero or more of the preceding element.
 * 
 * 
 * The matching should cover the entire input string (not partial).
 * 
 * Note:
 * 
 * 
 * s could be empty and contains only lowercase letters a-z.
 * p could be empty and contains only lowercase letters a-z, and characters
 * like . or *.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input:
 * s = "aa"
 * p = "a"
 * Output: false
 * Explanation: "a" does not match the entire string "aa".
 * 
 * 
 * Example 2:
 * 
 * 
 * Input:
 * s = "aa"
 * p = "a*"
 * Output: true
 * Explanation: '*' means zero or more of the precedeng element, 'a'.
 * Therefore, by repeating 'a' once, it becomes "aa".
 * 
 * 
 * Example 3:
 * 
 * 
 * Input:
 * s = "ab"
 * p = ".*"
 * Output: true
 * Explanation: ".*" means "zero or more (*) of any character (.)".
 * 
 * 
 * Example 4:
 * 
 * 
 * Input:
 * s = "aab"
 * p = "c*a*b"
 * Output: true
 * Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore
 * it matches "aab".
 * 
 * 
 * Example 5:
 * 
 * 
 * Input:
 * s = "mississippi"
 * p = "mis*is*p*."
 * Output: false
 * 
 * 
 */
/**
 * Hard 难度？可能 JS 提供了语法构造函数，其他语言要自己实现？
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const reg = new RegExp(`^${p}$`);
  return reg.test(s);
};
```

## 14.longest-common-prefix.js

```js
/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 *
 * https://leetcode.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (32.89%)
 * Total Accepted:    402.3K
 * Total Submissions: 1.2M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * Write a function to find the longest common prefix string amongst an array
 * of strings.
 * 
 * If there is no common prefix, return an empty string "".
 * 
 * Example 1:
 * 
 * 
 * Input: ["flower","flow","flight"]
 * Output: "fl"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 * 
 * 
 * Note:
 * 
 * All given inputs are in lowercase letters a-z.
 * 
 */
/**
 * 1. 以第一个字符串为基准，测试所有其余字符串
 * 2. 从最长开始切割
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) { return ''; }
  let res = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(res) !== 0) {
      res = res.slice(0, res.length - 1);
    }
  }

  return res;
};

```

## 151.reverse-words-in-a-string.js

```js
/*
 * @lc app=leetcode id=151 lang=javascript
 *
 * [151] Reverse Words in a String
 *
 * https://leetcode.com/problems/reverse-words-in-a-string/description/
 *
 * algorithms
 * Medium (15.83%)
 * Total Accepted:    253.5K
 * Total Submissions: 1.6M
 * Testcase Example:  '"the sky is blue"'
 *
 * Given an input string, reverse the string word by word.
 * 
 * Example:  
 * 
 * 
 * Input: "the sky is blue",
 * Output: "blue is sky the".
 * 
 * 
 * Note:
 * 
 * 
 * A word is defined as a sequence of non-space characters.
 * Input string may contain leading or trailing spaces. However, your reversed
 * string should not contain leading or trailing spaces.
 * You need to reduce multiple spaces between two words to a single space in
 * the reversed string.
 * 
 * 
 * Follow up: For C programmers, try to solve it in-place in O(1) space.
 * 
 */
/**
 * 翻转字符串里的单词
 * 
 * @param {string} str
 * @returns {string}
 */
function reverseWords(str) {
  str = str
    .replace(/\s+/g, ' ')
    .trim();
    
  if (!str) { return ''; }

  return str
    .split(' ')
    .reverse()
    .join(' ');
}
```

## 345.reverse-vowels-of-a-string.js

```js
/*
 * @lc app=leetcode id=345 lang=javascript
 *
 * [345] Reverse Vowels of a String
 *
 * https://leetcode.com/problems/reverse-vowels-of-a-string/description/
 *
 * algorithms
 * Easy (40.71%)
 * Total Accepted:    140.9K
 * Total Submissions: 346K
 * Testcase Example:  '"hello"'
 *
 * Write a function that takes a string as input and reverse only the vowels of
 * a string.
 * 
 * Example 1:
 * 
 * 
 * Input: "hello"
 * Output: "holle"
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: "leetcode"
 * Output: "leotcede"
 * 
 * 
 * Note:
 * The vowels does not include the letter "y".
 * 
 * 
 * 
 */
/**
 * 反转字符串中的元音字符
 * 1. 使用双指针指向待反转的两个元音字符
 * @param {string} s
 * @return {string}
 */
const reverseVowels = function(s) {
  let left = 0;
  let right = s.length - 1;
  const result = [];
  const vowlesReg = /[aeiou]/i;
  while (left <= right) {
    const cLeft = s[left];
    const cRight = s[right];
    if (!vowlesReg.test(cLeft)) {
      result[left] = cLeft;
      left++;
    } else if (!vowlesReg.test(cRight)) {
      result[right] = cRight;
      right--;
    } else {
      result[left] = cRight;
      result[right] = cLeft;
      left++;
      right--;
    }
  }

  return result.join('');
};

```

## 557.reverse-words-in-a-string-iii.js

```js
/*
 * @lc app=leetcode id=557 lang=javascript
 *
 * [557] Reverse Words in a String III
 *
 * https://leetcode.com/problems/reverse-words-in-a-string-iii/description/
 *
 * algorithms
 * Easy (62.98%)
 * Total Accepted:    110.7K
 * Total Submissions: 175.7K
 * Testcase Example:  '"Let\'s take LeetCode contest"'
 *
 * Given a string, you need to reverse the order of characters in each word
 * within a sentence while still preserving whitespace and initial word order.
 * 
 * Example 1:
 * 
 * Input: "Let's take LeetCode contest"
 * Output: "s'teL ekat edoCteeL tsetnoc"
 * 
 * 
 * 
 * Note:
 * In the string, each word is separated by single space and there will not be
 * any extra space in the string.
 * 
 */
/**
 * 反转字符串中的单词
 * - 拆分重组
 * @param {string} s
 * @return {string}
 */
const reverseWords = function(s) {
  return s
    .split(' ')
    .map(word => word.split('').reverse().join(''))
    .join(' ');

};

```

## 680.valid-palindrome-ii.js

```js
/*
 * @lc app=leetcode id=680 lang=javascript
 *
 * [680] Valid Palindrome II
 *
 * https://leetcode.com/problems/valid-palindrome-ii/description/
 *
 * algorithms
 * Easy (33.62%)
 * Total Accepted:    60.7K
 * Total Submissions: 180.6K
 * Testcase Example:  '"aba"'
 *
 * 
 * Given a non-empty string s, you may delete at most one character.  Judge
 * whether you can make it a palindrome.
 * 
 * 
 * Example 1:
 * 
 * Input: "aba"
 * Output: True
 * 
 * 
 * 
 * Example 2:
 * 
 * Input: "abca"
 * Output: True
 * Explanation: You could delete the character 'c'.
 * 
 * 
 * 
 * Note:
 * 
 * The string will only contain lowercase characters a-z.
 * The maximum length of the string is 50000.
 * 
 * 
 */
/**
 * 1. 多使用 -- 或 ++ 符号减少代码行数
 * 2. 在第一层回文判断失败后进行删减后的判断
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = function(s) {
  let l = -1;
  let r = s.length;
  while (++l < --r) {
    if (s[l] !== s[r]) {
      return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
    }
  }

  return true;
};

function isPalindrome(s, l, r) {
  while (l < r) {
    if (s[l++] !== s[r--]) {
      return false;
    }
  }

  return true;
}

```

# tree

## 102.binary-tree-level-order-traversal.js

```js
/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
 *
 * https://leetcode.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (46.78%)
 * Total Accepted:    334K
 * Total Submissions: 712.2K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * Given a binary tree, return the level order traversal of its nodes' values.
 * (ie, from left to right, level by level).
 * 
 * 
 * For example:
 * Given binary tree [3,9,20,null,null,15,7],
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 
 * 
 * return its level order traversal as:
 * 
 * [
 * ⁠ [3],
 * ⁠ [9,20],
 * ⁠ [15,7]
 * ]
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 分层打印二叉树
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
  const res = [];
  levelRecursion(root, res, 0);
  return res;
};

function levelRecursion(node, res, level) {
  if (node === null) return;

  if (res.length < level + 1) {
    res.push([]);
  }

  levelRecursion(node.left, res, level + 1);
  levelRecursion(node.right, res, level + 1);

  res[level].push(node.val);
}
```

## 226.invert-binary-tree.js

```js
/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
 *
 * https://leetcode.com/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (56.74%)
 * Total Accepted:    294.6K
 * Total Submissions: 519.1K
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * Invert a binary tree.
 * 
 * Example:
 * 
 * Input:
 * 
 * 
 * ⁠    4
 * ⁠  /   \
 * ⁠ 2     7
 * ⁠/ \   / \
 * 1   3 6   9
 * 
 * Output:
 * 
 * 
 * ⁠    4
 * ⁠  /   \
 * ⁠ 7     2
 * ⁠/ \   / \
 * 9   6 3   1
 * 
 * Trivia:
 * This problem was inspired by this original tweet by Max Howell:
 * 
 * Google: 90% of our engineers use the software you wrote (Homebrew), but you
 * can’t invert a binary tree on a whiteboard so f*** off.
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 反转二叉树
 * 1. 边界条件判断
 * 2. 左右节点分别等于递归后的右左节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {
  // Edge
  if (!root) { return root; }
  
  if (root) {
    // swap、recusion
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
  }
};
```

## 236.lowest-common-ancestor-of-a-binary-tree.js

```js
/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 *
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (35.12%)
 * Total Accepted:    244.7K
 * Total Submissions: 693.9K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1'
 *
 * Given a binary tree, find the lowest common ancestor (LCA) of two given
 * nodes in the tree.
 * 
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor
 * is defined between two nodes p and q as the lowest node in T that has both p
 * and q as descendants (where we allow a node to be a descendant of itself).”
 * 
 * Given the following binary tree:  root = [3,5,1,6,2,0,8,null,null,7,4]
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * Output: 3
 * Explanation: The LCA of nodes 5 and 1 is 3.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * Output: 5
 * Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant
 * of itself according to the LCA definition.
 * 
 * 
 * 
 * 
 * Note:
 * 
 * 
 * All of the nodes' values will be unique.
 * p and q are different and both values will exist in the binary tree.
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 二叉树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q) {
  if (root === null || root == p || root == q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left === null ?
    right :
    right === null ?
      left :
      root;
};


```

## 94.binary-tree-inorder-traversal.js

```js
/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
 *
 * https://leetcode.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (54.63%)
 * Total Accepted:    402.4K
 * Total Submissions: 735.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * Given a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Example:
 * 
 * 
 * Input: [1,null,2,3]
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3
 * 
 * Output: [1,3,2]
 * 
 * Follow up: Recursive solution is trivial, could you do it iteratively?
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function(root) {
  const res = [];
  helper(res, root);

  return res;

  function helper(res, root) {
    if (root === null) { return; }
    helper(res, root.left);
    res.push(root.val);
    helper(res, root.right);
  }
};

```

# two-pointers

## 11.container-with-most-water.js

```js
/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 *
 * https://leetcode.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (42.27%)
 * Total Accepted:    312.6K
 * Total Submissions: 739.7K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * Given n non-negative integers a1, a2, ..., an , where each represents a
 * point at coordinate (i, ai). n vertical lines are drawn such that the two
 * endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together
 * with x-axis forms a container, such that the container contains the most
 * water.
 * 
 * Note: You may not slant the container and n is at least 2.
 * 
 * 
 * 
 * 
 * 
 * The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In
 * this case, the max area of water (blue section) the container can contain is
 * 49. 
 * 
 * 
 * 
 * Example:
 * 
 * 
 * Input: [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * 
 */
/**
 * 能装下最多的水
 * 1. 先定义左右
 * 2. res 取面积的最大值
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
  let res = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    res = Math.max(res, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return res;
};

```

## 15.3sum.js

```js
/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 *
 * https://leetcode.com/problems/3sum/description/
 *
 * algorithms
 * Medium (23.15%)
 * Total Accepted:    470.2K
 * Total Submissions: 2M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * Given an array nums of n integers, are there elements a, b, c in nums such
 * that a + b + c = 0? Find all unique triplets in the array which gives the
 * sum of zero.
 * 
 * Note:
 * 
 * The solution set must not contain duplicate triplets.
 * 
 * Example:
 * 
 * 
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 * 
 * A solution set is:
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 * 
 * 
 */
/**
 * 求三数之和
 * 1. 边界处理
 * 2. 记得排序数组
 * 3. for 循环：如果 curr 大于 0 直接返回 res，当前数与前一个数相等的时候不处理
 * 4. 定义内层 for 循环，j、k 两段逼近
 * 5. total 为 0 的时候处理
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  const res = [];

  if (nums.length < 3) { return res; }

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // 如果最小值都大于 0，直接返回 []
    // 下面的循环已经做了判断，外层循环不用处理大于 0 的情况
    if (nums[i] > 0) { return res; }

    // 当后一个数与前一个数相等的时候，不处理
    if (i > 0 && nums[i] === nums[i - 1]) { continue; }

    // 多使用这种 for 循环解决问题
    for (let j = i + 1, k = nums.length - 1; j < k;) {
      const total = nums[i] + nums[j] + nums[k];
      // 关键处理 total 为 0 的情况，跳过重复值
      if (total === 0) {
        res.push([nums[i], nums[j], nums[k]]);
        j++;
        k--;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
        continue;
      }

      if (total > 0) {
        k--;
        continue;
      }

      if (total < 0) {
        j++;
      }
    }
  }

  return res;
}
```

## 16.3sum-closest.js

```js
/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 *
 * https://leetcode.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (35.49%)
 * Total Accepted:    246.9K
 * Total Submissions: 695.6K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * Given an array nums of n integers and an integer target, find three integers
 * in nums such that the sum is closest to target. Return the sum of the three
 * integers. You may assume that each input would have exactly one solution.
 * 
 * Example:
 * 
 * 
 * Given array nums = [-1, 2, 1, -4], and target = 1.
 * 
 * The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 * 
 * 
 */
/**
 * 最接近的三数之和
 * 1. 初始值无穷大
 * 2. 只需要把结果和 res 做比较，取小
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function(nums, target) {
  nums.sort((a, b) => a - b);
  let res = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum > target) {
        right--;
      } else {
        left++;
      }
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
    }
  }
  return res;
};
```

## 167.two-sum-ii-input-array-is-sorted.js

```js
/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 *
 * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * algorithms
 * Easy (49.01%)
 * Total Accepted:    206.4K
 * Total Submissions: 421.2K
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * Given an array of integers that is already sorted in ascending order, find
 * two numbers such that they add up to a specific target number.
 * 
 * The function twoSum should return indices of the two numbers such that they
 * add up to the target, where index1 must be less than index2.
 * 
 * Note:
 * 
 * 
 * Your returned answers (both index1 and index2) are not zero-based.
 * You may assume that each input would have exactly one solution and you may
 * not use the same element twice.
 * 
 * 
 * Example:
 * 
 * 
 * Input: numbers = [2,7,11,15], target = 9
 * Output: [1,2]
 * Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.
 * 
 */
/**
 * 使用双指针，一个指针指向值较小的元素，一个指针指向值较大的元素
 * 1. 如果两个指针指向元素的和 sum == target，那么得到要求的结果；
 * 2. 如果 sum > target，移动较大的元素，使 sum 变小一些；
 * 3. 如果 sum < target，移动较小的元素，使 sum 变大一些。
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left++;
    }

    if (sum > target) {
      right--;
    }
  }

  return null;
};

```

## 26.remove-duplicates-from-sorted-array.js

```js
/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 *
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
 *
 * algorithms
 * Easy (39.46%)
 * Total Accepted:    516.9K
 * Total Submissions: 1.3M
 * Testcase Example:  '[1,1,2]'
 *
 * Given a sorted array nums, remove the duplicates in-place such that each
 * element appear only once and return the new length.
 * 
 * Do not allocate extra space for another array, you must do this by modifying
 * the input array in-place with O(1) extra memory.
 * 
 * Example 1:
 * 
 * 
 * Given nums = [1,1,2],
 * 
 * Your function should return length = 2, with the first two elements of nums
 * being 1 and 2 respectively.
 * 
 * It doesn't matter what you leave beyond the returned length.
 * 
 * Example 2:
 * 
 * 
 * Given nums = [0,0,1,1,1,2,2,3,3,4],
 * 
 * Your function should return length = 5, with the first five elements of nums
 * being modified to 0, 1, 2, 3, and 4 respectively.
 * 
 * It doesn't matter what values are set beyond the returned length.
 * 
 * 
 * Clarification:
 * 
 * Confused why the returned value is an integer but your answer is an array?
 * 
 * Note that the input array is passed in by reference, which means
 * modification to the input array will be known to the caller as well.
 * 
 * Internally you can think of this:
 * 
 * 
 * // nums is passed in by reference. (i.e., without making a copy)
 * int len = removeDuplicates(nums);
 * 
 * // any modification to nums in your function would be known by the caller.
 * // using the length returned by your function, it prints the first len
 * elements.
 * for (int i = 0; i < len; i++) {
 * print(nums[i]);
 * }
 * 
 */
/**
 * 去除排序数组的重复项
 * 1. 利用 count 这个变量，初始值是 1
 * 2. 如果后一个数不等于前一个数，进行赋值，count++
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  if (nums === null || nums.length === 0) { return 0; }
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] !== nums[i]) {
      nums[count] = nums[i];
      count++;
    }
  }
  return count;
};

```

## 344.reverse-string.js

```js
/*
 * @lc app=leetcode id=344 lang=javascript
 *
 * [344] Reverse String
 *
 * https://leetcode.com/problems/reverse-string/description/
 *
 * algorithms
 * Easy (62.64%)
 * Total Accepted:    362.6K
 * Total Submissions: 578.7K
 * Testcase Example:  '["h","e","l","l","o"]'
 *
 * Write a function that reverses a string. The input string is given as an
 * array of characters char[].
 * 
 * Do not allocate extra space for another array, you must do this by modifying
 * the input array in-place with O(1) extra memory.
 * 
 * You may assume all the characters consist of printable ascii
 * characters.
 * 
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 * 
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: ["H","a","n","n","a","h"]
 * Output: ["h","a","n","n","a","H"]
 * 
 * 
 * 
 * 
 */
/**
 * 反转字符串
 * 1. 设定首尾指针 start，end
 * 2. 不断交换首尾元素，start++，end--
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = function(s) {
  const swap = (arr, i, j) => {
    [[arr[i]], arr[j]] = [arr[j], arr[i]];
  };

  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    swap(s, left++, right--);
  }
};

```

## 88.merge-sorted-array.js

```js
/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 *
 * https://leetcode.com/problems/merge-sorted-array/description/
 *
 * algorithms
 * Easy (34.70%)
 * Total Accepted:    325K
 * Total Submissions: 936.4K
 * Testcase Example:  '[1,2,3,0,0,0]\n3\n[2,5,6]\n3'
 *
 * Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as
 * one sorted array.
 * 
 * Note:
 * 
 * 
 * The number of elements initialized in nums1 and nums2 are m and n
 * respectively.
 * You may assume that nums1 has enough space (size that is greater or equal to
 * m + n) to hold additional elements from nums2.
 * 
 * 
 * Example:
 * 
 * 
 * Input:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 
 * Output: [1,2,2,3,5,6]
 * 
 * 
 */
/**
 * 合并两个有序数组
 * 1. 定义三个变量 数组1最后的index、数组2最后的坐标index、合并后数组最后的index
 * 2. 从右往左，找到两个数组的最大值填入
 * 3. 如果最后 num2 还有长度，继续填入头部
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] > nums2[j] ?
      nums1[i--] :
      nums2[j--];
  }
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
};

```

## 9.palindrome-number.js

```js
/*
 * @lc app=leetcode id=9 lang=javascript
 *
 * [9] Palindrome Number
 *
 * https://leetcode.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (41.71%)
 * Total Accepted:    506.6K
 * Total Submissions: 1.2M
 * Testcase Example:  '121'
 *
 * Determine whether an integer is a palindrome. An integer is a palindrome
 * when it reads the same backward as forward.
 * 
 * Example 1:
 * 
 * 
 * Input: 121
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, it
 * becomes 121-. Therefore it is not a palindrome.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: 10
 * Output: false
 * Explanation: Reads 01 from right to left. Therefore it is not a
 * palindrome.
 * 
 * 
 * Follow up:
 * 
 * Coud you solve it without converting the integer to a string?
 * 
 */
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
  x = String(x);
  let left = 0;
  let right = x.length - 1;
  while (left < right) {
    if (x[left] === x[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }
  return true;
};

```

