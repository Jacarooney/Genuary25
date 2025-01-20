let floors = [];
let maxIter = 12;
let iters = 0;
let cols = 10,
    rows = 10;


function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.95, dim*0.95); 
  
  cols = floor(random(1, 10));
  rows = cols;
  
  let margin = width*0.2;
  
  planSize = (width-2*margin)/(cols)*0.14;
  strokeWeight(planSize*0.04);
  strokeCap(SQUARE);
  
  
  
  
  for (let i = 0; i < cols; i++){
    floors[i] = [];
    for (let j = 0; j < rows; j++){
      let xPos = map(i, 0, cols-1, margin, width-margin);
      let yPos = map(j, 0, rows-1, margin, height-margin);
      if (cols == 1){
        xPos = width/2;
        yPos = height/2;
        planSize *= 1.2;
      }
      floors[i][j] = new Floor(xPos, yPos, planSize);
    }
  }
  
  if (cols == 2){
    floors[2] = [];
    floors[2][0] = new Floor(width/2, height/2, planSize);
  }
  
  
  
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

function draw(){
  background('antiquewhite');
  
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      floors[i][j].display();
      if (frameCount%60 == 0 && iters < maxIter){
      floors[i][j].iterate();
    }
    }
  }
  
  if (cols == 2){
    floors[2][0].display();
    if (frameCount%60 == 0 && iters < maxIter){
      floors[2][0].iterate();
    }
  }
  
   if (frameCount%60 == 0){
     iters++;
   }
  
  // for (let f of floors){
  //   f.display();
  //   if (frameCount%60 == 0 && iters < maxIter){
  //     f.iterate();
  //     iters++;
  //   }
  // }
  
}

function mousePressed(){
  floors = [];
  maxIter = 12;
  iters = 0;
  setup();
  loop();
}

class Floor{
  constructor(x, y, s){
    this.x = x;
    this.y = y;
    this.s = s;
    this.points = [createVector(x-s, y-s), createVector(x+s, y-s), createVector(x+s, y+s), createVector(x-s, y+s)];
    this.targets = [createVector(x-s, y-s), createVector(x+s, y-s), createVector(x+s, y+s), createVector(x-s, y+s)];
    
    this.circs = [];
    this.lines = [];
    this.stairs = [];
  }
  
  display(){
    noFill();
    stroke(0);
    beginShape();
    for (let p = 0; p < this.points.length; p++){
      this.points[p].x = lerp(this.points[p].x, this.targets[p].x, 0.1);
      this.points[p].y = lerp(this.points[p].y, this.targets[p].y, 0.1);
      vertex(this.points[p].x, this.points[p].y);
    }
    endShape(CLOSE);
    
    push();
    strokeWeight(this.s*0.02);
    for (let c = 0; c < this.circs.length; c++){
      circle(this.circs[c][0], this.circs[c][1], this.s*0.1);
    }
    pop();
    
    push();
    strokeWeight(this.s*0.1);
    for (let l = 0; l < this.lines.length; l++){
      let l1 = this.lines[l][0];
      let l2 = this.lines[l][1];
      let fil = this.lines[l][2];
      
      if (fil < 255){
        this.lines[l][2]*=1.1;
      }
      stroke(0, fil);
      line(l1.x, l1.y, l2.x, l2.y);
    }
    pop();
    
    push();
    strokeWeight(this.s*0.01);
    for (let s = 0; s < this.stairs.length; s++){
      let s1 = this.stairs[s][0];
      let s2 = this.stairs[s][1];
      let s3 = this.stairs[s][2];
      let s4 = this.stairs[s][3];
      let fil = this.stairs[s][4];
      
      let len = dist(s1.x, s1.y, s3.x, s3.y);
      
      if (fil < 255){
        this.stairs[s][4]*=1.2;
      }
      stroke(0, fil);
      for (let i = 0; i < 1; i += 0.166){
        let l1x = (s3.x-s1.x)*i + s1.x;
        let l1y = (s3.y-s1.y)*i + s1.y;
        let l2x = (s4.x-s2.x)*i + s2.x;
        let l2y = (s4.y-s2.y)*i + s2.y;
        line(l1x, l1y, l2x, l2y);
      }
    }
    pop();
    
  }
  
  iterate(){
    let l = this.points.length;
    let r = floor(random(0, l));
    let p1 = createVector(this.points[r].x, this.points[r].y);
    let next = (r+1)%l;
    let p2 = createVector(this.points[next].x, this.points[next].y);
    
    //Add random features
    let dice = random();
    if (dice < 0.2){    this.circs.push([(this.points[r].x+this.points[next].x)/2, (this.points[r].y+this.points[next].y)/2]);
    } else if (dice < 0.4){
      this.lines.push([p1, p2, 0.2]);
    } else if (dice < 0.6){
      this.stairs.push([this.points[r], this.points[next], p1, p2, 0.2]);
    }
    
    this.points.splice(r+1, 0, createVector(this.points[r].x, this.points[r].y), createVector(this.points[next].x, this.points[next].y));
    
    
    let v = createVector(p1.x-p2.x, p1.y-p2.y);
    let len = random(this.s*0.2, this.s*1.5);
    let angle = HALF_PI;
    if (random() < 0.2){
      angle = random(PI/10, PI/3);
    }
    let dif = p5.Vector.fromAngle(v.heading()+angle, len);
    p1.add(dif);
    p2.add(dif);
    this.targets.splice(r+1, 0, p1, p2);
    
  }
}