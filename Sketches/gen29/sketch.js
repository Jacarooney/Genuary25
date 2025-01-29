let frame = document.getElementById("iframe");
let frame2 = document.getElementById("iframe2");

let canv = document.getElementById("canv");

//Page&Grid Spacing
let pageW, pageH, marginTop, marginBottom, inner, outer, gridLX, gridY,gridRX, gridW, gridH, numCols, numRows, leftX, rightX, margin, colSize, gutterW, gridCLX, gridCRX, gridCY;

//Placement Logic
let rPage = 0;
let spaces = [];
let tiles = [];
//0 = canvas, 1 = prompt, 2 = body
let choices = [];
let pPos; //page
let cPos; //chapter
let tPos = []; //title
let tText = [];
let sPos; //secondary text

// let genPos = [];

let cText = "Genuary 2025"
let pg = 0;
let genNums = [];
let pAlign = [];

let showGrid = false;


let T, L, B, R;

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim, P2D, canv); 
  rectMode(CENTER);
  
      // randomSeed(14);
  
  calcSizing();
  
  choices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
  
  pg = floor(random(1, 150))*2;
  
  pPos = random(['tl', 'bl', 'bm']);
  
  let cChoices = ['tl', 'tm', 'bl', 'bm'];
  
  cChoices.splice(cChoices.indexOf(pPos), 1);
  
  cPos = random(cChoices);
  
  textFont('garamond');
  textLeading(gutterW);
  pixelDensity(4);
  

  for (let a = 0; a < 2; a++){
    spaces[a] = [];
    for (let i = 0; i < numCols; i++){
      spaces[a][i] = [];
      for (let j = 0; j < numRows; j++){
        spaces[a][i][j] = 0;
      }
    }
  }
  
  tiles = [[], []];
  generatePages(0);
  
  rPage = floor(random(3));
  
  if (rPage == 0){
    //random
    generatePages(1);
  } else if (rPage == 1){
    //copy left
    spaces[1] = spaces[0];
    tiles[1] = tiles[0];
    let c = random(choices);   
    genNums.push(c);
    tText.push(titles[c-1]);
    tPos.push(random([0, 1, 2]));
    pAlign[1] = pAlign[0];
  } else {
    //mirror left
    spaces[1] = revSpaces(spaces[0]);
    tiles[1] = revTiles(tiles[0]);
    
    
    let c = random(choices);   
    genNums.push(c);
    tText.push(titles[c-1]);
    tPos.push(2-tPos[0]);
    
    //REVERSE pALIGN
    pAlign[1] = [];
    if (pAlign[0][0] == "left"){
      pAlign[1][0] = "right";
    }
    if (pAlign[0][0] == "right"){
      pAlign[1][0] = "left";
    }
    if (pAlign[0][1] == "alphabetic"){
      pAlign[1][1] = "alphabetic";
    }
    if (pAlign[0][1] == "top"){
      pAlign[1][1] = "top";
    }
  }
  frame.src = "../gen"+(genNums[0])+"/index.html";
  frame2.src = "../gen"+(genNums[1])+"/index.html"; 

}

function revSpaces(t){
  let o = [];
  for (let i = 0; i < numCols; i++){
    o[i] = [];
    for (let j = 0; j < numRows; j++){
      o[i][j] = t[(numCols-1)-i][j];
    }
  }
  return o;
}

function revTiles(t){
  let o = [];
  for (let i = 0; i < t.length; i++){
    o[i] = [];
    for (let j = 0; j < t[i].length; j++){
      if (j == 0){
        o[i][j] = (numCols) - t[i][j] - t[i][j+2];
      } else {
        o[i][j] = t[i][j];
      }
      
    }
  }
  return o;
}

function calcSizing(){
  pageH = height*0.707;
  pageW = pageH*0.707; //B-Series ratio
  margin = (width-(2*pageW))/2;
  leftX = margin+pageW/2;
  rightX = width-(margin+pageW/2);
  
  marginTop = pageH*0.07;
  marginBottom = 1.8*marginTop;
  gridH = pageH - marginTop - marginBottom;
  gridW = gridH*0.75;
  let w = pageW - gridW;
  inner = w/2.5;
  outer = w-inner;
  gridLX = leftX - pageW/2 + outer + gridW/2;
  gridY = height/2 - pageH/2 + marginTop + gridH/2;
  gridRX = rightX - pageW/2 + inner + gridW/2;
  gridCY = gridY - gridH/2;
  gridCLX = gridLX - gridW/2;
  gridCRX = gridRX - gridW/2;
  
  numRows = 8;
  numCols = 0.75*numRows;
  colSize = gridW/numCols;
  gutterW = colSize*0.12;
}

