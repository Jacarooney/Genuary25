let sPos = 0;
let tLayer;

let fColour = 'silver';
let dColour = 'orangered';
let cColour = 'dodgerblue';

function setup(){
  let dim = min(windowWidth, windowHeight);
  dim = min(dim, 650);
  dim = max(dim, 400);
  createCanvas(dim*0.9, dim*0.9, WEBGL); 
  background('antiqueWhite');
  angleMode(DEGREES);
  
  tLayer = createGraphics(width, height);
  tLayer.textAlign(LEFT, CENTER);
  tLayer.textFont('courier new');
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  dim = min(dim, 650);
  dim = max(dim, 400);
  resizeCanvas(dim*0.9, dim*0.9);
  tLayer.resizeCanvas(dim*0.9, dim*0.9);
  tLayer.textAlign(LEFT, CENTER);
  tLayer.textFont('courier new');
}

function draw(){
  background('antiqueWhite');
  
  
  
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  ambientLight(100);
  
  translate(-width*0.25, height*0.16, 0);
  scale(0.5, 0.5, 0.5);

  rotateX(90);
  
  // orbitControl();
  fill(fColour);
  noStroke();
  sphere(width*0.3, 80, 80);
  
  sPos = -cos(frameCount/3)/2 + 0.5;
  
  let zPos = map(sPos, 0, 1, width*0.3, -width*0.3);
  
  // let angle = map(tPos, 0, width*0.15, 0, 45);
  // print(cos(angle));
  push();
  fill(cColour);
  translate(0, 0, zPos);
  torus(sin(frameCount/3)*width*0.3, width*0.02, 100);
  pop();
  
  rotate(90, [1,0,0]);
  rotate(90, [0,0,1]);
  fill(dColour);
  torus(width*0.3, width*0.02, 100);
  // translate(width*0.3, -width*0.04, 0);
  // rotate(-6, [0, 0, 1]);
  // for (let i = 0; i < 12; i++){
  // cylinder(width*0.015, width*0.09);
  // translate(-width*0.011, -width*0.078, 0);
  // rotate(-15, [0, 0, 1]);
  // }
  
  resetMatrix();
  translate(0, 0, width*0.5);
  tLayer.clear();
  // tLayer.background(255);
  
  let circumference = round(abs(sin(frameCount/3)*TWO_PI),3);
    
  let radius = (-cos(frameCount/3)/2 + 0.5)*PI;
  
  circumference = TWO_PI * sin(radius*180/PI);

  
  let newPi;
  if (radius < 4*PI/5){
    newPi= PI*sin(radius*180/PI)/radius;
  } else {
    newPi = round(2*radius/circumference, 3);

  }
  newPi = circumference/(2*radius);
  newPi = round(newPi, 2);  
  radius = round(radius,2);
  radius = constrain(radius, 0.01, 99999);
  circumference = constrain(round(circumference, 2), 0.01, 999);
  newPi = constrain(newPi, 0.01, 3.14);

  tLayer.strokeWeight(width*0.001);
  tLayer.stroke(0);
  tLayer.line(width/2, 0, width/2, height*0.75);
  tLayer.line(0, height*0.45, width, height*0.45);
  tLayer.line(0, height*0.75, width, height*0.75);
  
  tLayer.strokeWeight(width*0.003);
  tLayer.stroke(cColour);
  tLayer.fill(fColour);
  tLayer.circle(width*0.34, height*0.3, width*0.2*circumference/TWO_PI);
  tLayer.strokeWeight(width*0.005);
  tLayer.stroke(dColour);
  tLayer.line(width*0.34 - width*0.1*circumference/TWO_PI, height*0.3, width*0.34 + width*0.1*circumference/TWO_PI, height*0.3);
  
  tLayer.noStroke();
  tLayer.fill(cColour);
  tLayer.rect(width*0.52, height*0.368, width*0.15, height*0.019);
  tLayer.fill(dColour);
  tLayer.rect(width*0.52, height*0.39, width*0.095, height*0.019);
  
  tLayer.noStroke();
  tLayer.fill(cColour);
  tLayer.rect(width*0.52, height*0.668, width*0.15, height*0.019);
  tLayer.fill(dColour);
  tLayer.rect(width*0.52, height*0.69, width*0.095, height*0.019);
  
  
  tLayer.fill(0);
  tLayer.text("In Euclidean space, the ratio of a circle's circumference and it's diameter is defined as the constant, π (pi).", width*0.52, height*0.25, width*0.3);
  tLayer.text("Circumference: " + circumference +"\nDiameter: " + round(circumference/PI, 2) + "\nPI: " + round(PI, 2), width*0.52, height*0.4);
  
  tLayer.textSize(width*0.018);
  tLayer.text("On a spherical plane (a Non-Euclidean space), the ratio of a circle's circumference and it's diameter is not constant, ranging from ~3.14 down toward 0.", width*0.52, height*0.55, width*0.3);
  tLayer.text("Circumference: " + circumference +"\nDiameter: " + 2*radius + "\nPI: " + newPi, width*0.52, height*0.7);
  
  tLayer.text("In Hyperbolic space (which I cannot be bothered programming a representation of), circles can be constructed where PI is equal to 4.", width*0.25, height*0.785, width*0.645);
  
  image(tLayer, -width/2, -height/2);
  
}