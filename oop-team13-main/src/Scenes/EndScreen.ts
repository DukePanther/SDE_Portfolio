/* eslint-disable @typescript-eslint/no-unused-vars */
import QuestProgression from '../QuestProgression.js';
import Scene from './Scene.js';
import Player from '../Player.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import VillageUp from './VillageUp.js';

export default class EndScreen extends Scene {
  public constructor(maxX: number, maxY: number, player: Player, canvas: HTMLCanvasElement) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Endscreen.png');
    this.mouseListener = new MouseListener(canvas);
  }

  /**
   * updates EndScreen
   * @param elapsed time
   * @param questProgression of Endscreen
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
  }

  /**
   * renders the endscreen
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      0,
      0
    );
  }

  public override getNextScene(): Scene | null{
    if (this.mousePosX >= 510 && this.mousePosX <= 770
      && this.mousePosY >= 470 && this.mousePosY <= 570
      && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.player.spawnPos(270, 410);
      this.player.setCantMove(false);
      return new VillageUp(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
