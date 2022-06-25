import cv2
import numpy as np

# load image as grayscale
img = cv2.imread('21-04-28-remove-bg/01-in.png')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# threshold 
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
hh, ww = thresh.shape

# make bottom 2 rows black where they are white the full width of the image
thresh[hh-3:hh, 0:ww] = 0

# get bounds of white pixels
white = np.where(thresh==255)
xmin, ymin, xmax, ymax = np.min(white[1]), np.min(white[0]), np.max(white[1]), np.max(white[0])
print(xmin,xmax,ymin,ymax)

# crop the image at the bounds adding back the two blackened rows at the bottom
crop = img[ymin:ymax+3, xmin:xmax]

# save resulting masked image
cv2.imwrite('xray_chest_thresh.png', thresh)
cv2.imwrite('xray_chest_crop.png', crop)

# display result
cv2.imshow("thresh", thresh)
cv2.imshow("crop", crop)
cv2.waitKey(0)
cv2.destroyAllWindows()