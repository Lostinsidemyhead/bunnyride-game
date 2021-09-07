import * as PIXI from "pixi.js";
import { headerStyle, highStyle, nameStyle } from "../utils/styles";
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
    header.position.set(0, -420);
    this.addChild(header);

    const high = new PIXI.Text("Рекорд:");
    high.style = highStyle;
    high.anchor.set(0.5, 0.5);
    high.position.set(0, -305);
    this.addChild(high);

    const count = new PIXI.Text("999");
    count.style = highStyle;
    count.anchor.set(0.5, 0.5);
    count.position.set(0, -175);
    this.addChild(count);

    const nameField = this.loader.getSprite("user_name_bar.png");
    nameField.anchor.set(0.5, 0.5);
    nameField.position.set(0, 100);
    this.addChild(nameField);

    const name = new PIXI.Text("Guest");
    name.style = nameStyle;
    name.anchor.set(0, 0.5);
    name.position.set(-270, 100);
    this.addChild(name);
  }

  initPlayBtn() {
    const btn = new Button("play");
    btn.position.set(170, 300);
    this.addChild(btn);

    const startPlayEvent = new Event("StartPlay");
    btn.on("click", (event) => {dispatchEvent(startPlayEvent)});
  }

  initScoreBtn() {
    const btn = new Button("leadboard");
    btn.position.set(-170, 300);
    this.addChild(btn);

    const showStatEvent = new Event("ShowStat");
    btn.on("click", (event) => {dispatchEvent(showStatEvent)});

  }
}

export default PanelIntro;
