import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import DesertLeft from './DesertLeft.js';
import KeyListener from '../KeyListener.js';
import QuestProgression from '../QuestProgression.js';
import EndScreen from './EndScreen.js';

export default class DesertRight extends Scene {
  private dialogueState: number;

  private bob: HTMLImageElement;

  private gloria: HTMLImageElement;

  private endGame: boolean;

  private sceneCanvas: HTMLCanvasElement;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Desert_Right.png');
    this.bob = CanvasRenderer.loadNewImage('./assets/NPC/Bob.png');
    this.gloria = CanvasRenderer.loadNewImage('./assets/NPC/Gloria.png');
  }

  /**
   * updates the DesertRight scene
   * @param elapsed time
   * @param questProgression quest status
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    //Gloria house
    if (this.player.getPosX() >= 1040 && this.player.getPosX() <= 1115 &&
    this.player.getPosY() >= 481 && this.player.getPosY() <= 496) {
      this.showEKey = true;
      // if bettyQuest not started
      if (questProgression.getQuestProgression('Betty') === 'NotBegan') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.dialogueState = 0;
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 0) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 1;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 1) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.player.setCantMove(false);
            this.showSpacekey = false;
            this.dialogueState = 0;
          }
        }
      }
      // if bettyQuest is started
      if (questProgression.getQuestProgression('Betty') === 'QuestStarted') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.dialogueState = 2;
          this.showSpacekey = true;
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
            this.dialogueState = 5;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 5) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 6;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 6) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 7;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 7) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.player.setCantMove(false);
            this.showSpacekey = false;
            questProgression.setQuestProgression('Gloria', 'QuestDone');
          }
        }
      }
    } else {
      this.showEKey = false;
    }

    if (questProgression.getQuestProgression('Gloria') === 'QuestDone') {
      this.endGame = true;
    }

    //upper border
    if (this.player.getPosY() <= 61) {
      this.player.spawnPos(this.player.getPosX(), 61);
    }

    //right border
    if (this.player.getPosX() >= 1184) {
      this.player.spawnPos(1184, this.player.getPosY());
    }

    //lowwer border
    if (this.player.getPosY() >= 604) {
      this.player.spawnPos(this.player.getPosX(), 604);
    }

    //collision lowwer left fence and river
    if (this.player.getPosY() >= 204 && this.player.getPosX() <= 450) {
      this.player.spawnPos(this.player.getPosX(), 204);
    }
    if (this.player.getPosY() >= 210 && this.player.getPosX() <= 456) {
      this.player.spawnPos(456, this.player.getPosY());
    }

    //collision desert house
    if (this.player.getPosY() >= 84 && this.player.getPosY() <= 200 &&
    this.player.getPosX() >= 900) {
      this.player.spawnPos(this.player.getPosX(), 84);
    }
    if (this.player.getPosY() >= 90 && this.player.getPosY() <= 475 &&
    this.player.getPosX() >= 894) {
      this.player.spawnPos(894, this.player.getPosY());
    }
    if (this.player.getPosY() >= 201 && this.player.getPosY() <= 481 &&
    this.player.getPosX() >= 900) {
      this.player.spawnPos(this.player.getPosX(), 481);
    }

    //upper river collision
    if (this.player.getPosX() >= 65 && this.player.getPosX() <= 295 &&
    this.player.getPosY() <= 86) {
      this.player.spawnPos(this.player.getPosX(), 86);
    }
    if (this.player.getPosX() >= 59 && this.player.getPosX() <= 200 &&
    this.player.getPosY() <= 80) {
      this.player.spawnPos(59, this.player.getPosY());
    }
    if (this.player.getPosX() >= 201 && this.player.getPosX() <= 301 &&
    this.player.getPosY() <= 80) {
      this.player.spawnPos(301, this.player.getPosY());
    }

    //lowwer river collision
    if (this.player.getPosX() >= 65 && this.player.getPosX() <= 295 &&
    this.player.getPosY() >= 194) {
      this.player.spawnPos(this.player.getPosX(), 194);
    }
    if (this.player.getPosX() >= 59 && this.player.getPosX() <= 200 &&
    this.player.getPosY() >= 200) {
      this.player.spawnPos(59, this.player.getPosY());
    }
    if (this.player.getPosX() >= 201 && this.player.getPosX() <= 301 &&
    this.player.getPosY() >= 200) {
      this.player.spawnPos(301, this.player.getPosY());
    }
  }

  /**
   * renders the DesertRight scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.sceneCanvas = canvas;
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
        canvas.height - this.eKey.height * 3);
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
    if (this.player.getCantMove() === true && this.dialogueState === 0) {
      CanvasRenderer.writeText(canvas,
        'You knocked on the door.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'But nobody answered...',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'Hello, who are you?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.gloria
        , canvas.width - this.gloria.width, canvas.height - this.gloria.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Hi I am Bob.<br>Who are you.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 4) {
      CanvasRenderer.writeText(canvas,
        'I am Gloria,<br>why are you here?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.gloria
        , canvas.width - this.gloria.width, canvas.height - this.gloria.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 5) {
      CanvasRenderer.writeText(canvas,
        'Recently our dam broke.<br>Do you know something<br>about this.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 6) {
      CanvasRenderer.writeText(canvas,
        'I admit I took some<br>parts from your dam,<br>I did not mean to break<br>it, though.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.gloria
        , canvas.width - this.gloria.width, canvas.height - this.gloria.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 7) {
      CanvasRenderer.writeText(canvas,
        'I am so sorry I<br>broke your dam.<br>I will give you the parts<br>of your dam back.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.gloria
        , canvas.width - this.gloria.width, canvas.height - this.gloria.height);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosX() <= 0) {
      this.player.spawnPos(this.maxX - this.player.getWidth() - 5, (this.player.getPosY()));
      return new DesertLeft(this.maxX, this.maxY, this.player);
    }
    if (this.endGame) {
      this.player.spawnPos(this.maxX, this.maxY);
      this.player.setCantMove(true);
      return new EndScreen(this.maxX, this.maxY, this.player, this.sceneCanvas);
    }
    return null;
  }
}
