import * as PIXI from "pixi.js";
import GameEndFx from "../fx/gameEndFx";
import { distanceStyle, headerStyle, moneyStyle, scoreStyle } from "../utils/styles";
import Button from "./button";
import PanelBase from "./panelBase";

class PanelEnd extends PanelBase {
  fx!: GameEndFx;
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    this.fx = new GameEndFx(0, 0);
    this.addChild(this.fx);
    
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

  tick(delta: number){
    this.fx.tick(delta);
  }

  setScore() {
    const score = new PIXI.Text("99");
    score.style = scoreStyle;
    score.anchor.set(0.5, 0.5);
    score.position.set(0, -250);
    this.addChild(score);
  }

  setMoney() {
    const money = new PIXI.Text("99");
    money.style = moneyStyle;
    money.anchor.set(0.5, 0.5);
    money.position.set(0, -100);
    this.addChild(money);
  }

  setDistance() {
    const distance = new PIXI.Text("99 м");
    distance.style = distanceStyle;
    distance.anchor.set(0.5, 0.5);
    distance.position.set(0, 110);
    this.addChild(distance);
  }
}

export default PanelEnd;
