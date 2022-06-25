#include <napi.h>
#include "main.h"

// 原始函数
// std::string hello(){
//   return "Hello World";
// }

// int add(int a, int b){
//   return a + b;
// }

// 对于我们想要导出的 C++ 中的每个函数
// 我们基本上将创建一个 NAPI 包装函数（在此示例中为 HelloWrapped）并使用 Init 将其添加到导出对象中
std::string functionexample::hello()
{
  return "Hello World";
}
// 每个包装函数都将 CallbackInfo 作为输入参数。这包含需要传递给函数的上下文和输入参数等内容。
Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  Napi::String returnValue = Napi::String::New(env, functionexample::hello());

  return returnValue;
}

int functionexample::add(int a, int b)
{
  return a + b;
}
Napi::Number functionexample::AddWrapped(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber())
  {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
  }

  Napi::Number first = info[0].As<Napi::Number>();
  Napi::Number second = info[1].As<Napi::Number>();

  int returnValue = functionexample::add(first.Int32Value(), second.Int32Value());

  return Napi::Number::New(env, returnValue);
}

// Init 函数用于将导出键设置为 hello 并带有相应的包装函数 HelloWrapped 。
Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports)
{
  exports.Set("hello", Napi::Function::New(env, functionexample::HelloWrapped));
  exports.Set("add", Napi::Function::New(env, functionexample::AddWrapped));

  return exports;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
  return functionexample::Init(env, exports);
}

NODE_API_MODULE(testaddon, InitAll)
