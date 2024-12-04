/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import QuestProgression from '../QuestProgression.js';
import Scene from './Scene.js';
import StartScreen from './StartScreen.js';

export default class Credits extends Scene {
  private image: HTMLImageElement;

  private sceneCanvas: HTMLCanvasElement;

  private goBack: boolean;

  public constructor(maxX: number, maxY: number, player: Player, canvas: HTMLCanvasElement) {
    super(maxX, maxY, player);
    this.image = CanvasRenderer.loadNewImage('./assets/Scenes/CreditsScreen.png');
    this.sceneCanvas = canvas;
    this.goBack = false;
    this.mouseListener = new MouseListener(this.sceneCanvas);
  }

  public override getNextScene(): Scene {
    if (this.goBack) {
      return new StartScreen(this.maxX, this.maxY, this.player, this.sceneCanvas);
    }
    return null;
  }

  /**
   * updates the Credits scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
    if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.mousePosX <= 180 && this.mousePosY <= 90) {
        this.goBack = true;
      }
    }
  }

  /**
   * renders the Credits scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
