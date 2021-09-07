import * as PIXI from "pixi.js";
import SpriteLoader from "../utils/spriteLoader";

class GameEndFx extends PIXI.Container {
  STARS_PARAMS = [
    { scale: 0.75, x: -500, y: -350 },
    { scale: 0.6, x: -530, y: -130 },
    { scale: 1.0, x: -580, y: 130 },
    { scale: 0.75, x: -500, y: 400 },

    { scale: 0.8, x: 450, y: -350 },
    { scale: 1.1, x: 550, y: -130 },
    { scale: 0.6, x: 530, y: 130 },
    { scale: 0.7, x: 500, y: 400 },
  ];

  loader: SpriteLoader;
  flare!: PIXI.Sprite;
  stars!: PIXI.Sprite[];

  constructor(x = 0, y = 0) {
    super();
    this.loader = new SpriteLoader("/assets/ui/ui_sheet.json");
    this.x = x;
    this.y = y;
    this.stars = [];
    this.init();
  }

  init() {
    const flareTexture = PIXI.Texture.from("/assets/fx/rays.png");
    this.flare = new PIXI.Sprite(flareTexture);
    this.flare.anchor.set(0.5, 0.5);
    this.flare.position.set(0, 0);
    this.addChild(this.flare);
    this.initStars();
  }

  initStars() {
    for (let i = 0; i < this.STARS_PARAMS.length; i++) {
      let sprite = this.loader.getSprite("star.png");
      sprite.scale.set(this.STARS_PARAMS[i].scale);
      sprite.position.set(this.STARS_PARAMS[i].x, this.STARS_PARAMS[i].y);

      this.addChild(sprite);
      this.stars.push(sprite);
    }
  }

  tick(delta: number) {
    this.flare.rotation -= 0.01 * delta;

    let sign = 0.005;

    if (this.stars) {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].rotation += sign * delta;
      }
    }
  }
}
export default GameEndFx;
