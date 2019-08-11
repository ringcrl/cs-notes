# 模板

- MacOS 路径 `/usr/local/etc/nginx/include`
- 文件命名 `www_taobao_com.conf`
- 配 Host

## 静态资源

```nginx
server {
  listen 80;
  server_name www.taobao.com;

  location / {
    root   /Users/ringcrl/www/taobao;
    autoindex on;
    index  index.html;
  }
}
```

## 反向代理

```nginx
server {
  listen 80;
  server_name api.taobao.com

  location / {
    proxy_pass http://127.0.0.1:5555;
    autoindex on;
    index index.html;
  }
}
```

# 安全

## 模板

https://gist.github.com/plentz/6737338

## 隐藏版本信息

/etc/nginx/nginx.conf

```nginx
http {
  server_tokens off; # 隐藏版本号
}
```

# location

## 注意事项

```sh
# 注意 / 的配置，可能导致无法正常访问
location /docs/ {
  proxy_pass http://127.0.0.1:2333/;
}
```

## 匹配规则

- `=` 开头表示精确匹配，如 A 中只匹配根目录结尾的请求，后面不能带任何字符串
- `^~` 开头表示 uri 以某个常规字符串开头，不是正则匹配
- `~` 开头表示区分大小写的正则匹配
- `~*` 开头表示不区分大小写的正则匹配
- `/` 通用匹配，如果没有其它匹配，任何请求都会匹配到
- `/images/` 匹配任何以 /images/ 开头的地址

```sh
location  = / {
  # 精确匹配 /，主机名后面不能带任何字符串
  [ config A ]
}

location / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配，无其他匹配内容的时候才走到这里
  [ config B ]
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ config C ]
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条
  [ config D ]
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif、jpg 或 jpeg 结尾的请求
  # 所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ config E ]
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ config F ]
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F 与 G 的放置顺序是没有关系的
  [ config G ]
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
  [ config H ]
}

location ~* /js/.*/\.js
```

## 优先级

- location =
- location 完整路径
- location ^~ 开头路径
- location ~、~* 正则顺序
- location 部分起始路径
- location /

## 最佳实践

```sh
# 第一个必选规则
location = / {
  proxy_pass http://tomcat:8080/index
}

# 第二个必选规则是处理静态文件请求，这是 nginx 作为 http 服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
  root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
  root /webroot/res/;
}

# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求，自己根据实际把握
# 毕竟目前的一些框架的流行，带 .php、.jsp 后缀的情况很少了
location / {
  proxy_pass http://tomcat:8080/
}
```

# 11 个阶段

- postread
    - realip
    - rewrite、find_config、rewrite
- preaccess
    - limit_req、limit_conn
- access
    - access、auth_basic、auth_request
- precontent
    - try_files、mirrors
- content
    - concat、random_index、index、auto_index、static
- log
    - log

# 指令

## add_header 添加头部

- 仅当当前层级中没有 add_header 指令才会继承父级设置
- http、server和location三处均可配置add_header，但起作用的是最接近的配置，往上的配置都会失效
- 如果 location 中 rewrite 到另一个 location，最后结果仅出现第二个的 header
- 不能继承父级配置，又不想在当前块重复指令，解决办法可以用 include 指令

## referer 防盗链

- 浏览器会在请求头加入 referer 字段，指示当前访问的网页
- 通过 referer 模块的 invalid_referer 变量拒绝非正常访问

## realip 真实用户 IP

- X-Forworded-For 头部传递多个 IP
- X-Real-IP 传递用户 IP

```nginx
location / {
  root   /Users/ringcrl/www;
  index  index.html;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## limit_conn 与 limit_req

- limit_req 在 limit_conn 之前，所以返回 limit_req 的错误
- limit_req 像一个漏斗，拦截上游请求，输出稳定的请求

```nginx
# 设置共享内存，上下文是 http
conn_limit_zoon $binary_remote addr zoom=addr:10m;

server {
  server_name limit.chenng.cn;
  root html/;
  error_log logs/myerror.log info;
  
  location / {
    # limit_conn
    limit_conn_status 500;
    limit_conn_log_level warming;
    limit_rate 50;
    limit conn addr 1;
    
    # limit_req
    limit_req zone=one burst=1 nodelay;
    
  }
}
```

## access 控制 IP 访问

```nginx
location / {
  allow 192.168.1.255;
  deny all;
}
```

## server_name_in_redirect 重定向

```nginx
server {
  server_name_in_redirect on;
  port_in_redirect on;
  absolute_redirect on;
}
```

## index 和 autoindex

- index 的优先级高于 autoindex

```nginx
server {
  server_name autoindex.chenng.cn;
  listen 8080;
  location / {
    alias html/;
    autoindex on;
    # index a.html
    autoindex_exact_size off;
    autoindex_format html;
    autoindex_localtime on;
  }
}
```

## log 打印日志

- `$remote_addr` 与 `$http_x_forwarded_for` 用以记录客户端的 ip 地址
- `$remote_user` 用来记录客户端用户名称
- `$time_local` 用来记录访问时间与时区
- `$request` 用来记录请求的url与http协议
- `$status` 用来记录请求状态；成功是200
- `$body_bytes_s ent` 记录发送给客户端文件主体内容大小
- `$http_referer` 用来记录从那个页面链接访问过来的
- `$http_user_agent` 记录客户端浏览器的相关信息

## split_clients 进行 AB 测试

```nginx
split_clients "${http_testcli}" $variant {
  0.51% .one;
  90%   .two;
  *     "";
}
```

## keepalive 复用 TCP 连接

- 减少握手次数
- 通过减少并发连接数减少了对服务器资源的消耗
- 降低 TCP 拥塞控制的影响

协议

- Connection 头部：`close` 或者 `keepalive`
- keep-alive 头部：timeout=n 告诉客户端至少保留 n 秒，默认 75s

## proxy_pass 反向代理

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_pass http://127.0.0.1:$node_port$request_uri;
```

