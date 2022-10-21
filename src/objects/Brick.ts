import { Image } from "love.graphics";
import { brickImages } from "../images/brickImages";

export class Brick {
  x: number;
  y: number;
  hits = 0;
  originalImage: Image;
  brokenImage: Image;
  id: string;

  constructor(x: number, y: number) {
    this.id = `${Math.floor(Math.random() * 1000000)}`;
    this.x = x;
    this.y = y;
    const random = Math.floor(Math.random() * brickImages.length);
    this.originalImage = brickImages[random].normal;
    this.brokenImage = brickImages[random].broken;
  }

  get width() {
    return this.originalImage.getWidth() / 10;
  }

  get height() {
    return this.originalImage.getHeight() / 10;
  }

  get isBroken() {
    return this.hits == 1;
  }

  get isDestroyed() {
    return this.hits >= 2;
  }

  draw() {
    love.graphics.draw(
      this.isBroken ? this.brokenImage : this.originalImage,
      this.x,
      this.y,
      0,
      0.1,
      0.1
    );
  }

  update() {}
}

export const brickSet = new (class BrickSet {
  bricks: Brick[] = [];

  constructor() {
    for (let i = 0; i < 30; i++) {
      this.bricks.push(new Brick((i * 40) % 360, i * 12));
    }
  }

  draw() {
    this.bricks.forEach((brick) => !brick.isDestroyed && brick.draw());
  }
})();
