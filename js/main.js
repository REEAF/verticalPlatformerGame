const $canvas = document.querySelector("canvas");
const c = $canvas.getContext("2d");
//set canvas size
cWidth = $canvas.width = 1024;
cHeigth = $canvas.height = 576;

const gravity = 0.5;

//ser player class
class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0.5,
    };
    this.height = 100;
    this.width = 100;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  gravity() {
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y< cHeigth) this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
  update() {
    this.draw();
    this.gravity();
  }
}

const player = new Player();

function animation() {
  window.requestAnimationFrame(animation);
  //clear canvas
  c.fillStyle = "#333333";
  c.fillRect(0, 0, cWidth, cHeigth);
  player.update();
}

animation();
