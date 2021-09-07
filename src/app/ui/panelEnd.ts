import * as PIXI from "pixi.js";
import { headerStyle } from "../utils/styles";
import Button from "./button";
import PanelBase from "./panelBase";

class PanelEnd extends PanelBase {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;

    this.init();
  }

  init() {
    super.init();
    const header = new PIXI.Text("Твои очки:");
    header.style = headerStyle;
    header.anchor.set(0.5, 0.5);
    header.position.set(0, -415);
    this.addChild(header);

    const btnOk = new Button("ok");
    btnOk.position.set(0, 370);
    this.addChild(btnOk);

    let sprite = this.loader.getSprite("collect_coin_icon.png");
    sprite.position.set(-200, -100);
    this.addChild(sprite);

    sprite = this.loader.getSprite("collect_distance_icon.png");
    sprite.position.set(-200, 100);
    this.addChild(sprite);

    this.setScore();
    this.setMoney();
    this.setDistance();
  }

  setScore() {}

  setMoney() {}

  setDistance() {}
}

export default PanelEnd;
