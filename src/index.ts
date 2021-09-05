import * as PIXI from "pixi.js";
import './assets/logo.png';

const myView = document.querySelector("#scene") as HTMLCanvasElement;

const app = new PIXI.Application({
  width: 720,
  height: 1280,
  backgroundColor: 0x1099bb,
  view: myView,
});
