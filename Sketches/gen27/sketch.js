let drawing = 0;

let titles = [16, 138, 340];

let instructions = [
  "Bands of lines 12 inches (30 cm) wide, in three directions (vertical, horizontal, diagonal right) intersecting.",
  "Circles and arcs from the midpoints of four sides.",
  "Six-part drawing. The wall is divided horizontally and vertically into six equal parts.\n\n1st part: On red, blue horizontal parallel lines, and in the center, a circle within which are yellow vertical parallel lines;\n2nd part: On yellow, red horizontal parallel lines, and in the center, a square within which are blue vertical parallel lines;\n3rd part: On blue, yellow horizontal parallel lines, and in the center, a triangle within which are red vertical parallel lines;\n4th part: On red, yellow horizontal parallel lines, and in the center, a rectangle within which are blue vertical parallel lines;\n5th part: On yellow, blue horizontal parallel lines, and in the center, a trapezoid within which are red vertical parallel lines;\n6th part: On blue, red horizontal parallel lines, and in the center, a parallelogram within which are yellow vertical parallel lines.\n\nThe horizontal lines do not enter the figures."
];

let colours = [
  [46,151,190],
  [228,49,83],
  [252, 186, 3],
  [25,19,5]
];

let lines = [];

let circles = [];
let str = 0;

let counter = 0;
let percent = 0;
let speed = 20;

let rects = [];
let lineFlag = false;
let maskFlag = false;
let lines2 = [];

let next = false;
let timer = 5;

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  
  strokeWeight(width*0.0016);
  
  calcLines();
  
}

function calcLines(){
  lines = [];
  circles = [];
  rects = [];
  lines2 = [];
  
  //DRAWING ONE
  if (drawing == 0){
    let n = 100;
  band(-width*0.002, height*0.4, width, height*0.4, -width*0.002, height*0.6, width, height*0.6, colours[0], n, true);
  band(width*0.4, -height*0.002, width*0.4, height, width*0.6, -height*0.002, width*0.6, height, colours[1], n, true);
  band(width*0.85, 0, 0, height*0.85, width, height*0.15, width*0.15, height, colours[2], n, true);
  }
  
  //DRAWING TWO
  else if (drawing == 1){
  let spread = width*0.07;
  circs(width/2, height/2, spread, width*1.5, colours[2]);
  circs(0, height/2, spread, width*2.3, colours[1]);
  circs(width/2, 0, spread, width*2.3, colours[0]);
  circs(width, height/2, spread, width*2.3, colours[1]);
  circs(width/2, height, spread, width*2.3, colours[0]);
  }
  
  //DRAWING THREE
  else {
  let padding = width*0.02;
  let order = [1, 2, 0];
  let order2 = [0,1,2,2,0,1];
  let margin = width*0.02;
  lines = [];
  spread = width*0.007;
  for (let i = 0; i < 6; i++){
    let x = i%3;
    let y = floor(i/3);
    let xPos = map(x, 0, 3, margin, width-margin);
    let yPos = map(y, 0, 2, margin, height-margin);
    let w = (width-2*margin)/3 - padding;
    let h = (height-2*margin)/2 - padding;
    rects.push([xPos, yPos, w, h, colours[order[x]]]);
    
    if (i == 0){
      circStripe(xPos+w/2, yPos+h/2, w*0.36, spread, colours[2]);
    } else if (i == 1){
      band(xPos+w*0.14, yPos+h*0.5-w*0.36, xPos+w*0.86, yPos+h*0.5-w*0.36, xPos+w*0.14, yPos+h*0.5+w*0.36, xPos+w*0.86, yPos+h*0.5+w*0.36, colours[0], w*0.72/spread, false);
    } else if (i == 2){
      triStripe(xPos+w/2, yPos+h/2, w*0.36, spread, colours[1]);
    } else if (i == 3){
      band(xPos+w*0.25, yPos+h*0.5-w*0.36, xPos+w*0.75, yPos+h*0.5-w*0.36, xPos+w*0.25, yPos+h*0.5+w*0.36, xPos+w*0.75, yPos+h*0.5+w*0.36, colours[0], w*0.5/spread, false);
    } else if (i == 4){
      trapStripe(xPos+w/2, yPos+h/2, w*0.36, spread, colours[1]);
    } else if (i == 5){
      paraStripe(xPos+w/2, yPos+h/2, w*0.36, spread, colours[2]);
    }
  }
  
  for (let i = 0; i < 6; i++){
    let x = i%3;
    let y = floor(i/3);
    let xPos = map(x, 0, 3, margin, width-margin);
    let yPos = map(y, 0, 2, margin, height-margin);
    let w = (width-2*margin)/3 - padding;
    let h = (height-2*margin)/2 - padding;
    
    band2(xPos, yPos, xPos, yPos+h, xPos+w, yPos, xPos+w, yPos+h, colours[order2[i]], h/spread, false);
  }
    
  }
  
}

