import * as PIXI from "pixi.js";
import SpriteLoader from "../utils/spriteLoader";

class GameEndFx extends PIXI.Container {
  loader: SpriteLoader;
  flare!: PIXI.Sprite;
  constructor(x = 0, y = 0) {
    super();
    this.loader = new SpriteLoader("/assets/ui/ui_sheet.json");
    this.x = x;
    this.y = y;

    this.init();
  }

  init() {
    const flareTexture = PIXI.Texture.from("/assets/fx/rays.png");
    this.flare = new PIXI.Sprite(flareTexture);
    this.flare.anchor.set(0.5, 0.5);
    this.flare.position.set(0, 0);
    this.addChild(this.flare);
  }

  tick(delta: number){
    this.flare.rotation -= 0.01 * delta;
  }
}
export default GameEndFx;
