let colours = [[45,97,59], [350,42,63], [185,97,27], [350,75,68], [20,87,55], [200,57,56], [76,32,53], [1,47,50]];

let circs = [];

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  
  colorMode(HSL, 360, 100, 100, 100);
  blendMode(SCREEN);
  strokeWeight(width*0.006);
  
  for (let i = 0; i < 10; i++){
    let x = width/2;
    let y = random(-height/2, height*1.5);
    let w = random(0.3*width, 1.5*width);
    let h = random(width/2, width);
    let c = random(colours);
    let l = random(2000, 3000);
    let ds = random(3);
    let dy = random(-2, 2);
    // if (y > height/2){
    //   dy = random(-5);
    // }
    circs.push(new Circ(x, y, w, h, c, l, ds, dy));
  }
  
  
}

function draw(){
  
  for (let b of circs){
    b.display();
  }
  
}

class Circ {
  constructor(x, y, w, h, c, l, ds, dy){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c; //colour
    this.l = l; //lifetime
    this.a = l;
    this.ds = ds; //change in size
    this.dy = dy; //direction x
  }
  
  display(){
    if (this.l > 0){
      let rat = this.l/this.a;
      let osc = sin(PI*rat);
      let alph = width*0.007*rat;
      
      // fill(this.c[0]+(1-rat)*100, this.c[1], this.c[2], alph);
      // ellipse(this.x, this.y, this.s+rat*(this.s*0.5));
      
      stroke(this.c[0]+(1-rat)*50*this.dy, this.c[1], this.c[2], alph);
      for (let i = 0; i < 800; i++){
        let a = random(TWO_PI);
        let r1 = 0.5*this.w*sqrt(random());
        let r2 = 0.5*this.h*sqrt(random());
        let x = this.x + cos(a)*r1;
        let y = this.y + sin(a)*r2;
        point(x, y);
      }
      
      this.w += this.ds;
      this.h += this.ds;
      this.y += this.dy;
      
      this.l--;
    }
    
  }
}

function mousePressed(){
  circs = [];
  setup();
}


function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);

}