function draw(){
  background('antiqueWhite');
  
  if (drawing == 0){
    speed = 20;
    for (let i = 0; i <= counter; i++){
      if (lines[i][2]){
        stroke(...lines[i][2]);
      }
    
      if (i == counter){      
        let targetX = lerp(lines[i][0][0],
                          lines[i][1][0],
                          percent/100);
        let targetY = lerp(lines[i][0][1],
                          lines[i][1][1],
                          percent/100);
        line(lines[i][0][0], lines[i][0][1], targetX, targetY);
      
        if (percent < 100){
          percent += speed;
        } else if (counter < lines.length-1){
          counter++;
          percent = 0;
        } else if (counter == lines.length-1){
          next = true;
        }
      
      } else {
        line(lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1]);
      }
    }
    
  } 
  else if (drawing == 1){
    speed = 8;
    noFill();
    for (let i = 0; i <= counter; i++){
      if (circles[i][3]){
        str = circles[i][3];
      }
    
      if (i == counter){   
        
        let target = lerp(0, 255, 
                          percent/100);
        stroke(...str, target);
        circle(circles[i][0], circles[i][1], circles[i][2]);
      
        if (percent < 100){
          percent += speed;
        } else if (counter < circles.length-1){
          counter++;
          percent = 0;
        } else if (counter == circles.length-1){
          next = true;
        }
      
      } else {
        stroke(...str);
        circle(circles[i][0], circles[i][1], circles[i][2]);
      }
    }
             
  }
  else if (drawing == 2){   
    
    if (!lineFlag){
      speed = 4;
      for (let i = 0; i <= counter; i++){
        let rec = rects[i];
        fill(rec[4]);
        stroke(rec[4]);

        if (i == counter){   

          let target = lerp(0, rec[2], 
                            percent/100);

          rect(rec[0], rec[1], target, rec[3]);

          if (percent < 100){
            percent += speed;
          } else if (counter < rects.length-1){
            counter++;
            percent = 0;
          } else if (counter == rects.length-1){
            lineFlag = true;
            counter = 0;
            percent = 0;
          }

        } else {
          rect(rec[0], rec[1], rec[2], rec[3]);
        }
      }
    } else {
      speed = 25;
      for (let r of rects){
        fill(r[4]);
        stroke(r[4]);
        rect(r[0],r[1],r[2],r[3]);
      }
      
    }
    
    if (maskFlag){
      for (let i = 0; i <= counter; i++){
      if (lines2[i][2]){
        stroke(...lines2[i][2]);
      }
    
      if (i == counter){      
        let targetX = lerp(lines2[i][0][0],
                          lines2[i][1][0],
                          percent/100);
        let targetY = lerp(lines2[i][0][1],
                          lines2[i][1][1],
                          percent/100);
        line(lines2[i][0][0], lines2[i][0][1], targetX, targetY);
      
        if (percent < 100){
          percent += speed;
        } else if (counter < lines2.length-1){
          counter++;
          percent = 0;
        } else if (counter == lines2.length-1){
          next = true;
        }
      
      } else {
        line(lines2[i][0][0], lines2[i][0][1], lines2[i][1][0], lines2[i][1][1]);
      }
    }
    }
    
    if (lineFlag){
      if (!maskFlag){    
        for (let i = 0; i <= counter; i++){
      if (lines[i][2]){
        stroke(...lines[i][2]);
      }
    
      if (i == counter && !maskFlag){      
        let targetX = lerp(lines[i][0][0],
                          lines[i][1][0],
                          percent/100);
        let targetY = lerp(lines[i][0][1],
                          lines[i][1][1],
                          percent/100);
        line(lines[i][0][0], lines[i][0][1], targetX, targetY);
      
        if (percent < 100){
          percent += speed;
        } else if (counter < lines.length-1){
          counter++;
          percent = 0;
        } else if (counter == lines.length-1){
          maskFlag = true;
          counter = 0;
          percent = 0;
        }
      
      } else {
        line(lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1]);
      }
    }
        
      
      } else {
        noStroke();
      fill(colours[1]);
      ellipse(rects[0][0]+rects[0][2]/2,
              rects[0][1]+rects[0][3]/2, 
              rects[0][2]*0.72);
      
      fill(colours[2]);
      square(rects[1][0]+rects[1][2]*0.14,
              rects[1][1]+rects[1][3]/2 - rects[1][2]*0.36, 
              rects[1][2]*0.72);
      
      fill(colours[0]);
      triangle(rects[2][0]+rects[2][2]*0.5,
               rects[2][1]+rects[2][3]*0.5-rects[2][2]*0.36,
              rects[2][0]+rects[2][2]*0.86,
               rects[2][1]+rects[2][3]*0.5+rects[2][2]*0.36,
              rects[2][0]+rects[2][2]*0.14,
               rects[2][1]+rects[2][3]*0.5+rects[2][2]*0.36);
      
      fill(colours[1]);
      rect(rects[3][0]+rects[3][2]*0.25,
              rects[3][1]+rects[3][3]/2 - rects[3][2]*0.36, 
              rects[3][2]*0.5, rects[3][2]*0.72);
      
      fill(colours[2]);
      quad(rects[4][0]+rects[4][2]*0.33,
               rects[4][1]+rects[4][3]*0.5-rects[4][2]*0.36,
           rects[4][0]+rects[4][2]*0.67,
               rects[4][1]+rects[4][3]*0.5-rects[4][2]*0.36,
              rects[4][0]+rects[4][2]*0.86,
               rects[4][1]+rects[4][3]*0.5+rects[4][2]*0.36,
              rects[4][0]+rects[4][2]*0.14,
               rects[4][1]+rects[4][3]*0.5+rects[4][2]*0.36);
      
      fill(colours[0]);
      quad(rects[5][0]+rects[5][2]*0.3,
               rects[5][1]+rects[5][3]*0.5-rects[5][2]*0.36,
           rects[5][0]+rects[5][2]*0.86,
               rects[5][1]+rects[5][3]*0.5-rects[5][2]*0.36,
              rects[5][0]+rects[5][2]*0.7,
               rects[5][1]+rects[5][3]*0.5+rects[5][2]*0.36,
              rects[5][0]+rects[5][2]*0.14,
               rects[5][1]+rects[5][3]*0.5+rects[5][2]*0.36);
        
        
        for (let l of lines){
      if (l[2]){
        stroke(...l[2]);
      }
    
        line(l[0][0], l[0][1], l[1][0], l[1][1]);
        
      }
      
      }
      
      
  } 
  }
  
  //GO TO NEXT DRAWING
  if (next && timer > 0){
    if (frameCount%60 == 0){
      timer--;
    }
    textSize(width*0.3);
    textAlign(CENTER,CENTER);
    fill(0);
    noStroke();
    if (timer != 0){
    text(timer, width/2, height*0.505);
    }
  } 
  else if (timer <= 0){
    next = false;
    drawing = (drawing+1)%3;
    timer = 5;
    calcLines();
    counter = 0;
    str = 0;
    percent = 0;
    speed = 20;
    lineFlag = false;
    maskFlag = false;
  }
  
  //DISPLAY INSTRUCTIONS
  if (mouseIsPressed){
    textSize(width*0.1);
    textAlign(CENTER, CENTER);
    fill('antiquewhite');
    noStroke();
    push();
    fill(colours[3]);
    rect(width/2 - width*0.41, height*0.00, width*0.82, height*0.155);
    pop();
    text("Wall Drawing " + titles[drawing], width/2, height*0.08);
    
    push();
    fill(colours[3]);
    rectMode(CENTER);
    let h = 0;
    if (drawing == 0){
      h = height*0.15;
    } else if (drawing == 1){
      h = height*0.08;
    } else if (drawing == 2){
      h = height*0.6;
    }
    rect(width/2, height*0.7, width*0.75, h);
    if (drawing == 2){
      textAlign(LEFT, CENTER);
    } else {
      textAlign(CENTER, CENTER);
    }
    
    textSize(width*0.025);
    rectMode(CORNER);
    fill('antiquewhite');
    text(instructions[drawing], width/2 - width*0.35, height*0.4, width*0.7, height*0.6);
    pop();
  }
  
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  
  calcLines();
  strokeWeight(width*0.0016);
  
}

