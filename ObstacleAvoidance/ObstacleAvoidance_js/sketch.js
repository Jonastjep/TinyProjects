let gameMode = true

let rover
let obs
let wallsVert

let popSize = 10

//This is for the human playable game
let roverVision = false

function setup() {
  createCanvas(800, 800);

  //This checks that the game mode is unavailable if there is more than one rover
  if (gameMode){
    roverVision = true
    popSize = 1
  }

  rovers = new Array(popSize)
  for (i = 0; i < popSize; i++) {
    rovers[i] = new Vehicle(random(width), height - 25, random(0, TWO_PI))
  }

  obs = []
  for (let i = 0; i < floor(random(15, 25)); i++) {
    obs.push(new Obstacle(createVector(random(width), random(100, width - 100))))
  }

  goal = new Goal(pos = createVector(random(width), 18))

  wallsVert = [
    createVector(0, 0),
    createVector(width, 0),
    createVector(width, height),
    createVector(0, height),
  ]
}

function draw() {
  background("#f1f1f1")
  fill(0)

  //draws the goal and obstacles
  goal.render()

  for (let ob of obs) {
    ob.render()
  }

  for (let i = 0; i < rovers.length; i++) {
    //checking if arrived at goal
    rovers[i].colli_goal(goal.gon)

    //Checking if the sensors sence the walls
    rovers[i].update_sensors(obs, wallsVert)

    //drawing the current state of rover
    rovers[i].update()

    //verifying if rover has collided with the walls and obstacles
    let col = rovers[i].ifCollide(wallsVert, obs)
    if(!gameMode && col){
      rovers.splice(i,1)
    }
  }


  //Prints the info of the only rover
  if (rovers.length == 1) {
    printInfo()
  }
}

//################################ EXTRA FUNCTIONS ########################################//

function keyReleased() {
  if (keyCode == UP_ARROW) {
    for (rover of rovers) {
      rover.isgoingfwd(false)
    }
  }
  if (keyCode == DOWN_ARROW) {
    for (rover of rovers) {
      rover.isgoingbwd(false)
    }
  }
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    for (rover of rovers) {
      rover.setRota(0)
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    for (rover of rovers) {
      rover.isgoingfwd(true)
    }
  }
  if (keyCode == RIGHT_ARROW) {
    for (rover of rovers) {
      rover.setRota(5 * PI / 180)
    }
  }
  if (keyCode == LEFT_ARROW) {
    for (rover of rovers) {
      rover.setRota(-5 * PI / 180)
    }
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
  vertex(rover.pos.x - dim, rover.pos.y - dim)
  vertex(rover.pos.x - dim, rover.pos.y + dim);
  vertex(rover.pos.x + dim, rover.pos.y + dim);
  vertex(rover.pos.x + dim, rover.pos.y - dim);
  endContour();
  endShape(CLOSE);
}

function printInfo() {
  if (gameMode && roverVision) {
    //Activates the dark mode to simulate what is would be like to be the rover
    strokeWeight(1)
    stroke(2)
    fill(0)
    createAndDrawCutoutShape(rovers[0].b + rovers[0].sensRange, rovers[0])
  }

  //Measure of the distance between rover and goal
  rovers[0].distFrom_goal(goal)

  if (gameMode && roverVision) { //in case game mode is on
    strokeWeight(1)
    stroke(255)
    fill(255)
    for (let i = 0; i < rovers[0].sensResutls.length; i++) {
      text("Sensor " + str(i) + " : " + str(rovers[0].sensResutls[i]), 10, (i + 2) * 20)
    }
    text("Distance: " + str(rovers[0].dv.mag()), 10, 20)
  } else {
    stroke(150, 0, 0)
    fill(150, 0, 0)
    for (let i = 0; i < rovers[0].sensResutls.length; i++) {
      text("Sensor " + str(i) + " : " + str(rovers[0].sensResutls[i]), 10, (i + 2) * 20)
    }
    text("Distance: " + str(rovers[0].dv.mag()), 10, 20)
  }
}
