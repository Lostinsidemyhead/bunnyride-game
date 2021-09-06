import * as PIXI from "pixi.js";
import SpriteLoader from "../utils/spriteLoader";

class Button extends PIXI.Sprite {
  name: string;
  states: string[];
  loader: PIXI.Loader;
  constructor(name: string) {
    super();
    this.loader = new PIXI.Loader();
    this.loader.add("/assets/ui/ui_sheet.json");
    this.anchor.set(0.5, 0.5);
    this.states = ["_button_active", "_button_hover", "_button_press"];
    this.name = name;
    this.#init();
  }

  #init() {
    const textureName = this.name + this.states[0] + ".png";
    this.texture = PIXI.Texture.from(textureName);

    this.interactive = true;

    this.on("mouseover", this.onMouseOver);
    this.on("mouseout", this.onMouseOut);
    this.on("mousedown", this.onMouseDown);
    this.on("mouseup", this.onMouseUp);
  }

  onMouseOver() {
    const textureName = this.name + this.states[1] + ".png";
    this.texture = PIXI.Texture.from(textureName);
  }

  onMouseOut() {
    const textureName = this.name + this.states[0] + ".png";
    this.texture = PIXI.Texture.from(textureName);
  }

  onMouseDown() {
    const textureName = this.name + this.states[2] + ".png";
    this.texture = PIXI.Texture.from(textureName);
  }

  onMouseUp() {
    const textureName = this.name + this.states[1] + ".png";
    this.texture = PIXI.Texture.from(textureName);
  }
}

export default Button;
