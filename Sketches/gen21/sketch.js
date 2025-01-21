let balls = [];
let ballSize = 10;

let gravity;

let boxes = [];

let elasticity = 500;

let colours = ['dodgerblue', 'orangered', 'limegreen', 'gold'];

function mousePressed(){
  loop();
  balls = [];
  boxes = [];

let elasticity = 500;
  setup();
}

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  noStroke();
  
  gravity = createVector(0, 0.05);
  
  let margin = 0.2*width;
  
  for (let i = 0; i < 10; i++){
    let xPos = map(i, 0, 9, margin, width-margin);
    balls.push(new Ball(xPos, 0, [0], true, 255));
  }
  
  
  
  for (let i = 0; i < 4; i++){
    let xPos = map(i, 0, 3, margin, width-margin);
    for (let j = 0; j < 4; j++){
      let yPos = map(j, 0, 3, margin, width-margin);
      if (random()<0.9){
        let w = random(width*0.1, width*0.2);
        let h = random(width*0.1, width*0.2);
        boxes.push(new Box(xPos-w/2, yPos-h/2, w, h, random(colours)));
      }
    }
  }
  
}

function draw(){
  background(22, 24, 24);
  
  for (let bx of boxes){
    bx.display();
  }
  
  for (let b of balls){
    b.display(balls);
  }
  
}

class Box {
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.b = [];
    this.c = c;
    
    this.row = floor(this.w / ballSize);
    this.col = floor(this.h / ballSize);
    
    for (let i = 0; i < this.row; i++){
      for (let j = 0; j < this.col; j++){
        let xPos = map(i, 0, this.row-1, x, x+w);
        let yPos = map(j, 0, this.col-1, y, y+h);
        this.b[i+j*this.row] = new Ball(xPos, yPos, [], false, 0);
         balls.push(this.b[i+j*this.row]);
      } 
    }
    
    //Connect balls
    for (let i = 0; i < this.b.length; i++){
      //left
      if (this.b[i-1] && i%this.row != 0){
        this.b[i].connections.push(i-1);
      }
      
      //right
      if (this.b[i+1] && i%this.row != this.row-1){
        this.b[i].connections.push(i+1);
      }
      
      //down
      if (this.b[i+this.row]){
        this.b[i].connections.push(i+this.row);
      }
      
      //up
      if (this.b[i-this.row]){
        this.b[i].connections.push(i-this.row);
      }
    }      
  }
  
  display(){
    // rect(this.x, this.y, this.w, this.h);
    
    //
    for (let b of this.b){
      b.elastic(this.b);
    } 
    
    fill(this.c);
    beginShape();
    curveVertex(this.b[0].p.x, this.b[0].p.y);
    for (let i = 0; i < this.row; i++){
      curveVertex(this.b[i].p.x, this.b[i].p.y);
    }
    
    for (let i = 1; i < this.col-1; i++){
      let ind = i*this.row+this.row-1;
      curveVertex(this.b[ind].p.x, this.b[ind].p.y);
    }
    
    for (let i = this.row-1; i >= 1; i--){
      let ind = i+(this.col-1)*this.row;
      curveVertex(this.b[ind].p.x, this.b[ind].p.y);
    }
    
    for (let i = this.col-1; i >= 1; i--){
      let ind = i*this.row;
      curveVertex(this.b[ind].p.x, this.b[ind].p.y);
    }
    endShape(CLOSE);
    
  }
  
}

class Ball {
  constructor(x, y, con, g, c){
    this.p = createVector(x, y);
    this.v = createVector();
    this.a = createVector(0, 0);
    this.s = ballSize;
    this.connections = con;
    this.g = g;
    this.c = c;
  }
  
  display(balls){
    //update position
    if (this.g){
      this.a.add(gravity);
    }
    this.v.add(this.a);
    this.p.add(this.v);
    
    //dampen
    this.a.mult(0.95);
    this.v.mult(0.1);
    
    //check collisions
    for (let b of balls){
      if (b != this){
        if (b.p.dist(this.p) < this.s){
          let dif = this.p.copy();
          dif.sub(b.p);
          dif.setMag(0.05);
          this.a.add(dif);
        }
      }
    }
    
    fill(this.c);
    
    if (this.g){
    ellipse(this.p.x, this.p.y, this.s);
    }
  }
  
  elastic(balls){
    //check elasticity
    for (let i = 0; i < this.connections.length; i++){
      let d = balls[i].p.dist(this.p);
      if (d > elasticity && d > this.s*1.5){
        let dif = balls[i].p.copy();
          dif.sub(this.p);
          dif.setMag(0.005);
          this.a.add(dif);
      } 
    }
  }
}






function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  
  noLoop();
  noStroke();
  fill('antiquewhite');
  textFont('georgia');
  textSize(dim*0.07);
  background(22, 24, 24);
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}