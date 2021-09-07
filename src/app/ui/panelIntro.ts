import * as PIXI from "pixi.js";
import { headerStyle } from "../utils/styles";
import Button from "./button";
import PanelBase from "./panelBase";

class PanelIntro extends PanelBase {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;

    this.init();
  }

  override init() {
    super.init();
    this.initScoreBtn();
    this.initPlayBtn();

    const header = new PIXI.Text("Твои рекорды:");
    header.style = headerStyle;
    header.anchor.set(0.5, 0.5);
    header.position.set(0, -405);
    this.addChild(header);

    const high = new PIXI.Text("Рекорд:");
    high.anchor.set(0.5, 0.5);
    high.position.set(0, -305);
    this.addChild(high);

    const nameField = this.loader.getSprite("user_name_bar.png");
    nameField.anchor.set(0.5, 0.5);
    nameField.position.set(0, 100);
    this.addChild(nameField);
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
