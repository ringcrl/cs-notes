```sh
# 配置 .env

# 运行
python stocks-monitor.py

# 后台运行
nohup python stocks-monitor.py > output.log 2>&1 &

# 关闭后台运行
ps aux | grep stocks-monitor
kill -9 PID
```
