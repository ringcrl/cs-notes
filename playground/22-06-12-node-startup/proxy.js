/* eslint-disable no-unused-vars  */

const START_NOTIFY_FIFO = '/tmp/node_start_fifo'
const FINISH_NOTIFY_FIFO = '/tmp/node_finish_fifo'

const retryInterval = 100
const startTimeout = 3000
const workerTimeout = 1000 * 60 * 60

// 写 START_NOTIFY_FIFO
// 读 FINISH_NOTIFY_FIFO
