# Node 多进程模型

- 进程是线程的容器，线程是进程的一个实体，同一个进程中的多个线程可以并发执行
- 只有建立了 IPC 通信，进程间才能数据共享

# 使用方法

```sh
npx ts-node ts_worker_main.ts
```

参考地址：

- [理解Node.js中的"多线程"](https://zhuanlan.zhihu.com/p/74879045)
