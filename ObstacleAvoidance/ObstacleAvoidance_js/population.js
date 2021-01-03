class Vehicle {
  constructor(posx, posy, angle) {
    this.pos = createVector(posx, posy);
    this.dir = p5.Vector.fromAngle(angle);
    this.vel_mag = 2;
    this.vel = createVector(this.vel_mag * this.dir.x, this.vel_mag * this.dir.y);
    this.velP = createVector(this.vel_mag * this.dir.x, this.vel_mag * this.dir.y);
    this.h = 15;
    this.b = 15;
    this.sensRange = 30

    this.isGoingFwd = false;
    this.isGoingBwd = false;
    this.rotation = 0;

    //create the collision body vertices
    this.resetVehPos(angle)
    //create the sensor array vertices
    this.resetSensPos(angle)

    //array used to display if the sensors are activated by an obstacle
    this.sensResutls = new Array(this.sens_arr.length).fill(false)
  }

  distFrom_goal(goal) {
    //Measure of the distance between rover and goal
    this.dv = p5.Vector.sub(this.pos, goal.pos);
  }

  drawBody() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    rectMode(CENTER)
    fill(200, 20, 0)
    this.vehicle = rect(0, 0, this.b, this.h, 5)
    pop()
  }

  resetVehPos(angle) {
    //Using trig, we calculate how the points creating the vertexes for the rover transform through motion
    var chCo = 1.4 //chamfer compensation on the rover body
    this.vehi_surr = [
      createVector(this.pos.x - (cos(angle - PI / 4) * chCo * this.b / 2), this.pos.y - (sin(angle - PI / 4) * chCo * this.h / 2)),
      createVector(this.pos.x - (cos(angle + PI / 4) * chCo * this.b / 2), this.pos.y - (sin(angle + PI / 4) * chCo * this.h / 2)),
      createVector(this.pos.x + (cos(angle - PI / 4) * chCo * this.b / 2), this.pos.y + (sin(angle - PI / 4) * chCo * this.h / 2)),
      createVector(this.pos.x + (cos(angle + PI / 4) * chCo * this.b / 2), this.pos.y + (sin(angle + PI / 4) * chCo * this.h / 2)),
    ];
  }

  //this function is used at the initial setting and at collision with wall or obstacle
  resetSensPos(angle) {
    //create the distance sensor rays
    //We use trig to find the spot of the two points that will create the vertex. There are five sensors for the moment
    this.sens_arr = [
      [
        createVector(this.pos.x - (cos(angle - PI / 2) * this.b / 2), this.pos.y - (sin(angle - PI / 2) * this.h / 2)),
        createVector(this.pos.x - (cos(angle - PI / 2) * (this.b / 2 + this.sensRange)), this.pos.y - (sin(angle - PI / 2) * (this.h / 2 + this.sensRange)))
      ],
      [
        createVector(this.pos.x - (cos(angle - PI / 4) * this.b / 2), this.pos.y - (sin(angle - PI / 4) * this.h / 2)),
        createVector(this.pos.x - (cos(angle - PI / 4) * (this.b / 2 + this.sensRange)), this.pos.y - (sin(angle - PI / 4) * (this.h / 2 + this.sensRange)))
      ],
      [
        createVector(this.pos.x - (cos(angle) * this.b / 2), this.pos.y - (sin(angle) * this.h / 2)),
        createVector(this.pos.x - (cos(angle) * (this.b / 2 + this.sensRange)), this.pos.y - (sin(angle) * (this.h / 2 + this.sensRange)))
      ],
      [
        createVector(this.pos.x - (cos(angle + PI / 4) * this.b / 2), this.pos.y - (sin(angle + PI / 4) * this.h / 2)),
        createVector(this.pos.x - (cos(angle + PI / 4) * (this.b / 2 + this.sensRange)), this.pos.y - (sin(angle + PI / 4) * (this.h / 2 + this.sensRange)))
      ],
      [
        createVector(this.pos.x - (cos(angle + PI / 2) * this.b / 2), this.pos.y - (sin(angle + PI / 2) * this.h / 2)),
        createVector(this.pos.x - (cos(angle + PI / 2) * (this.b / 2 + this.sensRange)), this.pos.y - (sin(angle + PI / 2) * (this.h / 2 + this.sensRange)))
      ],
    ];
  }

  setRota(a) {
    this.rotation = a;
  }

  turn() {
    var nang = this.vel.heading() + this.rotation
    this.vel = p5.Vector.fromAngle(nang, this.vel.mag())
    this.velP = p5.Vector.fromAngle(nang, this.vel.mag())

    //Modifiying the vertices of the rover collision rectangle when rotating
    for (let i = 0; i < this.vehi_surr.length; i++) {
      var nangV = this.rotation
      var inter = createVector(this.vehi_surr[i].x - this.pos.x, this.vehi_surr[i].y - this.pos.y).rotate(nangV)

      this.vehi_surr[i] = p5.Vector.add(inter, this.pos)
    }

    //Modifiying the vertices of the distance sensors when rotating
    for (let i = 0; i < this.sens_arr.length; i++) {
      for (let j = 0; j < this.sens_arr[i].length; j++) {
        //We substract pos from the vertexes to translate it to the center, then we make a rotation of the angle and then we simply add the position back as to replace the vertices to where they should be
        var nangS = this.rotation
        var inter = createVector(this.sens_arr[i][j].x - this.pos.x, this.sens_arr[i][j].y - this.pos.y).rotate(nangS)

        this.sens_arr[i][j] = p5.Vector.add(inter, this.pos)
      }
    }
  }

  move() {
    if (this.isGoingFwd && this.isGoingBwd) { //in case we want to implement backwards motion

    } else if (this.isGoingFwd) {
      this.pos.sub(this.vel)

      //collision box motion
      for (let i = 0; i < this.vehi_surr.length; i++) {
        this.vehi_surr[i].sub(this.velP)
      }

      //sensor array motion
      for (let i = 0; i < this.sens_arr.length; i++) {
        for (let j = 0; j < this.sens_arr[i].length; j++) {
          this.sens_arr[i][j].sub(this.velP)
        }
      }
    } else if (this.isGoingBwd) {
      this.pos.add(this.vel)
    }
  }

  isgoingfwd(b) {
    this.isGoingFwd = b
  }

  isgoingbwd(b) {
    this.isGoingFwd = b
  }

  update(obs) {
    //Rover body
    this.drawBody()

    noFill()
    noStroke()

    this.turn()

    this.move()

    //To see if the shape follows correctly the rover: TROUBLESHOOTING
    // this.roverCollisionArea_draw()

  }

  roverCollisionArea_draw() {
    //To see if the shape follows correctly the rover: TROUBLESHOOTING
    stroke(2)
    fill(0, 255, 0)
    beginShape();
    for (var v of this.vehi_surr) {
      vertex(v.x, v.y)
    }
    endShape(CLOSE);
    noFill()
  }

  ifCollide(wallVert, obs) {
    let col = false
    if (polyPoly(this.vehi_surr, wallVert)) {
      if(gameMode){
        this.collide()
      }
      col = true      
    }
    for (let ob of obs) {
      if (polyPoly(ob.vertices, this.vehi_surr)) {
        if(gameMode){
          this.collide()
        }
        col = true
      }
    }
    return col
  }

  //This is the thing to change in case we train or not
  collide() {
    let nPos = createVector(random(width), height - 25)
    this.pos = createVector(nPos.x, nPos.y)
    this.resetVehPos(this.vel.heading())
    this.resetSensPos(this.vel.heading())
  }

  distObs(polygVert, sensor) {
    return polyLine(polygVert, sensor[0].x, sensor[0].y, sensor[1].x, sensor[1].y)
  }

  colli_goal(goalVert) {
    let arrived = polyPoly(goalVert, this.vehi_surr)
    if (arrived) {
      this.collide()
      roverVision = false
    }
  }

  update_sensors(obs, wallsVert) {
    //resets the values to false
    this.sensResutls.fill(false)

    //This colors the base sensors in orange and they will be covered by the next conditions
    for (let i = 0; i < this.sens_arr.length; i++) {
      stroke(255, 100, 0)
      line(this.sens_arr[i][0].x, this.sens_arr[i][0].y, this.sens_arr[i][1].x, this.sens_arr[i][1].y)
      stroke(0)
    }
    for (let ob of obs) {
      for (let i = 0; i < this.sens_arr.length; i++) {
        //This is the check for the obstacles
        if (this.distObs(ob.vertices, this.sens_arr[i])) {
          stroke(0, 100, 200)
          strokeWeight(3)
          line(this.sens_arr[i][0].x, this.sens_arr[i][0].y, this.sens_arr[i][1].x, this.sens_arr[i][1].y)
          stroke(0)
          strokeWeight(1)
          this.sensResutls[i] = true
        }

        //This is the check for the walls
        if (this.distObs(wallsVert, this.sens_arr[i])) {
          stroke(0, 100, 200)
          strokeWeight(3)
          line(this.sens_arr[i][0].x, this.sens_arr[i][0].y, this.sens_arr[i][1].x, this.sens_arr[i][1].y)
          stroke(0)
          strokeWeight(1)
          this.sensResutls[i] = true
        }
      }
    }
  }
}

