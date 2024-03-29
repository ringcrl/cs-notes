# 开始

## 安装

```sh
# pyenv 安装：https://github.com/pyenv/pyenv-installer

# ~/.zshrc
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# 查看所有版本
pyenv versions

# 安装 python
pyenv install 3.9.4

# 全局设置版本
pyenv global 3.9.4

# 编辑当前 shell 使用的 python 版本：3.9.4
vim ~/.python-version
```

## requirements.txt 项目依赖

```sh
# 安装依赖项
pip install -r requirements.txt
```

```sh
# 项目依赖
pip install pipreqs
pipreqs ./ # 在项目根目录执行
```

```sh
# 导出全局依赖
pip freeze > requirements.txt
```

## 运行

```sh
# 前台运行
python xxx.py

# 后台运行不打印日志
nohup python -u xxx.py >/dev/null 2>&1 &
# 后台运行打印日志
nohup python -u xxx.py &
# 查看 nohup 日志
tail -fn 50 nohup.out
# 查看关闭后台进程
ps aux | head -1 # 显示标题
ps aux | grep xxx.py
# USER PID ...
kill <pid>
```

## 工具

```sh
# 查找无用代码
https://github.com/jendrikseipp/vulture
```

# 语法

## 类型与运算

```py
# 判断类型字符串
print(isinstance('string', str)) # True

# 判断类型函数
def get_type(x):
    {str:"str", float:"float", int:"int", bool: 'bool'}.get(type(x))

# 产生整数的分割
x = 15
y = 4
print(x // y) # 3

x = True
y = False
print(x and y) # False
print(x or y) # True
print(not x) # False
```

## int 数字

数字操作：https://www.runoob.com/python/python-numbers.html

```py
# 二进制转十进制
print(int('1001001', 2)) # 73

# 保留小数
print(round(2.3333, 2)) # 2.33
```

## time 时间函数

```py
import time

# 时间戳
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

## import 模块

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

## str 字符串

```py
str = '123'

# 字符串截取
str[1:-1] # 移除字符串首尾字符

# 字符串反转
str[::-1]

# 字符串转数字
int(str)

# 字符串分割
'a|b'.split('|') # ['a', 'b']

# 字符串以xx开头
'abc'.startswith('a') # True
```

## list 列表

```py
# 截取
a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
print('First four: ', a[:4]) # First four:  ['a', 'b', 'c', 'd']
print('Last four:  ', a[-4:]) # Last four:   ['e', 'f', 'g', 'h']
print('Middle two: ', a[3:-3]) # Middle two:  ['d', 'e']

# 添加元素
a = []
a.append('a')

# 遍历
for item in data_list: # 不需要 index
    pass
for index, item in enumerate(data_list): # 需要 index
    pass

# 推导式
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x**2 for x in a]
print(squares) # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# range 生成 [1, 2, 3, ..., n]
print(range(1, n+1))

# 数组合并
print([1, 2, 3] + [4]) # [1, 2, 3, 4]

# filter
numbers = [1, 2, 3, 4, 5, 6]
print([x for x in numbers if x > 3]) # [4, 5, 6]

# 判断元素是否存在
'gold' in ['stone', 'stone', 'gold'] # True

# 合并、去重、排序两个数组
def merge_arrays(arr1, arr2):
    return sorted(set(arr1 + arr2))
```

## for 循环

```py
fruits = ['banana', 'apple',  'mango']

# 无 index
for fruit in fruits:
    print f'当前水果 : {fruits[index]}'

# 带 index 1
for index, fruit in enumerate(fruits):
    print f'当前水果 : {fruits[index]}'

# 带 index 2

for index in range(len(fruits)):
   print f'当前水果 : {fruits[index]}'
```

## dict 字典

```py
# 取值并兜底
res = stock.get('merch', 0) # 若 stock 没有 key: merch，则返回 0

# 遍历
var_map = { 'key1': 1, 'key2': 2, 'key3': 3 }
for item in var_map.items():
    print(item[0]) # 'key1'
    print(item[1]) # 1

# 推导式
chile_ranks = {'ghost': 1, 'habanero': 2, 'cayenne': 3}
rank_dict = {rank: name for name, rank in chile_ranks.items()}
chile_len_set = {len(name) for name in rank_dict.values()}
print(rank_dict) # {1: 'ghost', 2: 'habanero', 3: 'cayenne'}
print(chile_len_set) # {8, 5, 7}

