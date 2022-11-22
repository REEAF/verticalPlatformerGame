const $canvas = document.querySelector("canvas");
const c = $canvas.getContext("2d");

const player = new Player();
const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

const gravity = 0.5;
const scaleFactor = 4;

//set canvas size
cWidth = $canvas.width = 1024;
cHeigth = $canvas.height = 576;
const scaledCanvas = {
  width: cWidth / scaleFactor,
  height: cHeigth / scaleFactor,
};

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animation() {
  window.requestAnimationFrame(animation);
  //clear canvas
  c.fillStyle = "#333333";
  c.fillRect(0, 0, cWidth, cHeigth);
  //setup background
  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  c.restore();

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
