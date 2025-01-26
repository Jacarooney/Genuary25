let anadromes = [
  "ABLE",
  "ABUT",
  "AGAR",
  "AJAR",
  "AMOS",
  "AUKS",
  "AVID",
  "AVON",
  "BARD",
  "BATS",
  "BLUB",
  "BONK",
  "BRAG",
  "BUNS",
  "BURG",
  "BUTS",
  "DART",
  "DEEP",
  "DEER",
  "DIAL",
  "DIES",
  "DINE",
  "DOOM",
  "DOOR",
  "DRAW",
  "DRAY",
  "DUAL",
  "EDAM",
  "EDIT",
  "EIRE",
  "EMIR",
  "EMIT",
  "ERGO",
  "ETON",
  "EVIL",
  "FLOG",
  "FLOW",
  "GALS",
  "GIRT",
  "GNAT",
  "GNUS",
  "GULP",
  "GUMS",
  "GUNS",
  "HOOP",
  "KEEL",
  "KEEP",
  "LAIR",
  "LEER",
  "LEON",
  "LIAM",
  "LIAR",
  "LOOP",
  "LOOT",
  "MAPS",
  "MART",
  "MAWS",
  "MEET",
  "MILS",
  "MOOR",
  "NAPS",
  "NIPS",
  "NUTS",
  "PALS",
  "PANS",
  "PART",
  "PAWS",
  "PEES",
  "PETS",
  "PINS",
  "PORT",
  "POTS",
  "PRAT",
  "PARS",
  "RATS",
  "SAPS",
  "SNIT",
  "SNOT",
  "SPAT",
  "SPAY",
  "SPIT",
  "SPOT",
  "STEW",
  "SWAT",
  "SWAY",
  "SWOT",
  "TORT",
  "ELBA",
  "TUBA",
  "RAGA",
  "RAJA",
  "SOMA",
  "SKUA",
  "DIVA",
  "NOVA",
  "DRAB",
  "STAB",
  "BULB",
  "KNOB",
  "GARB",
  "SNUB",
  "GRUB",
  "STUB",
  "TRAD",
  "PEED",
  "REED",
  "LAID",
  "SEID",
  "ENID",
  "MOOD",
  "ROOD",
  "WARD",
  "YARD",
  "LAUD",
  "MADE",
  "TIDE",
  "ERIE",
  "RIME",
  "TIME",
  "OGRE",
  "NOTE",
  "LIVE",
  "GOLF",
  "WOLF",
  "SLAG",
  "TRIG",
  "TANG",
  "SUNG",
  "PLUG",
  "SMUG",
  "SNUG",
  "POOH",
  "LEEK",
  "PEEK",
  "RIAL",
  "REEL",
  "NOEL",
  "MAIL",
  "RAIL",
  "POOL",
  "TOOL",
  "SPAM",
  "TRAM",
  "SWAM",
  "TEEM",
  "SLIM",
  "ROOM",
  "SPAN",
  "SPIN",
  "STUN",
  "SLAP",
  "SNAP",
  "TRAP",
  "SWAP",
  "SEEP",
  "STEP",
  "SNIP",
  "TROP",
  "STOP",
  "TARP",
  "SPAR",
  "STAR",
  "SPAS",
  "TINS",
  "TONS",
  "TAPS",
  "YAPS",
  "TIPS",
  "TOPS",
  "WETS",
  "TAWS",
  "YAWS",
  "TOWS",
  "TROT",
  "ACCA",
  "ADDA",
  "AFFA",
  "ALLA",
  "ANNA",
  "BEEB",
  "BOOB",
  "DEED",
  "ECCE",
  "ESSE",
  "GOOG",
  "IMMI",
  "KEEK",
  "KOOK",
  "MAAM",
  "NAAN",
  "NOON",
  "OPPO",
  "OTTO",
  "PEEP",
  "POOP",
  "SEES",
  "TOOT"
];

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let letters = [];

let current = [];

let counters = [];
let randos = [];

let timer = 60;

let done = false;

let trying = false;

let options1 = [];

let colours = [
  [22, 24, 24],
  'antiquewhite',
  60,
  0
];

function setup(){
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim*0.9, dim*0.9); 
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textFont('courier new');
  stroke(colours[0]);
  
  alphabet = alphabet.split("");
  
  for (let i = 0; i < 4; i++){
    letters[i] = [];
    counters[i] = [];
    randos[i] = [];
    for (let j = 0; j < 4; j++){
      letters[i][j] = '?';
      counters[i][j] = floor(random(10, 40));
      randos[i][j] = random(alphabet);
    }
  }
  
  // frameRate(8);
  
}

