function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim, dim);
  noStroke();
  fill(0);
  textFont('garamond');
  textSize(dim*0.1);
  background('antiqueWhite');
  textAlign(CENTER, CENTER);
  text("Click to generate new", width/2, height/2);
}


function setup() {
  // console.log(window.getFrameDimensions()[0]);
  // let fW = window.getFrameDimensions()[0];
  // let fH = window.getFrameDimensions()[1];
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  background('antiqueWhite');
  // randomSeed(1);
  // noiseSeed(1);
  
  //Horizon
  let horizonHeight = random(height - 100, height - 20);
  strip(0, width, horizonHeight, random(5,30), random(0.1, 0.5), 100, 0.5);
  
  //DRAW CASTLE
  let castleWidth = random(200, 300);
  castle(width/2-castleWidth/2, height, castleWidth, castleWidth*random(1, 1.5), floor(random(3, 6)), floor(random(3, 5)));
  
  //DRAW BIRDS
  let numBirds = floor(random(2, 12));
  
  for (let i = 0; i < numBirds; i++){
    let birdW = random(10, 40);
    bird(random(width), random(height/2, 15), birdW, random(birdW*0.1, birdW*0.2));
  }
  

}

function bird(x, y, w, h){
 
  for (let i = 0; i < w; i += random(1, 2)){
    let angle = map(i, 0, w, 0.8, 5.5);
    line(x+i, y-abs(sin(angle)*h), x+i, y-abs(sin(angle)*h)+noise((i+x)/100)*cos(angle)*h);
  }
}

function stripRect(x, y, w, h, xDensity, maxLine, maxGap, waver, noiseTop){
  
  let div = map(xDensity, 0, 1, 1, w);

  let y2 = random(maxLine);
  let yFlag = false;
  for (let i = 0; i < w; i+= w/div){
    yFlag = false;
    for (let j = noise((i+x)/20)*30*noiseTop; j < h; j += y2){
      yFlag = !yFlag;
      if (yFlag){
        y2 = random(maxLine);
        let startY = (y+j)*random(1-waver,1+waver);
        let endY = min(y+j+y2, y+h)*random(1-waver,1+waver);
        let xPos = (x+i)*random(1-waver,1+waver);
        line(xPos, startY, xPos, endY);
      } else {
        y2 = random(maxGap)
      }
    }
    
  }
}

function stripArch(x, y, w, h, xDensity, maxLine, maxGap, waver){
  
  let div = map(xDensity, 0, 1, 1, w);

  let y2 = random(maxLine);
  let yFlag = false;
  for (let i = 0; i < w; i+= w/div){
    yFlag = false;
    let angle = map(i, 0, w, 0, TWO_PI);
    for (let j = cos(angle)*h/10; j < h; j += y2){
      yFlag = !yFlag;
      if (yFlag){
        y2 = random(maxLine);
        let startY = (y+j)*random(1-waver,1+waver);
        let endY = min(y+j+y2, y+h)*random(1-waver,1+waver);
        let xPos = (x+i)*random(1-waver,1+waver);
        line(xPos, startY, xPos, endY);
      } else {
        y2 = random(maxGap)
      }
    }
    
  }
}

