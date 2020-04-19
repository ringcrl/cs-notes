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
- `go test -v -cover`

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
# 语法

## 声明变量

```go
sum := 0

var repeated string

const hello = "Hello"
```

## 条件判断

```go
if name == "" {
  name = "World"
}
```

## switch

```go
switch language {
case french:
  prefix = frenchHelloPrefix
case spanish:
  prefix = spanishHelloPrefix
}
```

## 迭代

Go 语言没有 `while`、`do`、`until` 这几个关键字，只能使用 `for`

```go
for i := 0; i < 5; i++ {
  repeated = repeated + character
}
```

## 数组

### 初始化

- 两种方式初始化数组
- 打印数组的时候使用 使用 %v（默认输出格式）占位符来打印输入
- 数组大小也属于类型的一部分，将 `[4]int` 作为 `[5]int` 类型的参数传入函数，是不能通过编译的

```go
// 声明时制定数组长度为 5
a := [5]int{1, 2, 3, 4, 5}

// [...] 根据初始化的值来自动判断数组长度
b := [...]int{1, 2, 3, 4, 5}

// 声明二维数组
c := [2][2]int{{1, 2}, {3, 4}}

// 数组截取
arr3 := [...]int{1, 2, 3, 4, 5}
arr3_sec := arr3[:3] // {1, 2, 3}
```

### 迭代数组

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

### 切片

- 不能对切片使用等号运算符，可以写一个函数迭代每个元素来检查它们的值
- 比较简单的办法是使用 reflect.DeepEqual，它在判断两个变量是否相等时十分有用
- 尝试比较 slice 和 string。这显然是不合理的，但是却通过了测试
- 切片的容量是固定的，但是可以使用 append 从原来的切片中创建一个新切片
- 使用 len 获取数组和切片的长度

```go
func TestSliceInit(t *testing.T) {
	var s0 []int
	t.Log(len(s0), cap(s0)) // 0 0
	s0 = append(s0, 1)
	t.Log(len(s0), cap(s0)) // 1 1

	s1 := []int{1, 2, 3, 4}
	t.Log(len(s1), cap(s1)) // 4 4
}
```

## map

- 它以 map 关键字开头，需要两种类型。第一个是键的类型，写在 [] 中，第二个是值的类型，跟在 [] 之后
- `map[string]string{"test": "this is just a test"}`
- 键的类型只能是一个可比较的类型，如果不能判断两个键是否相等，就无法确保我们得到的是正确的值
- 值的类型可以是任意类型，可以是另一个 map
- 永远不应该初始化一个空的 map 变量，会导致 nil 指针异常

```go
m := map[string]int{"one": 1, "two": 2, "three": 3}
m1 := map[string]int{}
m1["one"] = 1
```

- map 查找可以返回两个值，第二个值是一个布尔值，表示是否成功找到 key
- `definition, ok := d[word]`
- map 是引用类型，不使用指针传递就可以修改它们，无论 map 有多大，都只会有一个副本
- 添加的值已经存在 map 不会抛出错误，将继续并使用新提供的值覆盖该值

```go
// 空值判断
m1 := map[int]int{}
m1[2] = 0
if v, ok := m1[3]; ok {
	// m1[3] 存在
} else {
	// m1[3] 不存在
}
```

```go
// map 遍历
m1 := map[int]int{1: 1, 2: 4, 3: 9}
for k, v := range m1 {
	// 操作
}
```

```go
// map 的 value 可以是函数
m := map[int]func(op int) int{}
m[1] = func(op int) int { return op }
m[2] = func(op int) int { return op * op }
m[3] = func(op int) int { return op * op * op }
t.Log(m[1](2), m[2](2), m[3](2))
```

## 字符串

```go
// 字符串分割
s:="A,B,C"
parts := strings.Split(s, ",")
for _, part := range parts {
	t.Log(part)
}

// 字符串连接
t.Log(strings.Join(parts, "-"))
```

## 函数

### 一等公民

```go
func timeSpent(inner func (op int) int) func (op int) int {
	return func(n int) {
		start := time.Now()
		ret := inner(n)

		fmt.PrintLn ("time spent:", time.Since(start).Seconds())
	}
}

func slowFunc(op int) int {
	time.Sleep(time.Second * 1)
	return op
}
```

### 可变参数

```go
func Sum(ops ...int) int {
	ret:=0
	for _, op := range ops {
		ret += op
	}
	return ret
}
```

### defer 函数

```go
func Clear() {
	fmt.PrintLn("Clear resources.")
}

func TestDefer(t *testing.T) {
	defer Clear()

	panic("err") // 就算报错，defer 的 Clear 函数还是会执行
}
```

## 接口

### 结构体

- 使用保留字 struct 来定义自己的类型

```go
type Rectangle struct {
  Width float64
  Height float64
}
```

### 方法

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

### 接口

- 倾向于使用小的接口定义，很多接口只包含一个方法
- 较大的接口定义，可以由多个小接口定义组合而成
- 只依赖于必要功能的最小接口

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

## 指针

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

## 错误

- 没有异常机制
- error 类型实现了 error 接口
- 可以通过 errors.New 来快速创建错误实例

```go
func GetFibonacci(n int) ([]int, error) {
	if n < 2 || n > 100 {
		return nil, errors.New("n should be in [2, 100]")
	}

	fibList := []int{1, 1}

	for i := 2; i < n; i++ {
		fibList = append(fibList, fibList[i - 2] + fibList[i - 1])
	}
	return fibList
}

func TestGetFibonacci(t *testing.T) {
	if v, err := GetFibonacci(-10); err !== nil {
		t.Error(err)
	}
}
```

# 包管理

## 本地包

- 导出的方法必须首字母大写

```go
// 导出包
package series

func Square(n int) int {
	return n * n
}
```

```go
// 使用包
import (
	"dir/series"
	"testing"
)

func TestPackage(t *testing.T) {
	t.Log(series.Square(5))
}
```

## 远程包

https://github.com/Masterminds/glide