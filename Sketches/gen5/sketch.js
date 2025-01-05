let cellSize, cellW, cellH;

let colours = [80, 230, 140];

let hue = 0;
let comp = 0;
let s1 = 20;
let s2 = 0;
let s3 = 10;
let b1 = 60;
let b2 = 100;
let b3 = 80;
let hOff = 120;
let str = 0.5;



let cubes = [];

let x, y;

let cellsAcross = 20;

let faceDim = 11;

let face = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
];

// face = [
//   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
//   1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
//   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
// ];

let leftFace = [];
let rightFace = [];

function facePath() {
  //Create empty array
  for (let i = 0; i < faceDim * faceDim; i++) {
    face[i] = 0;
  }

  //Populate edges
  for (let i = 0; i < faceDim; i++) {
    face[i] = 1;
    face[i * faceDim] = 1;
  }

  //initialise walker
  let x, y, prev;
  if (random() < 0.5) {
    x = 1;
    y = floor(random(1, floor(faceDim / 2)));
    prev = "R";
  } else {
    y = 1;
    x = floor(random(1, floor(faceDim / 2)));
    prev = "D";
  }

  //place walker on face
  face[(x % faceDim) + y * faceDim] = 1;

  while (x != 0 && x != ceil(faceDim / 2) && y != 0 && y != ceil(faceDim / 2)) {
    //Step in a direction
    let rand = random();

    let thresh = 0.7;

    if (prev == "R") {
      if (rand < thresh) {
        x += 1;
      } else if (rand < thresh + (1 - thresh) / 2) {
        prev = "U";
        y -= 1;
      } else {
        prev = "D";
        y += 1;
      }
    } else if (prev == "L") {
      if (rand < thresh) {
        x -= 1;
      } else if (rand < thresh + (1 - thresh) / 2) {
        prev = "U";
        y -= 1;
      } else {
        prev = "D";
        y += 1;
      }
    } else if (prev == "D") {
      if (rand < thresh) {
        y += 1;
      } else if (rand < thresh + (1 - thresh) / 2) {
        prev = "L";
        x -= 1;
      } else {
        prev = "R";
        x += 1;
      }
    } else if (prev == "U") {
      if (rand < thresh) {
        y -= 1;
      } else if (rand < thresh + (1 - thresh) / 2) {
        prev = "L";
        x -= 1;
      } else {
        prev = "R";
        x += 1;
      }
    }

    //place walker on face
    face[(x % faceDim) + y * faceDim] = 1;
  }
}

function mirrorTop() {
  for (let i = 0; i < faceDim * faceDim; i++) {
    if (i < ceil(faceDim / 2) * faceDim) {
      if (i % faceDim < faceDim / 2) {
        face[faceDim - 1 - (i % faceDim) + floor(i / faceDim) * faceDim] =
          face[i];
      }
    } else {
      face[i] =
        face[i - 2 * faceDim * (floor(i / faceDim) + 1 - ceil(faceDim / 2))];
    }
  }
}

function generateLeftFace() {
  for (let i = faceDim - 1; i >= 0; i--) {
    for (let j = 0; j < faceDim; j++) {
      let n = i + j * faceDim;
      leftFace.push(face[n]);
    }
  }
}

function generateRightFace() {
  for (let i = 0; i < faceDim; i++) {
    for (let j = faceDim - 1; j >= 0; j--) {
      let n = j + i * faceDim;
      rightFace.push(leftFace[n]);
    }
  }
}

function mousePressed() {
  newBox();
}

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(0.9*dim, 0.9*dim);
  colorMode(HSB);
  background("antiquewhite");
  angleMode(DEGREES);
  pixelDensity(10);
  
  hue = random(360);
  comp = (hue+hOff)%360;
  str = random([0, 0.2, 0.4]);
  
  // stroke(comp, 40, 15, str);
  noStroke();

  // facePath();  
  mirrorTop();
  generateLeftFace();
  generateRightFace();

  cellSize = width / (cellsAcross * sqrt(3));
  cellW = cellSize * sqrt(3);
  cellH = (3 * cellSize) / 2;

  x = 0;
  y = 0;

  // fill("dodgerblue");
  // noStroke();

  let mid = floor(cellsAcross / 2);

  //draw background axes
  push();
  colours = [[comp, s1, b1-30], [comp, s2, b2-30], [comp, s3, b3-30]];
  backAxes(mid, mid+faceDim-6);
  pop();

  for (let i = 0; i < face.length; i++) {
    if (face[i] == 1) {
      // square((i % faceDim) * 10, floor(i / faceDim) * 10, 10);

      cubes.push(new Cube(mid, mid-5, cellSize, "top", i));
    }
    if (leftFace[i] == 1) {
      cubes.push(new Cube(mid, mid-5, cellSize, "left", i));
    }
    if (rightFace[i] == 1) {
      cubes.push(new Cube(mid, mid-5, cellSize, "right", i));
    }
  }

  // stroke(0);

  colours = [80, 210, 140];
  colours = [[hue, s1, b1], [hue, s2, b2], [hue, s3, b3]];

  for (let c of cubes) {
    c.display();
  }

  colours = [255, 255, 255];

  //draw axes
  colours = [30, 110, 50];
  colours = [[comp, s1, b1-30], [comp, s2, b2-30], [comp, s3, b3-30]];
  frontAxes(mid, mid + faceDim - 7);
}