function draw(){
  background(colours[0]);
  
  margin = width*0.2;
  
  if (frameCount%100 == 0 && !done){
    tryWord();
  }
  
  for (let i = 0; i < 4; i++){
    let x = map(i, 0, 3, margin, width-margin);
    for (let j = 0; j < 4; j++){
      let y = map(j, 0, 3, margin, height-margin);
      
      
      
      if (letters[i][j] != "?"){
        if (counters[i][j] > 0){
        counters[i][j]--;
        textSize(width*0.1);
        fill(colours[1]);
        square(x, y, (width-2*margin)*0.325);
        fill(colours[2]);
        text(randos[i][j], x, y);
      } else {
        // randos[i][j] = random(alphabet);
        // counters[i][j] = random(10, 40);
        textSize(width*0.13);
        fill(colours[1]);
        square(x, y, (width-2*margin)*0.325);
        fill(colours[3]);
        text(letters[i][j], x, y);
      }
        
      } else {
        if (counters[i][j] > 0){
        counters[i][j]--;
      } else {
        randos[i][j] = random(alphabet);
        counters[i][j] = random(10, 40);
      }
        textSize(width*0.1);
        fill(colours[1]);
        square(x, y, (width-2*margin)*0.325);
        fill(colours[2]);
        text(randos[i][j], x, y);
      }
      
    }
  }
  
}

function tryWord() {
  let word;
  let ind = [];
  let start = 0;
  let stop = 4;
  let dir; //1 is right, 0 is down
  let fail = false;
  
  if (letters[0][0] == '?'){
    word = random(anadromes);
    ind = [0,0];
    dir = 1;
    stop = 4;
  } else if (letters[0][1] == "?"){
    if (!trying){
      for (let i = 0; i < anadromes.length; i++){
        let test = anadromes[i].split("");
        if (test[0] == current[0] && test[3] == current[3]){
          options1.push(anadromes[i]);
        }
      }
    }
    let len = options1.length;
    trying = true;
    
    let r = floor(random(len));
    
    word = options1[r];
    
    if (len < 1){
      word = "????";
      letters[0][0] = "?";
      letters[1][0] = "?";
      letters[2][0] = "?";
      letters[3][0] = "?";
      letters[0][3] = "?";
      letters[1][3] = "?";
      letters[2][3] = "?";
      letters[3][3] = "?";
      trying = false;
    }
    
    options1.splice(r,1);
    ind = [0,0];
    start = 1;
    stop = 3;
    dir = 0;
  } else {
    let options = [];
    for (let i = 0; i < anadromes.length; i++){
      let test = anadromes[i].split("");
      if (test[0] == current[1] && test[3] == current[2]){
        options.push(anadromes[i]);
      }
    }
    word = random(options);
    
    let check = 0;
    if (options.length > 0){
        let arr = word.split("");
        let str = letters[1][0]+arr[1]+arr[2]+ letters[2][0];
        if (anadromes.indexOf(str) != -1){
          check++;
        }
    }
    
    if (options.length == 0 || check < 1){
      word = "????";
      letters[0][1] = "?";
      letters[0][2] = "?";
      letters[3][1] = "?";
      letters[3][2] = "?";
      current = [letters[0][0],letters[1][0],letters[2][0],letters[3][0]];
      fail = true;
    } else {
      done = true;
    }
    ind = [0,1];
    start = 1;
    stop = 3;
    dir = 1;
  }
  
  let chars = word.split("");
    
  for (let i = start; i < stop; i++){
    if (dir == 1){
      letters[ind[0]+i][ind[1]] = chars[i];
      letters[3-ind[0]-i][3-ind[1]] = chars[i];
      counters[ind[0]+i][ind[1]] = floor(random(10,40));
      counters[3-ind[0]-i][3-ind[1]] = floor(random(10,40));
    } else {
      letters[ind[0]][ind[1]+i] = chars[i];
      letters[3-ind[0]][3-ind[1]-i] = chars[i];
      counters[ind[0]][ind[1]+i] = floor(random(10,40));
      counters[3-ind[0]][3-ind[1]-i] = floor(random(10,40));
    }
  }
  
  if (!fail){
    current = chars;
  }
  
}

function mousePressed(){
  done = false;
  trying = false;
  fail = false;
  options1 = [];
  for (let i = 0; i < 4; i++){
    letters[i] = [];
    counters[i] = [];
    randos[i] = [];
    for (let j = 0; j < 4; j++){
      letters[i][j] = '?';
      counters[i][j] = floor(random(10, 40));
      randos[i][j] = random(alphabet);
    }
  }
}

function windowResized(){
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim*0.9, dim*0.9);
}