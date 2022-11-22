const $canvas = document.querySelector("canvas");
const c = $canvas.getContext("2d");
//set canvas size
cWidth = $canvas.width = 1024;
cHeigth = $canvas.height = 576;

const gravity = 0.5;
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
//ser player class
class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
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
    if (this.position.y + this.height + this.velocity.y < cHeigth)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
  move() {
    this.velocity.x = 0
    if(keys.d.pressed)this.velocity.x = 5
    else if(keys.a.pressed)this.velocity.x = -5
    this.position.x += this.velocity.x;
  }
  update() {
    this.gravity();
    this.move();
    this.draw();
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
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
    case "KeyW":
      player.velocity.y = -15;
      break;
      case "Space":
      player.velocity.y = -15;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
  }
});
