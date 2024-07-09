let CANVAS_WIDTH = window.innerWidth - 50;
let CANVAS_HEIGHT = window.innerHeight - 50;

let canvas, ctx;

let x = Math.floor(CANVAS_WIDTH / 2);
let y = Math.floor(CANVAS_HEIGHT / 2);

let step = 1;
let stepSize = 50;
let numSteps = 1;
let state = 0;
let turnCounter = 1;

const cols = Math.floor(CANVAS_WIDTH);
const rows = Math.floor(CANVAS_HEIGHT);

function initializeCanvas() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();
}

function resizeCanvas() {
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;
}

function setupText() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "clack";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

function drawText() {
  for (let i = 1; i <= 121; i++) {
    ctx.fillText(step, x, y);

    switch (state) {
      case 0: {
        x += stepSize;
        break;
      }
      case 1: {
        y -= stepSize;
        break;
      }
      case 2: {
        x -= stepSize;
        break;
      }
      case 3: {
        y += stepSize;
        break;
      }
    }
    
    if (step % numSteps === 0) {
      state = (state + 1) % 4;
      turnCounter++;
      if (turnCounter % 2 === 0) {
        numSteps++;
      }
    }
    step++;

    console.log(
      step,
      "numSteps = " + numSteps,
      "tC = " + turnCounter,
      "state = " + state
    );
  }
}

window.addEventListener("load", () => {
  initializeCanvas();
  setupText();
  drawText();
});
