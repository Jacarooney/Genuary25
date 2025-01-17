var points = [],
    sticks = [],
    bounce = 0.9,
    gravity = 0.5,
    friction = 0.992,
    iterations = 3,
    editMode = false,
    vertHover = 0,
    lastHover = -1,
    lineEndCount = 0,
    lineEndIDs = [],
    mode = 'play',
    wind = 0.1,
    vertX, vertY;

iterations = 2;
gravity = 0.15;
bounce = 0.95;
friction = 0.98;

let lineStart = 0;
let lineEnd, lineHeight;

let colours = [
  "pink",
  "indianred",
  "orange",
  "gold",
  "cornsilk",
  "plum",
  "mediumpurple",
  "cornflowerblue",
  "lavender",
  "cadetblue",
  "paleturquoise",
  "olive",
  "darkseagreen",
  "honeydew",
  "lavenderblush",
];

let items = [];
let clothes = [];

let pegs = [0];

function setup() {
  let dim = 0.9*min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  stroke(255);
  
  loop();

  // frameRate(10);
  
  lineHeight = height*0.3;
  lineStart = 0;
  lineEnd = width;
  
  //Begin line
  points.push(new Point(lineStart, lineHeight, 10, true));
  
  let x = lineStart;
  
  while (x < lineEnd-150*width*0.001){
    let item = random(["pants", "shirt", "sock"]);
    // item = "shirt";
    let s;
    let len;
    let col = random(colours);
    let p = points.length;
    if (item == "pants"){
      s = random(40, 50)*width*0.001;
      len = random(0.85, 3);
      x += s*2;
      points.push(new Point(x-s*0.4, lineHeight, 10, false));
      points.push(new Point(x+s*0.4, lineHeight, 10, false));
      pegs.push(p);
      pegs.push(p+1);
      clothes.push(new Pants(x, lineHeight, s, len, col, p));
    } else if (item == "shirt"){
      s = random(55, 75)*width*0.001;
      len = random(0.8, 1.7);
      x += s*2;
      points.push(new Point(x-s*0.25, lineHeight, 10, false));
      points.push(new Point(x+s*0.25, lineHeight, 10, false));
      pegs.push(p);
      pegs.push(p+1);
      clothes.push(new Shirt(x, lineHeight, s, len, col, p));
    } else {
      s = random(12, 16)*width*0.001;
      len = random([-1, 1]);
      x += s*5;
      points.push(new Point(x, lineHeight, 10, false));
      pegs.push(p);
      clothes.push(new Sock(x, lineHeight, s, len, col, p));
    }
    // if (x < lineEnd-s*20){
    //   items.push([item, x, s, len, col, p]);
    // }
  }
  
  //End line
  points.push(new Point(lineEnd, lineHeight, 10, true));
  pegs.push(points.length-1);
  
  //Join points
  for (let i = 1; i < pegs.length; i++){
    sticks.push({
  p0: points[pegs[i-1]],
  p1: points[pegs[i]],
  length: dist(points[pegs[i-1]].x, points[pegs[i-1]].y, points[pegs[i]].x, points[pegs[i]].y),
  hover: false,
  colour: 255,
});
  }
  
}

function windowResized(){
  noLoop();
  let dim = 0.9*min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  noStroke();
  fill(0);
  textFont('georgia');
  textSize(dim*0.07);
  // background('antiqueWhite');
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}

function draw() {
  background('lightskyblue');
  
  noStroke();
  fill('gold')
  ellipse(width*0.5, height*0.15, width*0.12);
  
  wind = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  
  vertHover = 0;
  
 
    for (let p in points){
      // points[p].hover();
      points[p].update();
      points[p].constrain();
    }

    for (let i = 0; i < iterations; i++){
      updateSticks();
      
    }

  
  renderSticks();
  
  for (let p in points){
      points[p].render();
  }
  
  
  for (let c of clothes){
    c.display();
  }
  
    for (let i = 0; i < wind*30; i++){
      let h = random(height);
      let x = random(width);
      stroke(255);
      line(x, h, x+random(wind*100), h);
    }  
  
}

