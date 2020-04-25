<!--docker-use-->

docker 实战 + 各种操作小抄。

<!--more-->

# 概念

- Image（镜像）
    - 是静态内容，可以理解为只读文件包，如果要把 Image 跑起来，就需要一个 Container
    - Image 无法被修改，要保存就 commit：`docker commit ContainerID TAG`，执行之后就会把当前状态保存为一个新的 Image
- Container（容器）
    - 镜像类比为类的话，容器就是类的实例
- Volume（数据卷）
    - Volume 是专门存放数据的文件夹，启动 Image 时可以挂在一个或者多个 Volume，Volume 中的数据独立于 Image，重启不会丢失
- Network（网络）
    - 在 Container 中运行服务监听 `127.0.0.1:8080`，在自己的机器访问 `127.0.0.1:8080` 是无法访问的
    - Container 的 IP 通常是 `192.168.99.100`，只能被宿主机访问。但只关联了 IP，要想访问端口需要手动配置端口映射，把 Container 内部端口映射到 IP 上

# 安装 docker

```sh
# Mac
https://docs.docker.com/docker-for-mac/install/

# Linux 脚本安装
wget -qO- https://get.docker.com/ | sh
# 非 root 用户使用 docker
sudo usermod -aG docker <your-user>
```

# 镜像

## 拉取镜像

latest 是一个非强制标签，不保证指向仓库中的最新镜像

```sh
# 搜索镜像
docker search ubuntu

# 拉取官方镜像
docker pull ubuntu:latest

# 拉取非官方镜像
docker pull ringcrl/node_rss_bot

# 拉取第三方镜像仓库的镜像
docker pull gcr.ioringcrl/node_rss_bot
```

## 删除镜像

```sh
# 删除镜像
docker image rm <IMAGE ID>

# 删除全部悬虚镜像 
docker image prune

# 删除全部没有被容器使用的镜像
docker image prune -a
```

# 容器

## 生命周期

- Created：容器已经被创建，容器所需的相关资源已经准备就绪，但容器中的程序还未处于运行状态
- Running：容器正在运行，也就是容器中的应用正在运行
- Paused：容器已暂停，表示容器中的所有程序都处于暂停 ( 不是停止 ) 状态
- Stopped：容器处于停止状态，占用的资源和沙盒环境都依然存在，只是容器中的应用程序均已停止
- Deleted：容器已删除，相关占用的资源及存储在 Docker 中的管理信息也都已释放和移除

## 启动容器

```sh
# 拉取镜像
docker pull nginx:1.12

# 创建容器
docker create --name nginx nginx:1.12

# 启动容器
docker start nginx

# run 同时创建和启动，-d 是在后台运行
docker run \
  --name nginx \ 
  -d \
  nginx:1.12
```

## 管理容器

```sh
# 查看所有容器
docker container ls -a

# 停止容器
docker container stop <NAME>

# 删除容器
docker container rm <NAME>

# 停止并删除容器
docker container rm -f <CONTAINER ID>

# 查看容器状态
docker inspect <NAME>
```

## 进入容器

```sh
docker exec -it nginx bash
```

## 容器互联

```sh
# 通过 docker create 或 docker run 时通过 --link 选项进行配置
docker run -d --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker run -d --name webapp --link mysql webapp:latest

# 连接方式
String url = "jdbc:mysql://mysql:3306/webapp";
```

## 暴露端口

```sh
# 在容器创建时使用 --expose 进行定义，不暴露的端口不能访问
docker run -d --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes --expose 13306 --expose 23306 mysql:5.7
```

## 端口映射

```sh
# 在创建容器时使用 -p 创建端口映射
docker run -d -p 80:80 -p 443:443 nginx
```

# 数据持久化

- 沙盒文件系统是跟随容器生命周期所创建和移除的，数据无法直接被持久化存储
- 由于容器隔离，我们很难从容器外部获得或操作容器内部文件中的数据

## 暂停容器数据不会移除

```sh
# 启动容器
docker container run \
  --name percy \
  -it \
  ubuntu:latest \
  /bin/bash

# 新建文件
echo "test data storage" > tmp/newfile

# 停止容器
docker container stop percy

# 重新开始容器
docker container start percy

# 进入容器
docker container exec -it percy bash
```

## 挂载宿主文件

```sh
# -v <host-path>:<container-path> 读写挂载
docker run --name nginx -d -p 80:80 -v ~/static/:/usr/share/nginx/html nginx

# -v <host-path>:<container-path>:ro 以只读挂载
docker run --name nginx -d -p 80:80 -v ~/static/:/usr/share/nginx/html:ro nginx
```

## Volume

数据卷的本质其实依然是宿主操作系统上的一个目录，只不过这个目录存放在 Docker 内部，接受 Docker 的管理。

