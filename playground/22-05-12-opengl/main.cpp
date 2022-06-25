#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

void processInput(GLFWwindow *window)
{
  if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
    glfwSetWindowShouldClose(window, true);
}


int main(void)
{
  GLFWwindow *window;
  // 使用 glfwInit 初始化 GLFW
  if (!glfwInit())
    return -1;

  // 创建一个窗口模式窗口及其OpenGL上下文
  window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
  if (!window)
  {
    glfwTerminate();
    return -1;
  }
  // 告诉 GLFW 将我们窗口的上下文作为当前线程的主上下文
  glfwMakeContextCurrent(window);

  // glew 一定要在创建了 OpenGL 上下文之后再调用初始化
  // 调用了这里才能够访问所有 OpenGL 方法
  if (glewInit() != GLEW_OK)
  {
    std::cout << "Failed to initialize GLEW" << std::endl;
    return -1;
  }

  // 查看当前 GL 版本
  std::cout << glGetString(GL_VERSION) << std::endl;

  float position[6] = {
    -0.5f, -0.5f, // 顶点1
    0.0f, 0.5f, // 顶点2
    0.5f, -0.5f // 顶点3
  };

  // opengl 世界都是 id
  unsigned int buffer;
  glGenBuffers(1, &buffer);
  // 选择某个 id 叫做 binding
  glBindBuffer(GL_ARRAY_BUFFER, buffer);
  glBufferData(GL_ARRAY_BUFFER, 6 * sizeof(float), position, GL_STATIC_DRAW);
  glEnableVertexAttribArray(0);

  glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 2 * sizeof(float), (void *)0);
  glBindBuffer(GL_ARRAY_BUFFER, 0);

  // 循环直到用户关闭窗口
  while (!glfwWindowShouldClose(window))
  {
    // 先潜孔画布
    glClear(GL_COLOR_BUFFER_BIT);

    // 一个绿色背景
    glClearColor(0.2f, 0.3f, 0.3f, 1.0f);

    // 绘制当前绑定的一个，循环外绑定的
    glDrawArrays(GL_TRIANGLES, 0, 3);

    // 注册键盘事件
    processInput(window);
    // 交换前后缓冲区
    glfwSwapBuffers(window);
    // glfwPollEvents 函数检查是否触发了任何事件（如键盘输入或鼠标移动事件），更新窗口状态，并调用相应的函数
    glfwPollEvents();
  }

  glfwTerminate();
  return 0;
}