# 反向字典
freq_map = {
    "1min": "1分钟",
    "5min": "5分钟",
    "15min": "15分钟",
    "30min": "30分钟",
    "60min": "60分钟",
    "D": "日线",
    "W": "周线",
    "M": "月线",
}
freq_inv = {v: k for k, v in freq_map.items()}
print(freq_inv)
# {'1分钟': '1min', '5分钟': '5min', '15分钟': '15min', '30分钟': '30min',
#     '60分钟': '60min', '日线': 'D', '周线': 'W', '月线': 'M'}
```

## enum 枚举

```py
from enum import Enum

class Mark(Enum):
    D = "底分型"
    G = "顶分型"

print(Mark.D.value) # 底分型
```

## zip 并行遍历

```py
names = ['Cecilia', 'Lise', 'Marie']
letters = [len(n) for n in names]

longest_name = None
max_letters = 0

for name, count in zip(names, letters):
    if count > max_letters:
        longest_name = name
        max_letters = count
```

## codecs 读文件

```py
import json
import codecs

with codecs.open(file_path, 'r', 'utf-8') as f:
    print json.loads(f.read())
```

## sys 运行时参数

```py
# python read_path.py json_path
import sys

# sys.argv[0] == 'read_path.py'
JSON_PATH = sys.argv[1]
```

## requests 下载文件

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

## generators 迭代函数

```py
# 比起直接声明一个 list append 更好：代码更精简、更节约内存
address = 'Four score and seven years ago...'
def index_words_iter(text):
    if text:
        yield 0
    for index, letter in enumerate(text):
        if letter == ' ':
            yield index + 1

result = list(index_words(address))
print(result) # [0, 5, 11, 15, 21, 27]
```

```py
def parse_result(items):
    for item in items:
        yield {
            'range': item[0],
            'iamge': item[1],
            'title': item[2],
            'recommend': item[3],
            'author': item[4],
            'times': item[5],
            'price': item[6]
        }

new_items = parse_result(items)
```

## Beautiful Soup

https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/

```sh
pip install BeautifulSoup
pip install lxml
```

```py
from bs4 import BeautifulSoup
import requests


html_doc = requests.get(
    'http://bang.dangdang.com/books/fivestars/01.00.00.00.00.00-recent30-0-0-1-1').text

soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.select('.bang_list_mode > li'))
```

## threading.Thread 多线程

```py
# encoding = utf-8

import threading
import time


# 创建一个线程子类
class MyThread(threading.Thread):
    def __init__(self, threadID, name, gap):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.gap = gap

    def run(self):
        print("开始线程：" + self.name)
        moyu_time(threadName=self.name, delay=self.gap, counter=10)
        print("退出线程：" + self.name)


def moyu_time(threadName, delay, counter):
    while counter:
        time.sleep(delay)
        print("%s 开始报时 %s" % (threadName, time.strftime(
            "%Y-%m-%d %H:%M:%S", time.localtime())))
        counter -= 1


# 创建新线程
thread1 = MyThread(threadID=1, name="Ring", gap=1)
thread2 = MyThread(threadID=2, name="Chenng", gap=2)

# 开启新线程
thread1.start()
thread2.start()
# 等待至线程中止
thread1.join()
thread2.join()
print("退出主线程")
```

## Queue 线程池

```py

import threading
import time
from queue import Queue


class CustomThread(threading.Thread):
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.__queue = queue

    def run(self):
        while True:
            q_method = self.__queue.get()
            q_method()
            self.__queue.task_done()


def alert():
    print("开始报时 %s" % (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))


def queue_pool():
    queue = Queue(5)
    for i in range(queue.maxsize):
        t = CustomThread(queue)
        t.setDaemon(True)
        t.start()

    for i in range(20):
        queue.put(alert)
    queue.join()


if __name__ == '__main__':
    queue_pool()
```

## flask web 框架

https://dormousehole.readthedocs.io/en/latest/

```py
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/hello_world')
def hello_world():
    print(request.headers)
    return "hello_world"


if __name__ == "__main__":
    app.run(debug=False)
```

## selenium 操作浏览器

```py
import time
from selenium import webdriver

# Optional argument, if not specified will search path.
driver = webdriver.Chrome(
    '/Users/ringcrl/Documents/sdk/chromedriver/chromedriver')
driver.get('http://www.google.com/')
time.sleep(5)  # Let the user actually see something!
search_box = driver.find_element_by_name('q')
search_box.send_keys('ChromeDriver')
search_box.submit()
time.sleep(5)  # Let the user actually see something!
driver.quit()
```

## csv

```py
import csv

