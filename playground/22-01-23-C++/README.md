# 编译运行

## 1、命令行编译

```sh
g++ main.cpp -o main
```

## 2、VSC Code Runner

```json
"code-runner.executorMap": {
    "cpp": "cd $dir && g++ -std=c++14 *.cpp -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
},
```

## 3、VSC task

https://code.visualstudio.com/docs/cpp/config-linux

## 4、VSC CMake

https://github.com/microsoft/vscode-cmake-tools/blob/main/docs/how-to.md#create-a-new-project


# 语法基础

## 查找内存地址

```sh
# -exec x &var

-exec x/16x &var
```

## base 基础

```cpp
#include <iostream>

int main() {
    std::cout << "测试" << std::endl;
    return 0;
}
```

## 数据类型

```cpp
#include <iostream>

int main()
{
    // sizeof 获取字节

    // 整形
    std::cout << "int 整形 32位 字节：" << sizeof(int) << std::endl;
    std::cout << "int 整形 32位 最大值：" << INT_MAX << std::endl;
    std::cout << "short int 短整形 16位 字节：" << sizeof(short int) << std::endl;
    std::cout << "long int 长整形 32位 字节：" << sizeof(long int) << std::endl;
    std::cout << "char 字符型(隶属于整形) 8位 字节：" << sizeof(char) << std::endl;
    std::cout << "char 字符型 最大值：" << CHAR_MAX << std::endl;
    std::cout << "char 字符型 最小值：" << CHAR_MIN << std::endl;
    std::cout << "bool 布尔型(隶属于整形) 8位 字节：" << sizeof(bool) << std::endl;

    // 浮点型
    std::cout << "float 浮点型 32位 字节：" << sizeof(float) << std::endl; // 不要使用，只能表示6-7位
    std::cout << "double 浮点型 64位 字节：" << sizeof(double) << std::endl;

    // string 类型
    std::cout << "string 字符串型 字节：" << sizeof(std::string) << std::endl;

    // 定义类型别名
    typedef std::string my_string;
    my_string text = "我自己定义的 string 类型别名";
    std::cout << text << std::endl;

    // 定义常量，代替 C 语言的 #define，性能不好
    const float PI = 3.1415926;
}

```

## iostream 输入输出

```cpp
// 引入输入输出
#include <iostream>

// std 是命名空间
// << 表示插入运算符
// endl 表示换行
std::cout << "打印的内容" << std:endl;

// 使用命名空间后，后面就是可以使用 cout 而不是 std:cout
using namespace std;
```

## :: 双冒号作用域符

```cpp
// 1、global scope(全局作用域符）
// 如在程序中的某一处你想调用全局变量a，那么就写成::a；（也可以是全局函数）
// ::name

// 2、class scope(类作用域符）
// 如果想调用class A中的成员变量a，那么就写成A::a
// namespace::name

// 3、namespace scope(命名空间作用域符）
// 另外一个如果想调用namespace std中的cout成员，你就写成std::cout
// namespace::name
```

## cmath 数学计算

```cpp
#include <iostream>
#include <cmath>

int main()
{
    // 强制以小数展示
    std::cout << std::fixed;
    double infiniteNum = 10.0 / 3.0;
    std::cout << infiniteNum << std::endl;

    // pow 计算平方
    double width = 3.0;
    double area = pow(width, 2);
    std::cout << "Area of a square with width " << width << " is " << area << std::endl;
}

```

## int arr[5] 数组

```cpp
#include <iostream>
#include <array>
using namespace std;

int main() {
  int arr1[5];

  // 完全等价于上面，但要主动删除，没有用 new 不需要 delete
  int *arr2 = new int[5];
  delete[] arr2;

  // 计算数组长度，初始化赋值
  int arr1Len = sizeof(arr1) / sizeof(int);
  for (int i = 0; i < arr1Len; i++) {
    arr1[i] = 2;
  }

  int *ptr1 = arr1;
  arr1[2] = 5;     // 修改第三个元素
  *(ptr1 + 2) = 6; // 修改第三个元素

  // 使用常量作为数组初始化
  static const int arrSize = 5;
  int arr3[arrSize];

  // 使用 std::array 让数组操作更简单
  std::array<int, 5> arr4;
  for (int i = 0; i < arr4.size(); i++) {
    arr4[i] = 2;
  }
}

```

## char*、std::string 字符串

```cpp
#include <iostream>
#include <string>
#include <stdlib.h>
using namespace std;

void strCopy(std::string str) {
  str += " copy";
  std::cout << str << std::endl;
}

void strRefer(std::string &str) {
  str += " refer";
  std::cout << str << std::endl;
}

int main() {
  // C语法:
  // 以下两种声明C的字符串的语法等价
  const char *str1 = "Chenng";
  char str2[6] = {'C', 'h', 'e', 'n', 'n', 'g'};
  std::cout << str1 << std::endl;
  std::cout << str2 << std::endl;

  // C++语法:
  std::string str3 = "Chenng";
  std::cout << str3 << std::endl;
  // std::string 上的方法
  std::cout << "str3.size(): " << str3.size() << std::endl;
  std::cout << "str3.length(): " << str3.length() << std::endl;
  bool str3ContainsC = str3.find("C") != std::string::npos;
  std::cout << str3ContainsC << std::endl;
  // 字符串传入函数
  // 复制传递
  strCopy(str3);
  std::cout << str3 << std::endl;
  // 引用传递
  strRefer(str3);
  std::cout << str3 << std::endl;
}

```

