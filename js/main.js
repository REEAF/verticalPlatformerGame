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
