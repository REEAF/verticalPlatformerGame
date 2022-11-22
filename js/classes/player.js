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