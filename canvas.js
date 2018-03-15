const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const width = c.width;
const height = c.height;

let stepX = 5; //Initial value: 25 ... increment for which X values will change
let stepY = 0.5; //Initial value: .75 ... increment for which X values will change
let x = width / 2, //Initial x value at center stage
    y = (height / 2) - 50; //Initial y value at center stage

let PHI = (1 + Math.sqrt(5)) / 2; //Defining PHI

//Canvas setup



var colors = ["AntiqueWhite", "Beige", "Bisque", "BlanchedAlmond", "Brown", "BurlyWood", "CadetBlue", "Chocolate", "Cornsilk", "Crimson", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkOliveGreen", "Darkorange", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateGray", "DarkSlateGrey", "DarkViolet", "DeepPink", "DimGray", "DimGrey", "FireBrick", "FloralWhite", "ForestGreen", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LemonChiffon", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightSalmon", "LightSeaGreen", "LightSlateGray", "LightSlateGrey", "LightYellow", "Linen", "Maroon", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
ctx.beginPath()
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]

//The meat and potatoes
function goldenRotation(num) {

    ctx.moveTo(x, y); //begin drawing from the start XY values ... REMOVE PHI TO REVERT TO ORIGINAL
    ctx.lineTo(x + num * num, y); //You can play around with this to change up the pattern 

    x -= stepX / 2; //increment x (originally -)
    y += stepY; //increment y (originially +)

    ctx.translate((canvas.width), (canvas.height) / 2); //rotate around a center point
    ctx.rotate((Math.PI * PHI) * .5); //circular rotation by the golden number
    ctx.lineWidth = .008;

    ctx.stroke(); //render to canvas
    ctx.closePath();
    // ctx.font = '80px courier';
    // ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    // ctx.fillText('hello world', width / 2, height / 2);

    if (x > width * 2 || y > height * 2) { //if image has filled the frame, stop drawing and do stuff
        // clearInterval(myTimer);
        ctx.resetTransform();
        window.cancelAnimationFrame(myReq);
        // $('#canvas').fadeOut(5000)
    }
    myReq = window.requestAnimationFrame(function() {
        goldenRotation(num)
    });
}

//Could make this recursive instead of iterated by a timer.

goldenRotation(100)