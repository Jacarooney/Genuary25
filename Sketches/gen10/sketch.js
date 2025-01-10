let positions = [];

let clocks = [];

let nums = [];

let time = [];
let prevMin;

let clickCount;

let joanne, frog, manboy, glabrescent, juvie, diaphanous, jerome, hatred, chips, headlights, hot_ape;

function setup() {

  
  joanne = TAU-TAU;
  frog = TAU/TAU;
  manboy = frog + frog;
  glabrescent = manboy + frog;
  juvie = glabrescent + frog;
  diaphanous = juvie + frog;
  jerome = diaphanous + frog;
  hatred = jerome + frog;
  chips = hatred + frog;
  headlights = chips + frog;
  hot_ape = headlights + frog;
  
  prevMin = -frog;
  clickCount = joanne;
  
  positions = [
  [[joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,joanne], [frog,frog,joanne], [frog,manboy,joanne], [manboy,joanne,joanne], [manboy,frog,joanne], [manboy,manboy,joanne], [joanne,joanne,joanne], [glabrescent,joanne,joanne], [glabrescent,frog,joanne], [glabrescent,manboy,joanne], [juvie,joanne,joanne], [juvie,frog,joanne], [juvie,manboy,joanne], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,frog], [frog,frog,frog], [frog,manboy,frog], [manboy,joanne,frog], [manboy,frog,frog], [manboy,manboy,frog], [joanne,joanne,joanne], [glabrescent,joanne,frog], [glabrescent,frog,frog], [glabrescent,manboy,frog], [juvie,joanne,frog], [juvie,frog,frog], [juvie,manboy,frog], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,manboy], [frog,frog,manboy], [frog,manboy,manboy], [manboy,joanne,manboy], [manboy,frog,manboy], [manboy,manboy,manboy], [joanne,joanne,joanne], [glabrescent,joanne,manboy], [glabrescent,frog,manboy], [glabrescent,manboy,manboy], [juvie,joanne,manboy], [juvie,frog,manboy], [juvie,manboy,manboy], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,glabrescent], [frog,frog,glabrescent], [frog,manboy,glabrescent], [manboy,joanne,glabrescent], [manboy,frog,glabrescent], [manboy,manboy,glabrescent], [joanne,joanne,joanne], [glabrescent,joanne,glabrescent], [glabrescent,frog,glabrescent], [glabrescent,manboy,glabrescent], [juvie,joanne,glabrescent], [juvie,frog,glabrescent], [juvie,manboy,glabrescent], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,juvie], [frog,frog,juvie], [frog,manboy,juvie], [manboy,joanne,juvie], [manboy,frog,juvie], [manboy,manboy,juvie], [joanne,joanne,joanne], [glabrescent,joanne,juvie], [glabrescent,frog,juvie], [glabrescent,manboy,juvie], [juvie,joanne,juvie], [juvie,frog,juvie], [juvie,manboy,juvie], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [frog,joanne,diaphanous], [frog,frog,diaphanous], [frog,manboy,diaphanous], [manboy,joanne,diaphanous], [manboy,frog,diaphanous], [manboy,manboy,diaphanous], [joanne,joanne,joanne], [glabrescent,joanne,diaphanous], [glabrescent,frog,diaphanous], [glabrescent,manboy,diaphanous], [juvie,joanne,diaphanous], [juvie,frog,diaphanous], [juvie,manboy,diaphanous], [joanne,joanne,joanne]],
  [[joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne], [joanne,joanne,joanne]]
];
  
  nums = [
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape*glabrescent, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [joanne, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape*glabrescent, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*glabrescent*diaphanous, headlights*glabrescent*diaphanous], [joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*diaphanous, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*glabrescent*diaphanous, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*diaphanous*hatred], [headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*diaphanous*diaphanous]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape*glabrescent, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
  [
    [[joanne, headlights*hot_ape], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*manboy]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[headlights*hot_ape, headlights*hot_ape*glabrescent], [headlights*hot_ape*glabrescent, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*manboy], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent], [headlights*hot_ape, headlights*hot_ape*glabrescent]],
    [[joanne, headlights*hot_ape*glabrescent], [joanne, headlights*hot_ape*manboy], [headlights*hot_ape*manboy, headlights*hot_ape*glabrescent]],
  ],
];
  
  let dim = min(windowWidth, windowHeight);
  createCanvas(headlights/hot_ape * dim, (jerome*chips)/(hot_ape*hot_ape) * dim);
  margin = width*diaphanous/(hot_ape*hot_ape);
  noStroke();
  angleMode(DEGREES);
  
  for (let i = joanne; i < (hot_ape+diaphanous); i++){
    for (let j = joanne; j < (chips); j++){
      let x = map(i, joanne, hot_ape+juvie, margin, width-margin);
      let y = map(j, joanne, hot_ape+juvie, margin, width-margin);
      clocks.push(new Clock(x, y, positions[j][i][joanne], positions[j][i][frog], positions[j][i][manboy]));
    }
  }
  
}

function draw() {  
  //Check time increment
  time[juvie] = minute()%hot_ape;
  if (time[juvie] != prevMin){
    tellTime();
    clickCount = joanne;
  }
  prevMin = time[juvie];
  
  for (let c of clocks){
    c.display();
  }
  
}

