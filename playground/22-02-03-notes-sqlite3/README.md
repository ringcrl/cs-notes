# sqlite3 本地笔记本

```sh
# 启动服务
pm2 start notes-server.js
```

# sqlite3 操作

## 打开db

```sh
sqlite3 path_to_db
```

## 创建表

```sql
-- 笔记表
CREATE TABLE IF NOT EXISTS "t_notes" (
  "id" INTEGER NOT NULL UNIQUE,
  "question" TEXT NOT NULL,
  "answer" TEXT,
  "type" TEXT,
  PRIMARY KEY("id" AUTOINCREMENT)
);

-- 类型表
CREATE TABLE IF NOT EXISTS "t_types" (
  "id" INTEGER NOT NULL UNIQUE,
  "type" TEXT NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);
```

## 查看表结构

```sh
.schema t_notes
```

## 查看表数据

```sql
SELECT * FROM t_notes;
```

## 插入表数据

```sql
INSERT INTO t_types VALUES (NULL, '类型1');
```

## 删除表数据

```sql
DELETE FROM t_types WHERE id=1;
```

## 复制表

```sql
INSERT INTO t_notes (question) SELECT content FROM NOTES;
```

## 删除表

```sql
DROP TABLE NOTES;
```

## 重命名表

```sql
ALTER TABLE t1_backup RENAME TO t1;
```

## 导出表数据

```sh
# 导出 csv
sqlite3  -csv -header local.db  "select * from NOTES" > notes.csv
```

# 快捷备忘

```sql
-- 打开表
sqlite3 /Users/ringcrl/Documents/saga/chenng/local.db

-- 查看类型
SELECT * FROM t_types;

-- 添加类型
INSERT INTO t_types VALUES (NULL, '新类型');

-- 删除类型
DELETE FROM t_types WHERE id=1;
```
