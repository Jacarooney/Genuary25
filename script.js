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

let bgCols = ['light', 'light', 'dark', 'dark', 'dark', 'light', 'light', 'light', 'light', 'dark', 'dark', 'dark', 'dark', 'dark', 'dark', 'light', 
            'light', 'light', 'light', 'light', 'dark', 'dark', 'light', 'light', 'dark', 'dark', 'light', 'dark', 'dark', '', ''
];

let titleCols = ['black', 'black', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'white', 'white', 'white', 'black',
            'black', 'black', 'black', 'black', 'white', 'white', 'black', 'black', 'white', 'white', 'black', 'white', 'white', '', ''
];

let titles = ["Castle Ruins", "Larry Layers", "Twenty-One Helices", "Untitled (Black, Black, Bl...)", "Undecidable Figures", "Fridge Fodder", "Piano Roll Printer", "Porpoise Portraits", "Train Noise", "Tau Since 1982","Jug","Check It", "Game of Trife", "Hither and Dither", "Pixel Persian Rugs", 
              "Gummy Worms", "Non-Euclidean Pi", "Left Hanging", "Get Your Blaze On", "Small Plans", 
              "Deformities", "Ten Lights", "Musée Concréte", "Compositions in Red, Blue, and Yellow", "Doodle Stars", 
              "Anadromic Squares", "LeWitt's Walls", "Drostetubbies", "Grid-o-matic", "", "" 
];