## *ptr 指针

```cpp
#include <iostream>
using namespace std;

int main()
{
    // int* p 的写法偏向于地址，即 p 就是一个地址变量，表示一个十六进制地址
    // int *p 的写法偏向于值，*p 是一个整形变量，能够表示一个整型值
    // 声明中的 * 号和使用中的 * 号含义完全不同

    int num = 1024;
    // 给指针赋值，只能使用 & 符号
    int* ptr_num = &num;
    cout << "num = " << num << endl;
    cout << "*ptr_num = " << *ptr_num << endl;
    cout << "ptr_num = " << ptr_num << endl;

    // 不给指针值，会有默认值，就是野指针，非常危险，会导致很深的bug
    double* ptr_double;
    cout << "ptr_double = " << ptr_double << endl;
    // 所以初始化为 nullptr
    int* ptr1 = nullptr;

    // void* 可以指定任何类型，但是不能使用 void* 来修改值，一般用来和别的指针进行比较
}

```

## & 引用

```cpp
#include <iostream>

int main()
{
    // 引用是对指针的简单封装，底层仍然是指针
    // 获取引用地址的时候，编译器会进行内部转换
    // 引用必须一开始就初始化
    int num = 108;
    int& ref_num = num;
    ref_num = 118;
    std::cout << &num << '\t' << &ref_num << std::endl;
    // 等价于
    int num2 = 108;
    int* ref_num2 = &num2;
    *ref_num2 = 118;
    std::cout << &num2 << '\t' << ref_num2 << std::endl;

    // 声明简单的变量
    int i = 5;
    double d = 11.7;
    // 声明引用变量
    int& r = i;
    double& s = d;
    std::cout << "i 的值: " << i << std::endl;
    std::cout << "i 的引用: " << r << std::endl;
    std::cout << "d 的值: " << d << std::endl;
    std::cout << "d 的引用: " << s << std::endl;

    // 不可以直接引用常量（字面量）
    // double& d = 12.3; // 错误
    const double& d = 12.3; // 正确
}

```

## new 分配内存到到 heap

```cpp
#include <iostream>
using namespace std;

int main()
{
    // 使用 new 动态分配内存
    // 指针真正的用武之地：在运行阶段分配未命名的内存以存储值
    // 在此情况下，只能通过指针来访问内存

    // 1、在运行阶段为一个 int 值分配未命名的内存
    // 2、使用指针来指向这个值（右->左），左边栈区，右边堆区
    // 栈区(stack)由编译器自动分配释放，堆区(heap)由程序员分配释放
    int* ptr_int = new int;
    // 3、new 过的内存必须手动 delete
    // 不要用 delete 删除不是 new 分配的内存
    // 不要用 delete 释放同一个内存两次
    delete ptr_int;
    
    // 编译时
    int nums1[5];
    // 运行时
    int* nums2 = new int[5]; // 5 * 4 = 20 bytes
    cout << sizeof(nums1) << '\t' << sizeof(nums2) << endl; // 20字节 8字节
    delete[] nums2;
}

```

```cpp
#include <iostream>
using namespace std;

class Entity {
private:
  std::string m_Name;

public:
  Entity() : m_Name("Unknow") {}
  Entity(const std::string &name) : m_Name(name) {}

  std::string getName() {
    return m_Name;
  }
};

int main() {
  Entity* e;
  {
    Entity* entity = new Entity("Chenng");
    e = entity;
    // 等价
    std::cout << entity->getName() << std::endl;
    std::cout << (*entity).getName() << std::endl;
  }

  delete e;
}

```

## 函数

### 原型与定义

```cpp
#include <iostream>
using namespace std;

// 函数定义
int sum(int, int);
// 函数实现
int sum(int num1, int num2) {
    return num1 + num2;
}

int main()
{
    int res = sum(2, 3);
    cout << res << endl;
}

```

### 引用参数

- 能够修改函数中的数据对象
- 数据对象较大的时候传递引用可以提高程序的运行效率
    - 函数中不需要修改传的参数
        - 如果数据对象很小，建议按值传递
        - 传递数组只能使用指针，并使用 const 关键字
        - 较大的对象则使用 const 指针或引用，提高程序的效率
    - 函数中需要修改传递的参数
        - 数据对象是基本类型或结构时，可以使用指针或引用（基本类型建议指针）
        - 数据对象是数组时只能使用指针
        - 数据对象是类对象时，要求使用引用

```cpp
#include <iostream>
using namespace std;

void change(int &num)
{
    num++;
}

void swap(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

int main()
{
    int num = 10;
    change(num);
    cout << num << endl; // 11

    int a = 10, b = 20;
    swap(a, b);
    cout << a << " " << b << endl; // 20 10
}

```

### 数组参数

```cpp
// 一维数组
#include <iostream>
using namespace std;

void input(int [], int);
void input(int values[], int len) {
    if (len > 5) {
        cout << "数组长度只能是5以内" << endl;
        return;
    }

    string valueNames[] = {"first", "second", "third", "fourth", "fifth"};
    for (int i = 0; i < len; i++) {
        cout << valueNames[i] << endl;
        cin >> values[i];
    }
}

int main()
{
    int values[5];
    // sizeof(values)/sizeof(int) 求数组长度
    input(values, sizeof(values)/sizeof(int));
}

```

