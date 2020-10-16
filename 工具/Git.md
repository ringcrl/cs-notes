<!--Git operation practice-->

git cheat sheet。

<!--more-->

# .gitignore

```sh
# 匹配模式前 / 代表项目根目录
# 匹配模式后 / 代表是目录
# ? 匹配任意一个字符
# * 匹配零个或多个任意字符
# ** 匹配多级目录
# [abc] 匹配任何一个列在方括号中的字符
# ! 代表取反，必须先屏蔽所有，才能建立特殊不屏蔽的规则

# 可以匹配 app.js，无法匹配 js/app.js
/*.js

# 匹配 js 目录本身以及所有子文件夹和其中的文件
js/**

# 匹配 js/a/dist，js/a/b/dist 等
js/**/dist

# 屏蔽除了根目录下所有 README.md
README.md
!/README.md
```

# git config

```sh
# 初始化 git 仓库
git init

# 显示中文
git config --global core.quotepath false

# 全局
git config --global user.name 'Chenng'
git config --global user.email 'ringcrl@foxmail.com'

# 单个项目
git config user.name 'Chenng'
git config user.email 'ringcrl@foxmail.com'

# 无法连接的时候设置代理
git config http.proxy "127.0.0.1:1081"
git config https.proxy "127.0.0.1:1081"

# 编辑仓库
git config -e

# 编辑全局
git config --global -e
```

# git diff

## 对比两个分支

VSCode

- PEPOSITORIES：右键 => Select for Compare
- COMPARE：单击选择分支

## 两个 commit 间的文件变化

```sh
git diff --stat <commit-ish> <commit-ish>
```

# git log

```sh
# 查看文件修改记录
git log --stat
```

# git submodule

 是工作目录中的一个子目录，但 Git 还是会将它视作一个子模块。当你不在那个目录中时，Git 并不会跟踪它的内容， 而是将它看作子模块仓库中的某个具体的提交

## 添加 submodule

```sh
git submodule add <repository_url> <path_to_directory>
```

## 子模块切换分支

```sh
git submodule foreach git checkout master
```

## 初始化

```sh
# clone 的时候初始化
git clone --recurse-submodules <repository_url>

# clone 后初始化
git submodule update --init
# 等价于下面两行
git submodule init # 用来初始化本地配置文件
git submodule update # 则从该项目中抓取所有数据并检出父项目中列出的合适的提交
```

## 删除子模块

```sh
git ls-files --stage | grep 160000
git rm --cached <file_name>

# 删除 .gitmodules 条目
# 删除 .git/config 中关于 submodule 条目
# 删除 .git/modules/ 目录下对应的 submodule 文件夹目录
# git rm --cached <modulename>
# 删除 submodules 文件夹内容


# --------------

git submodule deinit <module_name>
git rm --cached <module_name>
```

## 修改子模块

```sh
# 修改 .gitmodules 里面的属性
git submodule sync # 同步 .gitmodules 配置到 .git/config
```

## 子模块更新

```sh
git submodule sync --recursive # 将新的URL复制到本地配置中

git submodule update --init --recursive # 从新URL更新子模块
```

## 解决 submodule 冲突

http://coderec.cn/2016/02/27/%E8%A7%A3%E5%86%B3%E7%94%B1Git-Submodule%E5%BC%95%E8%B5%B7%E7%9A%84merge%E5%86%B2%E7%AA%81%E9%97%AE%E9%A2%98/

```sh
git submodule foreach git checkout master # 所有子工程切换到 master 分支
git submodule foreach git pull # 所有子工程更新代码
git add <所有子工程目录>
git commit -m "update submodule" # 这里的提交应该是更新 commit id
# 使其保持最新，与 master 相同
```

# git clone

```sh
# 重命名
git clone https://github.com/sferik/sign-in-with-twitter.git 'signin'

# 只克隆一层
git clone https://github.com/ringcrl/FFmpeg.git --depth=1
```

# git tag

```sh
# 查看分支下所有 tag
git tag

# 打 tag
git tag v0.7.0

# 将 tag 推送到远程
git push origin --tags # 将本地所有标签一次性提交到 git 服务器
git push origin v0.7.0 # 将 v0.7.0 标签提交到 git 服务器

# 拉取远程 tag
git fetch origin  --tags

# 给指定 commit 打 tag
git log # 查看 commit
git tag -a v0.7.0 9fbc3d0 # 给指定 commit 打标签

# 删除 tag
git tag -d v0.7.0

# 删除远程 tag
git tag -d <tagname>
git push origin :refs/tags/<tagname>

# 移动 tag 位置
git tag -f v0.3.1
git push -f --tags
```

# git remote 

## 删除 remote 分支

git push origin :branch_name

## 添加/删除 remote 仓库

```sh
# 删除 remote 仓库
git remote remove origin

# 添加 remote 仓库
git remote add origin https://github.com/ringcrl/personal_firekylin.git
git remote add upstream https://github.com/firekylin/firekylin.git
```

## remote dev 推 master

git push origin dev:master

## 本地分支推到远端

```sh
git push --set-upstream origin master
```

# git commit

## commit 合并

https://github.com/Jisuanke/tech-exp/issues/13

```sh
# 找到【需要合并的 commit 】前的一个 hash
git rebase -i 5d39ff2
# 将想要忽略的 commit 前面的 pick 换成 s
pick asdfg xxx
s qwert xxx
```

## 撤销 commit

VSCode: Undo last commit

