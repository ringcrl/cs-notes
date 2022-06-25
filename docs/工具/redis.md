# Redis

## 概述

- 性能不错的 key-value 数据库，同时还支持其他多种数据结构的存储
- 支持数据持久化存储，可以将数据存储在磁盘中，机器重启数据将从磁盘重新加载数据
- 支持数据的备份，即 Master-Slave 模式的数据备份

## 与 MySQL 对比

- 从数据库类型上，Redis 是 NoSQL 半结构化缓存数据库， MySQL 是结构化关系型数据库
- 从读写性能上，MySQL 是持久化硬盘存储，读写速度较慢， Redis 数据存储读取都在内存，同时也可以持久化到磁盘，读写速度较快
- 从使用场景上，Redis 一般作为 MySQL 数据读取性能优化的技术选型，彼此配合使用

## 安装

### Mac

```sh
brew install redis
```

#### 使用

```sh
# 开机启动 redis
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

# 使用 launchctl 启动 redis server
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 使用配置文件启动 redis server
redis-server /usr/local/etc/redis.conf

# 测试 redis server 是否启动
redis-cli ping

# 停止 redis server 的自启动
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 修改 redis 配置文件
vim /usr/local/etc/redis.conf
```

#### 卸载

```sh
brew uninstall redis

rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### CentOS

```sh
yum install redis
```

#### 使用

```sh
# 启动 redis
systemctl start redis.service

# 设置 redis 开机启动
systemctl enable redis.service
```

# 基本数据结构与实战场景

## 数据类型

- String：基本类型，可以存储任何形式的字符串
    - set：设置 key 对应的 value 值
    - get： 获取对应 key 的值，如不存在返回 nil
    - setnx：只有设置的值不存在，才设置
    - setex：设置键值，并指定对应的有效期
    - mset/mget：一次设置/获取多个 key 的值
    - incr/decr：对 key 值进行增加 / 减去 1 操作
- List：简单的字符串列表，按照插入顺序排序
    - lpush/rpush：在 key 所对应的 list 左 / 右部添加一个元素
    - lrang/lindex ：获取列表给定范围 / 位置的所有值
    - lset：设置 list 中指定下表元素的值
- Set：也是存储字符串，与 List 的区别是保证存储的字符串各不相同
    - sadd：向名称 为 key 的 set 添加元素
    - smembers：查看集合中的所有成员
    - spop：随机返回并删除 set 中一个元素
    - sdiff：返回所有 set 与第一个 set 的差集
    - sunion：返回给定集合并集
- Hash：存储多个键值对之间的映射，是一个 string 类型的 key-value 映射表
    - hset：设置一个 hash 的 field 的指定值，如果 key 不存在先创建
    - hget：获取某个 hash 的某个 filed 值
    - hmset/hmget：批量设置 / 获取 hash 内容
    - hlen：返回 hash 表中 key 的数量
    - hkeys/hvals：返回 hash 表中所有的 key/value
- Sorted Set：也是 string 类型的集合，且不允许重复成员，每一个键都有一个 double 类型的分值，然后根据关联的分值进行排序
    - zadd：将一个带有给定分值的成员添加到有序集合里面
    - zrange：取出集合中的元素
    - zcard：返回集合中所有元素的个数

## 使用场景

### String 类型使用场景

#### 商品库存数

- 商品库存数据是热点数据，交易行为会直接影响库存
- 商品的浏览次数，问题或者回复的点赞次数等，这种计数的场景都可以考虑利用 Redis 来实现

```redis
incr key && decr key && incrby key increment && decrby key decrement
```

- `set goods_id 10;` 设置 id 为 good_id 的商品的库存初始值为 10
- `decr goods_id;` 当商品被购买时候，库存数据减 1

#### 时效信息存储

- 可以设置过期时间：`set(key, value, expireTime)`
- 用户登录某个 App 需要获取登录验证码， 验证码在 30 秒内有效。那么我们就可以使用 String 类型存储验证码，同时设置 30 秒的失效时间

```js
keys = redisCli.get(key);
if(keys != null) {
  return false;
} else {
  sendMsg();
  redisCli.set(keys, value, expireTime);
}
```

### List 类型使用场景

- list 是按照插入顺序排序的字符串链表
- 可以在头部和尾部插入新的元素（双向链表实现，两端添加元素的时间复杂度为 O(1)）

#### 消息队列实现

- `lpush key value;` 在 key 对应 list 的头部添加字符串元素
- `rpop key;` 移除列表的最后一个元素，返回值为移除的元素

#### 最新上架商品

- 使用 Redis 的 list 数据结构，来进行 TOP 100 新上架产品的存储
- ltrim 指令对一个列表进行修剪（trim），这样 list 就会只包含指定范围的指定元素

```redis
ltrim key start stop
```

```js
//把新上架商品添加到链表里
ret = r.lpush('new:goods', goodsId)
//保持链表 100 位
ret = r.ltrim('new:goods', 0, 99)
//获得前 100 个最新上架的商品 id 列表
newest_goods_list = r.lrange('new:goods', 0, 99)
```

### set 类型使用场景

- 在交易网站，我们会存储用户感兴趣的商品信息
- 在进行相似用户分析的时候， 可以通过计算两个不同用户之间感兴趣商品的数量来提供一些依据

```redis
//userid 为用户 ID ， goodID 为感兴趣的商品信息。 
sadd "user:userId" goodID； 

