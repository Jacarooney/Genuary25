let numLanes = 50;
let resolution = 30;
let sqrt3;
let edge_length;

let cells = [];
let next = [];
let proliferate = false;
let play = "lay";
let shapes = ["Triangle", "Pinwheel", " Pulsar ", "L Glider", "R Glider", "StillHex"];
let shape = 0;
let hide = false;
let grid = true;

//SHAPES
let tri = [[false],[0,0,0]];
let pin = [[true],[0,-1,0], [0,-1,1], [1,0,-1], [1,-1,-1], [0,1,-2], [1,1,-2], [-1,2,-1], [-1,2,-2], [-2,1,0], [-2,2,0], [-1,0,1], [-2,0,1]];
let pul = [[true],[0,0,0],[-1, 0, 0],[0, 0, -1],[-1, 1, 0],[-1, 1, -1], [0, 1, -1],[0,-1,0], [1,0,-1], [0,1,-2], [-1,2,-1], [-2,1,0], [-1,0,1]];
let lgli = [[true],[0,0,0],[-1, 0, 0],[0, 0, -1],[-1, 1, 0],[-1, 1, -1], [0, 1, -1], [1,0,-1], [0,1,-2]];
let rgli = [[true],[0,0,0],[-1, 0, 0],[0, 0, -1],[-1, 1, 0],[-1, 1, -1], [0, 1, -1], [-1,0,1], [-2,1,0]];
let hexa = [[true],[0,0,0],[-1, 0, 0],[0, 0, -1],[-1, 1, 0],[-1, 1, -1], [0, 1, -1]];
let shapeMaps = [tri, pin, pul, lgli, rgli, hexa];

let colours = ['dodgerblue', 'antiquewhite'];

function setup() {
  sqrt3 = sqrt(3);
  
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  angleMode(DEGREES);
  
  edge_length = ceil(width/resolution);
  
  textAlign(CENTER, CENTER);
  textSize(width*0.025);
  textFont("courier new");
  rectMode(CENTER);
  
  for (let a = -numLanes; a < numLanes*2; a++){
    next[a] = [];
    for (let b = 0; b < numLanes*2; b++){
      next[a][b] = [];
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
        next[a][b][c] = 0;
        }
      }
    }
  }
  
  for (let a = -numLanes; a < numLanes*2; a++){
    cells[a] = [];
    for (let b = 0; b < numLanes*2; b++){
      cells[a][b] = [];
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c] = new Cell(a, b, c, 0);
        }
      }
    }
  }
  
  // for (let i = 0; i <= width; i+=edge_length/2){
  //   for (let j = 0; j <= height; j+=edge_length/2){
  //       let n = pick_tri(i, j);
  //       cells[n[0]][n[1]][n[2]] = new Cell(n[0], n[1], n[2], 0);
  //   }
  // }
  
  
  
  cursor(HAND);
}

function windowResized() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9);
  edge_length = ceil(width/resolution);
textSize(width*0.025);
  for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].gridUpdate();
        }
      }
    }
    }
}

function draw() {
  background(colours[1]);
  
  strokeWeight(15/resolution);
  
  //Hover
  fill('thistle');
  let t = pick_tri(mouseX, mouseY);
  let x = 0;
    
    if (shapeMaps[shape][0][0]){
      if (!points_up(t[0], t[1], t[2])){
        x = 1;
      }
    }
  
  for (let i = 1; i < shapeMaps[shape].length; i++){
    let n = shapeMaps[shape][i];
    let c = tri_corners(t[0]+n[0]+x, t[1]+n[1], t[2]+n[2]);
    triangle(c[0][0], c[0][1], c[1][0], c[1][1], c[2][0], c[2][1]);
  }
  
  
  
  //Draw cells
  for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].display();
        }
        
      }
    }
  }
  
  if (proliferate && frameCount%5==0){
  
  //compute next
  for (let a = -numLanes+1; a < numLanes*2-1; a++){
    for (let b = 0+1; b < numLanes*2-1; b++){
      for (let c = -numLanes*2+1; c <= 0-1; c++){
         
        if ((a + b + c == 1) || (a + b + c == 2)){
          let n = countNeighbours(cells, a, b, c);
          
          let state = cells[a][b][c].isOn;
          
          if (a == 2 && b == 2 && c == -2){
            // print(n, state);
          }
          
          
          if (state == 1){
            if (n < 4 || n > 6){
              next[a][b][c] = 0;
            } else {
              next[a][b][c] = 1;
            }
          } else if (state == 0){
            if (n == 4 || n == 8){
              next[a][b][c] = 1;
            } else {
              next[a][b][c] = 0;
            }
          } else {
            next[a][b][c] = 0;
          }
        }
      }
    }
  }
  
  //assign new state
  for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].isOn = next[a][b][c];
        }
      }
    }
  }
    
  }
  
  if (!hide){
  push();
    noStroke();
  fill(22, 24, 24);
  rect(width/2, height*0.95, width, height/10);
  fill(255);
  text("CONTROLS:\n[←] "+shapes[shape]+" [→]    [↑] Resolution: "+resolution+" [↓]\n[P]"+play+"    [R]andomise    [C]lear    [G]rid    [H]elp",width/2, height*0.95);
  pop();
  }
  
 //Debug text
  // fill(0);
  // text(pick_tri(mouseX, mouseY), mouseX, mouseY);
  
}

