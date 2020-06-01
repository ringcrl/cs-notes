<!--linux-cheat-sheet-->

Linux & Shell 小抄

<!--more-->

# 通用

## 基本

### git 安装 / 配置

yum install git-core

```bash
# 显示中文
git config --global core.quotepath false

# 用户名与邮箱
git config --global user.name "Chenng"
git config --global user.email "ringcrl@foxmail.com"
```

### oh-my-zsh

https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH

https://github.com/robbyrussell/oh-my-zsh

```bash
vim .zshrc

ZSH_THEME="avit"

alias lc='ls -l node_modules/@cmao | grep ^l'
alias lk='ls -l node_modules | grep ^l'
```

### zsh-syntax-highlighting

https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md

```sh
# CentOS

# git clone
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting

# add to plugins in .zshrc
plugins=(
  zsh-syntax-highlighting
)

# make it work
source ~/.zshrc
```

### vim 配置

#### 基本配置

```bash
cp /usr/share/vim/vimrc ~/.vimrc

vim ~/.vimrc

# vim 中文乱码
set encoding=utf-8

# 语法高亮
syntax enable
syntax on

# 显示行号
set nu!
```

#### 安装插件

```sh
# vim-pathogen
https://github.com/tpope/vim-pathogen

# vim-javascript
https://github.com/pangloss/vim-javascript

# typescript-vim
https://github.com/leafgarland/typescript-vim/wiki/Installation
```

### autosuggestions

https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md

### nvm

https://github.com/creationix/nvm#git-install

```sh
nvm install
nvm alias default
```

#### 删除 node pkg 安装包

```sh
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```

### .npmrc 配置

```
init-author-name=chenng
init-author-email=ringcrl@foxmail.com
init-license=MIT
```

### yarn

npm install -g yarn

### nginx

#### CentOS

```sh
yum -y install nginx

# 启动 nginx 服务
systemctl start nginx

# 设置开机自启
systemctl enable nginx

# 停止 nginx 服务
nginx -s stop 
# 重启 nginx 服务
nginx -s reload 

# 设置为 root 用户
vim /etc/nginx/nginx.conf
```

#### Mac

https://segmentfault.com/a/1190000002963355

#### incluce 配置

http://blog.51cto.com/zhouxinyu1991/1827474

## 命令行工具

### autojump

```sh
# https://github.com/wting/autojump

# Mac
brew install autojump
# vim ~/.zshrc
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# CentOS
yum install autojump
# vim ~/.zshrc
plugins=(
  autojump
)
```

### tldr

npm install -g tldr

### pm2

npm install -g pm2

### locate

#### Linux

yum -y install mlocate

updatedb

#### Mac

alias updatedb='/usr/libexec/locate.updatedb'

### nodemon

```sh
npm install -g nodemon
```

### tree

### Linux

yum -y install tree

### Mac

brew install tree

### lazygit

https://github.com/jesseduffield/lazygit

```bash
# CentOS
# 下载 lazygit_0.5_Linux_x86_64.tar.gz
alias lg="$HOME/script/lazygit"
```

### torrent

https://github.com/maxogden/torrent

### httpie

https://httpie.org/doc

### fx

https://github.com/antonmedv/fx

# Linux

## 常用命令

### rm

