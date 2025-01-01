var root = document.documentElement;

var listItems = document.querySelectorAll(".active");

var currentSketch;

function goBack(){
    moveDiv("wrapper", 0);
    location.hash = 'home';
    root.style.setProperty('--bg', 'antiquewhite');
    document.getElementById("frame").style.transitionDuration = "0.25s";
    document.getElementById("frame").style.opacity = "0%";
    if (darkMode){
        goDark();
    } else {
        goLight();
    }
}

function moveDiv(id, position) {
    var element = document.getElementById(id);
    element.style.transform = "translate(" +position+"vw, 0)";
    // element.style.left = position+"%";
}



let infoToggle = 0;


function toggleInfo(){
    if (!portrait){
        if (infoToggle == 0){
            var element = document.getElementById('canvas-left');
            element.style.transform = "translate(20vw, 0)";
            var element2 = document.getElementById('info-box');
            element2.style.transform = "translate(40vw, 0)";
            var element3 = document.getElementById('info-button');
            element3.style.transform = "translate(-200%, -50%)";
            element3.innerHTML = "?";
            infoToggle = 1;
        } else {
            var element = document.getElementById('canvas-left');
            element.style.transform = "translate(0vw, 0)";
            var element2 = document.getElementById('info-box');
            element2.style.transform = "translate(0vw, 0)";
            var element3 = document.getElementById('info-button');
            element3.style.transform = "translate(-50%, -50%)";
            element3.innerHTML = ">";
            infoToggle = 0;
        }
    } else {
        if (infoToggle == 0){
            var element2 = document.getElementById('info-box');
            element2.style.transform = "translate(0, 100vh)";
            var element3 = document.getElementById('info-button');
            element3.style.transform = "translate(-50%, -200%)";
            element3.innerHTML = "?";
            infoToggle = 1;
        } else {
            var element2 = document.getElementById('info-box');
            element2.style.transform = "translate(0, 53vh)";
            var element3 = document.getElementById('info-button');
            element3.style.transform = "translate(-50%, -50%)";
            element3.innerHTML = "▼";
            infoToggle = 0;
        }
    }
}

var portrait = false;

if (window.innerWidth < 1050 && !portrait) {
    portrait = true;
    var element = document.getElementById('info-button');
    element.innerText = "▼";
}
if (window.innerWidth > 1050 && portrait) {
    portrait = false;
    var element = document.getElementById('info-button');
    element.innerText = ">";
}

window.addEventListener("resize", function() {
    // console.log(window.innerWidth);
    if (window.innerWidth < 1050 && !portrait) {
        portrait = true;
        
        var element = document.getElementById('canvas-left');
        var element2 = document.getElementById('info-box');
        var element3 = document.getElementById('info-button');
        // var element4 = document.getElementById('canvas-page');
        // element4.style.height = "100vh";

        if(!infoToggle){
            element3.innerText = "▼";
            element2.style.transform = "translate(0, 53vh)";
            element.style.transform = "translate(0, 0)";
            element3.style.transform = "translate(-50%, -50%)";
        } else {
            element2.style.transform = "translate(0, 100vh)";
            element.style.transform = "translate(0, 0)";
            element3.style.transform = "translate(-50%, -200%)";
        }
    }
    if (window.innerWidth > 1050 && portrait) {
        portrait = false;
        var element = document.getElementById('canvas-left');
        var element2 = document.getElementById('info-box');
        var element3 = document.getElementById('info-button');
        if(!infoToggle){
            element3.innerText = ">";
            element2.style.transform = "translate(0, 0)";
            element.style.transform = "translate(0vw, 0)";
            element3.style.transform = "translate(-50%, -50%)";
        } else {
            element2.style.transform = "translate(40vw, 0)";
            element.style.transform = "translate(20vw, 0)";
            element3.style.transform = "translate(-200%, -50%)";
        }
    }

})

function addClass(Id, className) {
    var element = document.getElementById(Id);
    element.classList.add(className);
}

function removeClass(Id, className) {
    var element = document.getElementById(Id);
    element.classList.remove(className);
}

let bgCols = ['light', 'light', 'dark', 'dark'];

let titleCols = ['black', 'black', 'white', 'white'];

let titles = ["Castle Ruins", "Larry Layers", "Twenty-One Helices", "Untitled (Black, Black, Bl...)"];