# csv.reader
with open('eggs.csv', newline='') as csvfile:
     spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
     for row in spamreader:
         print(', '.join(row))
```

## pandas 存储 csv 文件

```py
# 写文件
import pandas as pd

b = ['Ring', 'Chenng']
c = ['18岁', '19岁']
d = ['170cm', '180cm']

df = pd.DataFrame({'姓名' : b, '年纪' : c, '身高' : d})
df.to_csv("xsb.csv", index=False, sep=',')
```

```py
# 读文件
import pandas

test_csv = pandas.read_csv('test.csv')

print(test_csv)
```

## pymysql 连接数据库

```sh
mysql -u root -p
```

```sql
-- 建库
create database if not exists idol;

-- 建表
create table person (
    name char(20) not null,
    age int
)

-- 查看表
use idol;
show full columns from person;

-- 查看数据
select * from person;
```

```py
import pymysql

# 使用 connect 方法，传入数据库地址，账号密码，数据库名就可以得到你的数据库对象
db = pymysql.connect(
    "localhost",
    "root",
    "password",
    "idol"
)

# 获取 cursor 来操作 idol 数据库
cursor = db.cursor()

# 插入一条记录
sql = """
  insert into person(name, age) values ('Ring', 18)
"""

try:
    cursor.execute(sql)
    # 调用 commit 才会执行
    db.commit()
except:
    # 回滚保证事务一致性
    db.rollback()

# 关闭这个数据库的连接
db.close()
```

## mitmproxy 网络控制

https://mitmproxy.org/

https://juejin.im/post/5ac9ea6d518825364001b5b9

### 安装

```sh
# 安装
pip install mitmproxy

# 启动，开启端口监听
mitmweb

# 手机 wifi 设置代理
# mitm.it 安装证书
```

### 脚本

```sh
mitmdump -s test.py
```

```py
# test.py
import requests

location = '/home/wistbean/douyin/'
num = 0


def response(flow):
    global num
    path = 'ixigua'

    # 判断请求 url 是否包含音视频
    if path in flow.request.url:
        filename = location + str(num) + '.mp4'
        res = requests.get(flow.request.url)

        # 下载视频
        with open(filename, 'ab') as f:
            f.write(res.content)
            f.flush()
            num += 1
```

## path 路径

```py
from os import path

# 文件运行目录绝对路径
# __file__：/Users/ringcrl/test.py
dir_path = path.dirname(__file__) # /Users/ringcrl

# /Users/ringcrl/txt_file.txt
txt_file_path = path.join(dir_path, 'txt_file.txt')

# 定位相对路径文件
logfile_path = path.abspath(path.join(dir_path, '../log/main.log'))

# 删除整个目录
import shutil
shutil.rmtree(dir_path)
```

## sys 添加模块查找路径

```py
curr_dir = path.dirname(__file__)
root_dir = path.abspath(path.join(curr_dir, '..'))

# 添加上级目录文件查找路径，后面可以进行 import
sys.path.append(root_dir)

import logger
```

## logging 封装

```py
import logging
from os import path

curr_dir = path.dirname(__file__)
logfile_path = path.abspath(path.join(curr_dir, './log/scheduler.log'))

logging.basicConfig(
    filename=logfile_path,
    level=logging.DEBUG,
    format='%(levelname)s %(module)s %(asctime)s %(message)s',
    datefmt='%Y/%m/%d %H:%M:%S'
)

# 禁用 requests、apscheduler 的 log
logging.getLogger('urllib3').setLevel(logging.WARNING)
logging.getLogger('apscheduler').setLevel(logging.WARNING)

def error(msg):
    logging.error(msg)

def info(msg):
    logging.info(msg)
    pass

def debug(msg):
    logging.debug(msg)

if __name__ == "__main__":
    logging.debug('test')
```

## try except

https://docs.python.org/zh-cn/3/tutorial/errors.html

```python
# 捕获所有异常
try:
    # ...
except:
    # ...

# 跳过某些异常
try:
    # ...
except (RuntimeError, TypeError, NameError):
    pass

# 可选字句 else
# 对于在 try 子句不引发异常时必须执行的代码来说很有用
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except OSError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()
```

## re 正则

```python
import re

# 匹配数字
num = int(re.findall(r"\d+", searchText)[0])

# 多个重复字符替换为一个
source = '|||as|aaa|'
res = re.sub(r'(\|)(\1+)', '|', source) # '|as|aaa|'