sadd "user:101", 1
sadd "user:101", 2
sadd "user:102", 1
Sadd "user:102", 3

sinter "user:101" "user:101"
```

### Hash 类型使用场景

- 将对象数据转换为 JSON 结构数据，然后存储 JSON 的字符串到 Redis

```redis
hset user101  name "小明"
hset user101  phone  "123456"
hset user101  sex "男"
```

### Sorted Set 类型使用场景

- 使用场景与 set 类似，区别是 set 不是自动有序的
- sorted set 可以通过提供一个 score 参数来为存储数据排序，并且是自动排序，插入既有序
- 业务中如果需要一个有序且不重复的集合列表，就可以选择 sorted set 这种数据结构

例如：商品的购买热度可以将购买总量 num 当做商品列表的 score，这样获取最热门的商品时就是可以自动按售卖总量排好序

# 常见异常及解决方案

- 缓存穿透
- 缓存雪崩
- 缓存预热
- 缓存降级

## 缓存穿透

- 一般访问缓存的流程，如果缓存中存在查询的商品数据，那么直接返回。 如果缓存中不存在商品数据， 就要访问数据库
- 外部恶意攻击不断地请求某些不存在的数据内存，由于缓存中没有保存该数据，导致所有的请求都会落到数据库上，对数据库可能带来一定的压力，甚至崩溃

### 解决方案

- 针对缓存穿透的情况，简单的对策就是将不存在的数据访问结果，也存储到缓存中，避免缓存访问的穿透

## 缓存雪崩

- 当缓存重启或者大量的缓存在某一时间段失效，这样就导致大批流量直接访问数据库

### 解决方案

- 将商品根据品类热度分类，购买比较多的类目商品缓存周期长一些，购买相对冷门的类目商品，缓存周期短一些
- 在设置商品具体的缓存失效时间的时候， 加上一个随机的区间因子， 比如说 5~10 分钟之间来随意选择失效时间
- 提前预估 DB 能力， 如果缓存挂掉，数据库仍可以在一定程度上抗住流量的压力

## 缓存预热

- 缓存预热就是系统上线后，将相关的缓存数据直接加载到缓存系统
- 这样就可以避免在用户请求的时候，先查询数据库，然后再将数据缓存的问题
- 如果不进行预热，那么 Redis 初识状态数据为空，系统上线初期，对于高并发的流量，都会访问到数据库中， 对数据库造成流量的压力

### 解决方案

- 数据量不大的时候，工程启动的时候进行加载缓存动作
- 数据量大的时候，设置一个定时任务脚本，进行缓存的刷新
- 数据量太大的时候，优先保证热点数据进行提前加载到缓存

## 缓存降级

- 降级的情况，就是缓存失效或者缓存服务挂掉的情况下，我们也不去访问数据库
- 我们直接访问内存部分数据缓存或者直接返回默认数据
- 降级一般是有损的操作，所以尽量减少降级对于业务的影响程度

对于应用的首页，一般是访问量非常大的地方，首页里面往往包含了部分推荐商品的展示信息。这些推荐商品都会放到缓存中进行存储，同时我们为了避免缓存的异常情况，对热点商品数据也存储到了内存中。同时内存中还保留了一些默认的商品信息

# 分布式环境下常见的应用场景

## 分布式锁

- 分布式锁可以避免不同进程重复相同的工作，减少资源浪费
- 分布式锁可以避免破坏数据正确性的发生， 例如多个进程对同一个订单操作，可能导致订单状态错误覆盖

### 分布式锁实现

- 数据库乐观锁方式
- 基于 Redis 的分布式锁
- 基于 ZK 的分布式锁

### 分布式锁保证点

- 互斥性：任意时刻，只有一个资源能够获取到锁
- 容灾性：能够在未成功释放锁的的情况下，一定时限内能够恢复锁的正常功能
- 统一性：加锁和解锁保证同一资源来进行操作

### 避免用户重复下单

```java
// 加锁
public static boolean tryGetDistributedLock(
  Jedis jedis,
  String lockKey,
  String traceId,
  int expireTime,
) {
    SetParams setParams = new SetParams();
    setParams.ex(expireTime);
    setParams.nx();
    String result = jedis.set(lockKey, traceId, setParams);
    if (LOCK_SUCCESS.equals(result)) {
        return true;
    }
    return false;
}