```cpp
// 二维数组
#include <iostream>
using namespace std;

void show(const double (*)[5], int);
void show(const double (*arrs)[5], int len) {
    for (int i = 0; i < len; i++) {
        for (int j = 0; j < 5; j++) {
            cout << arrs[i][j] << "\t";
        }
        cout << endl;
    }
}

int main()
{
    double powers[3][5] = {
        {1, 2, 3, 4, 5},
        {2, 4, 6, 8, 10},
        {3, 6, 9, 12, 15}
    };
    show(powers, 3);
}

```

### 不可修改参数

```cpp
void show1(const int valueArray[], int len);
void show2(const int* valueArray, int len);
```

### 指针参数

```cpp
#include <iostream>

void getSeconds(unsigned long *par)
{
    // 获取当前的秒数
    *par = time(NULL);
    return;
}

int main()
{
    unsigned long sec;
    getSeconds(&sec);
    std::cout << "Number of seconds :" << sec << std::endl;
}

```

### 函数指针

```cpp
#include <iostream>
using namespace std;

// 声明函指针
int (*ptrMyPow)(int, int);

int myPow(int base, int exponent)
{
    int res = 1;
    for (int i = 0; i < exponent; i++)
    {
        res *= base;
    }
    return res;
}

int main()
{
    // 让声明的函数指针指向函数
    ptrMyPow = myPow;
    cout << ptrMyPow(2, 3) << endl; // 8
    cout << (*ptrMyPow)(2, 3) << endl; // 8
}

```

### auto 自动推断

```cpp
#include <iostream>
#include <string>

std::string GetName() {
  return "Chenng";
}

int main() {
  // C++ 11 开始支持 auto
  // auto 必须赋值初始函数
  auto name = GetName();
  std::cout << name.size() << std::endl;
}

```

### 内联函数

```cpp
#include <iostream>
using namespace std;

inline int sum(int num1, int num2)
{
    return num1 + num2;
}

int main()
{
    // 这行会直接替换为上述函数的结构体内的内容
    int res = sum(2, 3);
    cout << res << endl;
}

```

### 返回引用

- 永远不要将函数局部变量用作引用返回，函数销毁引用也被销毁了

### 函数重载

```cpp
#include <iostream>
using namespace std;

// 函数重载
// 获取数组长度会比较麻烦，入参的时候传入
void Sort(int[], int len);
void Sort(float[], int len);
void Sort(double[], int len);

int iNums[] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
float fNums[] = {10.1, 9.1, 8.1, 7.1, 6.1, 5.1, 4.1, 3.1, 2.1, 1.1};
double dNums[] = {10.1, 9.1, 8.1, 7.1, 6.1, 5.1, 4.1, 3.1, 2.1, 1.1};

void Sort(int nums[], int len)
{
    int temp;
    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < len - i - 1; j++)
        {
            temp = nums[j];
            nums[j] = nums[j + 1];
            nums[j + 1] = temp;
        }
    }
}

void Show(int nums[], int len)
{
    for (int i = 0; i < len; i++)
    {
        cout << nums[i] << " ";
    }
    cout << endl;
}

int main()
{
    Sort(iNums, sizeof(iNums) / sizeof(int));
    Show(iNums, sizeof(iNums) / sizeof(int));
}

```

### 函数模板

```cpp
#include <iostream>
using namespace std;

// 模板函数，避免使用过多的重载
template<typename T> void Sort(T tArray[], int len);
template<typename T> void Show(T tArray[], int len);

int iNums[] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
float fNums[] = {10.1, 9.1, 8.1, 7.1, 6.1, 5.1, 4.1, 3.1, 2.1, 1.1};
double dNums[] = {10.1, 9.1, 8.1, 7.1, 6.1, 5.1, 4.1, 3.1, 2.1, 1.1};

template<typename T>
void Sort(T tArray[], int len)
{
    T temp;
    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < len - i - 1; j++)
        {
            temp = tArray[j];
            tArray[j] = tArray[j + 1];
            tArray[j + 1] = temp;
        }
    }
}

template<typename T>
void Show(T tArray[], int len)
{
    for (int i = 0; i < len; i++)
    {
        cout << tArray[i] << " ";
    }
    cout << endl;
}

int main()
{
    Sort(iNums, sizeof(iNums) / sizeof(int));
    Show(iNums, sizeof(iNums) / sizeof(int));
}

```

## time 时间

```cpp
#include <iostream>

int main()
{
    // 日期与时间
    // 基于当前系统的当前日期/时间
    time_t now = time(0);
    // 把 now 转换为字符串形式
    char *dt = ctime(&now);
    std::cout << "本地日期和时间：" << dt << std::endl;
    // 把 now 转换为 tm 结构
    tm *gmtm = gmtime(&now);
    dt = asctime(gmtm);
    std::cout << "UTC 日期和时间：" << dt << std::endl;
    std::cout << "1970 到目前经过秒数:" << now << std::endl;
    // 使用结构 tm 故事化时间
    tm *ltm = localtime(&now);
    // 输出 tm 结构的各个组成部分
    std::cout << "年: " << 1900 + ltm->tm_year << std::endl;
    std::cout << "月: " << 1 + ltm->tm_mon << std::endl;
    std::cout << "日: " << ltm->tm_mday << std::endl;
    std::cout << "时: " << ltm->tm_hour << std::endl;
    std::cout << "分: " << ltm->tm_min << std::endl;
    std::cout << "秒: " << ltm->tm_sec << std::endl;
}

```

