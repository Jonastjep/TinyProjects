let gameMode = true

let rover
let obs
let wallsVert

function setup() {
  createCanvas(800, 800);

  rover = new Vehicle(random(width), height - 25, random(0, TWO_PI))

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

  goal.render()

  //checking if arrived at goal
  arrived = polyPoly(goal.gon, rover.vehi_surr)
  if (arrived) {
    rover.collide()
    gameMode = false
  }

  //drawing the sensor array of the rover
  stroke(255, 100, 0)
  for (let i = 0; i < rover.sens_arr.length; i++) {
    line(rover.sens_arr[i][0].x, rover.sens_arr[i][0].y, rover.sens_arr[i][1].x, rover.sens_arr[i][1].y)
  }
  stroke(0)

  //Checking if sensors sense an obstacle
  var sensRes = new Array(rover.sens_arr.length).fill(false)
  for (let ob of obs) {
    for (let i = 0; i < rover.sens_arr.length; i++) {
      if (rover.distObs(ob.vertices, rover.sens_arr[i])) {
        stroke(150, 150, 0)
        strokeWeight(3)
        line(rover.sens_arr[i][0].x, rover.sens_arr[i][0].y, rover.sens_arr[i][1].x, rover.sens_arr[i][1].y)
        stroke(0)
        strokeWeight(1)
        sensRes[i] = true
      }
    }
  }

  for (let i = 0; i < rover.sens_arr.length; i++) {
    if (rover.distObs(wallsVert, rover.sens_arr[i])) {
      stroke(150, 150, 0)
      strokeWeight(3)
      line(rover.sens_arr[i][0].x, rover.sens_arr[i][0].y, rover.sens_arr[i][1].x, rover.sens_arr[i][1].y)
      stroke(0)
      strokeWeight(1)
      sensRes[i] = true
    }
  }

  //drawing the current state of rover
  rover.update()

  //verifying if rover has collided with the walls
  rover.walls(wallsVert)

  //verifying if the rover has collided with the obstacles
  fill(0)
  for (let ob of obs) {
    ob.render()
    hit = polyPoly(ob.vertices, rover.vehi_surr)
    if (hit) {
      rover.collide()
    }
  }

  if (gameMode) {
    //Activates the dark mode to simulate what is would be like to be the rover
    strokeWeight(1)
    stroke(2)
    fill(0)
    createAndDrawCutoutShape(rover.b + rover.sensRange, rover)
  } else {
    strokeWeight(1)
    stroke(255)
    fill(255)
  }

  //Measure of the distance between rover and goal
  let dv = p5.Vector.sub(rover.pos, goal.pos);

  if (gameMode) { //in case game mode is on
    strokeWeight(1)
    stroke(255)
    fill(255)
    for (let i = 0; i < sensRes.length; i++) {
      text("Sensor " + str(i) + " : " + str(sensRes[i]), 10, (i + 2) * 20)
    }
    text("Distance: " + str(dv.mag()), 10, 20)
  } else {
    stroke(0)
    fill(0)
    for (let i = 0; i < sensRes.length; i++) {
      text("Sensor " + str(i) + " : " + str(sensRes[i]), 10, (i + 2) * 20)
    }
    text("Distance: " + str(dv.mag()), 10, 20)
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