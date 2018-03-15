/* 
The following code allows the user (so far, the programmer) to
instantiate a Scene class, which is an entity representing a drawing with unique parameters.
The draw function takes a Scene as an argument and renders it to the canvas.

NOTE: Currently the form input is not translating into the correct values. 
I've been working on the logic for the most part, so the form will be polished later.
As for now, values are hard coded in on submit.

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
c.width = window.innerWidth - 50;
c.height = window.innerHeight - 50;

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


    /* 
    TODO ? :
   - Find a way for user to specify custom line-plotting
    formula for moveTo and lineTo.
    - Find away for user to provide an increment for offsetX
    */

    //Spiral lotus
    ctx.moveTo(scene.x, scene.y);
    ctx.lineTo((scene.x + Math.pow(scene.offsetX, 2)), scene.y);

    //config for generative outcomes
    scene.x -= scene.stepX / 2;
    scene.y += scene.stepY;


    //If enabled, use the golden number
    if (scene.phi) {

        console.log('phi!')
            //rotate around a center point
        ctx.translate((canvas.width), (canvas.height / 2));
        //circular rotation by the golden number
        ctx.rotate((Math.PI * PHI) * .5);
    }
    ctx.lineWidth = scene.lineWidth;
    ctx.stroke();

    timer = requestAnimationFrame(function() {
        draw(scene)
    })

    //if image has filled the frame, stop drawing and do stuff
    if (scene.x > width * 2 || scene.y > height * 2) {
        ctx.closePath();
        cancelAnimationFrame(timer);
        // ctx.clearRect(0, 0, width, height);
        console.log(scene)
        return;
    }

    $('submit').on('click', function() {
        cancelAnimationFrame(timer);
    })

}