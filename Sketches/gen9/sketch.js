let colours = [
  [20, 30, 60],
  [46,38,79],
  [33, 63, 153],
  [91, 142, 186],
  [173, 158, 43],
  [180,188,200]
];

let scene = 1;

let seatLayer, patternLayer, lightLayer;

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(0.9 * dim, 0.9 * dim);
  rectMode(CENTER);
  noStroke();
  
  seatLayer = createGraphics(width, height);
  seatLayer.rectMode(CENTER);
  seatLayer.noStroke();
  seats();
  
  patternLayer = createGraphics(width, height);
  patternLayer.noStroke();
  patternLayer.rectMode(CENTER);
  
  scene = 1;
  
  if (scene == 0){
    pattern(width / 2, height / 2, width, height);
  } else {
    pattern(width / 2, height / 2, width*0.75, height*0.75);
  }
  
  lightLayer = createGraphics(width, height);
}

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(0.9 * dim, 0.9 * dim);
  rectMode(CENTER);
  noStroke();
  
  seatLayer = createGraphics(width, height);
  seatLayer.rectMode(CENTER);
  seatLayer.noStroke();
  seats();
  
  patternLayer = createGraphics(width, height);
  patternLayer.noStroke();
  patternLayer.rectMode(CENTER);
  
  scene = 1;
  
  if (scene == 0){
    pattern(width / 2, height / 2, width, height);
  } else {
    pattern(width / 2, height / 2, width*0.75, height*0.75);
  }
  
  lightLayer = createGraphics(width, height);
  
}

function seats(){
  seatLayer.fill(80,89,87);
  
  seatLayer.rect(width/2, height*0.07, width, height*0.1, width*0.4, 0, 0, 0);
  
  seatLayer.rect(0, height/2, width, height, 0, width*0.4, 0, 0);
  seatLayer.rect(width, height/2, width, height, width*0.4, 0, 0, 0);
  
  seatLayer.beginShape();
  seatLayer.curveVertex(width*0.5, height*0.5);
  seatLayer.curveVertex(width*0.5, height*0.5);
  seatLayer.curveVertex(width*0.4, height*0.15);
  seatLayer.curveVertex(width*0.47, height*0.25);
  seatLayer.curveVertex(width*0.53, height*0.25);
  seatLayer.curveVertex(width*0.6, height*0.15);
  seatLayer.curveVertex(width*0.5, height*0.5);
  seatLayer.curveVertex(width*0.5, height*0.5);
  seatLayer.endShape();
  
  seatLayer.fill(216,172,20);
  seatLayer.rect(width/2, height*0.05, width*0.3, height*0.06, 0, 0, height*0.3, height*0.3);
  
  seatLayer.erase();
  seatLayer.rect(-width*0.03, height*0.51, width, height, 0, width*0.4, 0, 0);
  seatLayer.rect(width*1.03, height*0.51, width, height, width*0.4, 0, 0, 0);
}

function draw() {

  if (scene == 0){
  background(44*0.8, 48*0.8, 48*0.8);
    // background('antiquewhite')
  
  rock = noise(frameCount/30)*15
  
  image(patternLayer, 0, rock);
  image(seatLayer, 0, rock);
  
  //lights
  push();
  translate((frameCount/30)%3*width-width, height/2)
  rotate(-PI*0.01);
  noStroke();
  fill(240, 236, 194, 10)
  rect(0, 0, width , 4*height);
  pop();
  
  } else {
    background('antiquewhite');
    image(patternLayer, 0, 0);
  }

}

function mousePressed(){
  scene = 1;
  noiseSeed(random()*1000);
  patternLayer.clear();
  if (scene == 0){
    pattern(width / 2, height / 2, width, height);
  } else {
    pattern(width / 2, height / 2, width*0.75, height*0.75);
  }
  loop();
}

function pattern(x, y, w, h) {
  patternLayer.fill(colours[0]);
  patternLayer.rect(x, y, w, h);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      for (let k = 1; k < colours.length; k++) {
        if (noise(i * 0.04 + k * 1000, j * 0.04 + k * 1000) > 0.3 + min(0.1 * k, 0.5)) {
          patternLayer.fill(...colours[k], 100);
          if (random() < 0.2){
            patternLayer.ellipse(x - w / 2 + i, y - h / 2 + j, random(1, 3), random(2,4));
          }
        }
      }
    }
  } 
  
  if (scene == 0){
    patternLayer.erase();
    patternLayer.beginShape();
    patternLayer.vertex(0, 0);
    patternLayer.vertex(0.2*width, 0.018*height);
    patternLayer.vertex(0.35*width, 0.1*height);
    patternLayer.vertex(0.4*width, 0.15*height);
    patternLayer.vertex(width/2, 0.4*height);
    patternLayer.vertex(0.6*width, 0.15*height);
    patternLayer.vertex(0.65*width, 0.1*height);
    patternLayer.vertex(0.8*width, 0.018*height);
    patternLayer.vertex(width, 0);
    patternLayer.endShape();
    patternLayer.noErase();
  }
}
