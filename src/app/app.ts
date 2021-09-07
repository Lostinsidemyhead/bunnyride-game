import * as PIXI from "pixi.js";
import Player from "./player";
import { gameState } from "./types";
import PanelEnd from "./ui/panelEnd";
import PanelIntro from "./ui/panelIntro";
import PanelStats from "./ui/panelStats";

class App extends PIXI.Application {
  player!: Player;
  introPanel!: PanelIntro;
  endPanel!: PanelEnd;
  statsPanel!: PanelStats;
  state: gameState;

  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xccdfff,
    });
    this.state = gameState.waitingStart;
    document.body.appendChild(this.view);

    this.init();

    window.addEventListener("resize", this.onResize.bind(this));
  }

  init() {
    const playerTexture = PIXI.Texture.from("/assets/sprites/player.png");
    this.player = new Player(250, 400, playerTexture);
    this.player.scale.set(0.5, 0.5);
    this.stage.addChild(this.player);

    this.introPanel = new PanelIntro(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.introPanel.scale.set(0.75);
    this.stage.addChild(this.introPanel);

    this.statsPanel = new PanelStats(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.statsPanel.scale.set(0.75);
    this.stage.addChild(this.statsPanel);

    this.endPanel = new PanelEnd(window.innerWidth / 2, window.innerHeight / 2);
    this.endPanel.scale.set(0.75);
    this.stage.addChild(this.endPanel);
  }

  draw() {
    this.onResize();
    console.log(2);

    this.ticker.add(this.tick.bind(this));
  }

  tick(delta: number) {
    // if(this.state === gameState.gameOver)
    {
      this.endPanel.tick(delta);
    }
  }


  onResize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    const width = this.renderer.width,
      height = this.renderer.height;
  }
}

export default App;
