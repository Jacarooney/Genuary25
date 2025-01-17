let centre = [];
let size = [];
let phase = [];
let points = [];
let numCircles = 5;
let inc = 8;
let moveCount = 0;


function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  background('antiqueWhite');
  angleMode(DEGREES);
  
  numCircles = floor(random(5, 15));
  while (inc == 8 || inc == 16){
    inc = floor(random(1, 4))*2;
  }
  
  for (let c = 0; c < numCircles; c++){
    centre.push([random(-2, 2), random(-2, 2)]);
    if (c == 0){
      size.push(0);
    } else {
      size.push(size[c-1]+random(10, 20));
    }
    phase.push(((c%2)*2-1)*random(2,15));
    points[c] = [];
    for (let a = 0; a < 360; a += inc){
      let xPos = centre[c][0]*width*0.01 + width/2 + cos(a+phase[c])*size[c]*width*0.01/(numCircles/4);
      let yPos = centre[c][1]*width*0.01 + height/2 + sin(a+phase[c])*size[c]*width*0.01/(numCircles/4);
      points[c].push([xPos, yPos]);
    }
  }
  
  
  stroke(22, 24, 24);
  fill(22, 24, 24);
  strokeWeight(width*0.001);
  
  pixelDensity(5);
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
}

function mousePressed(){
  centre = [];
  size = [];
  phase = [];
  points = [];
  inc = 8;
  setup();
}

function mouseMoved(){
  moveCount++;
}

function draw(){
  background('antiquewhite');
  
//   let offset = map(max(mouseX, mouseY), 0, width, 0, 1);
//   print(atan2(mouseX, mouseY, width/2, height/2));
  
  // let moveCount = atan2(mouseY-width/2, mouseX-width/2);
  // print(moveCount);
  
  for (let c = 0; c < numCircles; c++){
    for (let a = 0; a < 360; a += inc){
      let xPos = centre[c][0]*width*0.01 + width/2 + cos(a+phase[c]*sin(moveCount))*size[c]*width*0.01/(numCircles/4);
      let yPos = centre[c][1]*width*0.01 + height/2 + sin(a+phase[c]*sin(moveCount))*size[c]*width*0.01/(numCircles/4);
      points[c][a/inc] = [xPos, yPos];
    }
  }
  
  
  
  for (let c = 1; c < numCircles; c++){
    for (let p = 0; p < points[0].length; p+=2){
      let x1 = points[c-1][p][0];
      let y1 = points[c-1][p][1];
      let x2 = points[c-1][p+1][0];
      let y2 = points[c-1][p+1][1];
      let x3 = points[c][p][0];
      let y3 = points[c][p][1];
      let x4 = points[c][p+1][0];
      let y4 = points[c][p+1][1];
      quad(x1, y1, x2, y2, x4, y4, x3, y3);
    }
  }
  
}