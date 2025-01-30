let res = 30;
let minDist = res / 2;

let grid = [];
let dX, dY, dir;

let city = [];
let cityDist = res / 8;

let cellSize = 0;

let numLines = 8;

let lines = [];

let lineColours = [];

let stations = [];

let dirs = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

let stationNames = [];
let networkName;
let termini = [];
let lineNames = [];

let colours = [
  "orangered",
  "darkorange",
  "gold",
  "limegreen",
  "dodgerblue",
  "darkviolet",
  "violet",
  "darkslategray",
];

function setup() {
  let dim = min(windowWidth, windowHeight);
  createCanvas(dim * 0.9, dim * 0.9);

  // randomSeed(10);
  // noiseSeed(9);

  cellSize = floor(width / res);
  resizeCanvas(res * cellSize, res * cellSize);

  pixelDensity(2);
  genMap();
  genLines();
  genNames();
}

function updateDir() {
  let a = random([-1, 0, 1]);
  let b = random([-1, 0, 1]);
  dX += a;
  dY += b;
  dX = constrain(dX, -1, 1);
  dY = constrain(dY, -1, 1);
  while (dX == 0 && dY == 0) {
    dX -= a;
    dY -= b;
    a = random([-1, 0, 1]);
    b = random([-1, 0, 1]);
    dX += a;
    dY += b;
    dX = constrain(dX, -1, 1);
    dY = constrain(dY, -1, 1);
  }
}

function turn(){
  dir = (dir + random([1, 2, 6, 7]))%8;
  dX = dirs[dir][0];
  dY = dirs[dir][1];
}

function genLinesX() {
  numLines = 1;

  for (let i = 0; i < numLines; i++) {
    //Choose colour
    let r = floor(random(colours.length));
    while (lineColours.indexOf(r) != -1) {
      r = floor(random(colours.length));
    }
    lineColours[i] = r;

    //Create lines array for vertices
    lines[i] = [];
    let vert = lines[i];

    //Choose starting position
    let x = floor(random(2, res - 2));
    let y = floor(random(2, res - 2));

    //Can't start in water
    while (grid[x][y] == "lightblue") {
      x = floor(random(2, res - 2));
      y = floor(random(2, res - 2));
    }

    vert.push([x, y]);

    //Choose line length
    let len = floor(random(res / 2, (3 * res) / 4));

    len = 31;

    //Choose starting direction
    dir = floor(random(8));
    dX = dirs[dir][0];
    dY = dirs[dir][1];
    
    //line of sight
    let waterDist = Infinity;
    let landAhead = false;
    let turned = false;

    for (let v = 0; v < len; v++) {
      //reset flags
      waterDist = Infinity;
      landAhead = false;
      turned = false;
      
      //Turn on border
      if (x >= res-2){
        dir = random([0, 4, 7, 5]);
        turned = true;
      }
      if (x <= 2){
        dir = random([0, 4, 3, 1]);
        turned = true;
      }
      if (y >= res-2){
        dir = random([1, 7, 2, 6]);
        turned = true;
      }
      if (y <= 2){
        dir = random([2, 3, 5, 6]);
        turned = true;
      }
        dX = dirs[dir][0];
        dY = dirs[dir][0];
      
      //Look ahead
      let a = x;
      let b = y;
      let sight = 0;
      for (let n = 0; n < res * 2; n++) {
        a += dX;
        if (a + dX < 2 || a + dX > res - 2) {
          sight = n;
          break;
        }

        b += dY;
        if (b + dY < 2 || b + dY > res - 2) {
          sight = n;
          break;
        }
      }
      
      for (let s = sight; s > 0; s--){
        let sightLine = grid[x+dX*s][y+dY*s][0];
        
        //Check water distance
        if (sightLine == "lightblue"){
           waterDist = s;
        }
        
        //Check if land ahead
        if (sightLine == "palegreen" || sightLine == "antiquewhite"){
           landAhead = true;
        }
        
      }
      
      //Turn if close to border and not one water
      if (random(sight) < 1 && grid[x][y][0] != 'lightblue' && !turned){
        // let prevDir = dir;
        // turn();
        // while (x+dX > res-2 || x+dX < 2 || y+dY > res-2 || y+dY < 2){
        //   dir = prevDir;
        //   turn();
        // }
        // turned = true;
      }
      
      if (!landAhead && waterDist < 2 && !turned){
        let prevDir = dir;
        turn();
        while (grid[x+dX][y+dY][0] == 'lightblue'){
          dir = prevDir;
          turn();
        }
        print(v);
      }
      
      x += dX;
      y += dY;
      vert.push([x,y]);
      
    }
  }
}

function genLines1() {
  numLines = 5;

  for (let i = 0; i < numLines; i++) {
    //Choose colour
    let r = floor(random(colours.length));
    while (lineColours.indexOf(r) != -1) {
      r = floor(random(colours.length));
    }
    lineColours[i] = r;

    //Create lines array for vertices
    lines[i] = [];
    let vert = lines[i];

    //Choose starting position
    let x = floor(random(2, res - 2));
    let y = floor(random(2, res - 2));

    //Can't start in water
    while (grid[x][y] == "lightblue") {
      x = floor(random(2, res - 2));
      y = floor(random(2, res - 2));
    }

    vert.push([x, y]);

    //Choose line length
    let len = floor(random(res / 2, (3 * res) / 4));

    //Choose direction to travel
    //Head toward centre if on outer thirds
    if (x < res / 3) {
      dX = 1;
    } else if (x > (2 * res) / 3) {
      dX = -1;
    } else {
      dX = random([-1, 0, 1]);
    }
    if (y < res / 3) {
      dY = 1;
    } else if (y > (2 * res) / 3) {
      dY = -1;
    } else {
      dY = random([-1, 0, 1]);
    }

    len = 6;

    let waterLen = 0;
    let backTrack = false;
    let coolDown = 0;

    //Loop through length, find valid verts
    for (let v = 0; v < len; v++) {
      //Sometimes update direction, when not in water, more likely near edges
      let denom = dist(res, res, res / 2, res / 2);
      coolDown += 0.3;
      if (
        random() < (coolDown * dist(x, y, res / 2, res / 2)) / denom &&
        waterLen == 0
      ) {
        updateDir();
        coolDown = 0;
      }

      //Check if next vert valid
      let newX = x + dX;
      let newY = y + dY;

      //If 2 from edge, change direction
      while (newX <= 2 || newX >= res - 2 || newY <= 2 || newY >= res - 2) {
        updateDir();
        newX = x + dX;
        newY = y + dY;
      }

      //If intersect other track, either crossing, or follow along other track until parting
      for (let t = 0; t < lines.length; t++) {
        if (t != i) {
          for (let p = 0; p < lines[t].length; p++) {
            if (lines[t][p][0] == newX && lines[t][p][1] == newY) {
              print("collision");
            }
          }
        }
      }

      //If intersect self, loop formed, terminate
      for (let p = 0; p < vert.length; p++) {
        if (vert[p][0] == newX && vert[p][1] == newY) {
          print("self-collide");
          len = v;
        }
      }

      //If water, straight line until land
      //If no land, backtrack and change direction
      if (grid[newX][newY][0] == "lightblue") {
        waterLen++;
        //if no land
        if (
          waterLen > 0 &&
          (newX <= 2 ||
            newX >= res - 2 ||
            newY <= 2 ||
            newY >= res - 2 ||
            v == len - 1 ||
            v == len)
        ) {
          backTrack = true;

          // print(vert[v-2]);
          dX = newX - vert[v - 2][0];
          dY = newY - vert[v - 2][1];
          // dX = 0;
          // dY = 0;
          for (let n = 0; n < waterLen - 1; n++) {
            vert.pop();
          }
          v = vert.length;
          x = vert[v - 1][0];
          y = vert[v - 1][1];
          updateDir();
          waterLen = 0;
        }
      } else {
        waterLen = 0;
      }

      //Otherwise draw vert
      if (!backTrack) {
        x += dX;
        y += dY;
        vert.push([x, y]);
        grid[x][y].push(i);
      } else {
        backTrack = false;
      }
    }
  }
}

