class collisionBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }
  draw() {
    c.fillStyle = "rgba(255, 255, 255, 0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
