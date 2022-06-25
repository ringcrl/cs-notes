<!--MySQL-summary-->

MySQL 相关知识总结。

<!--more-->

# 基础知识

## 概念

- 数据库（database）：保存有组织的数据的容器
- 表（table）：某个特定类型数据的结构化清单
- 模式（schema）：关于数据库和表的布局及特性信息
- 列（column）：表中的一个字段，所有表都是由一个或者多个列组成的
- 数据类型（datatype）：所容许的数据的类型。每个表列都有相应的数据类型，它限制（容许）该列中存储的数据
- 行(row)：行也叫数据库记录（record），表示表中的一个记录
- 主键（primary key）：一列，其值能够唯一区分表中的每个行
    - 任何列都可以作为主键
    - 任意两行不具有相同的主键值
    - 每个行都必须具有一个主键值（不允许为 null 值）

## 功能划分

- DDL（Data Definition Language）：定义数据库、数据表和列
- DML（Data Manipulation Language）：增删改数据表
- DCL（Data Control Language）：定义访问权限与安全级别
- DQL（Data Qeury Language）：查询数据表数据

## 命名约定

- SELECT、FROM、WHERE 常用的 SQL 保留字大写
- 表名、数据表字段下划线小写

## 数据表约束

- 主键约束：UNIQUE + NOT NULL，一个表主键只能有一个
- 外键约束：确保表与表之间完整性，一个表外键对应另一个表主键，例如某个表 `player_score` 设置 `player_id` 为外键，关联到 `player` 表的主键
- 字段约束：UNIQUE、NOT NULL、DEFAULT、CHECK

## 数据表设计原则

- 数据表个数越少越好
- 数据表字段个数越少越好
- 数据表中联合主键字段个数越少越好
- 使用主键和外键越多越好

## 数据类型

### 串数据类型

| 数据类型   | 说明                                             |
| :--------: | :----------------------------------------------: |
| CHAR       | 1~255个字符的定长串。它的长度必须在创建时指定    |
| ENUM       | 接受最多64 K个串组成的一个预定义集合的某个串     |
| LONGTEXT   | 与TEXT相同，但最大长度为4 GB                     |
| MEDIUMTEXT | 与TEXT相同，但最大长度为16 K                     |
| SET        | 接受最多64个串组成的一个预定义集合的零个或多个串 |
| TEXT       | 最大长度为64 K的变长文本                         |
| TINYTEXT   | 与TEXT相同，但最大长度为255字节                  |
| VARCHAR    | 长度可变，最多不超过255字节。                    |


当数值不是数值时 你可能会认为电话号码和邮政编码应该 存储在数值字段中(数值字段只存储数值数据)，但是，这样 做却是不可取的。如果在数值字段中存储邮政编码01234，则 保存的将是数值1234，实际上丢失了一位数字。

### 数值数据类型

| 数据类型  | 说明                          |
| :-------: | :---------------------------: |
| BIT       | 位字段，1~64位。              |
| BIGINT    | 整数值，UNSIGNED              |
| BOOLEAN   | 布尔标志，或者为 0 或者为 1   |
| DECIMAL   | 精度可变的浮点值              |
| DOUBLE    | 双精度浮点值                  |
| FLOAT     | 单精度浮点值                  |
| INT       | 整数值，UNSIGNED 0~4294967295 |
| MEDIUMINT | 整数值，UNSIGNED 0~ 16777215  |
| SMALLINT  | 整数值，UNSIGNED 0~65535      |
| TINYINT   | 整数值，UNSIGNED 0~255        |

### 日期和时间数据类型

| 数据类型  | 说明                           |
| :-------: | :----------------------------: |
| DATE      | YYYY-MM-DD                     |
| DATETIME  | DATE和TIME的组合               |
| TIMESTAMP | 功能和DATETIME相同(但范围较小) |
| TIME      | HH:MM:SS                       |
| YEAR      | 范围是1901年~2155年            |

### 二进制数据类型

| 数据类型   | 说明              |
| :--------: | :---------------: |
| BLOB       | 最大长度为64 KB   |
| MEDIUMBLOB | 最大长度为16 MB   |
| LONGBLOB   | 最大长度为4 GB    |
| TINYBLOB   | 最大长度为255字节 |

# 基本操作

## 安装

### Mac

https://stackoverflow.com/questions/4359131/brew-install-mysql-on-macos

```sh
brew install mysql@5.7

# 添加密码
mysql_secure_installation

# If you need to have mysql@5.7 first in your PATH run:
echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

# For compilers to find mysql@5.7 you may need to set:
export LDFLAGS="-L/usr/local/opt/mysql@5.7/lib"
export CPPFLAGS="-I/usr/local/opt/mysql@5.7/include"

# To have launchd start mysql@5.7 now and restart at login
brew services start mysql@5.7
```

