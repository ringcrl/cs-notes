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

## mysql 查询结果返回字典

```py
from pymysql.cursors import DictCursor

db = connect_mdb()
cur = db.cursor(DictCursor) # 默认返回元组，加入 DictCursor 后返回字典
```