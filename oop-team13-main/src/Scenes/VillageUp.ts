/* eslint-disable @typescript-eslint/no-unused-vars */
import KeyListener from '../KeyListener.js';
import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageMiddle from './VillageMiddle.js';
import HouseBob from './HouseBob.js';
import QuestProgression from '../QuestProgression.js';

export default class VillageUp extends Scene {
  private enterHouseBob: boolean;

  private dialogueState: number;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Village_Up.png');

    this.enterHouseBob = false;

    this.dialogueState = 0;
  }

  /**
   * updates the VillageUp scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    if (questProgression.getGameOpenedFirstTime()) {
      questProgression.setGameOpenedFirstTime(false);
      this.dialogueState = 1;
      this.player.setCantMove(true);
      this.showSpacekey = true;
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.dialogueState = 2;
      }
    }
    if (this.player.getCantMove() === true && this.dialogueState === 2) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.dialogueState = 3;
      }
    }
    if (this.player.getCantMove() === true && this.dialogueState === 3) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.dialogueState = 4;
      }
    }
    if (this.player.getCantMove() === true && this.dialogueState === 4) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.dialogueState = 0;
        this.showSpacekey = false;
        this.player.setCantMove(false);
      }
    }

    //left border
    if (this.player.getPosX() <= 56) {
      this.player.spawnPos(56, this.player.getPosY());
    }

    //right border
    if (this.player.getPosX() >= 944) {
      this.player.spawnPos(944, this.player.getPosY());
    }

    //upper border
    if (this.player.getPosY() <= 56) {
      this.player.spawnPos(this.player.getPosX(), 56);
    }

    //lowwer left fence collision
    if (this.player.getPosY() >= 604 && this.player.getPosX() <= 530) {
      this.player.spawnPos(this.player.getPosX(), 604);
    }
    if (this.player.getPosY() >= 610 && this.player.getPosX() <= 536) {
      this.player.spawnPos(536, this.player.getPosY());
    }

    //lowwer right fence collision
    if (this.player.getPosY() >= 605 && this.player.getPosX() >= 711) {
      this.player.spawnPos(this.player.getPosX(), 605);
    }
    if (this.player.getPosY() >= 606 && this.player.getPosX() >= 705) {
      this.player.spawnPos(705, this.player.getPosY());
    }

    //chicken coop collision
    if (this.player.getPosX() >= 710 && this.player.getPosX() <= 930 &&
    this.player.getPosY() <= 319) {
      this.player.spawnPos(this.player.getPosX(), 319);
    }
    if (this.player.getPosX() >= 704 && this.player.getPosX() <= 820 &&
    this.player.getPosY() <= 314) {
      this.player.spawnPos(704, this.player.getPosY());
    }
    if (this.player.getPosX() >= 820 && this.player.getPosX() <= 936 &&
    this.player.getPosY() <= 314) {
      this.player.spawnPos(936, this.player.getPosY());
    }

    //collision left side house
    if (this.player.getPosX() >= 94 && this.player.getPosX() <= 300 &&
    this.player.getPosY() >= 90 && this.player.getPosY() <= 395) {
      this.player.spawnPos(94, this.player.getPosY());
    }
    //collision right side house
    if (this.player.getPosX() >= 301 && this.player.getPosX() <= 586 &&
    this.player.getPosY() >= 90 && this.player.getPosY() <= 395) {
      this.player.spawnPos(586, this.player.getPosY());
    }
    //collision upper side house
    if (this.player.getPosX() >= 100 && this.player.getPosX() <= 580 &&
    this.player.getPosY() >= 84 && this.player.getPosY() <= 200) {
      this.player.spawnPos(this.player.getPosX(), 84);
    }
    //collision lowwer side house
    if (this.player.getPosX() >= 100 && this.player.getPosX() <= 580 &&
    this.player.getPosY() >= 201 && this.player.getPosY() <= 401) {
      this.player.spawnPos(this.player.getPosX(), 401);
    }

    if (this.player.getPosX() >= 290 && this.player.getPosX() <= 390 &&
    this.player.getPosY() >= 400 && this.player.getPosY() <= 405) {
      this.showEKey = true;
      if(this.keyListener.keyPressed(KeyListener.KEY_E)) {
        this.enterHouseBob = true;
      }
    } else {
      this.showEKey = false;
    }
  }

  /**
   * renders the VillageUp scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.clearCanvas(canvas);
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      0,
      0
    );
    if (this.showEKey) {
      CanvasRenderer.drawImage(
        canvas,
        this.eKey,
        (canvas.width - this.eKey.width) / 2,
        canvas.height - this.eKey.height * 1.5);
    }
    if (this.showSpacekey) {
      CanvasRenderer.drawImage(
        canvas,
        this.spaceKey,
        (canvas.width - this.spaceKey.width) / 2,
        canvas.height - this.spaceKey.height * 2);
    }
    if (this.player.getCantMove() === true) {
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 1.5);
    }

    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'One day, somehow,<br>the dam of Damville<br>broke down.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'Nobody knows who or<br>what is behind it.<br>So now it is your<br>time to shine!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Speak with the animals<br>of the village, help<br>them and maybe they<br>will help you...',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 4) {
      CanvasRenderer.writeText(canvas,
        'Good luck, Bob!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public getNextScene(): Scene | null {
    // Determine the player position to see if a next Scene is required (return null otherwise)
    if (this.player.getPosY() + this.player.getHeight() >= this.maxY) {
      this.player.spawnPos(this.player.getPosX(), 0 + 5);
      return new VillageMiddle(this.maxX, this.maxY, this.player);
    }
    if (this.enterHouseBob) {
      this.player.spawnPos(620, 390);
      this.enterHouseBob = false;
      return new HouseBob(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
