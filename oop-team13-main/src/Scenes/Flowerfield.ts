import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageDown from './VillageDown.js';
import QuestProgression from '../QuestProgression.js';
import Flower from '../Flower.js';

export default class Flowerfield extends Scene {
  private flowers: Flower[];

  private spawnFlowers: boolean;

  private flowersAdded: boolean;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Flowerfield.png');
    this.flowers = [];
    this.spawnFlowers = false;
    this.flowersAdded = false;
  }

  /**
   * updates the Flowerfield scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    //border up
    if (this.player.getPosY() <= 61) {
      this.player.spawnPos(this.player.getPosX(), 61);
    }

    //border right
    if (this.player.getPosX() >= 944 && this.player.getPosY() <= 400) {
      this.player.spawnPos(944, this.player.getPosY());
    }

    //collision lowwer stone
    if (this.player.getPosY() >= 609 && this.player.getPosX() >= 1170) {
      this.player.spawnPos(this.player.getPosX(), 609);
    }
    if (this.player.getPosY() >= 615 && this.player.getPosX() >= 1164) {
      this.player.spawnPos(1164, this.player.getPosY());
    }

    //lowwer border
    if (this.player.getPosY() >= 680) {
      this.player.spawnPos(this.player.getPosX(), 680);
    }

    //collision lowwer tree
    if (this.player.getPosY() >= 524 && this.player.getPosX() <= 70) {
      this.player.spawnPos(this.player.getPosX(), 524);
    }
    if (this.player.getPosY() >= 530 && this.player.getPosX() <= 76) {
      this.player.spawnPos(76, this.player.getPosY());
    }

    //left fence border
    if (this.player.getPosY() <= 400 && this.player.getPosX() <= 136) {
      this.player.spawnPos(136, this.player.getPosY());
    }

    //left border
    if (this.player.getPosX() <= 0) {
      this.player.spawnPos(0, this.player.getPosY());
    }

    //collision lowwer left fence
    if (this.player.getPosY() >= 364 && this.player.getPosY() <= 400 &&
    this.player.getPosX() <= 530) {
      this.player.spawnPos(this.player.getPosX(), 364);
    }
    if (this.player.getPosY() >= 370 && this.player.getPosY() <= 455 &&
    this.player.getPosX() <= 536) {
      this.player.spawnPos(536, this.player.getPosY());
    }
    if (this.player.getPosY() <= 461 && this.player.getPosY() >= 401 &&
    this.player.getPosX() <= 530) {
      this.player.spawnPos(this.player.getPosX(), 461);
    }

    //collision lowwer right fence
    if (this.player.getPosY() >= 364 && this.player.getPosY() <= 400 &&
    this.player.getPosX() >= 630) {
      this.player.spawnPos(this.player.getPosX(), 364);
    }
    if (this.player.getPosY() >= 370 && this.player.getPosY() <= 455 &&
    this.player.getPosX() >= 624) {
      this.player.spawnPos(624, this.player.getPosY());
    }
    if (this.player.getPosY() <= 461 && this.player.getPosY() >= 401 &&
    this.player.getPosX() >= 630) {
      this.player.spawnPos(this.player.getPosX(), 461);
    }

    // collision upper stone
    if (this.player.getPosY() <= 546 && this.player.getPosX() >= 1170) {
      this.player.spawnPos(this.player.getPosX(), 546);
    }
    if (this.player.getPosY() <= 540 && this.player.getPosX() >= 1164) {
      this.player.spawnPos(1164, this.player.getPosY());
    }

    if (questProgression.getQuestProgression('Felix') === 'QuestStarted' && this.flowersAdded === false) {
      for(let i: number = 0; i < (questProgression.getVaultPinAnswer(1) + 4); i++) {
        this.flowers.push(new Flower(this.maxX, this.maxY, 'Blue'));
      }
      for(let i: number = 0; i < (questProgression.getVaultPinAnswer(2) + 6); i++) {
        this.flowers.push(new Flower(this.maxX, this.maxY, 'Yellow'));
      }
      for(let i: number = 0; i < (questProgression.getVaultPinAnswer(3) - 3); i++) {
        this.flowers.push(new Flower(this.maxX, this.maxY, 'Pink'));
      }
      this.spawnFlowers = true;
      this.flowersAdded = true;
    }
  }

  /**
   * renders the Flowerfield scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      0,
      0
    );
    if (this.spawnFlowers) {
      this.flowers.forEach((items: Flower) => items.render(canvas));
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosX() >= this.maxX - this.player.getWidth()) {
      this.player.spawnPos(0 + 5, this.player.getPosY());
      return new VillageDown(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
