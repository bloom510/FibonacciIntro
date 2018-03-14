/* 
The following code allows the user (so far, the programmer) to
instantiate a Scene class, which is an entity representing a drawing with unique parameters.
The draw function takes a Scene as an argument and renders it to the canvas.

Here are some parameters to try out just to get a feel for it:
*************************************
Horizontal lines:
StepX = 0;
StepY = 10;
offsetX = 0;
offsetY = 0;

Triangle outline:
StepX = 2.5;
StepY = 5;
offsetX = 5;
offsetY = 0;

Mandala (tweak for variations):
phi = true;
stepX = 5;
stepY = 1;
offsetX = num * (num / 2)
offsetY = 0;

Definitions:
x: starting X coord
y: starting Y coord
phi: The golden number. 
lineWidth: sets the line width for the drawing
offsetX: affects line length
offsetY: affects the direction the lines points
incX / incY: default is 0, will be used to increment offsetX/Y to add more variability to the mix
*************************************
*/
const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

// //Canvas setup
ctx.lineJoin = "round";
ctx.lineCap = "round";
c.width = 550;
c.height = 400;

const width = c.width;
const height = c.height;
const PHI = (1 + Math.sqrt(5)) / 2;
let hist = false;

class Scene {
    constructor(stepX, stepY, x, y, offsetX, offsetY, lineWidth, incX, incY, phi) {
        this.stepX = stepX;
        this.stepY = stepY;
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.incX = incX;
        this.incY = incY;
        this.lineWidth = lineWidth;
        this.phi = phi;
    }
}
let draw = (scene) => {
    //for each new scene, clear the canvas
    if (hist) {
        ctx.clearRect(0, 0, width, height);
        hist = false;
    }
    //config for origin point
    ctx.beginPath();
    ctx.moveTo(scene.x - scene.offsetX, scene.y);
    ctx.lineWidth = scene.lineWidth;
    ctx.lineTo(scene.x + scene.offsetX, scene.y);

    //config for generative outcomes
    scene.x -= scene.stepX;
    scene.y += scene.stepY;
    // scene.offsetX++;
    //+= incX, finish later
    // offsetY += incY;

    //If enabled, use the golden number
    if (scene.phi) {
        //rotate around a center point
        ctx.translate((canvas.width), (canvas.height) / 2);
        //circular rotation by the golden number
        ctx.rotate((Math.PI * PHI) * .5);
    }

    ctx.stroke();

    let myReq = window.requestAnimationFrame(function() {
        draw(scene);
    });

    //if image has filled the frame, stop drawing and do stuff
    if (scene.x > width || scene.y > height) {
        alert('done')
        cancelAnimationFrame(myReq);
        hist = true;
        return;
    }

}