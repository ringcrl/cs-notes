<!--configuration-linux-mac-->

配置一个新的 Mac/Linux 环境。

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

### node

nvm install
nvm alias default

#### 删除 pkg 安装包

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

### mysql

#### Center OS

https://blog.csdn.net/xyang81/article/details/51759200

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_passwork' WITH GRANT OPTION;

#### Mac OS

https://blog.csdn.net/w605283073/article/details/80417866

mysql> ALTER USER 'yourusername'@'localhost' IDENTIFIED WITH mysql_native_password BY 'youpassword';

#### 数据备份

TablePlus 备份与还原

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

## NodeJS 全局模块

```sh
npm install -g \
eslint \
babel-eslint \
eslint-plugin-react \
jest \
typescript \
tslint \
ts-node \
@types/node
```

## firekylin 博客

### 安装

https://github.com/firekylin/firekylin/wiki/%E5%AE%89%E8%A3%85

注意：操作一定要使用 npm，用 yarn 会导致 bug。

### https

https://cloud.tencent.com/document/product/400/4143

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

# Linux

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

## 文件与文件夹

```bash
# 文件夹归属与组归属
sudo chown -R gmftp:gmftp universal/

# 变更文件权限
owner = rwx = 4+2+1 = 7
group = rwx = 4+2+1 = 7
others= --- = 0+0+0 = 0
chmod [-R] xyz 文件或目录
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

# Ubuntu

## shadowsocks

https://github.com/shadowsocks/shadowsocks-qt5/wiki/Installation

### 设置 shadowsocks

- 本地端口 1080
- 本地服务器类型 HTTP

### 设置网络

代理 127.0.0.1 1080

## ssh-key

ssh-keygen

## git

sudo apt install git

## 盒盖无法唤醒

```sh
# 检查是否安装 laptop-mode-tools 工具包
dpkg -l | grep laptop-mode-tools

# 安装 laptop-mode
sudo apt-get install laptop-mode-tools

# 检查是否启动 laptop-mode 模式，非 0 表示启动了
cat /proc/sys/vm/laptop_mode

# 修改配置文件
vi /etc/default/acpi-support # 看最后一行
vi /etc/laptop-mode/laptop-mode.conf

ENABLE_LAPTOP_MODE_ON_BATTERY=1
ENABLE_LAPTOP_MODE_ON_AC=1
ENABLE_LAPTOP_MODE_WHEN_LID_CLOSED=1

# 启动 laptop_mode
sudo laptop_mode start
```

# iOS

## 常用软件

- Imaging Edge Mobile（索尼照片快传）