let rover
let obs

var hasArrived = false

function setup() {
  createCanvas(800, 800);
  rover = new Vehicle(random(width), height - 25, random(0, TWO_PI))
  obs = []
  for (let i = 0; i < floor(random(15, 25)); i++) {
    obs.push(new Obstacle(createVector(random(width), random(100, width - 100))))
  }
  goal = new Goal(pos = createVector(random(width), 18))
  
}

function draw() {
  background("#f1f1f1")
  fill(0)

  goal.render()
  
  arrived = polyPoly(goal.gon, rover.vehi_surr)
  if (arrived) {
    rover.collide()
    hasArrived = true
  }

  stroke(255, 100, 0)
  for (var i = 0; i < rover.sens_arr.length; i++) {
    line(rover.sens_arr[i][0].x, rover.sens_arr[i][0].y, rover.sens_arr[i][1].x, rover.sens_arr[i][1].y)
  }
  stroke(0)

  rover.update()
  rover.walls()

  fill(0)
  for (let ob of obs) {
    ob.render()
    hit = polyPoly(ob.vertices, rover.vehi_surr)
    if (hit) {
      rover.collide()
    }
  }
  
  //Activates the dark mode to simulate what is would be like to be the rover
  if(!hasArrived){
    createAndDrawCutoutShape(rover.b+rover.sensRange, rover)
  }

  strokeWeight(1)
  stroke(255)
  fill(255)
  let dv = p5.Vector.sub(rover.pos, goal.pos);
  text("Distance: " + str(dv.mag()), 10, 20)
  fill(0)
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    rover.isgoingfwd(false)
  }
  if (keyCode == DOWN_ARROW) {
    rover.isgoingbwd(false)
  }
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    rover.setRota(0)
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    rover.isgoingfwd(true)
  }
  if (keyCode == RIGHT_ARROW) {
    rover.setRota(5 * PI / 180)
  }
  if (keyCode == LEFT_ARROW) {
    rover.setRota(-5 * PI / 180)
  }
}

function createAndDrawCutoutShape(dim, rover) {
  stroke(255, 0, 0);
  beginShape();
  // Exterior part of shape, clockwise winding
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  // Interior part of shape, counter-clockwise winding
  beginContour();
  vertex(rover.pos.x-dim, rover.pos.y-dim)
  vertex(rover.pos.x-dim, rover.pos.y+dim);
  vertex(rover.pos.x+dim, rover.pos.y+dim);
  vertex(rover.pos.x+dim, rover.pos.y-dim);
  endContour();
  endShape(CLOSE);
}