## 登录

```sh
# 本地登录
mysql -u root -p # 需要密码 l1
mysql -u root # 无需密码

# 登录远端
mysql -h [ip] -u root -p -P 3306
```

## 修改密码

```sh
# 关闭简单密码校验

# 查看当前密码校验情况
mysql > SHOW VARIABLES LIKE 'validate_password%';


mysql> set global validate_password.policy=0; # 0 1 2 | LOW MEDIUM STRONG
mysql> set global validate_password.mixed_case_count=0; # 至少要包含的小写字母个数和大写字母个数
mysql> set global validate_password.number_count=3; # 至少要包含的数字个数
mysql> set global validate_password.special_char_count=0; # 至少要包含的特殊字符数
mysql> set global validate_password.length=3; # 密码最小长度，参数默认为 8
```

```sh
# 修改新密码
mysql> show databases;
mysql> use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
```

## 用户操作

```sql
-- 操作后刷新权限
flush privileges;

-- 新增用户
CREATE USER 'chenng'@'localhost' IDENTIFIED BY 'password';

-- 删除用户
DELETE FROM mysql.user WHERE Host='localhost' AND User='chenng';

-- 给用户添加权限
GRANT ALL ON *.* TO 'chenng'@'localhost';
```

## 库操作

```sql
-- 查看数据库
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE db_name;

-- 删除数据库
DROP DATABASE db_name;

-- 使用数据库
USE db_name;

-- 查看当前使用的数据库
SELECT DATABASE();
```

## 表操作

### 查看表

```sql
-- 查看所有数据库表
SHOW TABLES;

-- 查看表结构
DESC table_name
```

### 创建表

```sql
-- 建表语句
CREATE TABLE cb_table(
  cb_id int NOT NULL AUTO_INCREMENT,
  cb_data CHAR(255) NOT NULL,
  cb_time timestamp NOT NULL,
  PRIMARY KEY (cb_id)
) ENGINE=InnoDB;

-- 联合主键
CREATE TABLE t_wsfe_data_monitor (
  imp_date date NOT NULL,
  ftask_id varchar(64) NOT NULL,
  fkey varchar(128) NOT NULL,
  fvalue varchar(128) NOT NULL,
  etl_stamp varchar(200) NOT NULL,
  
  PRIMARY KEY (imp_date, fkey)
) ENGINE=InnoDB;
```

### 更新表

```sql
-- 添加表字段
ALTER TABLE player ADD (
	age int(11)
);

-- 删除表字段
ALTER TABLE player DROP COLUMN age;

-- 修改表字段
ALTER TABLE player MODIFY age float(3,1);
```

### 删除表

```sql
DROP TABLE cb_table;
```

### 重命名表

```sql
RENAME TABLE cb_table TO cb_table_new;
```

## 配置

```sql
-- 查看查询性能开关情况
select @@profiling;

-- 打开查询性能
set profiling=1;
```

# 增删改查

数据：
https://github.com/cystanford/sql_heros_data
https://github.com/cystanford/sql_nba_data

## 检索数据

### 子句顺序

- SELECT：要返回的列
- FROM：检索数据的表
- WHERE：行级过滤
- GROUP BY：分组说明
- HAVING：组级过滤
- ORDER BY：输出排序顺序
- LIMIT：要检索的行数

### 检索列

```sql
-- 单列
SELECT name FROM heros;

-- 多列
SELECT name, hp_max, mp_max, attack_max, defense_max FROM heros;
```

### 虚构字段

```sql
SELECT '王者荣耀' as platform, name FROM heros;
```

### 返回不重复

```sql
SELECT DISTINCT attack_range FROM heros;
```

### 限制返回

```sql
SELECT name, hp_max FROM heros ORDER BY hp_max DESC LIMIT 5;

SELECT name, hp_max FROM heros ORDER BY hp_max DESC LIMIT 5,5;
```

### 升降序排序

```sql
-- 升序
SELECT name, hp_max FROM heros ORDER BY hp_max DESC;

-- 降序
SELECT name, hp_max FROM heros ORDER BY hp_max DESC;

-- 多条件排序
SELECT name, mp_max, hp_max FROM heros ORDER BY mp_max DESC, hp_max DESC;
```

### 过滤数据