function newBox(){
  cubes = [];
  face = [];
  leftFace = [];
  rightFace = [];
  faceDim = floor(random(4, 7))*2+1;
  // cellsAcross = map(faceDim, 9, 17, 14, 30);
  background("antiquewhite");
  clear();
  pixelDensity(10);
  
  hue = random(360);
  comp = (hue+hOff)%360;
  str = random([0, 0.2, 0.4]);
  // stroke(comp, 40, 15, str);
  noStroke();
  

  facePath();  
  mirrorTop();
  generateLeftFace();
  generateRightFace();

  cellSize = width / (cellsAcross * sqrt(3));
  cellW = cellSize * sqrt(3);
  cellH = (3 * cellSize) / 2;

  x = 0;
  y = 0;

  // fill("dodgerblue");
  // noStroke();

  let mid = floor(cellsAcross / 2);

  //draw background axes
  push();
  colours = [[comp, s1, b1-30], [comp, s2, b2-30], [comp, s3, b3-30]];
  // stroke(0);
  backAxes(mid, mid+faceDim-6);
  pop();

  for (let i = 0; i < face.length; i++) {
    if (face[i] == 1) {
      // square((i % faceDim) * 10, floor(i / faceDim) * 10, 10);

      cubes.push(new Cube(mid, mid-5, cellSize, "top", i));
    }
    if (leftFace[i] == 1) {
      cubes.push(new Cube(mid, mid-5, cellSize, "left", i));
    }
    if (rightFace[i] == 1) {
      cubes.push(new Cube(mid, mid-5, cellSize, "right", i));
    }
  }

  colours = [[hue, s1, b1], [hue, s2, b2], [hue, s3, b3]];

  for (let c of cubes) {
    c.display();
  }

  //draw axes
  colours = [30, 110, 50];
  colours = [[comp, s1, b1-30], [comp, s2, b2-30], [comp, s3, b3-30]];
  frontAxes(mid, mid + faceDim - 7);
}

function backAxes(startX, startY) {
  x = startX;
  y = startY;
  for (let i = 0; i < faceDim; i++) {
    cube();
    y -= 1;
  }

  y = startY;
  for (let i = 0; i < faceDim; i++) {
    cube();
    x += 0.5;
    y += 0.5;
  }

  x = startX;
  y = startY;
  for (let i = 0; i < faceDim; i++) {
    cube();
    x -= 0.5;
    y += 0.5;
  }
}