function genLines() {
  numLines = floor(random(5, 9));

  for (let i = 0; i < numLines; i++) {
    let r = floor(random(colours.length));
    while (lineColours.indexOf(r) != -1) {
      r = floor(random(colours.length));
    }
    lineColours[i] = r;

    lines[i] = [];

    let startX = floor(random(2, res - 2));
    let startY = floor(random(2, res - 2));

    while (grid[startX][startY] == "lightblue") {
      startX = floor(random(2, res - 2));
      startY = floor(random(2, res - 2));
    }

    let endX = floor(random(2, res - 2));
    let endY = floor(random(2, res - 2));
    while (
      grid[endX][endY] == "lightblue" ||
      dist(endX, endY, startX, startY) < minDist
    ) {
      endX = floor(random(2, res - 2));
      endY = floor(random(2, res - 2));
    }

    lines[i].push([startX, startY]);

    if (grid[startX][startY][1] != undefined) {
      termini.push(stations.length);
      stations.push([startX, startY, 1, i]);
    } else {
      termini.push(stations.length);
      stations.push([startX, startY, 0, i]);
    }
    grid[startX][startY].push(i);

    let xDif = endX - startX;
    let yDif = endY - startY;

    let xs = [];
    for (let n = 0; n < abs(xDif); n++) {
      xs.push(Math.sign(xDif));
    }

    let ys = [];
    for (let n = 0; n < abs(yDif); n++) {
      ys.push(Math.sign(yDif));
    }

    let dif = abs(xDif) - abs(yDif);
    if (abs(xDif) > abs(yDif)) {
      for (let n = 0; n < dif; n++) {
        ys.splice(floor(random(ys.length)), 0, 0);
      }
    } else {
      for (let n = 0; n < -dif; n++) {
        xs.splice(floor(random(xs.length)), 0, 0);
      }
    }

    let x = startX;
    let y = startY;

    let len = 3;
    let overlap = 0;

    for (let n = 0; n < xs.length - 1; n++) {
      x += xs[n];
      y += ys[n];

      if (grid[x][y][1] != undefined) {
        // if (overlap == 0){
        overlap++;
        lines[i].push([x, y]);
        if (grid[x][y] != "lightblue") {
          stations.push([x, y, 1, i]);
        }
        len = 3;
        // }
        // else {
        //   stations.pop();
        //   let prev = lines[i].pop();
        //   // lines[i].push([prev[0]+1, prev[1]+1]);
        //   // lines[i].push([x+1, y+1]);
        //   // stations.push([x, y, 2, i]);
        //   len = 3;
        // }
      } else {
        if (overlap > 1) {
          let last = stations[stations.length - 1];
          let prev = stations[stations.length - 2];
          let xDif = last[0] - prev[0];
          let yDif = last[1] - prev[1];
          let xStart = last[0] - overlap * xDif;
          let yStart = last[1] - overlap * yDif;
          // let first = lines[i][stations.length-(overlap+2)];
          // let xOff = xStart-first[0];
          // let yOff = yStart-first[1];
          let xOff = 0,
            yOff = 0;
          for (let q = 0; q < overlap; q++) {
            if(stations.length > 0){
              stations.pop();
              lines[i].pop();
            }  
          }
          for (let q = 0; q < overlap; q++) {
            // lines[i].push([xStart-xDif/2, yStart+yDif/2]);
            // stations.push([xStart-xDif/2, yStart+yDif/2, 1, i]);
            xStart += xDif;
            yStart += yDif;
          }
        }

        overlap = 0;

        lines[i].push([x, y]);
        if (grid[x][y] != "lightblue") {
          if (random() < 0.8 && len > 0) {
            len--;
          } else if (len == 0) {
            len = 3;
            stations.push([x, y, 0, i]);
          }
        }
      }
      grid[x][y].push(i);
    }

    lines[i].push([endX, endY]);
    if (grid[endX][endY][1] != undefined) {
      termini.push(stations.length);
      stations.push([endX, endY, 1, i]);
    } else {
      termini.push(stations.length);
      stations.push([endX, endY, 0, i]);
    }
    grid[endX][endY].push(i);
  }
}

function genNames() {
  //duplicate name arrays
  let a = [...name];
  let b = [...suffix];
  let c = [...place];

  //Station names
  for (let i = 0; i < stations.length; i++) {
    let st = a.splice(floor(random(a.length)), 1);

    let mid = "";
    if (random() < 0.8) {
      mid = b.splice(floor(random(b.length)), 1);
    }

    let nd = "";
    if (mid == "") {
      if (random() < 0.8) {
        nd = " " + c.splice(floor(random(c.length)), 1);
      }
    } else {
      if (random() < 0.4) {
        nd = " " + c.splice(floor(random(c.length)), 1);
      }
    }
    stationNames.push(st + mid + nd);
  }

  //Line names
  for (let i = 0; i < numLines; i++) {
    if (random() < 0.5) {
      lineNames.push(
        random([stationNames[termini[i * 2]], stationNames[termini[i * 2 - 1]]])
      );
    } else {
      let st = a.splice(floor(random(a.length)), 1);

      let mid = "";
      if (random() < 0.8) {
        mid = b.splice(floor(random(b.length)), 1);
      }

      let nd = "";
      if (mid == "") {
        if (random() < 0.8) {
          nd = " " + c.splice(floor(random(c.length)), 1);
        }
      } else {
        if (random() < 0.4) {
          nd = " " + c.splice(floor(random(c.length)), 1);
        }
      }
      lineNames.push(st + mid + nd);
    }
  }

  networkName =
    a.splice(floor(random(a.length)), 1) + b.splice(floor(random(b.length)), 1);
}

function genMap() {
  noiseSeed(random(10000));
  let blueCount = 0;
  grid = [];
  for (let i = 0; i < res; i++) {
    grid[i] = [];
    for (let j = 0; j < res; j++) {
      let fid = 23;
      let n = noise(i / fid, j / fid);
      let c = "antiquewhite"; //default ground
      if (blueCount < res * res * 0.7) {
        if (n < 0.36) {
          c = "lightblue";
          blueCount++;
        } else if (n < 0.43) {
          c = "palegreen";
        }
      }
      grid[i][j] = [c];
    }
  }
  let x = floor(random(res));
  let y = floor(random(res));
  while (grid[x][y] == "lightblue") {
    x = floor(random(res));
    y = floor(random(res));
  }
  city = [x, y];
}

