let started = false;

const limiter = new Tone.Limiter(-20).toDestination();

var delay = new Tone.Delay(0.005);

var add = new Tone.Add().connect(delay);

//Non-linearity
// var mult = new Tone.Multiply(1).connect(add);
// var invSqrt = new Tone.Pow(-0.5).connect(mult);
// var plus = new Tone.Add(1).connect(invSqrt);
// var pow2 = new Tone.Pow(2).connect(plus);
// var feedback = new Tone.Multiply(0).connect(pow2).connect(mult);

var feedback = new Tone.Multiply(-0.97).connect(add);

var loopFilter = new Tone.OnePoleFilter(900, "lowpass").connect(limiter).connect(feedback);

delay.connect(loopFilter);

var exFilter = new Tone.OnePoleFilter(1800, "lowpass").connect(add);

var exciter = new Tone.CrossFade(0.05).connect(exFilter);

var metro = new
Tone.NoiseSynth().connect(exciter.a);

var noize = new Tone.Noise('brown').connect(exciter.b).start();


//play a note every quarter-note
const click = new Tone.Loop((time) => {
	metro.triggerAttackRelease(10, time, 1);
}, "4n").start(0);

Tone.getTransport().bpm.value = 60000/500;
Tone.getTransport().start();

let exSlider;
let deSlider;
let feSlider;
let exfilter;
let lofilter;
let freqSlider;
let f = 0;

function sliderPlacement(slider, x, y){
  _renderer.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  const sliderX = x + _renderer.x;
  const sliderY = y + _curElement.y;

  slider.position(sliderX, sliderY);
}

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  
  exSlider = createSlider(0, 1, 0.05, 0.001);
  exSlider.child("p5Canvas");
  sliderPlacement(exSlider, 10, 10);
  exSlider.size(80);
  exSlider.changed(updateExciter);
  
  deSlider = createSlider(0.001, 0.01, 0.005, 0.0001);
  sliderPlacement(deSlider, 10, 40);
  deSlider.size(80);
  deSlider.changed(updateDelay);
  
  feSlider = createSlider(-1, 1, -0.97, 0.001);
  sliderPlacement(feSlider, 10, 70);
  feSlider.size(80);
  feSlider.changed(updateFeedback);
  
  exfilter = createSlider(100, 10000, 1800, 1);
  sliderPlacement(exfilter, 10, 100);
  exfilter.size(80);
  exfilter.changed(updateExFil);
  
  lofilter = createSlider(100, 10000, 900, 1);
  sliderPlacement(lofilter, 10, 130);
  lofilter.size(80);
  lofilter.changed(updateLoFil);
}

function windowResized() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim, dim);
  sliderPlacement(exSlider, 10, 10);
  sliderPlacement(deSlider, 10, 40);
  sliderPlacement(feSlider, 10, 70);
  sliderPlacement(exfilter, 10, 100);
  sliderPlacement(lofilter, 10, 130);
}

function updateFreq(){
  let c1 = 0.1786;
  let c2 = 1.011;
  let fc = loopFilter.get().frequency;
  f = freqSlider.value();
  
  let K = c2/(f+((c1*f*f)/fc));
  
  // print(delay.delayTime);
  
  delay.set({
    delayTime: K,
  })
}

function updateExciter(){
  exciter.fade.linearRampTo(exSlider.value(), 0.2);
}

function updateDelay(){
  delay.delayTime.linearRampTo(deSlider.value(), 0.2)
}

function updateFeedback(){
  feedback.factor.linearRampTo( feSlider.value(), 0.2);
}

function updateExFil(){
  exFilter.set({
    frequency: exfilter.value(),
  })
}

function updateLoFil(){
  loopFilter.set({
    frequency: lofilter.value(),
  })
  
//    let c1 = 0.1786;
//   let c2 = 1.011;
//   let fc = loopFilter.get().frequency;
//   let f = freqSlider.value();
  
//   let K = c2/(f+((c1*f*f)/fc));
  
//   delay.set({
//     delayTime: K,
//   })
}

function draw() {
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
  background(22, 24, 24);
  // background('')
  
   let jugSize = map(deSlider.value(), 0.001, 0.01, width*0.1, width*0.5);
  
  jug(width/2, height/2, jugSize);
  
  textFont("courier new");
  textAlign(LEFT,CENTER);
  textSize(width*0.03);
  fill('antiquewhite')
  text("exciter type: " + exSlider.value(), 100, 20);
  text("delay length (frequency): " + deSlider.value() + "s", 100, 50);
  text("feedback: " + feSlider.value(), 100, 80);
  text("exciter filter: " + exfilter.value() + "hz", 100, 110);
  text("loop filter: " + lofilter.value() + "hz", 100, 140);
  
 if (!started) {
   push();
   textAlign(CENTER, CENTER);
   textSize(width*0.05);
   text("Click to start juggin'", width/2, height*0.85);
   pop();
 }
  
}

function mousePressed() {
  Tone.start();
  started = true;
}

function jug(x, y, s){
  push();
  rectMode(CENTER);
  translate(x, y);
  
  noStroke();
  fill('peru');
  circle(-s*0.2, -s*0.45, s*0.4);
  fill(22,24,24);
  circle(-s*0.2, -s*0.45, s*0.3);
  fill('peru');
  square(0, -0.5*s, s*0.3, s*0.05);
  ellipse(0, 0, s);
  fill('antiquewhite');
  rect(0,0.4*s, s, s*1.2, s*0.06, s*0.06, s*0.3, s*0.3);
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(s*0.4);
  textFont('georgia');
  text("JUG", 0.01*s, s*0.25);
  
  pop();
}