class Shirt {
  constructor(x, y, s, l, c, p){
    this.x = x;
    this.y = y;
    this.s = s;
    this.l = l;
    this.c = c;
    this.p = p;
    
    points.push(new Point(x, y+s*0.05, 10, false));
    points.push(new Point(x+s*0.1, y-s*0.05, 10, false));
    points.push(new Point(x+s*0.15, y-s*0.1, 10, false));
    points.push(new Point(x+s*0.4, y-s*0.05, 10, false));
    points.push(new Point(x+s*0.7, y+s*0.4, 10, false));
    points.push(new Point(x+s*0.5, y+s*0.6, 10, false));
    points.push(new Point(x+s*0.3, y+s*0.4, 10, false));
    points.push(new Point(x+s*0.35*l, y+s*1.2*l, 10, false));
    points.push(new Point(x, y+s*1.2*l, 10, false));
    points.push(new Point(x-s*0.35*l, y+s*1.2*l, 10, false));
    points.push(new Point(x-s*0.3, y+s*0.4, 10, false));
    points.push(new Point(x-s*0.5, y+s*0.6, 10, false));
    points.push(new Point(x-s*0.7, y+s*0.4, 10, false));
    points.push(new Point(x-s*0.4, y-s*0.05, 10, false));
    points.push(new Point(x-s*0.15, y-s*0.1, 10, false));
    points.push(new Point(x-s*0.1, y-s*0.05, 10, false));
    
    for (let i = 2; i < 17; i++){
      points[this.p+i].fill = [0,0];
      sticks.push({
  p0: points[this.p+i],
  p1: points[this.p+i+1],
  length: dist(points[this.p+i].x, points[this.p+i].y, points[this.p+i+1].x, points[this.p+i+1].y),
  hover: false
});
    }
    points[this.p+17].fill = [0,0];
    
    //Pegs
    sticks.push({
  p0: points[this.p+1],
  p1: points[this.p+4],
  length: 0,
  hover: false
});
    
    sticks.push({
  p0: points[this.p],
  p1: points[this.p+15],
  length: 0,
  hover: false
});
    
        sticks.push({
  p0: points[this.p],
  p1: points[this.p+14],
  length: dist(points[this.p].x, points[this.p].y, points[this.p+14].x, points[this.p+14].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+8],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+8].x, points[this.p+8].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+17],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+17].x, points[this.p+17].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+5],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+5].x, points[this.p+5].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+2],
  p1: points[this.p+5],
  length: dist(points[this.p+2].x, points[this.p+2].y, points[this.p+5].x, points[this.p+5].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+2],
  p1: points[this.p+15],
  length: dist(points[this.p+2].x, points[this.p+2].y, points[this.p+15].x, points[this.p+15].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+5],
  p1: points[this.p+8],
  length: dist(points[this.p+5].x, points[this.p+5].y, points[this.p+8].x, points[this.p+8].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+8],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+8].x, points[this.p+8].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+11],
  p1: points[this.p+9],
  length: dist(points[this.p+11].x, points[this.p+11].y, points[this.p+9].x, points[this.p+9].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+12],
  p1: points[this.p+8],
  length: dist(points[this.p+12].x, points[this.p+12].y, points[this.p+8].x, points[this.p+8].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+17],
  p1: points[this.p+12],
  length: dist(points[this.p+17].x, points[this.p+17].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
     sticks.push({
  p0: points[this.p+15],
  p1: points[this.p+12],
  length: dist(points[this.p+15].x, points[this.p+15].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
     sticks.push({
  p0: points[this.p+14],
  p1: points[this.p+12],
  length: dist(points[this.p+14].x, points[this.p+14].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
    
  }
  
  display(){
    fill(this.c);
    noStroke();
    beginShape();
    for (let i = 2; i <= 16; i++){
      vertex(points[this.p+i].x, points[this.p+i].y);
    }
    endShape(CLOSE);
  }
}

class Sock {
  constructor(x, y, s, d, c, p){
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.p = p;
    
    points.push(new Point(x, y, 10, false));
    points.push(new Point(x+s*0.3*d, y, 10, false));
    points.push(new Point(x+s*0.3*d, y+s*0.5, 10, false));
    points.push(new Point(x+s*0.3*d, y+s*1.2, 10, false));
    points.push(new Point(x+s*0.0*d, y+s*1.5, 10, false));
    points.push(new Point(x-s*0.5*d, y+s*1.7, 10, false));
    points.push(new Point(x-s*0.8*d, y+s*1.7, 10, false));
    points.push(new Point(x-s*1*d, y+s*1.6, 10, false));
    points.push(new Point(x-s*1.1*d, y+s*1.45, 10, false));
    points.push(new Point(x-s*1*d, y+s*1.2, 10, false));
    points.push(new Point(x-s*0.7*d, y+s*1.05, 10, false));
    points.push(new Point(x-s*0.5*d, y+s*0.9, 10, false));
    points.push(new Point(x-s*0.5*d, y+s*0.5, 10, false));
    points.push(new Point(x-s*0.5*d, y, 10, false));
    
    for (let i = 1; i < 14; i++){
      points[this.p+i].fill = [0,0];
      sticks.push({
  p0: points[this.p+i],
  p1: points[this.p+i+1],
  length: dist(points[this.p+i].x, points[this.p+i].y, points[this.p+i+1].x, points[this.p+i+1].y),
  hover: false
});
    }
    
    points[this.p+14].fill = [0,0];
    
    //peg connect
    sticks.push({
  p0: points[this.p],
  p1: points[this.p+1],
  length: 0,
  hover: false
});
    
    sticks.push({
  p0: points[this.p+2],
  p1: points[this.p+13],
  length: dist(points[this.p+2].x, points[this.p+2].y, points[this.p+13].x, points[this.p+13].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+14],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+14].x, points[this.p+14].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+12],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+4],
  p1: points[this.p+13],
  length: dist(points[this.p+4].x, points[this.p+4].y, points[this.p+13].x, points[this.p+13].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+4],
  p1: points[this.p+11],
  length: dist(points[this.p+4].x, points[this.p+4].y, points[this.p+11].x, points[this.p+11].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+5],
  p1: points[this.p+12],
  length: dist(points[this.p+5].x, points[this.p+5].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+5],
  p1: points[this.p+12],
  length: dist(points[this.p+5].x, points[this.p+5].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+5],
  p1: points[this.p+11],
  length: dist(points[this.p+5].x, points[this.p+5].y, points[this.p+11].x, points[this.p+11].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+12],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+11],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+11].x, points[this.p+11].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+7],
  p1: points[this.p+11],
  length: dist(points[this.p+7].x, points[this.p+7].y, points[this.p+11].x, points[this.p+11].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+7],
  p1: points[this.p+10],
  length: dist(points[this.p+7].x, points[this.p+7].y, points[this.p+10].x, points[this.p+10].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+7],
  p1: points[this.p+9],
  length: dist(points[this.p+7].x, points[this.p+7].y, points[this.p+9].x, points[this.p+9].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+8],
  p1: points[this.p+9],
  length: dist(points[this.p+8].x, points[this.p+8].y, points[this.p+9].x, points[this.p+9].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+8],
  p1: points[this.p+10],
  length: dist(points[this.p+8].x, points[this.p+8].y, points[this.p+10].x, points[this.p+10].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+3],
  p1: points[this.p+13],
  length: dist(points[this.p+3].x, points[this.p+3].y, points[this.p+13].x, points[this.p+13].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+4],
  p1: points[this.p+12],
  length: dist(points[this.p+4].x, points[this.p+4].y, points[this.p+12].x, points[this.p+12].y),
  hover: false
});
    
  }
  
  display(){
    fill(this.c);
    noStroke();
    beginShape();
    for (let i = 1; i <= 14; i++){
      vertex(points[this.p+i].x, points[this.p+i].y);
    }
    endShape(CLOSE);
  }
}

