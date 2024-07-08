let CANVAS_WIDTH = window.innerWidth - 50;
let CANVAS_HEIGHT = window.innerHeight - 50;

let canvas, ctx;

let x = Math.floor(CANVAS_WIDTH / 2);
let y = Math.floor(CANVAS_HEIGHT / 2);
let num = 1;

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

function drawText(text, x, y) {
  ctx.font = "64px Arial";
  ctx.fillStyle = "clack";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

window.addEventListener('load', () => {
  initializeCanvas();
  drawText('1',x,y);
});