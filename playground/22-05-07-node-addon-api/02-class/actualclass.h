class ActualClass
{
public:
  ActualClass(double value); // 构造函数
  double getValue();         // 获取值的函数
  double add(double toAdd);  // add方法更改私有属性
private:
  double value_;
};
