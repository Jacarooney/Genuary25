let firstNames, lastNames;

let bigNum = 1000000;
let smallNum = 1000;
let mil = [];

function preload() {
  firstNames = loadStrings("first-names.txt");
  lastNames = loadStrings("last-names.txt");
}

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  background('antiquewhite');
  textSize(width*0.05);
  angleMode(DEGREES);
  textFont('courier new');
  
  noCursor();
  
  margin = 0.1*width;
  pixelDensity(smallNum/(width-2*margin));
  
  for (let i = 0; i < bigNum; i++){
    mil[i] = i;
  }
  
  
//   for (let i = mil.length; i > 0; i--){
    // let r = floor(random(mil.length));
    // mil.splice(r, 1);
//   }
  
  dolphins = [];
  dPerFrame = 100;
  
  //dolphin layer
  dLayer = createGraphics(width, height);
  dLayer.noStroke();
  dLayer.angleMode(DEGREES);
  
  //zoom layer
  zLayer = createGraphics(width, height);

  
}

function draw() {
  background('antiquewhite');
  
  if (dolphins.length < bigNum){
    for(let i = dPerFrame; i > 0; i--){
      //populate dolph
      let r = floor(random(mil.length));
      p = mil[r];
      // p = dolphins.length;
      px = map(p%smallNum, 0, smallNum, margin, width-margin);
      py = map(floor(p/smallNum), 0, smallNum, margin, width-margin);
      dolphins[p] = {x: px, y: py, theta: random(360), omega: random(-12, 12), col: random(100,220),name: random(firstNames) + " " + random(lastNames)};
      
      //draw dolph
      // c = map(p, 0, 1000000, 0, 255);
      // dLayer.fill(c, 0, 255-c);
      // dLayer.ellipse(dolphins[p].x, dolphins[p].y, 3);
      drawDolphinD(dolphins[p].x, dolphins[p].y, width*0.02, dolphins[p].theta, dolphins[p].omega, dolphins[p].col);
      mil.splice(r, 1);
    }  
  }
  // noLoop();
  
  numDolphins = bigNum - mil.length;
  
  textAlign(CENTER, TOP);
  textSize(0.025*width);
  fill(22, 24, 24);
  text(numDolphins + "/1000000 Pacific White-Sided Dolphins", 0.5*width, 0.94*height);
  
  
  
  image(dLayer, 0, 0);
  // image(zLayer, 0, 0);
  displayName();
}

function pos2id() {
  if (mouseX > margin && mouseX < width-margin && mouseY > margin && mouseY < height-margin){
  nX = floor(map(mouseX, margin, width-margin, 0, smallNum));
  nY = floor(map(mouseY, margin, width-margin, 0, smallNum));
  nX = constrain(nX, 0, smallNum);
  nY = constrain(nY, 0, smallNum);
  n = nX + (nY*smallNum);
  return n;
  } else {
    return null;
  }
}

function findNearest() {
  let p = pos2id();
  if (p == null){
    return null;
  }
  if (dolphins[p]){
    return p;
  } else {
    for (let i = 0; i < 100; i++){
      if (dolphins[p-i*smallNum]){
        return p-i*smallNum;
      } else if (dolphins[p+i*smallNum]){
        return p+i*smallNum;
      } else if (dolphins[p-i]){
        return p-i;
      } else if (dolphins[p+i]){
        return p+i;
      }
    }
    return null;
  }
}

function displayName(){
  noStroke();
  fill('orange');
  ellipse(mouseX, mouseY, 10);
  fill(22, 24, 24);
  textSize(0.05*width);
  
  let p = findNearest();
  // print(p);

  if (p){
    drawDolphin(dolphins[p].x, dolphins[p].y, width*0.15, dolphins[p].theta, dolphins[p].omega, dolphins[p].col);
    textSize(0.045*width);
    text(dolphins[p].name, width/2, height*0.0);
    textSize(0.025*width);
    text("#" + (p+1), width/2, height*0.06);
  }
  
}

