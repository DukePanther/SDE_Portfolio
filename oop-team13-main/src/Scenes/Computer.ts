/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import HouseBob from './HouseBob.js';
import Scene from './Scene.js';
import QuestProgression from '../QuestProgression.js';
import Mail from './Mail.js';
import FortniteError from './FortniteError.js';
import RobloxError from './RobloxError.js';
import MinecraftError from './MinecraftError.js';
import ComputerStartScreen from './ComputerStartScreen.js';

export default class Computer extends Scene {
  private mailIcon: HTMLImageElement;

  private computerIcon: HTMLImageElement;

  private binIcon: HTMLImageElement;

  private fortniteIcon: HTMLImageElement;

  private robloxIcon: HTMLImageElement;

  private minecraftIcon: HTMLImageElement;

  private powerbuttonIcon: HTMLImageElement;

  private sceneCanvas: HTMLCanvasElement;

  private heart1: HTMLImageElement;

  private heart2: HTMLImageElement;

  private heart3: HTMLImageElement;

  private lives: number;

  private show1: boolean;

  private show2: boolean;

  private show3: boolean;

  private random1: number;

  private random2: number;

  private random3: number;

  private iphoneScamPopup: HTMLImageElement;

  private famousScamPopup: HTMLImageElement;

  private smileyScamPopup: HTMLImageElement;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, posX: number, posY: number) {
    super(maxX, maxY, player);
    this.sceneCanvas = canvas;
    this.mouseListener = new MouseListener(canvas);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Desktop.png');
    this.mailIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/closedMailIcon.png');
    this.computerIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/computerIcon.png');
    this.binIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/binIcon.png');
    this.fortniteIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/fortniteIcon.png');
    this.robloxIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/robloxIcon.png');
    this.minecraftIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/minecraftIcon.png');
    this.powerbuttonIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/Power_button.png');
    this.iphoneScamPopup = CanvasRenderer.loadNewImage('./assets/IphoneScamPopup.png');
    this.famousScamPopup = CanvasRenderer.loadNewImage('./assets/FamousScamPopup.png');
    this.smileyScamPopup = CanvasRenderer.loadNewImage('./assets/SmileyboyScamPopup.png');
    this.heart1 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.heart2 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.heart3 = CanvasRenderer.loadNewImage('./assets/Heart.png');
    this.random1 = Math.random();
    this.random2 = Math.random();
    this.random3 = Math.random();
    if(this.random1 >= 0.4) {
      this.show1 = true;
    }
    if(this.random2 >= 0.5) {
      this.show2 = true;
    }
    if(this.random3 >= 0.5) {
      this.show3 = true;
    }
    this.playerPosX = posX;
    this.playerPosY = posY;
  }

  public override getNextScene(): Scene {
    if (this.mousePosX >= 100 && this.mousePosX <= 161
      && this.mousePosY >= 600 && this.mousePosY <= 661
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      this.player.spawnPos(this.playerPosX, this.playerPosY);
      this.player.setCantMove(false);
      return new HouseBob(this.maxX, this.maxY, this.player);
    }
    if (this.mousePosX >= 95 && this.mousePosX <= 175
      && this.mousePosY >= 223 && this.mousePosY <= 280
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      return new Mail(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    if (this.mousePosX >= 200 && this.mousePosX <= 264
      && this.mousePosY >= 20 && this.mousePosY <= 84
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      return new FortniteError(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    if (this.mousePosX >= 200 && this.mousePosX <= 264
      && this.mousePosY >= 120 && this.mousePosY <= 184
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      return new RobloxError(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    if (this.mousePosX >= 200 && this.mousePosX <= 264
      && this.mousePosY >= 220 && this.mousePosY <= 284
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      return new MinecraftError(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    if(this.lives === 0) {
      return new ComputerStartScreen(this.maxX, this.maxY, this.player,
        this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }

  /**
   * updates the values of the game
   * @param elapsed time elapsed since initiation
   * @param questProgression queststatus caller
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    if (this.mousePosX >= 95 && this.mousePosX <= 175
      && this.mousePosY >= 223 && this.mousePosY <= 280) {
      this.mailIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/OpenMailIcon.png');
    } else {
      this.mailIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/closedMailIcon.png');
    }
    if(this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if(this.show1 === true && this.mousePosX >= 656 && this.mousePosX <= 675
        && this.mousePosY >= 50 && this.mousePosY <= 65) {
        this.show1 = false;
      }
      if(this.show2 === true && this.mousePosX >= 398 && this.mousePosX <= 430
        && this.mousePosY >= 299 && this.mousePosY <= 329) {
        this.show2 = false;
      }
      if(this.show3 === true && this.mousePosX >= 1171 && this.mousePosX <= 1195
        && this.mousePosY >= 352 && this.mousePosY <= 372) {
        this.show3 = false;
      }
      if(this.show1 === true && this.mousePosX >= 400 && this.mousePosX <= 675
      && this.mousePosY >= 50 && this.mousePosY <= 218) {
        questProgression.reduceLivesOnScreen();
      }
      if(this.show2 === true && this.mousePosX >= 70 && this.mousePosX <= 430
        && this.mousePosY >= 300 && this.mousePosY <= 550) {
        questProgression.reduceLivesOnScreen();
      }
      if(this.show3 === true && this.mousePosX >= 730 && this.mousePosX <= 1120
        && this.mousePosY >= 350 && this.mousePosY <= 680) {
        questProgression.reduceLivesOnScreen();
      }
      if(this.show1 === true && this.mousePosX >= 400 && this.mousePosX <= 675
        && this.mousePosY >= 50 && this.mousePosY <= 218) {
        this.show1 = false;
      }
      if(this.show2 === true && this.mousePosX >= 70 && this.mousePosX <= 430
          && this.mousePosY >= 300 && this.mousePosY <= 550) {
        this.show2 = false;
      }
      if(this.show3 === true && this.mousePosX >= 730 && this.mousePosX <= 1120
          && this.mousePosY >= 350 && this.mousePosY <= 680) {
        this.show3 = false;
      }
    }
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
    this.getNextScene();
    this.lives = questProgression.getLivesOnScreen();
  }

  /**
   * renders items to the game
   * @param canvas area to execute the functions
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, (this.maxX - this.background.width) / 2, 0);
    CanvasRenderer.drawImage(canvas, this.mailIcon, 100, 220);
    CanvasRenderer.drawImage(canvas, this.computerIcon, 100, 120);
    CanvasRenderer.drawImage(canvas, this.binIcon, 100, 20);
    CanvasRenderer.drawImage(canvas, this.fortniteIcon, 200, 20);
    CanvasRenderer.drawImage(canvas, this.robloxIcon, 200, 120);
    CanvasRenderer.drawImage(canvas, this.minecraftIcon, 200, 220);
    CanvasRenderer.drawImage(canvas, this.powerbuttonIcon, 100, 600);
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
    if(this.show1 === true) {
      CanvasRenderer.drawImage(canvas, this.iphoneScamPopup, 400, 50 );
    }
    if(this.show2 === true) {
      CanvasRenderer.drawImage(canvas, this.famousScamPopup, 70, 300);
    }
    if(this.show3 === true) {
      CanvasRenderer.drawImage(canvas, this.smileyScamPopup, 730, 350);
    }
  }
}