class Pants {
  constructor(x, y, s, l, c, p){
    this.x = x;
    this.y = y;
    this.s = s;
    this.l = l;
    this.c = c;
    this.p = p;
    
    points.push(new Point(x, y, 10, false));
    points.push(new Point(x+s*0.5, y, 10, false));
    points.push(new Point(x+s*0.9, y+s*1.2*l, 10, false));
    points.push(new Point(x+s*0.2, y+s*1.2*l, 10, false));
    // points.push(new Point(x+s*0.2, y+s*1.2*l, 10, false));
    points.push(new Point(x, y+s*0.6, 10, false));
    // points.push(new Point(x-s*0.2, y+s*1.2*l, 10, false));
    points.push(new Point(x-s*0.2, y+s*1.2*l, 10, false));
    points.push(new Point(x-s*0.9, y+s*1.2*l, 10, false));
    points.push(new Point(x-s*0.5, y, 10, false));
    
    for (let i = 2; i < 9; i++){
      points[this.p+i].fill = [0,0];
      sticks.push({
  p0: points[this.p+i],
  p1: points[this.p+i+1],
  length: dist(points[this.p+i].x, points[this.p+i].y, points[this.p+i+1].x, points[this.p+i+1].y),
  hover: false
});
    }
    
    points[this.p+9].fill = [0,0];
    
    sticks.push({
  p0: points[this.p+2],
  p1: points[this.p+9],
  length: dist(points[this.p+2].x, points[this.p+2].y, points[this.p+9].x, points[this.p+9].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+5],
  p1: points[this.p+2],
  length: dist(points[this.p+5].x, points[this.p+5].y, points[this.p+2].x, points[this.p+2].y),
  hover: false
});
    
     sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+4],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+4].x, points[this.p+4].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+8],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+8].x, points[this.p+8].y),
  hover: false
});
    
