<!--linux-cheat-sheet-->

linux 小抄。

<!--more-->

# 快捷键

- Tab：命令和文件名补全；
- Ctrl+C：中断正在运行的程序；
- Ctrl+D：结束键盘输入（End Of File，EOF）

# 常用命令

## rm

```sh
# 删除多个文件，排除部分文件
rm -rf `ls __codes__/* __tests__/*|egrep -v '(.gitkeep)'`
```

## xargs

### 将 stdin 转换成传入其它命令的参数

`xargs`命令的作用在于给别的命令传递参数，其一般配合管道符`|`来使用，把前一命令的stdout作为自己的stdin，再转换成`command line`形式的参数传给其它命令。

### xargs 命令的语法

其一般出现的形式如下：

```
OtherCommand [options] | xargs [options] [TargetCommand [options]]
```

如：

```
find /tmp -name "*.log" -type f -print | xargs /bin/rm -f
```

上面这是`xargs`命令的常用场景，配合`find`命令，找到`/tmp`目录下所有日志文件并予以删除。

### xargs 命令的意义

- 虽然管道能把别的命令的stdout作为下个命令的stdin传入，但毕竟并非所有的命令都接受stdin的，如`ls`；比较常见接受stdin的命令有`cat`、`less`；而`xargs`命令能转化stdin的命令正好弥补了这些不接受stdin的命令的不足。
- 对于大数据量的操作来说，如上面的例子，一次性删除大量文件，若直接使用`rm -f /tmp/*.log`，很可能会报错`/bin/rm Argument list too long`，而如果我们用上`xargs`命令，`xargs`会帮我们把待删的文件分批交给`rm`命令来执行。
- 某些命令针对`xargs`调用的方式进行了优化，达到更进一步的效果，如：

```bash
# ls | xargs ls
file1 file2 file3

dir1:
file4

dir2:
file5 file6 file7
```

### xargs 命令的工作原理

想了解`xargs`命令的工作原理，其实很简单；`xargs`命令在不指定目标命令时，其默认目标命令实际上是`echo`：

```
# ls ./ | xargs echo
file1 file2 file3
# ls ./ | xargs
file1 file2 file3
# ls ./
file1   file2   file3
```

从以上命令的执行结果我们可以看到，`xargs`命令实际上就是**将所有空格、制表符和分行符都替换为空格并压缩到一行上显示，这一整行将作为一个字符串传入到目标命令中**。

以下两个命令实际上是等价的：

```bash
# ls ./ | xargs echo
file1 file2 file3
# echo 'file1 file2 file3'
file1 file2 file3
```

明白了`xargs`命令的工作原理，那么其实它所支持的options也很好理解，实际上就是如何将stdin传来的结果转化成不同的字符串，如处理分隔符的问题、转化成多个字符串分批执行的问题。

# CentOS 的系统服务管理系统

## Linux系统服务管理

从CentOS7开始，CentOS的服务管理工具由SysV改为了systemd，但即使是在CentOS7里，也依然可以使用`chkconfig`这个原本出现在SysV里的命令。

Systemd的设计目标是，为系统的启动和管理提供一套完整的解决方案。

## chkconfig 服务管理工具

### 管理的服务

使用`chkconfig --list`命令可以列出所有的服务及其在每个级别(run level)下的自启状态。

```
netconsole      0:off   1:off   2:off   3:off   4:off   5:off   6:off
network         0:off   1:off   2:on    3:on    4:on    5:on    6:off
```

这里我们只关心第3级和第5级：第3级表示完整的多用户模式，是标准的运行级，也即我们平常最常用的文字模式；第5级表示图形界面的管理模式。

需要注意的是，在CentOS7中，`chkconfig`只保留极少量的SysV服务，其它服务请使用systemd进行管理。

### 更改某服务在某级别下的自启状态

例如，使用`chkconfig --level 345 network off`即可关闭network这个服务在第3/4/5级中的自启；另外如果不传入参数`--level`，则默认针对级别2/3/4/5操作。

### 添加/删除管理的服务项

简单例如：

```
# chkconfig --del network
# chkconfig --add network
```

## systemd 服务管理工具

### systemd功能介绍

Systemd 是 Linux 的系统工具，用来启动守护进程，已成为大多数发行版的标准配置。

它的设计目标是，为系统的启动和管理提供一套完整的解决方案。
根据 Linux 惯例，字母d是守护进程（daemon）的缩写。 Systemd 这个名字的含义，就是它要守护整个系统。

从CentOS7开始，CentOS的服务管理工具由SysV改为了systemd，但即使是在CentOS7里，也依然可以使用`chkconfig`这个原本出现在SysV里的命令。

### 所管理的服务

使用`systemctl list-units --all --type=service`：

```
# systemctl list-units --all --type=service
  UNIT                                   LOAD      ACTIVE   SUB     DESCRIPTION
  aegis.service                          loaded    active   running LSB: aegis update.
  agentwatch.service                     loaded    active   exited  SYSV: Starts and stops guest agent
  aliyun-util.service                    loaded    active   exited  Initial Aliyun Jobs
  aliyun.service                         loaded    active   running Aliyun Service Daemon
```

这些服务对应的启动脚本文件保存在`/usr/lib/systemd/system`。

### 基本概念

systemd把系统的各项资源（包括各个服务、设备等）都看作是**unit**，unit有许多种类，我们目前关心的是**service**和**target**。这里的service并不是什么新概念，因此只解释一下target：target是多个unit的组合，启动一个target也就相当于启动其中包含的所有unit；SysV中的run level在systemd里被target所取代，例如系统以多用户文字模式(runlevel 3)启动时，就会启动**multi-user.target**，而以图形界面模式(runlevel 5)启动时，则会启动**graphical.target**；target之间并非互斥的，因此可以同时启动多个target。

我们可以用`systemctl list-dependencies multi-user.target`来列举multi-user.target所包含的内容：

```
# systemctl list-dependencies multi-user.target
multi-user.target
● ├─aegis.service
● ├─agentwatch.service
● ├─aliyun-util.service
● ├─aliyun.service
● ├─brandbot.path
● ├─crond.service
● ├─dbus.service
● ├─network.service
● ├─ntpd.service
● ├─plymouth-quit-wait.service
● ├─plymouth-quit.service
● ├─rc-local.service
● ├─rsyslog.service
● ├─sshd.service
● ├─sysstat.service
● ├─systemd-ask-password-wall.path
● ├─systemd-logind.service
● ├─systemd-readahead-collect.service
● ├─systemd-readahead-replay.service
● ├─systemd-update-utmp-runlevel.service
● ├─systemd-user-sessions.service
● ├─basic.target
● │ ├─microcode.service
● │ ├─rhel-autorelabel-mark.service
● │ ├─rhel-autorelabel.service
● │ ├─rhel-configure.service
● │ ├─rhel-dmesg.service
● │ ├─rhel-loadmodules.service
● │ ├─paths.target
● │ ├─slices.target
● │ │ ├─-.slice
● │ │ └─system.slice
● │ ├─sockets.target
● │ │ ├─dbus.socket
● │ │ ├─systemd-initctl.socket
● │ │ ├─systemd-journald.socket
● │ │ ├─systemd-shutdownd.socket
● │ │ ├─systemd-udevd-control.socket
● │ │ └─systemd-udevd-kernel.socket
● │ ├─sysinit.target
● │ │ ├─dev-hugepages.mount
● │ │ ├─dev-mqueue.mount
● │ │ ├─kmod-static-nodes.service
● │ │ ├─ldconfig.service
● │ │ ├─plymouth-read-write.service
● │ │ ├─plymouth-start.service
```

可以看出这其中就包含了不少target，比如**basic.target**，因此target是可以嵌套的。

### 常用命令

```
# systemctl enable crond.service // 让某个服务开机自启(.service可以省略)
# systemctl disable crond // 不让开机自启
# systemctl status crond // 查看服务状态
# systemctl start crond // 启动某个服务
# systemctl stop crond // 停止某个服务
# systemctl restart crond //重启某个服务
# systemctl reload * # 重新加载服务配置文件
# systemctl is-enabled crond // 查询服务是否开机启动
```

# CentOS 的文件系统

## 修改文件的特殊属性

`chattr`，可修改文件的多种特殊属性：

- `a`，增加该属性后，只能追加不能删除，非root用户不能设定该属性
- `c`，自动压缩该文件，读取时会自动解压；
- `i`，增加后，使文件不能被删除、重命名、设定链接接、写入、新增数据

`lsattr`，该命令用来读取文件或者目录的特殊权限

## 在 linux 下搜一个文件

- `which`，找命令。
- `locate`，针对已生成的全局文件树索引对文件名进行搜索，但使用前需要先安装`mlocate`且执行`updatedb`来生成文件树索引；该命令仅支持按文件名进行搜索。
- `find`，遍历查找指定目录（不指定就针对整个系统进行查找）；该命令支持多种筛选条件（可按`与或否`的逻辑关系进行串联）进行查找，如：
  - 文件名，通过`-name`和`-iname`参数传入，支持通配符。
  - 所属用户，通过`-user`参数传入。
  - 所属组，通过`-group`参数传入。
  - 文件时间戳的相关属性，通过`-atime`(Access time)/`-ctime`(Change time)/`-mtime`(Modify time)参数传入，其中`-mtime`参数比较常用。
  - 文件类型，通过`-type`参数传入。
  - 文件大小，通过`-size`参数传入。

## 动态显示一个不停增加内容的文件

- 使用`tail -f`可实时追踪一个或多个文档的所有更新，这个功能在调试程序时非常好用：

```
tail -f /var/log/mail.log /var/log/apache/error_log
```

## 查看文件/目录占用磁盘大小

`du -sh filename`，解释：

- `-s`，表示只列出目录本身的数据。
- `-h`，系统自动调节单位。

## 压缩和解压缩

### gzip 压缩工具

- linux下压缩工具有多种，但最常用的是gzip，其它的使用起来也差不多。
- gzip只支持文件的压缩，若要压缩目录，则需要使用下述的`tar`打包工具。
- 压缩直接用`gzip sourcefile`，解压则用`gzip -d zipfile`。
- 使用 gzip 压缩的文件后缀一般为`.gz`。

### tar 打包工具

- tar 本身是一个打包工具，并不具有压缩功能，但可以配合压缩工具，一次性完成打包和压缩的任务；通常情况下我们也不会只打包不压缩，所以我们直接记住“一次性打包压缩”的参数即可：
  - `tar -czvf distfile sourcedir`，压缩打包sourcedir到disfile。
  - `tar -zxvf sourcefile`，解压解包fourcefile到当前目录。
- 解释一下上面命令用到的参数：
  - `-z`表示使用 gzip 压缩工具；其实还可使用其它压缩工具（如 bzip2 和 xz），但毕竟最常用的还是 gzip。
  - `-c`(`c` for compress)表示压缩打包，`-x`表示解压解包。
  - `-v`表示可视化。
  - `-f`后面跟文件名（即`-f filename`），表示压缩后的文件名为 filename，或当期需要解压文件 filename。
- tar 除了可以打包目录，还可以指定多个文件打包到一起：`tar -czvf files.tar.gz file1 file2 file3`。
- tar 命令支持查看（但不解压）压缩文件的内容，其参数为`-t`，但需要注意的是必须与`-f`同用，其用法为：`tar -tf file.tar.gz`。

### zip 压缩工具

- 对比起上述介绍的 gzip 和 tar，zip 的功能更为强大，它可以压缩(解压)文件和目录。
- 由于 zip 在 windows 系统上比较常用，因此如需与 windows 系统交换文件，可通过 zip 进行压缩，这样两边都可以识别。
- CentOS 默认不带 zip 命令，需要通过`yum install -y zip`进行安装。
- 压缩文件用`zip distfile sourcefile`，压缩目录则用`zip distfile sourcedir`。
- 需要注意的是，当压缩目录下还有二级目录甚至更多级目录时，zip 命令仅仅是把二级目录本身压缩而已，如果想要一并压缩二级目录下的文件及更多级目录，则必须加上`-r`，如`zip -r distfile sourcedir`。
- 解压文件并不用 zip 命令，而是用`unzip`命令，如`unzip file.zip`。
- 除了基本的压缩/解压功能外，zip 还提供更多进阶功能，如：使用密码进行加密；设置压缩级别；添加注释，等等。

# CentOS 的进程系统

## 暂停以及恢复当前进程的执行

- 使用`Ctrl+D`暂停当前进程。
- 进程被暂停后，使用`fg`把进程恢复到前台继续执行。
- 进程被暂停后，使用`bg`把进程恢复到后台继续执行。
- 如有多个进程被暂停，则可通过`jobs`命令查看其编号，再通过`fg [被暂停进程编号]`或`bg [被暂停进程编号]`，来恢复执行。

## 让linux命令在后台执行

- 在命令后加上符号`&`即可让linux命令在后台执行，例如`sellp 30 &`。
- 如该linux命令正在前台运行，可使用`Ctrl+D`暂停后，再使用`bg`把进程恢复到后台继续执行。

## 让后台正在运行的进程转到前台来

1. 对于所有运行的程序，我们可以用`jobs –l`指令查看，此时记住想要转到前台运行的进程的编号。
2. 我们可以用`fg %[number]`指令把一个程序调到前台来运行。

## 使用kill命令结束一个进程

`kill`命令的语法是`kill 进程的pid`；有时这样并不能终止进程，可以考虑使用`kill -9 进程的pid`，这会强制终止一个进程。

进程的pid可以通过`top`命令或`ps`命令进行查看。

# CentOS 的系统用户与用户组管理

## 更改文件或文件目录的权限

- `groupadd` 增加一个用户组
- `chgrp` 更改所属组
- `chown` 更改所属主，除了可以更改所属用户外，还可更改所属组
- `chmod` 改变用户对文件的读写执行权限，如744
- `umask` 改变新建文件/目录的默认读写执行权限

## 创建一个不允许登录的账号

```
useradd -M -s /sbin/nologin nologinUser
```

但需要注意的是：

- `/sbin/nologin`只是不允许系统login，可以使用其他ftp等服务。
- 如果想彻底一点什么服务都禁止掉，可以使用`/bin/false`。

## 为系统设置管理员账号

- 非root用户可使用`sudo`命令来执行本来只能由root用户才能执行的命令。
- 并非所有的非root用户都可以使用`sudo`命令，只有在`/etc/sudoers`里指定的用户才有此能力。
- 授权使用`sudo`命令的用户，需要root用户使用`visudo`命令进行编辑。
- 为方便起见，可以设置一个“管理员用户组”，先授权这个用户组使用`sudo`命令，再把管理员用户的账号加入到这个“管理员用户组”中即可。授权用户组的配置如下：`%wheel  ALL=(ALL)   ALL`；这个配置便授权给了`wheel`这个用户组。

## 添加或删除某个用户组的成员

- 查`gpasswd`。
- 如果图省事，想一次性让某个用户加入多个用户组，可以使用`usermod`。

# Vim 的使用

## 移动光标

下面操作均需处在一般模式（默认的模式）下：

- `h``j``k``l`分别为“左”“下”“上”“右”
- 翻半页：`Ctrl + d`(`d` for down)，`Ctrl + u`(`u` for up)。
- 翻一页：`Ctrl + f`(`f` for front)，`Ctrl + b`(`b` for back)。
- `gg`表示移到到首行。
- `G`表示移动到尾行。
- `nG`(`n`指的是数字)表示移动到第n行；一般用于根据程序错误提示信息进行 bug fix。
- `0`表示移到光标所在行的行首； $表示移动到光标所在行的行尾。

## 复制剪切粘贴

- 按`yy`复制光标所在行。
- 按`dd`剪切光标所在行，如果光剪切不粘贴，那就相当于删除。
- 按`p`将复制/剪切的内容粘贴至光标后，因为光标是在具体字符的位置上，所以实际是在该字符的后面；整行的复制粘贴在游标的下一行。

## v模式相关

- 按`v`切换到“高亮选择模式”，移动光标进行选择。
- 在`v模式`下，按`y`(`y` for yank)复制高亮选择的内容。
- 在`v模式`下，按`d`剪切高亮选择的内容，如果光剪切不粘贴，那就相当于删除。

## 撤销、重做

以下仅讨论vim下的操作（vi的操作稍有不同）：

- 按`u`进行撤销，可多次撤销。
- 按`Ctrl + r`(`r` for redo)进行重做，可多次重做。

## 进入编辑模式

下面所有操作均需在一般模式下执行：

- `i`，在当前光标所在字符前插入。
- `o`，在当前光标所在行的下一行插入新的一行。
- `O`，在当前光标所在行的上一行插入新的一行。

## 查找和替换字符串

下面所有操作均需在一般模式下执行：

- `/word`，向下查找一个字符串word，查找后按`n`看下一匹配结果，按`N`看上一匹配结果。
- `?word`，向上查找一个字符串word，查找后按`n`看下一匹配结果，按`N`看上一匹配结果。
- `:n1,n2s/word1/word2/g`，在n1和n2行之间查找word1并替换为word2，其中n1、n2皆可取数字，另外n2可取$表示最后一行。

## 行号相关

- `:set nu`表示显示行号。
- `:set nonu`表示不显示行号。

## 保存及退出

- `:w`，保存文本。
- `:q`，退出vim。
- `:w!`，强制保存，在root用户下，即使文本只读也可以完成保存。
- `:q!`，强制退出，所有改动不生效。
- `:wq`，保存并退出。

# RPM(Red Hat Package Manager)

- 系统中存在着一个关于RPM的数据库，它记录了安装包以及包与包之间的依赖关系。
- RPM包是预先在Linux机器上编译并打包的文件，安装非常快捷；但它也有一些缺点：
  - 安装环境必须与编译时的环境一致或者相当；
  - 包与包之间存在着相互依赖的情况下，卸载某个包时，需要先把系统里所有依赖该包的包进行卸载；虽然也可忽略依赖关系进行强制删除，但这样就会导致异常情况的发生。
- 安装RPM包使用命令`rpm -ivh filename`，其中：
  - `-i`，表示安装；
  - `-v`，表示可视化；
  - `-h`，表示显示安装进度；
- 升级RPM包使用命令`rpm -Uvh filename`，其中的`-U`就表示升级。
- 查询rpm包：
  - 查询是否已安装某个包使用命令`rpm -q packagename`，如`rpm -q zip`。另外，我们可以通过`rpm -qa`的命令来查询系统中所有已安装的包，并通过`grep`等方式进行二次搜索，如`rpm -qa | grep zip`。
  - 查询某个已安装的RPM包的详情：`rpm -qi packagename`，可得到版本号、安装时间、简介等信息。
- 卸载RPM包使用命令为`rpm -e packagename`。

## yum 工具

- Yum(Yellow dog Updater,Modified)是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。
- 列出所有可用的RPM包：`yum list`，由于数量众多，我们一般会进行二次搜索、筛选，如`yum list | grep zip | head -n 5`；此命令列出的信息里，主要有以下三列：
  - 第一列是包名，含平台信息。
  - 第二列是最新版本号。
  - 第三列是安装信息，如果已安装，则显示`@base`或`@anaconda`;如果未安装则显示`base`或`anaconda`；如果已安装但已有更新版本，则显示`updates`。
- 搜索RPM包的命令是`yum search str`，如`yun search zip`。
- 安装RPM包的命令是`yum install -y packagename`，如`yun install -y zip`，需要注意的是，虽然不加`-y`也是可以正常安装RPM包的，但是不加`-y`的话，如果该RPM包有依赖的包，就会一个一个轮流询问用户是否需要安装，那样子就太繁琐了，不如就加个`-y`全部默认安装，这也正是 yum 的一大特点嘛。
- 卸载RPM包的命令为`yum remove -y packagename`，加`-y`的原因同`yum install`。
- 升级RPM包的命令为`yum update -y packagename`，加`-y`的原因同`yum install`；另有`yum upgrade -y packagename`，作用与`yum update`类似都是更新本地系统里的该RPM包，不同在于`yum update`会先去更新软件支持列表（也称RPM源）。

## 安装源码包

安装源码包有3个主要步骤，分别是`./configure`、`make`、`make install`。

### 前置工作

安装源码包除了上述3个主要步骤，我们还需要前期的一些准备工作：

- 在官方站点下载源码包，并且基于约定俗成，把源码包放到`/usr/local/src`目录。
- 视源码包格式而定，挑选压缩工具进行解压。

### ./configure

这一步骤的主要作用就在于：

- 定制软件安装的功能/配置；
- 检查系统环境以及是否具有编译该源码包所需要的库；
- 生成 Makefile 文件；

关于软件可定制的功能/配置，我们可以通过命令`./configure --help`来进行查看，此时实际上并不会真的执行`./configure`，而是显示一个帮助文档。

最常用的可配置项莫过于`--prefix`，该配置项的意思是定义软件包的安装路径。

在确定好所有配置项后，我们可以执行形如以下的命令：`./configure --prefix=/usr/local/appache2`，此时就开始检测安装环境了，如果有问题，按照提示信息操作（如安装缺失了的库/包）即可。

如果执行成功，则可看到已生成了`Makefile`；另外也可以执行`echo $?`来验证操作结果，如果结果是0说明执行成功，否则就没有成功。

### make

生成`Makefile`后，需要进行编译，执行命令`make`，执行后，同样可用`echo $?`来验证操作结果。

### make install

通过`make`成功编译后，我们就可以执行安装了，命令为`make install`，执行后，同样可用`echo $?`来验证操作结果。

到此，该源码包便已安装完成了。



# 监控 CentOS 的系统状态

## 如何查看系统变量

- 执行`env`可以查看系统的环境变量，如主机的名称、当前用户的SHELL类型、当前用户的家目录、当前系统所使用的语言等。
- 执行`set`可以看到系统当前所有的变量，其中包括了：
  - 系统的所有预设变量，这其中既包括了`env`所显示的环境变量，也包含了其它许多预设变量。
  - 用户自定义的变量。

## 监控系统的状态

### 使用w命令查看当前系统整体上的负载

使用`w`命令可以查看当前系统整体上的负载：

```
# w
 20:33:11 up 309 days, 10:03,  1 user,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    113.102.224.86   20:33    3.00s  0.00s  0.00s w
```

需要关注的是第一行的最后一个部分——**load average**，这里的3个数字分别表示了系统在1分钟/5分钟/15分钟内的平均负载值，值越大说明服务器压力就越大。

那么，如何看负载是不是太满了呢？其实这个值是与服务器的物理CPU做对比的，那么只要负载值不超过物理CPU数量即可；如当前服务器有两个CPU，那么就尽量不要让负载值超过2。

### 用vmstat命令查看系统具体负载

`vmstat`命令打印的结果共分为6部分：procs、memory、swap、io、system和cpu，其中又有许多的细分字段，这里我们重点关注r、b、si、so、bi、bo、wa字段。

```
# vmstat 1 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 707116  15392 177284    0    0    81     5  110  267  0  0 99  1  0
 0  0      0 707100  15392 177284    0    0     0     0  121  274  1  0 99  0  0
 0  0      0 706712  15392 177284    0    0     0     0  107  254  0  1 99  0  0
 0  0      0 706696  15392 177284    0    0     0    40   94  235  0  0 100  0  0
 0  0      0 706712  15392 177284    0    0     0     0   93  231  0  0 100  0  0
```

- r(run)：表示正在运行或等待CPU时间片的进程数，**该数值如果长期大于服务器CPU的个数，则说明CPU资源不够用了**。
- b(block)：表示等待资源(I/O、内存等)的进程数。举个例子，当磁盘读写非常频繁时，写数据就会非常慢，此时CPU运算很快就结束了，但进程需要把计算的结果写入磁盘，这样进程的任务才算完成，因此这个任务只能慢慢等待磁盘了。**该数值如果长时间大于1，则需要查一下具体是缺的哪项资源**。
- si和so：分别表示由交换区写入内存的数据量以及由内存写入交换区的数据量；**一般情况下，si、so的值都为0，如果si、so的值长期不为0，则表示系统内存不足**，需要借用磁盘上的交换区，由于这往往对系统性能影响极大，因此需要考虑是否增加系统内存。
- bi和bo：分别表示从块设备读取数据的量和往块设备写入数据的量；**如果这两个值很高，那么表示磁盘I/O压力很大**。
- wa：表示I/O等待所占用CPU的时间百分比。**wa值越高，说明I/O等待越严重。如果wa值超过20%，说明I/O等待严重。**

另外，`vmstat`命令后可带两个数字，第一个数字表示每多少秒打印一次结果，第二个数字表示总共打印多少次结果；如果只有第一个数字，则会不停地打印结果，直到你终止该命令。

### 用top命令显示进程所占的系统资源

`top`命令的结果有很多信息，但我们主要用它来监控进程所占的系统资源。top命令的结果每隔3秒变1次，它的特点是把占用系统资源（CPU、内存、磁盘I/O等）最高的进程放到最前面。

```
  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
    1 root      20   0   41060   3576   2396 S  0.0  0.4   0:00.89 systemd
    2 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kthreadd
    3 root      20   0       0      0      0 S  0.0  0.0   0:00.00 ksoftirqd/0
```

这里面我们主要关注RES（所占内存大小）、%CPU、%MEM（占用内存的百分比）、COMMAND这4个字段。

另外，如果需要一次性打印系统资源的使用情况，可以使用`top - bn1`。

### 监控网卡流量

#### 使用sar命令查看网卡流量历史记录

使用`sar`命令前可能需要先进行安装：`yum install -y sysstat`。

使用方法是：`sar -n DEV`，第一次使用时会报错，因为还没有生成相应的数据记录。打印出来的结果里有很多字段，我们关注`rxpck/s`和`rxkB/s`。

- `rxpck/s`表示网卡每秒收取的包的数量，如果数值大于4000则考虑是被攻击了。
- `rxkB/s`表示网卡每秒收取的数据量（单位为KB）。

#### 使用nload命令监控网卡实时流量

使用`nload`前需进行安装：`yum install -y epel-release;yum install -y nload`。

使用起来也很简单，直接使用`nload`命令则可动态显示当前的网卡流入/流出的流量。

### 使用free命令查看内存使用状况

为了检查内存是否够用，除了`vmstat`外，我们还可以使用更直接有效的`free`命令：`free -h`。

```
# free -h
              total        used        free      shared  buff/cache   available
Mem:           992M        141M        462M        516K        388M        714M
Swap:          1.0G          0B        1.0G
```

- total：内存总量，相当于used+free+buff/cache=used+available。
- used：已真正使用的内存量。
- free：剩余（未被分配）的内存量。
- shared：不关注。
- buff/cache：缓解CPU和I/O速度差距所用的内存缓存区，由系统预留出来备用，但如果剩余内存都不够用了，那么这部分也是可以挪用出来供服务来使用的。
- available：可用内存，相当于free+buff/cache。

### 使用ps命令查看系统进程

与`top`命令类似，`ps`命令也是用来查看系统具体进程占用资源的情况；由于`top`命令本身是动态的，而`ps`命令是非动态的（相当于执行命令时的一个快照），因此`ps`命令的功能实际上更接近于`top -bn1`。

### 使用netstat命令查看网络情况

`netstat`的功能非常强大，这里举两个实际使用场景：`netstat -lnp`（打印当前系统启动哪些端口）和`netstat -an`（打印网络连接状况）。

```
# netstat -an
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 172.18.63.215:36492     140.205.140.205:80      ESTABLISHED
```

```
netstat -lnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      1604/mysqld
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1636/httpd
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      1639/vsftpd
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      674/sshd
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1636/httpd
```

# SSH

## 密码登录

```sh
ssh root@192.168.80.128
```

## 密钥认证登录

```sh
# 本地本用户账号生成一个密钥对
ssh-keygen

# 查看秘钥
cat ~/.ssh/id_rsa.pub

# 服务器配置，加入公钥内容
vim ~/.ssh/authorized_keys
# 打开公钥认证配置
vim /etc/ssh/sshd_config
PubkeyAuthentication yes
# 重启 ssh
service sshd reload
```
