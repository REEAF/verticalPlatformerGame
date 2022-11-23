class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.collisionBlocks = collisionBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
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
  updateHitBox() {
    this.hitbox = {
      position: {
        x: this.position.x + 32,
        y: this.position.y + 26,
      },
      width: 16,
      height: 27,
    };
  }
  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }
  checkVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        //setup for ground collision
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        //setup for ceiling collision
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }
  move() {
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.faceDirection = "right";
      this.switchSprite("run_right");
      this.velocity.x = 2;
    } else if (keys.a.pressed) {
      this.faceDirection = "left";
      this.switchSprite("run_left");
      this.velocity.x = -2;
    } else if (this.velocity.y === 0)
      this.faceDirection === "right"
        ? this.switchSprite("idle_right")
        : this.switchSprite("idle_left");

    if (this.velocity.y < 0)
      this.faceDirection === "right"
        ? this.switchSprite("jump_right")
        : this.switchSprite("jump_left");
    else if (this.velocity.y > 0)
      this.faceDirection === "right"
        ? this.switchSprite("fall_right")
        : this.switchSprite("fall_left");
    this.position.x += this.velocity.x;
  }
  update() {
    this.updateFrames();
    this.updateHitBox();
    // draw the image
    c.fillStyle = "rgba(0,255,0,0.2";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    //draw hitbox
    c.fillStyle = "rgba(255,0,0,0.2";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
    this.draw();
    this.move();

    this.updateHitBox();
    this.checkHorisontalCollision();
    this.applyGravity();
    this.updateHitBox();
    this.checkVerticalCollision();
  }
}
