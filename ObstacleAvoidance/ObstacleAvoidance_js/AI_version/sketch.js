let gameMode = false

//this timer limits the time a generation can survive
var timer = 100000
var timerLen = timer

let obs = []
let wallsVert

let popSize = 25

//Array where population is stored
let rovers = new Array(popSize)
//To be able to choose best rover
let savedRovers = []

//This is for the human playable game
let roverVision = false

let genNb = 0

//Slider to speed up simulation
let speedSlider

function setup() {
  createCanvas(800, 800);
  tf.setBackend('cpu')

  //This checks that the game mode is unavailable if there is more than one rover
  if (gameMode){
    roverVision = true
    popSize = 1
  }

  for (i = 0; i < popSize; i++) {
    rovers[i] = new Vehicle(random(20, width-20), height - 25, random(0, TWO_PI))
  }

  obs = []
  for (let i = 0; i < floor(random(15, 25)); i++) {
    obs.push(new Obstacle(createVector(random(width), random(100, width - 100))))
  }

  goal = new Goal(pos = createVector(random(width), 18))

  //Measure of the distance between rover and goal
  for (let i = 0; i < rovers.length; i++) {
    rovers[i].distFrom_goal(goal)
  }

  wallsVert = [
    createVector(0, 0),
    createVector(width, 0),
    createVector(width, height),
    createVector(0, height),
  ]

  speedSlider = createSlider(1,30,30)

  //sets the first value of the timer
  timer = timer/speedSlider.value()
}

function draw() {
  // making multiple cycles in one draw
  const cycles = speedSlider.value()
  let scaledTimerLen = timerLen / cycles


  for (var n = 0; n < cycles; n++) {

    for (let i = 0; i < rovers.length; i++) {
      //Measure of the distance between rover and goal
      rovers[i].distFrom_goal(goal)

      //Makes the choices with the neural network
      if(!gameMode){
        rovers[i].think()
      }

      //Checking if the sensors sence the walls
      rovers[i].sense_sensors(obs, wallsVert)

      //drawing the current state of rover -> moved to make the speed slider
      // rovers[i].draw_sensors()
      rovers[i].update()

      //checking if arrived at goal
      let gotToGoal = rovers[i].colli_goal(goal.gon)
      if(!gameMode && gotToGoal){
        savedRovers.push(rovers.splice(i,1)[0])
      }

      //verifying if rover has collided with the walls and obstacles
      let col = rovers[i].ifCollide(wallsVert, obs)
      if(!gameMode && col){
        savedRovers.push(rovers.splice(i,1)[0])
      }
    }

    //If no more rovers, creates the new generation with different map
    if (rovers.length === 0 || (timer < millis())) {
      obs = []
      for (let i = 0; i < floor(random(15, 25)); i++) {
        obs.push(new Obstacle(createVector(random(width), random(100, width - 100))))
      }
      for (rovAlive of rovers){
        savedRovers.push(rovAlive)
      }
      nextGen()
      timer = scaledTimerLen + millis()
    }
  }
  //################# DRAWING AREA ######################

  background("#f1f1f1")
  fill(0)

  //draws the goal and obstacles
  goal.render()

  for (let ob of obs) {
    ob.render()
  }

  for (let rover of rovers){
    //drawing the current state of rover
    rover.draw_sensors()
    rover.drawBody()
  }

  //Prints the info of the only rover
  if (rovers.length == 1) {
    printInfo()
  }

  strokeWeight(1)
  stroke(150,0,0)
  text("Generation: " + genNb, 10, 20)
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

  if (gameMode && roverVision) { //in case game mode is on
    strokeWeight(1)
    stroke(255)
    fill(255)
    for (let i = 0; i < rovers[0].sensResults.length; i++) {
      text("Sensor " + str(i) + " : " + str(rovers[0].sensResults[i]), 10, (i + 3) * 20)
    }
    text("Distance: " + str(rovers[0].dv.mag()), 10, 40)
  } else {
    stroke(150, 0, 0)
    fill(150, 0, 0)
    for (let i = 0; i < rovers[0].sensResults.length; i++) {
      text("Sensor " + str(i) + " : " + str(rovers[0].sensResults[i]), 10, (i + 3) * 20)
    }
    text("Distance: " + str(rovers[0].dv.mag()), 10, 40)
  }
}

//################################ EXTRA FUNCTIONS ########################################//

// // This is all for the user manual playing
// function keyReleased() {
//   if (keyCode == UP_ARROW) {
//     for (rover of rovers) {
//       rover.isgoingfwd(false)
//     }
//   }
//   if (keyCode == DOWN_ARROW) {
//     for (rover of rovers) {
//       rover.isgoingbwd(false)
//     }
//   }
//   if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
//     for (rover of rovers) {
//       rover.setRota(0)
//     }
//   }
// }
//
// function keyPressed() {
//   if (keyCode == UP_ARROW) {
//     for (rover of rovers) {
//       rover.isgoingfwd(true)
//     }
//   }
//   if (keyCode == RIGHT_ARROW) {
//     for (rover of rovers) {
//       rover.setRota(5 * PI / 180)
//     }
//   }
//   if (keyCode == LEFT_ARROW) {
//     for (rover of rovers) {
//       rover.setRota(-5 * PI / 180)
//     }
//   }
// }