function draw() {
  background("antiquewhite");

  //DISPLAY MAP
  strokeWeight(width * 0.001);
  noStroke();
  // stroke(0);
  for (let i = 0; i < res; i++) {
    for (let j = 0; j < res; j++) {
      fill(grid[i][j][0]);
      square(i * cellSize, j * cellSize, cellSize);
    }
  }

  //DISPLAY LINES
  strokeWeight(width * 0.018);
  noFill();
  for (let i = 0; i < lines.length; i++) {
    stroke(colours[lineColours[i]]);
    beginShape();
    for (let v of lines[i]) {
      vertex(v[0] * cellSize + cellSize / 2, v[1] * cellSize + cellSize / 2);
    }
    endShape();
  }

  //DISPLAY STATIONS
  fill(255);
  stroke(22, 24, 24);
  strokeWeight(width * 0.004);
  for (let i = 0; i < stations.length; i++) {
    if (stations[i][2] == 1) {
      ellipse(
        stations[i][0] * cellSize + cellSize / 2,
        stations[i][1] * cellSize + cellSize / 2,
        cellSize * 0.9
      );
      ellipse(
        stations[i][0] * cellSize + cellSize / 2,
        stations[i][1] * cellSize + cellSize / 2,
        cellSize * 0.4
      );
    } else if (stations[i][2] == 0) {
      ellipse(
        stations[i][0] * cellSize + cellSize / 2,
        stations[i][1] * cellSize + cellSize / 2,
        cellSize * 0.6
      );
    } else {
      rect(
        stations[i][0] * cellSize,
        stations[i][1] * cellSize,
        cellSize * 1.5,
        cellSize * 0.6,
        cellSize
      );
    }
  }

  //CITY CENTRE?
  push();
  noFill();
  stroke(255);
  // ellipse(city[0]*cellSize, city[1]*cellSize, cityDist*cellSize);
  pop();

  //DISPLAY NETWORK NAME
  noStroke();
  textAlign(CENTER, TOP);
  textSize(width * 0.035);
  let tw = textWidth(networkName + " Rail Network");
  fill(22, 24, 24);
  rect(
    width * 0.5 - tw * 0.55,
    height * 0.011,
    tw * 1.1,
    height * 0.05,
    width * 0.05
  );
  rect(width * 0.5 - tw * 0.55, 0, tw * 1.1, height * 0.035);
  fill(240);
  text(networkName + " Rail Network", width * 0.5, height * 0.02);

  //Display station and line name
  let linName;
  let linCol;

  textAlign(LEFT, TOP);
  textSize(width * 0.035);
  let numHov = 0;
  for (let i = 0; i < stations.length; i++) {
    let st = stations[i];
    if (
      mouseX > st[0] * cellSize &&
      mouseX < (st[0] + 1) * cellSize &&
      mouseY > st[1] * cellSize &&
      mouseY < (st[1] + 1) * cellSize
    ) {
      //Highlight
      if (stations[i][2] == 0) {
        fill(colours[lineColours[stations[i][3]]]);
      } else {
        fill(0);
      }
      stroke(0);
      strokeWeight(width * 0.004);
      ellipse(
        stations[i][0] * cellSize + cellSize / 2,
        stations[i][1] * cellSize + cellSize / 2,
        cellSize * 0.9
      );

      //STATION NAME
      noStroke();
      tw = textWidth(stationNames[i]);
      fill(22, 24, 24);
      let tOffset = 0;
      if (mouseX > width / 2) {
        tOffset = -tw * 1.15;
      }
      rect(
        (st[0] + 1) * cellSize - tw * 0.03 + tOffset,
        st[1] * cellSize - cellSize * 0.2,
        tw * 1.06,
        cellSize * 1.4,
        cellSize * 0.2
      );
      fill(240);
      text(stationNames[i], (st[0] + 1) * cellSize + tOffset, st[1] * cellSize);

      numHov++;

      //LINE NAME
      if (stations[i][2] == 1) {
        linName = "Interchange";
        linCol = [22, 24, 24];
      } else {
        linName = lineNames[stations[i][3]] + " Line";
        linCol = colours[lineColours[stations[i][3]]];
      }
    }
  }

  if (numHov > 0) {
    noCursor();
    textAlign(CENTER, BOTTOM);
    textSize(width * 0.035);
    tw = textWidth(linName);
    fill(linCol);
    rect(
      width * 0.5 - tw * 0.55,
      height * 0.989 - height * 0.05,
      tw * 1.1,
      height * 0.05,
      width * 0.05
    );
    rect(
      width * 0.5 - tw * 0.55,
      height - height * 0.035,
      tw * 1.1,
      height * 0.035
    );
    fill(240);
    text(linName, width * 0.5, height * 0.99);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  city = [];

  lines = [];

  lineColours = [];

  stations = [];

  stationNames = [];
  termini = [];
  lineNames = [];

  colours = [
    "orangered",
    "darkorange",
    "gold",
    "limegreen",
    "dodgerblue",
    "darkviolet",
    "violet",
    "darkslategray",
  ];
  setup();
}

function windowResized() {
  let dim = min(windowWidth, windowHeight);
  resizeCanvas(dim * 0.9, dim * 0.9);
  cellSize = floor(width / res);
  resizeCanvas(res * cellSize, res * cellSize);
}

let name = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
  "Pink",
  "Purple",
  "Brown",
  "Black",
  "White",
  "Gray",
  "Silver",
  "Gold",
  "Teal",
  "Cyan",
  "Magenta",
  "Lime",
  "Olive",
  "Maroon",
  "Navy",
  "Beige",
  "Coral",
  "Peach",
  "Lavender",
  "Mint",
  "Mustard",
  "Burgundy",
  "Turquoise",
  "Crimson",
  "Scarlet",
  "Amber",
  "Emerald",
  "Sapphire",
  "Ruby",
  "Topaz",
  "Amethyst",
  "Jade",
  "Pearl",
  "Platinum",
  "Bronze",
  "Copper",
  "Tin",
  "Steel",
  "Chrome",
  "Brass",
  "Slate",
  "Charcoal",
  "Ivory",
  "Cream",
  "Khaki",
  "Tan",
  "Mauve",
  "Lilac",
  "Rose",
  "Sky",
  "Ocean",
  "Forest",
  "Desert",
  "Sunset",
  "Sunrise",
  "Midnight",
  "Dusk",
  "Dawn",
  "John",
  "Jane",
  "Paul",
  "Mary",
  "Mark",
  "Lisa",
  "Mike",
  "Sara",
  "Dave",
  "Beth",
  "Tom",
  "Ann",
  "Sam",
  "Sue",
  "Ben",
  "Amy",
  "Tim",
  "Eve",
  "Dan",
  "Joy",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Charles",
  "Joseph",
  "Thomas",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Andrew",
  "Joshua",
  "Kevin",
  "Brian",
  "Ashley",
  "Jessica",
  "Amanda",
  "Melissa",
  "Sarah",
  "Jennifer",
  "Elizabeth",
  "Lauren",
  "Emily",
  "Stephanie",
  "Rebecca",
  "Megan",
  "Angela",
  "Nicole",
  "Kimberly",
  "Michelle",
  "James",
  "Ryan",
  "Tyler",
  "Eric",
  "Justin",
  "Jason",
  "Brandon",
  "Dustin",
  "Kyle",
  "Zachary",
  "Adam",
  "Cody",
  "Aaron",
  "Patrick",
  "Sean",
  "Corey",
  "Travis",
  "Jordan",
  "Brittany",
  "Kayla",
  "Chelsea",
  "Taylor",
  "Heather",
  "Amber",
  "Crystal",
  "Tiffany",
  "Erica",
  "Lindsay",
  "Vanessa",
  "Kelly",
  "Shannon",
  "Laura",
  "Christina",
  "Rachel",
  "Scott",
  "Kevin",
  "Brian",
  "Eric",
  "Justin",
  "Jason",
  "Brandon",
  "Dustin",
  "Kyle",
  "Zachary",
  "Adam",
  "Cody",
  "Aaron",
  "Patrick",
  "Sean",
  "Corey",
  "Travis",
  "Jordan",
  "Ashley",
  "Jessica",
  "Amanda",
  "Melissa",
  "Sarah",
  "Jennifer",
  "Elizabeth",
  "Lauren",
  "Emily",
  "Stephanie",
  "Rebecca",
  "Megan",
  "Angela",
  "Nicole",
  "Kimberly",
  "Michelle",
  "James",
  "Ryan",
  "Tyler",
  "Eric",
  "Justin",
  "Jason",
  "Brandon",
  "Dustin",
  "Kyle",
  "Zachary",
  "Adam",
  "Cody",
  "Aaron",
  "Patrick",
  "Sean",
  "Corey",
  "Travis",
  "Jordan",
  "Brittany",
  "Kayla",
  "Chelsea",
  "Taylor",
  "Heather",
  "Amber",
  "Crystal",
  "Tiffany",
  "Erica",
  "Lindsay",
  "Vanessa",
  "Kelly",
  "Shannon",
  "Laura",
  "Christina",
  "Rachel",
  "George",
  "Henry",
  "Edward",
  "William",
  "Thomas",
  "Charles",
  "James",
  "John",
  "Robert",
  "David",
  "Richard",
  "Joseph",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Andrew",
  "Joshua",
  "Kevin",
  "Brian",
  "Michael",
  "Ryan",
  "Tyler",
  "Eric",
  "Justin",
  "Jason",
  "Brandon",
  "Dustin",
  "Kyle",
  "Zachary",
  "Adam",
  "Cody",
  "Aaron",
  "Patrick",
  "Sean",
  "Corey",
  "Travis",
  "Jordan",
  "Elizabeth",
  "Victoria",
  "Alexandra",
  "Catherine",
  "Charlotte",
  "Margaret",
  "Mary",
  "Patricia",
  "Linda",
  "Barbara",
  "Elizabeth",
  "Jennifer",
  "Maria",
  "Susan",
  "Margaret",
  "Dorothy",
  "Virginia",
  "Frances",
  "Ruth",
  "Evelyn",
  "Alice",
  "Helen",
  "Mildred",
  "Lillian",
  "Gladys",
  "Ethel",
  "Carol",
  "Shirley",
  "Betty",
  "Sandra",
  "Nancy",
  "Donna",
  "Brenda",
  "Karen",
  "Deborah",
  "Cynthia",
  "Angela",
  "Melissa",
  "Laura",
  "Amanda",
  "Ashley",
  "Jessica",
  "Sarah",
  "Stephanie",
  "Rebecca",
  "Megan",
  "Nicole",
  "Kimberly",
  "Michelle",
  "Lauren",
  "Emily",
  "Brittany",
  "Kayla",
  "Chelsea",
  "Taylor",
  "Heather",
  "Amber",
  "Crystal",
  "Tiffany",
  "Erica",
  "Lindsay",
  "Vanessa",
  "Kelly",
  "Shannon",
  "Christina",
  "Rachel",
  "Ant",
  "Ape",
  "Bat",
  "Bear",
  "Bee",
  "Bird",
  "Boar",
  "Bug",
  "Cat",
  "Cod",
  "Cow",
  "Crab",
  "Crow",
  "Deer",
  "Dog",
  "Donkey",
  "Dove",
  "Duck",
  "Eagle",
  "Eel",
  "Elk",
  "Emu",
  "Fox",
  "Frog",
  "Fly",
  "Goat",
  "Goose",
  "Hare",
  "Hawk",
  "Hen",
  "Hog",
  "Horse",
  "Hound",
  "Ibex",
  "Jay",
  "Kite",
  "Kiwi",
  "Koala",
  "Lark",
  "Lion",
  "Llama",
  "Lobster",
  "Louse",
  "Lynx",
  "Mite",
  "Mole",
  "Moth",
  "Mouse",
  "Mule",
  "Newt",
  "Ox",
  "Owl",
  "Panda",
  "Pig",
  "Pike",
  "Pony",
  "Quail",
  "Rabbit",
  "Rat",
  "Raven",
  "Reindeer",
  "Rhino",
  "Roach",
  "Seal",
  "Shark",
  "Sheep",
  "Shrimp",
  "Slug",
  "Snail",
  "Snake",
  "Sole",
  "Squid",
  "Stingray",
  "Swan",
  "Tick",
  "Tiger",
  "Toad",
  "Trout",
  "Turkey",
  "Turtle",
  "Vole",
  "Wasp",
  "Whale",
  "Wolf",
  "Worm",
  "Yak",
  "Zebra",
  "Arch",
  "Arm",
  "Bed",
  "Beam",
  "Bench",
  "Box",
  "Carpet",
  "Chair",
  "Chimney",
  "Couch",
  "Deck",
  "Desk",
  "Door",
  "Drawer",
  "Floor",
  "Frame",
  "Gate",
  "Hall",
  "Hearth",
  "Hinge",
  "Island",
  "Lamp",
  "Mirror",
  "Molding",
  "Pillar",
  "Porch",
  "Roof",
  "Room",
  "Rug",
  "Screen",
  "Shingle",
  "Sink",
  "Sofa",
  "Stair",
  "Stool",
  "Table",
  "Tile",
  "Trim",
  "Vault",
  "Wall",
  "Window",
  "Wing",
  "Aft",
  "Ail",
  "Akin",
  "Alee",
  "Anew",
  "Ape",
  "Apt",
  "Arc",
  "Aught",
  "Aura",
  "Axe",
  "Aye",
  "Bale",
  "Balk",
  "Bard",
  "Bask",
  "Bate",
  "Bay",
  "Bide",
  "Bilk",
  "Bin",
  "Bite",
  "Blip",
  "Blot",
  "Bode",
  "Bog",
  "Bole",
  "Bolt",
  "Boon",
  "Bore",
  "Bough",
  "Brine",
  "Brisk",
  "Brood",
  "Bruin",
  "Bulk",
  "Bunt",
  "Burr",
  "Busk",
  "Cairn",
  "Cask",
  "Cave",
  "Chaff",
  "Chalk",
  "Chant",
  "Chasm",
  "Chat",
  "Chide",
  "Chin",
  "Chip",
  "Chirp",
  "Clam",
  "Clasp",
  "Clod",
  "Clout",
  "Cloy",
  "Coil",
  "Cope",
  "Cord",
  "Core",
  "Corm",
  "Coy",
  "Crag",
  "Cram",
  "Crane",
  "Creep",
  "Crimp",
  "Croak",
  "Croup",
  "Crumb",
  "Crust",
  "Cull",
  "Curb",
  "Curd",
  "Curl",
  "Daft",
  "Dank",
  "Dart",
  "Daub",
  "Daze",
  "Deem",
  "Den",
  "Dint",
  "Dire",
  "Ditch",
  "Dive",
  "Doff",
  "Dole",
  "Dolt",
  "Doom",
  "Dope",
  "Dote",
  "Dour",
  "Dreg",
  "Droll",
  "Drone",
  "Dross",
  "Drub",
  "Dupe",
  "Dusk",
  "Dyad",
  "Eke",
  "Eland",
  "Eld",
  "Emit",
  "Espy",
  "Etch",
  "Evil",
  "Ewer",
  "Fain",
  "Fane",
  "Farl",
  "Fawn",
  "Faze",
  "Fell",
  "Fen",
  "Fetch",
  "Fife",
  "File",
  "Fill",
  "Fin",
  "Fink",
  "Firm",
  "Fist",
  "Flag",
  "Flail",
  "Flak",
  "Flare",
  "Fleck",
  "Flee",
  "Fling",
  "Flint",
  "Flip",
  "Flit",
  "Flop",
  "Flout",
  "Flume",
  "Fob",
  "Fog",
  "Foil",
  "Fond",
  "Font",
  "Fool",
  "Fop",
  "Forge",
  "Foul",
  "Fount",
  "Frock",
  "Frond",
  "Fume",
  "Funk",
  "Fur",
  "Gaff",
  "Gage",
  "Gain",
  "Gait",
  "Gall",
  "Gamut",
  "Gape",
  "Garn",
  "Gash",
  "Gavel",
  "Gawk",
  "Gaze",
  "Gear",
  "Gel",
  "Gibe",
  "Gift",
  "Gill",
  "Gimp",
  "Gird",
  "Gist",
  "Glade",
  "Gleam",
  "Glib",
  "Gloat",
  "Glob",
  "Gloom",
  "Gloss",
  "Glow",
  "Glum",
  "Glut",
  "Gnash",
  "Gnat",
  "Gnaw",
  "Go",
  "Gob",
  "Goad",
  "Gore",
  "Gouge",
  "Gout",
  "Graft",
  "Grain",
  "Graze",
  "Greed",
  "Grim",
  "Grin",
  "Gripe",
  "Grist",
  "Grit",
  "Groan",
  "Groove",
  "Grouse",
  "Growl",
  "Grudge",
  "Guile",
  "Guise",
  "Gull",
  "Gulp",
  "Gum",
  "Gust",
  "Gyp",
  "Hack",
  "Hag",
  "Hail",
  "Hale",
  "Hall",
  "Halt",
  "Ham",
  "Hank",
  "Hap",
  "Hardy",
  "Hark",
  "Has",
  "Haste",
  "Hatch",
  "Haul",
  "Haven",
  "Hawk",
  "Haze",
  "Head",
  "Heal",
  "Heap",
  "Hear",
  "Heat",
  "Heave",
  "Hedge",
  "Heft",
  "Held",
  "Hell",
  "Helm",
  "Hem",
  "Hench",
  "Herb",
  "Herd",
  "Hew",
  "Hick",
  "Hide",
  "Hike",
  "Hill",
  "Hind",
  "Hint",
  "Hip",
  "Hiss",
  "Hive",
  "Hoard",
  "Hoax",
  "Hock",
  "Hog",
  "Hold",
  "Hole",
  "Hollow",
  "Holm",
  "Hone",
  "Honk",
  "Hood",
  "Hook",
  "Hoot",
  "Hop",
  "Hope",
  "Horn",
  "Hot",
  "Hound",
  "Hour",
  "House",
  "Hover",
  "Howl",
  "Hub",
  "Hue",
  "Huff",
  "Hug",
  "Hulk",
  "Hull",
  "Hum",
  "Hunch",
  "Hunt",
  "Hurdle",
  "Hurl",
  "Hush",
  "Husk",
  "Hut",
  "Hyde",
  "Hymn",
  "Icy",
  "Id",
  "Idle",
  "Idol",
  "If",
  "Ilk",
  "Ill",
  "Imp",
  "Inch",
  "Ink",
  "Inn",
  "Input",
  "Inset",
  "Insult",
  "Iota",
  "Ire",
  "Iron",
  "Irk",
  "Isle",
  "Issue",
  "Itch",
  "Item",
  "Ivory",
  "Jack",
  "Jade",
  "Jag",
  "Jail",
  "Jam",
  "Jar",
  "Jaw",
  "Jay",
  "Jazz",
  "Jeer",
  "Jerk",
  "Jest",
  "Jet",
  "Jibe",
  "Jig",
  "Jilt",
  "Jingle",
  "Jinx",
  "Jive",
  "Job",
  "Jog",
  "Join",
  "Joint",
  "Joke",
  "Jolt",
  "Jostle",
  "Jot",
  "Joust",
  "Joy",
  "Judge",
  "Jug",
  "Juice",
  "Jump",
  "Junk",
  "Jut",
  "Keel",
  "Keen",
  "Keep",
  "Keg",
  "Ken",
  "Kern",
  "Ketch",
  "Key",
  "Kick",
  "Kid",
  "Kin",
  "Kind",
  "King",
  "Kirk",
  "Kiss",
  "Kit",
  "Kith",
  "Knack",
  "Knave",
  "Knead",
  "Knell",
  "Knife",
  "Knit",
  "Knob",
  "Knock",
  "Knot",
  "Know",
  "Knurl",
  "Koala",
  "Kohl",
  "Kook",
  "Kudos",
  "Label",
  "Lace",
  "Lack",
  "Lade",
  "Laden",
  "Lag",
  "Laid",
  "Lair",
  "Lake",
  "Lame",
  "Lamp",
  "Lance",
  "Land",
  "Lane",
  "Lank",
  "Lap",
  "Lard",
  "Lark",
  "Lash",
  "Lass",
  "Last",
  "Latch",
  "Late",
  "Lath",
  "Laud",
  "Laugh",
  "Launch",
  "Lava",
  "Lavish",
  "Law",
  "Lawn",
  "Lay",
  "Lazy",
  "Lea",
  "Lead",
  "Leaf",
  "Leak",
  "Lean",
  "Leap",
  "Learn",
  "Leash",
  "Least",
  "Leather",
  "Leave",
  "Lech",
  "Lee",
  "Leer",
  "Left",
  "Leg",
  "Lend",
  "Lens",
  "Lent",
  "Leper",
  "Lesion",
  "Lest",
  "Let",
  "Lethal",
  "Letter",
  "Level",
  "Lever",
  "Liar",
  "Libel",
  "Lice",
  "Lick",
  "Lid",
  "Lie",
  "Life",
  "Lift",
  "Light",
  "Like",
  "Lilt",
  "Limb",
  "Lime",
  "Line",
  "Linger",
  "Link",
  "Lint",
  "Lion",
  "Lip",
  "Lisp",
  "List",
  "Live",
  "Loaf",
  "Loan",
  "Loath",
  "Lob",
  "Lock",
  "Loft",
  "Log",
  "Loin",
  "Loiter",
  "Loll",
  "Lone",
  "Long",
  "Look",
  "Loom",
  "Loop",
  "Loose",
  "Loot",
  "Lop",
  "Lord",
  "Lore",
  "Lose",
  "Loss",
  "Lost",
  "Lot",
  "Loud",
  "Lounge",
  "Lout",
  "Love",
  "Low",
  "Lull",
  "Lump",
  "Lunch",
  "Lunge",
  "Lure",
  "Lurk",
  "Lust",
  "Lute",
  "Lyre",
  "Mace",
  "Mad",
  "Mail",
  "Main",
  "Maim",
  "Make",
  "Male",
  "Mall",
  "Malt",
  "Man",
  "Mane",
  "Manse",
  "Map",
  "Mar",
  "March",
  "Mark",
  "Mart",
  "Mash",
  "Mask",
  "Mass",
  "Mast",
  "Mate",
  "Math",
  "Mauve",
  "Maw",
  "May",
  "Maze",
  "Mead",
  "Meal",
  "Mean",
  "Meat",
  "Meet",
  "Meld",
  "Melt",
  "Mend",
  "Mesh",
  "Mess",
  "Met",
  "Mew",
  "Mica",
  "Midge",
  "Might",
  "Mile",
  "Milk",
  "Mill",
  "Mimic",
  "Mind",
  "Mine",
  "Mint",
  "Mire",
  "Miss",
  "Mist",
  "Mite",
  "Mix",
  "Moan",
  "Moat",
  "Mock",
  "Mode",
  "Mold",
  "Mole",
  "Molest",
  "Mollusk",
  "Mom",
  "Mood",
  "Moon",
  "Moor",
  "Moot",
  "Mop",
  "More",
  "Mortar",
  "Moss",
  "Most",
  "Moth",
  "Move",
  "Much",
  "Mud",
  "Muff",
  "Mug",
  "Mulch",
  "Mule",
  "Mum",
  "Munch",
  "Muse",
  "Mush",
  "Musk",
  "Must",
  "Mute",
  "Myth",
  "Nab",
  "Nag",
  "Nail",
  "Name",
  "Nap",
  "Nark",
  "Nash",
  "Nat",
  "Nave",
  "Near",
  "Neat",
  "Neck",
  "Need",
  "Needy",
  "Nest",
  "Net",
  "Newt",
  "Next",
  "Nib",
  "Nice",
  "Niche",
  "Nick",
  "Night",
  "Nill",
  "Nimb",
  "Nine",
  "Nip",
  "Nit",
  "Node",
  "Noisy",
  "Nomad",
  "Nonce",
  "Nook",
  "Norm",
  "Nose",
  "Not",
  "Note",
  "Noun",
  "Nudge",
  "Null",
  "Numb",
  "Nurse",
  "Nut",
  "Oaf",
  "Oak",
  "Oar",
  "Oath",
  "Odd",
  "Ode",
  "Off",
  "Oft",
  "Oil",
  "Old",
  "Omen",
  "Once",
  "One",
  "Only",
  "Onto",
  "Onyx",
  "Ooze",
  "Opal",
  "Open",
  "Orb",
  "Orc",
  "Ore",
  "Orgy",
  "Ouch",
  "Out",
  "Oust",
  "Oval",
  "Oven",
  "Over",
  "Ovum",
  "Owe",
  "Owl",
  "Own",
  "Pace",
  "Pack",
  "Pad",
  "Page",
  "Pail",
  "Pain",
  "Paint",
  "Pair",
  "Pale",
  "Palm",
  "Pan",
  "Pane",
  "Pant",
  "Park",
  "Parlay",
  "Part",
  "Pass",
  "Past",
  "Paste",
  "Pat",
  "Path",
  "Pawn",
  "Pay",
  "Pea",
  "Peak",
  "Peal",
  "Pearl",
  "Peck",
  "Pedal",
  "Peel",
  "Peep",
  "Peer",
  "Peg",
  "Pelt",
  "Pen",
  "Pest",
  "Pet",
  "Pew",
  "Phial",
  "Phone",
  "Pick",
  "Pike",
  "Pile",
  "Pill",
  "Pin",
  "Pinch",
  "Pine",
  "Pink",
  "Pint",
  "Pipe",
  "Pit",
  "Pitch",
  "Pith",
  "Place",
  "Plan",
  "Plane",
  "Plant",
  "Plate",
  "Play",
  "Plea",
  "Please",
  "Pledge",
  "Plight",
  "Plot",
  "Plow",
  "Pluck",
  "Plug",
  "Plum",
  "Plumb",
  "Plume",
  "Poach",
  "Pod",
  "Poem",
  "Poet",
  "Point",
  "Poke",
  "Pole",
  "Poll",
  "Pond",
  "Pool",
  "Poor",
  "Pop",
  "Port",
  "Pose",
  "Post",
  "Pot",
  "Pound",
  "Pour",
  "Pout",
  "Praise",
  "Prank",
  "Pray",
  "Preen",
  "Press",
  "Price",
  "Prick",
  "Pride",
  "Prime",
  "Prior",
  "Prize",
  "Probe",
  "Prompt",
  "Prone",
  "Proof",
  "Prop",
  "Pry",
  "Psalm",
  "Pub",
  "Puck",
  "Puff",
  "Pull",
  "Pulp",
  "Pulse",
  "Punch",
  "Pup",
  "Pure",
  "Purge",
  "Purse",
  "Push",
  "Put",
  "Quail",
  "Quake",
  "Quash",
  "Queen",
  "Queer",
  "Quell",
  "Quest",
  "Quick",
  "Quip",
  "Quit",
  "Quiz",
  "Quote",
  "Race",
  "Rack",
  "Rad",
  "Rage",
  "Raid",
  "Rail",
  "Rain",
  "Raise",
  "Rake",
  "Ramp",
  "Ranch",
  "Range",
  "Rank",
  "Rap",
  "Rash",
  "Rate",
  "Rat",
  "Rave",
  "Raw",
  "Ray",
  "Raze",
  "Reach",
  "Read",
  "Ready",
  "Realm",
  "Reap",
  "Rear",
  "Rebuff",
  "Recut",
  "Red",
  "Redeem",
  "Reed",
  "Reef",
  "Reel",
  "Refit",
  "Reign",
  "Reject",
  "Relapse",
  "Remit",
  "Rent",
  "Repel",
  "Rest",
  "Retake",
  "Revamp",
  "Revolt",
  "Rhyme",
  "Rib",
  "Rice",
  "Rich",
  "Ride",
  "Ridge",
  "Rift",
  "Rig",
  "Right",
  "Rile",
  "Rim",
  "Rind",
  "Ring",
  "Rinse",
  "Riot",
  "Rip",
  "Rise",
  "Risk",
  "Rite",
  "Road",
  "Roar",
  "Roast",
  "Rob",
  "Robe",
  "Rock",
  "Rod",
  "Roe",
  "Rogue",
  "Role",
  "Roll",
  "Roof",
  "Room",
  "Root",
  "Rope",
  "Rose",
  "Rot",
  "Rough",
  "Round",
  "Rouse",
  "Route",
  "Row",
  "Rub",
  "Rude",
  "Ruin",
  "Rule",
  "Rump",
  "Run",
  "Rune",
  "Rush",
  "Rust",
  "Ruth",
  "Sack",
  "Safe",
  "Sage",
  "Sail",
  "Saint",
  "Sake",
  "Sale",
  "Salt",
  "Salute",
  "Same",
  "Sand",
  "Sane",
  "Sap",
  "Sash",
  "Save",
  "Saw",
  "Say",
  "Scale",
  "Scalp",
  "Scan",
  "Scar",
  "Scare",
  "Scarf",
  "Scene",
  "Scent",
  "Scheme",
  "School",
  "Scoop",
  "Score",
  "Scorn",
  "Scour",
  "Scout",
  "Scowl",
  "Scram",
  "Scrap",
  "Screech",
  "Screen",
  "Screw",
  "Scrub",
  "Scum",
  "Seal",
  "Seam",
  "Search",
  "Seat",
  "Sect",
  "See",
  "Seed",
  "Seek",
  "Seem",
  "Seep",
  "Seize",
  "Sell",
  "Send",
  "Sense",
  "Sent",
  "Serf",
  "Serve",
  "Set",
  "Sew",
  "Sex",
  "Shade",
  "Shaft",
  "Shake",
  "Shall",
  "Shame",
  "Shape",
  "Share",
  "Shark",
  "Sharp",
  "Shave",
  "Sheaf",
  "Shear",
  "Shed",
  "Sheep",
  "Sheet",
  "Shelf",
  "Shell",
  "Shift",
  "Shine",
  "Ship",
  "Shirt",
  "Shock",
  "Shoe",
  "Shoot",
  "Shop",
  "Shore",
  "Short",
  "Shout",
  "Shove",
  "Show",
  "Shred",
  "Shrew",
  "Shrine",
  "Shrink",
  "Shroud",
  "Shrug",
  "Shut",
  "Shy",
  "Sick",
  "Side",
  "Siege",
  "Sigh",
  "Sight",
  "Sign",
  "Silk",
  "Sill",
  "Silt",
  "Sin",
  "Sing",
  "Sink",
  "Sir",
  "Sire",
  "Site",
  "Six",
  "Size",
  "Skate",
  "Skew",
  "Skid",
  "Skill",
  "Skim",
  "Skin",
  "Skip",
  "Skirt",
  "Skit",
  "Skull",
  "Skunk",
  "Sky",
  "Slack",
  "Slain",
  "Slake",
  "Slap",
  "Slate",
  "Slave",
  "Slay",
  "Sleek",
  "Sleep",
  "Sleet",
  "Sleeve",
  "Slice",
  "Slick",
  "Slide",
  "Slight",
  "Slime",
  "Sling",
  "Slip",
  "Slit",
  "Slope",
  "Slot",
  "Slow",
  "Slug",
  "Slump",
  "Slur",
  "Smash",
  "Smell",
  "Smile",
  "Smirk",
  "Smite",
  "Smith",
  "Smoke",
  "Smooth",
  "Snack",
  "Snail",
  "Snake",
  "Snap",
  "Snare",
  "Snatch",
  "Sneak",
  "Sneer",
  "Sniff",
  "Snip",
  "Snob",
  "Snoop",
  "Snore",
  "Snow",
  "Snub",
  "Snuff",
  "Soak",
  "Soap",
  "Soar",
  "Sock",
  "Sod",
  "Sofa",
  "Soft",
  "Soil",
  "Sold",
  "Sole",
  "Some",
  "Song",
  "Soon",
  "Soot",
  "Sore",
  "Sort",
  "Soul",
  "Sound",
  "Soup",
  "Sour",
  "South",
  "Sow",
  "Space",
  "Spade",
  "Span",
  "Spare",
  "Spark",
  "Spasm",
  "Spawn",
  "Speak",
  "Spear",
  "Speck",
  "Speed",
  "Spell",
  "Spend",
  "Spent",
  "Spice",
  "Spike",
  "Spill",
  "Spin",
  "Spine",
  "Spirit",
  "Spit",
  "Spite",
  "Splash",
  "Split",
  "Spoil",
  "Spoke",
  "Spoon",
  "Sport",
  "Spot",
  "Spout",
  "Sprain",
  "Spray",
  "Spread",
  "Spring",
  "Spruce",
  "Spur",
  "Spurn",
  "Spy",
  "Squad",
  "Squall",
  "Square",
  "Squash",
  "Squat",
  "Squeak",
  "Squeal",
  "Squid",
  "Squint",
  "Stab",
  "Stack",
  "Staff",
  "Stage",
  "Stain",
  "Stair",
  "Stake",
  "Stalk",
  "Stall",
  "Stamp",
  "Stand",
  "Star",
  "Stare",
  "Start",
  "State",
  "Stay",
  "Steak",
  "Steal",
  "Steam",
  "Steel",
  "Steep",
  "Steer",
  "Stem",
  "Step",
  "Stern",
  "Stew",
  "Stick",
  "Stiff",
  "Stile",
  "Still",
  "Sting",
  "Stink",
  "Stir",
  "Stock",
  "Stole",
  "Stone",
  "Stoop",
  "Stop",
  "Store",
  "Storm",
  "Story",
  "Stout",
  "Stove",
  "Strain",
  "Strait",
  "Strand",
  "Strap",
  "Straw",
  "Stray",
  "Streak",
  "Stream",
  "Street",
  "Stress",
  "Strew",
  "Stride",
  "Strike",
  "String",
  "Strip",
  "Strive",
  "Stroke",
  "Stroll",
  "Strong",
  "Strum",
  "Strut",
  "Stub",
  "Stuck",
  "Stud",
  "Study",
  "Stuff",
  "Stump",
  "Stun",
  "Stunt",
  "Style",
  "Stylus",
  "Sub",
  "Such",
  "Suck",
  "Suds",
  "Sue",
  "Suit",
  "Sulk",
  "Sum",
  "Sun",
  "Sung",
  "Sunk",
  "Sup",
  "Sure",
  "Surf",
  "Surge",
  "Swab",
  "Swag",
  "Swain",
  "Swamp",
  "Swan",
  "Swap",
  "Swarm",
  "Sway",
  "Sweat",
  "Sweep",
  "Sweet",
  "Swell",
  "Swift",
  "Swim",
  "Swing",
  "Swipe",
  "Swirl",
  "Switch",
  "Sword",
  "Swore",
  "Sworn",
  "Swung",
  "Tab",
  "Tack",
  "Taint",
  "Take",
  "Tale",
  "Talk",
  "Tall",
  "Tame",
  "Tank",
  "Tap",
  "Tape",
  "Tar",
  "Tardy",
  "Tare",
  "Task",
  "Taste",
  "Taunt",
  "Tax",
  "Teach",
  "Team",
  "Tear",
  "Tease",
  "Teeth",
  "Tell",
  "Ten",
  "Tend",
  "Tent",
  "Term",
  "Test",
  "Text",
  "Than",
  "Thank",
  "That",
  "The",
  "Their",
  "Them",
  "Then",
  "There",
  "These",
  "They",
  "Thick",
  "Thief",
  "Thigh",
  "Thin",
  "Thing",
  "Think",
  "Third",
  "This",
  "Thorn",
  "Those",
  "Though",
  "Thread",
  "Threat",
  "Thrill",
  "Thrive",
  "Throat",
  "Throne",
  "Throw",
  "Thud",
  "Thumb",
  "Thus",
  "Tick",
  "Tide",
  "Tie",
  "Tier",
  "Tiger",
  "Tile",
  "Till",
  "Time",
  "Tin",
  "Tint",
  "Tip",
  "Tire",
  "Toad",
  "Toast",
  "Toe",
  "Toil",
  "Told",
  "Toll",
  "Tomb",
  "Tone",
  "Tongue",
  "Too",
  "Tool",
  "Tooth",
  "Top",
  "Torch",
  "Toss",
  "Total",
  "Touch",
  "Tough",
  "Tour",
  "Toward",
  "Towel",
  "Tower",
  "Town",
  "Toy",
  "Trace",
  "Track",
  "Trade",
  "Trail",
  "Train",
  "Trait",
  "Tram",
  "Tramp",
  "Trap",
  "Trash",
  "Tray",
  "Tread",
  "Treat",
  "Tree",
  "Trek",
  "Trend",
  "Trial",
  "Tribe",
  "Trick",
  "Trip",
  "Troll",
  "Troop",
  "Trout",
  "Truck",
  "True",
  "Trump",
  "Trunk",
  "Trust",
  "Truth",
  "Try",
  "Tube",
  "Tuck",
  "Tug",
  "Tune",
  "Turf",
  "Turn",
  "Tusk",
  "Tutor",
  "Twain",
  "Twig",
  "Twin",
  "Twine",
  "Twist",
  "Two",
  "Type",
  "Ugly",
  "Ulcer",
  "Uncle",
  "Under",
  "Undo",
  "Unit",
  "Untie",
  "Until",
  "Up",
  "Urge",
  "Uproar",
  "Upsell",
  "Upset",
  "Urn",
  "Use",
  "Usher",
  "Usual",
  "Utter",
  "Vail",
  "Vain",
  "Vale",
  "Valid",
  "Valley",
  "Valor",
  "Valve",
  "Van",
  "Vane",
  "Vanish",
  "Vapor",
  "Vary",
  "Vast",
  "Vat",
  "Vault",
  "Veal",
  "Veer",
  "Veil",
  "Vein",
  "Velvet",
  "Veneer",
  "Venom",
  "Vent",
  "Venue",
  "Verb",
  "Verge",
  "Verify",
  "Verse",
  "Version",
  "Versus",
  "Very",
  "Vessel",
  "Vest",
  "Veto",
  "Vex",
  "Via",
  "Vial",
  "Vibe",
  "Vice",
  "View",
  "Vigil",
  "Vigor",
  "Villa",
  "Vine",
  "Vinyl",
  "Violin",
  "Viper",
  "Viral",
  "Virtue",
  "Virus",
  "Visa",
  "Visit",
  "Vista",
  "Visual",
  "Vital",
  "Vivid",
  "Vixen",
  "Vocal",
  "Voice",
  "Void",
  "Volcano",
  "Volume",
  "Vomit",
  "Vote",
  "Vouch",
  "Vowel",
  "Voyage",
  "Wad",
  "Wade",
  "Waffle",
  "Waft",
  "Wage",
  "Wager",
  "Wail",
  "Waist",
  "Wait",
  "Wake",
  "Waken",
  "Walk",
  "Wall",
  "Wallow",
  "Walnut",
  "Wand",
  "Wane",
  "Want",
  "War",
  "Ward",
  "Warm",
  "Warn",
  "Warp",
  "Warrant",
  "Wash",
  "Waste",
  "Watch",
  "Water",
  "Wave",
  "Wax",
  "Way",
  "Weal",
  "Wealth",
  "Weapon",
  "Wear",
  "Weasel",
  "Weather",
  "Weave",
  "Web",
  "Wed",
  "Wedge",
  "Weed",
  "Week",
  "Weep",
  "Weigh",
  "Weight",
  "Weird",
  "Well",
  "Welsh",
  "Welt",
  "Wen",
  "Went",
  "West",
  "Wet",
  "Whack",
  "Whale",
  "Wharf",
  "What",
  "Wheat",
  "Wheel",
  "Whelp",
  "When",
  "Where",
  "Which",
  "While",
  "Whip",
  "Whir",
  "Whisper",
  "White",
  "Who",
  "Whole",
  "Whom",
  "Whore",
  "Why",
  "Wick",
  "Wide",
  "Width",
  "Wield",
  "Wife",
  "Wild",
  "Will",
  "Wilt",
  "Win",
  "Wind",
  "Window",
  "Wing",
  "Wink",
  "Wipe",
  "Wire",
  "Wisdom",
  "Wise",
  "Wish",
  "Wit",
  "Witch",
  "With",
  "Within",
  "Without",
  "Woe",
  "Woke",
  "Wolf",
  "Woman",
  "Womb",
  "Wonder",
  "Won't",
  "Wood",
  "Woo",
  "Word",
  "Work",
  "World",
  "Worm",
  "Worry",
  "Worse",
  "Worth",
  "Would",
  "Wound",
  "Wrap",
  "Wrath",
  "Wreck",
  "Wrench",
  "Wrestle",
  "Wretch",
  "Wriggle",
  "Wright",
  "Wring",
  "Wrinkle",
  "Wrist",
  "Write",
  "Wrong",
  "Wrote",
  "Wrought",
  "Wrung",
  "Yard",
  "Yarn",
  "Yaw",
  "Year",
  "Yell",
  "Yes",
  "Yet",
  "Yield",
  "Yo",
  "Yoke",
  "Yolk",
  "Yon",
  "Yonder",
  "You",
  "Young",
  "Your",
  "Youth",
  "Yowl",
  "Yuk",
  "Yum",
  "Zap",
  "Zeal",
  "Zebra",
  "Zero",
  "Zest",
  "Zig",
  "Zag",
  "Zip",
  "Zone",
  "Zoom",
];
let suffix = [
  "burg",
  "bury",
  "by",
  "cliff",
  "dale",
  "don",
  "end",
  "field",
  "ford",
  "gate",
  "glen",
  "heath",
  "hill",
  "holme",
  "ing",
  "isle",
  "land",
  "loo",
  "low",
  "mere",
  "ness",
  "ridge",
  "shire",
  "side",
  "stead",
  "stone",
  "ton",
  "town",
  "vale",
  "ville",
  "way",
  "well",
  "wood",
  "al",
  "ar",
  "ash",
  "ate",
  "bourne",
  "bridge",
  "brook",
  "camp",
  "carrick",
  "castle",
  "chase",
  "chester",
  "close",
  "croft",
  "dean",
  "den",
  "edge",
  "garth",
  "glen",
  "haven",
  "head",
  "holt",
  "key",
  "knoll",
  "ley",
  "lodge",
  "lyn",
  "meadow",
  "mill",
  "mount",
  "nook",
  "over",
  "rise",
  "row",
  "run",
  "thorpe",
  "top",
  "view",
  "way",
  "wick",
  "yard",
];
let place = [
  "Acres",
  "Annex",
  "Apartments",
  "Arboretum",
  "Archipelago",
  "Asylum",
  "Atoll",
  "Auditorium",
  "Avenue",
  "Basin",
  "Battlefield",
  "Beach",
  "Bend",
  "Block",
  "Boardwalk",
  "Bog",
  "Bottom",
  "Boundary",
  "Branch",
  "Bridge",
  "Brook",
  "Building",
  "Bungalow",
  "Bypass",
  "Cabin",
  "Campus",
  "Canyon",
  "Capital",
  "Caravan Park",
  "Castle",
  "Causeway",
  "Cave",
  "Cemetery",
  "Channel",
  "Chapel",
  "City",
  "Cliff",
  "Clinic",
  "Club",
  "Coast",
  "College",
  "Colony",
  "Compound",
  "Condominiums",
  "Conservatory",
  "Continent",
  "Corner",
  "Country",
  "Courtyard",
  "Creek",
  "Crescent",
  "Crossing",
  "Cul-de-sac",
  "Dam",
  "Dale",
  "Depot",
  "Desert",
  "District",
  "Dock",
  "Domain",
  "Dormitory",
  "Downs",
  "Drive",
  "Dune",
  "Dwelling",
  "East",
  "Edge",
  "Elevation",
  "Embankment",
  "Empire",
  "Enclave",
  "Estate",
  "Expanse",
  "Factory",
  "Fairgrounds",
  "Farm",
  "Field",
  "Fjord",
  "Flat",
  "Flats",
  "Forest",
  "Fort",
  "Forum",
  "Fountain",
  "Freeway",
  "Front",
  "Gallery",
  "Garden",
  "Gardens",
  "Garrison",
  "Gateway",
  "Glacier",
  "Glen",
  "Gorge",
  "Green",
  "Grounds",
  "Grove",
  "Gulf",
  "Hamlet",
  "Harbor",
  "Harbour",
  "Heath",
  "Heights",
  "Highlands",
  "Highway",
  "Hill",
  "Hollow",
  "Holt",
  "Home",
  "Homestead",
  "Hospital",
  "Hotel",
  "House",
  "Housing",
  "Ice Cap",
  "Ice Field",
  "Inlet",
  "Institute",
  "Island",
  "Isle",
  "Isthmus",
  "Jail",
  "Junction",
  "Kennel",
  "Kingdom",
  "Knoll",
  "Lagoon",
  "Lake",
  "Land",
  "Landing",
  "Lane",
  "Lawn",
  "Layby",
  "Library",
  "Lighthouse",
  "Lodge",
  "Loop",
  "Lowlands",
  "Mall",
  "Manor",
  "Marsh",
  "Meadow",
  "Meeting Place",
  "Mesa",
  "Metro",
  "Metropolis",
  "Mine",
  "Mission",
  "Monastery",
  "Monument",
  "Moor",
  "Motel",
  "Mound",
  "Mountain",
  "Museum",
  "North",
  "Northwest",
  "Oasis",
  "Ocean",
  "Office",
  "Orchard",
  "Outback",
  "Outpost",
  "Overpass",
  "Overture",
  "Palace",
  "Park",
  "Pass",
  "Pathway",
  "Pavilion",
  "Peak",
  "Peninsula",
  "Pines",
  "Plain",
  "Planet",
  "Plantation",
  "Plateau",
  "Plaza",
  "Point",
  "Pond",
  "Pool",
  "Port",
  "Post Office",
  "Prairie",
  "Precinct",
  "Preserve",
  "Prison",
  "Promenade",
  "Province",
  "Quarry",
  "Quay",
  "Ranch",
  "Range",
  "Rapids",
  "Ravine",
  "Region",
  "Residence",
  "Resort",
  "Restaurant",
  "Retreat",
  "Ridge",
  "Rise",
  "River",
  "Road",
  "Rock",
  "Route",
  "Row",
  "Ruins",
  "Run",
  "Rural Area",
  "Sanctuary",
  "Sandbar",
  "Savannah",
  "School",
  "Sea",
  "Seaboard",
  "Seashore",
  "Settlement",
  "Shanty Town",
  "Shore",
  "Shrine",
  "Site",
  "Skyscraper",
  "Slope",
  "Slum",
  "South",
  "Southwest",
  "Space",
  "Spring",
  "Square",
  "Stadium",
  "State",
  "Station",
  "Suburb",
  "Summit",
  "Swamp",
  "Terrace",
  "Thicket",
  "Town",
  "Track",
  "Trail",
  "Trench",
  "Tributary",
  "Tunnel",
  "Tundra",
  "Underpass",
  "University",
  "Uplands",
  "Valley",
  "Villa",
  "Village",
  "Vista",
  "Void",
  "Volcano",
  "Walk",
  "Wall",
  "Way",
  "West",
  "Wetland",
  "Wharf",
  "Wilderness",
  "Wilds",
  "Winderness",
  "Wood",
  "Woods",
  "Zone",
  "Zoo",
  "Alley",
  "Arcade",
  "Avenue",
  "Bay",
  "Beach",
  "Boulevard",
  "Bridge",
  "Camp",
  "Canyon",
  "Cape",
  "Center",
  "Centre",
  "Circle",
  "Cliff",
  "Close",
  "Common",
  "Corner",
  "Court",
  "Cove",
  "Crescent",
  "Dale",
  "Dam",
  "Delta",
  "Divide",
  "Downs",
  "Drive",
  "Edge",
  "Embankment",
  "Estates",
  "Estuary",
  "Expressway",
  "Falls",
  "Farm",
  "Field",
  "Forest",
  "Fort",
  "Fountain",
  "Freeway",
  "Gardens",
  "Gate",
  "Glacier",
  "Glen",
  "Green",
  "Grove",
  "Harbor",
  "Harbour",
  "Haven",
  "Heights",
  "Highway",
  "Hill",
  "Hollow",
  "Holt",
  "Island",
  "Isle",
  "Junction",
  "Key",
  "Knoll",
  "Lake",
  "Lane",
  "Landing",
  "Lawn",
  "Meadow",
  "Mesa",
  "Mill",
  "Moor",
  "Mountain",
  "Neck",
  "Oasis",
  "Orchard",
  "Overpass",
  "Park",
  "Pass",
  "Path",
  "Pathway",
  "Peak",
  "Peninsula",
  "Pines",
  "Plain",
  "Plateau",
  "Plaza",
  "Point",
  "Pond",
  "Prairie",
  "Quay",
  "Range",
  "Rapids",
  "Ravine",
  "Reservoir",
  "Ridge",
  "Rise",
  "River",
  "Road",
  "Route",
  "Row",
  "Run",
  "Sea",
  "Shore",
  "Slope",
  "Spring",
  "Square",
  "Street",
  "Summit",
  "Terrace",
  "Thicket",
  "Trail",
  "Tundra",
  "Tunnel",
  "Valley",
  "View",
  "Village",
  "Vista",
  "Walk",
  "Way",
  "Well",
  "Wharf",
  "Wilderness",
  "Wood",
  "Woods",
  "Yard",
  "Abbey",
  "Academy",
  "Aerodrome",
  "Airport",
  "Alley",
  "Annex",
  "Apartments",
  "Arboretum",
  "Archipelago",
  "Area",
  "Arena",
  "Arsenal",
  "Atoll",
  "Atrium",
  "Avenue",
  "Basement",
  "Basin",
  "Beach",
  "Bend",
  "Block",
  "Boardwalk",
  "Bog",
  "Bottom",
  "Boundary",
  "Branch",
  "Bridge",
  "Brook",
  "Building",
  "Bungalow",
  "Burrow",
  "Camp",
  "Campus",
  "Canyon",
  "Cape",
  "Capital",
  "Castle",
  "Cave",
  "Center",
  "Centre",
  "Cemetery",
  "Channel",
  "Chapel",
  "Chase",
  "Cliff",
  "Clinic",
  "Club",
  "Coast",
  "College",
  "Colony",
  "Complex",
  "Compound",
  "Condos",
  "Corner",
  "Court",
  "Cove",
  "Crater",
  "Creek",
  "Crescent",
  "Crossing",
  "Crypt",
  "Dale",
  "Dam",
  "Depot",
  "Desert",
  "District",
  "Dock",
  "Domain",
  "Dome",
  "Dorm",
  "Downs",
  "Drive",
  "Dune",
  "Edge",
  "Elevation",
  "Embankment",
  "Empire",
  "Enclave",
  "Estate",
  "Expanse",
  "Factory",
  "Farm",
  "Field",
  "Fjord",
  "Flat",
  "Forest",
  "Fort",
  "Forum",
  "Fountain",
  "Freeway",
  "Front",
  "Gallery",
  "Garden",
  "Garrison",
  "Gate",
  "Gateway",
  "Glacier",
  "Glen",
  "Gorge",
  "Green",
  "Grounds",
  "Grove",
  "Gulf",
  "Hamlet",
  "Harbor",
  "Haven",
  "Heath",
  "Heights",
  "Hill",
  "Hollow",
  "Holt",
  "Home",
  "Homestead",
  "Hospital",
  "Hotel",
  "House",
  "Housing",
  "Ice",
  "Inlet",
  "Institute",
  "Island",
  "Isle",
  "Isthmus",
  "Jail",
  "Junction",
  "Kennel",
  "Kingdom",
  "Knoll",
  "Lagoon",
  "Lake",
  "Land",
  "Lane",
  "Lawn",
  "Levee",
  "Library",
  "Lighthouse",
  "Lodge",
  "Loop",
  "Mall",
  "Manor",
  "Marsh",
  "Meadow",
  "Mesa",
  "Metro",
  "Mine",
  "Mission",
  "Moor",
  "Motel",
  "Mound",
  "Mountain",
  "Neck",
  "North",
  "Oasis",
  "Ocean",
  "Office",
  "Orchard",
  "Outback",
  "Outpost",
  "Overpass",
  "Park",
  "Pass",
  "Path",
  "Peak",
  "Peninsula",
  "Pines",
  "Plain",
  "Plateau",
  "Plaza",
  "Point",
  "Pond",
  "Pool",
  "Port",
  "Prairie",
  "Quarry",
  "Quay",
  "Ranch",
  "Range",
  "Rapids",
  "Ravine",
  "Region",
  "Residence",
  "Resort",
  "Ridge",
  "Rise",
  "River",
  "Road",
  "Rock",
  "Route",
  "Row",
  "Ruins",
  "Run",
  "Sanctuary",
  "Sandbar",
  "Savannah",
  "School",
  "Sea",
  "Shore",
  "Site",
  "Slope",
  "Spring",
  "Square",
  "Station",
  "Suburb",
  "Summit",
  "Swamp",
  "Terrace",
  "Thicket",
  "Town",
  "Trail",
  "Trench",
  "Tundra",
  "Tunnel",
  "Valley",
  "Villa",
  "Village",
  "Vista",
  "Void",
  "Volcano",
  "Walk",
  "Wall",
  "Way",
  "West",
  "Wharf",
  "Wilderness",
  "Wood",
  "Woods",
  "Yard",
  "Zone",
  "Zoo",
];

//remove dups
name = [...new Set(name)];
place = [...new Set(place)];