| 符号      | 含义           |
| :-------: | :------------: |
| =         | 等于           |
| !=        | 不等于         |
| <         | 小于           |
| <=        | 小于等于       |
| >         | 大于           |
| >=        | 大于等于       |
| IN (a, b) | 多个 = 时候    |
| BETWEEN   | 介于之间       |
| IS NULL   | 空值检查       |
| AND       | 与操作         |
| OR        | 或操作         |
| NOT       | 否定操作       |
| %         | 0或多字 通配符 |
| _         | 1字 通配符     |
| REGEXP    | 正则表达式     |

```sql
-- 区间过滤
SELECT name, hp_max FROM heros WHERE hp_max > 6000;
SELECT name, hp_max FROM heros WHERE hp_max BETWEEN 5399 AND 6811;

-- 空值检查
SELECT name, role_assist FROM heros WHERE role_assist IS NULL;

-- 与操作
SELECT name, hp_max, mp_max FROM heros 
WHERE hp_max > 6000 AND mp_max > 1700
ORDER BY (hp_max+mp_max) DESC;

-- 通配符
-- %：0 个或多个字符
-- _：1 个字符
SELECT name FROM heros WHERE name LIKE '%太%';

-- 正则表达式
SELECT name FROM heros WHERE name REGEXP '^东';

-- 综合过滤
SELECT name, role_main, role_assist, hp_max, mp_max, birthdate
FROM heros 
WHERE (role_main IN ('法师', '射手') OR role_assist IN ('法师', '射手')) 
AND DATE(birthdate) NOT BETWEEN '2016-01-01' AND '2017-01-01'
ORDER BY (hp_max + mp_max) DESC;
```

### SQL 函数

- 算数函数
    - ABS()：取绝对值
    - MOD()：取余
    - ROUND()：四舍五入到指定小数位，`SELECT ROUND(37.25, 1)`
- 字符串函数
    - CONCAT()：多个字符串拼接，`SELECT CONCAT('abc', 123)`
    - LENGTH()：字段长度，汉字算三个字符、数组和字母算一个字符
    - CHAR_LENGTH()：字段长度，汉字、数字、字母算一个字符
    - LOWER()：转化为小写，`SELECT LOWER('ABC')`
    - UPPER()：转化为大写
    - REPLACE()：替换字符
    - SUBSTRING()：截取字符串
- 日期函数
    - CURRENT_DATE()：系统当前日期，2019-10-05
    - CURRENT_TIME()：系统当前时间，12:15:22
    - CURRENT_TIMESTAMP()：日期+时间，2019-10-05 12:16:01
    - EXTRACT()：抽取具体的年月日，`EXTRACT(YEAR FROM birthdate)`
    - DATE()：返回时间的日期部分
- 聚集函数
    - COUNT()：总行数
    - MAX()：最大值
    - MIN()：最小值
    - SUM()：求和
    - AVG()：平均值

```sql
-- 数据处理
SELECT name, ROUND(attack_growth,1) FROM heros;

-- 取最大值
SELECT MAX(hp_max) FROM heros;

-- 获取最大值的信息，需要分两步
SELECT name, hp_max FROM heros
WHERE hp_max = (SELECT MAX(hp_max) FROM heros)

-- 抽取年份
SELECT name, EXTRACT(YEAR FROM birthdate) AS birthdate
FROM heros WHERE birthdate is NOT NULL
ORDER BY birthdate DESC;

-- 使用 DATE 格式化数据
SELECT * FROM heros WHERE DATE(birthdate)>'2016-10-01'

-- 算数函数
SELECT AVG(hp_max), AVG(mp_max), MAX(attack_max) FROM heros
WHERE DATE(birthdate)>'2016-10-01'

-- 计算总数
SELECT COUNT(*) FROM heros WHERE hp_max > 6000;

-- 分组统计
SELECT COUNT(*), role_main FROM heros GROUP BY role_main;
```

### 过滤分组

- 如果分组中具有 NULL 值，NULL 作为一个分组返回
- GROUP BY 必须出现在 WHERE 子句之后，ORDER BY 子句之前
- 过滤分组使用 HAVING 子句，HAVING 语法和 WHERE 一样
- WHERE 过滤行，HAVING 过滤分组
- WHERE 在分组前进行过滤，HAVING 在分组后进行过滤

```sql
SELECT COUNT(*) as num, role_main, role_assist FROM heros
GROUP BY role_main, role_assist
HAVING num > 5 ORDER BY num DESC;
```

### 子查询

- 有时候无法从数据表中得到查询结果，需要从查询结果集中再次查询
- 子查询更容易理解查询的过程
- 子查询不依赖外部表，输出作为输入叫做非关联子查询
- 子查询依赖外部表，每执行一次外部查询就要重新计算一次，称为关联子查询

```sql
SELECT player_name, height, team_id FROM player AS a
WHERE height > (SELECT avg(height) FROM player AS b
WHERE a.team_id = b.team_id)

```

