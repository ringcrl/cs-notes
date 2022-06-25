import cv2
from os import path

file_name ="./1.png"

curr_dir = path.dirname(__file__)
imgInputPath = path.abspath(
    path.join(curr_dir, './01-in.png')
)
imgOutputPath = path.abspath(
    path.join(curr_dir, './01-out.png')
)

src = cv2.imread(imgInputPath, 1)
tmp = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
_,alpha = cv2.threshold(tmp,120,255,cv2.THRESH_BINARY)
b, g, r = cv2.split(src)
rgba = [b,g,r, alpha]
dst = cv2.merge(rgba,4)
cv2.imwrite(imgOutputPath, dst)
