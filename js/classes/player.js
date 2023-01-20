class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
    jumpsLeft = 1,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 27,
    };
    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
    this.faceDirection = "right";
    this.animations = animations;
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }
  }

  checkHorisontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x =
            collisionBlock.position.x - this.width - offset - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  shouldPanCameraToTheLeft() {
    // scaledCanvas & camera & bgImageWidth are gloabl values
    const cameraBoxRightSide = this.camerabox.position.x + this.camerabox.width;
    if (cameraBoxRightSide >= bgImageWidth) return;
    if (
      cameraBoxRightSide >=
      scaledCanvas.width + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraToTheRight() {
    // scaledCanvas & camera are gloabl values
    if (this.camerabox.position.x <= 0) return;
    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraDown() {
    // scaledCanvas & camera are gloabl values
    if (this.camerabox.position.y + this.velocity.y <= 0) return;
    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  shouldPanCameraUp() {
    // scaledCanvas & camera & bgImageHeight are gloabl values
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      bgImageHeight
    )
      return;
    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvas.height
    ) {
      camera.position.y -= this.velocity.y;
    }
  }

  updateHitBox() {
    let offset = 0;
    this.faceDirection === "right" ? (offset = 38) : (offset = 32);
    this.hitbox = {
      ...this.hitbox,
      position: {
        x: this.position.x + offset,
        y: this.position.y + 26,
      },
    };
  }

  updateCameraBox() {
    this.camerabox = {
      ...this.camerabox,
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
    };
  }

  applyGravity() {
    //gravity is global value
    if (this.velocity.y < platformHeight) this.velocity.y += gravity;
    this.position.y += this.velocity.y;
    this.jumpsLeft = 0;
  }

  checkVerticalCollision() {
    //check for ground collision
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        //setup for ground collision
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.jumpsLeft = 1;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        //setup for ceiling collision
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.jumpsLeft = 1;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
    //check platform collision
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i];
      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        //setup for platform collision
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.jumpsLeft = 1;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = platformCollisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  checkHorizonralCanvasCollision() {
    //bgImageWidth is global value
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x / 2 >=
        bgImageWidth ||
      this.hitbox.position.x + this.velocity.x / 2 <= 0
    )
      this.velocity.x = 0;
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
    if (this.faceDirection === "right") {
      this.currentFrame = 0;
      return;
    } else this.currentFrame = this.animations[key].frameRate - 1;
  }

  move() {
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.faceDirection = "right";
      this.switchSprite("run_right");
      this.velocity.x = 2;
      this.checkHorizonralCanvasCollision();
      this.shouldPanCameraToTheLeft({ canvas: scaledCanvas, camera });
    } else if (keys.a.pressed) {
      this.faceDirection = "left";
      this.switchSprite("run_left");
      this.velocity.x = -2;
      this.checkHorizonralCanvasCollision();
      this.shouldPanCameraToTheRight();
    } else if (this.velocity.y === 0)
      this.faceDirection === "right"
        ? this.switchSprite("idle_right")
        : this.switchSprite("idle_left");
    if (this.velocity.y < 0) {
      this.faceDirection === "right"
        ? this.switchSprite("jump_right")
        : this.switchSprite("jump_left");
      this.shouldPanCameraDown();
    } else if (this.velocity.y > 0) {
      this.shouldPanCameraUp();
      this.faceDirection === "right"
        ? this.switchSprite("fall_right")
        : this.switchSprite("fall_left");
    }
    this.position.x += this.velocity.x;
  }

  update() {
    this.updateFrames(this.faceDirection);
    this.updateHitBox();
    this.updateCameraBox();
    /*------------------<DEV>------------------
    // draw the camerabox
    c.fillStyle = "rgba(0,0,255,0.2";
    c.fillRect(
      this.camerabox.position.x,
      this.camerabox.position.y,
      this.camerabox.width,
      this.camerabox.height
    );
    //draw hitbox
    c.fillStyle = "rgba(255,0,0,0.2";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
     ------------------</DEV>------------------*/
    this.draw();
    this.move();
    this.updateHitBox();
    this.checkHorisontalCollision();
    this.applyGravity();
    this.updateHitBox();
    this.checkVerticalCollision();
  }
}