function keyPressed(){
  if (keyCode == 80){
    proliferate = !proliferate;
    if (proliferate){
      play = "ause";
    } else {
      play = "lay";
    }
  }
  
  if (keyCode == 67){
    clearCells();
  }
  
  if (keyCode == 82){
    randomCells();
  }
  
  if (keyCode == 72){
    hide = !hide;
  }
  
  if (keyCode == 71){
    grid = !grid;
  }
  
  if (keyCode == 37 || keyCode == 65){
    shape = (shape+shapes.length-1)%shapes.length;
  }
  
  if (keyCode == 39 || keyCode == 68){
    shape = (shape+1)%shapes.length;
  }
  
  if (keyCode == 38 || keyCode == 87){
    if (resolution < 50){
      resolution++;
    }
    edge_length = ceil(width/resolution);
    for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].gridUpdate();
        }
      }
    }
  }
    
  }
  
  if (keyCode == 40 || keyCode == 83){
    if (resolution > 10){
      resolution--;
    }
    edge_length = ceil(width/resolution);
    
    for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].gridUpdate();
        }
      }
    }
    }
  }
}

function countNeighbours(cells, a, b, c){
  let count = 0;
  let p = false;
  if (!points_up(a, b, c)){
    count = add(count, a, b-1, c+1);
    count = add(count, a+1,b-1,c+1);
    count = add(count, a+1,b-1,c);
    count = add(count, a-1,b,c+1);
    count = add(count, a,b,c+1);
    count = add(count, a+1,b,c);
    count = add(count, a+1,b,c-1);
    count = add(count, a-1,b+1,c+1);
    count = add(count, a-1,b+1,c);
    count = add(count, a,b+1,c);
    count = add(count, a,b+1,c-1);
    count = add(count, a+1,b+1,c-1);
  } else {
    count = add(count, a-1, b-1, c+1,p);
    count = add(count, a,b-1,c+1,p);
    count = add(count, a,b-1,c,p);
    count = add(count, a+1,b-1,c,p);
    count = add(count, a+1,b-1,c-1,p);
    count = add(count, a-1,b,c+1,p);
    count = add(count, a-1,b,c,p);
    count = add(count, a,b,c-1,p);
    count = add(count, a+1,b,c-1,p);
    count = add(count, a-1,b+1,c,p);
    count = add(count, a-1,b+1,c-1,p);
    count = add(count, a,b+1,c-1,p);
  }
  return count;
}

function mousePressed() {
  //(de)activate cells
  let p = pick_tri(mouseX, mouseY);
  let t = pick_tri(mouseX, mouseY);
  let x = 0;
    
    if (shapeMaps[shape][0][0]){
      if (!points_up(t[0], t[1], t[2])){
        x = 1;
      }
    }
  
  for (let i = 1; i < shapeMaps[shape].length; i++){
    let n = shapeMaps[shape][i];
    let c = cells[t[0]+n[0]+x][t[1]+n[1]][t[2]+n[2]];
    c.isOn = !c.isOn*1;
  }
}

function add(count, a, b, c){
  if (a + b + c == 1 || a + b + c == 2){
    return count + cells[a][b][c].isOn;
  } else {
    return count;
  }
}