class Obstacle {
  constructor(pos = false, r = false) {
    if (pos) {
      this.pos = pos.copy()
    } else {
      this.pos = createVector(random(width), random(height))
    }

    if (r) {
      this.r = r * 0.5
    } else {
      this.r = random(5, 100)
    }

    this.total = floor(random(5, 15))
    this.offset = []
    for (var i = 0; i < this.total; i++) {
      this.offset.push(random(-this.r * 0.5, this.r * 0.5))
    }
    this.vertices = []

    //print(this.offset)
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI)
      let r = this.r + this.offset[i]
      let x = r * cos(angle)
      let y = r * sin(angle)
      this.vertices.push(createVector(x + this.pos.x, y + this.pos.y))
    }
  }
  render() {
    stroke(0)
    fill(0)
    beginShape()
    for (let vect of this.vertices) {
      vertex(vect.x, vect.y)
    }
    endShape(CLOSE)
  }
}

class Goal {
  constructor(pos = false) {
    this.r = 10
    if (pos) {
      this.pos = pos.copy()
    } else {
      this.pos = createVector(random(width), random(height))
    }

    push()
    let nbGon = 6
    this.gon = []
    let angle = TWO_PI / nbGon
    for (let i = 0; i < nbGon; i++) {
      let a = angle * i
      let x = cos(a) * this.r
      let y = sin(a) * this.r
      this.gon.push(createVector(x + this.pos.x, y + this.pos.y))
    }
    pop()
  }
  render() {
    push()
    fill(54, 100, 200)

    beginShape();
    for (let v of this.gon) {
      vertex(v.x, v.y)
    }
    endShape(CLOSE);
    noFill()
    pop()
  }
}