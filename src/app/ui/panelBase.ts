import * as PIXI from "pixi.js";
import SpriteLoader from "../utils/spriteLoader";

class PanelBase extends PIXI.Container {
  loader: SpriteLoader;

  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.loader = new SpriteLoader("/assets/ui/ui_sheet.json");

    this.#init();
  }

  #init() {
    const bg = this.loader.getSprite("info_plate_big.png");
    bg.anchor.set(0.5, 0.5);
    this.addChild(bg);
  }
}

export default PanelBase;