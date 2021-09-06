import * as PIXI from "pixi.js";
import Player from "./player";
import PanelIntro from "./ui/panelIntro";

const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: 0xccdfff,
});

app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

const loader = new PIXI.Loader();
loader.add("/assets/ui/ui_sheet.json").load(init);

app.ticker.add((delta) => tick());

function init() {
  // const load = new SpriteLoader("/assets/ui/ui_sheet.json");
  // const sprite1 = load.getSprite("place_1.png");
  // sprite1.position.set(500, 200);
  // sprite1.scale.set(1, 1);
  // app.stage.addChild(sprite1);

  const playerTexture = PIXI.Texture.from("/assets/sprites/player.png");
  const player = new Player(100, 400, playerTexture);
  player.scale.set(0.5, 0.5);
  app.stage.addChild(player);

  const intro = new PanelIntro(500, 500);
  intro.scale.set(0.75);
  app.stage.addChild(intro);
}

function tick() {}
