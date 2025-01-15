let current = [];
let next = [];

let current2 = [];
let next2 = [];

let band = [[174,135,81], [196,200,193], [148,126,109], [113,129,70], [160,185,190], [174,135,81], [196,200,193], [148,126,109]];

let dark = [[90,22,23], [13,22,63], [21,16,5], [90,22,23], [13,22,63]];

let mid = [[98,18,21], [78,88,27], [5,40,90], [220,50,73], [67,89,112], [87,91,64], [113,113,85], [69,60,40]];

let light = [[194,188,159], [211,194,165], [170,186,155], [196,142,135], [173,194,218]];

let cellSize = 3;
let numCols, numRows;

let amountSand = 1300;
let amountSand2 = 8000;

function setup() {
  let dim = min(windowWidth, windowHeight)*0.9;
  createCanvas(400, 400);
  noStroke();
  angleMode(DEGREES);
  
  band = shuffle(band);
  dark = shuffle(dark);
  mid = shuffle(mid);
  light = shuffle(light);

  numCols = ceil(width / cellSize);
  numRows = ceil(height / cellSize);

  for (let i = 0; i < numCols; i++) {
    current[i] = [];
    current2[i] = [];
    for (let j = 0; j < numRows; j++) {
      current[i][j] = 0;
      current2[i][j] = 0;
    }
  }
  
  let vOffset = floor(random(0, 5));
  let hOffset = floor(random(0, 5));
  let vOffset2 = floor(random(0, 7));
  let hOffset2 = floor(random(0, 7));
  
  current[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)
  ] = amountSand;
  current[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)+vOffset
  ] = amountSand;
  current[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)-vOffset
  ] = amountSand;
   current[floor(width / 2 / cellSize)+hOffset][
    floor(height / 2 / cellSize)] = amountSand;
  current[floor(width / 2 / cellSize)-hOffset][
    floor(height / 2 / cellSize)] = amountSand;
  
  current2[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)
  ] = amountSand2;
  current2[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)+vOffset2
  ] = amountSand2;
  current2[floor(width / 2 / cellSize)][
    floor(height / 2 / cellSize)-vOffset2
  ] = amountSand2;
   current2[floor(width / 2 / cellSize)+hOffset2][
    floor(height / 2 / cellSize)] = amountSand2;
  current2[floor(width / 2 / cellSize)-hOffset2][
    floor(height / 2 / cellSize)] = amountSand2;
  
  next = current;
  next2 = current2;
}

function mousePressed(){
  setup();
}

function pixEllipse(x, y, s, t){
  push();
  rectMode(CENTER);
  for (let j = -t/2; j < t/2; j++){
    for (let i = 0; i < 360; i+=1){
      let xPos = x + sin(i)*((s/2)+j);
      let yPos = y + cos(i)*((s/2)+j);
      rect(xPos, yPos, cellSize*2, cellSize*2);
    }
  }
  pop();
}

function draw() {
  background(22, 24, 24);
  
  fill(dark[0]);
  ellipse(width/2, height/2, width*0.9);

  display();
  
  for (let i = 0; i < 200; i++) {
    avalanche();
  }
  
  push();
  fill(dark[0]);
  pixEllipse(width/2, height/2, width, 20);
  strokeWeight(width*0.025);
  fill(band[0]);
  pixEllipse(width/2, height/2, width*0.45, 1);
  pixEllipse(width/2, height/2, width*0.92, 2);
  pop();
}

function avalanche() {
  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      if (current[x][y] > 3) {
        if (x - 1 >= 0) {
          next[x - 1][y] += 1;
        }
        if (x + 1 < numCols) {
          next[x + 1][y] += 1;
        }
        if (y - 1 >= 0) {
          next[x][y - 1] += 1;
        }
        if (y + 1 <= numRows) {
          next[x][y + 1] += 1;
        }
        next[x][y] -= 4;
      }
      
      if (current2[x][y] > 3) {
        if (x - 1 >= 0) {
          next2[x - 1][y] += 1;
        }
        if (x + 1 < numCols) {
          next2[x + 1][y] += 1;
        }
        if (y - 1 >= 0) {
          next2[x][y - 1] += 1;
        }
        if (y + 1 <= numRows) {
          next2[x][y + 1] += 1;
        }
        next2[x][y] -= 4;
      }
      
      
    }
  }
  current = next;
  current2 = next2;
}

function display() {  
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      switch (current2[i][j]) {
        case 0:
          noFill();
          break;
        case 1:
          fill(light[0]);
          break;
        case 2:
          fill(dark[4]);
          break;
        case 3:
          fill(mid[3]);
          break;
        default:
          fill(mid[0]);
      }
      square(i * cellSize, j * cellSize, cellSize);
      
      switch (current[i][j]) {
        case 0:
          noFill();
          break;
        case 1:
          fill(light[2]);
          break;
        case 2:
          fill(dark[3]);
          break;
        case 3:
          fill(mid[2]);
          break;
        default:
          fill(mid[1]);
      }
      square(i * cellSize, j * cellSize, cellSize);
    }
  }
}
