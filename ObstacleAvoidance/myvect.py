import math

class MyVect(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x**2 + y**2)

        if x > 0 and y > 0:
            self.angle = math.atan(y/x)
        elif (x < 0 and y > 0) or (x < 0 and y < 0):
            self.angle = math.atan(y/x) + math.pi
        elif (x > 0 and y < 0):
            self.angle = math.atan(y/x) + 2*math.pi
        elif x == 0 and y > 0:
            self.angle = math.pi/2
        elif x == 0 and y < 0:
            self.angle = 3*math.pi/2
        elif x < 0 and y == 0:
            self.angle = math.pi
        else:
            self.angle = 0

    def cartArr(self):
        return [self.x, self.y]

    def polarArr(self):
        return [self.magnitude, self.angle]

    def add(self, v):
        self.x += v.x
        self.y += v.y
        
    def sub(self, v):
        self.x -= v.x
        self.y -= v.y

    def rotate(self, theta):
        x = self.x*math.cos(theta)-self.y*math.sin(theta)
        y = self.x*math.sin(theta)+self.y*math.cos(theta)
        self.setCompo(x,y)

    #This is the way to create a method that can return an object
    # of the same class. Here is can now write v = PVector.fromPolar(4,pi/2)
    @classmethod
    def fromPolar(vectCls, mag, angle):
        x = mag * math.cos(angle)
        y = mag * math.sin(angle)
        return vectCls(x,y)

    @classmethod
    def fromPolarUnit(vectCls, angle):
        x = math.cos(angle)
        y = math.sin(angle)
        return vectCls(x,y)
    
    def multi(self, s):
        self.setCompo(s*self.x,s*self.y)
    
    def setCompo(self,x,y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x**2 + y**2)

        if x > 0 and y > 0:
            self.angle = math.atan(y/x)
        elif (x < 0 and y > 0) or (x < 0 and y < 0):
            self.angle = math.atan(y/x) + math.pi
        elif (x > 0 and y < 0):
            self.angle = math.atan(y/x) + 2*math.pi
        elif x == 0 and y > 0:
            self.angle = math.pi/2
        elif x == 0 and y < 0:
            self.angle = 3*math.pi/2
        elif x < 0 and y == 0:
            self.angle = math.pi
        else:
            self.angle = 0
            
    def copy(self):
        return MyVect(self.x,self.y)
