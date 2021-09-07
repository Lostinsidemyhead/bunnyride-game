import * as PIXI from "pixi.js";
import Model from "../models/model";
import { gameState, statsPeriod, statsTitle } from "../types";
import {
  first,
  headerStyle,
  numberStyle,
  second,
  statsStyle,
  statsTitleStyle,
  third,
} from "../utils/styles";
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
  selector!: PIXI.Text;

  playerNameArr!: PIXI.Text[];
  playerScoreArr!: PIXI.Text[];

  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.period = statsPeriod.all;
    this.playerNameArr = [];
    this.playerScoreArr = [];
    this.init();
    this.statsContainer = new PIXI.Container();
    this.addChild(this.statsContainer);
    this.initStats();
  }

  override init() {
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    super.init();
    const header = new PIXI.Text("Таблица рекордов:");
    header.style = headerStyle;
    header.anchor.set(0.5, 0.5);
    header.position.set(0, -415);
    this.addChild(header);

    this.selector = new PIXI.Text(statsTitle[this.period]);
    this.selector.style = statsTitleStyle;
    this.selector.anchor.set(0.5, 0.5);
    this.selector.position.set(0, -310);
    this.addChild(this.selector);

    const btnOk = new Button("ok");
    btnOk.position.set(0, 370);
    this.addChild(btnOk);
    const hideStatEvent = new Event("HideStat");
    btnOk.on("click", (event) => {
      dispatchEvent(hideStatEvent);
    });

    const btnLeft = new Button("arrow");
    btnLeft.position.set(-270, -310);
    btnLeft.scale.x = -1;
    this.addChild(btnLeft);
    btnLeft.on("click", this.left);

    const btnRight = new Button("arrow");
    btnRight.position.set(270, -310);
    this.addChild(btnRight);
    btnRight.on("click", this.right);

    for (let i = 0; i < this.PLACE_POSITIONS.length; i++) {
      const playerName = new PIXI.Text("");
      playerName.style = this.getStyle(i);
      playerName.anchor.set(0, 0.5);
      playerName.position.set(-250, this.PLACE_POSITIONS[i].y);
      this.playerNameArr.push(playerName);
      this.addChild(playerName);

      const playerScore = new PIXI.Text("");
      playerScore.style = this.getStyle(i);
      playerScore.anchor.set(0.5, 0.5);
      playerScore.position.set(260, this.PLACE_POSITIONS[i].y);
      this.playerScoreArr.push(playerScore);
      this.addChild(playerScore);
    }

    setTimeout(() => {
      this.showScores();
    }, 1);
  }

  getScoreList(period: statsPeriod): {
    name: string;
    score: number;
  }[] {
    const scoreList = Model.getScoreList();
    if (!scoreList) return [];

    scoreList.sort((a, b) => b.score - a.score);

    if (this.period === statsPeriod.all) return scoreList;

    const date = new Date();
    let newDate =
      this.period === statsPeriod.month
        ? date.setMonth(date.getMonth() - 1)
        : Date.now() - 604800000;

    const filtredList = [];
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].date > newDate) {
        filtredList.push(scoreList[i]);
      }
    }

    return filtredList;
  }

  initStats() {
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

      spriteName =
        i < 3 ? "highleader_scores_plate.png" : "midleader_scores_plate.png";
      sprite = this.loader.getSprite(spriteName);
      sprite.position.set(260, this.PLACE_POSITIONS[i].y);
      this.statsContainer.addChild(sprite);

      const playerName = new PIXI.Text("");
      playerName.style = this.getStyle(i);
      playerName.anchor.set(0, 0.5);
      playerName.position.set(-250, this.PLACE_POSITIONS[i].y);
      this.playerNameArr.push(playerName);
      this.addChild(playerName);

      const playerScore = new PIXI.Text("");
      playerScore.style = this.getStyle(i);
      playerScore.anchor.set(0.5, 0.5);
      playerScore.position.set(260, this.PLACE_POSITIONS[i].y);
      this.playerScoreArr.push(playerScore);
      this.addChild(playerScore);
    }
  }

  showScores() {
    const scoreList = this.getScoreList(this.period);

    for (let i = 0; i < this.PLACE_POSITIONS.length; i++) {
      if (scoreList[i]) {
        this.playerNameArr[i].text = scoreList[i].name;
        this.addChild(this.playerNameArr[i]);

        this.playerScoreArr[i].text = scoreList[i].score.toString();
        this.addChild(this.playerScoreArr[i]);
      } else {
        this.playerNameArr[i].text = "";
        this.addChild(this.playerNameArr[i]);

        this.playerScoreArr[i].text = "";
        this.addChild(this.playerScoreArr[i]);
      }
    }
  }

  left() {
    this.period =
      this.period === statsPeriod.all ? statsPeriod.week : this.period - 1;
    this.selector.text = statsTitle[this.period].toString();
    this.showScores();
  }

  right() {
    this.period =
      this.period === statsPeriod.week ? statsPeriod.all : this.period + 1;
    this.selector.text = statsTitle[this.period].toString();
    this.showScores();
  }

  getStyle(i: number): PIXI.TextStyle {
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