//     sticks.push({
//   p0: points[this.p+7],
//   p1: points[this.p+9],
//   length: dist(points[this.p+7].x, points[this.p+7].y, points[this.p+9].x, points[this.p+9].y),
//   hover: false
// });
    
//     sticks.push({
//   p0: points[this.p+2],
//   p1: points[this.p+8],
//   length: dist(points[this.p+2].x, points[this.p+2].y, points[this.p+8].x, points[this.p+8].y),
//   hover: false
// });
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+9],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+9].x, points[this.p+9].y),
  hover: false
});
    
    sticks.push({
  p0: points[this.p+6],
  p1: points[this.p+3],
  length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+3].x, points[this.p+3].y),
  hover: false
});
    
//     sticks.push({
//   p0: points[this.p+6],
//   p1: points[this.p+2],
//   length: dist(points[this.p+6].x, points[this.p+6].y, points[this.p+2].x, points[this.p+2].y),
//   hover: false
// });
    
    sticks.push({
  p0: points[this.p],
  p1: points[this.p+9],
  length: 1,
    hover: false,
});

    
    sticks.push({
  p0: points[this.p+1],
  p1: points[this.p+3],
  length: 1,
});
    
    
  }
  
  display(){
    fill(this.c);
    noStroke();
    beginShape();
    for (let i = 2; i <= 6; i++){
      vertex(points[this.p+i].x, points[this.p+i].y);
    }
    endShape(CLOSE);
    
    beginShape();
    for (let i = 6; i <= 9; i++){
      vertex(points[this.p+i].x, points[this.p+i].y);
    }
    vertex(points[this.p+2].x, points[this.p+2].y);
    vertex(points[this.p+3].x, points[this.p+3].y);
    endShape(CLOSE);
  }
  
}

