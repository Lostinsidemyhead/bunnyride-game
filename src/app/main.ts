import * as PIXI from "pixi.js";
import Player from "./player";
import PanelIntro from "./ui/panelIntro";
import PanelStats from "./ui/panelStats";

const MAX_WIDTH = 1280;
const MAX_HEIGHT = 720;

const app = new PIXI.Application({
  width: MAX_WIDTH,
  height: MAX_HEIGHT,
  backgroundColor: 0xccdfff,
});

app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

const loader = new PIXI.Loader();
loader.add("/assets/ui/ui_sheet.json").load(init);

app.ticker.add((delta) => tick());

function init() {
  const playerTexture = PIXI.Texture.from("/assets/sprites/player.png");
  const player = new Player(100, 400, playerTexture);
  player.scale.set(0.5, 0.5);
  app.stage.addChild(player);

  const intro = new PanelIntro(window.innerWidth/2, window.innerHeight/2);
  intro.scale.set(0.75);
  app.stage.addChild(intro);

  const stats = new PanelStats(window.innerWidth/2, window.innerHeight/2);
  stats.scale.set(0.75);
  app.stage.addChild(stats);
}

function tick() {}
