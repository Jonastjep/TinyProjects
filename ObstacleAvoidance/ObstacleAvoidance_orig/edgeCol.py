############# POLYGONE POLYGONE CONTACT (NO RECT) ##################
def polyPoint(vertices, px, py):
    collision = False
    next = 0
    for current in range(len(vertices)):
        next = current + 1
        if next == len(vertices):
            next = 0
        vc = vertices[current]
        vn = vertices[next]
        
        if (((vc.y > py and vn.y < py) or (vc.y < py and vn.y > py)) and (px < (vn.x - vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)):
            collision = not collision
    return collision

def lineLine(x1, y1, x2, y2, x3, y3, x4, y4):
    print(x1, y1, x2, y2, x3, y3, x4, y4)
    uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    
    if (uA >= 0 and uA <= 1 and uB >= 0 and uB <= 1):
        return True
    return False

def polyLine(vertices, x1, y1, x2, y2):
    next = 0
    for current in range(len(vertices)):
        next = current + 1
        if next == len(vertices):
            next = 0
        x3 = vertices[current].x
        y3 = vertices[current].y
        x4 = vertices[next].x
        y4 = vertices[next].y
        
        hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
        if hit:
            return True
    return False

def polyPoly(p1, p2): #p1 = ObsPoly p2 is vehicle
    next = 0
    for current in range(len(p1)):
        next = current + 1
        if next == len(p1):
            next = 0
        vc = p1[current]
        vn = p1[next]
        
        collision = polyLine(p2, vc.x,vc.y,vn.x,vn.y)
        if collision:
            return True
        collision = polyPoint(p1, p2[0].x, p2[0].y)
        if collision:
            return True
    return False

####################### RECTANGLE POLYGONE CONTACT ###############################

def polyRect(vertices, rx, ry, rw, rh):
    next = 0
    for current in range(len(vertices)):
        next = current + 1
        if next == len(vertices):
            next = 0
            
        vc = vertices[current]
        vn = vertices[next]
        
        collision = lineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh)
        if collision:
            return True
        return False
        
def lineRect(x1, y1, x2, y2, rx, ry, rw, rh):
    left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh)
    right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh)
    top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry)
    bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh)
    
    if (left or right or top or bottom):
        return True
    return False
        
def lineLine(x1, y1, x2, y2, x3, y3, x4, y4):
    uA = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / ((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))
    uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    
    if (uA >= 0 and uA <= 1 and uB >= 0 and uB <= 1):
        return True
    return False

    

def circleRect(cx,cy,radius,rx,ry,rw,rh):
    textX = cx
    testY = cy
    
    if cx < rx:
        testX = rx
    elif cx > rx+rw:
        testX = rx+rw
    if cy < ry:
        testY = ry
    elif cy > ry+rh:
        testY = ry+rh
        
    distX = cx-testX
    distY = cy-testY
    
    distance = sqrt( (distX*distX) + (distY*distY) )
    
    if distance <= radius:
        return true
    return false
