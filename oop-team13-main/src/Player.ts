/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasRenderer from './CanvasRenderer.js';
import CanvasItem from './CanvasItem.js';

export default class Player extends CanvasItem {
  private speed: number = 0.25;

  private movingUp: boolean;

  private movingDown: boolean;

  private movingLeft: boolean;

  private movingRight: boolean;

  private cantMove: boolean;

  private timeToSwitch: number;

  private currentElapsed: number;

  private currentImage: string;

  public constructor(canvasWidth: number, canvasHeight: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/Beaver/Beaver_Idle.png');
    this.posX = 1280;
    this.posY = 720;
    this.cantMove = false;
    this.timeToSwitch = 300;
    this.currentElapsed = 0;
    this.currentImage = 'Idle';
  }

  /**
   * Makes the player move up on the screen
   */
  public moveUp(): void {
    this.movingUp = true;
  }

  /**
   * Makes the player move down on the screen
   */
  public moveDown(): void {
    this.movingDown = true;
  }

  /**
   * Makes the player move left on the screen
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   * Makes the player move right on the screen
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  public getCantMove(): boolean {
    return this.cantMove;
  }

  public setCantMove(state: boolean): void {
    this.cantMove = state;
  }

  /**
   * sets the player on a different position
   * @param posX new position X
   * @param posY new position Y
   */
  public spawnPos(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  /**
   * updates the player
   * @param elapsed elapsed time.
   */
  public update(elapsed: number): void {
    if (this.cantMove === false) {
      if (this.movingLeft) {
        this.currentElapsed += elapsed;

        if (this.currentElapsed >= this.timeToSwitch) {
          let newImage: string;

          if (this.currentImage === 'frame1') {
            newImage = './assets/Beaver/Beaver_Animation_Left2.png';
            this.currentImage = 'frame2';
          } else {
            newImage = './assets/Beaver/Beaver_Animation_Left1.png';
            this.currentImage = 'frame1';
          }

          this.image = CanvasRenderer.loadNewImage(newImage);
          this.currentElapsed = 0;

          // Set a timeout to switch the image again after one second
          setTimeout(() => {
            this.update(elapsed);
          }, 500);
        }

        this.posX -= this.speed * elapsed;
        this.movingLeft = false;
      }
      if (this.movingRight) {
        this.currentElapsed += elapsed;

        if (this.currentElapsed >= this.timeToSwitch) {
          let newImage: string;

          if (this.currentImage === 'frame1') {
            newImage = './assets/Beaver/Beaver_Animation_Right2.png';
            this.currentImage = 'frame2';
          } else {
            newImage = './assets/Beaver/Beaver_Animation_Right1.png';
            this.currentImage = 'frame1';
          }

          this.image = CanvasRenderer.loadNewImage(newImage);
          this.currentElapsed = 0;

          // Set a timeout to switch the image again after one second
          setTimeout(() => {
            this.update(elapsed);
          }, 500);
        }

        this.posX += this.speed * elapsed;
        this.movingRight = false;
      }
      if (this.movingUp) {
        this.currentElapsed += elapsed;

        if (this.currentElapsed >= this.timeToSwitch) {
          let newImage: string;

          if (this.currentImage === 'frame1') {
            newImage = './assets/Beaver/Beaver_Animation_Up2.png';
            this.currentImage = 'frame2';
          } else {
            newImage = './assets/Beaver/Beaver_Animation_Up1.png';
            this.currentImage = 'frame1';
          }

          this.image = CanvasRenderer.loadNewImage(newImage);
          this.currentElapsed = 0;

          // Set a timeout to switch the image again after one second
          setTimeout(() => {
            this.update(elapsed);
          }, 500);
        }

        this.posY -= this.speed * elapsed;
        this.movingUp = false;
      }
      if (this.movingDown) {
        this.currentElapsed += elapsed;

        if (this.currentElapsed >= this.timeToSwitch) {
          let newImage: string;

          if (this.currentImage === 'frame1') {
            newImage = './assets/Beaver/Beaver_Animation_Down2.png';
            this.currentImage = 'frame2';
          } else {
            newImage = './assets/Beaver/Beaver_Animation_Down1.png';
            this.currentImage = 'frame1';
          }

          this.image = CanvasRenderer.loadNewImage(newImage);
          this.currentElapsed = 0;

          // Set a timeout to switch the image again after one second
          setTimeout(() => {
            this.update(elapsed);
          }, 500);
        }
        this.posY += this.speed * elapsed;
        this.movingDown = false;
      }
    }
  }
}
