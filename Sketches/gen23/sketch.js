let numRows = 6,
  numCols = 6,
  margin,
  cellSize;

let colours = [180, 100, 50];
let cells = [];
let symmetrical = false;

let timer = 5;

function setup() {
  let dim = min(windowWidth, windowHeight)*0.9;
  createCanvas(dim, dim);
  
  margin = width * 0.1;
  
  numRows = floor(random(3, 5))*2;
  numCols = numRows;
  
  cellSize = ceil(width - 2 * margin) / numRows;
  

  if (random() < 0.6) {
    symmetrical = true;
  } else {
    symmetrical = false;
  }
  
  generateCells();
  
  let count = 0;
  for (let i = 0; i < numCols; i++){
    let n = 5*numCols + i;
    if (cells[i] == 1){
      count++;
    }
  }
  
  if (count > 5){
    cells = [];
    generateCells();
  }

  // noLoop();

  background(random(['gold', 'orangered', 'dodgerblue']));

  //Draw ground
  noStroke();
  fill(100);
  rect(0, height * 0.73, width, height);
  

  for (let i = numCols - 1; i >= 0; i--) {
    let x = map(i, 0, numCols, margin, width - margin);
    for (let j = numRows - 1; j >= 0; j--) {
      let y = map(j, 0, numRows, margin, height - margin);
      drawCell(x, y, cellSize, cells[i + j * numCols]);
      // rect(x, y, cellSize);
    }
  }
}

function mousePressed() {
  cells = [];
  timer = 5;
  // loop();
  setup();
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.95, dim*0.95);
  
  noLoop();
  noStroke();
  fill(0);
  textFont('georgia');
  textSize(dim*0.07);
  background('antiqueWhite');
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}

function generateCells() {
  for (let i = numCols - 1; i >= 0; i--) {
    for (let j = numRows - 1; j >= 0; j--) {
      let n = i+j*numCols;
      if (j == numCols-1){
        cells[n] = random([0, 0, 0, 1, 1, 2, 5]);
      } else if (j == 0){
        if (cells[n+numCols] == 1){
          cells[n] = 1;
        } else {
          cells[n] = random([1, 1, 2, 5, 6, 7]);
        }
      } else {
        if (cells[n+numCols] == 1){
          cells[n] = 1;
        } else {
          cells[n] = random([1, 2, 3, 4, 5, 6, 7]);
        }
      }
    }
  }
  
  for (let i = 0; i < numCols; i++){
    for (let j = 0; j < numRows; j++){
      let n = i+j*numCols;
      if (cells[n] == 1 && i != 0 && i != numCols-1){
        if (cells[n-1] > 1 && cells[n+1] > 1){
          cells[n] = random([9, 9, 1]);
        }
      }
    }
  }
  
  if (symmetrical){
    for (let i = 0; i < numCols; i++){
      for (let j = 0; j < numRows/2; j++){
        let orig = j+i*numCols;
        let cop = (numCols-1)-j+i*numCols;
        cells[cop] = cells[orig];
      }
    }
  }
}