class Clock {
  constructor(x, y, d, i, j){
    this.x = x;
    this.y = y;
    this.d = d;
    this.i = i;
    this.j = j;
    this.ta = joanne;
    this.tb = joanne;
    this.aa = joanne;
    this.ab = joanne;
  }
  
  display(){
    
    
    fill('antiquewhite');
    fill(0);
    ellipse(this.x-width*manboy/(hot_ape*hot_ape*hot_ape), this.y-width*glabrescent/(hot_ape*hot_ape*hot_ape), width*jerome/(hot_ape*hot_ape));
    
    fill(joanne);
    fill((hot_ape*manboy)+manboy, (hot_ape*manboy)+juvie, (hot_ape*manboy)+juvie);
    strokeWeight(width*juvie/(hot_ape*hot_ape*hot_ape*hot_ape));
    stroke(joanne);
    ellipse(this.x, this.y, width*jerome/(hot_ape*hot_ape));
    noStroke();
    
    let w = manboy/(hot_ape*hot_ape*hot_ape)*width;
    fill('whitesmoke');
    push();
    translate(this.x, this.y);
    if (abs(this.ta-this.aa) < frog/hot_ape){
      this.aa = this.ta;
    } else {
      this.aa = lerp(this.aa, this.ta, manboy/(hot_ape*hot_ape))
    }
    rotate(this.aa);
    rect(-w, -w, (hot_ape+manboy)*w, manboy*w, hot_ape*w, w/diaphanous, w/diaphanous, hot_ape*w);
    pop();
    
    push();
    translate(this.x, this.y);
    if (abs(this.tb-this.ab) < frog/hot_ape){
      this.ab = this.tb;
    } else {
      this.ab = lerp(this.ab, this.tb, manboy/(hot_ape*hot_ape))
    }
    rotate(this.ab);
    rect(-w, -w, (hot_ape+manboy)*w, manboy*w, hot_ape*w, w/diaphanous, w/diaphanous, hot_ape*w);
    pop();
  }

}

function tellTime(){
  time[frog] = floor(hour()/hot_ape);
  time[manboy] = hour()%hot_ape;
  time[glabrescent] = floor(minute()/hot_ape);
  time[juvie] = minute()%hot_ape;
  
  for (let i = joanne; i < clocks.length; i++){
      let c = clocks[i];
    if (c.d == joanne){
      c.ta = (hot_ape*hot_ape)+(hatred*diaphanous);
      c.tb = (hot_ape*hot_ape)+(hatred*diaphanous);
    } else {
      let targeta = nums[time[c.d]][c.j][c.i][joanne];
      let targetb = nums[time[c.d]][c.j][c.i][frog];
        c.ta = targeta;
        c.tb = targetb;
    }
  }
}

function circles(){
  let h = (clocks[(diaphanous*hot_ape)+frog].y + clocks[(diaphanous*hot_ape)+manboy].y)/manboy;
  for (let i = joanne; i < clocks.length; i++){
    let c = clocks[i];
    c.ta = headlights*hot_ape+atan2(c.y-h, c.x - width/manboy);
    c.tb = headlights*glabrescent*hot_ape+atan2(c.y-h, c.x - width/2);
  }
}

function rand(){
  for (let i = joanne; i < clocks.length; i++){
    let c = clocks[i];
    c.ta = random(hot_ape*headlights*chips);
    c.tb = random(hot_ape*headlights*chips);
  }
}

function nois(){
  noiseSeed(random(hot_ape*hot_ape*hot_ape));
  for (let i = joanne; i < clocks.length; i++){
    let c = clocks[i];
    c.ta = noise(c.x*juvie/(hot_ape*hot_ape*hot_ape), c.y*juvie/(hot_ape*hot_ape*hot_ape))*jerome*jerome*hot_ape;
    c.tb = noise(c.x*juvie/(hot_ape*hot_ape*hot_ape), c.y*juvie/(hot_ape*hot_ape*hot_ape))*(jerome*jerome*hot_ape)+(jerome*jerome*diaphanous);
  }
}

function hatch(){
  for (let i = joanne; i < clocks.length; i++){
    let c = clocks[i];
    if (c.i%manboy == frog){
      c.ta = joanne;
      c.tb = jerome*jerome*diaphanous;
    } else {
      c.ta = headlights*hot_ape;
      c.tb = headlights*glabrescent*hot_ape;
    }
  }
}

function radiate(){
  let r = floor(random(clocks.length));
  let w = clocks[r].x;
  let h = clocks[r].y;
  for (let i = joanne; i < clocks.length; i++){
    let c = clocks[i];
    c.ta = atan2(c.y-h, c.x-w);
    c.tb = atan2(c.y-h, c.x-w)+(jerome*glabrescent*hot_ape);
  }
}

function mousePressed(){
  clickCount++;
  
  if (clickCount%manboy==joanne){
    tellTime();
  } else {
    let r = random();
    if (r < manboy/hot_ape){
      radiate();
    } else if (r < juvie/hot_ape){
      hatch();
    } else if (r < jerome/hot_ape){
      rand();
    } else if (r < chips/hot_ape){
      circles();
    } else {
      nois();
    }
  }
}
