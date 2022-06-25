#include "classexample.h"

Napi::FunctionReference ClassExample::constructor;

// ClassExample::Init 函数负责创建和设置导出密钥。这里我们将类作为 ClassExample 导出到 JS 端
Napi::Object ClassExample::Init(Napi::Env env, Napi::Object exports)
{
  Napi::HandleScope scope(env);

  // func 用于定义将导出到 JS 的类，然后将 func 分配给构造函数，这是 c++ 中的静态函数引用
  // 这是前面定义的静态 Napi::FunctionReference 构造函数的地方
  // 与InstanceMethod类似，NAPI中定义了各种方法来导出不同类型的类方法
  // 静态方法可以使用 StaticMethod 导出
  // env 是表示 JavaScript 运行时的独立实例的环境
  Napi::Function func = DefineClass(env, "ClassExample", {
                                                             InstanceMethod("add", &ClassExample::Add),
                                                             InstanceMethod("getValue", &ClassExample::GetValue),
                                                         });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("ClassExample", func);
  return exports;
}

ClassExample::ClassExample(const Napi::CallbackInfo &info) : Napi::ObjectWrap<ClassExample>(info)
{
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();
  if (length != 1 || !info[0].IsNumber())
  {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
  }

  Napi::Number value = info[0].As<Napi::Number>();
  this->actualClass_ = new ActualClass(value.DoubleValue());
}

Napi::Value ClassExample::GetValue(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  double num = this->actualClass_->getValue();
  return Napi::Number::New(env, num);
}

Napi::Value ClassExample::Add(const Napi::CallbackInfo &info)
{
  // 这里首先使用来自 env 的信息检查输入参数
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (info.Length() != 1 || !info[0].IsNumber())
  {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
  }

  // 要从 JS 端读取一个值，我们像 info[0].As<Napi::Number>(); 一样读取它
  Napi::Number toAdd = info[0].As<Napi::Number>();
  // 因为 C++ 是一种强类型语言，而 JS 不是。我们必须将从 JS 端获得的每个值转换为适当的类型
  // 在我们转换值之后，我们只需调用内部的 actualClass 实例并返回值
  double answer = this->actualClass_->add(toAdd.DoubleValue());

  // 但由于该值是双精度值，我们需要用 Napi::Number 实例包装它，以便将其传递给 JS 端
  return Napi::Number::New(info.Env(), answer);
}

ActualClass* ClassExample::GetInternalInstance() {
  return this->actualClass_;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
  // 可以同时存在
  // functionexample::Init(env, exports);

  return ClassExample::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