# match 尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match()就返回 None
string = 'aerial-view-1866742.jpg'
res = re.match(r'(.+?)(-\d+.+)', string)
# res.group(0) 'aerial-view-1866742.jpg'
# res.group(1) 'aerial-view'
# res.group(2) '-1866742.jpg'

# re.search 扫描整个字符串并返回第一个成功的匹配
originUrl = 'https://xxx.com/preview/filename-small.mp4'
fileName = re.search(r'([^/]+?)-small', originUrl)
```

# 应用

## dotenv 配置环境变量

```sh
pip install -U python-dotenv
```

```sh
# .env
TENCENT_SECRET_ID=<TENCENT_SECRET_ID>
TENCENT_SECRET_KEY=<TENCENT_SECRET_KEY>
```

```py
from dotenv import load_dotenv

load_dotenv()

TENCENT_SECRET_ID = os.getenv('TENCENT_SECRET_ID')
TENCENT_SECRET_KEY = os.getenv('TENCENT_SECRET_KEY')
```

## str 与 bytes 转换

```py
# python3
def to_str(bytes_or_str):
    if isinstance(bytes_or_str, bytes):
        value = bytes_or_str.decode('utf-8')
    else:
        value = bytes_or_str
    return value  # Instance of str

print(to_str('中文')) # 中文

def to_bytes(bytes_or_str):
    if isinstance(bytes_or_str, str):
        value = bytes_or_str.encode('utf-8')
    else:
        value = bytes_or_str
    return value  # Instance of str

print(to_bytes('中文')) # b'\xe4\xb8\xad\xe6\x96\x87'
```

```py
# python2
def to_unicode(unicode_or_str):
    if isinstance(unicode_or_str, str):
        value = unicode_or_str.decode('utf-8')
    else:
        value = unicode_or_str
    return value  # Instance of unicode


def to_str(unicode_or_str):
    if isinstance(unicode_or_str):
        value = unicode_or_str.encode('utf-8')
    else:
        value = unicode_or_str
    return value  # Instance of str
```

## devtools&postman 网络请求

- chrome 的 network 找到网络请求，选择 `copy as cURL`
- Postman 选择 Import、Raw Text、粘贴
- 点击 Send 下面的 code，选择 `Python - Requests`，获取 python

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

## binary mode 读写文件

```py
with open('random.bin', 'wb') as f:
    f.write(os.urandom(10))

with open('random.bin', 'rb') as f:
    print(f.read())
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

## 单进程当当 top500

```py
# -*- coding: utf-8 -*-

import requests
import re
import json

def main(page):
    url = 'http://bang.dangdang.com/books/fivestars/01.00.00.00.00.00-recent30-0-0-1-' + \
        str(page)
    html = request_dandan(url)
    items = parse_result(html)  # 解析过滤我们想要的信息

    for item in items:
        write_item_to_file(item)


def request_dandan(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
    except requests.RequestException:
        return None


def parse_result(html):
    pattern = re.compile('<li>.*?list_num.*?(\d+).</div>.*?<img src="(.*?)".*?class="name".*?title="(.*?)">.*?class="star">.*?class="tuijian">(.*?)</span>.*?class="publisher_info">.*?target="_blank">(.*?)</a>.*?class="biaosheng">.*?<span>(.*?)</span></div>.*?<p><span\sclass="price_n">&yen;(.*?)</span>.*?</li>', re.S)
    items = re.findall(pattern, html)
    for item in items:
        yield {
            'range': item[0],
            'iamge': item[1],
            'title': item[2],
            'recommend': item[3],
            'author': item[4],
            'times': item[5],
            'price': item[6]
        }

def write_item_to_file(item):
   print('开始写入数据 ====> ' + str(item))
   with open('book.txt', 'a', encoding='UTF-8') as f:
       f.write(json.dumps(item, ensure_ascii=False) + '\n')
       f.close()

if __name__ == '__main__':
    for i in range(16):
        main(i)
```

## 多进程当当 top500

```py
# 修改调用部分
import multiprocessing

if __name__ == '__main__':
    pool = multiprocessing.Pool(multiprocessing.cpu_count())
    pool.map(main, range(16))
    pool.close()
    pool.join()
```

## 豆瓣 top250 写到 xlsx

