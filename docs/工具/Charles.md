# Charles 配置

```sh
# 配置 HTTP Proxy，内网策略只能 8000-8100 端口
Proxy => Proxy Settings => Port:8099

# 电脑证书
Help => SSL Proxying => Install Charles Root Certificate

# 手机证书
手机连接电脑 ip:port，访问 chls.pro/ssl，下载证书
设置 => 通用 => 描述文件与设备管理 => Charles
设置 => 通用 => 关于本机 => 证书信任设置 => Charles

# 电脑设置 SSL
Proxy => SSL Proxying Settings => Enable SSL Proxying
Location *:*
```