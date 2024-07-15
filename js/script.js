let CANVAS_WIDTH = 600; //window.innerWidth - 50;
let CANVAS_HEIGHT = 600; //window.innerHeight - 50;

let canvas, ctx;

let x = Math.floor(CANVAS_WIDTH / 2);
let y = Math.floor(CANVAS_HEIGHT / 2);

let step = 1;
let stepSize = 5;
let numSteps = 1;
let state = 0;
let turnCounter = 1;

let diameter = document.getElementById("rozmiarKropki").value;

console.log(diameter);

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
  ctx.font = "10px Arial";
  ctx.fillStyle = "clack";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, diameter, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  if (num <= 3) {
    return true;
  }
  if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

const timeoutMyLoop = setTimeout(myLoop,3000);

function myLoop() {
    if (isPrime(step)) {
      drawCircle(x, y);
    }

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
    if (step <= CANVAS_WIDTH * CANVAS_WIDTH) {
      myLoop();
    }
  };

window.addEventListener("load", () => {
  initializeCanvas();
  //setupText();
  myLoop();

  
});

const myButton = document.getElementById("przeslij");
myButton.addEventListener("click", () => {
  clearTimeout(timeoutMyLoop);
  //initializeCanvas();
  myLoop();
});
  