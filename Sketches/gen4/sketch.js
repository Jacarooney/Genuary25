let walkers = [];

let bgWalkers = [];

let sweepers = [];

let timeLapseRate = 1;

let fg;

let restartFrame = 0;

let count = 10;
let counter = count;

let numFields, margin, padding;
let fieldYs = [];

function windowResized(){
  let side = min(windowWidth, windowHeight);
  resizeCanvas(side*0.9, side*0.9);
  noLoop();
  count = 10;
  counter = count;
  restartFrame = frameCount;
  walkers = [];
  bgWalkers = [];
  fieldYs = [];
  sweepers = [];
  setup();

  noStroke();
  fill(0);
  textFont('georgia');
  textSize(side*0.07);
  // background('antiqueWhite');
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}

function mousePressed(){
  count = 10;
  counter = count;
  restartFrame = frameCount;
  walkers = [];
  bgWalkers = [];
  fieldYs = [];
  sweepers = [];
  setup();
  loop();
}

function setup() {
  let side = min(windowWidth, windowHeight);
  createCanvas(side*0.9, side*0.9);
  // background('antiquewhite');
  angleMode(DEGREES);
  rectMode(CENTER);
  
  // rect(width/2, height/2, width, height);
  
  fg = createGraphics(width, height);
  
  //COMPOSE FIELDS
  numFields = random([1, 2, 3, 4]);
  if (numFields == 1) {
    margin = random(width/5, width/3);
    fieldYs[0] = margin;
  } else {
    margin = random(width/5.5, width/4);
  }
  padding = random(width/40, width/10);
 
  // line(0, margin, width, margin);
  // line(0, height-margin, width, height-margin);
  
  if(numFields > 1){
  let z = margin;
  
    while (z < height - margin){
      fieldYs.push(z);
      z += padding + random(30, width/2);  
    }
  }

  //DRAW FIELDS
  stroke(0);
  fill(255);
  
  rectMode(CORNER);
  
  for (let i = 0; i < fieldYs.length; i++) {
    let h;
    let w = random((width-margin) * 0.88, (width-margin) * 0.98);
    if (fieldYs[i + 1]) {
      h = fieldYs[i + 1] - fieldYs[i] - padding;
    } else {
      h = (height-margin) - fieldYs[i];
    }
    
    // rect(width / 2-w/2, fieldYs[i], w, h);
    let r = random(15, 23);
    
    let c = [
        r+random(-5, 8),
        r+random(-6, 6),
      r+random(-5, 8)
      ];
    
    let o = random(2, 4);

    for (let j = 0; j < h*0.7; j++){
       let x1 = width/2 - w/2;
    let x2 = width/2 + w/2;
    let x = random(x1, x2);
    
    let y1 = fieldYs[i];
    let y2 = fieldYs[i] + h;
    let y = random(y1, y2);
      let s = random(3, min(h/2, 10));
      let v = random(2, 10);
      walkers.push(new Walker(x, y, x1, x2, y1, y2, c, v, s, o));
    }
    
    r = random(15, 20);
    
    c = [
        r+random(-0.2, 0.5), 
      r,
      r+random(-0.2, 0.5)
      ];
    
    for (let j = 0; j < 1; j++){
       let x1 = width/2 - w/2;
    let x2 = width/2 + w/2;
    let x = random(x1, x2);
    
    let y1 = fieldYs[i];
    let y2 = fieldYs[i] + h;
    let y = random(y1, y2);
      let s = random(h/30, h/25);
      let v = random(2, 10);
  
      sweepers.push(new Sweeper(x, y, x1, x2, y1, y2, c, v, s, random(4, 7)));
    }
    
  }
  
  //BACKGROUND WALKERs
  let r = random(8, 15);
    
    let c = [
        r+random(-8, 2),
        r+random(-2, 2),
        r+random(-8, 2)
      ];
  for (let i = 0; i < 1500; i++) {
    let x = random(width);
  let y = random(height);
  let x1 = 0;
  
  let v = random(10, 20);
  let s = random(5, 20);
  bgWalkers.push(new Walker(x, y, margin/4, width-margin/4, margin/4, height-margin/4, c, v, s, random(1, 4)));
  }
  
  noStroke();
  fg.noStroke();
}