function drawCell(x, y, s, n) {
  push();
  translate(x, y);
  noStroke();
  fill(colours[0]);
  strokeWeight(width*0.0005);
  if (n == 1) {
    //EMPTY
  } else if (n == 0) {
    //COLUMN
    stroke(colours[0]);
    strokeWeight(width*0.001);
    triangle(s*0.1, 0.05*s, s * 0.5, s * 0.35, s*0.9, 0.05*s);
    triangle(s*0.1, s*0.95, s * 0.5, s * 0.65, s*0.9, s*0.95);
    rect(s * 0.1, 0, s * 0.8, s*0.05);
    rect(s * 0.1, s*0.95, s * 0.8, s*0.05);
    rect(s * 0.25, 0, s * 0.5, s);
    strokeWeight(width*0.0005);
    stroke(50, 200);
    let numLines = 9;
    for (let i = 0; i < numLines; i++){
      let x = map(i, 0, numLines-1, s*0.3, s*0.7);
      let x2 = map(i, 0, numLines-1, s*0.1, s*0.9);
      line(x, s*0.15, x, s*0.85);
      line(x2, 0, x2, s*0.05);
      line(x2, s*0.05, x, s*0.15);
      line(x2, s, x2, s*0.95);
      line(x2, s*0.95, x, s*0.85);
    }
    
    for (let i = 0; i < 8000; i++) {
        let x = random(s*0.25, s*0.75);
        let y = random(s);
          stroke(random(10, 50), 200);
          strokeWeight(random(width * 0.0005, width * 0.0002));
          point(x, y);
    }
    
  } else if (n == 2) {
    //WALL
    beginShape();
    vertex(s*0.1, 0);
    vertex(s*0.9, 0);
    vertex(s, s*0.1);
    vertex(s, s*0.9);
    vertex(s*0.9, s);
    vertex(s*0.1, s);
    vertex(0, s*0.9);
    vertex(0, s*0.1);
    endShape(CLOSE);
    
    stroke(50, 200);
    beginShape();
    vertex(s*0.2, s*0.1);
    vertex(s*0.8, s*0.1);
    vertex(s*0.9, s*0.2);
    vertex(s*0.9, s*0.8);
    vertex(s*0.8, s*0.9);
    vertex(s*0.2, s*0.9);
    vertex(s*0.1, s*0.8);
    vertex(s*0.1, s*0.2);
    endShape(CLOSE);
    
    beginShape();
    vertex(s*0.3, s*0.2);
    vertex(s*0.7, s*0.2);
    vertex(s*0.8, s*0.3);
    vertex(s*0.8, s*0.7);
    vertex(s*0.7, s*0.8);
    vertex(s*0.3, s*0.8);
    vertex(s*0.2, s*0.7);
    vertex(s*0.2, s*0.3);
    endShape(CLOSE);
    
    for (let i = 0; i < 10; i++){
      let x = map(i, 0, 9, s*0.2, s*0.8);
      if (random() < 0.7){
        line(s*0.9, x, s, x);
      }
      if (random() < 0.7){
        line(s*0.1, x, 0, x);
      }
      
      if (random() < 0.7){
        line(x, s*0.9, x, s);
      }
      if (random() < 0.7){
        line(x, 0, x, s*0.1);
      }
    }
    
  } else if (n == 3) {
    //PATTERN1
    rect(s*0.1, 0, s*0.8, s);
    rect(0, s*0.1, s, s*0.8);
    let numLines = 10;
    stroke(50, 200);
    for (let i = 0; i < numLines; i++){
      let x = map(i, 0, numLines-1, s*0.2, s*0.8);
      line(x, s*0.05, x, s*0.95);
      line(s*0.05, x, s*0.95, x);
    }
    
    noStroke();
     for (let i = 0; i < 10; i++){
       let r = floor(random(10));
       let x = map(r, 0, numLines-1, s*0.2, s*0.8);
       r = floor(random(10));
       let y = map(r, 0, numLines-1, s*0.2, s*0.8);
      square(x, y, s*0.1);
    }
    
  } else if (n == 4) {
    //PATTERN2
    beginShape();
    vertex(s*0.1, 0);
    vertex(s*0.9, 0);
    vertex(s*0.9, s*0.2);
    vertex(s, s*0.1);
    vertex(s, s*0.9);
    vertex(s*0.9, s);
    vertex(s*0.1, s);
    vertex(0, s*0.9);
    vertex(0, s*0.1);
    vertex(s*0.1, s*0.2);
    endShape();
    
    stroke(50, 200);
    let numLines = 10;
    for (let i = 0; i < numLines; i++){
      let x = map(i, 0, numLines-1, s*0.2, s*0.8);
      let x2 = map(i, 0, numLines-1, s*0.3, s*0.9);
      line(x, random([s*0.05, 0]), x, random([s, s*0.95]));
        line(0, x, s*0.1, x2);
        line(s, x, s*0.9, x2);
        line(s*0.1, x2, s*0.9, x2);
    }
    
    noStroke();
     for (let i = 0; i < 10; i++){
       let r = floor(random(10));
       let x = map(r, 0, numLines-1, s*0.2, s*0.8);
       r = floor(random(10));
       let y = map(r, 0, numLines-1, s*0.2, s*0.8);
      square(x, y, s*0.1);
    }
    
  } else if (n == 5) {
    //PATTERN3
    beginShape();
    vertex(s*0.05, 0);
    vertex(s*0.95, 0);
    vertex(s, s*0.05);
    vertex(s, s*0.95);
    vertex(s*0.95, s);
    vertex(s*0.05, s);
    vertex(0, s*0.95);
    vertex(0, s*0.05);
    endShape(CLOSE);
    
    stroke(50, 200);
    
    let numLines = 10;
    for (let i = 0; i < numLines; i++){
      let x = map(i, 0, numLines-1, s*0.08, s*0.5);
      let y = map(i, 0, numLines-1, s*0.08, s*0.5);
      let l = map(i, 0, numLines-1, s*0.4, 0);
      line(s*0.5 - l*random(0.7, 1), y, s*0.5 + l*random(0.7, 1), y);
      line(s*0.5 - l*random(0.7, 1), s-y, s*0.5 + l*random(0.7, 1), s-y);
      line(y, s*0.5 - l*random(0.7, 1), y, s*0.5 + l*random(0.7, 1));
      line(s-y, s*0.5 - l*random(0.7, 1), s-y, s*0.5 + l*random(0.7, 1));
    }
  } else if (n == 6) {
    //WINDOW1
    beginShape();
    vertex(s*0.1, 0);
    vertex(s*0.9, 0);
    vertex(s, s*0.1);
    vertex(s, s*0.9);
    vertex(s*0.9, s);
    vertex(s*0.1, s);
    vertex(0, s*0.9);
    vertex(0, s*0.1);
    endShape(CLOSE);
    // fill(colours[1]);
    rect(s * 0.3, s * 0.3, s * 0.4);
    fill(colours[2]);
    rect(s * 0.575, s * 0.45, s * 0.125, s * 0.25);
    rect(s * 0.3, s * 0.45, s * 0.125, s * 0.25);
    stroke(colours[2], 150);
    let numLines = 15;
    for (let i = 0; i < numLines; i++){
      let y = map(i, 0, numLines-1, 0.3*s, 0.7*s);
      line(0.3*s, y, 0.7*s, y);
    }
    // line(s * 0.3, s * 0.45, s * 0.7, s * 0.45);
  } else if (n == 7) {
    //WINDOW2
    beginShape();
    vertex(s*0.1, 0);
    vertex(s*0.9, 0);
    vertex(s, s*0.1);
    vertex(s, s*0.9);
    vertex(s*0.9, s);
    vertex(s*0.1, s);
    vertex(0, s*0.9);
    vertex(0, s*0.1);
    endShape(CLOSE);
    
    fill(colours[2]);
    
    rect(s * 0.4, s * 0.35, s * 0.2, s * 0.3);
    stroke(50, 200);
    line(s * 0.25, s*0.15, s * 0.25, s*0.75);
    line(s * 0.75, s*0.15, s * 0.75, s*0.75);
    line(s * 0.25, s * 0.65, s * 0.75, s*0.65);
    line(s * 0.25, s*0.15, s * 0.4, s * 0.35);
    line(s * 0.75, s*0.15, s * 0.6, s * 0.35);
    line(s*0.25, s*0.15, s*0.75, s*0.15);
    line(s*0.25, s*0.75, s*0.75, s*0.75);
    
    for (let i = 0; i < 12; i++){
      let x = map(i, 0, 11, s*0.25, s*0.75);
      line(x, s*0.65, x, s*0.75);
    }
  } else if (n == 8) {
    //JUT
    stroke(50, 200);
    triangle(s, 0, s*0.5, s*0.5, s, s);
    triangle(0, s, s*0.5, s*0.5, 0, 0);
    triangle(0, 0, s*0.5, s*0.5, s, 0);
    triangle(s, s, s*0.5, s*0.5, 0, s);
    fill(colours[1]);
    square(s*0.3, s*0.3, s*0.4);
  } else if (n == 9) {
    //BRIDGE
    stroke(colours[0]);
    beginShape();
    vertex(0, s*0.1);
    vertex(s*0.3, s*0.25);
    vertex(s*0.7, s*0.25);
    vertex(s, s*0.1);
    vertex(s, s*0.9);
    vertex(s*0.7, s*0.75);
    vertex(s*0.3, s*0.75);
    vertex(0, s*0.9);
    endShape(CLOSE);
    
    stroke(50, 200);
    for (let i = 0; i < 25; i++){
      let x = map(i, 0, 24, s*0.05, s*0.95);
      if (random() < 0.75){
        line(x, s*0.4, x, s*0.48);
      }
      if (random() < 0.75){
        line(x, s*0.52, x, s*0.6);
      }
    }
    
    for (let i = 0; i < 8000; i++) {
        let x = random(s);
        let y = random(s*0.25, s*0.75);
          stroke(random(10, 50), 200);
          strokeWeight(random(width * 0.0005, width * 0.0002));
          point(x, y);
    }
    
  }
  
  if (n > 1 && n < 9){
  
    for (let i = 0; i < 8000; i++) {
        let x = random(s);
        let y = random(s);
          stroke(random(10, 50), 200);
          strokeWeight(random(width * 0.0005, width * 0.0002));
          point(x, y);
    }
  }
  
  pop();
}