## 缓存指令

浏览器缓存

- 优点
    - 使用有效的缓存，没有网络消耗，速度最快
    - 即使有网络消耗，但对失效缓存使用 304 响应做到网络流量消耗最小化
- 缺点
    - 仅提升一个用户的体验
  
nginx 缓存

- 优点
    - 提升所有用户的体验
    - 相比浏览器缓存，有效降低上有服务的负载
    - 通过 304 响应减少 nginx 与上游服务器之间的流量消耗
- 缺点
    - 用户仍然保持网络消耗

生产环境：同时使用浏览器缓存与 nginx 缓存

```nginx
server {
  server_name cache.chenng.cn;

  root html/;
  location / {
    # expires 1h; # Cache-Control: max-age=3600; Expires: GMT 时间当前时间一小时后;
    # expires -1h;
    # expires @20h30m;
    # if_modified_since off;
  }
}
```

## HTTP2

### 优点

- 传输数据量大幅度减少
    - 以二进制方式传输
    - 标头压缩
- 多路复用以及相关功能
    - 消息优先级
- 服务器消息推送
    - 并行推送

### 核心概念

- 连接 Connection：1 个 TCP 连接，包含一个或者多个 Stream
- 数据流 Stream：一个双向通信数据流，包含多条 Message
- 消息 Message：对应 HTTP1 中的请求或者响应，包含一条或者多条 Frame
- 数据帧 Frame：最小单位，以二进制压缩格式存放 HTTP1 中的内容

### 配置

```nginx
server {
  server_name http2.chenng.cn;
  root html;
  
  location / {
    http2_push /mirrot.txt;
    http2_push /video.mp4;
  }

  listen 443 ssl http2;
  ssl_certificate ...;
  ssl_certificate_key ...;
}
```

## websocket 方向代理

由 ngx_http_module 模块实现

客户端头部

```sh
GET /?encoding=text HTTP/1.1
Connection: keep-alive, Upgrade
Upgrade: websocket
```

### 实例网站

http://websocket.org/echo.html

nginx 配置方向代理

```nginx
server {
  server_name websocket.chenng.cn;

  default_type text/plain;
  access_log logs/ws.log;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://echo.websocket.org;
  }
}


```

# 第三方模块

## nginx_cache_purge 清除缓存

https://github.com/FRiCKLE/ngx_cache_purge


# 优化

## 优化缓冲区-滑动窗口

- net.ipv4.tcp_rmem = 4096
    - 读取缓存最小值、默认值、最大值，单位字节
- new.ipv4.tcp_wmen = 4096
    - 写缓存最小值、默认值、最大值，单位字节
- net.ipv4.tcp_men = 1541646
    - 系统无内存压力、启动压力模式阈值、最大值，单位为页的数量
- new.ipv4.tcp_moderate_rcvbuf = 1
    - 开启自动调整缓存模式

## 慢启动-拥塞控制

- 慢启动
    - 指数扩展拥塞矿口（cwnd 为拥塞窗口大小）
        - 每收到 1 个 ACK，cwnd = cwnd + 1
        - 每过一个 RTT，cwnd = cwnd * 2
- 拥塞避免：窗口大于 threshold
    - 线性扩展拥塞窗口
        - 每收到 1 个 ACK，cwnd = cwnd + 1 / cwnd
        - 每过 1 个 RTT，窗口加 1
- 拥塞发生
    - 急速降低拥塞窗口
        - RTO 超时，threshold = cwnd / 2，cwnd = 1
        - Fast Retransmit
- 快速恢复
    - 当 Fast Retransmit 出现时，cwnd 调整为 threshold + 3 * MSS

## Nagle 算法

仅针对 HTTP KeeyAlive 连接生效

- Nagle 算法
    - 避免一个连接上同时存在大量小报文
        - 最多只存在一个小报文
        - 合并多个小报文一起发送
    - 提供宽带利用率
- 吞吐量优先：启用 Nagle 算法，tcp_nodelay off
- 低延时优先：禁用 Nagle 算法，tcp_nodelay on
