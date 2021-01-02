from myvect import MyVect
from edgeCol import polyPoly

class Vehicle:
    def __init__(self, posx, posy, angle):
        self.pos = MyVect(posx, posy)
        self.dir = MyVect.fromPolarUnit(angle)
        self.vel_mag = 2
        self.vel = MyVect(self.vel_mag*self.dir.x, self.vel_mag*self.dir.y)
        self.velP = PVector(self.vel_mag*self.dir.x, self.vel_mag*self.dir.y)
        self.h = 20
        self.b = 15
        rectMode(CENTER)
        self.vehicle = rect(self.pos.x, self.pos.y, self.b, self.h, 5)
        
        fill(0,255,0)
        self.vehi_surr = [PVector(self.pos.x-self.b/2,self.pos.y-self.b/2),
                          PVector(self.pos.x+self.b/2,self.pos.y-self.b/2),
                          PVector(self.pos.x+self.b/2,self.pos.y+self.b/2),
                          PVector(self.pos.x-self.b/2,self.pos.y+self.b/2)]
        
        self.isGoingFwd = False
        self.isGoingBwd = False
        self.rotation = 0
    
    def setRota(self,a):
        self.rotation = a
    
    def turn(self):
        nang = self.vel.angle + self.rotation
        self.vel = MyVect.fromPolar(self.vel.magnitude, nang)
        self.velP = PVector.fromAngle(nang).mult(self.vel.magnitude)
        #self.vel.cartArr()
        
    def isgoingfwd(self, b):
        self.isGoingFwd = b
        
    def isgoingbwd(self, b):
        self.isGoingBwd = b
    
def update(self):
    push()
    translate(self.pos.x,self.pos.y)
    rotate(self.vel.angle)
    
    rectMode(CENTER)
    fill(200,20,0)
    self.vehicle = rect(0, 0, self.b, self.h, 5)

    noFill()
    noStroke()
    
    self.turn()
    
    if self.isGoingFwd and self.isGoingBwd:
        pass
    elif self.isGoingFwd:
        self.pos.sub(self.vel)
        self.vehi_surr[0].sub(self.velP)
        self.vehi_surr[1].sub(self.velP)
        self.vehi_surr[2].sub(self.velP)
        self.vehi_surr[3].sub(self.velP)
    elif self.isGoingBwd:
        self.pos.add(self.vel)
    pop()   
        
        #To see if the shape follows correctly the rover: TROUBLESHOOTING
        # stroke(2)
        # fill(0,255,0) 
        # beginShape();
        # for v in self.vehi_surr:
        #     vertex(v.x, v.y)
        # endShape(CLOSE);  
        # noFill()
        
    def walls(self):
        if self.pos.x > width or self.pos.x < 0 or self.pos.y > height or self.pos.y < 0:
            #Puts the rover in the middle of the map when running into a wall
            # self.pos.setCompo(width/2,height/2)
            # self.vehi_surr = [PVector(width/2-self.b/2,self.pos.y-self.b/2),
            # PVector(width/2+self.b/2,height/2-self.b/2),
            # PVector(width/2+self.b/2,height/2+self.b/2),
            # PVector(width/2-self.b/2,height/2+self.b/2)]
            
            #Puts the rover at a random spot at the bottom of the screen at collision
            nPos = PVector(random(width),height-25)
            self.pos = MyVect(nPos.x,nPos.y)
            self.vehi_surr = [PVector(nPos.x-self.b/2,nPos.y-self.b/2),
            PVector(nPos.x+self.b/2,nPos.y-self.b/2),
            PVector(nPos.x+self.b/2,nPos.y+self.b/2),
            PVector(nPos.x-self.b/2,nPos.y+self.b/2)]
            
    def collide(self):
        #Puts the rover at a random spot at the bottom of the screen at collision
        nPos = PVector(random(width),height-25)
        self.pos = MyVect(nPos.x,nPos.y)
        self.vehi_surr = [PVector(nPos.x-self.b/2,nPos.y-self.b/2),
        PVector(nPos.x+self.b/2,nPos.y-self.b/2),
        PVector(nPos.x+self.b/2,nPos.y+self.b/2),
        PVector(nPos.x-self.b/2,nPos.y+self.b/2)]
        

        
class Obstacle:
    def __init__(self, pos=False, r=False):
        if pos:
            self.pos = pos.copy()
        else:
            self.pos = MyVect(random(width),random(height))
            
        if r:
            self.r = r * 0.5
        else:
            self.r = random(5,100)
            
        self.total = floor(random(5, 15))
        self.offset = []
        for i in range(self.total):
            self.offset.append(random(-self.r * 0.5, self.r * 0.5))
        
        #Creates the vertices for edge detection
        push()
        self.vertices = []
        for i in range(self.total):
            angle = map(i, 0, self.total, 0, TWO_PI)
            r = self.r + self.offset[i]
            x = r * cos(angle)
            y = r * sin(angle)
            self.vertices.append(PVector(x+self.pos.x,y+self.pos.y))
            #Here the vertices are added with an extra pos.x and y so that they translate to the
            # postition of the actual objects. This means we store the right data for object collision
        pop()
            
    def render(self):
        #This translate is now unecessary because we make a manual tranflate in the function above, in the vertex creation
        # this means the drawing is automatically at the right place and we can use this for object collision
        #translate(self.pos.x, self.pos.y)
        beginShape()
        for vect in self.vertices:
            vertex(vect.x,vect.y)
        endShape(CLOSE)
        
class Goal:
    def __init__(self, pos = False):
        self.r = 10
        if pos:
            self.pos = pos.copy()
        else:
            self.pos = MyVect(random(width),random(height))
        
        #Create the gon vertices
        push()
        nbGon = 6
        self.gon = [None] * 6
        angle = TWO_PI / nbGon
        for i in range(len(self.gon)):
            a = angle * i
            x = cos(a) * self.r
            y = sin(a) * self.r
            self.gon[i] = PVector(x + self.pos.x, y +self.pos.y)
        pop()
            
    def render(self):
        push()
        stroke(4)
        fill(54,100,200)
        
        #Draws the goal
        beginShape();
        for v in self.gon:
            vertex(v.x, v.y)
        endShape(CLOSE);
        noFill()
        pop()
    
            
        
        
