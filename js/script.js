let x;
let y;
let ctx;

let step = 1;
let numSteps = 1;
let state = 0;
let turnCounter = 1;

let radius = parseInt(document.getElementById("promienKropki").value);
let distance = parseInt(document.getElementById("odstepKropki").value);
let stepSize = 2 * radius + distance;

function initializeCanvas() {
  const canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  setCanvasSize();

  window.addEventListener("resize", function () {
    setCanvasSize();
    clearCanvas();
    setDraw();
  });

  x = Math.floor(canvas.width / 2);
  y = Math.floor(canvas.height / 2);
}

function setCanvasSize() {
  const contentDiv = document.getElementById("content");
  canvas = document.getElementById("myCanvas");
  canvas.width = contentDiv.clientWidth;
  canvas.height = contentDiv.clientHeight;
}

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
    if (step <= canvas.height * canvas.height) {
      myLoop();
    }
  }, 0);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("load", function () {
  initializeCanvas();
  myLoop();
});

function setDraw() {
  radius = parseInt(document.getElementById("promienKropki").value);
  distance = parseInt(document.getElementById("odstepKropki").value);
  x = Math.floor(canvas.width / 2);
  y = Math.floor(canvas.height / 2);

  step = 1;
  numSteps = 1;
  state = 0;
  turnCounter = 1;

  stepSize = 2 * radius + distance;
  clearCanvas();
  myLoop();
}
