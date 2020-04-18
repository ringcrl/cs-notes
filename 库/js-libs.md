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

https://github.com/jackspirou/clientjs

获取浏览器唯一指纹

```js
// Create a new ClientJS object
var client = new ClientJS();

// Get the client's fingerprint id
var fingerprint = client.getFingerprint();

// Print the 32bit hash id to the console
console.log(fingerprint);
```