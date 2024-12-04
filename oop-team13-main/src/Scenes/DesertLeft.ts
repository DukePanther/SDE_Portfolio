/* eslint-disable @typescript-eslint/no-unused-vars */
import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageDown from './VillageDown.js';
import DesertRight from './DesertRight.js';
import QuestProgression from '../QuestProgression.js';
import KeyListener from '../KeyListener.js';

export default class DesertLeft extends Scene {
  private cluesActive: boolean;

  private clueObject: HTMLImageElement;

  private showMessage: boolean;


  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Desert_Left.png');
    this.cluesActive = false;
    this.clueObject = CanvasRenderer.loadNewImage('./assets/ClueObject.png');
    this.showMessage = false;
  }

  /**
   * updates the DesertLeft scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    if (questProgression.getQuestProgression('Mira') === 'QuestClueSeen') {
      this.cluesActive = true;
    } else {
      this.cluesActive = false;
    }

    // collision upper left rocks
    if (this.player.getPosY() <= 70 && this.player.getPosX() <= 542) {
      this.player.spawnPos(this.player.getPosX(), 69);
    }
    if (this.player.getPosY() <= 63 && this.player.getPosX() <= 550) {
      this.player.spawnPos(548, this.player.getPosY());
    }

    // collision upper right rocks
    if (this.player.getPosY() <= 70 && this.player.getPosX() >= 689) {
      this.player.spawnPos(this.player.getPosX(), 70);
    }
    if (this.player.getPosY() <= 63 && this.player.getPosX() >= 682) {
      this.player.spawnPos(682, this.player.getPosY());
    }

    // collision left rocks
    if (this.player.getPosX() <= 211) {
      this.player.spawnPos(211, this.player.getPosY());
    }

    //upper left fence collisions
    if (this.player.getPosX() <= 460 &&
      this.player.getPosY() >= 205 && this.player.getPosY() <= 300) {
      this.player.spawnPos(460, this.player.getPosY());
    }
    if (this.player.getPosX() <= 455 &&
      this.player.getPosY() >= 205 && this.player.getPosY() <= 308) {
      this.player.spawnPos(this.player.getPosX(), 308);
    }
    if (this.player.getPosX() <= 455 &&
      this.player.getPosY() >= 197 && this.player.getPosY() <= 300) {
      this.player.spawnPos(this.player.getPosX(), 197);
    }

    //upper right fence collisions
    if (this.player.getPosX() >= 538 &&
      this.player.getPosY() >= 205 && this.player.getPosY() <= 300) {
      this.player.spawnPos(538, this.player.getPosY());
    }
    if (this.player.getPosX() >= 544 &&
      this.player.getPosY() >= 205 && this.player.getPosY() <= 308) {
      this.player.spawnPos(this.player.getPosX(), 308);
    }
    if (this.player.getPosX() >= 544 &&
      this.player.getPosY() >= 200 && this.player.getPosY() <= 300) {
      this.player.spawnPos(this.player.getPosX(), 197);
    }

    //left fence collisions
    if (this.player.getPosY() >= 200 && this.player.getPosX() <= 295) {
      this.player.spawnPos(295, this.player.getPosY());
    }

    // collision lowwer fence
    if (this.player.getPosY() >= 605) {
      this.player.spawnPos(this.player.getPosX(), 605);
    }

    // border for BettyQuest
    if (questProgression.getQuestProgression('Betty') !== 'QuestStarted') {
      if (this.player.getPosX() >= 1186) {
        this.player.spawnPos(1183, this.player.getPosY());
      }
      if (this.player.getPosX() >= 1153 && this.player.getPosX() <= 1200
        && this.player.getPosY() >= 70 && this.player.getPosY() <= 197) {
        this.showMessage = true;
      } else {
        this.showMessage = false;
      }
    }

    if (this.player.getPosX() + this.player.getWidth() >= 878
      && this.player.getPosX() <= 928
      && this.player.getPosY() + this.player.getHeight() >= 547
      && this.player.getPosY() <= 597
      && questProgression.getQuestProgression('Mira') === 'QuestClueSeen') {
      this.showEKey = true;
      if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
        questProgression.setQuestProgression('Mira', 'QuestClueDone');
        this.showEKey = false;
      }
    }
  }

  /**
   * renders the DesertLeft scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      0,
      0
    );
    if (this.cluesActive) {
      CanvasRenderer.drawImage(canvas, this.clueObject, 878, 547);
    }
    if (this.showEKey) {
      CanvasRenderer.drawImage(canvas, this.eKey, (canvas.width - this.eKey.width) / 2,
        canvas.height - this.eKey.height * 3);
    }
    if (this.showMessage) {
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 1.5);
      CanvasRenderer.writeText(canvas, 'You can not enter <br>this area yet. <br>Complete all the quests <br>first.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosY() <= 0) {
      this.player.spawnPos(this.player.getPosX(), (this.maxY - this.player.getHeight() - 5));
      return new VillageDown(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosX() >= this.maxX - this.player.getWidth()) {
      this.player.spawnPos(0 + 5, this.player.getPosY());
      return new DesertRight(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
