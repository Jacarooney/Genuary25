let colours = [
  "dodgerblue",
  "limegreen",
  "gold",
  "orangered",
  "chocolate",
  "hotpink",
  "darkturquoise",
  [50],
  "darkmagenta", 
];

let people = [];

let speed = 0.02;

let depth = 5;
let ratio = 0.13;

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  angleMode(DEGREES);
  rectMode(CENTER);
  
  people[0] = new Person(width);
  
  for (let i = 1; i < depth; i++){
    let s = people[i-1].s*ratio;
    people[i] = new Person(s);
  }
}

function draw(){
  for (let p of people){
    p.display();
  }
}

function mouseWheel(){
  for (let p of people){
    p.s += p.s*speed;
  }
  
  return false;
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  
  for (let i = 0; i < people.length; i++){
    people[i].x = width/2;
    people[i].y = height/2;
    if (people[i-1]){
      people[i].s = people[i-1].s*ratio;
    } else {
      people[i].s = width;
    }
  }
}

function poly(x, y, s, p, t){
  beginShape();
  for (let i = 0; i < p; i++){
    let a = x + cos(i*360/p + t)*s;
    let b = y + sin(i*360/p + t)*s;
    vertex(a, b);
  }
  endShape(CLOSE);
}

function star(x, y, s, p, t){
  beginShape();
  let n;
  for (let i = 0; i < p; i++){
    if (i%2 == 0){
      n = s/2;
    } else {
      n = s;
    }
    let a = x + cos(i*360/p + t)*n;
    let b = y + sin(i*360/p + t)*n;
    vertex(a, b);
  }
  endShape(CLOSE);
}

class Person{
  constructor(s){
    this.x = width/2;
    this.y = height/2;
    this.s = s;
    this.c = random(colours);
    this.p = floor(random(3, 8));
    this.star = random([true, false]);
    if (this.star){
      this.p *= 2;
    } else {
      if (random()<0.2){
        this.p = 50;
      }
    }
    this.a = random(360);
    this.a2 = 0;
  }
  
