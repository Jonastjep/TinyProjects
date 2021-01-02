from population import Vehicle, Obstacle, Goal
from edgeCol import polyPoly, circleRect, polyRect
from myvect import MyVect

def setup():
    global rover, obs, goal
    size(1000,1000)
    #initializes the rover at a random x but fixed y, so as to not encounter an obstacle
    rover = Vehicle(random(width),height-25,random(0,TWO_PI))
    #initializes the goal to a random x at the top of the screen
    goal = Goal(pos = MyVect(random(width),18))
    
    obs = []
    for i in range(floor(random(15,25))):
        obs.append(Obstacle(pos = MyVect(random(width),random(100,width-100))))
    
    
def draw():
    background("#f1f1f1")
    fill(0)
    
    #creates the goal area
    goal.render()
    
    #Draws the rover and updates position, angle, etc
    rover.update()
    
    #checks if there is a collision between the rover and walls
    rover.walls()
    
    #Check if there is collision between the rover and the obstacles
    fill(0)
    for ob in obs:
        ob.render()
        hit = polyPoly(ob.vertices, rover.vehi_surr)
        if hit:
            rover.collide()
    
    #Checks if rover has arrived to the goal  
    arrived = polyRect(goal.gon, rover.pos.x-rover.b/2, rover.pos.y-rover.b/2, rover.b, rover.b)
    if arrived:
        rover.collide()
    
    fill(0,0,255)    

def keyReleased():
    if keyCode == UP:
        rover.isgoingfwd(False)
    if keyCode == DOWN:
        rover.isgoingbwd(False)
    if keyCode == RIGHT or keyCode == LEFT:
        rover.setRota(0)

def keyPressed():
    if keyCode == UP:
        rover.isgoingfwd(True)
    # if keyCode == DOWN:
    #     rover.isgoingbwd(True)
    if keyCode == RIGHT:
        rover.setRota(5*PI/180)
    if keyCode == LEFT:
        rover.setRota(-5*PI/180)
