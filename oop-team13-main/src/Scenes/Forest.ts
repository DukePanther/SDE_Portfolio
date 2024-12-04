import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageRight from './VillageRight.js';
import QuestProgression from '../QuestProgression.js';
import KeyListener from '../KeyListener.js';

export default class Forest extends Scene {
  private apple: HTMLImageElement;

  private applePosX: number[] = [];

  private applePosY: number[] = [];

  private drawApple: boolean[];

  private clueObject: HTMLImageElement;

  private cluesActive: boolean;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Forest.png');
    this.apple = CanvasRenderer.loadNewImage('./assets/Apple.png');
    this.clueObject = CanvasRenderer.loadNewImage('./assets/ClueObject_water.png');
    this.cluesActive = false;
    //initialize Hazel quest
    for (let i: number = 0; i < 3; i++) {
      this.applePosX.push(Math.random() * 655 + 345);
      this.applePosY.push(Math.random() * 466 + 131);
    }
    this.drawApple = [true, true, true];
  }

  /**
   * updates the forest scene
   * @param elapsed time
   * @param questProgression questprogression
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    //left border
    if(this.player.getPosX() <= 345 ) {
      this.player.spawnPos(345, this.player.getPosY());
    }

    //right border
    if(this.player.getPosX() >= 1000 ) {
      this.player.spawnPos(1000, this.player.getPosY());
    }

    //lowwer border
    if (this.player.getPosY() >= 670 && this.player.getPosX() <= 941) {
      this.player.spawnPos(this.player.getPosX(), 670);
    }

    //upper border
    if(this.player.getPosY() <= 131) {
      this.player.spawnPos(this.player.getPosX(), 131);
    }

    //lowwer trees collision
    if(this.player.getPosY() >= 597 && this.player.getPosX() <= 944) {
      this.player.spawnPos(this.player.getPosX(), 597);
    }
    if(this.player.getPosY() >= 598 && this.player.getPosX() <= 950) {
      this.player.spawnPos(950, this.player.getPosY());
    }

    //---Hazel Quest---
    if (questProgression.getQuestProgression('Hazel') === 'QuestStarted') {
      if (this.player.getPosX() >= this.applePosX[0] - 40
      && this.player.getPosX() <= 48 + this.applePosX[0]
      && this.player.getPosY() >= this.applePosY[0] - 40
      && this.player.getPosY() <= 48 + this.applePosY[0]) {
        this.showEKey = true;
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.drawApple[0] = false;
          this.showEKey = false;
        }
      } else if
      (this.player.getPosX() >= this.applePosX[1] - 40
      && this.player.getPosX() <= 48 + this.applePosX[1]
      && this.player.getPosY() >= this.applePosY[1] - 40
      &&this.player.getPosY() <= 48 + this.applePosY[1]) {
        this.showEKey = true;
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.drawApple[1] = false;
          this.showEKey = false;
        }
      } else if
      (this.player.getPosX() >= this.applePosX[2] - 40
      && this.player.getPosX() <= 48 + this.applePosX[2]
      && this.player.getPosY() >= this.applePosY[2] - 40
      && this.player.getPosY() <= 48 + this.applePosY[2]) {
        this.showEKey = true;
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.drawApple[2] = false;
          this.showEKey = false;
        }
      } else {
        this.showEKey = false;
      }
    }
    if (this.drawApple[0] === false && this.drawApple[1] === false && this.drawApple[2] === false && questProgression.getQuestProgression('Hazel') === 'QuestStarted') {
      questProgression.setQuestProgression('Hazel', 'QuestDone');
    }
    if (questProgression.getQuestProgression('Hazel') !== 'QuestStarted' && questProgression.getQuestProgression('Hazel') !== 'NotBegan') {
      this.drawApple = [false, false, false];
    }
    if (questProgression.getQuestProgression('Hazel') === 'QuestClueSeen') {
      this.cluesActive = true;
    }
    if (this.player.getPosX() <= 350
      && this.player.getPosX() >= 330
      && this.player.getPosY() >= 139
      && this.player.getPosY() <= 239
      && questProgression.getQuestProgression('Hazel') === 'QuestClueSeen') {
      this.showEKey = true;
      if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
        this.showEKey = false;
        questProgression.setQuestProgression('Hazel', 'QuestClueDone');
        this.cluesActive = false;
      }
    }
  }

  /**
   * renders the forest scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas,
      this.background,
      0,
      0
    );

    // render Hazel quest
    if (this.drawApple[0]) {
      CanvasRenderer.drawImage(canvas, this.apple, this.applePosX[0], this.applePosY[0]);
    }
    if (this.drawApple[1]) {
      CanvasRenderer.drawImage(canvas, this.apple, this.applePosX[1], this.applePosY[1]);
    }
    if (this.drawApple[2]) {
      CanvasRenderer.drawImage(canvas, this.apple, this.applePosX[2], this.applePosY[2]);
    }
    if (this.showEKey) {
      CanvasRenderer.drawImage(
        canvas,
        this.eKey,
        (canvas.width - this.eKey.width) / 2,
        canvas.height - this.eKey.height * 2);
    }
    if (this.cluesActive) {
      CanvasRenderer.drawImage(canvas, this.clueObject, 275, 189);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosY() + this.player.getHeight() >= this.maxY) {
      this.player.spawnPos(this.player.getPosX(), 0 + 5);
      return new VillageRight(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
