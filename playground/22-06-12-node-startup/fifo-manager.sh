#!/bin/bash

while true
do
    # 保持1个 worker 实例在运行
    WORKER_RUNNING_CNT=`pgrep -c -f "main.js"`
    if [ "$WORKER_RUNNING_CNT" -gt 0 ]
    then
        sleep 0.5
        continue
    fi

    # 拉起 worker
    node main.js

    # 不论 node 是否正常退出，尝试给 node_proxy 发送信号
    # pkill --signal SIGUSR1 -f node_proxy
done
