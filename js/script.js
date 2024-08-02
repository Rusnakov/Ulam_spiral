// Konfiguracja
const config = {
  canvasId: "myCanvas",
  contentDivId: "content",
  radiusInputId: "promienKropki",
  distanceInputId: "odstepKropki",
  animationCheckboxId: "animation",
  statusElementId: "status",
};

// Klasa Canvas
class Canvas {
  constructor(config) {
    this.canvas = document.getElementById(config.canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.contentDiv = document.getElementById(config.contentDivId);
    this.setCanvasSize();
    window.addEventListener("resize", () => this.handleResize());
  }

  setCanvasSize() {
    this.canvas.width = this.contentDiv.clientWidth;
    this.canvas.height = this.contentDiv.clientHeight;
  }

  handleResize() {
    this.setCanvasSize();
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  }
}

// Klasa Spiral
class Spiral {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.reset();
  }

  reset() {
    this.radius = parseInt(
      document.getElementById(this.config.radiusInputId).value
    );
    this.distance = parseInt(
      document.getElementById(this.config.distanceInputId).value
    );
    this.x = Math.floor(this.canvas.canvas.width / 2);
    this.y = Math.floor(this.canvas.canvas.height / 2);
    this.step = 1;
    this.numSteps = 1;
    this.state = 0;
    this.turnCounter = 1;
    this.stepSize = 2 * this.radius + this.distance;
  }

  isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  moveNext() {
    if (this.isPrime(this.step)) {
      this.canvas.drawCircle(this.x, this.y, this.radius);
    }

    switch (this.state) {
      case 0:
        this.x += this.stepSize;
        break;
      case 1:
        this.y -= this.stepSize;
        break;
      case 2:
        this.x -= this.stepSize;
        break;
      case 3:
        this.y += this.stepSize;
        break;
    }

    if (this.step % this.numSteps === 0) {
      this.state = (this.state + 1) % 4;
      this.turnCounter++;
      if (this.turnCounter % 2 === 0) {
        this.numSteps++;
      }
    }
    this.step++;
  }

  draw() {
    this.reset();
    while (this.step <= this.canvas.canvas.width * this.canvas.canvas.height) {
      this.moveNext();
    }
  }

  animate() {
    this.reset();
    const animationStep = () => {
      this.moveNext();
      if (this.step <= this.canvas.canvas.height * this.canvas.canvas.height) {
        setTimeout(animationStep, 20);
      }
    };
    animationStep();
  }
}

// Klasa App
class App {
  constructor(config) {
    this.config = config;
    this.canvas = new Canvas(config);
    this.spiral = new Spiral(this.canvas, config);
    this.setupEventListeners();
  }

  setupEventListeners() {
    const checkbox = document.getElementById(this.config.animationCheckboxId);
    checkbox.addEventListener("change", () => this.handleAnimationToggle());

    document
      .getElementById(this.config.radiusInputId)
      .addEventListener("change", () => this.redraw());
    document
      .getElementById(this.config.distanceInputId)
      .addEventListener("change", () => this.redraw());

    window.addEventListener("resize", () => this.spiral.reset());
  }

  handleAnimationToggle() {
    this.canvas.clear();
    if (document.getElementById(this.config.animationCheckboxId).checked) {
      this.spiral.animate();
    } else {
      this.spiral.draw();
    }
  }

  redraw() {
    this.canvas.clear();
    if (document.getElementById(this.config.animationCheckboxId).checked) {
      this.spiral.animate();
    } else {
      this.spiral.draw();
    }
  }

  init() {
    const animationCheckbox = document.getElementById(
      this.config.animationCheckboxId
    );
    if (animationCheckbox.checked) {
      this.spiral.animate();
    } else {
      this.spiral.draw();
    }
  }
}

// Inicjalizacja aplikacji
window.addEventListener("load", () => {
  const app = new App(config);
  app.init();
});