function generatePages(q){    
  let numGens = 1;   
  let maxDim = 4;
  
  //Choose which sketches/gens
  let c = random(choices);   
  genNums.push(c);
  tText.push(titles[c-1]);
  tPos.push(random([0, 1, 2]));
  choices.splice(choices.indexOf(c), 1);

  //Place canvas
  //Pick random position 
  let x = floor(random(1, numCols-1));
  let y = floor(random(2, numRows-1));

  while (spaces[q][x][y] == 1){
    x = floor(random(numCols));
    y = floor(random(numRows));
  }


  //check largest available square, under maxDim.
  let lMax = maxDim;
  let uMax = maxDim;
  for (let i = -maxDim+1; i <= 0; i++){
    let px = x + i;
    if (px == 0){
          lMax = abs(i);
        }
    for (let j = -maxDim+1; j <= 0; j++){
      let py = y + j;
      let px = x + i;
      if (py > 0 && px > 0){
        if (spaces[q][px][py] == 1 && j < uMax){
          uMax = abs(j);
        }
      }      
      if (px > 0){
        if (spaces[q][px][py] == 1 && abs(i) < lMax){
          lMax = abs(i);
        } 
      }
      if (py == 0){
        uMax = abs(j);
      }
    }  
  }
  let rMax = maxDim;
  let dMax = maxDim;
  for (let i = maxDim-1; i >= 0; i--){
    let px = x + i;

    if (px == numCols-1){
        rMax = abs(i);
    }
    for (let j = maxDim-1; j >= 0; j--){
      let py = y + j;
      let px = x + i;
      if (py < numRows-1 && px < numCols-1){
        if (spaces[q][px][py] == 1 && abs(j) < dMax){
          dMax = abs(j);
        }
      } 
      if (px < numCols-1){
        if (spaces[q][px][py] == 1 && abs(i) < rMax){
          rMax = abs(i);
        }
      } 
      if (py == numRows-1){
        dMax = abs(j);
      }
    }  
  }

  let xDir, yDir;
  if (lMax > 0 && rMax > 0){
    xDir = floor(random());
  } 
  else if (lMax > 0){
    xDir = 0;
  } 
  else if (rMax > 0){
    xDir = 1;
  } 
  else {
    xDir = 1;
    rMax = 1;
  }

  if (uMax > 0 && dMax > 0){
    yDir = floor(random());
  } else if (uMax > 0){
    yDir = 0;
  } else if (dMax > 0){
    yDir = 1;
  } else {
    yDir = 1;
    dMax = 1;
  }

  let tileSize;

  //left up
  if (xDir == 0 && yDir == 0){
    tileSize = ceil(random(min(lMax, uMax-1)));
    for (let i = 0; i < tileSize; i++){
      for (let j = 0; j < tileSize; j++){
        // spaces[x-i][y-j] = 1;
      }
    }
    tiles[q].push([x-(tileSize-1), y-(tileSize-1), tileSize, tileSize, 0]);
  }

  //right up
  if (xDir == 1 && yDir == 0){
    tileSize = ceil(random(min(rMax, uMax-1)));
    for (let i = 0; i < tileSize; i++){
      for (let j = 0; j < tileSize; j++){
        // spaces[x+i][y-j] = 1;
      }
    }
    tiles[q].push([x, y-(tileSize-1),  tileSize, tileSize, 0]);
  }

  //left down
  if (xDir == 0 && yDir == 1){
    tileSize = ceil(random(min(lMax, dMax)));
    for (let i = 0; i < tileSize; i++){
      for (let j = 0; j < tileSize; j++){
        // spaces[x-i][y+j] = 1;
      }
    }
    tiles[q].push([x-(tileSize-1), y,  tileSize, tileSize, 0]);
  }

  //right down
  if (xDir == 1 && yDir == 1){
    tileSize = ceil(random(min(rMax, dMax)));
    for (let i = 0; i < tileSize; i++){
      for (let j = 0; j < tileSize; j++){
        // spaces[x+i][y+j] = 1;
      }
    }
    tiles[q].push([x, y, tileSize, tileSize, 0]);
  }
  
  let bChoices = [];
  let top = false;
  let bottom = false;
  let left = false;
  let right = false;
  
  T = tiles[q][0][1] - 1;
  let mChoices = [];
  if (T > 1){
    bChoices.push('t');
    top = true;
  } else {
    mChoices.push('t');
  }
  
  B = numRows - (tiles[q][0][1] + tileSize);
  if (B > 1){
    bChoices.push('b');
    bottom = true;
  } else {
    mChoices.push('b');
  }
  
  L = tiles[q][0][0];
  if (L > 1){
    bChoices.push('l');
    left = true;
  } else {
    mChoices.push('l');
  }
  
  R = numCols - (tiles[q][0][0] + tileSize);
  if (R > 1){
    bChoices.push('r');
    right = true;
  } else {
    mChoices.push('r');
  }
  
  let available = [...bChoices];
  let rn = floor(random(bChoices.length));
  for (let i = 0; i < rn; i++){
    mChoices.push(bChoices.splice(random(bChoices.length-1), 1)[0]);
  }
  if (bChoices.length == 4){
    mChoices.push(bChoices.splice(random(bChoices.length-1), 1)[0]);
  }
  
 
  
  //RIGHT AVAILABLE
  if (bChoices.indexOf("r") != -1){
    for (let i = L+tileSize; i < numCols; i++){
      for (let j = 1+T; j < 1+T+tileSize; j++){
        spaces[q][i][j] = 1;
      }
    }
    if (top){
      for (let i = L+tileSize; i < numCols; i++){
      for (let j = 1; j < 1+T; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
    if (bottom) {
      for (let i = L+tileSize; i < numCols; i++){
      for (let j = 1+T+tileSize; j < numRows; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
  }
  
  //LEFT AVAILABLE
  if (bChoices.indexOf("l") != -1){
    for (let i = 0; i < L; i++){
      for (let j = 1+T; j < 1+T+tileSize; j++){
        spaces[q][i][j] = 1;
      }
    }
    if (top){
      for (let i =0; i < L; i++){
      for (let j = 1; j < 1+T; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
    if (bottom) {
      for (let i = 0; i < L; i++){
      for (let j = 1+T+tileSize; j < numRows; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
  }
  
  //TOP AVAILABLE
  if (bChoices.indexOf("t") != -1){
    for (let i = L; i < L+tileSize; i++){
      for (let j = 1; j < 1+T; j++){
        spaces[q][i][j] = 1;
      }
    }
    if (left){
      for (let i = 0; i < L; i++){
      for (let j = 1; j < 1+T; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
    if (right) {
      for (let i = L+tileSize; i < numCols; i++){
      for (let j = 1; j < 1+T; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
  }
  
  //BOTTOM AVAILABLE
  if (bChoices.indexOf("b") != -1){
    for (let i = L; i < L+tileSize; i++){
      for (let j = 1+T+tileSize; j < numRows; j++){
        spaces[q][i][j] = 1;
      }
    }
    if (left){
      for (let i =0; i < L; i++){
      for (let j = 1+T+tileSize; j < numRows; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
    if (right) {
      for (let i = L+tileSize; i < numCols; i++){
      for (let j = 1+T+tileSize; j < numRows; j++){
        spaces[q][i][j] = 1;
      }
    }
    }
  }
  
  //PLACE COLUMNS
  let startX, startY, endX;
  let gapX = null;
  for (let i = 0; i < numCols; i++){
    for (let j = 0; j < numRows; j++){
      if (spaces[q][i][j] == 1){
        endX = i;
        if (startX == undefined && startY == undefined){
        startX = i;
        startY = j;
        }
      }
      
      if (startX != undefined && startY != undefined && gapX == null){
        if (spaces[q][i][startY] != 1){
          gapX = i;
      }
      }
    }
  }
  if (gapX == null){
    gapX = 6;
  }
  
  let bW = endX - startX + 1;
  
  let colW;
  if (bW == 2){
    colW = 2;
  } else if (bW == 3){
    colW = 3;
  } else {
    colW = floor(random(2, 4));
    if (gapX < 6){
      colW = gapX-startX;
    }
  } 
  
  //if on left (startX < tileX)
  //right align
  if (startX < L){
    if (colW == 2){
      if (bW%2 == 1){
        startX++;
      }
    } else if (colW == 3){
      if (bW != 6){
        startX += L - colW;
      }
    } else {
      if (L > colW){
        startX += L - colW;
      }
    }
  }
  
  startY = floor(random(startY, max(startY, 1+T)));
  let endY = T+tileSize;
  if (available.indexOf("b") != -1){
    endY = floor(random(1+T+tileSize, 1+T+tileSize+B));
  }
  
  for (let i = startX; i < endX; i += colW){
      let newStart = startY;
      let newEnd = endY;
    for (let j = newStart; j <= endY; j++){
      for (let w = 0; w < colW; w++){
        if (i+w < 6 && j < endY - 1){
          if (spaces[q][i+w][j] == 0){
            newStart = j+1;
          } else if (w == colW-1){
            j = endY+1;
          }
        }
      }
    }
    for (let j = newStart; j <= endY; j++){
      for (let w = 0; w < colW; w++){
        if (i + w < 6){
          if (spaces[q][i+w][j] == 0){
            newEnd = j-1;
            j = endY+1;
            w = colW;
          }
        }
      }
    }

    if (newEnd >= newStart && i+colW < 7){
      tiles[q].push([startX, newStart, colW, (newEnd+1)-newStart, 2]);
    }
    startX += colW;
  }
  
  //PLACE PROMPT
  
  if (T == 0){
   mChoices.splice(mChoices.indexOf('t'),1);
  }
  
  let cSide = random(mChoices);
  let mX, mY, mW, mH;
  
  if (cSide == 't'){
    mX = L;
    mY = T;
    mW = tileSize;
    mH = 1;
    pAlign[q] = [LEFT, BASELINE];
  } else if (cSide == 'b'){
    mX = L;
    mY = 1+T+tileSize;
    mH = B;
    mW = tileSize;
    pAlign[q] = [LEFT, TOP];
  } else if (cSide == 'l'){
    mX = 0;
    mY = 1+T;
    mW = L;
    mH = tileSize;
    pAlign[q] = [RIGHT, TOP];
  } else if (cSide == 'r'){
    mX = L+tileSize;
    mY = 1+T;
    mW = R;
    mH = tileSize;
    pAlign[q] = [LEFT, TOP];
  } else {
    mX = L+tileSize;
    mY = 1+T;
    mW = R;
    mH = tileSize;
    pAlign[q] = [LEFT, TOP];
  }
  
  //TEMPORARY:
//   let bX = 0;
  
//   if (bChoices.indexOf('t') == -1){
//     //chance to be placed above body
//     let chance = 1/(mChoices.length+1);
//     if (random() < chance){
//       mX = bX;
//       mY = 1;
//       mSize = 1;
//     }
//   }
  
  tiles[q].push([mX, mY, mW, mH, 1]);
  
}

function draw(){
  background(22, 24, 24);
  
  fill('antiquewhite');
  stroke(22,24,24);
  strokeWeight(width*0.004);
  rect(leftX, height/2, pageW, pageH);
  rect(rightX, height/2, pageW, pageH);
  
  if (showGrid){
    fill(255);
    noStroke();
    rect(gridLX, gridY, gridW, gridH);
    rect(gridRX, gridY, gridW, gridH);
  
  noFill();
  strokeWeight(width*0.002);
  stroke('lightskyblue');
  rect(gridLX, gridY, gridW, gridH);
  rect(gridRX, gridY, gridW, gridH);
  
  
  
  for (let i = 0; i < numCols; i++){
    let xL = map(i, 0, numCols-1, gridLX-gridW/2+colSize/2, gridLX+gridW/2-colSize/2);
    let xR = map(i, 0, numCols-1, gridRX-gridW/2+colSize/2, gridRX+gridW/2-colSize/2);
    let gXL = map(i, 0, numCols, gridLX-gridW/2, gridLX+gridW/2);
    let gXR = map(i, 0, numCols, gridRX-gridW/2, gridRX+gridW/2);
    
    
    
    for (let j = 0; j < numRows; j++){
      let y = map(j, 0, numRows-1, gridY-gridH/2+colSize/2, gridY+gridH/2-colSize/2);
      push();
      noStroke();
      if (spaces[0][i][j] == 1){
        fill(200);
        rect(xL, y, colSize-gutterW);
      }
      
      if (spaces[1][i][j] == 1){
        fill(200);
        rect(xR, y, colSize-gutterW);
      }
      
      
      pop();
      
      let gYL = map(j, 0, numRows, gridY-gridH/2, gridY+gridH/2);
    
    if (j > 0){
      rect(gridLX, gYL, gridW, gutterW);
      rect(gridRX, gYL, gridW, gutterW);
    }
    }
    if (i > 0){
    rect(gXL, gridY, gutterW, gridH)
    rect(gXR, gridY, gutterW, gridH)
    }
  }
  }
  
  push();
  rectMode(CORNER);
  noStroke();
  noFill();
  
  
  let canvPos = canv.getBoundingClientRect();

  for (let t of tiles[0]){
    if (t[4] == 0){
      if (showGrid){
        stroke('red');
      }
      frame.style.left = (canvPos.left + gridCLX + t[0]*colSize + gutterW/2)+"px";
      frame.style.top = (canvPos.top + gridCY + t[1]*colSize + gutterW/2)+"px";
      frame.style.width = (t[2]*colSize-gutterW)+"px";
      frame.style.height = (t[3]*colSize-gutterW)+"px";
    } else if (t[4] == 1){
      if (showGrid){
        stroke('green');
      }
      push();
      noStroke();
      fill(22, 24, 24);
      textAlign(pAlign[0][0], pAlign[0][1]);
      textSize(width*0.01);
      textStyle(ITALIC);
      text(prompts[genNums[0]-1], gridCLX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
      pop();
    } else if (t[4] == 2){
      if (showGrid){
        stroke('blue');
      }
      push();
      noStroke();
      fill(22, 24, 24);
      textAlign(LEFT, TOP);
      textSize(gutterW);
      textWrap(CHAR);
      text(lorem, gridCLX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
      pop();
    }
    rect(gridCLX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
  }
  

  for (let t of tiles[1]){
    if (t[4] == 0){
      if (showGrid){
        stroke('red');
      }
      frame2.style.left = (canvPos.left + gridCRX + t[0]*colSize + gutterW/2)+"px";
      frame2.style.top = (canvPos.top + gridCY + t[1]*colSize + gutterW/2)+"px";
      frame2.style.width = (t[2]*colSize-gutterW)+"px";
      frame2.style.height = (t[3]*colSize-gutterW)+"px";
    } else if (t[4] == 1){
      if (showGrid){
        stroke('green');
      }
      push();
      noStroke();
      fill(22, 24, 24);
      textAlign(pAlign[1][0], pAlign[1][1]);
      textSize(width*0.01);
      textStyle(ITALIC);
      text(prompts[genNums[1]-1], gridCRX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
      pop();
    } else if (t[4] == 2){
      if (showGrid){
        stroke('blue');
      }
      push();
      noStroke();
      fill(22, 24, 24);
      textAlign(LEFT, TOP);
      textSize(gutterW);
      textWrap(CHAR);
      text(lorem, gridCRX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
      pop();
    }
    rect(gridCRX + t[0]*colSize + gutterW/2, gridCY + t[1]*colSize + gutterW/2, t[2]*colSize-gutterW, t[3]*colSize-gutterW);
  }
  
  pop();
  
  //TITLE
  fill(22, 24, 24);
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(width*0.025);
  
  let tX;
  if (tPos[0] == 0){
    textAlign(LEFT, BASELINE);
    tX = gridCLX;
  } else if (tPos == 1){
    textAlign(CENTER, BASELINE);
    tX = gridCLX+gridW/2;
  } else {
    textAlign(RIGHT, BASELINE);
    tX = gridCLX+gridW;
  }
  
  text(tText[0], tX, gridCY + colSize - gutterW/2);
  
  let tR;
  if (tPos[1] == 0){
    textAlign(LEFT, BASELINE);
    tR = gridCRX;
  } else if (tPos == 1){
    textAlign(CENTER, BASELINE);
    tR = gridCRX+gridW/2;
  } else {
    textAlign(RIGHT, BASELINE);
    tR = gridCRX+gridW;
  }
  
  text(tText[1], tR, gridCY + colSize - gutterW/2);
  
  //HEADER||FOOTER + PAGE NUMBERS
  textSize(width*0.012);
  let pX, pY, alignL, alignR;
  if (pPos == 'tl'){
    alignL = LEFT;
    alignR = RIGHT;
    pX = 0;
    pY = gridCY - marginTop/2;
  } else if (pPos == 'bl'){
    alignL = LEFT;
    alignR = RIGHT;
    pX = 0;
    pY = gridCY + gridH + marginBottom/2;
  } else {
    alignL = CENTER;
    alignR = CENTER;
    pX = gridW/2;
    pY = gridCY + gridH + marginBottom/2;
  }
  textAlign(alignL, CENTER);
  text(pg, gridCLX+pX, pY);
  textAlign(alignR, CENTER);
  text(pg+1, gridCRX+gridW-pX, pY);
  
  textSize(width*0.015);
  let cX, cY, aL, aR;
  if (cPos == 'tl'){
    aL = LEFT;
    aR = RIGHT;
    cX = 0;
    cY = gridCY - marginTop/2;
  } else if (cPos == 'bl'){
    aL = LEFT;
    aR = RIGHT;
    cX = 0;
    cY = gridCY + gridH + marginBottom/2;
  } else if (cPos == 'bm'){
    aL = CENTER;
    aR = CENTER;
    cX = gridW/2;
    cY = gridCY + gridH + marginBottom/2;
  } else {
    aL = CENTER;
    aR = CENTER;
    cX = gridW/2;
    cY = gridCY - marginTop/2;
  }
  textAlign(aL, CENTER);
  text(cText, gridCLX+cX, cY);
  textAlign(aR, CENTER);
  text(cText, gridCRX+gridW-cX, cY);
  
  noLoop();
}

function mousePressed(){
  rPage = 0;
  spaces = [];
  tiles = [];
  choices = [];
  pPos = 0; //page
  cPos = 0; //chapter
  tPos = []; //title
  tText = [];
  sPos = 0; //secondary text

  cText = "Genuary 2025"
  pg = 0;
  genNums = [];
  pAlign = [];
  setup();
  loop();
}

function keyPressed(){
  if (key == 'g'){
    showGrid = !showGrid;
    loop();
  }
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim, dim);
  calcSizing();
  loop();
}

let bgCols = ['light', 'light', 'dark', 'dark', 'dark', 'light', 'light', 'light', 'light', 'dark', 'dark', 'dark', 'dark', 'dark', 'dark', 'light', 
  'light', 'light', 'light', 'light', 'dark', 'dark', 'light', 'light', 'dark', 'dark', 'light', '', '', '', ''
];

let titleCols = ['black', 'black', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white', 'white', 'white', 'black',
  'black', 'black', 'black', 'black', 'white', 'white', 'black', 'black', 'white', 'white', 'black', '', '', '', ''
];

let titles = ["Castle Ruins", "Larry Layers", "Twenty-One Helices", "Untitled (Black, Black, Bl...)", "Undecidable Figures", "Fridge Fodder", "Piano Roll Printer", "Porpoise Portraits", "Train Noise", "Tau Since 1982","Jug","Check It", "Game of Trife", "Hither and Dither", "Pixel Persian Rugs", 
    "Gummy Worms", "Non-Euclidean Pi", "Left Hanging", "Get Your Blaze On", "Small Plans", 
    "Deformities", "Ten Lights", "Musée Concréte", "Compositions in Red, Blue, and Yellow", "Doodle Stars", 
    "Anadromic Squares", "LeWitt's Walls", "Drostetubbies"
];

let blurbs = [
`This prompt made me think of drawings composed of only vertical lines. Snooping around the web, I found <a target="_blank" href="https://scontent-syd2-1.cdninstagram.com/v/t39.30808-6/449775586_17982303353693950_1649366445359233739_n.jpg?stp=dst-jpg_e15_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTUuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-syd2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=uxFHuyjB3fwQ7kNvgFtOasu&_nc_gid=22dccbc30fb347adad556d8c977a07fa&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwNDYzMTc5NTg4NDcyOTc4Mg%3D%3D.3-ccb7-5&oh=00_AYB2DXKJg13vTtopCl8r_A10M_RPHEwfQYk0_p7RfPGUNg&oe=6778AC8D&_nc_sid=10d13b">a cool drawing</a> by <a target="_blank" href="https://www.threads.net/@jimmywongstudio">Jimmy Wong</a>.<br><br>I went for a more simplified approach to textures, but tried to capture the general gist of his composition. Click on the sketch to generate a new, random iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2"> https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2</a>`,
`Having just returned from a month long trip to the cold and dreary UK (it was lovely), this prompt brought rugging-up-for-the-winter to mind.<br><br>Perhaps not the most appropriate clothing choices for winter, you can add layers to Larry here by clicking on his legs, torso, or head (and remove by right-clicking). If you exit and re-enter this page, he will also likely have a different hair-do and flesh tone.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj">https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj</a>`,
`This one is quite self-explanatory. Forty-two polynucleotide strands. Twenty-one helices of DNA floatin' around.<br><br>But this was no cop-out! The source code is exactly 42 lines long!<br><br>Look-a here:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/MTldScyPC">https://editor.p5js.org/jacarooney/sketches/MTldScyPC</a>`,
`"I would like to say to those who think of my pictures as serene, whether in friendship or mere observation, that I have imprisoned the most utter violence in every inch of their surface." ― Mark Rothko<br><br>I don't think my code is imbuing it's output with utter violence...<br><br>
...gee, I sure hope it isn't.<br><br>Anyways, this one was obviously inspired by Rothko. Click the canvas to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/qoDUv6USR">https://editor.p5js.org/jacarooney/sketches/qoDUv6USR</a>`,
`Thus far, this sketch has given me the most grief. Not satisfied with a simple <a target="_blank" href="https://en.wikipedia.org/wiki/Penrose_triangle">Penrose triangle</a>-style generator, I wanted to work out how to make shapes similar to <a target="_blank" href="https://www.youtube.com/shorts/b7IVgNh5PeU?app=desktop">this.</a><br><br>Using a hexagonal grid, an algorithm to generate the pattern for each face, and the oh-so-terrible columns that weave in and out of the faces (creating the illusion), I've landed on something I'm happy with!<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/B0vIRop39">https://editor.p5js.org/jacarooney/sketches/B0vIRop39</a>`,
`Thinking of artworks which use primitive shapes, I searched for some children's drawings and came across <a target="_blank" href="https://artprojectsforkids.org/wp-content/uploads/2022/09/Draw-an-Easy-Landscape.jpg">this</a>.<br><br>I recreated it with primitive shapes, replacing the clouds with (a much simpler) sun. I then parameterised each element of the composition... and it looked quite bad.<br><br>Perhaps not in the spirit of the prompt, I overlaid an image for texture, and used some SVG turbulence to give the sketch a hand-drawn feel.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/uZ-hcSsjZ">https://editor.p5js.org/jacarooney/sketches/uZ-hcSsjZ</a>`,
`Inspired by <a target="_blank" href="https://www.youtube.com/watch?v=G2hR0JtLYIc">GLASYS</a> and the many that have come before him. I wanted to give piano roll art a try... but why put in all the work figuring out how to make MIDI drawings sound good when I can make the computer do it for me?<br><br>This sketch works by scanning the points that make up the characters in five-letter words, converting them to MIDI, and sending them out to your computer's MIDI bus. To hear it in action, you will need to open up a program that accepts MIDI input. I'd recommend opening <a target="_blank" href="https://midi.city">midi.city</a> in another tab, and choosing a sound you like!<br><br>You can also see it in action in my instagram <a target="_blank" href="midi.city>post</a>.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/QQYjWEVH5">https://editor.p5js.org/jacarooney/sketches/QQYjWEVH5</a>`,
`This prompt made me ponder what might there be a million of? I searched Wikipedia's list of species by population size and whittled my options down to the <a target="_blank" href="https://en.wikipedia.org/wiki/Guanaco">Guanaco</a> (similar to a Llama), and the <a target="_blank" href="https://en.wikipedia.org/wiki/Pacific_white-sided_dolphin">Pacific White-Sided Dolphin</a>. On further research, estimates of the Guanaco population exceed two-million, so I settled with the Dolphin.<br><br>Hover around to see a closer-up portrait of each dolphin, along with their (totally legitimate) full-name, and id number.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/dcEjP9a2e">https://editor.p5js.org/jacarooney/sketches/dcEjP9a2e</a>`,
`For this prompt, I've recreated the seat pattern found on <a target="_blank" href="https://ih1.redbubble.net/image.2807633287.0514/flat,750x,075,f-pad,750x1000,f8f8f8.jpg">Sydney Trains</a>.<br><br>Quite simply, I've just recreated the palette, and mapped noise with different thresholds for the different colours.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/hdq27cuB7">https://editor.p5js.org/jacarooney/sketches/hdq27cuB7</a>`,
`For a subversive take on this prompt, I decided to make a digital clock display inspired by <a target="_blank" href="https://www.humanssince1982.com/en-int/products/a-million-times-120-black">Humans since 1982</a>. You will find no numerals in my code (except for the '2' in the atan2() function)...<br><br>You will also find that I have simply (cheekily?) derived zero-ten using TAU, and given these variables (numbers) silly names.<br><br>Click to switch between an interesting pattern and telling the current time. The time will always display when a minute ticks over.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/LpQIr6FNE">https://editor.p5js.org/jacarooney/sketches/LpQIr6FNE</a>`,
`I've wanted to try <a target="_blank" href="https://en.wikipedia.org/wiki/Digital_waveguide_synthesis">Waveguide Synthesis</a> for quite some time. This was my opportunity to cram my first attempt into a day. I followed <a target="_blank" href="https://www.osar.fr/notes/waveguides/">Pierre Cusa's</a> incredible explainer, but couldn't manage to implement multiple steps using <a target="_blank" href="https://tonejs.github.io/">Tone.js</a>, especially on limited time. Instead of a flute or recorder, as planned, I offer you this jug (which sounds more EDM than Jug Band...).<br><br>I'd recommend tweaking the delay variable, as that will change the pitch. Reading Cusa's article will help you understand the other parameters if you so wish.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/KiY-dlm8D">https://editor.p5js.org/jacarooney/sketches/KiY-dlm8D</a>`,
`Originally, I wanted to make an unevenly subdividing chess board with moving pieces... but was short on time. Pretty simple, this one.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/GivRl2nKc">https://editor.p5js.org/jacarooney/sketches/GivRl2nKc</a>`,
`I'd never tried to implement <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> on a non-rectangular grid. Thus... here we are.<br><br>Thanks to <a target="_blank" href="https://www.youtube.com/watch?v=VOQrDh6AvYQ&ab_channel=ChaseMarangu">Chase Marangu</a>, I had some rules I'd know would get interesting results (S:4,5,6 B:4,8). And also to <a target="_blank" href="https://www.boristhebrave.com/2021/05/23/triangle-grids/">Boris The Brave</a> for a very helpful write-up on implementing triangular grids!<br><br>Keyboard controls are listed on the screen; click to toggle cells.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/CPoHNwA-r">https://editor.p5js.org/jacarooney/sketches/CPoHNwA-r</a>`,
`I've repurposed some old code for this one. A student... 5 or so years ago was trying to achieve a similar effect.<br><br>Move the mouse across the screen and the white dots coalesce into "BLACK" or "WHITE"... not grey/gray.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/l8oYyJyUd">https://editor.p5js.org/jacarooney/sketches/l8oYyJyUd</a>`,
`Here, I've attempted to use the <a target="_blank" href="https://www.youtube.com/watch?v=diGjw5tghYU">Abelian Sandpile Model</a> to mimic the beautiful symmetrical patterns found in/on <a target="_blank" href="https://www.rugart.com.au/wp-content/uploads/2021/12/persian1.jpg">Persian Rugs</a>.<br><br>I've missed the mark, as I'm not happy with how I've programmed the colours... and sometimes the sandpiles don't propagate all the way to the edges.<br><br>Click to generate a new iteration<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/aoW0QM1R-">https://editor.p5js.org/jacarooney/sketches/aoW0QM1R-</a>`,
`Searching for generative colour palette inspiration, I came across this article by <a target="_blank" href="https://sam-tsao.medium.com/3-levels-of-generative-colors-b43bd0d6d609">Sam Tsao</a>. They implement their own version of Quayola's <a target="_blank" href="https://vimeo.com/457234035">Transient</a>. They also discuss <a target="_blank" href="https://iquilezles.org/articles/palettes/">Inigo Quilez's</a> trigonometric approach to colour palettes.<br><br>I have simply combined these ideas. Click the canvas to reset, or the gradient strip to change the palette.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/Ee6TMtp4h">https://editor.p5js.org/jacarooney/sketches/Ee6TMtp4h</a>`,
`For this prompt, I wanted to show that Pi (if you consider it to be the ratio of a circle's circumference to its diameter) is not constant in non-euclidean space.<br><br>I don't usually do 3D, so I couldn't really figure out a good approach to make the diameter (orange torus) vary with the circumference (blue). I also considered representing hyperbolic space... but then I considered my sanity.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/oEnr9Y23K">https://editor.p5js.org/jacarooney/sketches/oEnr9Y23K</a>`,
`What better to show the wind than clothes on a line?<br><br>For this sketch, I repurposed my first attempt at <a target="_blank" href="https://en.wikipedia.org/wiki/Verlet_integration">Verlet Simulation</a>. It was hard to find a nice balance where the clothes both retained shape, but had plenty of give. You can certainly 'break' the shapes... but that's all part of the fun.<br><br>Moving the mouse to the right adds more wind. Clicking rehangs the line.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/V8yHyAYd8">https://editor.p5js.org/jacarooney/sketches/V8yHyAYd8</a>`,
`Looking at notable Op Artists for inspiration, I came across <a target="_blank" href="https://www.wikiart.org/en/bridget-riley/blaze-1-1962">Bridget Riley</a> (whose work I was already familiar with, or at least art influenced by her art). Her <a target="_blank" href="https://www.wikiart.org/en/bridget-riley/blaze-study-1962">'Blaze'</a> artworks seemed to be very fitting for digitisation.<br><br>She preferred to put a 'hole' at the centre of her spirals... but I think Op Artists would enjoy the weird aliasing that occurs in my version.<br><br>Move the mouse to move the spirals. Click for a new spiral.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/HZLANkO6g">https://editor.p5js.org/jacarooney/sketches/HZLANkO6g</a>`,
`When I get the itch to make something generative and need some inspiration (or just want to practice my skills), I often go to <a target="_blank" href="https://inconvergent.net/">Anders Hoff's website</a>.<br><br>This prompt was the perfect opportunity to try to recreate one of his sketches I've had my eye on: <a target="_blank" href="https://inconvergent.net/app/impossible-architecture/">Impossible Architecture</a>. Lucky for me, he also has a <a target="_blank" href="https://inconvergent.net/2018/impossible-architecture">write-up</a> on his approach!<br><br>Starting with a square, lines will lerp outward with a chance of incorporating a feature (circle/thick line/row of lines). Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/5_KTn1Ed-">https://editor.p5js.org/jacarooney/sketches/5_KTn1Ed-</a>`,
`This sketch was inspired by <a target="_blank" href="https://x.com/kusakarism/status/1791845845203382491">Kusakari's work</a>. In contrast to Prompt 20, I wanted to avoid reading/following any materials/tutorials to try and achieve a similar result. Thus, I have this weird and inaccurate collision/deformation system.<br><br>Rectangles are constructed with circles. These circles are repulsed by one another, but are elastically connected to orthogonal neighbours.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/yeD56D3_p">https://editor.p5js.org/jacarooney/sketches/yeD56D3_p</a>`,
`This sketch is inspired by <a target="_blank" href="https://www.artnet.com/artists/leon-berkowitz/">Leon Berkowitz's</a> artworks. He'd paint beautiful gradients, often in the form of other-worldly orbs, seeming to float across the canvas, bleeding into one-another.<br><br>I've tried to get a similar effect by using randomly distributed points within ellipses, that shift colour and shape as they move, slowly revealing the 'painting'.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/GatVdncHG">https://editor.p5js.org/jacarooney/sketches/GatVdncHG</a>`,
`This sketch joins boxy, Brutalist-inspired modules on a grid according to some basic rules.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/vE5rhx9Jy">https://editor.p5js.org/jacarooney/sketches/vE5rhx9Jy</a>`,
`Although well-trodden territory by generative artists, I wanted to have a go at recreating <a target="_blank" href="https://upload.wikimedia.org/wikipedia/commons/c/c3/Composition_A_by_Piet_Mondrian_Galleria_Nazionale_d%27Arte_Moderna_e_Contemporanea.jpg">Mondrian's famous compositions</a>. My approach is to have one rectangle traverse the canvas, interpolating to a new colour and new dimensions, placing copies of itself until a composition is complete.<br><br>Click the canvas at any time to restart the process.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/LXkEemFzw">https://editor.p5js.org/jacarooney/sketches/LXkEemFzw</a>`,
`A continuous line roughly traces out (then un-traces) some stars... and again... forever.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/9TLQd4RuG">https://editor.p5js.org/jacarooney/sketches/9TLQd4RuG</a>`,
`Originally, this prompt got me thinking about crosswords, as they are traditionally set on <a target="_blank" href="https://en.wikipedia.org/wiki/Crossword">symmetric grids</a>. However, making a crossword generator (with words and clues) was obviously too much work for a day.<br><br>Instead, I have taken inspiration from the <a target="_blank" href="https://en.wikipedia.org/wiki/Sator_Square">Sator Square</a>, and have made a Word Square generator using all valid 4-letter anadromes (words that work both forward and backward).<br><br>Click to reset the grid.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/rmJTR2AAr">https://editor.p5js.org/jacarooney/sketches/rmJTR2AAr</a>`,
`One of the courses I teach includes a challenge for students to implement one of <a target="_blank" href="https://en.wikipedia.org/wiki/Sol_LeWitt">Sol LeWitt's</a> Wall Drawings. These are artworks that LeWitt would not necessarily 'complete' himself, but instead supplied a set of instructions for. These instructions could/can then be carried out by whoever (often those working at galleries that have procured his instructions).<br><br>I have implemented Wall Drawings <a target="_blank" href="https://massmoca.org/event/walldrawing16/">#16</a>, <a target="_blank" href="https://massmoca.org/event/walldrawing138/">#138</a> & <a target="_blank" href="https://massmoca.org/event/walldrawing340/">#340</a>. I had some others I wanted to attempt, but the restriction on trigonometry made them extremely hard (and unsatisfying).<br><br>Click and hold to see each artwork's title and instructions.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/XP1PrTXob">https://editor.p5js.org/jacarooney/sketches/XP1PrTXob</a>`,
``,
``,
``,
``
]

let prompts = [
"Vertical or horizontal lines only.",
"Layers upon layers upon layers.",
"Exactly 42 lines of code.",
"Black on black.",
"Isometric Art - (No vanishing points).",
"Make a landscape using only primitive shapes.",
"Use software that is not intended to create art or images.",
"Draw one million of something.",
"The textile design patterns of public transport seating.",
"You can only use TAU in your code, no other number allowed.",
"Impossible day - Try to do something that feels impossible for you to do...",
"Subdivision.",
"Triangles and nothing else.",
"Pure black and white. No gray.",
"Design a rug.",
"Generative palette.",
"What happens if pi=4?",
"What does wind look like?",
"Op Art.",
"Generative Architecture.",
"Create a collision detection system (no libraries allowed).",
"Gradients only.",
"Inspired by brutalism.",
"Geometric art - only use either a circle, rectangle, or triangle.",
"One line that may or may not intersect itself",
"Symmetry.",
"Make something interesting with no randomness or noise or trig.",
"Infinite Scroll.",
"Grid-based graphic design.",
"Abstract map.",
"Pixel sorting."]

let lorem = "Curabitur iaculis commodo nibh, quis ultrices purus pellentesque sed. Etiam diam ex, gravida nec ullamcorper eget, congue a urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer arcu est, iaculis eu velit nec, semper condimentum arcu. Etiam nibh urna, hendrerit et iaculis in, mollis sed diam. Nunc cursus justo in urna pellentesque imperdiet. Nulla viverra magna et scelerisque gravida. Mauris facilisis semper velit. Maecenas feugiat consequat sapien eu blandit. Integer rhoncus feugiat vehicula. Phasellus pharetra, elit eget interdum scelerisque, nibh libero luctus libero, eget sagittis sapien ante ut eros. In orci ligula, commodo ut ante eget, lobortis molestie urna. In sollicitudin nulla sit amet mi pulvinar, quis varius dolor suscipit. Curabitur pellentesque volutpat risus nec pharetra.<br><br>Quisque dictum dui quis massa tristique, sed pharetra ipsum porttitor. Praesent nec quam pulvinar, imperdiet metus vel, blandit lectus. Duis ornare finibus porttitor. Aenean posuere nibh eros, quis fermentum mi sollicitudin ut. Nulla nec dolor nec lectus tincidunt semper. Cras purus quam, placerat ut massa sed, ullamcorper iaculis odio. Nam quis odio elementum, tincidunt elit ac, pretium nisi. Vestibulum lacinia augue felis, vel mollis odio facilisis non. Donec efficitur lectus vulputate lorem egestas, a tincidunt nunc posuere. Aenean eu lorem in ante pretium tempor. Nunc lectus risus, hendrerit vel ipsum vel, rutrum consectetur quam. Aliquam euismod pulvinar tortor.<br><br>Aenean id lorem lectus. Cras vitae porttitor felis, ac egestas lorem. Quisque aliquam metus nec justo suscipit, eu sodales sem lacinia. Nulla euismod efficitur porttitor. Nam vitae accumsan ante. Vivamus vestibulum, tortor vel consequat iaculis, nisl mauris eleifend elit, at tincidunt mauris purus at velit. Fusce ac sagittis dolor. Nunc massa velit, varius quis semper ac, vehicula at erat. Nulla vitae auctor mauris. Pellentesque porta tellus quis elementum lobortis. Etiam eu mi eget turpis pellentesque mollis porta quis odio. Aenean vitae sapien luctus, luctus est sed, suscipit ex. Sed ut nisi augue.<br><br>Morbi congue nisl sed libero feugiat, nec ultrices lectus aliquam. Nulla vulputate commodo elit id bibendum. Aenean lorem sapien, imperdiet auctor fermentum id, tristique quis neque. Duis a faucibus odio. Ut et lorem gravida arcu iaculis faucibus quis et sem. Quisque vestibulum odio ac diam ullamcorper, molestie congue turpis congue. Proin non nisl viverra, tristique leo nec, porta velit.<br><br>Integer maximus mattis dolor id imperdiet. Nulla vel urna id risus semper venenatis. Ut elit nisi, laoreet quis venenatis aliquam, mattis ut nunc. Vivamus consectetur, nisi quis vulputate tempor, urna lacus vestibulum ex, quis varius urna felis non nibh. Duis dignissim viverra erat iaculis posuere. Curabitur sed leo eget enim fermentum congue. Ut ornare commodo massa nec vulputate. Curabitur facilisis dui non posuere ultricies. Maecenas ut felis et ex mattis dignissim quis ut arcu. Nunc in quam accumsan, dictum felis iaculis, mattis urna.<br><br>Etiam tincidunt hendrerit neque at ullamcorper. In ex arcu, dapibus nec purus at, vestibulum tincidunt enim. Sed ut suscipit massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam iaculis maximus sagittis. Praesent sollicitudin urna vitae enim auctor, sed hendrerit felis finibus. Donec viverra odio vitae magna ultricies convallis. Donec sit amet sapien facilisis, tempus eros eu, iaculis odio. Cras sed vestibulum justo. Curabitur ac consequat magna, ut finibus augue. Donec luctus, augue in suscipit su";