### 使用数据卷

```sh
# 创建数据卷
docker volume create appdata

# 使用数据卷
docker run -d --name webapp -v appdata webapp:latest
docker run -d --name nginx -v appdata nginx

# 删除没有被容器引用的数据卷
docker volume prune -f
```

### 备份与迁移

```sh
# 可以在 /backup 下找到数据卷的备份文件，也就是 backup.tar
docker run --rm --volumes-from appdata -v /backup:/backup ubuntu tar cvf /backup/backup.tar /webapp/storage

# 恢复备份
docker run --rm --volumes-from appdata -v /backup:/backup ubuntu tar xvf /backup/backup.tar -C /webapp/storage --strip
```

# 保存和共享镜像

```sh
# 将容器修改的内容保存为新的镜像
docker commit -m 'costom config' nginx

# 为新的镜像命名
docker tag [IMAGE ID] nginx_new

# 导出新的镜像
docker save -o ./nginx_new.tar nginx_new

# 导入镜像
docker load < nginx_new.tar

# 批量导出
# docker save -o ./images.tar webapp:1.0 nginx:1.12 mysql:5.7
```

# Dockerfile

## 例子

```Dockerfile
# 该 image 文件继承官方的 node image，冒号表示标签，这里标签是 8.4，即 8.4 版本的 node。
FROM node:8.4

# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
COPY . /app

# 指定接下来的工作路径为/app。
WORKDIR /app

# 在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
RUN npm install --registry=https://registry.npm.taobao.org

# 将容器 3000 端口暴露出来， 允许外部连接这个端口。
EXPOSE 3000
```

## 常用指令

### FROM

通常我们不会从零开始搭建一个镜像，而是会选择一个已经存在的镜像作为我们新镜像的基础。

```dockerfile
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```

### RUN

RUN 命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件

```dockerfile
RUN <command>
RUN ["executable", "param1", "param2"]
```

### ENTRYPOINT 和 CMD

基于镜像启动的容器，在容器启动时会根据镜像所定义的一条命令来启动容器中进程号为 1 的进程。而这个命令的定义，就是通过 Dockerfile 中的 ENTRYPOINT 和 CMD 实现的。

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
```

### EXPOSE

通过 EXPOSE 指令为镜像指定要暴露的端口

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

### VOLUME

制作镜像的人是最清楚镜像中程序工作的各项流程的，所以它来定义数据卷也是最合适的。所以在 Dockerfile 里，提供了 VOLUME 指令来定义基于此镜像的容器所自动建立的数据卷。

在 VOLUME 指令中定义的目录，在基于新镜像创建容器时，会自动建立为数据卷，不需要我们再单独使用 -v 选项来配置了。

```dockerfile
VOLUME ["/data"]
```

### COPY 和 ADD

使用 COPY 或 ADD 指令能够帮助我们直接从宿主机的文件系统里拷贝内容到镜像里的文件系统中。

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] <src>... <dest>

COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

COPY 与 ADD 指令的定义方式完全一样，需要注意的仅是当我们的目录中存在空格时，可以使用后两种格式避免空格产生歧义。

对比 COPY 与 ADD，两者的区别主要在于 ADD 能够支持使用网络端的 URL 地址作为 src 源，并且在源文件被识别为压缩包时，自动进行解压，而 COPY 没有这两个能力。

虽然看上去 COPY 能力稍弱，但对于那些不希望源文件被解压或没有网络请求的场景，COPY 指令是个不错的选择。

## 构建镜像

- docker build 可以接收一个参数，需要特别注意的是，这个参数为一个目录路径 (本地路径或 URL 路径)，而并非 Dockerfile 文件的路径。
- 在 docker build 里，这个我们给出的目录会作为构建的环境目录，我们很多的操作都是基于这个目录进行的。例如，在我们使用 COPY 或是 ADD 拷贝文件到构建的新镜像时，会以这个目录作为基础目录。
- 在默认情况下，docker build 也会从这个目录下寻找名为 Dockerfile 的文件，将它作为 Dockerfile 内容的来源。
- 在构建时我们最好总是携带上 -t 选项，用它来指定新生成镜像的名称。

```sh
docker build -t webapp:latest .
```

## 发布镜像

```sh
docker tag node_rss_bot ringcrl/node_rss_bot

docker push ringcrl/node_rss_bot:tagname
```

## 服务端启动镜像

```sh
docker pull ringcrl/node_rss_bot
docker run --name node_rss_bot -d -v /var/data:/app/data/ -e RSSBOT_TOKEN=<TG_TOKEN> ringcrl/node_rss_bot
```

## 服务端更新镜像

```sh
# 查看镜像
docker images

