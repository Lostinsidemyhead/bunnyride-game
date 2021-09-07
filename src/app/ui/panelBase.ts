import * as PIXI from "pixi.js";
import SpriteLoader from "../utils/spriteLoader";

class PanelBase extends PIXI.Container {
  loader: SpriteLoader;

  constructor() {
    super();
    this.loader = new SpriteLoader("/assets/ui/ui_sheet.json");
    this.init();
  }

  init() {
    const bg = this.loader.getSprite("info_plate_big.png");
    bg.anchor.set(0.5, 0.5);
    this.addChild(bg);

    const header = this.loader.getSprite("header_info_plate.png");
    header.anchor.set(0.5, 0.5);
    header.position.set(0, -410);
    this.addChild(header);
  }
}

export default PanelBase;
