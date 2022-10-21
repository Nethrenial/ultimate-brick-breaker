import { Image } from "love.graphics";
import { configureLove } from "./config";
import { Ball, ballSet } from "./objects/Ball";
import { Brick, brickSet } from "./objects/Brick";

//importing all the elements
import { slider } from "./objects/Slider";
import { backGroundImage } from "./images/backgroundImages";

//configuring love
configureLove();

love.load = () => {};

love.update = (dt) => {
  slider.update(dt);
  ballSet.update(dt);
};
love.draw = () => {
  love.graphics.draw(backGroundImage, 0, 0);
  brickSet.draw();
  ballSet.draw();
  slider.draw();
};
