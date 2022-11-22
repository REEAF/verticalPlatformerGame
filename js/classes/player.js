class Player {
  constructor({ position, collisionBlocks }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.height = 25;
    this.width = 25;
    this.collisionBlocks = collisionBlocks;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  checkHorisontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this, object2: collisionBlock })) {
        //setup for ground collision
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
        //setup for ceiling collision
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
  }
  applygravity() {
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < cHeigth)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
  checkVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this, object2: collisionBlock })) {
        //setup for ground collision
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
        //setup for ceiling collision
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
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
    this.move();
    this.checkHorisontalCollision();
    this.applygravity();
    this.checkVerticalCollision();

    this.draw();
  }
}
