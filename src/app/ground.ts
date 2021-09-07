import * as PIXI from "pixi.js";

class Ground extends PIXI.TilingSprite {
  constructor() {
    const texture = PIXI.Texture.from("/assets/sprites/floor.png");
    super(texture, window.innerWidth + 100, 400);
  }

  onResize(width: number, height: number) {
    this.width = width;
    this.y = height - this.height;
  }

  tick(delta: number) {
    this.tilePosition.x -= delta * 4;
  }
}

export default Ground;
