const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

// //Canvas setup
c.width = window.innerWidth / 1.25;
c.height = window.innerHeight / 1.25;

const width = c.width;
const height = c.height;
const PHI = (1 + Math.sqrt(5)) / 2;
let currentFrame;

class Scene {
    constructor(x, y, stepX, stepY, offsetX, offsetY, lineWidth, phi) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.lineWidth = lineWidth;
        this.phi = phi;
    }
}

let draw = (scene, increment) => {
    //config
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = scene.lineWidth;

    ctx.beginPath();

    //increases width of the line with each iteration if true
    if (increment) ctx.moveTo(scene.x - Math.pow(scene.offsetX, 2), scene.y);
    else ctx.moveTo(scene.x, scene.y);

    //draw lines
    ctx.lineTo((scene.x + Math.pow(scene.offsetX, 2)), scene.y + Math.pow(scene.offsetY, 2));

    //config for generative outcomes
    scene.x -= scene.stepX;
    scene.y += scene.stepY;

    if (increment) scene.offsetX += .25;

    //If enabled, use the golden number
    if (scene.phi) {
        //rotate around a center point
        ctx.translate((canvas.width), (canvas.height / 2));
        //circular rotation by the golden number
        ctx.rotate((Math.PI * PHI) * .5);
    }

    ctx.stroke();

    currentFrame = requestAnimationFrame(function() {
        draw(scene, increment)
    })

    //if image has filled the frame, stop drawing and do stuff
    if (scene.x > width || scene.y > height) {
        ctx.closePath();
        cancelAnimationFrame(currentFrame);
        console.log(scene)
        return;
    }


}