```sh
# 查看提交记录
git log
# commit d306b98be7883aabe267ee6940e8d7ee40090c90
# ...

# 回到最后一次提交的上一次
git reset --hard d306b98be
# 快捷方式
git reset head~1
```

## 恢复撤销的 commit

可以把 `git reset head~1` 所导致的撤销恢复

```sh
# 列出全部操作
git reflog
# 结果
bb9de36 HEAD@{0}: reset: moving to head~1
ee4882a HEAD@{1}: commit: r3
bb9de36 HEAD@{2}: commit: r2
e6c363a HEAD@{3}: commit (initial): r1

# 回到 HEAD@{1}
git reset head@{1}
```

## 撤销部分 commit

原理是撤销整次提交，然后将 add 后文件里面不需要的移出，再次提交

```sh
# 撤销最后一次提交
git reset head~
git add .

# 在提交中移出对 file1 的更改
git reset file1
git commit -m '没有将 file1 的修改提交'
```

## 提交到上个 commit

```sh
git add .
git commit --amend
```

# git checkout

## 迁入 remote 分支

```sh
gcb master origin/master
```

## 撤销工作区文件修改

```sh
# 丢弃对 file1 的修改，checkout 有多重功能，这里的 -- 为了让 Git 知道后面的参数是文件名
git checkout -- file1

# 可以使用 . 撤销全部的修改
git checkout -- .
```

# git add

## 撤销 add

VSCode: Unstage All Changes

```sh
# 撤销某个文件
git reset HEAD -- file_path
# 简写
git reset file_path

# 撤销 gaa
git reset HEAD -- .
# 简写
git reset
```

# git fetch

## 删除无 remote 的分支

```sh
git fetch -p
```

# git branch

## 与 remote 连接/断开

```sh
# 查看链接到远程分支的情况
git branch -vv

# 断开当前链接与远程的链接
git branch --unset-upstream

# 当前 dev 分支链接远程分支
git branch --set-upstream-to=origin/dev
```

# git pull

## 允许合并不相关历史

```sh
git pull --allow-unrelated-histories
```

# git rebase

- git pull 之后提交会分叉，不好看
- git rebase 把我们本地的提交“挪动”了位置，整个提交历史就成了一条直线
- 本地的修改不再是基于之前迁出，而是相当于拉完最新代码再提交

```sh
 # --autosquash 将所有提交压缩到单个提交
git checkout <branchname>
git rebase -i --autosquash develop
```

## 合并多个本地 commit

```sh
git rebase -i

# 将不想留下的 commit 信息，pick 改成 s
```

```sh
# 合并最近3个 commit
git reset --soft HEAD~3 && git commit -m 'xxx'
```

## 修改上一个 commit

```sh
# 已提交一个 commit 并且推到了远端

# 编辑上一个 commit，pick 改为 edit
git rebase -i HEAD^

# 编辑文件
gaa

# rebase
git rebase --continue

# 重写远端记录
gp -f
```

# git cherry pick

```sh
git cherry pick 9f6c0da3aac62
```

# git reset

```sh
# commit 后发现要修改，重置最后一个 commit
git reset HEAD~
```

```sh
# 移除所有修改
git reset --hard

# 移除所有未跟踪文件
git clean -fd
```

# git reflog

```sh
# commit 后 git object 一旦创建就不可变更
git reflog # 找到某个想回到的 commit_id

git reset --hard <commit_id>
```

# git stash

```sh
# git reset --hard 是有损的无法找回的清空工作区，应该用 git stash

git stash push -u
```

# git hooks

```sh
# 查看 hooks 路径
git config core.hooksPath

# 配置 hooks 路径
git config core.hooksPath .git/hooks
```

# fork 与 PR

- fork 
- git clone

## 添加 upstream

```sh
# 查看远程分支
git remote -v
# 添加远程分支
git remote add upstream https://github.com/alibaba/freeline
# 拉取远程分支
git fetch upstream
# 合并分支
git merge upstream/master
```

## 合并到分支

别人合并分支是希望有一个干净的提交、拉取 fork 项目的最新代码，但是把自己的提交 cherry-pick 到这个分支上。最后 push 到自己的 fork 项目中，最后申请 pull request。

```sh
# 创建新分支，并指向 fork 项目的 master 分支
git checkout -b feat/ready_master upstream/master
# 切换到原有的分支中，这个分支中存储着我们修改的内容的 commit
git checkout feat/dev
# 查看 commit，copy commit
git log
# 切换回新分支
git checkout feat/ready_master
# 把提交拉取到新分支
git cherry-pick 0b0eadf36e22e6f682c852458a379b0acd93cdf2
# 查看一下分支对应情况，确保push的分支指向是对的。
git branch -vv
# 推送分支到自己 fork 的项目中
git push origin feat/ready_master
# 最后一步，打开网站，切换到最新分支，点击 New pull request，填写内容，申请就好了
```

## 删除远程分支

我们提交了之后这个分支其实就没有什么用处了。我们可以删掉这个分支：

```sh
git push origin :feat/ready_master
```

# zsh alias

```sh
# 查看分支
glola

# 拉取所有更新
gfa

# 更新子仓库
gsu

# 当前分支与远程同名分支关联
ggsup

# 查看 stash 列表
gstl

# 查看 tag
gtv
```

# 实践

## 项目代码提交情况

```sh
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

## 修正错误的邮箱提交

https://help.github.com/en/articles/changing-author-info

```sh
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="sagacheng@tencent.com"
CORRECT_NAME="ringcrl"
CORRECT_EMAIL="ringcrl@foxmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

```sh
git push --force --tags origin 'refs/heads/*'
```