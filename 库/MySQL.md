<!--MySQL-summary-->

MySQL 相关知识总结。

<!--more-->

# 基础知识

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

不区分大小写，SELECT 和 select 是相同的，但是对 SQL 关键词使用大写，对所有的列和表名使用小写，易于代码调试。

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

## 数据库与表

```sql
-- 查看数据库
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE db_name;

-- 使用数据库
USE db_name;

-- 查看当前使用的数据库
SELECT DATABASE();

-- 查看所有数据库表
SHOW TABLES;

-- 查看表结构
DESC table_name
```

## Sequel Pro 登录

```sql
-- 修改加密规则 
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;

-- 更新用户密码 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- 刷新权限
FLUSH PRIVILEGES;
```

# 应用

## 检索数据

### 检索单个列

```sql
SELECT title
FROM fk_post;
```

### 检索多个列

```sql
SELECT title,update_time
FROM fk_post;
```

### 返回不重复的行

```sql
SELECT DISTINCT type
FROM fk_post;
```

### 限制返回数量/返回区间

```sql
SELECT title
FROM fk_post
LIMIT 10;

SELECT title
FROM fk_post
LIMIT 5,5;
```

### 升降排序检索

```sql
/* 升序 */
SELECT title, update_time
FROM fk_post
ORDER BY update_time, title;

/* 降序 */
SELECT title, update_time
FROM fk_post
ORDER BY update_time DESC, title;
```

### 过滤数据(WHERE)

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
/* 同时使用 WHERE 和 ORDER BY，ORDER BY 应该在后面 */
SELECT title, update_time
FROM fk_post
WHERE update_time BETWEEN '2018-10-1' AND '2018-11-1'
ORDER BY update_time, title;

/* 空值检查 */
SELECT *
FROM fk_user
WHERE display_name IS NULL;

/* 或操作 */
SELECT title, update_time
FROM fk_post
WHERE (update_time BETWEEN '2018-5-1' AND '2018-6-1')
OR (update_time BETWEEN '2018-10-1' AND '2018-11-1');

/* 通配符 */
SELECT title, update_time
FROM fk_post
WHERE title LIKE '%react%';

/* 正则表达式 */
SELECT title, update_time
FROM fk_post
WHERE title REGEXP 'react';
```

### 数据处理函数

TODO:

### 数据汇总

| 函数    | 说明             |
| :-----: | :--------------: |
| AVG()   | 返回某列的平均值 |
| COUNT() | 返回某列的行数   |
| MAX()   | 返回某列的最大值 |
| MIN()   | 返回某列的最小值 |
| SUM()   | 返回某列值之和   |

```sql
/* 返回总数 */
SELECT COUNT(*) AS post_num
FROM fk_post;

/* 带有限制范围的总数 */
SELECT COUNT(*) AS post_num
FROM fk_post
WHERE update_time BETWEEN '2018-10-1' AND '2018-11-1';
```

### 分组数据

```sql
SELECT type, COUNT(*) as post_count
FROM fk_post
GROUP BY type;
```

- 如果分组中具有 NULL 值，NULL 作为一个分组返回
- GROUP BY 必须出现在 WHERE 子句之后，ORDER BY 子句之前

#### 过滤分组

过滤分组使用 HAVING 子句，HAVING 语法和 WHERE 一样，唯一的差别是 WHERE 过滤行，HAVING 过滤分组。

WHERE 在分组前进行过滤，HAVING 在分组后进行过滤。

```sql
SELECT cust_id, COUNT(*) AS orders
FROM orders
GROUP BY cust_id
HAVING COUNT(*) >= 2;
```

### SELECT 子句顺序

| 子句     | 说明         | 是否必须                 |
| :------: | :----------: | :----------------------: |
| SELECT   | 要返回的列   | 是                       |
| FROM     | 检索数据的表 | 仅在从表中选择数据时使用 |
| WHERE    | 行级过滤     | 否                       |
| GROUP BY | 分组说明     | 仅在按组计算时使用       |
| HAVING   | 组级过滤     | 否                       |
| ORDER BY | 输出排序顺序 | 否                       |
| LIMIT    | 要检索的行数 | 否                       |

### 子查询

```sql
SELECT cust_id
FROM orders
WHERE order_num IN (
  SELECT order_num
  FROM orderitems
  WHERE prood_id = 'TNT2'
);
```

### 联结表

- 外键（foreign key）：外键作为某个表中的一列，它包含另一个表的主键值，定义了两个表的关系

- 可伸缩性（scale）：能够适应不断增加的工作量而不失败

```sql
/* prod_name, prod_price 在一个表中，vend_name 在另一个表中 */
SELECT vend_name, prod_name, prod_price
FROM vendors, products
WHERE vendors.vend_id = products.vend_id
ORDER BY vend_name, prod_name;

