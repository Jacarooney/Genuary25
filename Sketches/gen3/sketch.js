let bases = ['A', 'C', 'G', 'T'];
let colours = ['dodgerblue', 'orangered', 'limegreen', 'gold'];
let helixes = [];
function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 20; i++){
  helixes.push(new Helix(random(width), random(height), random(3, 20), random(2, 5), random(TWO_PI)));}
helixes.push(new Helix(width/2, -2*height, 100, random(20,25), 0));}
function draw() {
    background('antiquewhite'); 
  for (let h of helixes){
    h.display(); }}
class Helix {
  constructor(x, y, length, size, angle) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.size = size;
    this.angle = angle;  
    this.code = []; 
    for(let i = 0; i < length; i++){
      this.code.push(random([0, 1, 2, 3]));}}
  display(){
    push();
  translate(this.x, this.y);
  rotate(this.angle);
  for (let i = 0; i < this.length; i++){
    stroke(0);
    strokeWeight(this.size/2); line(cos(i/2+PI+frameCount/(this.size*2))*this.size*3, i*this.size*2+sin(frameCount/500)*this.size*30,  cos(i/2+frameCount/(this.size*2))*this.size*3 , i*this.size*2+sin(frameCount/500)*this.size*30);
    strokeWeight(this.size/10);
    fill(colours[this.code[i]]);
    ellipse(  cos(i/2+PI+frameCount/(this.size*2))*this.size*3, i*this.size*2+sin(frameCount/500)*this.size*30, this.size*2);
    fill(255);
    textSize(this.size*1.2);
    text(bases[this.code[i]],   cos(i/2+PI+frameCount/(this.size*2))*this.size*3, i*this.size*2+sin(frameCount/500)*this.size*30);
    stroke(0);
    fill(colours[3-this.code[i]]);
    ellipse( cos(i/2+frameCount/(this.size*2))*this.size*3 , i*this.size*2+sin(frameCount/500)*this.size*30, this.size*2);
    fill(255);
    text(bases[3-this.code[i]],  cos(i/2+frameCount/(this.size*2))*this.size*3, i*this.size*2+sin(frameCount/500)*this.size*30);}
  pop();}}

function windowResized(){
    let dim = min(windowWidth, windowHeight);
    resizeCanvas(dim, dim);
    helixes[20].x = width/2;
}