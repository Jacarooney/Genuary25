let man;
let hats = [];
let hatScale = 1;
let tops = [];
let topScale = 1;
let bottoms = [];
let bottomScale = 1;

let zoom = 1;
let zooming = false;

//Palettes
let skinTones = ["sienna", "peachpuff", "burlywood", "peru"];
let colours = [
  "pink",
  "indianred",
  "orange",
  "gold",
  "cornsilk",
  "plum",
  "mediumpurple",
  "cornflowerblue",
  "lightskyblue",
  "cadetblue",
  "paleturquoise",
  "olive",
  "darkseagreen",
  "honeydew",
  "lavenderblush",
];

//Clothes
let hatStyles = ["cap", "cap", "cap", "fez", "fez", "fez", "beanie", "beanie", "beanie", "bucket", "bucket", "cork", "sun", "beret", "beret", "beret"];
let topStyles = ["tee", "vest", "sweater"];
let bottomStyles = ["trackies", "shorts"];

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  strokeWeight(1.2);
  angleMode(DEGREES);
  man = new Man(width / 2, height / 2, dim/60, random(skinTones), random(colours));
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim, dim);
  man.size = dim/60;
  man.x = width/2;
  man.y = height/2;
}

function draw() {
  background("antiquewhite");
  man.display();

  //customCursor?
  if (man.hover() != "none") {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  
  //Top fade out
  resetMatrix();
  for (let i = 0; i < 20; i++){
    stroke(250, 235, 215, 255-i*5);
    line(0, i, width, i);
  }
}

function mousePressed() {
  if (mouseButton == LEFT) {
    if (man.hover() == "head") {
      hats.push(new Hats(random(hatStyles), hatScale));
      hatScale += 0.03;
      if (hatScale > 1.8) {
        zooming = true;
        zoom -= 1;
        man.size -= 0.4;
        man.y += man.size;
      }
    } else if (man.hover() == "torso") {
      tops.push(new Tops(random(topStyles), topScale));
      if (topScale < 1.96) {
        topScale += 0.01;
        man.armAngle += 1;
      }
    } else if (man.hover() == "legs") {
      bottoms.push(new Bottoms(random(bottomStyles), bottomScale));
      if (bottomScale < 1.35) {
        bottomScale += 0.01;
        man.legAngle += 0.2;
      }
    }
  }
  if (mouseButton == RIGHT) {
    if (man.hover() == "head") {
      if (hats.length) {
        hats.pop();
        hatScale -= 0.03;

        if (zooming) {
          zoom += 1;
          man.size += 0.4;
          man.y -= man.size;
          if (hatScale < 1.8) {
            zooming = false;
          }
        }
      }
    } else if (man.hover() == "torso") {
      if (tops.length) {
        tops.pop();
        if (tops.length < 97) {
          topScale -= 0.01;
          man.armAngle -= 1;
        }
      }
    } else if (man.hover() == "legs") {
      if (bottoms.length) {
        bottoms.pop();
        if (bottoms.length < 36) {
          bottomScale -= 0.01;
          man.legAngle -= 0.2;
        }
      }
    }
  }
}

//Disable right-click
document.oncontextmenu = function () {
  return false;
};

class Hats {
  constructor(style, scale) {
    this.s = style;
    let colourNum = floor(random(colours.length));
    this.c = colours[colourNum];
    this.sc = scale;
    this.coinFlip = random([-1, 1]);
    this.angle = random(-6, 6);
  }

  display(m) {
    fill(this.c);
    stroke(0);
    push();
    translate(0, -2.5 * m - (this.sc - 1) * 300);
    rotate(this.angle);

    m = m * this.sc;

    if (this.s == "cap") {
      arc(0, 0, 3.8 * m, 3.5 * m, 170, 370);

      fill(0);
      ellipse(0, -1.7 * m, 0.7 * m, 0.4 * m);

      push();
      noFill();
      strokeWeight(0.65 * m);
      arc(0, 0.75 * m, 3.5 * m, 2 * m, 185, 355);
      stroke(this.c);
      strokeWeight(0.47 * m);
      arc(0, 0.75 * m, 3.5 * m, 2 * m, 185, 355);
      pop();
    }
    
    if (this.s == "fez") {
      push();
      translate(0, -0.2*m);
      ellipse(0, 0, 3.4*m, 0.8*m);
      ellipse(0, -1.5*m, 2*m, 0.5*m);
      quad(-1.7*m, 0, -1*m, -1.5*m, 1*m, -1.5*m, 1.7*m, 0);
      stroke(this.c);
      line(-1.55*m, 0, 1.55*m, 0);
      
      noFill();
      stroke(0);
      arc(0.15*m*this.coinFlip, -0.8*m, 0.5 * m, 1.7 * m, 260*this.coinFlip, 440*this.coinFlip);
      arc(0.3*m*this.coinFlip, -0.8*m, 0.5 * m, 1.7 * m, 260*this.coinFlip, 440*this.coinFlip);
      arc(0.45*m*this.coinFlip, -0.8*m, 0.5 * m, 1.7 * m, 260*this.coinFlip, 440*this.coinFlip);
      pop();

      
    }
    
    if (this.s == "beanie") {
      arc(0, 0, 3.8 * m, 3.5 * m, 170, 370);

      rect(0, 0.2*m, 4*m, 0.6*m, 0.2*m);
      
      translate(0.1*m*this.coinFlip, -1.8*m);
      rotate(15);
      noStroke();
      ellipse(0, 0, 0.8*m);
      stroke(0);
      push();
      for (let i = 0; i <= 8; i++){
        line(0, 0.3*m, 0, 0.5*m);
        rotate(40);
      }
      pop();
      
    }
    
    if (this.s == "bucket") {
      push();
      translate(0, 0.2*m);
      // ellipse(0, 0*m, 3.8*m, 1.5*m);
      ellipse(0, -1.5*m, 3*m, 0.5*m);
      quad(-1.9*m, -0.4*m, -1.5*m, -1.5*m, 1.5*m, -1.5*m, 1.9*m, -0.4*m);
      quad(-1.9*m, -0.4*m, -2.6*m, 0.5*m, 2.6*m, 0.5*m, 1.9*m, -0.4*m);
      ellipse(0, 0.5*m, 5.2*m, 0.4*m);
      stroke(this.c);
      arc(0, 0.49*m, 4.9*m, 0.5*m, 180, 360);
      stroke(0);
      pop();

      
    }
    
    if (this.s == "sun") {
      push();
      translate(0, 0.1*m);
      // ellipse(0, 0*m, 3.8*m, 1.5*m);
      ellipse(0, -1.5*m, 3*m, 0.5*m);
      quad(-1.9*m, -0.4*m, -1.5*m, -1.5*m, 1.5*m, -1.5*m, 1.9*m, -0.4*m);
      quad(-1.9*m, -0.4*m, -3.7*m, 0.5*m, 3.7*m, 0.5*m, 1.9*m, -0.4*m);
      ellipse(0, 0.55*m, 7.5*m, 0.4*m);
      stroke(this.c);
      arc(0, 0.54*m, 6.9*m, 0.5*m, 180, 360);
      stroke(0);
      strokeWeight(0.3*m);
      line(-1.6*m, -0.9*m, 1.6*m, -0.9*m);
      pop();
    }
    
    if (this.s == "cork") {
      push();
      translate(0, 0*m);
      quad(-1.7*m, -0.4*m, -1.5*m, -1.5*m, 1.5*m, -1.5*m, 1.7*m, -0.4*m);
      fill(0);
      rect(0, 0*m, 3.4*m, 1*m, 0.2*m);
      
      stroke(this.c);
      arc(0, 0.54*m, 6.9*m, 0.5*m, 180, 360);
      stroke(0);
      fill(this.c);
      beginShape();
      curveVertex(0*m, -0.2*m);
      curveVertex(0*m, -0.2*m);
      curveVertex(-3.7*m, 0.5*m);
      curveVertex(-2*m, 0.6*m);
      curveVertex(-1*m, 0.4*m);
      curveVertex(-0*m, 0.3*m);
      curveVertex(1*m, 0.6*m);
      curveVertex(2.8*m, 0.5*m);
      curveVertex(3.7*m, 0.5*m);
      curveVertex(0*m, -0.2*m);
      endShape(CLOSE);
      
      push();
      noFill();
      strokeWeight(1);
      arc(0, 0.05*m, 3*m, 0.3*m, 180, 360);
      pop();
      
      line(-3.3*m, 0.6*m, -3.3*m, 1.3*m);
      rect(-3.3*m, 1.5*m, 0.3*m, 0.6*m);
      line(-2.4*m, 0.6*m, -2.4*m, 1.8*m,);
      rect(-2.4*m, 2*m, 0.3*m, 0.6*m);
      line(1.7*m, 0.6*m, 1.7*m, 1.4*m,);
      rect(1.7*m, 1.6*m, 0.3*m, 0.6*m);
      line(3*m, 0.6*m, 3*m, 1.5*m,);
      rect(3*m, 1.7*m, 0.3*m, 0.6*m);
      
      pop();
    }
    
    if (this.s == "beret") {
      push();
      // scale(this.coinFlip, 0);
      
      beginShape();
      curveVertex(-0*m, -1.5*m);
      curveVertex(-0*m, -1.5*m);
      curveVertex(-1.7*m, -0.8*m);
      curveVertex(-2*m, 0.2*m);
      curveVertex(-0*m, 0*m);
      curveVertex(1.7*m, 0.8*m);
      curveVertex(2.3*m, 0.9*m);
      curveVertex(2.6*m, 0.4*m);
      curveVertex(1.5*m, -1*m);
      endShape(CLOSE);
      
      fill(0);
      ellipse(0, -1.4*m, 0.6*m, 0.3*m);
      
      pop();
    }
    
    pop();
  }
}

class Tops {
  constructor(style, scale) {
    this.s = style;
    let colourNum = floor(random(colours.length));
    this.c = colours[colourNum];
    this.sc = scale;
    this.coinFlip = random([-1, 1]);
  }

  display(angle, m) {
    m = m * this.sc;

    if (this.s == "tee") {
      stroke(0);
      fill(this.c);

      push();
      translate(0, 1.8 * m - (this.sc - 1) * m * 1.5);

      //Sleeves
      //Left
      push();
      translate(-2.2 * m, 0.45 * m);
      rotate(angle);
      beginShape();
      curveVertex(0, -0.8 * m);
      curveVertex(0, -0.8 * m);
      curveVertex(-1.2 * m, 0 * m);
      curveVertex(-1.2 * m, 2.5 * m);
      curveVertex(1.75 * m, 2.5 * m);
      curveVertex(1.2 * m, 0 * m);
      endShape(CLOSE);
      push();
      fill(0);
      rect(0.2 * m, 2.7 * m, 3.2 * m, 0.4 * m, 0.2 * m);
      pop();
      pop();

      //Right
      push();
      translate(2.2 * m, 0.45 * m);
      rotate(-angle);
      beginShape();
      curveVertex(0, -0.8 * m);
      curveVertex(0, -0.8 * m);
      curveVertex(1.2 * m, 0 * m);
      curveVertex(1.2 * m, 2.5 * m);
      curveVertex(-1.75 * m, 2.5 * m);
      curveVertex(-1.2 * m, 0 * m);
      endShape(CLOSE);
      push();
      fill(0);
      rect(-0.2 * m, 2.7 * m, 3.2 * m, 0.4 * m, 0.2 * m);
      pop();
      pop();

      //Body
      beginShape();
      curveVertex(0, 0 * m);
      curveVertex(0, 0 * m);
      curveVertex(-3 * m, -0.1 * m);
      curveVertex(-2.5 * m, 3.5 * m);
      curveVertex(-2.2 * m, 6.5 * m);
      curveVertex(2.2 * m, 6.5 * m);
      curveVertex(2.5 * m, 3.5 * m);
      curveVertex(3 * m, -0.1 * m);
      endShape(CLOSE);

      //Line hiders
      noStroke();
      ellipse(-2.85 * m, 0.69 * m, 0.9 * m, 1.5 * m);
      ellipse(-1.95 * m + (this.sc-1)*m*0.15, 1.6 * m - (this.sc-1)*m*0.27, 2.4 * m, 2.2 * m);
      ellipse(2.85 * m, 0.69 * m, 0.9 * m, 1.5 * m);
      ellipse(1.95 * m - (this.sc-1)*m*0.15, 1.6 * m - (this.sc-1)*m*0.27, 2.4 * m, 2.2 * m);

      //Pocket
      stroke(0);
      rect(
        this.coinFlip * 1.3 * m,
        2 * m,
        1.5 * m,
        1.5 * m,
        0.2 * m,
        0.2 * m,
        0.6 * m,
        0.6 * m
      );
      fill(0);
      rect(
        this.coinFlip * 1.3 * m,
        1.2 * m,
        1.5 * m,
        0.2 * m,
        0.2 * m,
        0.2 * m,
        0.6 * m,
        0.6 * m
      );

      //Linings
      noFill();
      arc(0 * m, -0.2 * m, 2.5 * m, 0.9 * m, 0, 180);
      arc(0 * m, 5.4 * m, 6.5 * m, 2.5 * m, 20, 160);
      pop();
    }
    if (this.s == "vest") {
      stroke(0);
      fill(this.c);

      push();
      translate(0, 1.8 * m - (this.sc - 1) * m * 1.5);
      
      //Left
      beginShape();
      curveVertex(-1.5*m, -0 * m);
      curveVertex(-1.5*m, -0.1* m);
      curveVertex(-1*m, -0.2* m);
      curveVertex(-1.8*m, -0.3* m);
      curveVertex(-2.7* m, -0.25 * m);
      curveVertex(-3.4 * m, 0.5 * m);
      curveVertex(-2.5 * m, 3.7 * m);
      curveVertex(-2.6 * m, 6 * m);
      curveVertex(-1.3 * m, 7.8 * m);
      curveVertex(0.3 * m, 6 * m);
      curveVertex(-0 * m, 2.5 * m);
      endShape(CLOSE);

      //Right
      beginShape();
      curveVertex(1.5*m, -0 * m);
      curveVertex(1.5*m, -0.1* m);
      curveVertex(1*m, -0.2* m);
      curveVertex(1.8*m, -0.3* m);
      curveVertex(2.7* m, -0.25 * m);
      curveVertex(3.4 * m, 0.5 * m);
      curveVertex(2.5 * m, 3.7 * m);
      curveVertex(2.6 * m, 6 * m);
      curveVertex(1.3 * m, 7.8 * m);
      curveVertex(-0.3 * m, 6 * m);
      curveVertex(-0.5 * m, 4 * m);
      curveVertex(-0.4 * m, 2.5 * m);
      endShape(CLOSE);

      //Buttons
      fill(0);
      ellipse(0, 3.2*m, 0.5*m, 0.3*m);
      ellipse(0, 4.3*m, 0.5*m, 0.3*m);
      ellipse(0, 5.4*m, 0.5*m, 0.3*m);
      
      //Pocket
      rect(-1.5*m, 2*m, 1.2*m, 0.1*m, 0.1*m);

      pop();
    }
    
    if (this.s == "sweater") {
      stroke(0);
      fill(this.c);

      push();
      translate(0, 1.8 * m - (this.sc - 1) * m * 1.5);
      
      //Left
      beginShape();
      curveVertex(-0 * m, 1.4 * m);
      curveVertex(-0 * m, 1.4 * m);
      curveVertex(-0.6*m, 1.2 * m);
      curveVertex(-1.5*m, -0 * m);
      curveVertex(-1*m, -0.2* m);
      curveVertex(-1.8*m, -0.3* m);
      curveVertex(-2.7* m, -0.25 * m);
      curveVertex(-3.4 * m, 0.5 * m);
      curveVertex(-2.5 * m, 3.7 * m);
      curveVertex(-2.6 * m, 6 * m);
      curveVertex(0.3 * m, 7 * m);
      curveVertex(2.6 * m, 6 * m);
      curveVertex(2.5 * m, 3.7 * m);
      curveVertex(3.4 * m, 0.5 * m);
      curveVertex(2.7* m, -0.25 * m);
      curveVertex(1.8*m, -0.3* m);
      curveVertex(1*m, -0.2* m);
      curveVertex(1.5*m, -0 * m);
      curveVertex(0.6*m, 1.2 * m);
      endShape(CLOSE);
      
      fill(0);
      beginShape();
      vertex(-2.5*m, 3.4*m);
      vertex(-1.6*m, 4.4*m);
      vertex(-0.9*m, 3.4*m);
      vertex(-0.1*m, 4.4*m);
      vertex(0.8*m, 3.4*m);
      vertex(1.7*m, 4.4*m);
      vertex(2.5*m, 3.4*m);
      vertex(2.4*m, 4.2*m);
      vertex(1.6*m, 5.2*m);
      vertex(0.7*m, 4.2*m);
      vertex(-0.2*m, 5.2*m);
      vertex(-0.9*m, 4.2*m);
      vertex(-1.6*m, 5.2*m);
      vertex(-2.4*m, 4.2*m);
      endShape(CLOSE);
      
      noFill();
      arc(0, 0.2*m, 3.4*m, 3*m, -15, 195);

      pop();
    }
  }
}

class Bottoms {
  constructor(style, scale) {
    this.s = style;
    let colourNum = floor(random(colours.length));
    this.c = colours[colourNum];
    this.sc = scale;
    this.coinFlip = random([-1, 1]);
  }

  display(angle, m) {
    m = m * this.sc;
    stroke(0);
    fill(this.c);

    if (this.s == "trackies") {
      let fudge = 10;

      push();
      translate(0, 8.3 * m - (this.sc - 1) * m * 7);

      //Left Leg
      push();
      translate(-0.2 * m, 0.8 * m);
      rotate(angle);

      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-2.5 * m, 0 * m);
      curveVertex(-2.2 * m, 12.4 * m - (this.sc - 1) * m * fudge);
      curveVertex(
        -0.2 * m + (this.sc - 1) * m * fudge * 0.5,
        12.2 * m - (this.sc - 1) * m * fudge
      );
      curveVertex(0.3 * m, 2 * m);
      endShape(CLOSE);

      rect(
        -1.3 * m + (this.sc - 1) * m * fudge * 0.2,
        13.6 * m - (this.sc - 1) * m * fudge,
        -1.3 * m - (this.sc - 1) * m * fudge * 0.3,
        0.5 * m,
        0.3 * m
      );
      pop();

      //Right leg
      push();
      translate(0.2 * m, 0.8 * m);
      rotate(-angle);

      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(2.5 * m, 0 * m);
      curveVertex(2.2 * m, 12.4 * m - (this.sc - 1) * m * fudge);
      curveVertex(
        0.2 * m - (this.sc - 1) * m * fudge * 0.5,
        12.2 * m - (this.sc - 1) * m * fudge
      );
      curveVertex(-0.3 * m, 2 * m);
      endShape(CLOSE);

      rect(
        1.3 * m - (this.sc - 1) * m * fudge * 0.2,
        13.6 * m - (this.sc - 1) * m * fudge,
        1.3 * m + (this.sc - 1) * m * fudge * 0.3,
        0.5 * m,
        0.3 * m
      );
      pop();

      //Mid
      beginShape();
      curveVertex(0, -0.1 * m);
      curveVertex(0, -0.1 * m);
      curveVertex(-2.4 * m, -0.2 * m);
      curveVertex(-1.1 * m, 3 * m);
      curveVertex(-0.7 * m, 4 * m);
      curveVertex(0.7 * m, 4 * m);
      curveVertex(1.1 * m, 3 * m);
      curveVertex(2.4 * m, -0.2 * m);
      endShape(CLOSE);

      //Coverups
      noStroke();
      fill(this.c);
      ellipse(-2.1 * m, 0.9 * m, 1 * m, 2 * m);
      ellipse(2.1 * m, 0.9 * m, 1 * m, 2 * m);
      ellipse(-1 * m, 2.5 * m, 2 * m, 3 * m);
      ellipse(1 * m, 2.5 * m, 2 * m, 3 * m);

      //Band
      noFill();
      stroke(0);
      arc(0, 0, 5 * m, 0.4 * m, 0, 180);

      //Pockets
      arc(-2.6 * m, 0.6 * m, 1 * m, 2.5 * m, -20, 90);
      arc(2.6 * m, 0.6 * m, 1 * m, 2.5 * m, 90, 200);

      //String
      strokeWeight(2);
      line(-0.2 * m, 0.1 * m, -0.4 * m, 1.7 * m);
      line(0.2 * m, 0.1 * m, 0.4 * m, 1.7 * m);

      pop();
    }

    if (this.s == "shorts") {
      let fudge = 10;

      push();
      translate(0, 8.3 * m - (this.sc - 1) * m * 7);

      //Left Leg
      push();
      translate(-0.2 * m, 0.8 * m);
      rotate(angle);

      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-2.4 * m, 0 * m);
      curveVertex(-2.5 * m - (this.sc - 1) * m * 0.5, 5.8 * m);
      curveVertex(-1.2 * m, 6.4 * m);
      curveVertex(-0 * m + (this.sc - 1) * m * 3, 6 * m);
      curveVertex(0.3 * m, 2 * m);
      endShape(CLOSE);

      // rect(-1.3*m+(this.sc-1)*m*fudge*0.2, 13.6*m-(this.sc-1)*m*fudge, -1.3*m-(this.sc-1)*m*fudge*0.3, 0.5*m, 0.3*m);
      pop();

      //Right leg
      push();
      translate(0.2 * m, 0.8 * m);
      rotate(-angle);

      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(2.4 * m, 0 * m);
      curveVertex(2.5 * m + (this.sc - 1) * m * 0.5, 5.8 * m);
      curveVertex(1.2 * m, 6.4 * m);
      curveVertex(0 * m - (this.sc - 1) * m * 3, 6 * m);
      curveVertex(-0.3 * m, 2 * m);
      endShape(CLOSE);
      pop();

      //Mid
      beginShape();
      curveVertex(0, -0.1 * m);
      curveVertex(0, -0.1 * m);
      curveVertex(-2.4 * m, -0.1 * m);
      curveVertex(-1.1 * m, 3 * m);
      curveVertex(-0.7 * m, 4 * m);
      curveVertex(0.7 * m, 4 * m);
      curveVertex(1.1 * m, 3 * m);
      curveVertex(2.4 * m, -0.1 * m);
      endShape(CLOSE);

      //Coverups
      noStroke();
      fill(this.c);
      ellipse(-2 * m, 0.9 * m, 1 * m, 2 * m);
      ellipse(2 * m, 0.9 * m, 1 * m, 2 * m);
      ellipse(-1 * m, 2.5 * m, 2 * m, 3 * m);
      ellipse(1 * m, 2.5 * m, 2 * m, 3 * m);

      //Band
      noFill();
      stroke(0);
      for (let i = -2.1 * m; i <= 2.1 * m; i += 0.3 * m) {
        let theta = map(i, -2.1 * m, 2.1 * m, 0, 360);
        line(i, -cos(theta), i, 0.3 * m);
      }
      // arc(0, 0, 5*m, 0.4*m, 0, 180);

      //Pockets
      noFill();
      arc(-2.4 * m, 0.7 * m, 1.4 * m, 1 * m, -20, 90);
      arc(2.4 * m, 0.7 * m, 1.4 * m, 1 * m, 90, 200);

      //Button
      // fill(0);
      // ellipse(0*m, 2*m, 0.5*m);
      arc(0.1 * m, 1.2 * m, 0.5 * m, 5 * m, 0, 90);

      pop();
    }
  }
}

