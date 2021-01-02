let rover
let obs

function setup() {
  createCanvas(800, 800);
  rover = new Vehicle(random(width), height - 25, random(0, TWO_PI))
  obs = []
  for(let i = 0; i<floor(random(15,25));i++){
    obs.push(new Obstacle(createVector(random(width), random(100,width-100))))
  }
  goal = new Goal(pos = createVector(random(width),18))
}

function draw() {
  background("#f1f1f1")
  fill(0)
  goal.render()
  rover.update()
  rover.walls()
  
  fill(0)
  for (let ob of obs) {
    ob.render()
    // hit = polyPoly(ob.vertices, rover.vehi_surr)
    // if (hit) {
    // rover.collide()
    // }
  }
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