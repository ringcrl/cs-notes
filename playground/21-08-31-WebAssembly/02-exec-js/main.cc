#include <string>
#include <emscripten/bind.h>
#include <emscripten.h>


int main() {
  EM_ASM(
    const href = location.href;
    if (href.includes('127.0.0.1')) {
      console.log('是127.0.0.1');
    } else {
      console.log('不是127.0.0.1');
    }
  );
  return 0;
}
