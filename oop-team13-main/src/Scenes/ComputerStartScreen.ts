import CanvasRenderer from '../CanvasRenderer.js';
import KeyListener from '../KeyListener.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import QuestProgression from '../QuestProgression.js';
import Computer from './Computer.js';
import HouseBob from './HouseBob.js';
import Scene from './Scene.js';

export default class ComputerStartScreen extends Scene {
  private sceneCanvas: HTMLCanvasElement;

  private passwordOptionBlock1: HTMLImageElement;

  private passwordOptionBlock2: HTMLImageElement;

  private passwordOptionBlock3: HTMLImageElement;

  private passwordOptionBlock4: HTMLImageElement;

  private passwordBlock: HTMLImageElement;

  private computerScreen: boolean;

  private heart1: HTMLImageElement;

  private heart2: HTMLImageElement;

  private heart3: HTMLImageElement;

  private lives: number;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, posX: number, posY: number) {
    super(maxX, maxY, player);
    this.sceneCanvas = canvas;
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/StartupScreen.png');
    this.passwordOptionBlock1 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    this.passwordOptionBlock2 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    this.passwordOptionBlock3 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    this.passwordOptionBlock4 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    this.passwordBlock = CanvasRenderer.loadNewImage('./assets/PasswordBlock.png');
    this.computerScreen = false;
    this.keyListener = new KeyListener;
    this.mouseListener = new MouseListener(canvas);
    this.lives = 3;
    this.heart1 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.heart2 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.heart3 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.playerPosX = posX;
    this.playerPosY = posY;
  }

  /**
   * updates the ComputerStartScreen scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    //hover for password
    if (this.mousePosX >= 440 && this.mousePosX <= 693
      && this.mousePosY >= 400 && this.mousePosY <= 461) {
      this.passwordOptionBlock1 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption_hover.png');
    } else {
      this.passwordOptionBlock1 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    }
    //hover for Jochem123456
    if (this.mousePosX >= 440 && this.mousePosX <= 694
      && this.mousePosY >= 470 && this.mousePosY <= 530) {
      this.passwordOptionBlock2 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption_hover.png');
    } else {
      this.passwordOptionBlock2 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    }
    //hover for DK102?d}35,`s
    if (this.mousePosX >= 700 && this.mousePosX <= 954
      && this.mousePosY >= 400 && this.mousePosY <= 461) {
      this.passwordOptionBlock3 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption_hover.png');
    } else {
      this.passwordOptionBlock3 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    }
    //hover for pluisje
    if (this.mousePosX >= 700 && this.mousePosX <= 952
      && this.mousePosY >= 470 && this.mousePosY <= 531) {
      this.passwordOptionBlock4 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption_hover.png');
    } else {
      this.passwordOptionBlock4 = CanvasRenderer.loadNewImage('./assets/PasswordBlockOption.png');
    }
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;

    if(this.mousePosX >= 700 && this.mousePosX <= 954
      && this.mousePosY >= 400 && this.mousePosY <= 461
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      this.computerScreen = true;
      questProgression.setStartScreen(false);
    }

    if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      // password option: password
      if (this.mousePosX >= 440 && this.mousePosX <= 693
        && this.mousePosY >= 400 && this.mousePosY <= 461) {
        questProgression.reduceLivesOnScreen();
      }
      // password option: Jochem123456
      if (this.mousePosX >= 440 && this.mousePosX <= 694
        && this.mousePosY >= 470 && this.mousePosY <= 530) {
        questProgression.reduceLivesOnScreen();
      }
      //password option: pluisje
      if (this.mousePosX >= 700 && this.mousePosX <= 952
        && this.mousePosY >= 470 && this.mousePosY <= 531) {
        questProgression.reduceLivesOnScreen();
      }
    }
    this.lives = questProgression.getLivesOnScreen();
    this.getNextScene();
    if(this.lives === 0){
      questProgression.resetLives();
      questProgression.setShowComputerCrashDialogue(true);
    }
  }

  /**
   * renders graphics of current scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, (this.maxX - this.background.width) / 2, 0);
    CanvasRenderer.drawImage(canvas, this.passwordBlock, 550, 300);
    CanvasRenderer.writeText(canvas, 'Select your password', 700, 340, 'center', 'sans-serif', 15, 'white');
    CanvasRenderer.drawImage(canvas, this.passwordOptionBlock1, 440, 400);
    CanvasRenderer.writeText(canvas, 'Password', 570, 435, 'center', 'sans-serif', 15, 'white');
    CanvasRenderer.drawImage(canvas, this.passwordOptionBlock2, 440, 470);
    CanvasRenderer.writeText(canvas, 'Jochem123456', 570, 505, 'center', 'sans-serif', 15, 'white');
    CanvasRenderer.drawImage(canvas, this.passwordOptionBlock3, 700, 400);
    CanvasRenderer.writeText(canvas, 'DK102?d}35,`s', 825, 435, 'center', 'sans-serif', 15, 'white');
    CanvasRenderer.drawImage(canvas, this.passwordOptionBlock4, 700, 470);
    CanvasRenderer.writeText(canvas, 'pluisje', 825, 505, 'center', 'sans-serif', 15, 'white');
    if (this.lives === 3) {
      CanvasRenderer.drawImage(canvas, this.heart1, 1080, 20);
      CanvasRenderer.drawImage(canvas, this.heart2, 980, 20);
      CanvasRenderer.drawImage(canvas, this.heart3, 880, 20);
    } else if(this.lives === 2) {
      CanvasRenderer.drawImage(canvas, this.heart2, 980, 20);
      CanvasRenderer.drawImage(canvas, this.heart1, 1080, 20);
    } else if(this.lives === 1) {
      CanvasRenderer.drawImage(canvas, this.heart1, 1080, 20);
    }
  }

  public override getNextScene(): Scene {
    if(this.lives === 0) {
      this.player.spawnPos(this.playerPosX, this.playerPosY);
      this.player.setCantMove(false);
      return new HouseBob(this.maxX, this.maxY, this.player);
    }
    if (this.computerScreen === true) {
      return new Computer(this.maxX, this.maxY, this.player,
        this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }
}

