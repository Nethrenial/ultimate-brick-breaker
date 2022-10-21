import { Image } from "love.graphics";
import { loveConfig } from "../config";
import { ballHitOnSliderAndWalls } from "../sounds/ballSound";
import { Brick, brickSet } from "./Brick";
import { slider } from "./Slider";

export class Ball {
  x: number;
  y: number;
  xSpeed!: number;
  ySpeed!: number;
  speed: number;
  image: Image;

  constructor() {
    this.image = love.graphics.newImage("/images/balls/ball1.png");
    this.x = (loveConfig.window.width - this.width) / 2;
    this.y = loveConfig.window.height - this.height - slider.height;
    this.speed = 200;
    this.reset();
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
    this.updateBallDirection();
    this.x = this.x + this.xSpeed * dt;
    this.y = this.y + this.ySpeed * dt;
  }

  updateBallDirection() {
    // means the ball hit the slider
    if (this.isHittingTheSlider()) {
      this.ySpeed = -1 * this.ySpeed;
    }
    this.handleCollisionOnWall();
    if (this.y >= loveConfig.window.height - slider.height) {
      this.x = loveConfig.window.width / 2;
      this.y = loveConfig.window.height / 2;
      this.reset();
    }
  }

  isHittingTheSlider() {
    const isInYRange =
      this.y + this.height >= slider.y &&
      this.y + this.height <= loveConfig.window.height;
    const isInXRange =
      this.x + this.width >= slider.x &&
      this.x + this.width <= slider.x + slider.width;
    return isInXRange && isInYRange;
  }

  isHittingTheBrick(brick: Brick) {
    const isInYRange =
      this.y + this.height >= brick.y &&
      this.y + this.height <= brick.y + brick.height;
    const isInXRange =
      this.x + this.width >= brick.x &&
      this.x + this.width <= brick.x + brick.width;
    return isInXRange && isInYRange;
  }

  handleCollisionOnWall() {
    if (this.x >= loveConfig.window.width - this.width || this.x <= 0) {
      if (ballHitOnSliderAndWalls.isPlaying()) {
        ballHitOnSliderAndWalls.stop();
      }
      ballHitOnSliderAndWalls.play();
      this.xSpeed = -1 * this.xSpeed;
    }

    if (this.y <= 5) {
      if (ballHitOnSliderAndWalls.isPlaying()) {
        ballHitOnSliderAndWalls.stop();
      }
      ballHitOnSliderAndWalls.play();
      this.ySpeed = -1 * this.ySpeed;
    }
  }

  reset() {
    this.xSpeed =
      [1, 2, 3, -1, -2, 3][Math.floor(Math.random() * 6)] * this.speed;
    this.ySpeed = -4 * this.speed;
  }
}

export const ballSet = new (class BallSet {
  balls: Ball[] = [];

  constructor() {
    this.balls.push(new Ball());
  }

  add() {
    this.balls.push(new Ball());
  }

  update(dt: number) {
    this.balls.forEach((ball) => ball.update(dt));
    this.checkCollisonWithBricks(brickSet.bricks);
  }

  draw() {
    this.balls.forEach((ball) => ball.draw());
  }

  checkCollisonWithBricks(bricks: Brick[]) {
    bricks.forEach((brick, index) => {
      this.balls.forEach((ball) => {
        const doesHit = ball.isHittingTheBrick(brick);
        if (doesHit) {
          brick.hits++;
          if (!brick.isDestroyed) {
            ball.ySpeed = -1 * ball.ySpeed;
          }
        }
      });
    });
  }
})();