function drawDolphin(x, y, s, theta, omega, col) {
  push();
  translate(x, y);
  rotate(180+atan2(mouseY-height/2, mouseX-width/2));
  noStroke();
  fill('orange');
  rect(s*0.55, -s*0.05, s*0.3, s*0.1);
  rect(s*0.8, -0.15*s, s*0.8, s*0.3, s*0.1);
  
  ellipse(0, 0, s*1.2);
  fill('skyblue');
  ellipse(0, 0, s*1);
  
  rotate(-(180+atan2(mouseY-height/2, mouseX-width/2)));
  
//   fill(0);
//   ellipse(-s*0.05, -s*0.0, s*0.3);
  
  translate(-s*0.07, 0);
  rotate(theta);
  translate(s*0.1, 0);
  
  //Fins
  fin(-s*0.02, -s*0.075, s*0.4, col, -5, 1);
  fin(s*0.15, s*0.08, s*0.25, col-30, 180, -1);
  fin(s*0.08, s*0.08, s*0.3, col, 180, -1);
  
  //Tail
  tail(s*0.02, 0, s*0.37, col, omega);
  
  //Head
  head(s*0.17, 0, s*0.19, col);
  
  //Body
  body(0, 0, s, col);
  
  pop();
}

function body(x, y, s, col){
  fill(col);
  ellipse(x, y, s*0.5, s*0.18)
  fill(255, 100);
  ellipse(x, y+s*0.04, s*0.3, s*0.04)
}

function fin(x, y, s, col, angle, sc){
  push();
  translate(x, y);
  scale(sc, 1);
  rotate(angle);
  fill(col);
  beginShape();
  curveVertex(-s*0.2, 0);
  curveVertex(-s*0.2, 0);
  curveVertex(-s*0.12, -s*0.08);
  curveVertex(-s*0.13, -s*0.14);
  curveVertex(-s*0.21, -s*0.22);
  curveVertex(0, -s*0.175);
  curveVertex(+s*0.19, 0);
  curveVertex(+s*0.2, 0);
  endShape();
  pop();
}

function tail(x, y, s, col, angle){
  push();
  // stroke('red');
  fill(col);
  translate(x, y);
  translate(-s*0.35, s*0.1);
  rotate(angle);
  translate(s*0.35, -s*0.1);
  
  beginShape();
  curveVertex(s*0.3, 0);
  curveVertex(s*0.3, 0);
  curveVertex(-s*0.2, -s*0.19);
  curveVertex(-s*0.7, -s*0.16);
  curveVertex(-s*1.4, -s*0.06);
  curveVertex(-s*1.3, s*0.06);
  curveVertex(-s*0.6, s*0.15);
  curveVertex(-s*0.2, s*0.19);
  curveVertex(s*0.3, 0);
  curveVertex(s*0.3, 0);
  endShape();
  
  translate(-s*1.3, -s*0.01);
  rotate(angle*1.5);
  beginShape();
  curveVertex(0, 0);
  curveVertex(0, 0);
  
  curveVertex(s*-0.24, s*-0.25);
  curveVertex(s*-0.21, s*-0.1);
  curveVertex(s*-0.23, s*0);
  curveVertex(s*-0.21, s*0.1);
  curveVertex(s*-0.24, s*0.25);
  
  curveVertex(0, 0);
  curveVertex(0, 0);
  
  endShape();
  
  pop();
}

function head(x, y, s, col){
  push();
  translate(x, y);
  fill(col);
  
  beginShape();
  curveVertex(0, 0);
  curveVertex(0, 0);
  curveVertex(-0.8*s, 0.45*s);
  curveVertex(0.8*s, 0.45*s);
  curveVertex(1.17*s, 0.3*s);
  curveVertex(1.15*s, 0.2*s);
  // curveVertex(1.2*s, 0.2*s);
  curveVertex(1.05*s, 0.1*s);
  curveVertex(0.9*s, -0.05*s);
  curveVertex(0.7*s, -0.16*s);
  curveVertex(0.35*s, -0.28*s);
  curveVertex(-0.5*s, -0.4*s);
  curveVertex(0, 0);
  curveVertex(0, 0);
  endShape();
  
//   fill(255, 100);
//   ellipse(0.4*s, 0, 0.6*s, 0.15*s);
  fill(0);
  ellipse(0.55*s, 0.18*s, 0.18*s, 0.06*s);
  
  noFill();
  stroke(0);
  arc(0.92*s, 0.25*s, 0.5*s, 0.1*s, 5, 160);
  
  pop();
}

function drawDolphinD(x, y, s, theta, omega, col) {
  dLayer.push();
  dLayer.translate(x, y);
  dLayer.rotate(theta);
  dLayer.fill(255);
  dLayer.noStroke();
  
  //Fins
  finD(-s*0.02, -s*0.075, s*0.4, col, -5, 1);
  finD(s*0.15, s*0.08, s*0.25, col-30, 180, -1);
  finD(s*0.08, s*0.08, s*0.3, col, 180, -1);
  
  //Tail
  tailD(s*0.02, 0, s*0.37, col, omega);
  
  //Head
  headD(s*0.17, 0, s*0.19, col);
  
  //Body
  bodyD(0, 0, s, col);
  
  dLayer.pop();
}