## struct 结构体

```cpp
#include <iostream>

struct Books
{
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
};

int main()
{
    // 结构
    Books Book1; // 定义结构体类型 Books 的变量 Book1
    // Book1 详述
    strcpy(Book1.title, "C++ 教程");
    strcpy(Book1.author, "Chenng");
    strcpy(Book1.subject, "编程语言");
    Book1.book_id = 0;
    // 输出 Book1 信息
    std::cout << "第一本书标题 : " << Book1.title << std::endl;
    std::cout << "第一本书作者 : " << Book1.author << std::endl;
    std::cout << "第一本书类目 : " << Book1.subject << std::endl;
    std::cout << "第一本书 ID : " << Book1.book_id << std::endl;
}

```

## class 类

### Box示例

```cpp
#include <iostream>

class Box
{
    // 私有成员，默认情况下类所有成员都是私有的，例如
    int border;

    // 公有成员
public:
    double length;  // 盒子的长度
    double breadth; // 盒子的宽度
    double height;  // 盒子的高度

    // 构造函数
    // Box(double len, double bre, double hei)
    // {
    //     length = len;
    //     breadth = bre;
    //     height = hei;
    // }

    // 成员函数声明
    double get(void);
    void set(double len, double bre, double hei);

    // 类内部定义函数
    double getVolume(void)
    {
        return length * breadth * height;
    }
    void setPrivateWidth(double width)
    {
        privateWidth = width;
    }
    double getPrivateWidth()
    {
        return privateWidth;
    }
    // 受保护成员，在子类可以被访问
protected:
    double protectedWidth;
    // 私有成员
private:
    double privateWidth;
};
// 类外部定义函数，使用范围解析运算符::
double Box::get(void)
{
    return length * breadth * height;
}
// 类外部定义函数
void Box::set(double len, double bre, double hei)
{
    length = len;
    breadth = bre;
    height = hei;
}

// SubBox 是派生类
class SubBox : Box
{
public:
    void setSubBoxWidth(double wid)
    {
        protectedWidth = wid;
    }
    double getSubBoxWidth(void)
    {
        return protectedWidth;
    }
};

int main()
{
    // 类
    Box Box1;            // 声明 Box1，类型为 Box
    double volume = 0.0; // 用于存储体积
    Box1.height = 5.0;
    Box1.length = 6.0;
    Box1.breadth = 7.0;
    volume = Box1.getVolume();
    std::cout << "Box1 的体积：" << volume << std::endl;
    // 私有属性
    Box1.setPrivateWidth(10.0);
    std::cout << "Box1 的私有属性：" << Box1.getPrivateWidth() << std::endl;

    // 子类
    SubBox subBox;
    subBox.setSubBoxWidth(0.5);
    std::cout << "subBox 的 protected 属性：" << subBox.getSubBoxWidth() << std::endl;
}

```

### 使用 hpp 内联实现

```cpp
// LandOwner.hpp
#include <iostream>
using namespace std;

// hpp 文件一般包含实现的内联函数
// 只要不是纯木板，一般使用 .h 作为头文件后缀，使用 cpp 文件作为函数的实现
class LandOwnerV1
{
private:
  string name; // 地主名称
  long score; // 地主积分
  int cards[20]; // 地主的手牌数组
public:
  LandOwnerV1() {}; // 构造函数
  ~LandOwnerV1() {}; // 析构函数
  inline void TouchCard(int cardCount)
  {
    cout << name << "摸了" << cardCount << "张牌" << endl;
  }
  void ShowScore()
  {
    cout << name << "的积分是" << score << endl;
  }
};

```

```cpp
// main.cpp
#include <iostream>
using namespace std;

#include "LandOwner.hpp" // 要使用类必须包含类的头文件

int main()
{
    LandOwnerV1 landOwner1;
    landOwner1.TouchCard(100);
}

```

### new 与非 new 调用

```cpp
// LandOwner.h
#include <iostream>
using namespace std;

class LandOwner
{
private:
  string name;   // 地主名称
  long score;    // 地主积分
  int cards[20]; // 地主的手牌数组
public:
  // 构造函数重载
  LandOwner();               // 构造函数的声明，无参数
  LandOwner(int);            // 构造函数的声明，一个 int 参数
  LandOwner(string);         // 构造函数的声明，一个 string 参数
  LandOwner(string, string); // 构造函数的声明，两个 string 参数
  ~LandOwner();              // 析构函数的声明
  void TouchCard(int);       // 声明摸牌的方法，不用写参数名
  void ShowScore();          // 声明的显示积分的方法
};

```

```cpp
// LandOwner.cpp
#include <iostream>
using namespace std;

#include "LandOwner.h"

LandOwner::LandOwner()
{
  cout << "构造函数无参数调用" << endl;
}

LandOwner::LandOwner(int count)
{
  cout << "构造函数一个 int 参数调用" << count << endl;
}

// 实现摸牌方法，:: 是域运算符
void LandOwner::TouchCard(int cardCount)
{
  // 在这里实现摸牌的方法
  cout << "摸了" << cardCount << "张牌" << endl;
}

void LandOwner::ShowScore()
{
  // 在这里实现显示积分的方法
  cout << "积分是：" << score << endl;
}

LandOwner::~LandOwner()
{
  cout << "析构函数被调用" << endl;
}

```

