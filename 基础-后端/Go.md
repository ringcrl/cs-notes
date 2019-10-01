# 优点

- 编译效率，大型的 C/C++ 项目编译个一两个小时都是常事，而对 Go 而言，标准库的编译时间是 20s 左右
- 执行效率，几乎可以媲美 C/C++
- 编码规范，Go 在语法上做了大量精简，通过减少关键字的数量简化编码过程中的混乱和复杂度
- 内存管理，Go 设计者认为开发人员不应该关注这个问题，因此采用标记-清楚算法实现了高效快速的垃圾回收机制
- 网络通信、并发、并行编程，Go 十分擅长，它可以更好的利用大量的分布式和多核计算机

# 安装与配置

## 二进制安装

```sh
# 找到安装包下载地址：https://golang.org/dl/
wget https://dl.google.com/go/go1.13.1.darwin-amd64.tar.gz

# 设置安装目录
export GO_INSTALL_DIR=$HOME

# 解压 Go 安装包
tar -zxvf go1.13.1.darwin-amd64.tar.gz -C $GO_INSTALL_DIR

# 设置环境变量
export GO_INSTALL_DIR=$HOME
export GOROOT=$GO_INSTALL_DIR/go
export GOPATH=$HOME/mygo
export PATH=$GOPATH/bin:$PATH:$GO_INSTALL_DIR/go/bin
```

## gvm 安装

https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/01.1.md#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%B7%A5%E5%85%B7%E5%AE%89%E8%A3%85

```sh
gvm install go1.11.1 -B
gvm use go1.11.1 --defualt

# 验证安装成功
go version

# 查看 Go 环境
go env

# vim .zshrc

export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

- 所有源代码位于 src
- 包对象位于 pkg
- 编译好的程序位于 bin

```sh
mkdir -p $GOPATH/src $GOPATH/pkg $GOPATH/bin
```

## VSCode 使用

### 插件与分析工具

https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go

https://github.com/Microsoft/vscode-go/wiki/Go-tools-that-the-Go-extension-depends-on

### 配置 GOPATH 和 GOROOT

```json
"go.gopath": "/Users/ringcrl/.gvm/pkgsets/go1.11.1/global",
"go.goroot": "/Users/ringcrl/.gvm/gos/go1.11.1",
```

### Go 调试

```sh
go get -u github.com/derekparker/delve/cmd/dlv
```

### Go 语法检查

```sh
go get -u github.com/alecthomas/gometalinter
gometalinter --install
```

# 基础

## 应用程序

- 必须是 main 包：package main
- 必须是 main 方法：func main()
    - main 函数不支持任何返回值
    - 通过 os.Exit 来返回状态
- 文件名不一定是 main.go

命令行参数

- main 函数不支持传入参数
- 在程序中通过 os.Args 获取命令行参数

## 测试程序

- 源码文件以 _test 结尾：xxx_test.go

### 普通测试

- 测试方法名以 Test 开头：func TestXXX(t *testing.T) {}

```go
func TestRepeat(t *testing.T) {
	repeated := Repeat("a")
	expected := "aaaaa"

	if repeated != expected {
		t.Errorf("expected '%s' but got '%s'", expected, repeated)
	}
}
```

### 基准测试

- 测试方法名以 Benchmark 开头：func BenchmarkXXX(b *testing.B) {}

```go
func BenchmarkRepeat(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Repeat("a")
	}
}
```

## 基本语法

### 声明变量

```go
sum := 0

var repeated string

const hello = "Hello"
```

### 条件判断

```go
if name == "" {
  name = "World"
}
```

### switch

```go
switch language {
case french:
  prefix = frenchHelloPrefix
case spanish:
  prefix = spanishHelloPrefix
}
```

### 迭代

Go 语言没有 `while`、`do`、`until` 这几个关键字，只能使用 `for`

```go
for i := 0; i < 5; i++ {
  repeated = repeated + character
}
```

### 数组

#### 初始化

- 两种方式初始化数组
- 打印数组的时候使用 使用 %v（默认输出格式）占位符来打印输入
- 数组大小也属于类型的一部分，将 `[4]int` 作为 `[5]int` 类型的参数传入函数，是不能通过编译的

```go
// [N]type{val1, val2, ..., valN}
numbers := [5]int{1, 2, 3, 4, 5}

