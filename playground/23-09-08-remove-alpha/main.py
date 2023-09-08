from PIL import Image

# 打开 PNG 图像
image = Image.open('input.png')

# 创建一个新的相同尺寸的图像，背景为蓝色
new_image = Image.new('RGBA', image.size, (0, 0, 255, 255))

# 将原始图像复制到新图像上，透明部分会显示出蓝色背景
new_image.paste(image, (0, 0), image)

# 保存处理后的图像
new_image.save('output.png')
