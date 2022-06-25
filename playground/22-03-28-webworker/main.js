class WorkerPoll {
  // 总数
  endNum = 500;

  workNum = 10;

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
      worker.postMessage({
        type: 'ping',
        msg: this.currNum,
      });
    });
  }

  handleWorkerMsg(worker, e) {
    const { data } = e;
    // 处理握手，第一个握手的 worker，享受处理权
    if (data.type === 'pong' && data.msg === this.currNum) {
      if (this.handleMap[data.msg]) {
        return;
      }

      worker.postMessage({
        type: 'call',
        msg: data.msg,
      });
      this.handleMap[data.msg] = true;

      // 该发的请求发完了，不继续发送了
      if (data.msg === this.endNum) {
        return;
      }
      this.currNum += 1;
      // 发送下一次握手申请
      this.sendHello();
    }
    // 其他 worker 回包忽略

    // 处理回包
    if (data.type === 'res') {
      console.log(data, `process: ${data.src}/${this.endNum}`);
      if (data.src === this.endNum) {
        console.log(`总耗时: ${Date.now() - this.startTime}`);
      }
    }
  }

  init() {
    const that = this;
    for (let i = 0; i < this.workNum; i++) {
      const worker = new Worker('./worker.js');

      // 接收子进程数据
      worker.onmessage = function (msg) {
        that.handleWorkerMsg(this, msg);
      };

      this.workerList.push(worker);
    }
  }
}

const workerPoll = new WorkerPoll();
window.workerPoll = workerPoll;
