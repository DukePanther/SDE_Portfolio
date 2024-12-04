/* eslint-disable @typescript-eslint/no-unused-vars */
import Scene from './Scene.js';
import Player from '../Player.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import KeyListener from '../KeyListener.js';
import Computer from './Computer.js';
import QuestProgression from '../QuestProgression.js';

export default class Mail extends Scene {
  private sceneCanvas: HTMLCanvasElement;

  private closetabIcon: HTMLImageElement;

  private closeScene: boolean;

  private miraMailOpen: boolean;

  private hazelMailOpen: boolean;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, posX: number, posY: number) {
    super(maxX, maxY, player);
    this.sceneCanvas = canvas;
    this.mouseListener = new MouseListener(canvas);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Mail.png');
    this.closetabIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/CloseTabButton.png');
    this.playerPosX = posX;
    this.playerPosY = posY;
    this.keyListener = new KeyListener;
    this.closeScene = false;
    this.miraMailOpen = false;
    this.hazelMailOpen = false;
  }

  /**
   *
   * @param elapsed elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    if (this.mousePosX >= (this.background.width - 32)
      && this.mousePosX <= this.maxX
      && this.mousePosY >= 0 && this.mousePosY <= 27) {
      this.closetabIcon = CanvasRenderer.loadNewImage('./assets/Computer_icon/CloseTabButton.png');
    } else {
      this.closetabIcon = CanvasRenderer.loadNewImage('');
    }
    if (this.mousePosX >= (this.background.width - 32)
      && this.mousePosX <= 1280
      && this.mousePosY >= 0 && this.mousePosY <= 27
      && this.mouseListener.isButtonDown(MouseListener.BUTTON_LEFT)) {
      this.closeScene = true;
    }
    if (questProgression.getMailStatus() === true) {
      if (this.hazelMailOpen) {
        this.background = CanvasRenderer.loadNewImage('./assets/Scenes/HazelMailOpen.png');
        if ((this.mousePosX >= 190 && this.mousePosY >= 110
          && this.mousePosX <= 230 && this.mousePosY <= 145
          && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT))
          || this.keyListener.keyPressed(KeyListener.KEY_ESC)) {
          this.hazelMailOpen = false;
          if (questProgression.getQuestProgression('Hazel') !== 'QuestClueDone') {
            questProgression.setQuestProgression('Hazel', 'QuestClueSeen');
          }
        }
      } else if (this.miraMailOpen) {
        this.background = CanvasRenderer.loadNewImage('./assets/Scenes/MiraMailOpen.png');
        if ((this.mousePosX >= 190 && this.mousePosY >= 110
          && this.mousePosX <= 230 && this.mousePosY <= 145
          && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT))
          || this.keyListener.keyPressed(KeyListener.KEY_ESC)) {
          this.miraMailOpen = false;
          if (questProgression.getQuestProgression('Mira') !== 'QuestClueDone') {
            questProgression.setQuestProgression('Mira', 'QuestClueSeen');
          }
        }
      } else {
        this.background = CanvasRenderer.loadNewImage('./assets/Scenes/MiraHazelMail.png');
      }
      if (this.mousePosX >= 192 && this.mousePosY >= 268
        && this.mousePosX <= 1239 && this.mousePosY <= 298
        && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.hazelMailOpen = true;
      }
      if (this.mousePosX >= 192 && this.mousePosY >= 298
        && this.mousePosX <= 1239 && this.mousePosY <= 328
        && this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.miraMailOpen = true;
      }
    }
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;
    this.getNextScene();
  }

  /**
   * renders items to the game
   * @param canvas area to execute functions
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.background, (this.maxX - this.background.width) / 2, 0);
    CanvasRenderer.drawImage(canvas, this.closetabIcon,
      this.background.width - 32, 0);
  }

  public override getNextScene(): Scene {
    if (this.closeScene) {
      return new Computer(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }
}