function bodyD(x, y, s, col){
  dLayer.fill(col);
  dLayer.ellipse(x, y, s*0.5, s*0.18)
  dLayer.fill(255, 100);
  dLayer.ellipse(x, y+s*0.04, s*0.3, s*0.04)
}

function finD(x, y, s, col, angle, sc){
  dLayer.push();
  dLayer.translate(x, y);
  dLayer.scale(sc, 1);
  dLayer.rotate(angle);
  dLayer.fill(col);
  dLayer.beginShape();
  dLayer.curveVertex(-s*0.2, 0);
  dLayer.curveVertex(-s*0.2, 0);
  dLayer.curveVertex(-s*0.12, -s*0.08);
  dLayer.curveVertex(-s*0.13, -s*0.14);
  dLayer.curveVertex(-s*0.21, -s*0.22);
  dLayer.curveVertex(0, -s*0.175);
  dLayer.curveVertex(+s*0.19, 0);
  dLayer.curveVertex(+s*0.2, 0);
  dLayer.endShape();
  dLayer.pop();
}

function tailD(x, y, s, col, angle){
  dLayer.push();
  // stroke('red');
  dLayer.fill(col);
  dLayer.translate(x, y);
  dLayer.translate(-s*0.35, s*0.1);
  dLayer.rotate(angle);
  dLayer.translate(s*0.35, -s*0.1);
  
  dLayer.beginShape();
  dLayer.curveVertex(s*0.3, 0);
  dLayer.curveVertex(s*0.3, 0);
  dLayer.curveVertex(-s*0.2, -s*0.19);
  dLayer.curveVertex(-s*0.7, -s*0.16);
  dLayer.curveVertex(-s*1.4, -s*0.06);
  dLayer.curveVertex(-s*1.3, s*0.06);
  dLayer.curveVertex(-s*0.6, s*0.15);
  dLayer.curveVertex(-s*0.2, s*0.19);
  dLayer.curveVertex(s*0.3, 0);
  dLayer.curveVertex(s*0.3, 0);
  dLayer.endShape();
  
  dLayer.translate(-s*1.3, -s*0.01);
  dLayer.rotate(angle*1.5);
  dLayer.beginShape();
  dLayer.curveVertex(0, 0);
  dLayer.curveVertex(0, 0);
  
  dLayer.curveVertex(s*-0.24, s*-0.25);
  dLayer.curveVertex(s*-0.21, s*-0.1);
  dLayer.curveVertex(s*-0.23, s*0);
  dLayer.curveVertex(s*-0.21, s*0.1);
  dLayer.curveVertex(s*-0.24, s*0.25);
  
  dLayer.curveVertex(0, 0);
  dLayer.curveVertex(0, 0);
  
  dLayer.endShape();
  
  dLayer.pop();
}

function headD(x, y, s, col){
  dLayer.push();
  dLayer.translate(x, y);
  dLayer.fill(col);
  
  dLayer.beginShape();
  dLayer.curveVertex(0, 0);
  dLayer.curveVertex(0, 0);
  dLayer.curveVertex(-0.8*s, 0.45*s);
  dLayer.curveVertex(0.8*s, 0.45*s);
  dLayer.curveVertex(1.17*s, 0.3*s);
  dLayer.curveVertex(1.15*s, 0.2*s);
  // curveVertex(1.2*s, 0.2*s);
  dLayer.curveVertex(1.05*s, 0.1*s);
  dLayer.curveVertex(0.9*s, -0.05*s);
  dLayer.curveVertex(0.7*s, -0.16*s);
  dLayer.curveVertex(0.35*s, -0.28*s);
  dLayer.curveVertex(-0.5*s, -0.4*s);
  dLayer.curveVertex(0, 0);
  dLayer.curveVertex(0, 0);
  dLayer.endShape();
  
//   fill(255, 100);
//   ellipse(0.4*s, 0, 0.6*s, 0.15*s);
  dLayer.fill(0);
  dLayer.ellipse(0.55*s, 0.18*s, 0.18*s, 0.06*s);
  
  dLayer.noFill();
  dLayer.stroke(0);
  dLayer.arc(0.92*s, 0.25*s, 0.5*s, 0.1*s, 5, 160);
  
  dLayer.pop();
}