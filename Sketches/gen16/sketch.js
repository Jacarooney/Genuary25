let a = [0.5, 0.5, 0.5];
let b = [0.5, 0.5, 0.5];
let c = [1.0, 1.0, 1.0];
let d = [0.0, 0.33, 0.67];

let brushes = [];
let swatches = [];
let lineLayer;

let numBrushes = 8;

let colours = [[0, 0], [0, 0], [0, 0], [0, 0]];

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  background('antiqueWhite');

  for (let i = 0; i < numBrushes; i++){
    brushes.push(new Brush());
    swatches.push(new Swatch());
  }
  
  lineLayer = createGraphics(width, height);
  lineLayer.noFill();
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  
  lineLayer = createGraphics(width, height);
  lineLayer.noFill();
  
  for (let b of brushes){
    b.s = width*0.2;
  }
  background('antiquewhite');
}

function draw(){
  lineLayer.clear();
  lineLayer.strokeWeight(1);
  
  if (mouseIsPressed){
    if (mouseY < height*0.94){
      background('antiquewhite');
    } else {
      paletteJump();
    }
  }
  
  if (mouseY > height*0.94){
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  noStroke();
  
  if (frameCount > 1){
    for (let i = 0; i < brushes.length; i++){
      brushes[i].col = colours[i];
      brushes[i].display();
    }
  }
  
  colours = [];
  palette();
  
  for (let i = 0; i< swatches.length; i++){
    swatches[i].display();
    colours[i] = swatches[i].c;
  }
  
  lineLayer.strokeWeight(width*0.01);
 
  lineLayer.rect(-width*0.0005, 0, width, height);
  lineLayer.strokeWeight(width*0.003);
  lineLayer.rect(0, 0.94*height, width, height);
  
  
  image(lineLayer, 0, 0, width, height);
  
}

function palette(){
  for (let i = 0; i < 1; i+=1/width){
    let re = a[0] + b[0]*cos(TWO_PI*(c[0]*i + d[0]));
    let gr = a[1] + b[1]*cos(TWO_PI*(c[1]*i + d[1]));
    let bl = a[2] + b[2]*cos(TWO_PI*(c[2]*i + d[2]));
    stroke(re*255, gr*255, bl*255);
    line(i*width, height - width*0.06, i*width, height);
  }
}

function paletteJump(){
  a = [random(1), random(1), random(1)];
  b = [random(1), random(1), random(1)];
  c = [random([0.5, 1.5, 1]), random([0.5, 1.5, 1]), random([0.5, 1.5, 1])];
  d = [random(1), random(1), random(1)];
}

class Brush {
  constructor(col){
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(1, 1);
    this.dir = random(TWO_PI);
    this.col = 0;
    this.s = width*0.2;
  }
  
  display(){
    this.dir = (this.dir + random(-0.3,0.3))%TWO_PI;
    
    this.vel.setHeading(this.dir);
    
    this.pos.add(this.vel);
    
    if (this.pos.x < -this.s){
      this.pos.x = width+this.s;
    } if (this.pos.x > width+this.s){
      this.pos.x = -this.s;
    } else if (this.pos.y < -this.s){
      this.pos.y = width+this.s;
    } else if (this.pos.y > width+this.s){
      this.pos.y = -this.s;
    }
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    for (let i = 0; i < 50; i++){
      push();
      fill(this.col[0]+random(-20, 20), this.col[1]+random(-20, 20), this.col[2]+random(-20, 20), random(5, 100));
      rotate(random(-0.02, 0.02));
      let x = cos(random(TWO_PI))*this.s*random()/2;
      let y = sin(random(TWO_PI))*this.s*random()/2;
      ellipse(x, y, this.s*random(0.04, 0.08), this.s*random(0.02, 0.04)); 
      pop();
    }
    
    
    pop();
  }
}

class Swatch {
  constructor(){
    this.c = 0;
    this.x = random(width);
  }
  
  display(){
    this.x = (this.x+random(-1, 1))%width;
    this.c = get(this.x, height*0.95);
    fill(this.c);
    noStroke();
    ellipse(this.x, height*0.968, width*0.05);
    
    lineLayer.noFill();
    lineLayer.ellipse(this.x, height*0.968, width*0.05);
  }
}