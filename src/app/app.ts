import * as PIXI from "pixi.js";
import Ground from "./ground";
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
  ground!: Ground;

  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xccdfff,
    });
    this.state = gameState.waitingStart;
    document.body.appendChild(this.view);

    /** ground init */
    this.ground = new Ground();
    this.ground.angle = 10;
    this.ground.position.set(0, window.innerHeight - 400);
    this.stage.addChild(this.ground);

    /** player init */
    const playerTexture = PIXI.Texture.from("/assets/sprites/player.png");
    this.player = new Player(250, 100, playerTexture);
    this.player.scale.set(0.5, 0.5);
    this.stage.addChild(this.player);

    this.init();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  init() {
    this.showStatPanel = this.showStatPanel.bind(this);
    this.hideStatPanel = this.hideStatPanel.bind(this);
    this.showIntroPanel = this.showIntroPanel.bind(this);

    this.startPlay = this.startPlay.bind(this);
    this.reload = this.reload.bind(this);

    this.showIntroPanel();

    addEventListener("ShowStat", this.showStatPanel);
    addEventListener("HideStat", this.hideStatPanel);
    addEventListener("StartPlay", this.startPlay);
    addEventListener("Reload", this.reload);
  }

  startPlay() {
    this.hideIntroPanel();
    this.state = gameState.playing;

    /** NOTE: temporary, not realized loose condition */
    setTimeout(() => {
      this.endPlay();
    }, 10000);
  }

  endPlay() {
    this.state = gameState.gameOver;
    this.stage.addChild(this.getEndPanel());
  }

  reload() {
    this.stage.removeChild(this.getEndPanel());
    this.init();
  }

  getIntroPanel() {
    return this.introPanel || this.initIntroPanel();
  }

  initIntroPanel() {
    this.introPanel = new PanelIntro(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.introPanel.scale.set(0.75);
    return this.introPanel;
  }

  showIntroPanel() {
    this.stage.addChild(this.getIntroPanel());
  }

  hideIntroPanel() {
    this.stage.removeChild(this.getIntroPanel());
  }

  getStatPanel() {
    return this.statsPanel || this.initStatPanel();
  }

  initStatPanel() {
    this.statsPanel = new PanelStats(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.statsPanel.scale.set(0.75);
    return this.statsPanel;
  }

  showStatPanel() {
    this.stage.addChild(this.getStatPanel());
  }

  hideStatPanel() {
    this.stage.removeChild(this.getStatPanel());
  }

  getEndPanel() {
    return this.endPanel || this.initEndPanel();
  }

  initEndPanel() {
    this.endPanel = new PanelEnd(window.innerWidth / 2, window.innerHeight / 2);
    this.endPanel.scale.set(0.75);
    this.stage.addChild(this.endPanel);
    return this.endPanel;
  }

  showEndPanel() {
    this.stage.addChild(this.getEndPanel());
  }

  hideEndPanel() {
    this.stage.removeChild(this.getEndPanel());
  }

  draw() {
    this.onResize();
    this.ticker.add(this.tick.bind(this));
  }

  tick(delta: number) {
    if (this.state === gameState.gameOver && this.endPanel) {
      this.endPanel.tick(delta);
    }
    if (this.state === gameState.playing) {
      this.ground.tick(delta);
      if (this.player.y + this.player.height / 2 < this.ground.y + 50) {
        this.player.tick(delta);
      }
    }
  }

  onResize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    const width = this.renderer.width,
      height = this.renderer.height;
    this.ground.onResize(width, height);
  }
}

export default App;
