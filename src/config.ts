import { Config } from "love";

export const loveConfig: Config = {
  window: {
    title: "Ultimate Brick Breaker",
    width: 360,
    height: 640,
  },
} as Config;

export function configureLove() {
  love.window.setTitle(loveConfig.window.title);
  love.window.setMode(loveConfig.window.width, loveConfig.window.height, {
    centered: true,
    highdpi: true,
    msaa: 4,
    resizable: false,
  });
  love.physics.setMeter(64);
}
