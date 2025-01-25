let shapes = [];

let points = [[0, 0]];

let speed = 0.35;

let alphas = [];
let timer = 0;
let aInd = 0;
let aInd2 = -1;

let undraw = false;

let counter = 0;
let counter2 = 0;

let numCols = 2;
let numRows = 3;
let marginX = 0;
let marginY = 0;

let scal = 10;

let colours = [
  "pink",
  "indianred",
  "orange",
  "gold",
  "plum",
  "mediumpurple",
  "cornflowerblue",
  "lightskyblue",
  "cadetblue",
  "paleturquoise",
  "olive",
  "darkseagreen",
];

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  background('antiqueWhite');
  angleMode(DEGREES);
  
  numCols = floor(random(2, 5));
  numRows = floor(random(2, 4))*2-1;
  
  scal = min(width/numCols, height/numRows)*0.1;
  
  marginX = 0.55*width/numCols;
  marginY = 0.55*height/numRows;
  
  // randomSeed(1);
  
    for (let j = 0; j < numRows; j++){
      if (j%2 == 0){
        for (let i = 0; i < numCols; i++){
        let s = floor(random(2, 5));
        let p = floor(random(4, 9));
        let r = random(360);
        let t = random([0,1]);
        let c = random(colours);
        shapes.push([0, i, j, s, p, r, c]);
    }
      } else {
        for (let i = numCols-1; i >= 0; i--){
        let s = floor(random(2, 5.5));
        let p = floor(random(4, 9));
        let r = random(360);
        let t = random([0,1]);
        let c = random(colours);
        shapes.push([0, i, j, s, p, r, c]);
    }
      }
      
  }
  
  for (let s of shapes){
    let xPos = map(s[1], 0, numCols-1, marginX, width-marginX);
    let yPos = map(s[2], 0, numRows-1, marginY, height-marginY);
    if (s[0]){
      points.push(...polyPoints(xPos, yPos, s[3]*scal, s[4], s[5], 1));
    } else {
      points.push(...starPoints(xPos, yPos, s[3]*scal, s[4], s[5], 1));
    }
  }
  
  points.push([width, width]);
  
  // rectMode(CENTER);
  
  timer = alphas[0];
}

function draw(){
  background('antiquewhite');
  
  // polygon(width/2, height/2, width*0.4, 4, 45);
  
  noStroke();
  
  for (let i = max(aInd2, 0); i <= aInd; i++){
    let s = shapes[i];
    let c = color(s[6]);
    if (!undraw){
      if (i == aInd){
        c._array[3] = (alphas[aInd]-timer)/alphas[aInd];
      } 
    } else {
      if (i == aInd2){
        c._array[3] = (timer)/alphas[aInd2];
      }
    }
    c._array[3] *= 0.5;
    fill(c);
    let xPos = map(s[1], 0, numCols-1, marginX, width-marginX);
    let yPos = map(s[2], 0, numRows-1, marginY, height-marginY);
    if (s[0]){
      polygon(xPos, yPos, s[3]*scal, s[4], s[5]);
    } else {
      star(xPos, yPos, s[3]*scal, s[4], s[5]);
    }
  }
  
  beginShape();
  noFill();
  stroke(0, 43, 89);
  strokeWeight(width*0.001);
  
  
  
  for (let i = floor(counter2); i < min(counter, points.length); i++){
    vertex(points[i][0], points[i][1]);
  }
  endShape();
  
  // stroke(0);
  // strokeWeight(width*0.02);
  // rect(width/2, height/2, width);
  
  if (timer >= 0){
    timer-=speed;
  } else if (aInd < alphas.length-1){
    aInd++;
    timer = alphas[aInd];
  } else  if (aInd2 < alphas.length-1){
    undraw = true;
    aInd2++; 
    timer = alphas[aInd2];
  }
  
  if (counter < points.length){
    counter += speed;
  } else {
    counter2 += speed;
  }
  
  if (timer <= 0 && aInd2 == alphas.length-1){
    reset();
  }
}

function reset(){
  shapes = [];
  points = [[0, 0]];
  alphas = [];
  timer = 0;
  aInd = 0;
  aInd2 = -1;
  undraw = false;
  counter = 0;
  counter2 = 0;

  setup();
}

function polygon(x, y, s, p, r){
  beginShape();
    for (let i = 0; i < 360; i += 360/p){
      let xPos = x + cos(i+r)*s;
      let yPos = y + sin(i+r)*s;
      vertex(xPos, yPos);
    }
  endShape(CLOSE);
}

function star(x, y, s, p, r){
  beginShape();
    for (let i = 0; i < p*2; i++){
      if (i%2 == 0){
        let xPos = x + cos(i*180/p+r)*s;
        let yPos = y + sin(i*180/p+r)*s;
        vertex(xPos, yPos); 
      } else {
        let xPos = x + cos(i*180/p+r)*s/2;
        let yPos = y + sin(i*180/p+r)*s/2;
        vertex(xPos, yPos); 
      }
    }
  endShape(CLOSE);
}

function polyPoints(x, y, s, p, r, n){
  let points = [];
  let inc = 360/p;
  let rand = floor(random(p/2, 25));
  let extra = inc * rand;
  let offset = s*0.1;
    for (let i = 0; i < 360 + extra; i += inc){
      let xPos = x + cos(i+r)*s + random(-offset, offset);
      let yPos = y + sin(i+r)*s + random(-offset, offset);
      points.push([xPos, yPos]);
    }
  if (n == 1){
    alphas.push(p+rand);
  }
  return points;
}

function starPoints(x, y, s, p, r, n){
  let points = [];
  let extra = floor(random(p, 30));
  let offset = s*0.1;
    for (let i = 0; i < p*2 + extra; i++){
      if (i%2 == 0){
        let xPos = x + cos(i*180/p+r)*s + random(-offset, offset);
        let yPos = y + sin(i*180/p+r)*s + random(-offset, offset);
        points.push([xPos, yPos]); 
      } else {
        let xPos = x + cos(i*180/p+r)*s/2 + random(-offset, offset);
        let yPos = y + sin(i*180/p+r)*s/2 + random(-offset, offset);
        points.push([xPos, yPos]); 
      }
    }
  if (n == 1){
    alphas.push(p*2+extra);
  }
  return points;
}

//DEFINE SHAPES AS SET OF POINTS
//LINE STARTS AT TOP LEFT, GOES FROM SHAPE TO SHAPE, OUTLINING MULTIPLE TIMES WITH RANDOM OFFSET FROM DEFINED SHAPE POINTS, GOES OFF SCREEN BOTTOM RIGHT
//DOES IT CHANGE COLOUR? ARE THE SHAPES 'FILLED'?


function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  scal = min(width/numCols, height/numRows)*0.1;
  
  marginX = 0.55*width/numCols;
  marginY = 0.55*height/numRows;
  
  points = [[0, 0]];
  
  for (let s of shapes){
    let xPos = map(s[1], 0, numCols-1, marginX, width-marginX);
    let yPos = map(s[2], 0, numRows-1, marginY, height-marginY);
    if (s[0]){
      points.push(...polyPoints(xPos, yPos, s[3]*scal, s[4], s[5]));
    } else {
      points.push(...starPoints(xPos, yPos, s[3]*scal, s[4], s[5]));
    }
  }
  
  points.push([width, width]);
}