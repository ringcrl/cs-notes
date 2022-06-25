# 1、如果 FIFO 不存在，则创建
[ -p "/tmp/node_start_fifo" ] || mkfifo /tmp/node_start_fifo
[ -p "/tmp/node_finish_fifo" ] || mkfifo /tmp/node_finish_fifo

# 2、如果 worker 后台管理脚本未执行，则拉起
MANAGER_RUNNING_CNT=`pgrep -c -f "fifo-manager.sh"`
if [ "$MANAGER_RUNNING_CNT" -eq 0 ]
then
    nohup ./fifo-manager.sh > /dev/null 2>&1 &
fi

# 3. worker 代理进程
node proxy.js -r $PWD $*