```sh
## 删除多个文件，排除部分文件
rm -rf `ls __codes__/* __tests__/*|egrep -v '(.gitkeep)'`
```

### tail

```sh
# 实时追踪一个或多个文档的所有更新
tail -f /var/log/mail.log /var/log/apache/error_log
```

### du

```sh
# 查看文件大小
du -sh vue.css
```

### tar

```sh
# 打包
tar -zcvf dist_file source_dir

# 解包
tar -zxvf sourcefile
```

- -z 表示使用 gzip 压缩工具
- -c 压缩打包，-x 表示解压解包
- -v 表示可视化
- -f 后面跟文件名，表示压缩后的文件名为 filename，或当期需要解压文件 filename

### find

```sh
# 找命令
which mv

# 全局寻找文件，需要先安装 mlocate 并执行 updatedb 生成索引
locate nginx.conf

# 文件查找
find root_path -name '*.md'
```

### nohup

```sh
# 后台运行
nohup python app.py > log_app.log 2>&1 &
```

### mkdir

```sh
# 递归创建目录
mkdir -p test1/test2
```

### cat & less

```sh
# 显示行号
cat -b index.html

# 交互式查看文件
less index.html
```

## 服务管理

Systemd 是 Linux 的系统工具，用来启动守护进程

### 服务列表

```sh
systemctl list-units --all --type=service

# UNIT                                   LOAD      ACTIVE   SUB     DESCRIPTION
# acpid.service                          loaded    active   running ACPI Event Daemon
# atd.service                            loaded    active   running Job spooling tools
# auditd.service                         loaded    inactive dead    Security Auditing Service
```

这些服务对应的启动脚本文件保存在 `/usr/lib/systemd/system`

### 常用命令

```sh
# 让某个服务开机自启(.service可以省略)
systemctl enable crond.service

# 不让开机自启
systemctl disable crond

# 查看服务状态
systemctl status crond

# 启动某个服务
systemctl start crond 

# 停止某个服务
systemctl stop crond

# 重启某个服务
systemctl restart crond

# 重新加载服务配置文件
systemctl reload * 

# 查询服务是否开机启动
systemctl is-enabled crond
```

## 文件与权限

属主权限-属组权限-其他用户权限

```sh
# 更改文件属组，-R 递归更改目录所有文件属组
chgrp [-R] 属组名 文件名

# 更改所属主，可以同时更改文件属组
chown [-R] 属主名:属组名 文件名

# 更改文件9个属性，r=4、w=2、x=1
chmod [-R] 770 文件或目录
chmod +x 文件或目录
chmod -x 文件或目录
```

## 用户与用户组

```bash
# 创建一个用户组(可以带上 -g 888 来在创建组的时候增加编号)
groupadd chenng
cat /etc/group
chenng:x:500:

# 修改组名称
groupmod -n newchenng chenng

# 修改组编号
groupmod -g 668 newchenng

# 删除用户组(必须先删除组里面的用户才能删除组)
groupdel newchenng

# 设置组密码
gpasswd chenng

# 创建一个用户
useradd -g sexy sdf
useradd -d /home/chenng chenng(没有指定用户组，会创建一个与用户名相同的用户组)
usermod -c dgdzmx sdf(增加注释)

# 修改一个用户所属用户组
usermod -g sexy chenng

# 删除用户
userdel jzmb(不会删除个人文件夹文件)
userdel -r jzmb(会删除个人文件夹文件)

# 设置用户密码
passwd chenng
```

## 安装源码包


```sh
# 定制软件安装的功能/配置，生成 Makefile 文件
./configure

# 编译
make

# 安装
make install
```

## 系统状态

```sh
# 进程所占的系统资源
top

# 内存使用
free -h

# 网络情况
netstat -lnp
```

## SSH

### 密码登录

```sh
ssh root@192.168.80.128
```

### 密钥认证登录

```sh
## 本地本用户账号生成一个密钥对
ssh-keygen

## 查看秘钥
cat ~/.ssh/id_rsa.pub

## 服务器配置，加入公钥内容
vim ~/.ssh/authorized_keys
## 打开公钥认证配置
vim /etc/ssh/sshd_config
PubkeyAuthentication yes
## 重启 ssh
service sshd reload
```

## centos 防火墙

https://blog.csdn.net/ViJayThresh/article/details/81284007

或者在各平台控制台【安全策略】中设置

## 安全配置

```bash
# 更改安全项配置
vim /etc/ssh/sshd_config

# 一些安全配置项
Port 23333 # 更改默认登录端口
PermitRootLogin no # 禁止 root 账户登陆
PasswordAuthentication no # 禁止密码认证
PermitEmptyPasswords no # 禁止空密码
AllowUsers common # 只允许 common 登陆

# 修改之后重启
service sshd restart
```

## 切换英文

```
vim ~/.zshrc

LANG=en_US.UTF-8
```

## 查看端口占用

```
lsof -i tcp:8080
```


## 查看内存信息

```bash
top
```

## 正在使用的端口

```bash
netstat -tlunp
```

## 配置 cc

```bash
yum -y install gcc automake autoconf libtool make ncurses-devel ncurses
```

# Mac

## 轻点确认设置

辅助功能 => 鼠标与触控板 => 触摸板选项 => 启动拖移 => 三指拖移

## 将 F1、F2 作标准键

系统偏好设置 => 键盘 => 将F1、F2等键作标准功能键

## 全键盘控制

系统偏好设置 => 键盘 => 快捷键 => 所有控制

## finder 快捷键

键盘 => 快捷键 => 服务

```bash
New Iterm2 Window Here => control + cmd + J
iCloud/自动操作 | http://t.cn/RK0jORE
Open With VSCode => control + cmd + K
```

## G502 鼠标快捷键

电脑快捷键

```
键盘 => 快捷键

调度中心 shift + cmd + F10
显示桌面 shift + cmd + F11
显示启动台 shift + cmd + F12
```

Chrome 前进后退

```
前进 cmd + ]
返回 cmd + [
```

## 允许安装不安全软件

sudo spctl --master-disable

## iTrem、rz/sz

https://www.iterm2.com

http://www.jianshu.com/p/52ff25407621

## Homebrew

http://brew.sh/index_zh-cn.html

```sh
# mysql
brew install mysql

# 设置密码
mysql_secure_installation

# 连接数据库
mysql -uroot

# 开机自启动
brew services start mysql

# 非开机自启动
mysql.server start
```

## shadowsocks

https://shadowsocks.se

https://github.com/shadowsocks/ShadowsocksX-NG/releases/

### 终端翻墙

【复制终端代理命令】，快捷命令 `ss`

```bash
echo "alias ss='export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;'" >> ~/.zshrc
```

### 配置 PAC

```
! Put user rules line by line in this file.
! See https://adblockplus.org/en/filter-cheatsheet

mozilla.org
```

## VSCode

### code-setting-sync

```
GitHub Token: 秘钥备忘
GitHub Gist: 秘钥备忘
```

#### 上传配置

shift + alt + u

#### 下载配置

shift + alt + d

### .vscode/launch.json

https://github.com/Microsoft/vscode-recipes

```json
{
  "version": "1.0.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "node-js",
      "program": "${file}",
      "cwd": "${cwd}",
      "runtimeExecutable": "/Users/ringcrl/.nvm/versions/node/v8.12.0/bin/node",
      "outputCapture" : "std"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "node-ts",
      "runtimeArgs": [
        "-r",
        "ts-node/register"
      ],
      "args": [
        "${file}"
      ],
      "outputCapture" : "std"
    }
  ]
}
```

### 快捷键备忘

**在匹配的闭合标签来回跳跃**

`cmd + shift + \` 在匹配的闭合标签来回跳跃

**剪切整行**

剪切文本。但当未选中文本时，该命令会剪切光标所在整行，当然连续 `cmd + x` 用于删除行也是不错的选择

**复制整行**

`cmd + c` 复制文本。但当未选中文本时，该命令会复制光标所在整行

**移动整行**

`alt + ↑/↓` 上下移动光标所在行

**光标所在行下方插入新行**

`ctrl + enter` 直接跳到下一行，不会影响当前行内容

**跳到上一次/下一次光标曾经停留过的地方**

`alt + ←/→` 跳到上一次/下一次光标曾经停留过的地方

**快速修复类型错误**

`cmd + .`

## proxychains-ng

proxychains4 安装

```sh
# 安装 proxychains4
brew install proxychains-ng

# 查看 socks5 的端口，配置 proxychains4
vim ~/.ShadowsocksX-NG/gfwlist.js
vim /usr/local/etc/proxychains.conf

# 把 socks4 去掉，在最后一行添加
socks5 127.0.0.1 1086

# 在命令之前加上 proxychains4 即可使用
proxychains4 git clone ...
```

proxychains4 配置别名 pc

```sh
vim ~/.zshrc

# proxychain-ng config
alias pc='proxychains4'
```

## 重置 Launchpad

defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock

## 其他软件

- Chrome
- Alfred
- Paste
- iStat
- Postman
- Reactotron
- Helm
- TablePlus
- FileZilla
- Magnet
- 百度网盘
- Marp（markdown 制作 PPT）
- Charles
- The Unarchiver
- IINA 播放器
- [Motrix](https://motrix.app/)
- [Snipaste](https://zh.snipaste.com/) 桌面截图工具

## 系统操作

重新安装 MacBook

https://support.apple.com/zh-cn/HT204904

出售或赠送 Mac 前该怎么做

https://support.apple.com/zh-cn/HT201065


# Shell

## git lint

```sh
branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "master" ]; then
    echo "不允许直接提交代码到 master。" 
    exit 1
fi

npm run tsccheck

if [ "$?" == 0 ]; then
    echo "tsc check 通过。"
else
    exit 1
fi

npm run lint

if [ "$?" == 0 ]; then
    echo "lint 通过。"
else
    exit 1
fi
```

# Vim

```sh
# 上下左右
hjkl

# 前翻半页 || 后翻半页
ctrl + u || ctrl + d

# 前翻一页 || 后翻一页
ctrl + f || ctrl + b

# 到首行
gg

# 到尾行
G

# 到 n 行
nG

# 到行首 || 到行位
^ || $

# 复制光标所在行
yy

# 剪切光标所在行
dd

# 粘贴
p

# 高亮选择，按 y 复制，按 d 剪切
v

# 撤销 || 重做
u || ctrl + r

# 当前光标插入 || 下一行插入 || 上一行插入
i || o || O

# 查找字符，n 查看下一个结果，N 查看上一个结果
/word

# 保存及退出
:w # 保存文本
:q # 退出vim。
:w! #强制保存，在 root 用户下，即使文本只读也可以完成保存。
:q! # 强制退出，所有改动不生效
:wq # 保存并退出

# 删除一个字符
x

# 到下一个单词头
w

# 到上一个单词头
b

# 删除一个单词
dw

# 显示当前文件信息
ctrl + g
```