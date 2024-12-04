/* eslint-disable @typescript-eslint/no-unused-vars */
import QuestProgression from '../QuestProgression.js';
import Scene from './Scene.js';
import Player from '../Player.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import KeyListener from '../KeyListener.js';
import VillageRight from './VillageRight.js';

export default class AfricanMap extends Scene {
  private africanMap: HTMLImageElement;

  private mapPin: HTMLImageElement;

  private optionBlock: HTMLImageElement;

  private countryNames: string[];

  private countryPositions: number[][];

  private countryNamesCopy: string[];

  private tempCountryOptions: string[];

  private countryOptions: string[];

  private correctCountry: string;

  private indexNumber: number;

  private countryChoosen: boolean;

  private correctAnswer: boolean;

  private goToNextScene: boolean;

  private canClick: boolean;

  public constructor(maxX: number, maxY: number, player: Player
    , canvas: HTMLCanvasElement, playerPosX: number, playerPosY: number) {
    super(maxX, maxY, player);
    this.africanMap = CanvasRenderer.loadNewImage('./assets/AfricanMap.png');
    this.mapPin = CanvasRenderer.loadNewImage('./assets/MapPin.png');
    this.optionBlock = CanvasRenderer.loadNewImage('./assets/OptionBlock.png');
    this.mouseListener = new MouseListener(canvas);

    this.countryNames = [
      'Algeria', 'Angola', 'Botswana', 'Cameroon', 'Chad',
      'Congo', 'Egypt', 'Ethiopia', 'Kenya', 'Mali',
      'Mauritania', 'Morocco', 'Namibia', 'Niger', 'Nigeria',
      'Somalia', 'Tanzania', 'Tunisa', 'Uganda', 'Zambia',
      'Zimbabwe', 'Madagascar', 'Gabon', 'Ghana'
    ];
    this.countryPositions = [
      [530, 80], [640, 370], [680, 440], [600, 250], [650, 170],
      [625, 285], [720, 90], [790, 220], [780, 280], [500, 150],
      [440, 140], [470, 50], [640, 440], [580, 160], [570, 220],
      [845, 245], [760, 330], [580, 30], [745, 275], [700, 390],
      [730, 420], [845, 420], [595, 285], [505, 230]
    ];

    this.indexNumber = Math.floor(Math.random() * this.countryNames.length);

    this.correctCountry = this.countryNames[this.indexNumber];

    this.countryChoosen = false;

    this.goToNextScene = false;

    this.canClick = true;

    this.countryNamesCopy = [];
    this.tempCountryOptions = [];
    this.countryOptions = [];

    this.countriesSetup(this.countryNames[this.indexNumber]);
  }

  private countriesSetup(rightAnswer: string): void {
    this.countryNamesCopy = this.countryNames;
    this.countryNamesCopy.splice(this.indexNumber, 1);

    const arrayLength: number = this.countryNamesCopy.length;
    let randomind: number;

    for (let i: number = 0; i < arrayLength; i++) {
      randomind = Math.floor(Math.random() * this.countryNamesCopy.length);
      this.tempCountryOptions.push(this.countryNamesCopy[randomind]);
      this.countryNamesCopy.splice(randomind, 1);
    }

    this.tempCountryOptions.splice(7);
    this.tempCountryOptions.push(rightAnswer);

    for (let i: number = 0; i < 8; i++) {
      randomind = Math.floor(Math.random() * this.tempCountryOptions.length);
      this.countryOptions.push(this.tempCountryOptions[randomind]);
      this.tempCountryOptions.splice(randomind, 1);
    }
  }