function draw() {
  
  for (let i = 0; i < timeLapseRate; i++){
    for (let w of walkers){
      w.walk(fg);
    }
    
    for (let s of sweepers){
      s.sweep(fg);
    }

    for (let b of bgWalkers){
      b.walk();
    }
  }
  
  image(fg, 0, 0);
  
  if (frameCount%60+restartFrame==0){
    // print(counter--);
  }
  
  if (frameCount > count*60+restartFrame){
    // print('fin');
    noLoop();
  }
  
}

function brush(x, y, r, context, colour) {
  if (context){
    context.fill(colour);
    context.beginShape();
  for (let i = 0; i < 360; i += random(10, 30)) {
    let x1 = r * random(0.7, 1.3) * sin(i) + x;
    let y1 = r * random(0.7, 1.3) * cos(i) + y;
    context.vertex(x1, y1);
  }
  context.endShape();
  } else {
  beginShape();
  for (let i = 0; i < 360; i += random(10, 30)) {
    let x1 = r * random(0.7, 1.3) * sin(i) + x;
    let y1 = r * random(0.7, 1.3) * cos(i) + y;
    vertex(x1, y1);
  }
  endShape();
  }
}

class Walker {
  constructor(x, y, startX, endX, startY, endY, colour, velocity, size, alp){
    this.x = x;
    this.y = y;
    this.x1 = startX;
    this.x2 = endX;
    this.y1 = startY;
    this.y2 = endY;
    this.c = colour;
    this.v = velocity;
    this.s = size;
    this.a = alp;
  }
  
  walk(context){
    
    let colour = [this.c[0]+random(-7, 5), this.c[1]+random(-7, 4), this.c[2]+random(-7, 5), this.a+random(-2, 1)];
    
    //Move
    this.x += random(-1*this.v, this.v);
    this.y += random(-1*this.v, this.v);
    
    //Wrap
    if (this.x < this.x1 || this.x > this.x2){
      this.x = random(this.x1, this.x2);
    }
    if (this.y < this.y1 || this.y > this.y2){
      this.y = random(this.y1, this.y2);
    }
    
    fill(colour);
    
    brush(this.x, this.y, this.s, context, colour);
    
  }
}

class Sweeper {
  constructor(x, y, startX, endX, startY, endY, colour, velocity, size, alp){
    this.x = x;
    this.y = y;
    this.x1 = startX;
    this.x2 = endX;
    this.y1 = startY;
    this.y2 = endY;
    this.w = endX-startX;
    this.h = endY-startY;
    this.c = colour;
    this.v = velocity;
    this.s = size;
    this.a = alp;
  }
  
  sweep(context){
  
    let rOff = random(-2, 3);
    
    // let colour = [...this.c, this.a];
    let colour = [this.c[0]+rOff, this.c[1]+rOff, this.c[2]+rOff, this.a+random(-2, 2)];
    
    //Move
    // this.x += (noise(frameCount*0.0001+10000*this.x) - 0.48)*this.w/3;
    this.x += (noise(frameCount*0.0001+10000*this.x) - 0.48)*this.s*20;
    
    //Wrap
    // if (this.x < this.x1 || this.x > this.x2) {
    //   this.x = noise(frameCount*0.1+300*this.x1)*this.w;
    // }
    if (this.x < this.x1){
      this.x = random(this.x1, this.x2);
    }
    if (this.x > this.x2){
      this.x = random(this.x1, this.x2);
    }
    
    for (let i = 0; i < this.h/this.s/4; i++){
      brush(this.x, random(this.y1+this.h/50, this.y2), this.s, context, colour);
    }
  }
}