// [...]type{val1, val2, ..., valN}
numbers := [...]int{1, 2, 3, 4, 5}
```

#### 迭代数组

```go
// Sum 返回数组之和
func Sum(numbers [5]int) int {
	sum := 0
	// 返回【索引 + 值】，使用 _ 忽略不被使用的索引
	for _, number := range numbers {
		sum += number
	}

	return sum
}
```

#### 切片

- 不能对切片使用等号运算符，可以写一个函数迭代每个元素来检查它们的值
- 比较简单的办法是使用 reflect.DeepEqual，它在判断两个变量是否相等时十分有用
- 尝试比较 slice 和 string。这显然是不合理的，但是却通过了测试
- 切片的容量是固定的，但是可以使用 append 从原来的切片中创建一个新切片
- 使用 len 获取数组和切片的长度

```go
func TestSumAll(t *testing.T) {
	got := SumAll([]int{1, 2}, []int{0, 9})
  want := []int{3, 9}
  
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v want %v", got, want)
	}
}
```

### 结构体、方法和接口

#### 结构体

- 使用保留字 struct 来定义自己的类型

```go
type Rectangle struct {
  Width float64
  Height float64
}
```

#### 方法

- 方法和函数很相似但是方法是通过一个特定类型的实例调用的
- 函数可以随时被调用，比如 Area(rectangle)，不像方法需要在某个事物上调用

```go
// Rectangle 矩形类型
type Rectangle struct {
	Width  float64
	height float64
}

// Circle 圆形类型
type Circle struct {
	Radius float64
}

// Area 矩形面积
func (r Rectangle) Area() float64 {
	return r.Width * r.height
}

// Area 圆形面积
func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}
```

#### 接口

- 像创建 Rectangle 和 Circle 一样创建了一个新类型，不过这次是 interface 而不是 struct
- Go 语言中 interface resolution 是隐式的。如果传入的类型匹配接口需要的，则编译正确

```go
// Shape 方法
type Shape interface {
	Area() float64
}

checkArea := func(t *testing.T, shape Shape, want float64) {
	t.Helper()
	got := shape.Area()
	if got != want {
		t.Errorf("got %.2f want %.2f", got, want)
	}
}
```

### 指针与错误

- 指针
    - 如果一个符号（例如变量、类型、函数等）是以小写符号开头，那么它在【定义它的包之外】就是私有的
    - 当调用一个函数或方法时，参数会被复制
        - 当调用 `func (w Wallet) Deposit(amount int)` 时，`w` 是来自我们调用方法的副本
        - `&w.balance` 可以找到真正的内存地址
        - 指针让我们【指向】某个值，然后修改它，`func (w *Wallet) Deposit(amount int)`
- nil
    - 指针可以是 nil
    - 当函数返回一个指针，需要确保检查过它是否为 nil，否则可能有执行异常，编译器不能帮你
    - nil 非常适合描述一个可能丢失的值
- 错误
    - 错误是在调用函数或者方法时表示失败的
    - 检查字符串会导致测试不稳定


```go
// Bitcoin 比特币的数量
type Bitcoin int

// Wallet 存储着某人拥有的比特币数量
type Wallet struct {
	// 如果一个符号（例如变量、类型、函数等）是以小写符号开头
	// 那么它在【定义它的包之外】就是私有的
	balance Bitcoin
}

// w 是副本，修改它不会改变原始值
func (w Wallet) Deposit(amount Bitcoin) {
  w.balance += amount
}

