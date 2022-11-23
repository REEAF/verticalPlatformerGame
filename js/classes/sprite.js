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
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => {
      this.width = (this.image.width * this.scale) / this.frameRate;
      this.height = this.image.height * this.scale;
      this.loaded = true;
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
  updateFrames(direction = "right") {
    this.ellapsedFrames++;
    if (this.ellapsedFrames % this.frameBuffer === 0) {
      if (direction === "right") {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
        else this.currentFrame = 0;
      } else {
        if (this.currentFrame == 0) this.currentFrame = this.frameRate - 1;
        else this.currentFrame--;
      }
    }
  }

  update() {
    this.draw();
    this.updateFrames();
  }
}