function updateSticks(){
  for (let i = 0; i < sticks.length; i++){
    let s = sticks[i],
        dx = s.p1.x - s.p0.x,
        dy = s.p1.y - s.p0.y,
        // d0 = dist(s.p0.x, s.p0.y, mouseX, mouseY),
        // d1 = dist(s.p1.x, s.p1.y, mouseX, mouseY),
        distance = dist(s.p0.x, s.p0.y, s.p1.x, s.p1.y),
        difference = s.length - distance,
        percent = difference/max(distance,0.001)/2,
        offsetX = dx * percent,
        offsetY = dy * percent;
    
    // if (d0+d1 >= s.length-2 && d0+d1 <= s.length+2){
    //   s.hover = true;
    // } else {
    //   s.hover = false;
    // }
    
    if (!s.p0.pinned){
     
      s.p0.x -= offsetX;
      s.p0.y -= offsetY;
    }
    if (!s.p1.pinned){
      s.p1.x += offsetX;
      s.p1.y += offsetY;
    }
  }
}

function renderSticks(){
  for (let i = 0; i < sticks.length; i++){
    let s = sticks[i];
    if (s.colour){
      stroke(s.colour);
    } else {
      noStroke();
    }
    
    line(s.p0.x, s.p0.y, s.p1.x, s.p1.y);
  }
}

function mousePressed(){
  clothes = [];
  points = [];
  sticks = [];
  pegs = [0];
  setup();
}

class Point{
  constructor(x, y, size, isPinned){
    this.x = x;
    this.y = y;
    this.oldx = x;
    this.oldy = y;
    this.size = size;
    this.fill = random(colours);
    this.pinned = isPinned;
    this.distFromPoint = 0;
    this.id = points.length;
  }
  
  hover(){
    this.distFromPoint = dist(mouseX, mouseY, this.x, this.y);
    
    if (this.distFromPoint < this.size){
      this.fill = 'yellow';
      vertHover += 1;
      lastHover = this.id;
    }
    else{
      this.fill = 255;
    }
  }
  
  update(){
    if (!this.pinned){
      let vx = (this.x - this.oldx) * friction,
          vy = (this.y - this.oldy) * friction;
        
      this.oldx = this.x;
      this.oldy = this.y;
      this.x += vx;
      this.x += wind;
      this.y += vy;
      this.y += gravity;
    }     
  }
  
  constrain(){
    if (!this.pinned){
        let vx = (this.x - this.oldx) * friction,
        vy = (this.y - this.oldy) * friction;
//     if (this.x > width){
//         this.x = width;
//         this.oldx = this.x + vx * bounce;
//       } 
//       else if (this.x < 0){
//         this.x = 0;
//         this.oldx = this.x + vx * bounce;
//       }

//       if (this.y > height){
//         this.y = height;
//         this.oldy = this.y + vy * bounce;
//       } 
//       else if (this.y < 0){
//         this.y = 0;
//         this.oldy = this.y + vy * bounce;
//       }
    }
  }
  
  render(){
    noStroke();
    if (this.pinned){
      stroke(this.fill);
      noFill();
      // rect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    } else {
      fill(this.fill);
      noStroke();
      rect(this.x, this.y-this.size*0.4, this.size*0.3, this.size*0.6);
    // circle(this.x, this.y, this.size);
    }
  }
  
  onClick(){
    this.distFromPoint = dist(mouseX, mouseY, this.x, this.y);
    
    if (this.distFromPoint < this.size/2){
      if (buttonPressed == 'anchor'){
        this.pinned = true;
      }
      if (buttonPressed == 'vertex'){
        this.pinned = false;
      }
        vertX = this.x;
        vertY = this.y;
    }
  }
  
}