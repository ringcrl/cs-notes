## 基础

### 狭义 Serverless

即 FaaS 架构 = Trigger（事件驱动）+FaaS（函数即服务）+BaaS（后端即服务，持久化等）

### 广义 Serverless

广义 Serverless  = 服务端免运维 = 具有 Serverless 特性的云服务

### FaaS 与 PaaS 对比

FaaS 与应用托管 PaaS 平台对比，最大的区别在于资源利用率，这也是 FaaS 最大的创新点。FaaS 的应用实例可以缩容到 0，而应用托管 PaaS 平台则至少要维持 1 台服务器或容器

### FaaS 调用链路

纯 FaaS 应用调用链路由函数触发器、函数服务和函数代码三部分组成，它们分别替代了传统服务端运维的负载均衡 & 反向代理，服务器 & 应用运行环境，应用代码部署。