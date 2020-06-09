# 开始

## 安装

pyenv 教程: https://github.com/pyenv/pyenv

```sh
# 使用代理安装
https_proxy=127.0.0.1:1081 pyenv install 2.7.16

# 全局设置版本
pyenv global 2.7.16
```

# 语法

## 时间函数

```py
import time

now = time.time()

# float: 1590752612.65
print time.time()

# str: 2020-05-29
print time.strftime('%Y-%m-%d')

# str: Fri May 29 19:42:23 2020
print time.ctime() 

# time.struct_time: time.struct_time(tm_year=2020, tm_mon=5, tm_mday=29, tm_hour=19, tm_min=45, tm_sec=6, tm_wday=4, tm_yday=150, tm_isdst=0)
print time.localtime()
print time.localtime(now)

# time.struct_time: time.struct_time(tm_year=2020, tm_mon=5, tm_mday=29, tm_hour=19, tm_min=45, tm_sec=6, tm_wday=4, tm_yday=150, tm_isdst=0)
print time.strptime('2020-05-29 19:48:00', '%Y-%m-%d %H:%M:%S')

# float: 1590752880.0
print time.mktime(time.strptime('2020-05-29 19:48:00', "%Y-%m-%d %H:%M:%S"))

import datetime

# datetime.datetime: 2020-05-29 19:54:07.696653
print datetime.datetime.now()

# datetime.datetime: 2020-05-29 00:00:00
print datetime.datetime(2020, 05, 29)

# datetime.date: 2020-05-29
print datetime.date.today()

# str: 2020-05-29 00:00:00
print datetime.date.today().strftime("%Y-%m-%d %H:%S:%M")

# datetime.datetime: 2020-05-29 00:00:00
print datetime.datetime.strptime(str(datetime.date(2020, 05, 29)), '%Y-%m-%d')

# 根据 2020-05-29 获取前一天日期 2020-05-29
# datetime.datetime: 2020-05-28 00:00:00
print datetime.datetime.strptime('2020-05-29', '%Y-%m-%d') + datetime.timedelta(days=-1)
```

## 模块

### 引入模块

模块搜索顺序：

- 当前目录
- shell 变量 PYTHONPATH 下的每个目录
- 默认路径 /usr/local/lib/python/

```py
# import
import support

support.print_func("Runoob")
```

```py
# from...import
from support import print_func
 
print_func("Runoob")
```

### 命名空间和作用域

```py
Money = 2000
def AddMoney():
  # python 假设任何在函数内赋值的变量都是局部的
  # 不加下面这行，相当于新生成局部变量
  global Money
  Money = Money + 1
 
print Money
AddMoney()
print Money
```

### 默认模块

```py
import math
 
content = dir(math) # ['__doc__', ...]
 
print math.__doc__ # 模块说明
print math.__file__ # 模块地址
print math.__name__ # 模块名字
print math.__package__ # 包名字
```

### Python 中的包

包就是文件夹，但该文件夹下必须存在 `__init__.py` 文件, 该文件的内容可以为空。`__init__.py` 用于标识当前文件夹是一个包

`package_runoob/__init__.py`

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-

if __name__ == '__main__':
    print '作为主程序运行'
else:
    print __name__ + '初始化' # package_runoob 初始化
```

文件结构

```sh
test.py
package_runoob
|-- __init__.py
|-- runoob1.py
|-- runoob2.py
```

test.py 导入函数

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
from package_runoob.runoob1 import runoob1
from package_runoob.runoob2 import runoob2
 
runoob1()
runoob2()
```

test.py 导入模块

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
from package_runoob import runoob1
from package_runoob import runoob2
 
runoob1.runoob1()
runoob2.runoob2()
```

## 列表

### 遍历

```py
# 不需要 index
for item in data_list:
    # ...

# 需要 index
for index in range(len(data_list)):
    item = data_list[index]
    # ...
```

## 读文件

```py
import json
import codecs

with codecs.open(file_path, 'r', 'utf-8') as f:
    print json.loads(f.read())
```

## 运行时参数

```py
# python read_path.py json_path
import sys

# sys.argv[0] == 'read_path.py'
JSON_PATH = sys.argv[1]
```

## 下载文件

```py
import requests
import codecs

def download_file(url, file_path):
    r = requests.get(url, allow_redirects=True)
    with codecs.open(file_path, 'wb') as f:
        for chunk in r.iter_content(chunk_size=255):
            if chunk:
                f.write(chunk)
        f.close()
```

# 实践

## 连接 mysql 类型转换

```py
def get_db_info(): 
    with codecs.open('config/password.json', 'r', 'utf-8') as f:
        return json.loads(f.read())

def connect_mdb():
    db_info = get_db_info()
    mysql = db_info['mysql']

    return pymysql.connect(
      host = mysql['host'],
      port = int(mysql['port']), # 数据类型转换
      user = mysql['user'],
      password = mysql['password'],
      database = mysql['database'],
      charset = 'utf8',
    )
