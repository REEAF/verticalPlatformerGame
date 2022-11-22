class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    frameBuffer = 5,
    scale = 1,
  }) {
    this.position = position;
    this.scale = scale;
    this.image = new Image();
    this.image.onload = () => {
      this.width = (this.image.width * this.scale) / this.frameRate;
      this.height = this.image.height * this.scale;
    };
    this.image.src = imageSrc;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.ellapsedFrames = 0;
  }
  draw() {
    if (!this.image) return;
    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  updateFrames() {
    this.ellapsedFrames++;
    if (this.ellapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
  update() {
    this.draw();
    this.updateFrames();
  }
}
