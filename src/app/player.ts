import * as PIXI from "pixi.js";
import { playerState } from "./types";


class Player extends PIXI.Sprite {
  state: playerState;
  constructor(x = 0, y = 0, texture: PIXI.Texture) {
    super(texture);
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.state = playerState.idle;
  }

  setState(state: playerState) {
    this.state = state;
  }

  tick(delta: number){
    this.y = this.y += 3 * delta;
  }
}

export default Player;