function band(x1, y1, x2, y2, x3, y3, x4, y4, c, n, f){
  let segs = [];
  
  if (f){
    segs.push([[x1, y1], [x2, y2], [c]]);
    segs.push([[x3, y3], [x4, y4]]);
  }
  
  
  for (let i = 0; i < n; i++){
    let a1 = (x2-x1)*i/n + x1;
    let b1 = (y2-y1)*i/n + y1;
    let a2 = (x4-x3)*i/n + x3;
    let b2 = (y4-y3)*i/n + y3;
    if (i == 0 && !f){
      segs.push([[a1, b1], [a2, b2], [c]]);
    } else {
      segs.push([[a1, b1], [a2, b2]]);
    }
  }
  
  lines.push(...segs);
}

function band2(x1, y1, x2, y2, x3, y3, x4, y4, c, n, f){
  let segs = [];
  
  if (f){
    segs.push([[x1, y1], [x2, y2], [c]]);
    segs.push([[x3, y3], [x4, y4]]);
  }
  
  
  for (let i = 0; i < n; i++){
    let a1 = (x2-x1)*i/n + x1;
    let b1 = (y2-y1)*i/n + y1;
    let a2 = (x4-x3)*i/n + x3;
    let b2 = (y4-y3)*i/n + y3;
    if (i == 0 && !f){
      segs.push([[a1, b1], [a2, b2], [c]]);
    } else {
      segs.push([[a1, b1], [a2, b2]]);
    }
  }
  
  lines2.push(...segs);
}