```cpp
#include <iostream>
using namespace std;

#include "LandOwner.h" // 要使用类必须包含类的头文件

int main()
{
    // 在栈内存创建：非指针形式的非 new 调用，main函数调用完之后会自动调用析构函数
    // 生命周期只在{}内，调用完后就释放掉了
    // LandOwner landOwner(); // 标准写法
    // LandOwner landOwner; // 无参数简写：默认构造函数已经被调用
    // LandOwner landOwner(1); // 一个参数被调用
    // landOwner.TouchCard(20); // 使用.进行调用

    // 在堆内存创建：指针形式的 new 调用，main函数调用完后不会自动调用析构函数
    // 一般程序使用堆内存，否则容易被释放掉引发程序问题
    LandOwner* landOwner = new LandOwner(); // 指针类型的构造函数被调用
    landOwner->TouchCard(20); // 使用 -> 进行调用
    landOwner->~LandOwner(); // 一定要手动调用析构函数，销毁非静态成员
    // delete landOwner; // 或者通过这个方法销毁
}

```

### 资源释放

```cpp
class Student
{
private:
    double *scores;

public:
    Student(int len)
    {
        // 使用堆分配的指针资源，一定要记得销毁
        scores = new double[len];
    }
    ~Student()
    {
        delete scores; //释放资源
    }
}
```

## vector 动态数组

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

struct Vertex {
  float x, y, z;

  Vertex(float x, float y, float z) : x(x), y(y), z(z) {}

  Vertex(const Vertex &vertext) : x(vertext.x), y(vertext.y), z(vertext.z) {
    std::cout << "copied" << std::endl;
  }
};

int main() {
  std::vector<double> vecDouble = {1.0, 2.0, 3.0, 4.0, 5.0};

  // 向数组插入数字
  vecDouble.push_back(6.0);

  // 遍历方法1：
  for (int i = 0; i < vecDouble.size(); i++) {
    std::cout << vecDouble[i] << std::endl;
  }

  // 遍历方法2：
  for (const double &v : vecDouble) {
    std::cout << v << std::endl;
  }

  // 得到迭代器对象
  std::vector<double>::iterator it;
  // 从第一个元素开始迭代
  // ++ 写在前面避免缓存，写在后面会产生缓存问题
  for (it = vecDouble.begin(); it != vecDouble.end(); ++it) {
    std::cout << "*it = " << *it << std::endl;
  }

  // 正序排序
  sort(vecDouble.begin(), vecDouble.end());
  // 逆序排序
  reverse(vecDouble.begin(), vecDouble.end());

  // 优化内存不足情况下多次开辟新内存
  // 下面写法会调用 copied 三次
  std::vector<Vertex> vertices1;
  vertices1.push_back({1, 2, 3});
  vertices1.push_back({4, 5, 6});
  vertices1.push_back({7, 8, 9});
  std::cout << "==========" << std::endl;
  // 下面写法会优化 copied 次数，有足够的内存存储新 push_back 的内容
  std::vector<Vertex> vertices2;
  vertices2.reserve(3); // 申请三份内存
  vertices2.push_back({1, 2, 3});
  vertices2.push_back({4, 5, 6});
  vertices2.push_back({7, 8, 9});
}

```

## const & mutable

```cpp
#include <iostream>
using namespace std;

int main()
{
    // 第一类：const 修饰指针变量时：
    // 1、只有一个 const 时，如果 const 位于 * 的左侧，表示指针所指的数据是常量，不能通过该指针修改实际数据，指针本身是变量，可以指向其他内存单元
    // 2、只有一个 const 时，如果 const 位于 * 的右侧，表示指针本身是常量，不能指向其他内存单元，所指向的数据可以修改
    // 3、如果有两个 const 位于 * 的左右两侧，表示指针和指针所指向的数据都不能修改

    int num1 = 1024;
    // 分配的变量是只读的，不能修改
    const int num2 = num1;
    // num2 = 2048; // error: num2 is const

    const int *ptr1_num1 = &num1;
    int const *ptr2_num1 = &num1;
    ptr1_num1 = &num2; // OK
    // *ptr1_num1 = 1234; // error: *ptr1_num1 is const
    int *const ptr3_num1 = &num1;
    // ptr3_num1 = ptr2_num1; // error: ptr2_num1 is const
}

// 第二类：const 修饰函数参数
void ConstTest1(const int num)
{
    // num = 123; // error: 传递来的参数 num 在函数体内不可改变
}

// 不能修改传入的引用
void ConstTest2(const string &str)
{
    // str = "123"; // error: 传递来的参数 str 在函数体内不可改变
}

class Computer
{
public:
    Computer(int core) { this->_core = core; }
    void buy() {}
    // const 说明不会修改成员变量
    int GetCore() const { return this->_core; }

private:
    int _core;
};
void ConstTest3(const Computer &computer)
{
    // computer.buy(); // error: 传递来的 const computer 在函数体内不可改变
}

// 第三类：const 修饰返回值
// 使用 const 修饰引用类型的常见原因就是提高效率
const Computer &GetMax(const Computer &computer1, const Computer &computer2)
{
    if (computer1.GetCore() > computer2.GetCore())
    {
        return computer1;
    }
    else
    {
        return computer2;
    }
}