  display(){
    
    //FRAME
    noStroke();
    fill('skyblue');  
    square(this.x, this.y, this.s);
    fill('lightgreen');
    rect(this.x, this.y+this.s*0.3, this.s*0.985, this.s*0.4);
    
    //Body
    fill(this.c);
    strokeWeight(this.s*0.005);
    stroke(0);
    beginShape();
    curveVertex(this.x, this.y-this.s*0.2);
    curveVertex(this.x, this.y-this.s*0.2);
    curveVertex(this.x-this.s*0.06, this.y-this.s*0.13);
    curveVertex(this.x-this.s*0.09, this.y-this.s*0.08);
    curveVertex(this.x-this.s*0.15, this.y+this.s*0.13);
    curveVertex(this.x-this.s*0.12, this.y+this.s*0.22);
    //foot
    curveVertex(this.x-this.s*0.1, this.y+this.s*0.37);
    curveVertex(this.x-this.s*0.12, this.y+this.s*0.4);
    curveVertex(this.x-this.s*0.12, this.y+this.s*0.43);
    curveVertex(this.x-this.s*0.07, this.y+this.s*0.44);
    curveVertex(this.x-this.s*0.02, this.y+this.s*0.43);
    curveVertex(this.x-this.s*0.025, this.y+this.s*0.4);
    curveVertex(this.x-this.s*0.05, this.y+this.s*0.37);
    curveVertex(this.x-this.s*0.02, this.y+this.s*0.25);
    //midpoint
    curveVertex(this.x, this.y+this.s*0.23);
    //mirror
    curveVertex(this.x+this.s*0.02, this.y+this.s*0.25);
    curveVertex(this.x+this.s*0.05, this.y+this.s*0.37);
    curveVertex(this.x+this.s*0.025, this.y+this.s*0.4);
    curveVertex(this.x+this.s*0.02, this.y+this.s*0.43);
    curveVertex(this.x+this.s*0.07, this.y+this.s*0.44);
    curveVertex(this.x+this.s*0.12, this.y+this.s*0.43);
    curveVertex(this.x+this.s*0.12, this.y+this.s*0.4);
    curveVertex(this.x+this.s*0.1, this.y+this.s*0.37);
    curveVertex(this.x+this.s*0.12, this.y+this.s*0.22);
    curveVertex(this.x+this.s*0.15, this.y+this.s*0.13);
    curveVertex(this.x+this.s*0.09, this.y-this.s*0.08);
    curveVertex(this.x+this.s*0.06, this.y-this.s*0.13);
    curveVertex(this.x, this.y-this.s*0.2);
    endShape(CLOSE);
    
    //ARMS 
    fill(this.c);
    stroke(0);
    
    //UPPER
    push();
    translate(this.x-this.s*0.11, this.y-this.s*0.09);
    rotate(60);
    ellipse(0, 0, this.s*0.075, this.s*0.15);
    pop();
    
    push();
    translate(this.x+this.s*0.11, this.y-this.s*0.09);
    rotate(-60);
    ellipse(0, 0, this.s*0.075, this.s*0.15);
    pop();
    
    //COVER WEIRD GLITCH
    noStroke();
    // stroke(255);
    triangle(this.x, this.y-this.s*0.2, this.x-this.s*0.07, this.y-this.s*0.11, this.x+this.s*0.07, this.y-this.s*0.11);
    quad(this.x-this.s*0.07, this.y-this.s*0.11, this.x+this.s*0.07, this.y-this.s*0.11, this.x+this.s*0.1, this.y-this.s*0.06, this.x-this.s*0.1, this.y-this.s*0.06);
    
    //STEM
    stroke(0);
    rect(this.x, this.y-this.s*0.35, this.s*0.02, this.s*0.08);
    
    
    //EARS
    push();
    translate(this.x-this.s*0.1, this.y-this.s*0.24);
    rotate(-20);
    ellipse(0,0, this.s*0.05, this.s*0.1);
    noStroke();
    fill('peachpuff');
    rotate(5);
    ellipse(-this.s*0.005, -this.s*0.003, this.s*0.015, this.s*0.065);
    pop();
    
    push();
    translate(this.x+this.s*0.1, this.y-this.s*0.24);
    rotate(20);
    ellipse(0,0, this.s*0.05, this.s*0.1);
    noStroke();
    fill('peachpuff');
    rotate(-5);
    ellipse(this.s*0.005, -this.s*0.003, this.s*0.015, this.s*0.065);
    pop();
    
    //HEAD
    ellipse(this.x, this.y-this.s*0.25, this.s*0.2);
    fill('peachpuff');
    ellipse(this.x, this.y-this.s*0.25, this.s*0.17);
    
    //EYES
    noStroke();
    fill(162,112,66, 100);
    circle(this.x-this.s*0.0315, this.y-this.s*0.25, this.s*0.055);
    circle(this.x+this.s*0.0315, this.y-this.s*0.25, this.s*0.055);
    
    fill(255);
    
    circle(this.x-this.s*0.03, this.y-this.s*0.245, this.s*0.05);
    circle(this.x+this.s*0.03, this.y-this.s*0.245, this.s*0.05);
    
    
    let offsetX = map(mouseX, 0, width, -this.s*0.002, this.s*0.002);
    let offsetY = map(mouseY, 0, height, -this.s*0.002, this.s*0.002);
    fill(0);
    circle(this.x-this.s*0.03 + offsetX, this.y-this.s*0.245 + offsetY, this.s*0.04);
    circle(this.x+this.s*0.03  + offsetX, this.y-this.s*0.245 + offsetY, this.s*0.04);
    
    fill(this.c);
    circle(this.x-this.s*0.03 + offsetX*1.3, this.y-this.s*0.245 + offsetY*1.3, this.s*0.02);
    circle(this.x+this.s*0.03 + offsetX*1.3, this.y-this.s*0.245 + offsetY*1.3, this.s*0.02);
    
    fill(0);
    circle(this.x-this.s*0.03 + offsetX*1.6, this.y-this.s*0.245 + offsetY*1.6, this.s*0.015);
    circle(this.x+this.s*0.03 + offsetX*1.6, this.y-this.s*0.245 + offsetY*1.6, this.s*0.015);
    
    fill(255, 220);
    circle(this.x-this.s*0.025 + offsetX*0.5, this.y-this.s*0.25 + offsetY*0.5, this.s*0.01);
    circle(this.x+this.s*0.035 + offsetX*0.5, this.y-this.s*0.25 + offsetY*0.5, this.s*0.01);
    
    fill(this.c);
    stroke(22,24,24);
    //ANTENNA
    strokeWeight(this.s*0.004);
    if (this.star){
      star(this.x, this.y-this.s*0.41, this.s*0.05, this.p, this.a);
      fill('skyblue');
      star(this.x, this.y-this.s*0.41, this.s*0.015, this.p, this.a);
      fill(this.c);
    noStroke();
    rect(this.x, this.y-this.s*0.37, this.s*0.015, this.s*0.049);
    // stroke(0);
    ellipse(this.x, this.y-this.s*0.38, this.s*0.015);
    } else {
      poly(this.x, this.y-this.s*0.41, this.s*0.045, this.p, this.a);
      fill('skyblue');
      poly(this.x, this.y-this.s*0.41, this.s*0.025, this.p, this.a);
      fill(this.c);
    noStroke();
    rect(this.x, this.y-this.s*0.36, this.s*0.015, this.s*0.044);
    // stroke(0);
    // ellipse(this.x, this.y-this.s*0.38, this.s*0.015);
    }
    
    
    //Nose
    fill('burlywood');
    noStroke();
    ellipse(this.x, this.y-this.s*0.215, this.s*0.025, this.s*0.01);
    
    //Mouth
    ellipse(this.x, this.y-this.s*0.195, this.s*0.005, this.s*0.02);
    arc(this.x, this.y-this.s*0.195, this.s*0.05, this.s*0.04, 0, 180);
    fill('rgb(162,112,66)');
    ellipse(this.x, this.y-this.s*0.184, this.s*0.03, this.s*0.01);
    fill(0);
    arc(this.x, this.y-this.s*0.195, this.s*0.05, this.s*0.025, 0, 180);
    
    //Rosies
    fill(240, 128, 128, 80);
    ellipse(this.x-this.s*0.045, this.y-this.s*0.2, this.s*0.025, this.s*0.018);
    ellipse(this.x+this.s*0.045, this.y-this.s*0.2, this.s*0.025, this.s*0.018);
    
    //WAVERS
    fill(this.c);
    strokeWeight(this.s*0.005)
    stroke(0);
    push();
    translate(this.x+this.s*0.161, this.y-this.s*0.0495);
    rotate(sin(frameCount*2)*20 + 190);
    // ellipse(0, 0, this.s*0.01, this.s*0.02);
    beginShape();
    curveVertex(0,0);
    curveVertex(0,0);
    curveVertex(-this.s*0.01,this.s*0.001);
    curveVertex(-this.s*0.04,this.s*0.05);
    curveVertex(-this.s*0.015,this.s*0.12);
    curveVertex(-this.s*0.02,this.s*0.18);
    curveVertex(0,this.s*0.2);
    curveVertex(this.s*0.04,this.s*0.18);
    curveVertex(this.s*0.015,this.s*0.12);
    curveVertex(this.s*0.04,this.s*0.05);
    curveVertex(this.s*0.01,this.s*0.001);
    curveVertex(0,0);
    endShape(CLOSE);
    pop();
    
    push();
    translate(this.x+this.s*0.115, this.y-this.s*0.086);
    rotate(-60);
    noStroke();
    ellipse(0, 0, this.s*0.068, this.s*0.132);
    pop();
    
    fill(this.c);
    strokeWeight(this.s*0.005)
    stroke(0);
    push();
    translate(this.x-this.s*0.161, this.y-this.s*0.0495);
    rotate(-sin(frameCount*2)*20 + 170);
    // ellipse(0, 0, this.s*0.01, this.s*0.02);
    beginShape();
    curveVertex(0,0);
    curveVertex(0,0);
    curveVertex(this.s*0.01,this.s*0.001);
    curveVertex(this.s*0.04,this.s*0.05);
    curveVertex(this.s*0.015,this.s*0.12);
    curveVertex(this.s*0.02,this.s*0.18);
    curveVertex(0,this.s*0.2);
    curveVertex(-this.s*0.04,this.s*0.18);
    curveVertex(-this.s*0.015,this.s*0.12);
    curveVertex(-this.s*0.04,this.s*0.05);
    curveVertex(-this.s*0.01,this.s*0.001);
    curveVertex(0,0);
    endShape(CLOSE);
    pop();
    
    push();
    translate(this.x-this.s*0.115, this.y-this.s*0.086);
    rotate(60);
    noStroke();
    ellipse(0, 0, this.s*0.068, this.s*0.132);
    pop();
    
    
    // FADE
    let num = map(this.s, 0, width, 150, 0);
    fill(150, num);
    square(this.x, this.y, this.s);
    
    // FRAME
    noFill();
    strokeWeight(this.s*0.02);
    stroke(22,24,24);
    square(this.x, this.y, this.s);    
    
    //POP BIG, PUSH SMALL
    if (this.s > 1.5*(width)*(depth/ratio)){
      people.shift();
      people.push(new Person(people[people.length-1].s*ratio));
    }
    
  }
}