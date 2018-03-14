const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const width = c.width;
const height = c.height;

let stepX = 5; //Initial value: 25 ... increment for which X values will change
let stepY = 1; //Initial value: .75 ... increment for which X values will change
let x = width / 2, //Initial x value at center stage
    y = (height / 2) - 50; //Initial y value at center stage

let PHI = (1 + Math.sqrt(5)) / 2; //Defining PHI

//Canvas setup
ctx.beginPath()
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = .0065;

//Optional colors for text if you like
let colors = ['#ff77aa', '#aaff77', '#77aaff', '#ffffff', '#000000'];

//The meat and potatoes
function goldenRotation(num) {

    ctx.moveTo(x / PHI, y / PHI); //begin drawing from the start XY values ... REMOVE PHI TO REVERT TO ORIGINAL
    ctx.lineTo(x + (num * (num / 2)), y); //You can play around with this to change up the pattern 

    x -= stepX; //increment x
    y += stepY //increment y

    ctx.translate((canvas.width), (canvas.height) / 2); //rotate around a center point
    ctx.rotate((Math.PI * PHI) * .5); //circular rotation by the golden number
    ctx.stroke(); //render to canvas

    // ctx.font = '80px courier';
    // ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    // ctx.fillText('hello world', width / 2, height / 2);

    if (x > width || y > height) { //if image has filled the frame, stop drawing and do stuff
        clearInterval(myTimer);
        ctx.resetTransform();
        window.cancelAnimationFrame(myReq);
        // $('#canvas').fadeOut(5000)
    }
    myReq = window.requestAnimationFrame(function() { goldenRotation(num) });
}

//Could make this recursive instead of iterated by a timer.

goldenRotation(100)