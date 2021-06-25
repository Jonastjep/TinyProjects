import cv2, math
from skimage.draw import line
from statistics import mean
import numpy as np

img = cv2.imread("images/stock6.jpg")
img = cv2.resize(img,(900,900))
img_bw = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

background = np.empty((900,900))
background.fill(255)

h, w = background.shape

nb_points = 400
it_nb = 1200

points_cart = []

for i in range(nb_points):
    #calculate the point location with trig
    point = (round(w/2+math.cos(i*2*math.pi/nb_points)*(h/2-0.01*h)),round(h/2+math.sin(i*2*math.pi/nb_points)*(h/2-0.01*h)))
    points_cart.append(point)

    #draw the points
    background = cv2.circle(background,point,3,0,-1)

ini_pt = points_cart[0]
prev_pt = None

for i in range(it_nb):
    avg = {}
    for pt in points_cart:
        if pt == ini_pt:
            continue
        avg[mean([img_bw[vals] for vals in list(zip(*line(ini_pt[1],ini_pt[0],pt[1],pt[0])))])] = pt

    #takes the minimum average (darkest path)
    max_pt = avg[min(avg)]

    background = cv2.line(background,ini_pt,max_pt,0,1)
    img_bw = cv2.line(img_bw,ini_pt,max_pt,255,1)

    ini_pt = max_pt

    print(str(i)+"/"+str(it_nb), end="\r")
print(str(i+1)+"/"+str(it_nb))

cv2.imshow("BW Image",background)

cv2.waitKey(0)
cv2.destroyAllWindows()
