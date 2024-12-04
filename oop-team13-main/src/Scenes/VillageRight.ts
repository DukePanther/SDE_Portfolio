import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageMiddle from './VillageMiddle.js';
import Forest from './Forest.js';
import KeyListener from '../KeyListener.js';
import QuestProgression from '../QuestProgression.js';
import EuropeanMap from './EuropeanMap.js';
import AfricanMap from './AfricanMap.js';

export default class VillageRight extends Scene {
  private mira: HTMLImageElement;

  private bob: HTMLImageElement;

  private dialogueState: number;

  private miraQuest1Started: boolean;

  private miraQuest2Started: boolean;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Village_Right.png');
    this.mira = CanvasRenderer.loadNewImage('./assets/NPC/Mira.png');
    this.bob = CanvasRenderer.loadNewImage('./assets/NPC/Bob.png');
    this.miraQuest1Started = false;
    this.miraQuest2Started = false;
  }

  /**
   * updates the VillageRight scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    if (this.player.getPosX() >= 470 && this.player.getPosX() <= 550 &&
    this.player.getPosY() >= 230 && this.player.getPosY() <= 260) {
      this.showEKey = true;

      // Check the current state of the Mira quest.
      // If not started jet, execute this dialogue.
      if (questProgression.getQuestProgression('Mira') === 'NotBegan') {
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
            this.dialogueState = 2;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 2) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 2;
            this.showSpacekey = false;
            this.miraQuest1Started = true;
          }
        }
      }
      // Check the current state of the Mira quest.
      // If already started, execute this dialogue.
      if (questProgression.getQuestProgression('Mira') === 'Quest1Done') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.dialogueState = 3;
          this.player.setCantMove(true);
          this.showSpacekey = true;
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
            this.dialogueState = 5;
            this.showSpacekey = false;
            this.miraQuest2Started = true;
          }
        }
      }
      if (questProgression.getQuestProgression('Mira') === 'Quest2Done' || questProgression.getQuestProgression('Mira') === 'QuestDone') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.dialogueState = 7;
          this.player.setCantMove(true);
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 7) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 8;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 8) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 9;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 9) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 10;
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 10) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            if (questProgression.getQuestProgression('Hazel') === 'QuestStarted' || questProgression.getQuestProgression('Hazel') === 'NotBegan') {
              this.dialogueState = 12;
            } else if (questProgression.getQuestProgression('Hazel') === 'QuestDone') {
              this.dialogueState = 13;
            } else {
              this.dialogueState = 11;
            }
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 11) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 11;
            this.showSpacekey = false;
            this.player.setCantMove(false);
            questProgression.setQuestProgression('Mira', 'QuestDone');
            if (questProgression.getQuestProgression('Hazel') === 'QuestClueStarted') {
              questProgression.setMailStatus(true);
            }
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 12) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 12;
            this.showSpacekey = false;
            this.player.setCantMove(false);
          }
        }
        if (this.player.getCantMove() === true && this.dialogueState === 13) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 12;
            this.showSpacekey = false;
            this.player.setCantMove(false);
          }
        }
      }
    } else {
      this.showEKey = false;
    }


    //right border
    if(this.player.getPosX() >= 1000 ) {
      this.player.spawnPos(1000, this.player.getPosY());
    }

    //lowwer border
    if(this.player.getPosY() >= 595) {
      this.player.spawnPos(this.player.getPosX(), 595);
    }

    //upper river and fence collision
    if(this.player.getPosY() <= 534 && this.player.getPosX() <= 376) {
      this.player.spawnPos(this.player.getPosX(), 534);
    }
    if (this.player.getPosY() <= 533 && this.player.getPosX() <= 382) {
      this.player.spawnPos(382, this.player.getPosY());
    }

    //farmland fence collision
    if(this.player.getPosY() >= 283 && this.player.getPosX() >= 464) {
      this.player.spawnPos(this.player.getPosX(), 283);
    }
    if (this.player.getPosY() >= 284 && this.player.getPosX() >= 458) {
      this.player.spawnPos(458, this.player.getPosY());
    }

    //upper fence collision
    if(this.player.getPosY() <= 63 && this.player.getPosX() <= 935) {
      this.player.spawnPos(this.player.getPosX(), 63);
    }
    if (this.player.getPosY() <= 62 && this.player.getPosX() <= 941) {
      this.player.spawnPos(941, this.player.getPosY());
    }

    //collision left side house
    if (this.player.getPosX() >= 408 && this.player.getPosX() <= 905 &&
    this.player.getPosY() >= 44 && this.player.getPosY() <= 240) {
      this.player.spawnPos(408, this.player.getPosY());
    }

    //collision right side house
    if (this.player.getPosX() >= 414 && this.player.getPosX() <= 911 &&
    this.player.getPosY() >= 44 && this.player.getPosY() <= 240) {
      this.player.spawnPos(911, this.player.getPosY());
    }

    //collision lower side house
    if (this.player.getPosX() >= 414 && this.player.getPosX() <= 905 &&
    this.player.getPosY() >= 44 && this.player.getPosY() <= 246) {
      this.player.spawnPos(this.player.getPosX(), 246);
    }
  }

  /**
   * renders the VillageRight scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;

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

    // ---MIRA QUEST DIALOGUE---
    if (this.player.getCantMove() === true && this.dialogueState === 0) {
      CanvasRenderer.writeText(canvas,
        'Hey, Bob! Bob, please<br>help me. I have a<br>problem with my maps!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'Those maps of yours...<br>Sure, what do I have<br>to do this time?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'First, can you name the<br>correct country on<br>the pinned location.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Thank you for<br>completing my<br>European map, Bob!<br>But...',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 4) {
      CanvasRenderer.writeText(canvas,
        'But what, Mira?<br>You want to tell<br>me something?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 5) {
      CanvasRenderer.writeText(canvas,
        'Well... I have another<br>map that is incomplete...<br>My African map.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 6) {
      CanvasRenderer.writeText(canvas,
        'Oke oke, Mira.<br>Come on with that map.<br>I do not have all day.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 7) {
      CanvasRenderer.writeText(canvas,
        'Thank you so much for<br>completing my maps,<br>Bob!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 8) {
      CanvasRenderer.writeText(canvas,
        'I hope you do not have<br>another map to fix, Mira.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 9) {
      CanvasRenderer.writeText(canvas,
        'No no no,<br>I have no more maps <br>for you to fix, Bob.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 10) {
      CanvasRenderer.writeText(canvas,
        'I will send you an<br>e-mail if I have a<br>clue about the missing<br>dam-parts.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 11) {
      CanvasRenderer.writeText(canvas,
        'I probably have to<br>take a look on<br>my computer.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 12) {
      CanvasRenderer.writeText(canvas,
        'Give Hazel a visit.<br>Maybe she has a clue.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 13) {
      CanvasRenderer.writeText(canvas,
        'You still need to<br>deliver the apples<br>to Hazel, Bob.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.mira
        , canvas.width - this.mira.width, canvas.height - this.mira.height);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosY() <= 0) {
      this.player.spawnPos(this.player.getPosX(), (this.maxY - this.player.getHeight() - 5));
      return new Forest(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosX() <= 0) {
      this.player.spawnPos(this.maxX - this.player.getWidth() - 5, (this.player.getPosY()));
      return new VillageMiddle(this.maxX, this.maxY, this.player);
    }
    if (this.miraQuest1Started === true) {
      this.playerPosX = this.player.getPosX();
      this.playerPosY = this.player.getPosY();
      this.player.spawnPos(this.maxX, this.maxY);
      return new EuropeanMap(this.maxX, this.maxY, this.player
        , this.canvas, this.playerPosX, this.playerPosY);
    }
    if (this.miraQuest2Started === true) {
      this.playerPosX = this.player.getPosX();
      this.playerPosY = this.player.getPosY();
      this.player.spawnPos(this.maxX, this.maxY);
      return new AfricanMap(this.maxX, this.maxY, this.player
        , this.canvas, this.playerPosX, this.playerPosY);
    }
    return null;
  }
}
