/* eslint-disable @typescript-eslint/no-unused-vars */
import KeyListener from '../KeyListener.js';
import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import VillageUp from './VillageUp.js';
import Computer from './Computer.js';
import QuestProgression from '../QuestProgression.js';
import ComputerStartScreen from './ComputerStartScreen.js';

export default class HouseBob extends Scene {
  private computerOpen: boolean;

  private exitHouseBob: boolean;

  private bob: HTMLImageElement;

  private passwordScreen: boolean;

  private dialogueState: number;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);

    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/HouseBob.png');

    this.exitHouseBob = false;

    this.computerOpen = false;

    this.passwordScreen = true;

    this.dialogueState = 0;

    this.bob = CanvasRenderer.loadNewImage('./assets/NPC/Bob.png');
  }

  /**
   *
   * @param elapsed Elapsed time
   * @param questProgression Connect with 'Questprogression'.
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);
    if (this.player.getPosX() >= 615 && this.player.getPosX() <= 625 &&
    this.player.getPosY() >= 400 && this.player.getPosY() <= 600) {
      this.showEKey = true;
      if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
        this.exitHouseBob = true;
      }
    } else if (this.player.getPosX() >= 0 && this.player.getPosX() <= 540 &&
    this.player.getPosY() >= 0 && this.player.getPosY() <= 390) {
      this.showEKey = true;
      if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
        this.player.setCantMove(true);
        this.computerOpen = true;
      }
    } else if (this.player.getPosX() >= 720 && this.player.getPosX() <= 730 &&
    this.player.getPosY() >= 250 && this.player.getPosY() <= 320) {
      this.showEKey = true;
      if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
        this.player.setCantMove(true);
        this.showSpacekey = true;
      }
      if (this.player.getCantMove() === true) {
        if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
          this.player.setCantMove(false);
          this.showSpacekey = false;
        }
      }
    } else {
      this.showEKey = false;
    }

    if(questProgression.getStartScreen() === false) {
      this.passwordScreen = false;
    }

    if (questProgression.getShowComputerCrashDialogue()) {
      this.dialogueState = 1;
      this.player.setCantMove(true);
      this.showSpacekey = true;
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        questProgression.setShowComputerCrashDialogue(false);
        this.dialogueState = 0;
        this.showSpacekey = false;
        this.player.setCantMove(false);
      }
    }

    // collision muur linksonder
    if (this.player.getPosX() <= 610 && this.player.getPosY() >= 399) {
      this.player.spawnPos(this.player.getPosX(), 399);
    }
    if (this.player.getPosX() <= 616 && this.player.getPosY() >= 405 ) {
      this.player.spawnPos(616, this.player.getPosY());
    }

    //collision muur links
    if (this.player.getPosX() <= 441) {
      this.player.spawnPos(441, this.player.getPosY());
    }

    //collision muur boven
    if (this.player.getPosY() <= 281) {
      this.player.spawnPos(this.player.getPosX(), 281);
    }

    //bed en tafel collision
    if (this.player.getPosX() >= 724) {
      this.player.spawnPos(724, this.player.getPosY());
    }

    //pc collision
    if (this.player.getPosY() <= 379 && this.player.getPosX() <= 510) {
      this.player.spawnPos(this.player.getPosX(), 379);
    }
    if (this.player.getPosY() <= 373 && this.player.getPosX() <= 516) {
      this.player.spawnPos(516, this.player.getPosY());
    }

    //muur rechtsonder collision
    if (this.player.getPosY() >= 399 && this.player.getPosX() >= 630) {
      this.player.spawnPos(this.player.getPosX(), 399);
    }
    if (this.player.getPosY() >= 405 && this.player.getPosX() >= 624) {
      this.player.spawnPos(624, this.player.getPosY());
    }

    //door collision
    if (this.player.getPosY() >= 410) {
      this.player.spawnPos(this.player.getPosX(), 410);
    }
  }

  /**
   * renders Bob's house
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      (canvas.width - this.background.width) / 2,
      (canvas.height - this.background.height) / 2
    );
    if (this.showEKey) {
      CanvasRenderer.drawImage(
        canvas,
        this.eKey,
        (canvas.width - this.eKey.width) / 2,
        canvas.height - this.eKey.height * 3);
    }
    if (this.showSpacekey) {
      CanvasRenderer.drawImage(
        canvas,
        this.spaceKey,
        (canvas.width - this.spaceKey.width) / 2,
        canvas.height - this.spaceKey.height * 2);
    }

    if (this.player.getCantMove() === true && this.dialogueState === 0) {
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 1.5);
      CanvasRenderer.writeText(canvas,
        'I do not want to sleep.<br>I have to solve<br>the mystery first and<br>save the village!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 1.5);
      CanvasRenderer.writeText(canvas,
        'Oh no,<br>my computer crashed!<br>No more clicking<br>pop-ups, I guess.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
  }

  public override getNextScene(): Scene | null {
    if (this.exitHouseBob) {
      this.player.spawnPos(340, 420);
      this.exitHouseBob = false;
      return new VillageUp(this.maxX, this.maxY, this.player);
    }
    if (this.computerOpen) {
      this.playerPosX = this.player.getPosX();
      this.playerPosY = this.player.getPosY();
      this.player.spawnPos(this.maxX, this.maxY);
      if (this.passwordScreen === true) {
        return new ComputerStartScreen(this.maxX, this.maxY,
          this.player, this.canvas, this.playerPosX, this.playerPosY);
      } else {
        return new Computer(this.maxX, this.maxY, this.player,
          this.canvas, this.playerPosX, this.playerPosY);
      }
      return new Computer(this.maxX, this.maxY, this.player
        , this.canvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }
}
