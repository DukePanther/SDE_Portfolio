import Player from '../Player.js';
import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import QuestProgression from '../QuestProgression.js';
import MouseListener from '../MouseListener.js';

export default abstract class Scene {
  protected maxX: number;

  protected maxY: number;

  protected player: Player;

  protected keyListener: KeyListener;

  protected showEKey: boolean;

  protected showSpacekey: boolean;

  protected eKey: HTMLImageElement;

  protected spaceKey: HTMLImageElement;

  protected dialogueBlock: HTMLImageElement;

  protected dialogueBlockSmall: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  protected mouseListener: MouseListener;

  protected mousePosX: number;

  protected mousePosY: number;

  protected background: HTMLImageElement;

  protected playerPosX: number;

  protected playerPosY: number;


  public constructor(maxX: number, maxY: number, player: Player) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.player = player;
    this.keyListener = new KeyListener;
    this.showEKey = false;
    this.showSpacekey = false;
    this.eKey = CanvasRenderer.loadNewImage('./assets/Ekey.png');
    this.spaceKey = CanvasRenderer.loadNewImage('./assets/Spacekey.png');
    this.dialogueBlock = CanvasRenderer.loadNewImage('./assets/DialogueBlock.png');
    this.dialogueBlockSmall = CanvasRenderer.loadNewImage('./assets/DialogueBlock_small.png');
  }

  public abstract getNextScene(): Scene | null;
  public abstract update(elapsed: number, questProgression: QuestProgression): void;

  /**
   * renders the scenes
   * @param canvas where to render
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.clearCanvas(canvas);
    this.player.render(canvas);
  }
}