```

```cpp
#include <iostream>
using namespace std;

class ConstExample {
private:
  int m_X;
  int *m_Y;
  mutable int m_var1;

public:
  // 函数不修改类内部任何东西
  int GetX() const { return m_X; }

  // 1、返回不可修改的指针 2、指针的内容不可修改
  // 3、这个方法承诺不修改类内部任何值
  const int *const GetY() const { return m_Y; }

  // 如果类成员被标记为 m_var1，const 方法内也是可以修改的
  int GetVar1() const {
    m_var1++;
    return m_var1;
  }
};

int main() {
  const int MAX_AGE = 100;

  int *a = new int;
  *a = 2; // 能修改内容
  // 也能修改指针地址
  // (int *)是因为【const int *】不能分配给【int *】，类似于 TS 类型指定
  a = (int *)&MAX_AGE;
  std::cout << *a << std::endl;

  // 下面两行等价
  const int *b = new int;
  int const *c = new int;
  // *b = 3; // 不能修改指针的内容
  b = (int *)&MAX_AGE; // 可以修改指针的地址

  // 不可修改指针地址
  int *const d = new int;
  *d = 4; // 可以修改指针的内容
  // d = (int *)&MAX_AGE; // 不能就该指针的指向

  // Lambuda 表达式中的 mutable
  int x = 8;
  auto f = [=]() mutable
  {
    x++;
    std::cout << x << std::endl;
  };
  f();
}

```

## constructor 初始化参数

```cpp
#include <iostream>
using namespace std;

class Entity {
private:
  std::string m_Name;

public:
  Entity() : m_Name("Unknow") {}
  Entity(const std::string &name) : m_Name(name) {}

  std::string getName() {
    return m_Name;
  }
};

int main() {
  Entity e1;
  Entity e2("Chenng");

  std::cout << e1.getName() << std::endl;
  std::cout << e2.getName() << std::endl;
}

```

## operator 修改操作符

```cpp
#include <iostream>
using namespace std;

struct Vector2 {
  float x, y;

  Vector2(float x, float y) : x(x), y(y) {}

  Vector2 Add(const Vector2 &other) const {
    return Vector2(x + other.x, y + other.y);
  }

  Vector2 operator+(const Vector2 &other) const { return Add(other); }

  bool operator==(const Vector2 &other) const {
    return other.x == x && other.y == y;
  }
};

int main() {
  Vector2 position(0.5f, 0.6f);
  Vector2 speed(0.3f, 0.3f);

  // 主动调用
  Vector2 res1 = position.Add(speed);
  std::cout << res1.x << std::endl;
  // 通过 operator+ 调用
  Vector2 res2  = position + speed;
  std::cout << res2.x << std::endl;
  
  // 通过 operator== 调用
  bool isEqual = position == speed;
  std::cout << isEqual << std::endl;
}

```

## this 用法

```cpp
#include <iostream>
using namespace std;

class Entity {
public:
  int x, y;
  // 参数名字和类成员一模一样，不能使用 x = x，引入 this
  Entity(int x, int y) {
    this->x = x;
    this->y = y;

    // 也可以换个写法
    // (*this).x = x;
    // (*this).y = y;
  }
};

int main() {
  Entity e(1, 2);
  std::cout << e.x << std::endl;
}

```

## SMART POINTERS: std::unique_ptr, std::shared_ptr, std::weak_ptr

```cpp
#include <iostream>
#include <memory>

// SMART POINTERS: std::unique_ptr, std::shared_ptr, std::weak_ptr

class Entity {
private:
  std::string m_Type;

public:
  Entity(const std::string &type) : m_Type(type) {
    std::cout << "Created Entity " << m_Type << std::endl;
  }

  ~Entity() { std::cout << "Destroyed Entity " << m_Type << std::endl; }

  void Print() { std::cout << "Print " << m_Type << std::endl; }
};

int main() {
  // 使用了 new 但是超出作用域后会自动析构

  std::shared_ptr<Entity> sharedEntity1;

  std::weak_ptr<Entity> weakEntity1;

  {
    // std::unique_ptr 两种初始化方法
    std::unique_ptr<Entity> uniqueEntity1(new Entity("unique"));
    uniqueEntity1->Print();
    std::unique_ptr<Entity> uniqueEntity2 = std::make_unique<Entity>("unique");
    uniqueEntity2->Print();

    // std::shated_ptr
    std::shared_ptr<Entity> sharedEntity2 = std::make_shared<Entity>("shared");
    sharedEntity1 = sharedEntity2;
    sharedEntity1->Print();

    // std::weak_ptr，不会增加引用计数
    weakEntity1 = sharedEntity2;
  }
}

```

## memcpy 复制传递与地址传递

```cpp
#include <iostream>
#include <memory>

struct Vector2 {
  float x, y;
};

class String {
private:
  char *m_Buffer;
  unsigned int m_Size;

public:
  String(const char *string) {
    m_Size = strlen(string);
    m_Buffer = new char[m_Size];
    memcpy(m_Buffer, string, m_Size);
  }

  friend std::ostream &operator<<(std::ostream &stream, const String &string);

  ~String() { delete[] m_Buffer; }

  // 禁止使用 constructor copy
  // String str2 = str1;
  // String(const String &ohter) = delete;