function castle(x, y, w, h, numLevels, numColumns){
  
  let colW = w/numColumns;
  let rowH = h/numLevels;
  
  let fLevels = [];
  let bLevels = [];
  let maxHeight = numLevels;
  let numCols = numColumns;
  let frontHeight = floor(random(1, maxHeight+1));
  let backHeight = floor(random(1, maxHeight));
  
  //Generate column heights
  for (let i = 0; i < numCols; i++){
    fLevels.push(frontHeight);
    frontHeight -= floor(random(-2, 3));
    frontHeight = constrain(frontHeight, 0, maxHeight);
    
    bLevels.push(backHeight);
    backHeight -= floor(random(-2, 2));
    backHeight = constrain(backHeight, 1, maxHeight-1);
  }
  
  //DRAW CASTLE BACK WALL 
  push();
  translate(20, 10);
  for (let i = 0; i < bLevels.length; i++){
    for (let j = 0; j < bLevels[i]; j++){
      let topFlag = 0;

      if (j == 0){
        
        topFlag = 1;
        stroke('antiqueWhite');
        stripRect(x+i*colW, y-rowH*(bLevels[i]), colW, rowH*10, 10, 30, 10, 0, topFlag);
        stroke(random(5), random(5), random(5));
        stripRect(x+i*colW, y-rowH*(bLevels[i]), colW, rowH*10, 0.4, rowH/2, rowH/60, 0.002, topFlag);
      }

      //Draw windows
      let windowType = random(20);
      stroke('antiquewhite');
      fill(0);
        
      if (windowType < 13){
        //DRAW SINGLE WINDOW
        stripArch(x+(i+0.35)*colW, y-rowH*(j+0.6), colW/4, rowH/5, 2, 40, 4, 0);
        // rect(x+(i+0.35)*colW, y-rowH*(j+0.6), colW/4)
      } else if (windowType < 18){
        //DRAW DOUBLE
        stripArch(x+(i+0.25)*colW, y-rowH*(j+random([0.5, 0.55, 0.6])), colW/8, rowH/6, 2, 40, 4, 0);
        stripArch(x+(i+0.5)*colW, y-rowH*(j+random([0.55, 0.5, 0.6])), colW/8, rowH/6, 2, 40, 4, 0);
      }
      
    }
  }
  pop();
  
  //DRAW CASTLE FRONT WALL 
  for (let i = 0; i < fLevels.length; i++){
    for (let j = 0; j < fLevels[i]; j++){
      let topFlag = 0;

      if (j == fLevels[i]-1){
        topFlag = 1;
      }
      

      stroke('antiqueWhite');
      stripRect(x+i*colW, y-rowH*(j+1), colW, rowH, 10, 30, 10, 0, topFlag);
      stroke(random(5), random(5), random(5));
      stripRect(x+i*colW, y-rowH*(j+1), colW, rowH*1.01, 0.2, rowH/3, rowH/8, 0.002, topFlag);
    
      
      //Draw battlements
      if (j == maxHeight-1){
        //left
        if (random(20) < 12){
          noStroke();
          fill('antiquewhite');
          rect(x+i*colW, y-rowH*(j+1.1), colW/4, rowH/10);
          stroke(random(5), random(5), random(5));
          stripRect(x+i*colW, y-rowH*(j+1), colW/4, rowH/5, 0.25, 30, 10, 0.002, 0);
        }
        //right
        if (random(20) < 12){
          noStroke();
          fill('antiquewhite');
          rect(x+(i+0.5)*colW, y-rowH*(j+1.1), colW/4, rowH/10);
          stroke(random(5), random(5), random(5));
          stripRect(x+(i+0.5)*colW, y-rowH*(j+1), colW/4, rowH/5, 0.4, 30, 10, 0.002, 0);
        }
      } 
      
      if (j < fLevels[i]-1){
        let windowType = random(20);
        fill(0);
        if (windowType < 8){
          //DRAW SINGLE WINDOW
          stripArch(x+(i+0.35)*colW, y-rowH*(j+0.6), colW/4, rowH/5, 0.8, 40, 4, 0);
        } else if (windowType < 13){
          //DRAW DOUBLE
          stripArch(x+(i+0.25)*colW, y-rowH*(j+random([0.5, 0.55, 0.6])), colW/8, rowH/6, 0.8, 40, 4, 0);
          stripArch(x+(i+0.5)*colW, y-rowH*(j+random([0.55, 0.5, 0.6])), colW/8, rowH/6, 0.8, 40, 4, 0);
        }
      }
      
      
    }
  }
  
}

function strip(x, xSpread, y, ySpread, density, noiseHop, waver) {
  
  let length = x + xSpread;
  density = constrain(density, 0, 1);
  let div = map(density, 0, 1, 1, length);
  
  for (let i = x; i < length; i += (length/div)*random(1-waver,1+waver)){
    let y1 = y - noise((i+ySpread)/noiseHop)*ySpread;
    let y2 = y + noise((i+xSpread)/noiseHop)*ySpread;
    line(i, y1, i, y2);
  }
  
}

function mousePressed(){
  setup();
}