SELECT prod_name, vend_name, prod_price, quantity
FROM orderitems, products, vendors
WHERE products.vend_id = vendors.vend_id
  AND orderitems.prod_id = products.prod_id
  AND order_num = 20005;
```

**应该保证所有的联结都有 WHERE 子句，否则 MySQL 将返回比想要多得多的数据（笛卡尔积）**

### 组合查询

```sql
/* 这里可能使用 WHERE 更简单，但是多个表的时候 UNION 还是有应用场景的 */
SELECT vend_id, prod_id, prod_price
FROM products
WHERE (prod_price <= 5)
UNION
SELECT vend_id, prod_id, prod_price
FROM products
WHERE vend_id IN ('FNG01', 'DLL01');
```

## 插入数据

INSERT 操作可以忽略的列

- 该列定义为允许 NULL 值
- 在表定义中给出了默认值

```sql
INSERT INTO cb_table(
  cb_data,
  cb_time
)
VALUES(
  '剪切板内容',
  '2018/11/24 13:53:29'
);
```

## 更新数据

```sql
/* 更新单个内容 */
UPDATE cb_table
SET cb_data = '新的剪切板内容'
WHERE cb_id = 1;

/* 更新多个内容 */
UPDATE cb_table
SET cb_data = '新的剪切板内容',
    cb_time = '2018/11/24 14:00:00'
WHERE cb_id = 1;

/* 删除某列的值 */
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

## 数据库操作

```sql
-- 创建数据库
DROP DATABASE IF EXISTS clipboard;
CREATE DATABASE clipboard DEFAULT CHARSET utf8;
/* USE clipboard; */
```

## 表操作

### 创建表

```sql
CREATE TABLE cb_table(
  cb_id int NOT NULL AUTO_INCREMENT,
  cb_data CHAR(255) NOT NULL,
  cb_time timestamp NOT NULL,
  PRIMARY KEY (cb_id)
) ENGINE=InnoDB;
```

### 更新表

```sql
/* 添加列 */
ALTER TABLE cb_table
ADD text_cloumn CHAR(20);

/* 删除列 */
ALTER TABLE cb_table
DROP COLUMN text_cloumn;
```

### 删除表

```sql
DROP TABLE cb_table;
```

### 重命名表

```sql
RENAME TABLE cb_table TO cb_table_new;
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

# 数据类型

## 串数据类型

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

## 数值数据类型

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

## 日期和时间数据类型

| 数据类型  | 说明                           |
| :-------: | :----------------------------: |
| DATE      | YYYY-MM-DD                     |
| DATETIME  | DATE和TIME的组合               |
| TIMESTAMP | 功能和DATETIME相同(但范围较小) |
| TIME      | HH:MM:SS                       |
| YEAR      | 范围是1901年~2155年            |

## 二进制数据类型

| 数据类型   | 说明              |
| :--------: | :---------------: |
| BLOB       | 最大长度为64 KB   |
| MEDIUMBLOB | 最大长度为16 MB   |
| LONGBLOB   | 最大长度为4 GB    |
| TINYBLOB   | 最大长度为255字节 |

# 实践

## MySQL 读写分离延迟问题

阿里云的RDS（mysql） 部分数据库启用了读写分离，由于主从同步延迟的问题，可能会出现读取不到数据的问题，所以对于实时性比较高的业务，使用强制读主库的操作：在sql语句前增加 `/*FORCE_MASTER*/` 注释 强制读主库
