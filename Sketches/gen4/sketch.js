let walkers = [];

let bgWalkers = [];

let timeLapseRate = 1;

let fg;

let restartFrame = 0;

let count = 6;
let counter = count;

let numFields, margin, padding;
let fieldYs = [];

function mousePressed(){
  count = 6;
  counter = count;
  restartFrame = frameCount;
  walkers = [];
  bgWalkers = [];
  fieldYs = [];
  setup();
  loop();
}

function setup() {
  createCanvas(600, 600);
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
    margin = random(width/8, width/5);
  }
  padding = random(5, 30);
 
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
    let r = random(8, 24);
    
    let c = [
        r+random(-8, 8),
        r+random(-5, 5),
      r+random(-5, 5)
      ];

    for (let j = 0; j < 200; j++){
       let x1 = width/2 - w/2;
    let x2 = width/2 + w/2;
    let x = random(x1, x2);
    
    let y1 = fieldYs[i];
    let y2 = fieldYs[i] + h;
    let y = random(y1, y2);
      let s = random(3, h/17);
      let v = random(2, 10);
      walkers.push(new Walker(x, y, x1, x2, y1, y2, c, v, s, random(1, 7)));
    }
    
  }
  
  //BACKGROUND WALKERs
  let r = random(10, 25);
    
    let c = [
        r+random(-8, 8),
        r+random(-2, 2),
        r+random(-8, 8)
      ];
  for (let i = 0; i < 1500; i++) {
    let x = random(width);
  let y = random(height);
  let x1 = 0;
  
  let v = random(10, 20);
  let s = random(5, 20);
  bgWalkers.push(new Walker(x, y, margin/4, width-margin/4, margin/4, height-margin/4, c, v, s, random(5, 8)));
  }
  
  noStroke();
  fg.noStroke();
}

function draw() {
  
  for (let i = 0; i < timeLapseRate; i++){
    for (let w of walkers){
      w.walk(fg);
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
    
    let colour = [this.c[0]+random(-5, 5), this.c[1]+random(-5, 5), this.c[2]+random(-5, 5), this.a+random(-5, 5)];
    
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