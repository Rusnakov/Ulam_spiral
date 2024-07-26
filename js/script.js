let CANVAS_WIDTH = 0;
let CANVAS_HEIGHT = 0;

//console.log(canvas.width, canvas.height);

//let x = Math.floor(CANVAS_WIDTH / 2);
//let y = Math.floor(CANVAS_HEIGHT / 2);

let x;
let y;

function initializeCanvas() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  setCanvasSize();
  window.addEventListener("resize", function () {
    setCanvasSize();
    clearCanvas();
    setDraw();
  });

  x = Math.floor(canvas.width / 2);
  y = Math.floor(canvas.height / 2);

  console.log(canvas.width, canvas.height);

  //resizeCanvas();
}

function setCanvasSize() {
  const contentDiv = document.getElementById("content");
  const canvas = document.getElementById("myCanvas");
  canvas.width = contentDiv.clientWidth;
  canvas.height = contentDiv.clientHeight;
  CANVAS_WIDTH=canvas.width;
  CANVAS_HEIGHT=canvas.height;
}

let ctx;
let step = 1;
let stepSize = 5;
let numSteps = 1;
let state = 0;
let turnCounter = 1;
let radius = 2; //Domyślna wartość średnicy kropki

function setupText() {
  ctx.font = "10px Arial";
  ctx.fillStyle = "clack";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
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

function myLoop() {
  setTimeout(function () {
    if (isPrime(step)) {
      //console.log(radius);
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
  }, 0);
}

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

window.addEventListener("load", function () {
  initializeCanvas();
  myLoop();
});

function setDraw() {
  radius = parseInt(document.getElementById("promienKropki").value) || 2;
  x = Math.floor(CANVAS_WIDTH / 2);
  y = Math.floor(CANVAS_HEIGHT / 2);
  step = 1;
  stepSize = 5;
  numSteps = 1;
  state = 0;
  turnCounter = 1;
  clearCanvas();
  console.log(radius);
  myLoop();
}
//myButton.addEventListener("click", () => {
//clearTimeout(timeoutMyLoop);
//initializeCanvas();