  // deep copy
  String(const String &other) : m_Size(other.m_Size) {
    m_Buffer = new char[m_Size];
    memcpy(m_Buffer, other.m_Buffer, m_Size);
  }
};

std::ostream &operator<<(std::ostream &stream, const String &string) {
  stream << string.m_Buffer;
  return stream;
}

int main() {
  // 复制传递，修改 b 不会影响 a
  Vector2 a = {2, 3};
  Vector2 b = a;
  b.x = 5;
  std::cout << a.x << std::endl;

  // 地址传递
  Vector2 *c = new Vector2();
  Vector2 *d = c;
  d->x = 5;
  std::cout << c->x << std::endl;

  String str1 = "Chenng";
  String str2 = str1;
  std::cout << str1 << std::endl;
}

```

## local static 静态变量

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

void Func() {
  static int i = 0; // 全局变量，等价于把 int i 移动到函数外面
  i++;
  std::cout << i << std::endl;
}

class Singleton {
public:
  static Singleton &Get() {
    static Singleton instance;
    return instance;
  }
  void Hello() { std::cout << "Hello" << std::endl; }
};

int main() {
  for (int i = 0; i < 5; i++) {
    Func();
  }

  Singleton::Get().Hello();
}

```

## tuple 或 struct 函数多数据返回

```cpp
#include <iostream>

std::tuple<std::string, std::string> FunctionWithTupleReturn() {
  std::string string1 = "string1";
  std::string string2 = "string2";

  return std::make_pair(string1, string2);
}

struct StructReturnValue {
  std::string key1;
  std::string key2;
};
StructReturnValue FunctionWithStructReturn() {
  std::string string1 = "string1";
  std::string string2 = "string2";
  return { string1, string2 };
}

int main() {
  auto tupleReturn = FunctionWithTupleReturn();
  std::string value0 = std::get<0>(tupleReturn);
  std::cout << value0 << std::endl;

  auto structReturn = FunctionWithStructReturn();
  std::cout << structReturn.key2 << std::endl;
}

```

## tuple structured bindings

```cpp
#include <iostream>
#include <tuple>

std::tuple<std::string, int> CreatePerson() {
  return {"Chenng", 29};
}

int main() {
  // C++17 支持的特性，干净整洁明了的使用 tuple
  auto[name, age] = CreatePerson();
  std::cout << name << " " << age << std::endl;
}

```

## std::optional Deal with OPTIONAL Data 

```cpp
#include <iostream>
#include <optional>
#include <fstream>

std::optional<std::string> ReadFileAsString(const std::string& file_path) {
  std::ifstream file(file_path);
  if (!file.is_open()) {
    return std::nullopt;
  }
  std::string content((std::istreambuf_iterator<char>(file)),
                      (std::istreambuf_iterator<char>()));
  return content;
};

int main() {
  std::optional<std::string> content = ReadFileAsString("compile_commands.json");
  // 这里可以直接判断
  if (content) {
    std::cout << *content << std::endl;
  } else {
    std::cout << "File not found" << std::endl;
  }
}

```

## template

```cpp
#include <iostream>
#include <string>

// 不用写三个类型重载函数
template <typename T> void Print(T value) { std::cout << value << std::endl; }

template <typename T, int N> class Array {
private:
  T m_data[N];

public:
  int GetSize() const { return N; }
};

int main() {
  Print(5);
  Print("Hello");
  Print(5.5f);

  Array<int, 5> int_arr;
  std::cout << int_arr.GetSize() << std::endl;
  Array<std::string, 10> str_arr;
  std::cout << str_arr.GetSize() << std::endl;
}

```

## macros 定义宏

```cpp
#include <iostream>
#include <string>

// 定义宏
#ifndef NDEBUG
#define LOG(x) std::cout << x << std::endl
#else
#define LOG(x)
#endif

int main() {
  LOG("Hello, World!");
}

```

## lambda 表达式

```cpp
#include <iostream>
#include <vector>

void ForEach(const std::vector<int> &values, void (*func)(int)) {
  for (int value : values) {
    func(value);
  }
}

int main() {
  std::vector<int> values = {1, 2, 3, 4, 5};
  // https://en.cppreference.com/w/cpp/language/lambda
  auto lambda = [](int value) { std::cout << value << std::endl; };
  ForEach(values, lambda);
}

```

## Threads 多线程

```cpp
#include <iostream>
#include <thread>

static bool s_Finished = false;

void DoWork() {
  using namespace std::literals::chrono_literals;

  std::cout << "Started thread id=" << std::this_thread::get_id() << std::endl;

  while (!s_Finished) {
    std::cout << "Doing work..." << std::endl;
    std::this_thread::sleep_for(1s);
  }
}

int main() {
  std::thread worker(DoWork);

  std::cin.get();

  s_Finished = true;

  worker.join();

  std::cout << "Finished" << std::endl;
  std::cout << "Started thread id=" << std::this_thread::get_id() << std::endl;

  std::cin.get();
}

```

## Timing 计时器

