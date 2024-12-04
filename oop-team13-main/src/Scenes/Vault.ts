import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import QuestProgression from '../QuestProgression.js';
import Scene from './Scene.js';
import VillageMiddle from './VillageMiddle.js';

export default class Vault extends Scene {
  private image: HTMLImageElement;

  private vaultDigit1: number;

  private vaultDigit2: number;

  private vaultDigit3: number;

  private digit1: boolean;

  private digit2: boolean;

  private digit3: boolean;

  private posX: number;

  private posY: number;

  private secondChance: boolean;

  private sceneCanvas: HTMLCanvasElement;

  private dialogueState: number;

  private vilMid: boolean;

  private yellowFlower: HTMLImageElement;

  private pinkFlower: HTMLImageElement;

  private blueFlower: HTMLImageElement;

  private cactus: HTMLImageElement;

  private sunflower: HTMLImageElement;

  private mushroom: HTMLImageElement;

  private tipPopup: HTMLImageElement;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, posX: number, posY: number) {
    super(maxX, maxY, player);
    this.image = CanvasRenderer.loadNewImage('./assets/Vault.png');
    this.mouseListener = new MouseListener(canvas);
    this.vaultDigit1 = 0;
    this.vaultDigit2 = 0;
    this.vaultDigit3 = 0;
    this.digit1 = false;
    this.digit2 = false;
    this.digit3 = false;
    this.posX = posX;
    this.posY = posY;
    this.secondChance = false;
    this.sceneCanvas = canvas;
    this.dialogueState = 0;
    this.vilMid = false;
    this.yellowFlower = CanvasRenderer.loadNewImage('./assets/FlowerYellow.png');
    this.pinkFlower = CanvasRenderer.loadNewImage('./assets/FlowerPink.png');
    this.blueFlower = CanvasRenderer.loadNewImage('./assets/FlowerBlue.png');
    this.cactus = CanvasRenderer.loadNewImage('./assets/cactus.png');
    this.sunflower = CanvasRenderer.loadNewImage('./assets/sunflower.png');
    this.mushroom = CanvasRenderer.loadNewImage('./assets/MushroomSingle.png');
    this.tipPopup = CanvasRenderer.loadNewImage('./assets/TipPopup.png');
  }


  public override getNextScene(): Scene | null{
    if (this.secondChance) {
      return new Vault(this.maxX, this.maxY, this.player, this.sceneCanvas, this.posX, this.posY);
    }
    if (this.vilMid) {
      return new VillageMiddle(this.maxX, this.maxY, this.player);
    }
    return null;
  }

  /**
   * updates the values of the game
   * @param elapsed time elapsed since initiation
   * @param questProgression calls the class of questprogression to change or read queststatus
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    // button 1
    if (this.mousePosX >= 540 && this.mousePosX <= 620
      && this.mousePosY >= 280 && this.mousePosY <= 360) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 1;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 1;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 1;
          this.digit3 = true;
        }
      }
    }
    // button 2
    if (this.mousePosX >= 640 && this.mousePosX <= 720
      && this.mousePosY >= 280 && this.mousePosY <= 360) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 2;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 2;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 2;
          this.digit3 = true;
        }
      }
    }
    // button 3
    if (this.mousePosX >= 740 && this.mousePosX <= 820
      && this.mousePosY >= 280 && this.mousePosY <= 360) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 3;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 3;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 3;
          this.digit3 = true;
        }
      }
    }
    // button 4
    if (this.mousePosX >= 540 && this.mousePosX <= 620
      && this.mousePosY >= 380 && this.mousePosY <= 460) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 4;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 4;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 4;
          this.digit3 = true;
        }
      }
    }
    // button 5
    if (this.mousePosX >= 640 && this.mousePosX <= 720
      && this.mousePosY >= 380 && this.mousePosY <= 460) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 5;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 5;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 5;
          this.digit3 = true;
        }
      }
    }
    // button 6
    if (this.mousePosX >= 740 && this.mousePosX <= 820
      && this.mousePosY >= 380 && this.mousePosY <= 460) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 6;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 6;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 6;
          this.digit3 = true;
        }
      }
    }
    // button 7
    if (this.mousePosX >= 540 && this.mousePosX <= 620
      && this.mousePosY >= 480 && this.mousePosY <= 560) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 7;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 7;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 7;
          this.digit3 = true;
        }
      }
    }
    // button 8
    if (this.mousePosX >= 640 && this.mousePosX <= 720
      && this.mousePosY >= 480 && this.mousePosY <= 560) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 8;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 8;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 8;
          this.digit3 = true;
        }
      }
    }
    // button 9
    if (this.mousePosX >= 740 && this.mousePosX <= 820
      && this.mousePosY >= 480 && this.mousePosY <= 560) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 9;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 9;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 9;
          this.digit3 = true;
        }
      }
    }
    // button 0
    if (this.mousePosX >= 840 && this.mousePosX <= 920
      && this.mousePosY >= 480 && this.mousePosY <= 560) {
      if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        if (this.digit1 === false && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit1 = 0;
          this.digit1 = true;
        } else if (this.digit1 === true && this.digit2 === false && this.digit3 === false) {
          this.vaultDigit2 = 0;
          this.digit2 = true;
        } else if (this.digit1 === true && this.digit2 === true && this.digit3 === false) {
          this.vaultDigit3 = 0;
          this.digit3 = true;
        }
      }
    }
    if (this.mousePosX <= 70 && this.mousePosY <= 70
      && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.showSpacekey = false;
      this.vilMid = true;
      this.player.setCantMove(false);
      this.player.spawnPos(982, 401);
      this.getNextScene();
    }
    if (this.mousePosX >= 170 && this.mousePosX <= 230 &&
      this.mousePosY <= 70 &&
      this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT) &&
      this.dialogueState === 0) {
      this.dialogueState = 2;
    }
    if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT) &&
      this.dialogueState === 2) {
      this.dialogueState = 0;
    }
    if (this.digit1 === true && this.digit2 === true && this.digit3 === true) {
      if (this.vaultDigit1 === questProgression.getVaultPinAnswer(1)
      && this.vaultDigit2 === questProgression.getVaultPinAnswer(2)
      && this.vaultDigit3 === questProgression.getVaultPinAnswer(3)) {
        questProgression.setQuestProgression('Felix', 'QuestDone');
        this.showSpacekey = true;
        this.dialogueState = 1;
        if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
          this.showSpacekey = false;
          this.vilMid = true;
          this.player.setCantMove(false);
          this.player.spawnPos(982, 401);
          this.getNextScene();
        }
      } else {
        this.secondChance = true;
        this.getNextScene();
      }
    }
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
  }

  /**
   * renders the items to the game
   * @param canvas area to execute the functions
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
    CanvasRenderer.writeText(canvas, `${this.vaultDigit1}`, 600, 210, 'center', 'monospace', 40, 'white');
    CanvasRenderer.writeText(canvas, `${this.vaultDigit2}`, 680, 210, 'center', 'monospace', 40, 'white');
    CanvasRenderer.writeText(canvas, `${this.vaultDigit3}`, 760, 210, 'center', 'monospace', 40, 'white');
    CanvasRenderer.drawImage(canvas, this.yellowFlower, 90, 350);
    CanvasRenderer.drawImage(canvas, this.pinkFlower, 90, 470);
    CanvasRenderer.drawImage(canvas, this.blueFlower, 90, 230);
    CanvasRenderer.drawImage(canvas, this.cactus, 210, 230);
    CanvasRenderer.drawImage(canvas, this.sunflower, 210, 345);
    CanvasRenderer.drawImage(canvas, this.mushroom, 210, 470);
    CanvasRenderer.fillRectangle(canvas, 155, 255, 40, 10, 'black');
    CanvasRenderer.fillRectangle(canvas, 155, 375, 40, 10, 'black');
    CanvasRenderer.fillRectangle(canvas, 170, 470, 10, 40, 'black');
    CanvasRenderer.fillRectangle(canvas, 155, 485, 40, 10, 'black');
    if (this.player.getCantMove() && this.dialogueState === 1) {
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 1.5);
    }
    if (this.showSpacekey && this.dialogueState === 1) {
      CanvasRenderer.drawImage(
        canvas,
        this.spaceKey,
        (canvas.width - this.spaceKey.width) / 2,
        canvas.height - this.spaceKey.height * 2);
    }
    if (this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'that appears to be<br>correct, here is the<br>blueprint you wanted.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
    }
    if (this.dialogueState === 2) {
      CanvasRenderer.drawImage(canvas, this.tipPopup,
        (canvas.width - this.tipPopup.width) / 2,
        canvas.height - this.tipPopup.height);
      CanvasRenderer.writeText(canvas,
        'I saw those very specific<br>cactuses somewhere in the<br>desert. And there are only<br>very few of those mushrooms<br>(probably less than 5)',
        (canvas.width - this.tipPopup.width) / 1.84,
        canvas.height - this.tipPopup.height / 1.4);
    }
  }
}
