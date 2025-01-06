let texture;
let tLayer;
//texture source:
//https://www.istockphoto.com/photo/crayon-scribble-gm536111629-57501666

//All my beautiful pencils
let skyColours = ['dodgerblue', 'lightskyblue', [33, 42, 94]];
let sunColours = ['orange', 'gold'];
let mountainColours = ['slategray', 'darkslateblue'];
let hillColours = ['olive', 'yellowgreen'];
let leafColours = ['firebrick', 'darkred'];
let trunkColours = ['lightsteelblue', 'darkseagreen'];
let houseColours = [[51, 40, 36], 'darkslategrey'];
let roofColours = ['orangered', 'darkcyan'];
let doorColours = ['yellow', 'black'];
let pathColours = ['sandybrown', 'chocolate'];


function preload(){
  texture = loadImage("pencilTexture.png");
}

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(0.9*dim, 0.9*dim).style("-webkit-filter", `url("#svgfilter")`).style("filter", `url("#svgfilter")`);
  
  tLayer = createGraphics(width, height);
  
  // strokeCap(PROJECT);
  // colorMode(HSB);
  strokeWeight(3);
  noStroke();
  
  drawNew();
  
  addTexture();
}

function drawNew() {
  //SKY
  background(random(skyColours));
  
  //SUN
  fill(random(sunColours));
  ellipse(random(width), height*0.3, random(width/4, width/2));
  
  //MOUNTAINS
  fill(random(mountainColours));
  let hillX = random(width/4);
  let hillW;
  
  while (hillX < width){
    hillW = random(width*0.5, width)
    ellipse(hillX, height*0.45, hillW, random(height*0.2, height*0.4));
    hillX += hillW/2;
  }
  
  //BACKGROUND HILL
  stroke(0, 110);
  fill(random(hillColours));
  rect(-width/2, random(height*0.35, height*0.45), 2*width, height);
  noStroke();
  
  //TREES
  tree(random(width*0.4), height/2, width*0.2);
  tree(random(width*0.6, width), height/2, width*0.2);
  
  //Foreground Height
  let fgY = random(height*0.58, height*0.72);
  
  //HOUSE
  house(width/2, fgY, width*0.2);
  
  //FOREGROUND HILL
  fill(random(hillColours));
  rect(-width/2, fgY, 2*width, height);
  
  //PATH
  fill(random(pathColours));
  let pathW = random(width*0.1, width*0.15);
  let pathX = random(width*0.2, width*0.8);
  quad(pathX, fgY, pathX+pathW, fgY, pathX+pathW+random(width*0.12, width*0.25), height*1.2, pathX-random(width*0.12, width*0.25), height*1.2);
  
  //Line
  stroke(0, 120);
  noFill();
  rect(-width/2, fgY, 2*width, height);
  noStroke();
}

function addTexture() { 
  tLayer.clear();
  tLayer.colorMode(HSB);
  tLayer.imageMode(CENTER);
  tLayer.tint(0, 0, 255);
  tLayer.push();
  tLayer.translate(width/2, height/2);
  tLayer.rotate(random(TWO_PI));
  tLayer.image(texture, 0, 0, 1.8*width, 1.8*height);
  tLayer.pop();
  push();
  colorMode(HSB);
  tint(200, 30, 40, 0.2);
  image(tLayer, 0, 0, width, height);
  pop();
}

function tree(x, y, w, h) {
  push();
  translate(x, y);
  
  //Trunk
  let trunkW = random(w/6, w/4);
  fill(random(trunkColours));
  rect(-trunkW/2, 0, trunkW, w*1.5);
  
  //Leaves
  fill(random(leafColours));
  let leafW = random(trunkW*2.5, trunkW*5);
  ellipse(0, -leafW*0.5, leafW, random(leafW*1.5, leafW*1.9));
  pop();
}

function house(x, y, s) {
  push();
  translate(x, y);
  
  let frontW = random(s/2, s);
  let frontH = frontW*random(0.5, 1.5);
  let sideW = frontW*random(0.2, 1);
  let roofH = random(s/6, s/2);
  
  fill(random(houseColours));
  
  //FRONT
  rect(0, -frontH, frontW, frontH);
  
  //SIDE
  rect(-sideW, -frontH-1, sideW+1, frontH+1);
  
  //attic
  triangle(-sideW, -frontH, 0, -frontH, -sideW/2, -frontH-roofH);
  
  //Door
  fill(random(doorColours));
  let doorH = frontH/2;
  let doorW = doorH*random(0.3, 0.7);
  rect(frontW/2-doorW/2, -doorH, doorW, doorH);
  
  
  //window
  let winW = sideW*random(0.2, 0.4);
  square(-sideW/2-winW/2, -frontH/2-winW/2, winW);
  
  //ROOF
  fill(random(roofColours));
  quad(0, -frontH, -sideW/2, -frontH-roofH, frontW-sideW/2, -frontH-roofH, frontW, -frontH);
  
  
  pop();
}

function mousePressed() {
  drawNew();
  addTexture();
}

function windowResized(){
  let side = min(windowWidth, windowHeight);
  resizeCanvas(side*0.9, side*0.9);
  noStroke();
  fill(0);
  textFont('georgia');
  textSize(side*0.07);
  // background('antiqueWhite');
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}