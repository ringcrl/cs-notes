const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');

// 设置子进程执行程序
cluster.setupMaster({
  exec: path.resolve(__dirname, './worker.js'),
  slient: true,
});

class WorkerPool {
  // 总数
  endNum = 500;

  // 当前已处理任务数
  currNum = 1;

  workerList = [];

  handleMap = {};

  startTime = 0;

  constructor() {
    this.init();
  }

  run() {
    this.startTime = Date.now();
    this.sendHello();
  }

  sendHello() {
    this.workerList.forEach((worker) => {
      worker.send({
        type: 'hello',
        data: this.currNum,
      });
    });
  }

  handleWorkerMsg(worker, msg) {
    // 处理握手，第一个握手的 worker，享受处理权
    if (msg.type === 'hi' && msg.data === this.currNum) {
      if (this.handleMap[msg.data]) {
        return;
      }

      worker.send({
        type: 'call',
        data: msg.data,
      });
      this.handleMap[msg.data] = true;

      // 该发的请求发完了，不继续发送了
      if (msg.data === this.endNum) {
        return;
      }
      this.currNum += 1;
      // 发送下一次握手申请
      this.sendHello();
    }
    // 其他 worker 回包忽略

    // 处理回包
    if (msg.type === 'res') {
      console.log(msg, `process: ${msg.src}/${this.endNum}`);
      if (msg.src === this.endNum) {
        console.log(`总耗时: ${Date.now() - this.startTime}`);
        setTimeout(() => {
          cluster.disconnect();
        }, 100);
      }
    }
  }

  init() {
    const that = this;
    if (cluster.isMaster) {
      cluster.on('fork', (worker) => {
        console.log(`[master] : fork worker ${worker.id}`);
      });
      cluster.on('exit', (worker) => {
        console.log(`[master] : worker ${worker.id} died`);
      });

      for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();

        // 接收子进程数据
        worker.on('message', function (msg) {
          that.handleWorkerMsg(this, msg);
        });

        this.workerList.push(worker);
      }
    } else {
      process.on('message', (msg) => {
        console.log(msg);
      });
    }
  }
}

const workerPoll = new WorkerPool();
workerPoll.run();