let blurbs = [
    `This prompt made me think of drawings composed of only vertical lines. Snooping around the web, I found <a target="_blank" href="https://scontent-syd2-1.cdninstagram.com/v/t39.30808-6/449775586_17982303353693950_1649366445359233739_n.jpg?stp=dst-jpg_e15_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTUuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-syd2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=uxFHuyjB3fwQ7kNvgFtOasu&_nc_gid=22dccbc30fb347adad556d8c977a07fa&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwNDYzMTc5NTg4NDcyOTc4Mg%3D%3D.3-ccb7-5&oh=00_AYB2DXKJg13vTtopCl8r_A10M_RPHEwfQYk0_p7RfPGUNg&oe=6778AC8D&_nc_sid=10d13b">a cool drawing</a> by <a target="_blank" href="https://www.threads.net/@jimmywongstudio">Jimmy Wong</a>.<br><br>I went for a more simplified approach to textures, but tried to capture the general gist of his composition. Click on the sketch to generate a new, random iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2"> https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2</a>`,
    `Having just returned from a month long trip to the cold and dreary UK (it was lovely), this prompt brought rugging-up-for-the-winter to mind.<br><br>Perhaps not the most appropriate clothing choices for winter, you can add layers to Larry here by clicking on his legs, torso, or head (and remove by right-clicking). If you exit and re-enter this page, he will also likely have a different hair-do and flesh tone.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj">https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj</a>`,
    `This one is quite self-explanatory. Forty-two polynucleotide strands. Twenty-one strands of DNA floatin' around.<br><br>But this was no cop-out! The source code is exactly 42 lines long!<br><br>Look-a here:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/MTldScyPC">https://editor.p5js.org/jacarooney/sketches/MTldScyPC</a>`,
    `"I would like to say to those who think of my pictures as serene, whether in friendship or mere observation, that I have imprisoned the most utter violence in every inch of their surface." ― Mark Rothko<br><br>I don't think my code is imbuing it's output with utter violence...<br><br>
...gee, I sure hope it isn't.<br><br>Anyways, this one was obviously inspired by Rothko. Click the canvas to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/qoDUv6USR">https://editor.p5js.org/jacarooney/sketches/qoDUv6USR</a>`,
]


function goDark(){
    root.style.setProperty('--bg', 'rgb(22,24,24)');
    root.style.setProperty('--boxbg', 'oldlace');
    root.style.setProperty('--txt', 'black');
    root.style.setProperty('--h1', 'white');
    root.style.setProperty('--pop', 'rgb(126, 183, 248)');
    root.style.setProperty('--antipop', 'rgb(255, 166, 0)');
}

function goLight(){
    root.style.setProperty('--bg', 'antiquewhite');
    root.style.setProperty('--boxbg', 'whitesmoke');
    root.style.setProperty('--txt', 'black');
    root.style.setProperty('--h1', 'black');
    root.style.setProperty('--pop', 'rgb(255, 166, 0)');
    root.style.setProperty('--antipop', 'rgb(126, 183, 248)');
}

function lightDarkToggle() {
    if (document.getElementById('darkmode-toggle').checked){
        goDark();
        localStorage.setItem("theme", "dark");
        darkMode = true;
    } else {
        goLight();
        darkMode = false;
        localStorage.setItem("theme", "light");
    }
}


var darkMode = false;

detectColorScheme();

function detectColorScheme(){

    //default is set to light mode
    var theme="light"; 
  
      //local storage is used to override OS theme settings
      if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
          var theme = "dark";
              }
          } 
        else if(!window.matchMedia) {
          // matchMedia method not supported
          return false;
        } 
        else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
          //OS theme setting detected as dark
          var theme = "dark";
        }
  
          // if dark theme is preferred, set document with a `data-theme==dark` attribute
        if (theme=="dark") {
            goDark();
            document.getElementById("darkmode-toggle").checked = true;
        } else {
            goLight();
            document.getElementById("darkmode-toggle").checked = false;
        }
}

function goCanvas(i){
    document.getElementById("prompt").innerText = this.innerText;
    document.getElementById("title").innerText = titles[i];
    document.getElementById("title").style.color = titleCols[i];
    document.getElementById("blurb").innerHTML = blurbs[i];
    location.hash = 'gen'+(i+1);

    if (bgCols[i] == 'light'){
        goLight();
    } else {
        goDark();
    }

    window.scrollTo(0, 0);

    moveDiv("wrapper", -100);

    document.getElementById("frame").style.opacity = "100%";
    document.getElementById("frame").style.transitionDuration = "3s";
    document.getElementById("frame").src = "Sketches/gen"+(i+1)+"/index.html";
}

var urlHash = location.hash;
var currentDay = 1;

if (urlHash && urlHash != '#home'){
    let num = urlHash.slice(-1);
    if (num <= currentDay){
        goCanvas(num-1);
    }
}

for (let i = 0; i < listItems.length; i++){
    listItems[i].onclick = function(e) {
        goCanvas(i);
    }
}
