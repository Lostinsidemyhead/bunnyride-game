import * as PIXI from "pixi.js";

class SpriteLoader {
  loader: PIXI.Loader;
  path: string;

  constructor(path: string) {
    this.loader = new PIXI.Loader();
    this.path = path;
    this.loader.add(this.path);
  }

  getSprite(name: string): PIXI.Sprite {
    const texture = PIXI.Texture.from(name);
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }
}

export default SpriteLoader;
