class Vehicle {
  constructor(posx, posy, angle) {
    this.pos = createVector(posx, posy);
    this.dir = p5.Vector.fromAngle(angle);
    this.vel_mag = 2;
    this.vel = createVector(this.vel_mag * this.dir.x, this.vel_mag * this.dir.y);
    this.velP = createVector(this.vel_mag * this.dir.x, this.vel_mag * this.dir.y);
    this.h = 20;
    this.b = 15;
    rectMode(CENTER);
    this.vehicle = rect(this.pos.x, this.pos.y, this.b, this.h, 5);

    fill(0, 255, 0);
    this.vehi_surr = [createVector(this.pos.x - this.b / 2, this.pos.y - this.b / 2),
      createVector(this.pos.x + this.b / 2, this.pos.y - this.b / 2),
      createVector(this.pos.x + this.b / 2, this.pos.y + this.b / 2),
      createVector(this.pos.x - this.b / 2, this.pos.y + this.b / 2)
    ];

    this.isGoingFwd = false;
    this.isGoingBwd = false;
    this.rotation = 0;
  }

  setRota(a) {
    this.rotation = a;
  }

  turn() {
    var nang = this.vel.heading() + this.rotation
    this.vel = p5.Vector.fromAngle(nang, this.vel.mag())
    this.velP = p5.Vector.fromAngle(nang, this.vel.mag())
  }

  isgoingfwd(b) {
    this.isGoingFwd = b
  }

  isgoingbwd(b) {
    this.isGoingFwd = b
  }

  update() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())

    rectMode(CENTER)
    fill(200, 20, 0)
    this.vehicle = rect(0, 0, this.b, this.h, 5)

    noFill()
    noStroke()

    this.turn()

    if (this.isGoingFwd && this.isGoingBwd) {

    } else if (this.isGoingFwd) {
      this.pos.sub(this.vel)
      this.vehi_surr[0].sub(this.velP)
      this.vehi_surr[1].sub(this.velP)
      this.vehi_surr[2].sub(this.velP)
      this.vehi_surr[3].sub(this.velP)
    } else if (this.isGoingBwd) {
      this.pos.add(this.vel)
    }
    pop()
  }

  walls() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      let nPos = createVector(random(width), height - 25)
      this.pos = createVector(nPos.x, nPos.y)
      this.vehi_surr = [createVector(nPos.x - this.b / 2, nPos.y - this.b / 2),
        createVector(nPos.x + this.b / 2, nPos.y - this.b / 2),
        createVector(nPos.x + this.b / 2, nPos.y + this.b / 2),
        createVector(nPos.x - this.b / 2, nPos.y + this.b / 2)
      ]
    }
  }

  collide() {
    let nPos = createVector(random(width), height - 25)
    this.pos = createVector(nPos.x, nPos.y)
    this.vehi_surr = [createVector(nPos.x - this.b / 2, nPos.y - this.b / 2),
      createVector(nPos.x + this.b / 2, nPos.y - this.b / 2),
      createVector(nPos.x + this.b / 2, nPos.y + this.b / 2),
      createVector(nPos.x - this.b / 2, nPos.y + this.b / 2)
    ]
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
    //print(this.vertices)
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
    stroke(4)
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