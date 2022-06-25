# PAG 文档

https://pag.io/docs/ae-support.html

# AE 基础使用

## 图层 (Layer Types)

### 虚拟对象 (Null Object)

位置：图层 -> 新建 -> 空对象

作用：可以把其他对象关联到空对象，通过空对象来成组操作所有关联的对象

### 实色图层 (Solid Layer)

### 文字图层 (Text Layer)

### 形状图层 (Shape Layer)

### 预合成图层 (PreCompose Layer)

### 图片图层 (Image Layer)

## 变换 (Transforms)

### 关键帧

添加关键帧贝塞尔曲线：右键关键帧 -> 关键帧差值 -> 贝塞尔曲线

### 定位点 (Anchor Point)

### 位置 (Position)

### 位置分离 XY 轴 (Position Separated X/Y )

### 缩放 (Scale)

### 旋转 (Rotation)

### 透明度 (Opactiy)

注：不支持整体透明度(可能产生叠影)，只支持分散到各个图层的透明度

## 混合模式 (Blend Modes)

### 正常 (Normal)

### 变暗 (Darken)

### 相乘 (Multiply)

### 颜色加深 (ColorBurn)

### 相加（Add）

### 变亮 (Lighten)

### 屏幕 (Screen)

### 颜色减淡 (ColorDodge)

### 叠加 (Overlay)

### 柔光 (SoftLight)

### 强光 (HardLight)

### 差值 (Difference)

### 排除 (Exclusion)

### 色相 (Hue)

### 饱和度 (Saturation)

### 颜色 (Color)

### 发光度 (Luminosity)

## 轨道遮罩 (Track Mattes)

注：均可支持半透明擦除

### Alpha 遮罩 (Alpha Matte)

### Alpha 反转遮罩 (Alpha Inverted Matte)

## 蒙版 (Masks)

注：不支持 mask 的 alpha 属性

### 蒙版路径 (Mask Path)

### 蒙版扩展 (Mask Expansion)

### 蒙版模式 (Mask Modes)

无 (None)
相加 (Add)
相减 (Subtract)
交集 (Intersect)
差值 (Difference)

## 图层样式 (Layer Styles)

### 投影 (Drop Shadow)

颜色 (Color)
不透明度 (Opacity)
角度 (Angle)
距离 (Distance)
扩展（Spread）
大小 (Size)

## 特效 (Effect)

### 运动模糊 (Motion Blur)

效果 -> CC Force Motion Blur

### 高斯模糊（Gaussian Blur）

效果 -> 高斯模糊

### 凹凸效果 (Bulge)

### 辉光效果 (Glow)

### 色阶控制 (Levels Individual Controls)

### 边角定位 (Corner Pin)

### 动态拼贴 (Motion Tile)

### 置换效果（Displacement Map）

注：暂要求将置换图层修改为预合成图层并改合成名为"\_bmp"后缀

### 径向模糊 (Radial Blur)

### 马赛克 (Mosaic)

## 其他图层属性 (Others Layer Properties)

### 图层父级 (Layer Parenting)

## 形状图层 (Shapes)

### 组 (Group)

### 矩形 (Rectangle)

### 椭圆 (Ellipse)

### 多边星形 (Polystar)

### 路径 (Path)

### 填充 (Fill)

### 描边 (Stroke)

### 合并路径 (Merge Paths)

### 中继器 (Repeater)

### 修剪路径 (Trim Paths)

### 圆角 (Round Corners)

### 渐变填充 (Gradient Fill)

### 渐变描边 (Gradient Stroke)

## 文本图层 (Texts)

### 源文本 (SourceText)

基线偏移 (Baseline Shift)
点文本 (Point Text)
带框文本 (Box Text)
仿粗体 (Faux Bold)
仿斜体 (Faux Italic)
文本颜色 (Fill Color)
字体名称 (Font Family)
字体样式 (Font Style)
字号 (Font Size)
描边颜色 (Stroke Color)
描边宽度 (Stroke Width)
交换图层和描边 (Stroke Over Fill)
行距 (Leading)
字间距 (Tracking)
文本对齐 (Paragraph Justification)
左对齐 (Left)
居中对齐 (Center)
右对齐 (Right)
最后一行左对齐 (Full Justify Last Line Left)
最后一行居中对齐 (Full Justify Last Line Center)
最后一行右对齐 (Full Justify Last Line Right)
两端对齐 (Full Justify Last Line Full)

### 动画制作工具（Animates）

### 属性

#### 字间距（Tracking）

字符间距类型（Track Type）
字符间距大小（Tracking Amount）

#### 位置（Position）

#### 旋转（Rotation）

#### 缩放（Scale）

#### 不透明度（Opacity）

### 范围选择器（Range Selector）

起始（Start）
结束（End）
偏移（Offset）
单位（Units）: (仅支持默认值"百分比")
依据（Based On）:（仅支持默认值"字符"）
模式（Mode）
数量（Amount）
形状（Shape）
平滑度（Smoothness）: (仅支持默认值 100%)
缓和高（Ease High）:（仅支持默认值 0%）
缓和低（Ease Low）:（仅支持默认值 -100%）
随机排序（Randomize Order）
随机植入（Random Seed）

### 摆动选择器（Wiggly Selector）

模式（Mode）
最大量（Max Amount）
最小量（Min Amount）
依据（Based On）:（仅支持默认值"字符"）
摇摆/秒（Wiggly Per Secend）
关联（Correlation）
时间相位（Temporal Phase）
空间相位（Spatial Phase）
随机植入（Random Seed）
(支持多个动画制作工具/属性/选择器的叠加)