function frontAxes(startX, startY) {
  let path = [];
  let left = [];
  let up = [];
  
  //Calculate path
  for (let i = 0; i < faceDim; i++) {
    path.push(face[i + i * faceDim]);
    up.push(face[i+i*faceDim-faceDim]);
    left.push(face[i+i*faceDim-1]);
  }
  
  //Calculate crossings
  let onTop = true;
  let z = [];
  let lastCross = 0;
  let crossings = 0;
  
  for (let i = 0; i < path.length-1; i++){
    if (onTop){
      z[i] = 1;
      if (up[i] == 0 && left[i] == 0 ){
        if (path[i] == 0 && path[i+1] == 1){
          z[i] = 0;
          onTop = false;
          crossings++;
          lastCross = i;
        }
      }
    } else {
      z[i] = -1;
      if (path[i] == 0 && path[i+1] == 1){
        z[i] = 0;
        onTop = true;
        crossings++;
        lastCross = i;
      }
    }
  }
  
  if (crossings%2==0){
    for (let i = 0; i < (z.length-lastCross)+1; i++){
      z.pop();
    }
  }
  
  if (crossings == 0){
    //generate new
    newBox();
  } else {

    //remove first, superfluous entry
    z.shift();

    //Place starting cube faces
    x = startX;
    y = startY;
    // cubeLeft(x, y, cellSize);
    // cubeRight(x, y, cellSize);
    onTop = true;

    for (let i = 0; i < path.length; i++){

      if (z[i] == 1){
        //Draw on top cubes
        cubeLeft(x, y, cellSize);
        cubeRight(x, y, cellSize);
      } else if (z[i] == 0){
        //Draw transitional cubes
        if (onTop){
          leftDownPartial(x, y, cellSize);
          rightDownPartial(x, y, cellSize);

          if (up[i+2]==0){
            leftUpPartial(x, y, cellSize);
          }

          if (left[i+2]==0){
            rightUpPartial(x, y, cellSize);
          }
        } else if (!onTop){
          if (path[i]==0){
            leftDownPartial(x, y, cellSize);
            rightDownPartial(x, y, cellSize);
          }
          if (up[i+1]==0){
            leftUpPartial(x, y, cellSize);
          }
          if (left[i+1]==0){
            rightUpPartial(x, y, cellSize);
          }
        }
        onTop = !onTop;
      }
      y-=1;
    }

    //Place starting cube faces
    x = startX-0.5;
    y = startY+1.5;
    onTop = true;

    for (let i = 0; i < path.length; i++){

      if (z[i] == 1){
        //Draw on top cubes
        cubeTop(x, y, cellSize);
        cubeRight(x, y, cellSize);
      } else if (z[i] == 0){
        //Draw transitional cubes
        if (onTop){
          topRightPartial(x, y, cellSize);
          rightUpPartial(x, y, cellSize);

          if (up[i+2]==0){
            rightDownPartial(x, y, cellSize);
          }

          if (left[i+2]==0){
            topLeftPartial(x, y, cellSize);
          }
        } else if (!onTop){
          if (path[i]==0){
            topRightPartial(x, y, cellSize);
            rightUpPartial(x, y, cellSize);
          }
          if (up[i+1]==0){
            rightDownPartial(x, y, cellSize);
          }
          if (left[i+1]==0){
            topLeftPartial(x, y, cellSize);
          }
        }
        onTop = !onTop;
      }
      x-=0.5
      y+=0.5;
    }

     //Place starting cube faces
    x = startX+0.5;
    y = startY+1.5;
    onTop = true;

    for (let i = 0; i < path.length; i++){

      if (z[i] == 1){
        //Draw on top cubes
        cubeTop(x, y, cellSize);
        cubeLeft(x, y, cellSize);
      } else if (z[i] == 0){
        //Draw transitional cubes
        if (onTop){
          topLeftPartial(x, y, cellSize);
          leftUpPartial(x, y, cellSize);

          if (up[i+2]==0){
            leftDownPartial(x, y, cellSize);
          }

          if (left[i+2]==0){
            topRightPartial(x, y, cellSize);
          }
        } else if (!onTop){
          if (path[i]==0){
            topLeftPartial(x, y, cellSize);
            leftUpPartial(x, y, cellSize);
          }
          if (up[i+1]==0){
            leftDownPartial(x, y, cellSize);
          }
          if (left[i+1]==0){
            topRightPartial(x, y, cellSize);
          }
        }
        onTop = !onTop;
      }
      x+=0.5
      y+=0.5;
    }
  }
}

