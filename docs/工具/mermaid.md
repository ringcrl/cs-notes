Mermaid 是一个用于画流程图、状态图、时序图、甘特图的库，使用 JS 进行本地渲染，广泛集成于许多 Markdown 编辑器中

## 流程图 graph

- TB：top bottom；LR：left right

### 基本语法

```mermaid
graph LR;
    t1[文字];
    t2(文字);
    t3((文字));
    t4{文字};
    t5>文字];
    t6["使用引用[111]"]
    A1-->B1;
    A2---B2;
    A3-- 标签文字 ---B3;
    A4-- 箭头文字 -->B4;
    A5 ==> B5;
    A6 === B6;
```

### 子图

```mermaid
graph TB
    subgraph one
    a1 --> a2
    end
    subgraph two
    b1 --> b2
    end
    subgraph three
    c1 --> c2
    end
    c1 --> a2
```

### 实例

```mermaid
graph TB;
    st(开始) --> op[操作];
    op --> co{是或者不是};
    co -- no --> sub((子程序));
    sub --> op;
    co -- yes --> out>输出];
    out --> en(结束);
```



## 时序图 sequenceDiagram

- 设定参与者(participants)的顺序控制二者的顺序

```mermaid
sequenceDiagram
　　Alice->>John: Hello John, how are you?
　　John-->>Alice: Great!
　　Alice->>John: Hung,you are better.
　　John-->>Alice: yeah, Just not bad.
```