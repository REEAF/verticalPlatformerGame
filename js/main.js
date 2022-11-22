const $canvas = document.querySelector("canvas");
const c = $canvas.getContext("2d");

const gravity = 0.5;
const scaleFactor = 4;
const baseBlockSize = 16;

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

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol !== 0) {
      collisionBlocks.push(
        new collisionBlock({
          position: { x: x * baseBlockSize, y: y * baseBlockSize },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}
const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol !== 0) {
      platformCollisionBlocks.push(
        new collisionBlock({
          position: { x: x * baseBlockSize, y: y * baseBlockSize },
        })
      );
    }
  });
});

const player = new Player({
  position: { x: 0, y: 0 },
  collisionBlocks,
  imageSrc: "./img/avatars/warrior/Idle.png",
  frameRate: 8,
});

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

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
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  player.update();
  c.restore();
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
      player.velocity.y = -8;
      break;
    case "Space":
      player.velocity.y = -8;
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