function hexagon(x, y, s) {
  beginShape();
  for (let i = 0; i < 360; i += 60) {
    let xPos = s * sin(i) + x;
    let yPos = s * cos(i) + y;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

class Cube {
  constructor(x, y, size, face, i) {
    this.s = size;
    this.f = face;
    this.i = i;
    this.x = 0;
    this.y = 0;
    if (face == "top") {
      this.x = x + (i % faceDim) * 0.5 - floor(i / faceDim) * 0.5;
      this.y = y + floor(i / faceDim) * 0.5 + (i % faceDim) * 0.5;
    } else if (face == "left") {
      this.x = x + (i % faceDim) * 0.5;
      this.y = y + floor(i / faceDim) + (i % faceDim) * 0.5;
    } else {
      this.x = x + (i % faceDim) * 0.5;
      this.y = y + floor(i / faceDim) - (i % faceDim) * 0.5;
    }
  }

  display() {
    let i = this.i;
    if (this.f == "top") {
      cubeTop(this.x, this.y, this.s);
      if (i % faceDim == faceDim - 1) {
        cubeRight(this.x, this.y, this.s);
      }
      if (i % faceDim != faceDim - 1 && face[i + faceDim + 1] == 1) {
        if (i % faceDim != faceDim - 1 && face[i + 1] != 1) {
          rightUpPartial(this.x, this.y, this.s);
        }
        if (face[i + faceDim] != 1) {
          leftUpPartial(this.x, this.y, this.s);
        }
      } else {
        if (i % faceDim != faceDim - 1 && face[i + 1] != 1) {
          cubeRight(this.x, this.y, this.s);
        }
        if (face[i + faceDim] != 1) {
          cubeLeft(this.x, this.y, this.s);
        }
      }
    } else if (this.f == "left") {
      this.x -= faceDim / 2 - 0.5;
      this.y += faceDim / 2 - 0.5;
      if (leftFace[i - (faceDim - 1)] == 0) {
        // stroke('red');
        if (i % faceDim != faceDim - 1 && leftFace[i + 1] != 1) {
          cubeRight(this.x, this.y, this.s);
        }
        if (leftFace[i - faceDim] == 0) {
          cubeTop(this.x, this.y, this.s);
        }
      } else {
        if (i % faceDim != faceDim - 1 && leftFace[i + 1] != 1) {
          rightDownPartial(this.x, this.y, this.s);
        }
        if (leftFace[i - faceDim] == 0) {
          topLeftPartial(this.x, this.y, this.s);
        }
      }
      cubeLeft(this.x, this.y, this.s);

      if (floor(i / faceDim) == 0) {
        cubeTop(this.x, this.y, this.s);
      }
      if (i % faceDim == faceDim - 1) {
        cubeRight(this.x, this.y, this.s);
      }
    } else if (this.f == "right") {
      this.y += faceDim - 1;

      if (rightFace[i - (faceDim + 1)] == 0) {
        if (i % faceDim != 0 && rightFace[i - 1] != 1) {
          cubeLeft(this.x, this.y, this.s);
        }
        if (rightFace[i - faceDim] == 0) {
          cubeTop(this.x, this.y, this.s);
        }
      } else {
        if (i % faceDim != 0 && rightFace[i - 1] != 1) {
          leftDownPartial(this.x, this.y, this.s);
        }
        if (rightFace[i - faceDim] == 0) {
          topRightPartial(this.x, this.y, this.s);
        }
      }
      cubeRight(this.x, this.y, this.s);

      if (floor(i / faceDim) == 0) {
        cubeTop(this.x, this.y, this.s);
      }
      if (i % faceDim == 0) {
        cubeLeft(this.x, this.y, this.s);
      }
    }
  }
}

function cubeTop(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[1]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i <= 120; i += 60) {
    let xPos = s * sin(i + 1 * 120) + x;
    let yPos = s * cos(i + 1 * 120) + y;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function cubeLeft(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[2]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i <= 120; i += 60) {
    let xPos = s * sin(i + 2 * 120) + x;
    let yPos = s * cos(i + 2 * 120) + y;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function cubeRight(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[0]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i <= 120; i += 60) {
    let xPos = s * sin(i - 3 * 120) + x;
    let yPos = s * cos(i - 3 * 120) + y;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function leftUpPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[2]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i++) {
    let xPos = s * sin(-120+i*60) + x;
    let yPos = s * cos(-120+i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}
function leftDownPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[2]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i++) {
    let xPos = s * sin(0-i*60) + x;
    let yPos = s * cos(0-i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}

function rightUpPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;

  fill(colours[0]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i++) {
    let xPos = s * sin(120-i*60) + x;
    let yPos = s * cos(120-i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}

function rightDownPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;

  fill(colours[0]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i++) {
    let xPos = s * sin(i*60) + x;
    let yPos = s * cos(i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}

function topLeftPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[1]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i ++) {
    let xPos = s * sin(240-i*60) + x;
    let yPos = s * cos(240-i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}

function topRightPartial(x, y, s) {
  x = x * cellW;
  y = y * cellSize;
  fill(colours[1]);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 2; i ++) {
    let xPos = s * sin(120+i*60) + x;
    let yPos = s * cos(120+i*60) + y;
    vertex(xPos, yPos);
  }
  endShape();
}

function cube() {
  x1 = x * cellW;
  y1 = y * cellSize;
  for (let j = 0; j < 3; j++) {
    fill(colours[j]);
    beginShape();
    vertex(x1, y1);
    for (let i = 0; i <= 120; i += 60) {
      let xPos = cellSize * sin(i + j * 120) + x1;
      let yPos = cellSize * cos(i + j * 120) + y1;
      vertex(xPos, yPos);
    }
    endShape(CLOSE);
  }
}

function dlu() {
  x -= 0.5;
  y += 0.5;
  let x1 = x * cellW;
  let y1 = y * cellSize;
  for (let j = 0; j < 2; j++) {
    fill(colours[j]);
    beginShape();
    vertex(x1, y1);
    let bound = 120;
    if (j == 1) {
      bound = 119;
    }
    for (let i = 0; i <= bound; i += 60) {
      let xPos = cellSize * sin(i - j * 2 * 120) + x1;
      let yPos = cellSize * cos(i - j * 2 * 120) + y1;
      vertex(xPos, yPos);
    }
    endShape(CLOSE);
  }
}
