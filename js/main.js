const $canvas = document.querySelector("canvas");
const c = $canvas.getContext("2d");
const platformHeight = 4;
const gravity = 0.2;
const scaleFactor = 4;
const baseBlockSize = 16;
const bgImageWidth = 576;
const bgImageHeight = 432;
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
          height: platformHeight,
        })
      );
    }
  });
});

const player = new Player({
  position: { x: -25, y: 280 },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: "./img/avatars/warrior/Idle.png",
  frameRate: 8,
  animations: {
    idle_right: {
      imageSrc: "./img/avatars/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    idle_left: {
      imageSrc: "./img/avatars/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    run_right: {
      imageSrc: "./img/avatars/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    run_left: {
      imageSrc: "./img/avatars/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    jump_right: {
      imageSrc: "./img/avatars/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 10,
    },
    jump_left: {
      imageSrc: "./img/avatars/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 10,
    },
    fall_right: {
      imageSrc: "./img/avatars/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 10,
    },
    fall_left: {
      imageSrc: "./img/avatars/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 10,
    },
  },
});

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});
// use static value instead of background.image.height - need some time to load
const camera = {
  position: {
    x: 0,
    y: -bgImageHeight + scaledCanvas.height,
  },
};
function animation() {
  window.requestAnimationFrame(animation);

  /*------------------<DEV>------------------
  //clear canvas
  c.fillStyle = "#333333";
  c.fillRect(0, 0, cWidth, cHeigth);
  ------------------</DEV>------------------*/

  //setup background
  c.save();
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  background.update();

  /*------------------<DEV>------------------
  //draw collision blocks
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
   ------------------</DEV>------------------*/

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
      player.shouldPanCameraToTheLeft({ canvas: scaledCanvas, camera });
      break;
    case "KeyW":
      checkJumsLeft(player);
      break;
    case "Space":
      checkJumsLeft(player);
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
