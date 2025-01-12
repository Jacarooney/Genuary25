let tiles = [];

let populated = [];

let colours = [[[10, 23, 78], [245, 208, 66]], [[7, 85, 59], [206, 212, 106]], [[129, 88, 84], [249, 235, 222]], [[16, 24, 32], [254, 231, 21]], [[59, 24, 119],[218, 90, 42]], [[45, 41, 38],[237, 111, 99]], [[199, 45, 27],[253, 210, 14]], [[203, 206, 145],[118, 82, 139]]];

let palette;
let palette2;
let col;

let margin;

let subSize;

let currentSize = 64;
let trigger = false;

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  
  pixelDensity(10);
  
  // margin = width*0.1;
  margin = 0;
  
  rectMode(CORNERS);
  noStroke();
  
  palette = floor(random(colours.length));
  
  subSize = floor((width-2*margin)/64);
  resizeCanvas(subSize*64, subSize*64);
  
  for (let i = 0; i < 64; i++){
    tiles[i] = [];
    for (let j = 0; j < 64; j++){
      tiles[i][j] = 0;
    }
  }
  
  tiles[0][0] = new Tile(margin, margin, 64, 0, 0, 0);
  tiles[0][0].shrink = true;
  
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  subSize = floor((width-2*margin)/64);
  resizeCanvas(subSize*64, subSize*64);
}

function draw(){
  push();
  rectMode(CORNER);
  noFill();
  // stroke(0);
  for (let i = 0; i < 64; i++){
    for (let j = 0; j < 64; j++){
      // rect(subSize*i+margin, subSize*j+margin, subSize);
    }
  }
  pop();
  
  for (let i = 0; i < 64; i++){
    for (let j = 0; j < 64; j++){
      if (tiles[i][j]!=0){
          tiles[i][j].display();       
        if (trigger){
          if (currentSize > 1){
            tiles[i][j].shrink = true;
          } else {
            if (tiles[i][j].c == 0 && (i == 0 || j == 0 || i == 63 || j == 63)){
              tiles[i][j].grow = true;
            } else {
              tiles[i][j] = 0;
            }
          }
        } 
      }
    }
  }
  
  
}

class Tile{
  constructor(x, y, s, c, i, j){
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.i = i;
    this.j = j;
    this.grow = false;
    this.shrink = false;
    this.tlX = x;
    this.tlY = y;
    this.trX = x+s*subSize;
    this.trY = y;
    this.blX = x;
    this.blY = y+s*subSize;
    this.brX = x+s*subSize;
    this.brY = y+s*subSize;
    this.tlX2 = x;
    this.tlY2 = y;
    this.trX2 = x+s*subSize;
    this.trY2 = y;
    this.blX2 = x;
    this.blY2 = y+s*subSize;
    this.brX2 = x+s*subSize;
    this.brY2 = y+s*subSize;
    this.ts = s*2;
    populated.push([i, j]);
  }
  
  display(){
    let s = this.s*subSize;
    
    if(this.shrink){
      fill(colours[palette][this.c]);
    rect(this.x, this.y, this.x+s, this.y+s);
      
      let cx = this.x + s/2;
      let cy = this.y + s/2;
      let cs = 0.1;
      
      if (cx - this.tlX2 < 0.2){
        let index = populated.indexOf([this.i, this.j]);
        populated.splice(index, 1);
        //TR
        tiles[this.i+this.s/2][this.j] = new Tile(this.x+s/2, this.y, this.s/2, 1, this.i+this.s/2, this.j);
        //BL
        tiles[this.i][this.j+this.s/2] = new Tile(this.x, this.y+s/2, this.s/2, 1, this.i, this.j+this.s/2);
        //BR
        tiles[this.i+this.s/2][this.j+this.s/2] = new Tile(this.x+s/2, this.y+s/2, this.s/2, 0, this.i+this.s/2, this.j+this.s/2);
        //TL    
        tiles[this.i][this.j] = new Tile(this.x, this.y, this.s/2, 0, this.i, this.j);
        
        if (this.i == 0 && this.j == 0){
          currentSize = currentSize/2;
          trigger = true; 
          col = color(colours[palette][0]);
          
          if (currentSize == 2){
            let prevPal = palette2;
            while (palette2 == prevPal){
              palette2 = floor(random(colours.length));
            }
          } 
        }
      } else {
        this.tlX2 = lerp(this.tlX2, cx, cs);
        this.tlY2 = lerp(this.tlY2, cy, cs);
        this.trX2 = lerp(this.trX2, cx, cs);
        this.trY2 = lerp(this.trY2, cy, cs);
        this.blX2 = lerp(this.blX2, cx, cs);
        this.blY2 = lerp(this.blY2, cy, cs);
        this.brX2 = lerp(this.brX2, cx, cs);
        this.brY2 = lerp(this.brY2, cy, cs);
      } 
      
      //Bottom Right
    fill(colours[palette][0]);
    rect(this.brX, this.brY, this.brX2, this.brY2);
    
    //Bottom Left
    fill(colours[palette][1]);
    rect(this.blX, this.blY, this.blX2, this.blY2);
    
    //Top Right
    fill(colours[palette][1]);
    rect(this.trX, this.trY, this.trX2, this.trY2);
      
      //Top Left
    fill(colours[palette][0]);
    rect(this.tlX, this.tlY, this.tlX2, this.tlY2);
    }
    
    else if (this.grow){
      this.s += 0.5;
      
      let col2 = color(colours[palette2][0]);
      
      col = lerpColor(col, col2, 0.1);
      
      fill(col2);
      // this.s = lerp(this.s, 64, 0.1);
      if (this.i == 0){
        rect(this.x-subSize, this.y, this.x+this.s*subSize, this.y+subSize);
      }
      if (this.j == 0){
        rect(this.x, this.y-subSize, this.x+subSize, this.y+subSize*this.s);
      }
      if (this.i == 63){
        rect(this.x+subSize, this.y, this.x-this.s*subSize, this.y+subSize);
      }
      if (this.j == 63){
        rect(this.x, this.y+subSize, this.x+subSize, this.y-subSize*this.s);
      }
      if (this.i == 0 && this.j == 0 && 64 - this.s < 0.1){
        currentSize = 64;
        for (let i = 0; i < 64; i++){
    tiles[i] = [];
    for (let j = 0; j < 64; j++){
      tiles[i][j] = 0;
    }
  }
        tiles[0][0] = new Tile(margin, margin, 64, 0, 0, 0);
  tiles[0][0].shrink = true;
        palette = palette2;
      }
    } else {
      //Main Rect
    fill(colours[palette][this.c]);
    rect(this.x, this.y, this.x+s, this.y+s);
    }
    
    
    
    
    
  }
}