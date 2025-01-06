let font, wordbank;

function preload() {
  font = loadFont("Avenir.ttf");
  wordbank = loadStrings("Common5LetterWords.txt");
}

let str, tSize, tWidth, bbox, points;

let midiOut;

let playhead = 0;
let noteRange = 14;

function setup() {
  createCanvas(600, 600);
  
  textFont(font);
  textAlign(CENTER, BASELINE); 
  textLeading(0);
  tSize = width*0.32;
  textSize(tSize);
  
  str = "p5*js";
  
  tWidth = textWidth(str);
  
  bbox = font.textBounds(str, width/2, height/2 + width*0.06);
  
  points = font.textToPoints(str, width/2, height/2 + width*0.06, tSize, { sampleFactor:  0.1 });

}

function mousePressed(){
  newWord();
}

function newWord(){
  playhead = 0;
  
  str = random(wordbank);
  
  tWidth = textWidth(str);
  
  bbox = font.textBounds(str, width/2, height/2 + width*0.06);
  
  points = font.textToPoints(str, width/2, height/2 + width*0.06, tSize, { sampleFactor:  0.1 });

}

function draw() {
  background('antiquewhite');
  
  noStroke();
  fill(237,34,92);
  text(str, width/2, height/2 + width*0.06);
  
  stroke(0);
  playhead+=width*0.0008;
  for (let p of points) {
    if (dist(playhead, 0, p.x, 0) < 0.25){
      let note = cPent[floor(map(p.y, bbox.y, bbox.y + bbox.h, cPent.length-1, 0))];
      midiOut.playNote(note, {duration: 400});
    }
    if (dist(playhead, 0, p.x, 0) < 2){
      stroke('gold');
      strokeWeight(0.022*width);
    }
    else {
      stroke('midnightblue');
      strokeWeight(2);
    }
    point(p.x, p.y);
  }
  
  
  strokeWeight(2); 
  stroke('dodgerblue');
  line(playhead, height*0.3, playhead, height*0.7);
  
  stroke('gold');
  strokeWeight(3);
  line(1, height*0.3, 1, height*0.7);
  line(width-1, height*0.3, width-1, height*0.7);
  
  if (playhead > width){
    newWord();
  }
  
}

WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  // Function triggered when WEBMIDI.js is ready
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.outputs.length < 1) {
      document.body.innerHTML+= "No device detected.";
    } else {
       midiOut = new OutputChannel(WebMidi.outputs[0], 1);
    }
    
   

  }

let cMajor = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84];

let cPent = [48, 50, 52, 55, 57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96];