  /**
   * updates values of the game
   * @param elapsed time elapsed since initiation
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.mousePosX = this.mouseListener.getMousePosition().x;
    this.mousePosY = this.mouseListener.getMousePosition().y;

    if (this.canClick) {
      if (this.mouseListener.buttonPressed(0)) {
        // UPPER ROW
        if (this.mousePosX >= 255 && this.mousePosX <= 435
          && this.mousePosY >= 600 && this.mousePosY <= 635) {
          if (this.correctCountry === `${this.countryOptions[0]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[0]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 455 && this.mousePosX <= 635
          && this.mousePosY >= 600 && this.mousePosY <= 635) {
          if (this.correctCountry === `${this.countryOptions[1]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[1]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 655 && this.mousePosX <= 835
          && this.mousePosY >= 600 && this.mousePosY <= 635) {
          if (this.correctCountry === `${this.countryOptions[2]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[2]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 855 && this.mousePosX <= 1035
          && this.mousePosY >= 600 && this.mousePosY <= 635) {
          if (this.correctCountry === `${this.countryOptions[3]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[3]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        // LOWER ROW
        if (this.mousePosX >= 255 && this.mousePosX <= 435
          && this.mousePosY >= 655 && this.mousePosY <= 690) {
          if (this.correctCountry === `${this.countryOptions[4]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[4]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 455 && this.mousePosX <= 635
          && this.mousePosY >= 655 && this.mousePosY <= 690) {
          if (this.correctCountry === `${this.countryOptions[5]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[5]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 655 && this.mousePosX <= 835
          && this.mousePosY >= 655 && this.mousePosY <= 690) {
          if (this.correctCountry === `${this.countryOptions[6]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[6]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
        if (this.mousePosX >= 855 && this.mousePosX <= 1035
          && this.mousePosY >= 655 && this.mousePosY <= 690) {
          if (this.correctCountry === `${this.countryOptions[7]}`) {
            questProgression.setQuestProgression('Mira', 'Quest2Done');
            this.countryChoosen = true;
            this.correctAnswer = true;
          } else if (this.countryNames[this.indexNumber] !== `${this.countryOptions[7]}`) {
            this.countryChoosen = true;
            this.correctAnswer = false;
          }
          this.canClick = false;
        }
      }
    }

    if (this.countryChoosen) {
      if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
        this.goToNextScene = true;
      }
    }
  }

  /**
   * render the items of the game
   * @param canvas area of execution
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(
      canvas,
      this.africanMap,
      (this.maxX - this.africanMap.width) / 2,
      0);
    CanvasRenderer.drawImage(
      canvas,
      this.mapPin,
      this.countryPositions[this.indexNumber][0],
      this.countryPositions[this.indexNumber][1]);
    // UPPER ROW
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      250,
      this.africanMap.height + 7.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[0]}`,
      345,
      627.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      450,
      this.africanMap.height + 7.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[1]}`,
      545,
      627.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      650,
      this.africanMap.height + 7.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[2]}`,
      745,
      627.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      850,
      this.africanMap.height + 7.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[3]}`,
      945,
      627.5,
      'center',
      'monospace',
      25,
      'white');
    // LOWER ROW
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      250,
      this.africanMap.height + 62.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[4]}`,
      345,
      682.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      450,
      this.africanMap.height + 62.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[5]}`,
      545,
      682.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      650,
      this.africanMap.height + 62.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[6]}`,
      745,
      682.5,
      'center',
      'monospace',
      25,
      'white');
    CanvasRenderer.drawImage(canvas,
      this.optionBlock,
      850,
      this.africanMap.height + 62.5);
    CanvasRenderer.writeText(canvas,
      `${this.countryOptions[7]}`,
      945,
      682.5,
      'center',
      'monospace',
      25,
      'white');

    // Check answer dialogue
    if (this.countryChoosen) {
      CanvasRenderer.drawImage(
        canvas,
        this.spaceKey,
        (canvas.width - this.spaceKey.width) / 2,
        canvas.height - this.spaceKey.height * 5);
      CanvasRenderer.drawImage(
        canvas,
        this.dialogueBlock,
        (canvas.width - this.dialogueBlock.width) / 2,
        canvas.height - this.dialogueBlock.height * 2);

      if (this.correctAnswer) {
        CanvasRenderer.writeText(canvas,
          'Well done!<br>You chose the right<br>answer. Speak to Mira.',
          (canvas.width - this.dialogueBlock.width) / 1.7,
          canvas.height - this.dialogueBlock.height * 1.7);
      }
      if (!this.correctAnswer) {
        CanvasRenderer.writeText(canvas,
          'WRONG<br>Try again by speaking<br>with Mira when you<br>are ready for it.',
          (canvas.width - this.dialogueBlock.width) / 1.7,
          canvas.height - this.dialogueBlock.height * 1.7);
      }
    }
  }

  public override getNextScene(): Scene |null {
    if (this.goToNextScene) {
      this.player.spawnPos(450, 250);
      this.player.setCantMove(false);
      return new VillageRight(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
