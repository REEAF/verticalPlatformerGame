class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }) {
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
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 13,
      height: 27,
    };
  }
  applyGravity() {
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < cHeigth)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
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
  move() {
    this.velocity.x = 0;
    if (keys.d.pressed) this.velocity.x = 5;
    else if (keys.a.pressed) this.velocity.x = -5;
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
