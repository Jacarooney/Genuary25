var img;
var img2;

function preload() {
  img = loadImage('black.png');
  img2 = loadImage('white.png');
}

function setup() {
  let dim = min(windowWidth, windowHeight)*0.9;
  createCanvas(dim,dim);
  pixelDensity(1);
  img.resize(width, height);
  img2.resize(width, height);
}

function windowResized() {
  let dim = min(windowWidth, windowHeight)*0.8;
  createCanvas(dim,dim);
}

function draw() {
  //black background
  background(0);

  var moveHorizontal1 = map(mouseX, 0, width/2, 0, width);
  var moveHorizontal2 = map(mouseX, width, width/2, 0, width);
  var distance = constrain(dist(width / 2, height, mouseX, mouseY), 0, width/4);
  var moveMax = map(distance, 0, width/40, width/20, 0);
  
  if(mouseX > 0 && mouseX <= width/2){
  img.loadPixels();
  stroke(255);
  strokeWeight(1);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
     
      var current1 = (x + (y * img.width)) * 4;
 
      if (img.pixels[current1] > 30) {
        point(x + random(-(moveMax + moveHorizontal1), moveMax + moveHorizontal1) + random(-2, 2), y + random(-(moveMax + moveHorizontal1), moveMax + moveHorizontal1)+ random(-2, 2));
      }
    }
  } 
  }
  
 else if(mouseX > width/2 && mouseX <= width){
  img2.loadPixels();
  stroke(255);
  strokeWeight(1);
   
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      
      var current2 = (x + (y * img2.width)) * 4;
    
      if (img2.pixels[current2] > 30) {
        point(x + random(-(moveMax + moveHorizontal2), moveMax + moveHorizontal2) + random(-2, 2), y + random(-(moveMax + moveHorizontal2), moveMax + moveHorizontal2) + random(-2, 2));
      }
    }
  } 
  }
  else{
  stroke(255);
    for (let i = 0; i < width*40; i++){
      point(random(width), random(height));
    }
    
  }
  
  
}