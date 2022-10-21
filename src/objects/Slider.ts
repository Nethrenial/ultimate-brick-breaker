import { Image } from "love.graphics";
import { KeyConstant } from "love.keyboard";
import { loveConfig } from "../config";

export const slider = new (class Slider {
  direction: "left" | "right";
  isMoving: boolean;
  movingSpeed: number;
  x: number;
  y: number;
  image: Image;

  constructor() {
    this.image = love.graphics.newImage("/images/sliders/slider1.png");
    this.x = (loveConfig.window.width - this.width) / 2;
    this.y = loveConfig.window.height - this.height;
    this.direction = "left";
    this.isMoving = false;
    this.movingSpeed = 800;
  }

  get width() {
    return this.image.getWidth() / 10;
  }

  get height() {
    return this.image.getHeight() / 10;
  }

  draw() {
    love.graphics.draw(this.image, this.x, this.y, 0, 0.1, 0.1);
  }

  update(dt: number) {
    this.keyboardHandler(
      love.keyboard.isDown("left")
        ? "left"
        : love.keyboard.isDown("right")
        ? "right"
        : "end"
    );
    if (this.isMoving) {
      this.x =
        this.x +
        (this.direction === "left"
          ? -this.movingSpeed * dt
          : this.movingSpeed * dt);
    }
    this.normalize();
    this.isMoving = false;
  }

  private keyboardHandler(key: KeyConstant) {
    this.isMoving = true;
    switch (key) {
      case "left":
        this.direction = "left";
        break;
      case "right":
        this.direction = "right";
        break;
      default:
        this.isMoving = false;
        break;
    }
  }

  private normalize() {
    if (this.x + this.width >= loveConfig.window.width) {
      this.x = loveConfig.window.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }
  }
})();