// 解锁
public static boolean releaseDistributedLock(
  Jedis jedis,
  String lockKey,
  String traceId,
) {
  String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
  Object result = jedis.eval(script, Collections.singletonList(lockKey), Collections.singletonList(traceId));
  if (RELEASE_SUCCESS.equals(result)) {
    return true;
  }
  return false;
}
```

## 分布式自增 ID

- 我们可能会针对用户数据，商品数据，以及订单数据进行分库分表的操作
- 需要一个分布式 ID 生成器，来提供唯一 ID 的信息

### 实现方案

- 利用数据库自增 ID 的属性
- 通过 UUID 来实现唯一 ID 生成
- Twitter 的 SnowFlake 算法
- 利用 Redis 生成唯一 ID
    - Redis 是单进程单线程架构，不会因为多个取号方的 INCR 命令导致取号重复
    - 基于 Redis 的 INCR 命令实现序列号的生成基本能满足全局唯一与单调递增的特性

# 集群模式

Redis 集群模式有三种：

- 主从模式
- 哨兵模式
- Cluster 集群模式

## 主从模式

- Redis 服务器分为两类：一类是主数据库（Master），另一类是从数据库（Slave）
- 主数据库可以进行读写操作，当写操作导致数据变化时会自动将数据同步给从数据库
- 从数据库一般是只读的，并接受主数据库同步过来的数据
- 一个主数据库可以拥有多个从数据库，而一个从数据库只能拥有一个主数据库

### 优点

- 一个主，可以有多个从，并以非阻塞的方式完成数据同步
- 从服务器提供读服务，分散主服务的压力，实现读写分离
- 从服务器之前可以彼此连接和同步请求，减少主服务同步压力

### 缺点

- 不具备容错和恢复功能，主服务存在单点风险
- Redis 的主从复制采用全量复制，需要服务器有足够的空余内存
- 主从模式较难支持在线扩容

## 哨兵模式

### 原理

- 通过 sentinel 模式启动redis后，自动监控 Master/Slave 的运行状态
- 基本原理是：心跳机制 + 投票裁决
- 主数据库出现故障时自动将从数据库转换为主数据库

### 主要内容

- 监控（ Monitoring ）：Sentinel 会定期检查主从服务器是否处于正常工作状态
- 提醒（ Notification ）：当被监控的某个 Redis 服务器出现异常时，Sentinel 可以通过 API 向管理员或者其他应用程序发送通知
- 自动故障迁移（Automatic failover）：当一个主服务器不能正常工作时，Sentinel 会开始一次自动故障迁移操作，它会将失效主服务器的其中一个从服务器升级为新的主服务器，并让失效主服务器的其他从服务器改为复制新的主服务器；当客户端试图连接失效的主服务器时，集群也会向客户端返回新主服务器的地址， 使得集群可以使用新主服务器代替失效服务器

### 优点

- 哨兵模式主从可以切换，具备基本的故障转移能力
- 哨兵模式具备主从模式的所有优点

### 缺点

- 哨兵模式也很难支持在线扩容操作
- 集群的配置信息管理比较复杂

## Cluster 集群模式

- Redis Cluster 是一种服务器 Sharding 技术，3.0 版本开始正式提供
- 采用无中心结构，每个节点保存数据和整个集群状态,每个节点都和其他所有节点连接

### 集群结构特点

- Redis Cluster 所有的物理节点都映射到 [ 0-16383 ] slot 上（不一定均匀分布），Cluster 负责维护节点、桶、值之间的关系
- 在 Redis 集群中放置一个 key-value 时，根据 CRC16(key) mod 16384 的值，从之前划分的 16384 个桶中选择一个
- 所有的 Redis 节点彼此互联（PING-PONG 机制），内部使用二进制协议优化传输效率
- 超过半数的节点检测到某个节点失效时则判定该节点失效
- 使用端与 Redis 节点链接,不需要中间 proxy 层，直接可以操作，使用端不需要连接集群所有节点，连接集群中任何一个可用节点即可

### 优点

- 无中心架构，节点间数据共享，可动态调整数据分布
- 节点可动态添加删除，扩展性比较灵活
- 部分节点异常，不影响整体集群的可用性

### 缺点

- 集群实现比较复杂
- 批量操作指令（ mget、mset 等）支持有限
- 事务操作支持有限

# 持久化机制

- RDB 持久化：原理是将 Reids 在内存中的数据库记录定时 dump 到磁盘上的 RDB 持久化
- AOF（append only file）持久化：原理是将 Redis 的操作日志以追加的方式写入文件

## 区别

- RDB 持久化是指在指定的时间间隔内将内存中的数据集快照写入磁盘，实际操作过程是 fork 一个子进程，先将数据集写入临时文件，写入成功后，再替换之前的文件，用二进制压缩存储
- AOF 持久化以日志的形式记录服务器所处理的每一个写、删除操作，查询操作不会记录，以文本的方式记录，可以打开文件看到详细的操作记录

## RDB 优点

- RDB 是紧凑的二进制文件，比较合适备份，全量复制等场景
- RDB 恢复数据远快于 AOF

## RDB 缺点

- RDB 无法实现实时或者秒级持久化
- 新老版本无法兼容 RDB 格式

## AOF 优点

- 可以更好地保护数据不丢失
- appen-only 模式写入性能比较高
- 适合做灾难性的误删除紧急恢复

## AOF 缺点

- 对于同一份文件，AOF 文件要比 RDB 快照大
- AOF 开启后，写的 QPS 会有所影响，相对于 RDB 来说 写 QPS 要下降
- 数据库恢复比较慢， 不合适做冷备