# 拉取最新镜像
docker pull ringcrl/node_rss_bot

# 查找容器
docker ps

# 停止容器
docker kill 26cd26b1a5d5

# 删除容器
docker rm 26cd26b1a5d5

# 重新创建容器
docker run --name node_rss_bot -d -v /var/data:/app/data/ -e RSSBOT_TOKEN=<TG_TOKEN> ringcrl/node_rss_bot
```

## 实用技巧

### 构建时变量

```sh
# --build-arg 制定参数
docker build --build-arg TOMCAT_MAJOR=8 --build-arg TOMCAT_VERSION=8.0.53 -t tomcat:8.0 ./tomcat
```

```dockerfile
FROM debian:stretch-slim

# 声明参数
ARG TOMCAT_MAJOR
ARG TOMCAT_VERSION

# 使用参数
RUN wget -O tomcat.tar.gz "https://www.apache.org/dyn/closer.cgi?action=download&filename=tomcat/tomcat-$TOMCAT_MAJOR/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz"
```

### 环境变量

```dockerfile
FROM debian:stretch-slim

# 环境变量设置的实质，其实就是定义操作系统环境变量
# 在运行的容器里，一样拥有这些变量，而容器中运行的程序也能够得到这些变量的值
ENV TOMCAT_MAJOR 8
ENV TOMCAT_VERSION 8.0.53

RUN wget -O tomcat.tar.gz "https://www.apache.org/dyn/closer.cgi?action=download&filename=tomcat/tomcat-$TOMCAT_MAJOR/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz"
```

### 构建缓存

```sh
# 默认开启缓存，可以通过 --no-cache 禁用
docker build --no-cache ./webapp
```

### .dockerignore

```
.git
node_modules
npm-debug.log
```

上面代码表示，这三个路径要排除，不要打包进入 image 文件。

# Docker Compose

Dockerfile 是将容器内运行环境的搭建固化下来，Docker Compose 可以理解为将多个容器运行的方式和配置固化下来。

## 安装

```sh
# 下载
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 增加可执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 检查是否安装成功
sudo docker-compose version

# 也可以通过 pip 安装
# sudo pip install docker-compose
```

## 编写配置

docker-compose.yml

```yml
version: '3' # 制定 docker compose 版本

services: # service 作为配置最小单元

  webapp:
    build: ./image/webapp
    ports:
      - "5000:5000"
    volumes:
      - ./code:/code
      - logvolume:/var/log
    links:
      - mysql
      - redis

  redis:
    image: redis:3.2
  
  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw

volumes:
  logvolume: {}
```

## 启动停止

```sh
# 启动，和 run 一样，默认在前台运行，需要加 -d
docker-compose up -d

# 停止，停止所有的容器，并将它们删除，同时消除网络等配置内容
docker-compose down
```

## 常用配置

### 制定镜像

```yml
# 通过 image 制定镜像
  redis:
    image: redis:3.2

# 通过 Dockerfile 构建镜像
  webapp:
    build:
      context: ./webapp
      dockerfile: webapp-dockerfile
      args:
        - JAVA_VERSION=1.6
```

### 依赖声明

如果我们的服务间有非常强的依赖关系，我们就必须告知 Docker Compose 容器的先后启动顺序。只有当被依赖的容器完全启动后，Docker Compose 才会创建和启动这个容器。

```yml
  webapp:
    depends_on:
      - redis
      - database
```

### 文件挂载

```yml
  nginx:
    image: nginx:1.12
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./webapp/html:/webapp/html
```

### 使用数据卷

想把属于 Docker Compose 项目以外的数据卷引入进来直接使用，我们可以将数据卷定义为外部引入，通过 external 这个配置就能完成这个定义。

```yml
volumes:
  mysql-data:
    external: true
```

### 配置网络

```yml
  webapp:
    build: ./webapp
    networks:
      - frontend
      - backend

  nginx:
    image: nginx:1.12
    networks:
      - frontend
```

### 端口映射

```yml
  nginx:
    ports:
      - "80:80"
      - "443:443"
```

# 服务备忘

谷歌云：http://35.224.135.92:1200

## node_rss_bot

```sh
docker pull ringcrl/node_rss_bot

docker run \
  --name node_rss_bot \
  -d -v /var/data:/app/data/ \
  -e RSSBOT_TOKEN=<TG_TOKEN> \
  ringcrl/node_rss_bot
```

## RSSHub

```sh
# 拉取镜像
docker pull diygod/rsshub

# 通过配置启动
docker run -d \
  --name rsshub \
  -p 1200:1200 \
  -e BILIBILI_COOKIE_297970177=<cookie> \
  diygod/rsshub

# 删除容器，重新启动
docker stop rsshub
docker rm rsshub
```
