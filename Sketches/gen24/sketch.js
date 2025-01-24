let res = 10;
let cellSize;
let grid = [];
let rects = [];
let valid = [];

let opac = 235;

let colours = [
  [244,199,14, opac],
  [45,62,140, opac],
  [208,53,25, opac],
  [166,170,170, opac],
  // [166,170,170, opac],
  [0, opac],
  // [0, opac]
];

// colours = [
//   [237, 207, 36, opac],
//   [51, 69, 212, opac],
//   [201, 52, 22, opac],
//   [166,170,170, opac],
//   [0, opac]
// ];

let mover;

let maxTime = 20;
let timer = maxTime;
let done = false;
let off = 0;

 // [233,228,223], white

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  
  cellSize = ceil(width/res);
  
  resizeCanvas(cellSize*res, cellSize*res); 
  
  for (let i = 0; i < res*res; i++){
    valid.push(1);
  }
  
  for (let i = 0; i < res*res; i++){
    if (valid[i] == 1){
      //add a rect, remove all invalid spaces
      let x = i%res;
      let y = floor(i/res);
      
      let maxW = res-x;
      
      for (let l = 0; l < res-x; l++){
        if (valid[i+l] == 0){
          maxW = min(maxW, l-1);
        }
      }
      
      let maxH = res/2.5;
      
      for (let l = 0; l < res-y; l++){
        if (valid[i+l*res] == 0){
          // maxH = min(maxH, l-1);
          
        }
      }
      
      // let minW = abs(i-res/2)/6;
      minW = 2;
      
      let w = floor(random(min(minW, maxW), min(res/2, maxW)));
      let h = floor(random(min(1, maxH), min(res/2, maxH)));
      let c = random(colours);
      if (w > 0 && h > 0){
        grid.push([x, y, w, h, c]);
      
      
        for (let j = 0; j < w; j++){
          for (let k = 0; k < h; k++){
            let n = j+k*res;
            valid[i+n] = 0;
          }
        }
        
      }
    }
  }
  
  stroke(28,17,24, 245);
  strokeWeight(width*0.008);
  
  mover = new Mover();
  
}

function reset(){
  grid = [];
  rects = [];
  valid = [];
  res = floor(random(10, 21));
  
  cellSize = ceil(width/res);
  
  resizeCanvas(cellSize*res, cellSize*res); 
  
  strokeWeight(width*0.008);
  
  for (let i = 0; i < res*res; i++){
    valid.push(1);
  }
  
  for (let i = 0; i < res*res; i++){
    if (valid[i] == 1){
      //add a rect, remove all invalid spaces
      let x = i%res;
      let y = floor(i/res);
      
      let maxW = res-x;
      
      for (let l = 0; l < res-x; l++){
        if (valid[i+l] == 0){
          maxW = min(maxW, l-1);
        }
      }
      
      let maxH = res/2.5;
      
      for (let l = 0; l < res-y; l++){
        if (valid[i+l*res] == 0){
          // maxH = min(maxH, l-1);
          
        }
      }
      
      // let minW = abs(i-res/2)/6;
      minW = 2;
      
      let w = floor(random(min(minW, maxW), min(res/2, maxW)));
      let h = floor(random(min(1, maxH), min(res/2, maxH)));
      let c = random(colours);
      if (w > 0 && h > 0){
        grid.push([x, y, w, h, c]);
      
      
        for (let j = 0; j < w; j++){
          for (let k = 0; k < h; k++){
            let n = j+k*res;
            valid[i+n] = 0;
          }
        }
        
      }
    }
  }
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  
  cellSize = ceil(width/res);
  
  resizeCanvas(cellSize*res, cellSize*res); 
  
  strokeWeight(width*0.008);
}

function draw(){  
  background(233,228,223);
  
  if (done){
    off = width*0.001*sin(PI*timer/maxTime);
    if (timer > 0){
        timer-=1;
    }
  }
  
  for (let i = 0; i < rects.length; i++){
    let r = rects[i];
    fill(r[4]);
    
    if (done){
      rect(rects[i][0]*cellSize - off, r[1]*cellSize - off, r[2]*cellSize + off*2, r[3]*cellSize + off*2);
    } else if (i == rects.length-1){
      let offset = width*0.01*sin(PI*timer/maxTime);
      rect(rects[i][0]*cellSize - offset, r[1]*cellSize - offset, r[2]*cellSize + offset*2, r[3]*cellSize + offset*2);
      if (timer > 0){
        timer--;
      }
    } else {
      rect(rects[i][0]*cellSize, r[1]*cellSize, r[2]*cellSize, r[3]*cellSize);
    }
   
  }

  
  mover.display();
  
  push();
  rectMode(CENTER);
  noFill();
  rect(width/2, height/2, width-width*0.008);
  pop();
}

function mousePressed(){
  mover.restart();
}

class Mover {
  constructor(x, y, w, h, c){
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;
    this.c = color(233,228,223);
    this.tx = 0;
    this.ty = 0;
    this.tw = 0;
    this.th = 0;
    this.tc = 0;
    this.updateTarget();
    this.resetting = false;
  }
  
  display(){
    
    let rate;
    let dif;
    if (this.resetting){
      rate = 0.1;
      dif = 0.001;
    } else {
      rate = 0.12;
      dif = 0.003;
    }
    
    
    this.x = lerp(this.x, this.tx, rate);
    this.y = lerp(this.y, this.ty, rate);
    this.w = lerp(this.w, this.tw, rate);
    this.h = lerp(this.h, this.th, rate);
    if (this.resetting){
      this.c = lerpColor(this.c, this.tc, rate*2);
    } else {
      this.c = lerpColor(this.c, this.tc, rate*0.9);
    }
    
    
    
    if (abs(this.x - this.tx) < dif &&
        abs(this.y - this.ty) < dif &&
        abs(this.w - this.tw) < dif &&
        abs(this.h - this.th) < dif){
      if (this.resetting){
        reset();
        this.resetting = false;
        this.updateTarget();
      } else {
      rects.push([this.x, this.y, this.w, this.h, this.c]);
        if (!done){
        timer = maxTime;
        }
      if (grid.length > 0){
        this.updateTarget();
      } else {
        if (!done){
          done = true;
          timer = maxTime;
        }
        
        // this.restart();
      }
      }
    }
    
    if (!done){
      fill(this.c);
      rect(this.x*cellSize, this.y*cellSize, this.w*cellSize, this.h*cellSize);
    }
  }
  
  updateTarget(){
    let r = floor(random(grid.length));
    
    this.tx = grid[r][0];
    this.ty = grid[r][1];
    this.tw = grid[r][2];
    this.th = grid[r][3];
    this.tc = color(...grid[r][4]);
    
    grid.splice(r, 1);
    
  }
  
  restart(){
    this.tx = 0;
    this.ty = 0;
    this.tw = res;
    this.th = res;
    this.tc = color(233,228,223);
    
    this.resetting = true;
    done = false;
  }
}