```py
# -*- coding: utf-8 -*

import requests
from bs4 import BeautifulSoup
import xlwt

book = xlwt.Workbook(encoding='utf-8', style_compression=0)

sheet = book.add_sheet('豆瓣电影Top250', cell_overwrite_ok=True)
sheet.write(0, 0, '名称')
sheet.write(0, 1, '图片')
sheet.write(0, 2, '排名')
sheet.write(0, 3, '评分')
sheet.write(0, 4, '作者')
sheet.write(0, 5, '简介')

n = 1


def main(page):
    url = 'https://movie.douban.com/top250?start=' + str(page*25)+'&filter='
    html = request_douban(url)
    soup = BeautifulSoup(html, 'lxml')
    save_to_excel(soup)


def request_douban(url):
    headers = {
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)',
        'host': 'movie.douban.com'
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.text
    except requests.RequestException:
        return None


def save_to_excel(soup):
    list = soup.find(class_='grid_view').find_all('li')

    for item in list:
        item_name = item.find(class_='title').string
        item_img = item.find('a').find('img').get('src')
        item_index = item.find(class_='').string
        item_score = item.find(class_='rating_num').string
        item_author = item.find('p').text
        item_intr = (item.find(class_='inq') and item.find(class_='inq').string) or ''

        print('爬取电影：' + item_index + ' | ' + item_name +
              ' | ' + item_score + ' | ' + item_intr)

        global n

        sheet.write(n, 0, item_name)
        sheet.write(n, 1, item_img)
        sheet.write(n, 2, item_index)
        sheet.write(n, 3, item_score)
        sheet.write(n, 4, item_author)
        sheet.write(n, 5, item_intr)

        n = n + 1


if __name__ == '__main__':
    for i in range(0, 10):
        main(i)

    book.save(u'豆瓣最受欢迎的250部电影.xlsx')
```

## selenium 启动 chrome 爬虫

下载 chromedriver：https://chromedriver.chromium.org/downloads

```sh
pip install selenium
```

```python
from selenium import webdriver
chrome_options = webdriver.ChromeOptions()

# 添加启动参数
# option.add_argument()

# 添加扩展应用
# option.add_extension()
# option.add_encoded_extension()

# 添加实验性质的设置参数
# option.add_experimental_option()

# 设置调试器地址
# option.debugger_address()

# 添加UA
chrome_options.add_argument('user-agent="MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"')

# 指定浏览器分辨率
chrome_options.add_argument('window-size=1920x3000')

# 谷歌文档提到需要加上这个属性来规避bug
chrome_options.add_argument('--disable-gpu')

 # 隐藏滚动条, 应对一些特殊页面
chrome_options.add_argument('--hide-scrollbars')

# 不加载图片, 提升速度
chrome_options.add_argument('blink-settings=imagesEnabled=false')

# 浏览器不提供可视化页面. linux下如果系统不支持可视化不加这条会启动失败
chrome_options.add_argument('--headless')

# 以最高权限运行
chrome_options.add_argument('--no-sandbox')

# 手动指定使用的浏览器位置
chrome_options.binary_location = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

#添加crx插件
chrome_options.add_extension('d:\crx\AdBlock_v2.17.crx')

# 禁用JavaScript
chrome_options.add_argument("--disable-javascript")

# 设置开发者模式启动，该模式下webdriver属性为正常值
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])

# 禁用浏览器弹窗
prefs = {
    'profile.default_content_setting_values' :  {
        'notifications' : 2
     }
}
chrome_options.add_experimental_option('prefs', prefs)


driver = webdriver.Chrome(chrome_options=chrome_options)

def getPageSource(url):
    driver.get(url)
    time.sleep(2)
    return driver.page_source
```

## IO 操作

```py
# coding: utf-8

import pickle
import json

def save_pkl(data, file):
    with open(file, "wb") as f:
        pickle.dump(data, f)


def read_pkl(file):
    with open(file, "rb") as f:
        data = pickle.load(f)
    return data

def save_json(data, file):
    with open(file, "w", encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def read_json(file):
    with open(file, "r", encoding='utf-8') as f:
        data = json.load(f)
    return data
```

# 算法

## is_palindrome 判断回文

```py
def is_palindrome(s):
    start = 0
    end = len(s) -1
    while start < end:
        if s[start].lower() == s[end].lower():
            start += 1
            end -= 1
        else:
            return False

    return True
```

## 寻找最接近某数的平方数

```py
def nearest_sq(n):
    return round(n ** 0.5) ** 2
```

# 编码规范

## .pylintrc

```sh
pip install pylint
```

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

4 个空格

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
