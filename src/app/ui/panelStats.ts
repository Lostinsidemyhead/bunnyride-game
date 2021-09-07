import * as PIXI from "pixi.js";
import Model from "../models/model";
import { statsPeriod } from "../types";
import { first, headerStyle, numberStyle, second, statsStyle, third } from "../utils/styles";
import Button from "./button";
import PanelBase from "./panelBase";

class PanelStats extends PanelBase {
  PLACE_POSITIONS = [
    { x: -95, y: -240 },
    { x: -95, y: -160 },
    { x: -95, y: -80 },
    { x: -60, y: -15 },
    { x: -60, y: 35 },
    { x: -60, y: 85 },
    { x: -60, y: 135 },
    { x: -60, y: 185 },
    { x: -60, y: 235 },
    { x: -60, y: 285 },
  ];

  period: statsPeriod;
  statsContainer: PIXI.Container;

  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.period = statsPeriod.allTime;
    this.init();

    this.statsContainer = new PIXI.Container();
    this.addChild(this.statsContainer);
    this.initStats();
  }

  override init() {
    super.init();
    const header = new PIXI.Text("Таблица рекордов:");
    header.style = headerStyle;
    header.anchor.set(0.5, 0.5);
    header.position.set(0, -415);
    this.addChild(header);

    const btnOk = new Button("ok");
    btnOk.position.set(0, 370);
    this.addChild(btnOk);

    const btnLeft = new Button("arrow");
    btnLeft.position.set(-270, -310);
    btnLeft.scale.x = -1;
    this.addChild(btnLeft);

    const btnRight = new Button("arrow");
    btnRight.position.set(270, -310);
    this.addChild(btnRight);
  }

  getScoreList(): {
    name: string;
    score: number;
  }[] {
    const scoreList = Model.getScoreList();
    if (!scoreList) return [];
    scoreList.sort((a, b) => b.score - a.score);
    return scoreList;
  }

  initStats() {
    const scoreList = this.getScoreList();

    for (let i = 0; i < this.PLACE_POSITIONS.length; i++) {
      let spriteName = i < 3 ? `place_${i}.png` : "midleader_name_plate.png";
      let sprite = this.loader.getSprite(spriteName);
      sprite.position.set(this.PLACE_POSITIONS[i].x, this.PLACE_POSITIONS[i].y);
      this.statsContainer.addChild(sprite);

      if (i > 2) {
        let playerNumber = new PIXI.Text((i + 1).toString());
        
        playerNumber.anchor.set(0.5, 0.5);
        playerNumber.position.set(-305, this.PLACE_POSITIONS[i].y);
        playerNumber.style = numberStyle;
        this.addChild(playerNumber);
      }

      if (scoreList[i]) {
        let playerName = new PIXI.Text(scoreList[i].name);
        playerName.style = this.getStyle(i);
        playerName.anchor.set(0, 0.5);
        playerName.position.set(-250, this.PLACE_POSITIONS[i].y);
        this.addChild(playerName);
      }

      spriteName =
        i < 3 ? "highleader_scores_plate.png" : "midleader_scores_plate.png";
      sprite = this.loader.getSprite(spriteName);
      sprite.position.set(260, this.PLACE_POSITIONS[i].y);
      this.statsContainer.addChild(sprite);

      if (scoreList[i]) {
        let playerScore = new PIXI.Text(scoreList[i].score.toString());
        playerScore.style = this.getStyle(i);
        playerScore.anchor.set(0.5, 0.5);
        playerScore.position.set(260, this.PLACE_POSITIONS[i].y);
        this.addChild(playerScore);
      }
    }
  }

  getStyle(i: number): PIXI.TextStyle{
    let style = new PIXI.TextStyle();
    switch (i) {
      case 0:
        style = first;
        break;
      case 1:
        style = second;
        break;
      case 2:
        style = third;
        break;
      default:
        style = statsStyle;
    }
    return style;
  }
}

export default PanelStats;
