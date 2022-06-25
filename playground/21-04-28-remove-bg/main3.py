import cv2
import numpy as np
import skimage.exposure
from os import path

curr_dir = path.dirname(__file__)
imgInputPath = path.abspath(
    path.join(curr_dir, './01-in.png')
)

# load image
img = cv2.imread(imgInputPath)

# convert to gray
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# threshold
thresh = cv2.threshold(gray, 11, 255, cv2.THRESH_BINARY)[1]

# apply morphology to clean small spots
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))
morph = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, borderType=cv2.BORDER_CONSTANT, borderValue=0)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))
morph = cv2.morphologyEx(morph, cv2.MORPH_CLOSE, kernel, borderType=cv2.BORDER_CONSTANT, borderValue=0)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))
morph = cv2.morphologyEx(morph, cv2.MORPH_ERODE, kernel, borderType=cv2.BORDER_CONSTANT, borderValue=0)

# get external contour
contours = cv2.findContours(morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours = contours[0] if len(contours) == 2 else contours[1]
big_contour = max(contours, key=cv2.contourArea)

# draw white filled contour on black background as mas
contour = np.zeros_like(gray)
cv2.drawContours(contour, [big_contour], 0, 255, -1)

# blur dilate image
blur = cv2.GaussianBlur(contour, (5,5), sigmaX=0, sigmaY=0, borderType = cv2.BORDER_DEFAULT)

# stretch so that 255 -> 255 and 127.5 -> 0
mask = skimage.exposure.rescale_intensity(blur, in_range=(127.5,255), out_range=(0,255))

# put mask into alpha channel of input
result = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
result[:,:,3] = mask

# save output
cv2.imwrite('aerial_image_thresh.png', thresh)
cv2.imwrite('aerial_image_morph.png', morph)
cv2.imwrite('aerial_image_contour.png', contour)
cv2.imwrite('aerial_image_mask.png', mask)
cv2.imwrite('aerial_image_antialiased.png', result)


# Display various images to see the steps
cv2.imshow('thresh', thresh)
cv2.imshow('morph', morph)
cv2.imshow('contour', contour)
cv2.imshow('mask', mask)
cv2.imshow('result', result)

cv2.waitKey(0)
cv2.destroyAllWindows()