function circs(x, y, start, stop, c){
  let seq = [];
  
  for (let i = start; i < stop; i += start){
    if (i == start){
      seq.push([x, y, i, c]);
    } else {
      seq.push([x, y, i]);
    }
  }
  
  circles.push(...seq);
}

function star(x, y, s, p){
  noFill();
  circle(x, y, s*2);
  let scal = 0.8;
  circle(x, y, scal*2*s);
  beginShape();
  for (let i = 0; i < TWO_PI; i+=TWO_PI/p){
    let x1 = x + sin(i+PI)*s;
    let y1 = y + cos(i+PI)*s;
    // vertex(x1, y1);
  }
  endShape(CLOSE);
  
  
  
  beginShape();
  for (let i = 0; i < p; i++){
    let q = 0;
    let h = 0;
    if (i%2==0){
      q = map(i, 0, p-1, -s*scal, s*scal);
      h = yUp(q+x, x, y, s*scal);
    } else {
      q = map(i, 0, p-1, -s, s);
      h = yUp(q+x, x, y, s);
    }
    vertex(x+q, h);
    
  }
  endShape();
  let n = 12/20;
  // print(n, s);
  // line(x+s*n, 0, x+s*n, height);
}

function circStripe(x, y, s, p, c){
  let segs = [];
  for (let i = -s+1; i < s-1; i += p){
    let h = circY(x+i, x, y, s);
    if (i == -s+1){
      segs.push([[x+i, h[0]], [x+i, h[1]], [c]]);
    } else {
      segs.push([[x+i, h[0]], [x+i, h[1]]]);
    }
  }
  lines.push(...segs);
}

function triStripe(x, y, s, p, c){
  let segs = [];
  segs.push([[-width,-width], [-width, -width], [c]]);
  for (let i = -s+1; i < s-1; i+=p){
    let offset = map(abs(i), 0, s-1, 2*s, 0);
    segs.push([[x+i, y+s], [x+i, y+s-offset]]);
  }
  lines.push(...segs);
}

function trapStripe(x, y, s, p, c){
  let segs = [];
  segs.push([[-width,-width], [-width, -width], [c]]);
  for (let i = -s+1; i < s-1; i+=p){
    let offset = map(abs(i), 0, s-1, 3.6*s, 0);
    offset = constrain(offset, 0, 2*s);
    segs.push([[x+i, y+s], [x+i, y+s-offset]]);
  }
  lines.push(...segs);
}

function paraStripe(x, y, s, p, c){
  let segs = [];
  segs.push([[-width,-width], [-width, -width], [c]]);
  for (let i = -s+1; i < s-1; i+=p){
    let offset1 = map(i, -s+1, s-1, s, -8*s);
    offset1 = constrain(offset1, -s, s);
    let offset2 = map(i, -s+1, s-1, 8*s, -s);
    offset2 = constrain(offset2, -s, s);
    segs.push([[x+i, y+offset2], [x+i, y+offset1]]);
  }
  lines.push(...segs);
}

function circY(x, u, v, r){
  let y1 = yUp(x, u, v, r);
  let y2 = yDown(x, u, v, r);
  return [y1, y2];
}

function yUp(x, u, v, r){
  let y = v - sqrt(abs(sq(r) - sq(x-u)));
  return y;
}

function yDown(x, u, v, r){
  let y = v + sqrt(abs(sq(r) - sq(x-u)));
  return y;
}