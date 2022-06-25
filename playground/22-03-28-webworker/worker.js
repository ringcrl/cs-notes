importScripts('./fib.js');

class FibWorker {
  fib = null;

  async init() {
    const fib = await this.initModule();
    this.fib = fib;
    console.log('初始化 worker 完成');
  }

  initModule() {
    return new Promise((resolve, reject) => {
      Module.onRuntimeInitialized = (_) => {
        const fib = Module.cwrap('fib', 'number', ['number']);
        resolve(fib);
      };
    });
  }
}

self.fibWorker = new FibWorker();
self.fibWorker.init();

self.onmessage = function (e) {
  const { data } = e;

  if (data.type === 'ping') {
    postMessage({
      type: 'pong',
      msg: data.msg,
    });
  }

  if (data.type === 'call') {
    const res = self.fibWorker.fib(35);
    postMessage({
      type: 'res',
      src: data.msg,
      data: res,
    });
  }
};
