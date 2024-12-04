/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import QuestProgression from '../QuestProgression.js';
import Credits from './Credits.js';
import Scene from './Scene.js';
import VillageUp from './VillageUp.js';

export default class StartScreen extends Scene {
  private image: HTMLImageElement;

  private start: boolean;

  private credits: boolean;

  private sceneCanvas: HTMLCanvasElement;

  public constructor(maxX: number, maxY: number, player: Player, canvas: HTMLCanvasElement) {
    super(maxX, maxY, player);
    this.image = CanvasRenderer.loadNewImage('./assets/Scenes/StartScreen.png');
    this.start = false;
    this.credits = false;
    this.sceneCanvas = canvas;
    this.mouseListener = new MouseListener(this.sceneCanvas);
  }

  public override getNextScene(): Scene {
    if (this.start) {
      this.player.setCantMove(false);
      this.player.spawnPos(270, 410);
      return new VillageUp(this.maxX, this.maxY, this.player);
    }
    if (this.credits) {
      return new Credits(this.maxX, this.maxY, this.player, this.sceneCanvas);
    }
    return null;
  }

  /**
   *
   * @param elapsed Elapsed time
   * @param questProgression Connect with 'Questprogression'.
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
    if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.mousePosX >= 511 && this.mousePosX <= 770
        && this.mousePosY >= 470 && this.mousePosY <= 570) {
        this.credits = true;
      }
      if (this.mousePosX >= 511 && this.mousePosX <= 770
        && this.mousePosY >= 310 && this.mousePosY <= 410) {
        this.start = true;
      }
    }
  }

  /**
   * renders Start screen
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
