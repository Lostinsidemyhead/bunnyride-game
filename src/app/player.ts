import * as PIXI from "pixi.js";
import { playerState } from "./types";

class Player extends PIXI.Sprite {
  state: playerState;
  up!: boolean;
  canJump = false;
  constructor(x = 0, y = 0, texture: PIXI.Texture) {
    super(texture);
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.state = playerState.idle;
    this.up = false;
    this.tick = this.tick.bind(this);
    this.keyDown = this.keyDown.bind(this);

    window.addEventListener("keydown", this.keyDown);
  }

  keyDown(e: KeyboardEvent) {
    if (e.code === "Space") {
      this.up = true;
      setTimeout(() => {
        this.up = false;
        this.canJump = false;
      }, 500);
    }
  }

  setState(state: playerState) {
    this.state = state;
  }

  tick(delta: number, isFalling: boolean) {
    if (!isFalling) {
      this.canJump = true;
    }
    if (this.up && this.canJump) {
      this.y = this.y -= 5 * delta;
    } else if (isFalling) {
      this.y = this.y += 3 * delta;
    }
  }
}

export default Player;
