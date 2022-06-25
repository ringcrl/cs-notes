-- 创建数据库
DROP DATABASE IF EXISTS crud;
CREATE DATABASE crud DEFAULT CHARSET utf8;

-- 创建表
CREATE TABLE tdata(
  id int NOT NULL AUTO_INCREMENT,
  data CHAR(255) NOT NULL,
  ctime timestamp NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- create
INSERT INTO tdata(
  data,
  ctime
)
VALUES(
  'data1',
  '2020/06/18 00:00:00'
);

-- retrieve
SELECT id, data, ctime
FROM tdata
ORDER BY ctime DESC;

-- update
UPDATE tdata
SET data = 'data2',
    ctime = '2020/06/19 00:00:00'
WHERE id = 1;

-- delete
DELETE FROM tdata
WHERE id = 1;