### 集合比较子查询

- IN：判断是否在集合中
- ANY：需要与比较操作符一起使用，与子查询返回的任何值作比较
- ALL：需要与比较操作符一起使用，与子查询返回的所有值作比较

```sql
SELECT player_id, player_name, height FROM player
WHERE height > ALL (SELECT height FROM player WHERE team_id = 1002)
```

### 表连接

- 笛卡尔积：表1有X数据，表2有Y数据，同时查询两表就有X*Y个数据
- 等值连接：两张表都存在的列进行连接
- 非等值连接：多个表的连接条件不是等号的连接
- 自连接：可以对多表操作，也可以对同一个表操作

```sql
-- 笛卡尔积
SELECT * FROM player, team

-- 等值连接
SELECT player_id, player.team_id, player_name, height, team_name
FROM player, team
WHERE player.team_id = team.team_id;

-- 非等值连接
SELECT p.player_name, p.height, h.height_level
FROM player AS p, height_grades AS h
WHERE p.height BETWEEN h.height_lowest AND h.height_highest

-- 自连接
SELECT b.player_name, b.height FROM player as a , player as b
WHERE a.player_name = '布雷克-格里芬' and a.height < b.height
-- 不用自连接需要进行两次 SQL 查询
SELECT height FROM player WHERE player_name = '布雷克-格里芬'
SELECT player_name, height FROM player WHERE height > 2.08
```

## 插入数据

INSERT 操作可以忽略的列

- 该列定义为允许 NULL 值
- 在表定义中给出了默认值

```sql
-- 插入单条
INSERT INTO cb_table(
  cb_data,
  cb_time
)
VALUES(
  '剪切板内容',
  '2018/11/24 13:53:29'
);

-- 插入多条
INSERT INTO cb_table(
  cb_data,
  cb_time
)
VALUES
  ('内容一', '2018/11/24 13:53:29'),
  ('内容二', '2018/11/24 13:54:29');

-- 没有则插入，有则替换
REPLACE into t_table (
  ftask_id,
  fkey,
  fvalue
)
values ('ftask_id', 'fkey', 'fvalue')
```

## 更新数据

```sql
-- 更新单个内容
UPDATE cb_table
SET cb_data = '新的剪切板内容'
WHERE cb_id = 1;

-- 更新多个内容
UPDATE cb_table
SET cb_data = '新的剪切板内容',
    cb_time = '2018/11/24 14:00:00'
WHERE cb_id = 1;

-- 删除某列的值
UPDATE cb_table
SET cb_data = NULL
WHERE cb_id = 1;
```

## 删除数据

**使用 UPDATE 和 DELETE 之前，使用 SELECT 进行测试**

### 删除行

```sql
DELETE FROM cb_table
WHERE cb_id = 1;
```

### 删除表中所有数据

```sql
TRUNCATE TABLE cb_table;
```

## 事务管理

事务处理可以用来维护数据库的完整性，它保证成批的 MySQL 操作要么完全执行，要么完全不执行。

- 事务（transaction）：一组 SQL 语句
- 回退（rollback）：撤销指定 SQL 语句的过程
- 提交（commit）：将未存储的 SQL 语句结果写入数据库表
- 保留点（savepoint）：事务处理中设置的临时占位符，可以对它发布回退

```sql
START TRANSCATION;
DELETE FROM orderitems WHERE order_num = 20010;
DELETE FROM orders WHERE order_num = 20010;
COMMIT;
```

# 实践与优化

## 读写分离延迟

阿里云的RDS（mysql） 部分数据库启用了读写分离，由于主从同步延迟的问题，可能会出现读取不到数据的问题，所以对于实时性比较高的业务，使用强制读主库的操作：在sql语句前增加 `/*FORCE_MASTER*/` 注释 强制读主库

## 优化逻辑查询

```sql
-- 查询评论内容开头为 abc 的内容
SELECT comment_id, comment_text, comment_time FROM product_comment
WHERE SUBSTRING(comment_text, 1,3)='abc'

-- 用查询重写进行替换，执行时间为前者 1/10
SELECT comment_id, comment_text, comment_time FROM product_comment
WHERE comment_text LIKE 'abc%'
```

## 创建索引场景

- 字段的值有唯一性限制，可以创建【唯一性索引】或【主键索引】
- 频繁作为 WHERE 查询条件的字段
- 经常需要用到 GROUP BY 和 ORDER BY 的列
- DISTINCT 字段需要创建索引
- WHERE 字句，OR 前面的条件创建了索引，OR 后面的条件没有创建索引，索引会失效