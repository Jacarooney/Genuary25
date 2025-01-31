let canvasText = 'Drag an image file onto the canvas.';

let displayImage = false;

let w, h, ar, dim, img;

let wheel, wheelSize;

let alph = 0;

function setup(){
  dim = min(windowWidth, windowHeight)*0.9;
  
  let dropArea = createCanvas(dim, dim);
  
  textFont('georgia');
  textSize(dim*0.05);
  
  angleMode(DEGREES);
  
  wheel = createGraphics(dim, dim);
  wheelSize = dim*0.4;
  wheel.strokeWeight(dim*0.0025);
  dropArea.drop(gotFile);
  imageMode(CENTER);
  pixelDensity(2);
  
  // print(RGBtoHSV(255, 0, 0));  
}

function gotFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, success, fail);
  } else {
    canvasText = 'Not a recognised image file!';
  }
}

function success(){
  w = img.width;
  h = img.height;
  alph = 0;
  wheel.clear();
  
  if (w > h){
    ar = h/w;
    w = dim;
    h = ar*dim;
  } else {
    ar = w/h;
    w = ar*dim;
    h = dim;
  } 
  displayImage = true;
}

function fail(){
  canvasText = "Image failed to load!";
}

function RGBtoHSV (r, g, b){
  let h, s, v;
  r = r/255;
  g = g/255;
  b = b/255;
  let M = max(r, g, b);
  let m = min(r, g, b);
  let c = M-m;
  s = (c/M);
  let R = (M-r)/c;
  let G = (M-g)/c;
  let B = (M-b)/c;
  
  
  
  if (M == m){
    h = 0;
  } else if (M == r){
    h = B-G;
  } else if (M == g){
    h = 2+R-B;
  } else if (M == b){
    h = 4+G-R;
  }
  
  h = ((h/6)%1)*360;
  v = M;
  
  return [h, s, v];
}

function windowResized(){
  dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  displayImage = false;
  canvasText = 'Drag an image file onto the canvas.';
  setup();
}

function draw(){
  background(22, 24, 24);
  
  if (displayImage){ 
    img.loadPixels();
    
    for (let i = 0; i < 500; i++){
      let pix = floor(random(img.pixels.length/4))*4;
    
      let c = [img.pixels[pix],
               img.pixels[pix+1],
               img.pixels[pix+2]];
      
      
      if (!(img.pixels[pix] == 22 &&
            img.pixels[pix+1] == 24 &&
            img.pixels[pix+2] == 24)){
        let pos = RGBtoHSV(...c);
        let xPos = width/2 + cos(pos[0])*pos[2]*wheelSize;
        let yPos = height/2 + sin(pos[0])*pos[2]*wheelSize;
        wheel.stroke(...c, pos[1]*255);
        wheel.point(xPos, yPos);
      }

      img.pixels[pix] = 22;
      img.pixels[pix+1] = 24;
      img.pixels[pix+2] = 24;
      img.pixels[pix+3] = 255;
    }
    img.updatePixels();
    image(img, width/2, height/2, w, h);
    
    background(22, 24, 24, alph);
    alph += 0.3;
    
    image(wheel, width/2, height/2, width, height);
  } else {
    push();
    strokeWeight(width*0.05);
    stroke(255);
    noFill();
    rectMode(CENTER);
    square(width/2, height/2, width);
    pop();
    
    fill(255);
    noStroke();
    textAlign(CENTER);
    text(canvasText, width / 2, height / 2);
  }
 
}