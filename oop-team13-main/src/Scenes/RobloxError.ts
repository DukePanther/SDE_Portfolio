/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import QuestProgression from '../QuestProgression.js';
import Computer from './Computer.js';
import Scene from './Scene.js';

export default class RobloxError extends Scene {
  private closeScene: boolean;

  private sceneCanvas: HTMLCanvasElement;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, posX: number, posY: number) {
    super(maxX, maxY, player);
    this.sceneCanvas = canvas;
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Roblox_Error.png');
    this.closeScene = false;
    this.keyListener = new KeyListener;
    this.mouseListener = new MouseListener(canvas);
    this.playerPosX = posX;
    this.playerPosY = posY;
  }

  /**
   * updates values of the game
   * @param elapsed elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;

    if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
      this.closeScene = true;
    }
    if (this.mousePosX >= 321 && this.mousePosX <= 961
      && this.mousePosY >= 447 && this.mousePosY <= 510
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      this.closeScene = true;
    }
    this.getNextScene();
  }

  /**
   * renders items to the game
   * @param canvas area to execute functions
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, (this.maxX - this.background.width) / 2, 0);
  }

  public override getNextScene(): Scene {
    if (this.closeScene) {
      return new Computer(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }
}