```cpp
#include <iostream>
#include <thread>
#include <chrono>

// 封装快捷记录函数时间的方法
struct Timer {
  std::chrono::time_point<std::chrono::steady_clock> start, end;
  std::chrono::duration<float> duration;

  Timer() {
    start = std::chrono::high_resolution_clock::now();
  }

  ~Timer() {
    end = std::chrono::high_resolution_clock::now();
    duration = end - start;

    float ms = duration.count() * 1000.0f;
    std::cout << "Time: " << ms << "ms" << std::endl;
  }
};

void Print() {
  Timer timer;
  for (int i = 0; i < 100; i++) {
    std::cout << "Hello" << std::endl;
  }
}

int main() {
    std::cout << "Hello, World!" << std::endl;

    auto start = std::chrono::high_resolution_clock::now();
    // std::this_thread::sleep_for(std::chrono::seconds(1));
    Print();
    auto end = std::chrono::high_resolution_clock::now();

    std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() << "ms" << std::endl;
    std::cout << std::chrono::duration_cast<std::chrono::microseconds>(end - start).count() << "us" << std::endl;
}

```

## 2d array 二维数组

```cpp
#include <iostream>

int main() {
  int **array2d = new int *[3];
  for (int i = 0; i < 3; i++) {
    array2d[i] = new int[3];
  }

  array2d[0][0] = 1;

  std::cout << array2d[0][0] << std::endl;

  // release memory
  for (int i = 0; i < 3; i++) {
    delete[] array2d[i];
  }
}

```

## sorting 排序

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

int main() {
  std::vector<int> values = {1, 5, 3, 4, 2};

  // 从小到大排序
  std::sort(values.begin(), values.end());
  for(auto value : values) {
    std::cout << value << " ";
  }

  std::cout << std::endl;

  // 从大到小排序
  std::sort(values.begin(), values.end(), std::greater<int>());
  for(auto value : values) {
    std::cout << value << " ";
  }

  std::cout << std::endl;

  // 迭代器排序
  std::sort(values.begin(), values.end(), [](int a, int b) {
    return a < b;
  });
  for(auto value : values) {
    std::cout << value << " ";
  }
}

```

## type punning 类型转换

```cpp
#include <iostream>

int main() {
  int a = 5;
  float b = (float)a;

  // -exec x &a
  // -exec x &b
  // a 和 b 的地址不一样

  std::cout << b << std::endl;  
}

```

## dynamic_cast

```cpp
#include <iostream>

class Entity {
public:
  virtual void printName() {}
};

class Player : public Entity {};

class Enemy : public Entity {};

int main() {

  Player *player = new Player();
  Enemy *enemy = new Enemy();

  Player *p0 = dynamic_cast<Player *>(player);
  if (p0) {
    // 类似于 JS 的 player instanceof Player
  }
  // enemy instanceof Player
  if (dynamic_cast<Player *>(enemy)) {
  }
}

```

# 应用

## 获取文件路径

```cpp
#include <iostream>

std::string path = "/home/user/file.txt";
std::string::size_type iPos = path.find_last_of('/') + 1;
std::string filename = path.substr(iPos, path.length() - iPos);
std::cout << "文件名字：" << filename.c_str() << std::endl;

std::string dirpath = path.substr(0, iPos);
std::cout << "文件所在目录：" << dirpath.c_str() << std::endl;

std::string filenameWithouPostfix = filename.substr(0, filename.find_last_of('.'));
std::cout << "不带后缀的文件名：" << filenameWithouPostfix.c_str() << std::endl;
```

## 解析命令行参数

```cpp
#include <iostream>
#include <unistd.h>

int main(int argc, char *argv[])
{
    int c = 0;
    std::string input_i;
    // 循环处理参数
    while (EOF != (c = getopt(argc, argv, "i:")))
    {
        switch (c)
        {
        // 入参地址，带有冒号为必填参数
        case 'i':
            printf("获取 -i, 值是 %s\n", optarg);
            input_i = std::string(optarg);
            break;
        //表示选项不支持
        case '?':
            printf("未知参数: %c\n", optopt);
            break;
        default:
            break;
        }
    }
}
```

## 不存在则创建文件夹

```cpp
#include <iostream>
#include <unistd.h>
#include <sys/stat.h>

int main()
{
    std::string prefix = "./dir";
    if (access(prefix.c_str(), 0) == -1) // 如果文件夹不存在
        mkdir(prefix.c_str(), S_IRWXU);  // 则创建
}
```

## 测试计算机运算速度

```cpp
#include <chrono>
#include <iostream>

// O(n)
void function1(long long n) {
  long long k = 0;
  for (long long i = 0; i < n; i++) {
    k++;
  }
}

// O(n^2)
void function2(long long n) {
  long long k = 0;
  for (long long i = 0; i < n; i++) {
    for (long j = 0; j < n; j++) {
      k++;
    }
  }
}

// O(nlongn)
void function3(long long n) {
  long long k = 0;
  for (long long i = 0; i < n; i++) {
    for (long long j = 0; j < n; j = j * 2) {
      k++;
    }
  }
}

int main() {
  long long n = 1000000000; // 数据规模
  std::chrono::milliseconds start_time =
      std::chrono::duration_cast<std::chrono::milliseconds>(
          std::chrono::system_clock::now().time_since_epoch());
  function1(n);
  //        function2(n);
  //        function3(n);
  std::chrono::milliseconds end_time =
      std::chrono::duration_cast<std::chrono::milliseconds>(
          std::chrono::system_clock::now().time_since_epoch());
  std::cout << "耗时:"
            << std::chrono::milliseconds(end_time).count() -
                   std::chrono::milliseconds(start_time).count()
            << " ms" << std::endl;
}

```