// w 是指向钱包的指针，可以改变它
func (w *Wallet) Deposit(amount int) {
    w.balance += amount
}
```

### Maps

#### 声明 Map

- 它以 map 关键字开头，需要两种类型。第一个是键的类型，写在 [] 中，第二个是值的类型，跟在 [] 之后
- `map[string]string{"test": "this is just a test"}`
- 键的类型只能是一个可比较的类型，如果不能判断两个键是否相等，就无法确保我们得到的是正确的值
- 值的类型可以是任意类型，可以是另一个 map
- 永远不应该初始化一个空的 map 变量，会导致 nil 指针异常

```go
// 错误，会导致 nil 指针异常
var m map[string]string

// 证明方法一：
dictionary = map[string]string{}

// 声明方法二：
dictionary = make(map[string]string)
```

#### Map 特性

- map 查找可以返回两个值，第二个值是一个布尔值，表示是否成功找到 key
- `definition, ok := d[word]`
- map 是引用类型，不使用指针传递就可以修改它们，无论 map 有多大，都只会有一个副本
- 添加的值已经存在 map 不会抛出错误，将继续并使用新提供的值覆盖该值

### DI

#### 概念

- 测试代码。如果你不能很轻松地测试函数，这通常是因为有依赖硬链接到了函数或全局状态。例如，如果某个服务层使用了全局的数据库连接池，这通常难以测试，并且运行速度会很慢。DI 提倡你注入一个数据库依赖（通过接口），然后就可以在测试中控制你的模拟数据了。
- 关注点分离，解耦了数据到达的地方和如何产生数据。如果你感觉一个方法 / 函数负责太多功能了（生成数据并且写入一个数据库？处理 HTTP 请求并且处理业务级别的逻辑），那么你可能就需要 DI 这个工具了。
- 在不同环境下重用代码。我们的代码所处的第一个「新」环境就是在内部进行测试。但是随后，如果其他人想要用你的代码尝试点新东西，他们只要注入他们自己的依赖就可以了。

#### 打印的例子

以打印到标准输出为例，测试框架捕获它非常困难

- 注入（这只是一个等同于「传入」的好听的词）打印的依赖
- 我们的函数不需要关心在哪里打印，以及如何打印，所以我们应该接收一个接口，而非一个具体的类型
- `io.Writer` 是一个很好的通用接口，用于「将数据放在某个地方」

```go
// di_test.go

func TestGreet(t *testing.T) {
	// bytes 包中的 buffer 类型实现了 Writer 接口
	// 我们可以在测试中，用它来作为我们的 Writer
	// 接着调用了 Greet 后，我们可以用它来检查写入了什么
	buffer := bytes.Buffer{}
	Greet(&buffer, "Chris")

	got := buffer.String()
	want := "Hello, Chris"

	if got != want {
		t.Errorf("got '%s' want '%s'", got, want)
	}
}
```

```go
// di.go

// Greet sends a personalised greeting to writer
// io.Writer 比 *bytes.Buffer 更为通用
// os.Stdout 和 bytes.Buffer 都实现了它
func Greet(writer io.Writer, name string) {
	// fmt.Fprintf 和 fmt.Printf 一样
	// fmt.Fprintf 会接收一个 Writer 参数，用于把字符串传递过去
	// fmt.Printf 默认是标准输出
	fmt.Fprintf(writer, "Hello, %s", name)
}

func main() {
	Greet(os.Stdout, "Elodie")
}
```

### Mocking

- 没有对代码中重要的区域进行 mock 将会导致难以测试。在我们的例子中，我们不能测试我们的代码在每个打印之间暂停，但是还有无数其他的例子。调用一个 可能 失败的服务？想要在一个特定的状态测试您的系统？在不使用 mocking 的情况下测试这些场景是非常困难的。
- 如果没有 mock，你可能需要设置数据库和其他第三方的东西来测试简单的业务规则。你可能会进行缓慢的测试，从而导致 **缓慢的反馈循环**。
- 当不得不启用一个数据库或者 webservice 去测试某个功能时，由于这种服务的不可靠性，你将会得到的是一个 **脆弱的测试**。
