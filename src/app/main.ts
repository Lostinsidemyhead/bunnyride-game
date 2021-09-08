import * as PIXI from "pixi.js";
import App from "./app";

const loader = new PIXI.Loader();
loader.add("/assets/ui/ui_sheet.json").load(init);
function init() {
  const app = new App();
  app.ticker.add((delta) => app.tick(delta));
}
