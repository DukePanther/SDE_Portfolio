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
   * Renders the scenes
   * @param canvas where to render
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.clearCanvas(canvas);
    this.player.render(canvas);
  }

  /**
   * Handles collisions between the player and objects in the game world.
   * @param minX - The minimum X coordinate of the collision area.
   * @param maxX - The maximum X coordinate of the collision area.
   * @param minY - The minimum Y coordinate of the collision area.
   * @param maxY - The maximum Y coordinate of the collision area.
   * @param newX - The new X position for the player if a collision occurs.
   * @param newY - The new Y position for the player if a collision occurs.
   */
  protected handleCollision(minX: number, maxX: number, minY: number, maxY: number, newX: number, newY: number): void {
    if (this.player.getPosX() >= minX && this.player.getPosX() <= maxX &&
        this.player.getPosY() >= minY && this.player.getPosY() <= maxY) {
      this.player.spawnPos(newX, newY);
    }
  }
}