```

## unicode 转中文

```py
def unicode_to_chinese(text):
    return text.encode('utf-8')
```

## 写文件 unicode 转成中文

```py
def json_data_2_file(json_data, file_path):
    with codecs.open(file_path, 'w', 'utf-8') as f:
        json_data_str = json.dumps(json_data)
        f.write(json_data_str.decode('unicode-escape')) # str.decode('unicode-escape')
        f.close()
```

## 写 json 文件时候格式化

```py
json_data_str = json.dumps(json_data, indent=2)
```

## mysql 查询结果返回字典

```py
from pymysql.cursors import DictCursor

db = connect_mdb()
cur = db.cursor(DictCursor) # 默认返回元组，加入 DictCursor 后返回字典
```

## 启动服务脚本

```py
# nohup 不会随着 shell 关闭而关闭
# -u 使得 python 不启用缓冲，log 可以立即输出
# 1是标准输出（STDOUT）的文件描述符，2是标准错误（STDERR）的文件描述符，2>&1 表示把标准错误重定向到标准输出
nohup python -u app.py > out.log 2>&1 &
```

## 批量插入处理

```py
def insert_batch(connect,sql):
    cursor = connect.cursor()
    try:
        cursor.execute(sql)
        connect.commit()
        return "success"
    except Exception as e:
        connect.rollback()
        return e
```

# 编码规范

## .pylintrc

```
[MASTER]
# Use multiple processes to speed up Pylint. Specifying 0 will auto-detect the
# number of processors available to use.
jobs=1
[MESSAGES CONTROL]
# Disable the message, report, category or checker with the given id(s).
disable=all
# Enable the message, report, category or checker with the given id(s).
enable=c-extension-no-member,
       bad-indentation,
       bad-whitespace,
       bare-except,
       broad-except,
       dangerous-default-value,
       function-redefined,
       len-as-condition,
       line-too-long,
       misplaced-future,
       missing-final-newline,
       mixed-indentation,
       mixed-line-endings,
       multiple-imports,
       multiple-statements,
       singleton-comparison,
       trailing-comma-tuple,
       trailing-newlines,
       trailing-whitespace,
       unexpected-line-ending-format,
       unused-import,
       unused-variable,
       wildcard-import,
       wrong-import-order
[FORMAT]
# Expected format of line ending, e.g. empty (any line ending), LF or CRLF.
expected-line-ending-format=LF
# Regexp for a line that is allowed to be longer than the limit.
ignore-long-lines=^\s*(# )?<?https?://\S+>?$
# Maximum number of characters on a single line.
max-line-length=120
# Maximum number of lines in a module.
max-module-lines=2000
[EXCEPTIONS]
# Exceptions that will emit a warning when being caught. Defaults to
# "BaseException, Exception".
overgeneral-exceptions=BaseException,
                       Exception
```

## 源文件编码

需要添加到每一个 python 文件的头部

```py
# -*- coding: utf-8 -*-
```

## 缩进

4个空格

```py
# 换行并增加4个额外的空格（一级缩进）
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)

# 悬挂需要增加一级缩进
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)

yes = ('y', 'Y', 'yes', 'TRUE', 'True', 'true', 'On', 'on', '1')  # 基本不再改变

kwlist = [
    'False',
    'None',
    'True',
    'and',
    'as',
    'assert',
    ...
    'yield',  # 最后一个元素也增加一个逗号 ，方便以后diff不显示此行
]

person = {
    'name': 'bob',
    'age': 12,      # 可能经常增加字段
}
```

## 操作符

```py
# 将运算符与操作数匹配，可读性高
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)
```

## 字符串替换

```py
# 变量替换
name = "chenng"
n = 100

print 'name: %(name)s; score: %(n)d' % {
    "name": name,
    "n": n,
}

print 'name: {name}; score: {n}'.format(
    name=name,
    n=n
)

print 'name: %s; score: %d' % (name, n)
```

```py
# 检查前缀后缀
if foo.startswith('bar'):
    pass
```

## 三目运算符

```py
x = a if a >= b else b
```

## None 判断

```py
if foo is not None:
    pass
```

## 列表推导式

```py
number_list = [1, 2, 3, 10, 20, 55]
odd = [i for i in number_list if i % 2 == 1]
```

## 函数

```py
# 函数参数中，不允许出现可变类型变量作为默认值
def f(x=0, y=None, z=None):
    if y is None:
        y = []
    if z is None:
        z = {}
```


## 变量

使用双下划线 `__` 来标识不需要的变量

```py
import os

path = '/tmp/python/foobar.txt'
dir_name, __, xxx = os.path.split(path)

print dir_name # /tmp/python
print __ # foobar.txt
```