function clearCells(){
  for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].isOn = 0;
        }
      }
    }
  }
}

function randomCells(){
  for (let a = -numLanes; a < numLanes*2; a++){
    for (let b = 0; b < numLanes*2; b++){
      for (let c = -numLanes*2; c <= 0; c++){
        if ((a + b + c == 1) || (a + b + c == 2)){
          cells[a][b][c].isOn = random([0,1]);
        }
      }
    }
  }
}

class Cell {
  constructor(a, b, c, isOn){
    this.a = a;
    this.b = b;
    this.c = c;
    this.isOn = isOn;
    this.corners = tri_corners(a, b, c);
    this.x1 = this.corners[0][0];
    this.y1 = this.corners[0][1];
    this.x2 = this.corners[1][0];
    this.y2 = this.corners[1][1];
    this.x3 = this.corners[2][0];
    this.y3 = this.corners[2][1];
  }
  
  display(){
    if (this.isOn == 0){
      noFill();
      if (grid){
    stroke(100);
  } else {
    noStroke();
  }
    } else {
      if (play == "ause"){
        stroke('orangered');
        fill('orangered')
      } else {
        stroke('dodgerblue');
        fill('dodgerblue');
      }
    }
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
  
  gridUpdate(){
    this.corners = tri_corners(this.a, this.b, this.c);
    this.x1 = this.corners[0][0];
    this.y1 = this.corners[0][1];
    this.x2 = this.corners[1][0];
    this.y2 = this.corners[1][1];
    this.x3 = this.corners[2][0];
    this.y3 = this.corners[2][1];
  }
}

//TRIANGLE WIZARDY COURTESY OF: https://github.com/BorisTheBrave/grids/blob/main/src/updown_tri.py


function tri_center(a, b, c){
    // """Returns the center of a given triangle in cartesian co-ordinates"""
    // # Each unit of a, b, c moves you in the direction of one of the edges of a
    // # down triangle, in linear combination.
    // # Or equivalently, this function multiplies by the inverse matrix to pick_tri
    // #
    // # NB: This function has the nice property that if you pass in x,y,z values that
    // # sum to zero (not a valid triangle), it'll return co-ordinates for the vertices of the
    // # triangles.
    return [(       0.5 * a +                      -0.5 * c) * edge_length,
            (-sqrt3 / 6 * a + sqrt3 / 3 * b - sqrt3 / 6 * c) * edge_length]
}

function points_up(a, b, c){
    // """Returns True if this is an upwards pointing triangle, otherwise False"""
    return a + b + c == 2
}

function tri_corners(a, b, c){
    // """Returns the three corners of a given triangle in cartesian co-ordinates"""
    if (points_up(a, b, c)){
        return [
            tri_center(1 + a, b, c),
            tri_center(a, b, 1 + c),
            tri_center(a, 1 + b, c),
        ]
    }
    else {
        return [
            tri_center(-1 + a, b, c),
            tri_center(a, b, -1 + c),
            tri_center(a, -1 + b, c),
        ]
    }
}

function pick_tri(x, y){
    // """Returns the triangle that contains a given cartesian co-ordinate point"""
    // # Using dot product, measures which row and diagonals a given point occupies.
    // # Or equivalently, multiply by the inverse matrix to tri_center
    // # Note we have to break symmetry, using floor(...)+1 instead of ceil, in order
    // # to deal with corner vertices like (0, 0) correctly.
    return [ceil(( 1 * x - sqrt3 / 3 * y) / edge_length),
        floor((    sqrt3 * 2 / 3 * y) / edge_length) + 1,
        ceil((-1 * x - sqrt3 / 3 * y) / edge_length)];
}

function tri_neighbours(a, b, c){
    // """Returns the tris that share an edge with the given tri"""
    if (points_up(a, b, c)){
        return [
            (a - 1, b    , c    ),
            (a    , b - 1, c    ),
            (a    , b    , c - 1),
        ]
    }
    else {
        return [
            (a + 1, b    , c    ),
            (a    , b + 1, c    ),
            (a    , b    , c + 1),
        ]
    }
}

function tri_dist(a1, b1, c1, a2, b2, c2){
    // """Returns how many steps one tri is from another"""
    return abs(a1 - a2) + abs(b1 - b2) + abs(c1 - c2)
}