let blurbs = [
    `This prompt made me think of drawings composed of only vertical lines. Snooping around the web, I found <a target="_blank" href="https://scontent-syd2-1.cdninstagram.com/v/t39.30808-6/449775586_17982303353693950_1649366445359233739_n.jpg?stp=dst-jpg_e15_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTUuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-syd2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=uxFHuyjB3fwQ7kNvgFtOasu&_nc_gid=22dccbc30fb347adad556d8c977a07fa&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwNDYzMTc5NTg4NDcyOTc4Mg%3D%3D.3-ccb7-5&oh=00_AYB2DXKJg13vTtopCl8r_A10M_RPHEwfQYk0_p7RfPGUNg&oe=6778AC8D&_nc_sid=10d13b">a cool drawing</a> by <a target="_blank" href="https://www.threads.net/@jimmywongstudio">Jimmy Wong</a>.<br><br>I went for a more simplified approach to textures, but tried to capture the general gist of his composition. Click on the sketch to generate a new, random iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2"> https://editor.p5js.org/jacarooney/sketches/ya5qZ8Ud2</a>`,
    `Having just returned from a month long trip to the cold and dreary UK (it was lovely), this prompt brought rugging-up-for-the-winter to mind.<br><br>Perhaps not the most appropriate clothing choices for winter, you can add layers to Larry here by clicking on his legs, torso, or head (and remove by right-clicking). If you exit and re-enter this page, he will also likely have a different hair-do and flesh tone.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj">https://editor.p5js.org/jacarooney/sketches/ytdyyEAcj</a>`,
    `This one is quite self-explanatory. Forty-two polynucleotide strands. Twenty-one helices of DNA floatin' around.<br><br>But this was no cop-out! The source code is exactly 42 lines long!<br><br>Look-a here:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/MTldScyPC">https://editor.p5js.org/jacarooney/sketches/MTldScyPC</a>`,
    `"I would like to say to those who think of my pictures as serene, whether in friendship or mere observation, that I have imprisoned the most utter violence in every inch of their surface." ― Mark Rothko<br><br>I don't think my code is imbuing it's output with utter violence...<br><br>
...gee, I sure hope it isn't.<br><br>Anyways, this one was obviously inspired by Rothko. Click the canvas to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/qoDUv6USR">https://editor.p5js.org/jacarooney/sketches/qoDUv6USR</a>`,
    `Thus far, this sketch has given me the most grief. Not satisfied with a simple <a target="_blank" href="https://en.wikipedia.org/wiki/Penrose_triangle">Penrose triangle</a>-style generator, I wanted to work out how to make shapes similar to <a target="_blank" href="https://www.youtube.com/shorts/b7IVgNh5PeU?app=desktop">this.</a><br><br>Using a hexagonal grid, an algorithm to generate the pattern for each face, and the oh-so-terrible columns that weave in and out of the faces (creating the illusion), I've landed on something I'm happy with!<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/B0vIRop39">https://editor.p5js.org/jacarooney/sketches/B0vIRop39</a>`,
    `Thinking of artworks which use primitive shapes, I searched for some children's drawings and came across <a target="_blank" href="https://artprojectsforkids.org/wp-content/uploads/2022/09/Draw-an-Easy-Landscape.jpg">this</a>.<br><br>I recreated it with primitive shapes, replacing the clouds with (a much simpler) sun. I then parameterised each element of the composition... and it looked quite bad.<br><br>Perhaps not in the spirit of the prompt, I overlaid an image for texture, and used some SVG turbulence to give the sketch a hand-drawn feel.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/uZ-hcSsjZ">https://editor.p5js.org/jacarooney/sketches/uZ-hcSsjZ</a>`,
    `Inspired by <a target="_blank" href="https://www.youtube.com/watch?v=G2hR0JtLYIc">GLASYS</a> and the many that have come before him. I wanted to give piano roll art a try... but why put in all the work figuring out how to make MIDI drawings sound good when I can make the computer do it for me?<br><br>This sketch works by scanning the points that make up the characters in five-letter words, converting them to MIDI, and sending them out to your computer's MIDI bus. To hear it in action, you will need to open up a program that accepts MIDI input. I'd recommend opening <a target="_blank" href="https://midi.city">midi.city</a> in another tab, and choosing a sound you like!<br><br>You can also see it in action in my instagram <a target="_blank" href="midi.city>post</a>.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/QQYjWEVH5">https://editor.p5js.org/jacarooney/sketches/QQYjWEVH5</a>`,
    `This prompt made me ponder what might there be a million of? I searched Wikipedia's list of species by population size and whittled my options down to the <a target="_blank" href="https://en.wikipedia.org/wiki/Guanaco">Guanaco</a> (similar to a Llama), and the <a target="_blank" href="https://en.wikipedia.org/wiki/Pacific_white-sided_dolphin">Pacific White-Sided Dolphin</a>. On further research, estimates of the Guanaco population exceed two-million, so I settled with the Dolphin.<br><br>Hover around to see a closer-up portrait of each dolphin, along with their (totally legitimate) full-name, and id number.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/dcEjP9a2e">https://editor.p5js.org/jacarooney/sketches/dcEjP9a2e</a>`,
    `For this prompt, I've recreated the seat pattern found on <a target="_blank" href="https://ih1.redbubble.net/image.2807633287.0514/flat,750x,075,f-pad,750x1000,f8f8f8.jpg">Sydney Trains</a>.<br><br>Quite simply, I've just recreated the palette, and mapped noise with different thresholds for the different colours.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/hdq27cuB7">https://editor.p5js.org/jacarooney/sketches/hdq27cuB7</a>`,
    `For a subversive take on this prompt, I decided to make a digital clock display inspired by <a target="_blank" href="https://www.humanssince1982.com/en-int/products/a-million-times-120-black">Humans since 1982</a>. You will find no numerals in my code (except for the '2' in the atan2() function)...<br><br>You will also find that I have simply (cheekily?) derived zero-ten using TAU, and given these variables (numbers) silly names.<br><br>Click to switch between an interesting pattern and telling the current time. The time will always display when a minute ticks over.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/LpQIr6FNE">https://editor.p5js.org/jacarooney/sketches/LpQIr6FNE</a>`,
    `I've wanted to try <a target="_blank" href="https://en.wikipedia.org/wiki/Digital_waveguide_synthesis">Waveguide Synthesis</a> for quite some time. This was my opportunity to cram my first attempt into a day. I followed <a target="_blank" href="https://www.osar.fr/notes/waveguides/">Pierre Cusa's</a> incredible explainer, but couldn't manage to implement multiple steps using <a target="_blank" href="https://tonejs.github.io/">Tone.js</a>, especially on limited time. Instead of a flute or recorder, as planned, I offer you this jug (which sounds more EDM than Jug Band...).<br><br>I'd recommend tweaking the delay variable, as that will change the pitch. Reading Cusa's article will help you understand the other parameters if you so wish.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/KiY-dlm8D">https://editor.p5js.org/jacarooney/sketches/KiY-dlm8D</a>`,
    `Originally, I wanted to make an unevenly subdividing chess board with moving pieces... but was short on time. Pretty simple, this one.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/GivRl2nKc">https://editor.p5js.org/jacarooney/sketches/GivRl2nKc</a>`,
    `I'd never tried to implement <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> on a non-rectangular grid. Thus... here we are.<br><br>Thanks to <a target="_blank" href="https://www.youtube.com/watch?v=VOQrDh6AvYQ&ab_channel=ChaseMarangu">Chase Marangu</a>, I had some rules I'd know would get interesting results (S:4,5,6 B:4,8). And also to <a target="_blank" href="https://www.boristhebrave.com/2021/05/23/triangle-grids/">Boris The Brave</a> for a very helpful write-up on implementing triangular grids!<br><br>Keyboard controls are listed on the screen; click to toggle cells.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/CPoHNwA-r">https://editor.p5js.org/jacarooney/sketches/CPoHNwA-r</a>`,
    `I've repurposed some old code for this one. A student... 5 or so years ago was trying to achieve a similar effect.<br><br>Move the mouse across the screen and the white dots coalesce into "BLACK" or "WHITE"... not grey/gray.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/l8oYyJyUd">https://editor.p5js.org/jacarooney/sketches/l8oYyJyUd</a>`,
    `Here, I've attempted to use the <a target="_blank" href="https://www.youtube.com/watch?v=diGjw5tghYU">Abelian Sandpile Model</a> to mimic the beautiful symmetrical patterns found in/on <a target="_blank" href="https://www.rugart.com.au/wp-content/uploads/2021/12/persian1.jpg">Persian Rugs</a>.<br><br>I've missed the mark, as I'm not happy with how I've programmed the colours... and sometimes the sandpiles don't propagate all the way to the edges.<br><br>Click to generate a new iteration<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/aoW0QM1R-">https://editor.p5js.org/jacarooney/sketches/aoW0QM1R-</a>`,
    `Searching for generative colour palette inspiration, I came across this article by <a target="_blank" href="https://sam-tsao.medium.com/3-levels-of-generative-colors-b43bd0d6d609">Sam Tsao</a>. They implement their own version of Quayola's <a target="_blank" href="https://vimeo.com/457234035">Transient</a>. They also discuss <a target="_blank" href="https://iquilezles.org/articles/palettes/">Inigo Quilez's</a> trigonometric approach to colour palettes.<br><br>I have simply combined these ideas. Click the canvas to reset, or the gradient strip to change the palette.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/Ee6TMtp4h">https://editor.p5js.org/jacarooney/sketches/Ee6TMtp4h</a>`,
    `For this prompt, I wanted to show that Pi (if you consider it to be the ratio of a circle's circumference to its diameter) is not constant in non-euclidean space.<br><br>I don't usually do 3D, so I couldn't really figure out a good approach to make the diameter (orange torus) vary with the circumference (blue). I also considered representing hyperbolic space... but then I considered my sanity.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/oEnr9Y23K">https://editor.p5js.org/jacarooney/sketches/oEnr9Y23K</a>`,
    `What better to show the wind than clothes on a line?<br><br>For this sketch, I repurposed my first attempt at <a target="_blank" href="https://en.wikipedia.org/wiki/Verlet_integration">Verlet Simulation</a>. It was hard to find a nice balance where the clothes both retained shape, but had plenty of give. You can certainly 'break' the shapes... but that's all part of the fun.<br><br>Moving the mouse to the right adds more wind. Clicking rehangs the line.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/V8yHyAYd8">https://editor.p5js.org/jacarooney/sketches/V8yHyAYd8</a>`,
    `Looking at notable Op Artists for inspiration, I came across <a target="_blank" href="https://www.wikiart.org/en/bridget-riley/blaze-1-1962">Bridget Riley</a> (whose work I was already familiar with, or at least art influenced by her art). Her <a target="_blank" href="https://www.wikiart.org/en/bridget-riley/blaze-study-1962">'Blaze'</a> artworks seemed to be very fitting for digitisation.<br><br>She preferred to put a 'hole' at the centre of her spirals... but I think Op Artists would enjoy the weird aliasing that occurs in my version.<br><br>Move the mouse to move the spirals. Click for a new spiral.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/HZLANkO6g">https://editor.p5js.org/jacarooney/sketches/HZLANkO6g</a>`,
    `When I get the itch to make something generative and need some inspiration (or just want to practice my skills), I often go to <a target="_blank" href="https://inconvergent.net/">Anders Hoff's website</a>.<br><br>This prompt was the perfect opportunity to try to recreate one of his sketches I've had my eye on: <a target="_blank" href="https://inconvergent.net/app/impossible-architecture/">Impossible Architecture</a>. Lucky for me, he also has a <a target="_blank" href="https://inconvergent.net/2018/impossible-architecture">write-up</a> on his approach!<br><br>Starting with a square, lines will lerp outward with a chance of incorporating a feature (circle/thick line/row of lines). Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/5_KTn1Ed-">https://editor.p5js.org/jacarooney/sketches/5_KTn1Ed-</a>`,
    `This sketch was inspired by <a target="_blank" href="https://x.com/kusakarism/status/1791845845203382491">Kusakari's work</a>. In contrast to Prompt 20, I wanted to avoid reading/following any materials/tutorials to try and achieve a similar result. Thus, I have this weird and inaccurate collision/deformation system.<br><br>Rectangles are constructed with circles. These circles are repulsed by one another, but are elastically connected to orthogonal neighbours.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/yeD56D3_p">https://editor.p5js.org/jacarooney/sketches/yeD56D3_p</a>`,
    `This sketch is inspired by <a target="_blank" href="https://www.artnet.com/artists/leon-berkowitz/">Leon Berkowitz's</a> artworks. He'd paint beautiful gradients, often in the form of other-worldly orbs, seeming to float across the canvas, bleeding into one-another.<br><br>I've tried to get a similar effect by using randomly distributed points within ellipses, that shift colour and shape as they move, slowly revealing the 'painting'.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/GatVdncHG">https://editor.p5js.org/jacarooney/sketches/GatVdncHG</a>`,
    `This sketch joins boxy, Brutalist-inspired modules on a grid according to some basic rules.<br><br>Click to generate a new iteration.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/vE5rhx9Jy">https://editor.p5js.org/jacarooney/sketches/vE5rhx9Jy</a>`,
    `Although well-trodden territory by generative artists, I wanted to have a go at recreating <a target="_blank" href="https://upload.wikimedia.org/wikipedia/commons/c/c3/Composition_A_by_Piet_Mondrian_Galleria_Nazionale_d%27Arte_Moderna_e_Contemporanea.jpg">Mondrian's famous compositions</a>. My approach is to have one rectangle traverse the canvas, interpolating to a new colour and new dimensions, placing copies of itself until a composition is complete.<br><br>Click the canvas at any time to restart the process.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/LXkEemFzw">https://editor.p5js.org/jacarooney/sketches/LXkEemFzw</a>`,
    `A continuous line roughly traces out (then un-traces) some stars... and again... forever.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/9TLQd4RuG">https://editor.p5js.org/jacarooney/sketches/9TLQd4RuG</a>`,
    `Originally, this prompt got me thinking about crosswords, as they are traditionally set on <a target="_blank" href="https://en.wikipedia.org/wiki/Crossword">symmetric grids</a>. However, making a crossword generator (with words and clues) was obviously too much work for a day.<br><br>Instead, I have taken inspiration from the <a target="_blank" href="https://en.wikipedia.org/wiki/Sator_Square">Sator Square</a>, and have made a Word Square generator using all valid 4-letter anadromes (words that work both forward and backward).<br><br>Click to reset the grid.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/rmJTR2AAr">https://editor.p5js.org/jacarooney/sketches/rmJTR2AAr</a>`,
    `One of the courses I teach includes a challenge for students to implement one of <a target="_blank" href="https://en.wikipedia.org/wiki/Sol_LeWitt">Sol LeWitt's</a> Wall Drawings. These are artworks that LeWitt would not necessarily 'complete' himself, but instead supplied a set of instructions for. These instructions could/can then be carried out by whoever (often those working at galleries that have procured his instructions).<br><br>I have implemented Wall Drawings <a target="_blank" href="https://massmoca.org/event/walldrawing16/">#16</a>, <a target="_blank" href="https://massmoca.org/event/walldrawing138/">#138</a> & <a target="_blank" href="https://massmoca.org/event/walldrawing340/">#340</a>. I had some others I wanted to attempt, but the restriction on trigonometry made them extremely hard (and unsatisfying).<br><br>Click and hold to see each artwork's title and instructions.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/XP1PrTXob">https://editor.p5js.org/jacarooney/sketches/XP1PrTXob</a>`,
    `I wanted to implement the <a target="_blank" href="https://en.wikipedia.org/wiki/Droste_effect">Droste Effect</a>, but wasn't sure what my subject would be. I started with the idea of t-shirts with randomly generated people wearing t-shirts with randomly generated people wearing t-shirts with... But then I noticed the screen-on-belly similarity to <a target="_blank" href="https://en.wikipedia.org/wiki/Teletubbies">Teletubbies</a> and decided to make some unsettling rip-off tubbies.<br><br>Scroll to zoom... forever.<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/A-oHQRB0e">https://editor.p5js.org/jacarooney/sketches/A-oHQRB0e</a>`,
    `This prompt immediately made me think of typographic grids, as my partner is a highly skilled graphic designer. I, however, am not. Thus, I am very grateful for her help in discussing possible approaches!<br><br>I've ended up implemented a two-page spread that showcases my other Genuary sketches from this year (albeit, extremely small and barely functional!). The program tries to balance the elements (canvas, title, prompt, body text). It's not perfect, but it's something.<br><br>Click the page to generate a new spread. Press the 'g' key to show/hide the grid. Mini-sketches are still interactive!<br><br>Source code:<br><a target="_blank" href="https://editor.p5js.org/jacarooney/sketches/raVVZYCe9">https://editor.p5js.org/jacarooney/sketches/raVVZYCe9</a>`,
    ``,
    ``
]

