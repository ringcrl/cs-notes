#include <napi.h>
#include "actualclass.h"

// 任何需要导出到 JS 世界的东西都需要用 N-API 包装

// 第一步是创建一个扩展 Napi::ObjectWrap<ClassExample> 的包装类
class ClassExample : public Napi::ObjectWrap<ClassExample>
{
public:
  // 就像函数一样，我们需要一个 Init 方法来设置导出的key
  static Napi::Object Init(Napi::Env env, Napi::Object exports); // 将导出键设置为JS的INIT函数
  ClassExample(const Napi::CallbackInfo &info);                  // 初始化的构造函数
  ActualClass *GetInternalInstance();                            // 获取原始实例

private:
  // 静态 Napi::FunctionReference 构造函数
  static Napi::FunctionReference constructor;           // 引用存储需要导出到JS的类定义
  Napi::Value GetValue(const Napi::CallbackInfo &info); // 包装getValue函数
  Napi::Value Add(const Napi::CallbackInfo &info);      // 包装add功能
  ActualClass *actualClass_;                            // 实际操作的内部Class
};