class Man {
  constructor(x, y, size, flesh, undies) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.flesh = flesh;
    this.legAngle = 5;
    this.armAngle = 10;
    this.undies = undies;
    this.hair = random([0, 1, 2, 3]);
  }

  display() {
    fill(this.flesh);
    stroke("black");

    let m = max(this.size, 0);
    let legAngle = this.legAngle;
    let armAngle = this.armAngle;

    translate(this.x, this.y);

    //Left Leg
    push();
    translate(0, 9 * m);
    rotate(legAngle);

    //Foot
    beginShape();
    curveVertex(-1.5 * m, 14 * m);
    curveVertex(-1.5 * m, 14 * m);
    curveVertex(-4 * m, 15 * m);
    curveVertex(-4.4 * m, 15.8 * m);
    curveVertex(-0.7 * m, 15.3 * m);
    curveVertex(-0.9 * m, 14 * m);
    endShape(CLOSE);

    //Leg
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-2.5 * m, 0 * m);
    curveVertex(-2.2 * m, 13 * m);
    curveVertex(-0.8 * m, 13 * m);
    curveVertex(-0.2 * m, 2 * m);
    endShape(CLOSE);

    noStroke();
    ellipse(-1.5 * m, 14 * m, 0.8 * m, 2 * m);

    pop();

    //Right Leg
    push();
    translate(0, 9 * m);
    rotate(-legAngle);

    //Foot
    beginShape();
    curveVertex(1.5 * m, 14 * m);
    curveVertex(1.5 * m, 14 * m);
    curveVertex(4 * m, 15 * m);
    curveVertex(4.4 * m, 15.8 * m);
    curveVertex(0.7 * m, 15.3 * m);
    curveVertex(0.9 * m, 14 * m);
    endShape(CLOSE);

    //Leg
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(2.5 * m, 0 * m);
    curveVertex(2.2 * m, 13 * m);
    curveVertex(0.8 * m, 13 * m);
    curveVertex(0.2 * m, 2 * m);
    endShape(CLOSE);

    noStroke();
    ellipse(1.5 * m, 14 * m, 0.8 * m, 2 * m);
    pop();

    //Hips/Undies
    push();
    fill(this.undies);
    beginShape();
    curveVertex(0, 6 * m);
    curveVertex(0, 6 * m);
    curveVertex(-2.2 * m, 8 * m);
    curveVertex(-0.8 * m, 10 * m);
    curveVertex(-0.4 * m, 10.5 * m);
    curveVertex(0.4 * m, 10.5 * m);
    curveVertex(0.8 * m, 10 * m);
    curveVertex(2.2 * m, 8 * m);
    endShape(CLOSE);
    pop();

    //Belly
    beginShape();
    curveVertex(0, 5 * m);
    curveVertex(0, 5 * m);
    curveVertex(-2 * m, 4 * m);
    curveVertex(-2 * m, 8 * m);
    curveVertex(2 * m, 8 * m);
    curveVertex(2 * m, 4 * m);
    endShape(CLOSE);

    //BOTTOMS
    if (tops > bottoms) {
      push();
      for (let b of bottoms) {
        b.display(legAngle, m);
      }
      pop();
    }

    //Left Arm
    push();
    translate(-2.2 * m, 2 * m);
    rotate(armAngle);
    beginShape();
    curveVertex(0, 0.5 * m);
    curveVertex(0, 0.5 * m);
    curveVertex(-1 * m, 1 * m);
    curveVertex(-0.5 * m, 11 * m);
    curveVertex(0.45 * m, 10 * m);
    curveVertex(0.5 * m, 2 * m);
    endShape(CLOSE);

    //Left Hand
    beginShape();
    curveVertex(0.1 * m, 11 * m);
    curveVertex(0.1 * m, 11 * m);
    curveVertex(-0.6 * m, 11.5 * m);
    curveVertex(-0.3 * m, 13.2 * m);
    curveVertex(-0.05 * m, 12.5 * m);
    curveVertex(0.06 * m, 11.8 * m);
    curveVertex(0.5 * m, 12 * m);
    curveVertex(0.4 * m, 11 * m);
    endShape(CLOSE);

    noStroke();
    ellipse(-0.1 * m, 11.1 * m, 0.6 * m, 0.5 * m);
    pop();

    //Right Arm
    push();
    translate(2.2 * m, 2 * m);
    rotate(-armAngle);
    beginShape();
    curveVertex(0, 0.5 * m);
    curveVertex(0, 0.5 * m);
    curveVertex(1 * m, 1 * m);
    curveVertex(0.5 * m, 11 * m);
    curveVertex(-0.45 * m, 10 * m);
    curveVertex(-0.5 * m, 2 * m);
    endShape(CLOSE);

    //Right Hand
    beginShape();
    curveVertex(-0.1 * m, 11 * m);
    curveVertex(-0.1 * m, 11 * m);
    curveVertex(0.6 * m, 11.5 * m);
    curveVertex(0.3 * m, 13.2 * m);
    curveVertex(0.05 * m, 12.5 * m);
    curveVertex(-0.06 * m, 11.8 * m);
    curveVertex(-0.5 * m, 12 * m);
    curveVertex(-0.4 * m, 11 * m);
    endShape(CLOSE);

    noStroke();
    ellipse(0.1 * m, 11.1 * m, 0.6 * m, 0.5 * m);
    pop();

    //Chest
    beginShape();
    curveVertex(0, 1.5 * m);
    curveVertex(0, 1.5 * m);
    curveVertex(-3 * m, 2 * m);
    curveVertex(-2 * m, 4.7 * m);
    curveVertex(2 * m, 4.7 * m);
    curveVertex(3 * m, 2 * m);
    endShape(CLOSE);
    push();
    noStroke();
    ellipse(-2.85 * m, 3.5 * m, 1 * m, 3 * m);
    ellipse(2.85 * m, 3.5 * m, 1 * m, 3 * m);
    ellipse(0, 6 * m, 3.5 * m, 3 * m);
    pop();

    push();
    //Nips
    fill("indianred");
    ellipse(-1.3 * m, 4.5 * m, 0.6 * m, 0.3 * m);
    ellipse(1.3 * m, 4.5 * m, 0.6 * m, 0.3 * m);

    //Belly Button
    fill(0);
    ellipse(0, 7.4 * m, 0.4 * m, 0.2 * m);
    pop();

    //Neck
    ellipse(0, 1 * m, 1.5 * m, 3 * m);
    push();
    noStroke();
    ellipse(0, 2 * m, 1.3 * m, 3 * m);
    pop();

    //TOPS
    push();
    for (let t of tops) {
      t.display(armAngle, m);
    }
    pop();

    //BOTTOMS
    if (tops <= bottoms) {
      push();
      for (let b of bottoms) {
        b.display(legAngle, m);
      }
      pop();
    }

    //Head
    rectMode(CENTER);
    rect(0, -1 * m, 3.8 * m, 4.5 * m, 2 * m, 2 * m, 1.7 * m, 1.7 * m);

    //Eyes
    //Whites
    noFill();
    stroke(0);
    arc(-0.9 * m, -1 * m, 1 * m, 0.8 * m, 180, 360);
    arc(0.9 * m, -1 * m, 1 * m, 0.8 * m, 180, 360);

    //Pupils
    fill(0);
    let pupilXOffset = map(mouseX, 0, width, -0.1 * m, 0.1 * m);
    let pupilYOffset = map(mouseY, 0, height, -0.1 * m, 0.1 * m);
    ellipse(-0.9 * m + pupilXOffset, -1 * m + pupilYOffset, 0.3 * m, 0.3 * m);
    ellipse(0.9 * m + pupilXOffset, -1 * m + pupilYOffset, 0.3 * m, 0.3 * m);

    //Nose
    line(0, -1 * m, 0.2 * m, -0.4 * m);
    line(-0.1 * m, -0.3 * m, 0.2 * m, -0.4 * m);

    //Mouth
    // noFill();
    stroke(0);
    arc(0, 0.2 * m, 1 * m, 0.2 * m, 0, 180);

    //Brows
    arc(-1 * m, -1.6 * m, 1 * m, 0.4 * m, 180, 360);
    arc(1 * m, -1.6 * m, 1 * m, 0.4 * m, 180, 360);

    //Ears
    fill(this.flesh);
    stroke(0);
    arc(-2.05 * m, -0.9 * m, 0.8 * m, 1 * m, 60, 300, OPEN);
    arc(-2.05 * m, -0.9 * m, 0.2 * m, 0.25 * m, 90, 270, OPEN);
    arc(2.05 * m, -0.9 * m, 0.8 * m, 1 * m, -120, 120, OPEN);
    arc(2.05 * m, -0.9 * m, 0.2 * m, 0.25 * m, 270, 450, OPEN);

    //Blush
    fill(255, 30, 120, 60);
    noStroke();
    ellipse(-1 * m, -0.5 * m, 0.7 * m, 0.3 * m);
    ellipse(1 * m, -0.5 * m, 0.7 * m, 0.3 * m);

    //Hair
    noStroke();
    fill(0);
    // this.hair = 0;

    if (this.hair == 0) {
      ellipse(-1.3 * m, -2.7 * m, 1.2 * m);
      ellipse(-0 * m, -3 * m, 2 * m);
      ellipse(1.3 * m, -2.7 * m, 1.2 * m);
    } else if (this.hair == 1) {
      push();
      stroke(0);
      strokeWeight(0.6 * m);
      arc(0, -2 * m, 3.5 * m, 2 * m, 200, 340);
      pop();
    } else if (this.hair == 2) {
      stroke(0);
      for (let i = -14; i <= 16; i += 2) {
        let theta = map(i, -18, 20, 90, 270);
        line(
          -0.1 * m + 0.1 * m * i,
          -2.2 * m + cos(theta) * m * 1.05,
          -0.1 * m + 0.1 * m * i,
          -2.2 * m
        );
      }
    }

    //Hat
    for (let h of hats) {
      h.display(m);
    }
  }

  hover() {
    let section = "none";

    if (mouseX > this.x - this.size * 10 && mouseX < this.x + this.size * 10) {
      if (mouseY < this.y + this.size) {
        section = "head";
      } else if (mouseY < this.y + this.size * 8) {
        section = "torso";
      } else if (mouseY < this.y + this.size * 25) {
        section = "legs";
      }
    }

    return section;
  }
}