let prompts = [
    "Vertical or horizontal lines only.",
    "Layers upon layers upon layers.",
    "Exactly 42 lines of code.",
    "Black on black.",
    "Isometric Art - (No vanishing points).",
    "Make a landscape using only primitive shapes.",
    "Use software that is not intended to create art or images.",
    "Draw one million of something.",
    "The textile design patterns of public transport seating.",
    "You can only use TAU in your code, no other number allowed.",
    "Impossible day - Try to do something that feels impossible for you to do...",
    "Subdivision.",
    "Triangles and nothing else.",
    "Pure black and white. No gray.",
    "Design a rug.",
    "Generative palette.",
    "What happens if pi=4?",
    "What does wind look like?",
    "Op Art.",
    "Generative Architecture.",
    "Create a collision detection system (no libraries allowed).",
    "Gradients only.",
    "Inspired by brutalism.",
    "Geometric art - only use either a circle, rectangle, or triangle.",
    "One line that may or may not intersect itself",
    "Symmetry.",
    "Make something interesting with no randomness or noise or trig.",
    "Infinite Scroll.",
    "Grid-based graphic design.",
    "Abstract map.",
    "Pixel sorting."]


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
    document.getElementById("prompt").innerText = prompts[i];
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
var currentDay = document.getElementsByClassName("active").length;

if (urlHash && urlHash != '#home'){
    let num = urlHash.split('n')[1];
    if (num <= currentDay){
        goCanvas(num-1);
    }
}

for (let i = 0; i < listItems.length; i++){
    listItems[i].onclick = function(e) {
        goCanvas(i);
    }
}
