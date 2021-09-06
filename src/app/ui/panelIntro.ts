import * as PIXI from "pixi.js";
import Button from "./button";
import PanelBase from "./panelBase";

class PanelIntro extends PanelBase {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;

    this.#init();
  }

  #init() {
    this.initScoreBtn();
    this.initPlayBtn();
  }
  initPlayBtn() {
    const btn = new Button("play");
    btn.position.set(170, 300);
    this.addChild(btn);
  }

  initScoreBtn() {
    const btn = new Button("leadboard");
    btn.position.set(-170, 300);
    this.addChild(btn);
  }

}

export default PanelIntro;
