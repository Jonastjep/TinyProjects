function polyPoint(vertices, px, py) {
  let collision = false
  next = 0
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1
    if (next == vertices.length) {
      next = 0
    }
    let vc = vertices[current]
    let vn = vertices[next]

    if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) && (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
      collision = !collision
    }
  }
  return collision
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
  let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

function polyLine(vertices,  x1,  y1,  x2,  y2) {
  let next = 0;
  for (let current=0; current<vertices.length; current++) {
    next = current+1;
    
    if (next == vertices.length) next = 0;
    
    let x3 = vertices[current].x;
    let y3 = vertices[current].y;
    let x4 = vertices[next].x;
    let y4 = vertices[next].y;
    
    let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true;
    }
  }
  return false;
}

function polyPoly(p1, p2) {

  let next = 0;
  for (let current=0; current<p1.length; current++) {

    next = current+1;
    if (next == p1.length) next = 0;
    
    let vc = p1[current];    // c for "current"
    let vn = p1[next];       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    let collision = polyLine(p2, vc.x,vc.y,vn.x,vn.y);
    if (collision) return true;

    // optional: check if the 2nd polygon is INSIDE the first
    collision = polyPoint(p1, p2[0].x, p2[0].y);
    if (collision) return true;
  }
  return false;
}
