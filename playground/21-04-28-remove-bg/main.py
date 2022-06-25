from PIL import Image
from os import path

curr_dir = path.dirname(__file__)
imgInputPath = path.abspath(
    path.join(curr_dir, './01-in.png')
)
imgOutputPath = path.abspath(
    path.join(curr_dir, './01-out.png')
)


img = Image.open(imgInputPath)
img = img.convert("RGBA")  # 转换获取信息
pixdata = img.load()

# 白色背景
# for y in range(img.size[1]):
#     for x in range(img.size[0]):
#         if pixdata[x, y][0] > 220 and pixdata[x, y][1] > 220 and pixdata[x, y][2] > 220 and pixdata[x, y][3] > 220:
#             pixdata[x, y] = (255, 255, 255, 0)

# 黑色背景
BLACK_PLACE_HOLDER = 120
for y in range(img.size[1]):
    for x in range(img.size[0]):
        if pixdata[x, y][0] < BLACK_PLACE_HOLDER and pixdata[x, y][1] < BLACK_PLACE_HOLDER and pixdata[x, y][2] < BLACK_PLACE_HOLDER and pixdata[x, y][3] > 240:
            pixdata[x, y] = (255, 255, 255, 0)

img.save(imgOutputPath)
