/* eslint-disable @typescript-eslint/no-unused-vars */
import QuestProgression from '../QuestProgression.js';
import Scene from './Scene.js';
import Player from '../Player.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import KeyListener from '../KeyListener.js';
import VillageRight from './VillageRight.js';

export default class EuropeanMap extends Scene {
  private europeanMap: HTMLImageElement;

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

    this.mouseListener = new MouseListener(canvas);

    this.europeanMap = CanvasRenderer.loadNewImage('./assets/EuropeanMap.png');
    this.mapPin = CanvasRenderer.loadNewImage('./assets/MapPin.png');
    this.optionBlock = CanvasRenderer.loadNewImage('./assets/OptionBlock.png');

    this.countryNames = [
      'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Denmark',
      'Estonia', 'Finland', 'France', 'Germany', 'Greece',
      'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania',
      'Luxembourg', 'Netherlands', 'Poland', 'Portugal', 'Romania',
      'Slovakia', 'Slovenia', 'Spain', 'Sweden'
    ];
    this.countryPositions = [
      [590, 350], [475, 290], [725, 370], [620, 380], [535, 200],
      [690, 150], [670, 90], [440, 360], [540, 280], [690, 485],
      [650, 350], [360, 230], [560, 430], [690, 170], [680, 200],
      [490, 305], [490, 260], [640, 260], [290, 450], [720, 370],
      [650, 320], [595, 375], [350, 460], [590, 130]
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
            questProgression.setQuestProgression('Mira', 'Quest1Done');
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
      this.europeanMap,
      (this.maxX - this.europeanMap.width) / 2,
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
      this.europeanMap.height + 7.5);
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
      this.europeanMap.height + 7.5);
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
      this.europeanMap.height + 7.5);
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
      this.europeanMap.height + 7.5);
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
      this.europeanMap.height + 62.5);
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
      this.europeanMap.height + 62.5);
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
      this.europeanMap.height + 62.5);
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
      this.europeanMap.height + 62.5);
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
