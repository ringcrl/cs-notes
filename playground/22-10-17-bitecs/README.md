# Entity Component System with Phaser 3 and bitECS

```sh
# 安装依赖
npm install -g parcel
npm i

# 启动开发
npm run dev
```

# ECS 理论

https://github.com/NateTheGreatt/bitECS/blob/master/docs/INTRO.md

## 世界 World

1、一个世界代表一组实体和它们各自拥有的组件
2、世界不存储实际的组件数据，只存储它们与实体的关系
3、可以创建任意数量的世界

## 实体 Entity

1、实体是一个整数，技术上是一个指针，组件可以与之关联
2、实体通过查询来进行访问，其中的组件随系统发生变化

## 组件 Component

1、组件是纯数据并添加到实体中以赋予它们状态
2、从 `defineComponent` 返回的对象是一个 `SoA（数组结构）`。这是实际存储组件数据的内容

## 查询 Query

1、查询是用组件定义的，用于从世界中获取一组特定的实体
2、更多查询条件详见文档

## 系统 System

1、系统是针对世界运行以更新实体的组件状态或其他任何内容的常规功能
2、应该在系统函数内部使用查询来获取一组相关的实体并对其组件数据执行操作
3、虽然不是必需的，但强烈建议您将所有组件数据突变保留在系统内部
