import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageMiddle from './VillageMiddle.js';
import Flowerfield from './Flowerfield.js';
import DesertLeft from './DesertLeft.js';
import KeyListener from '../KeyListener.js';
import QuestProgression from '../QuestProgression.js';

export default class VillageDown extends Scene {
  private betty: HTMLImageElement;

  private bob: HTMLImageElement;

  private dialogueState: number;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Village_Down.png');
    this.betty = CanvasRenderer.loadNewImage('./assets/NPC/Betty.png');
    this.bob = CanvasRenderer.loadNewImage('./assets/NPC/Bob.png');
  }

  /**
   * updates the VillageDown scene
   * @param elapsed time
   * @param questProgression quest status
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    // Betty house
    if (this.player.getPosX() >= 150 && this.player.getPosX() <= 230 &&
    this.player.getPosY() >= 540 && this.player.getPosY() <= 550) {
      this.showEKey = true;
      // Check the current state of all the quests.
      // If all done (Mira, Felix and Hazel), start this dialogue.
      if (questProgression.getQuestProgression('Mira') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') === 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') === 'QuestClueDone') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.dialogueState = 0;
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 0) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 1;
          }
        } else if (this.player.getCantMove() === true && this.dialogueState === 1) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 2;
          }
        } else if (this.player.getCantMove() === true && this.dialogueState === 2) {
          // End dialogue, start quest, set dialogue for next interaction if quest not jet completed
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 4;
            this.player.setCantMove(false);
            this.showSpacekey = false;
            questProgression.setQuestProgression('Betty', 'QuestStarted');
          }
        }
      }
      // Not jet started / can not start jet
      if ((questProgression.getQuestProgression('Mira') !== 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') !== 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') !== 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') !== 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') !== 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') !== 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') !== 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') === 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') !== 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') === 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') !== 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') === 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') !== 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') !== 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') === 'QuestClueDone')
      || (questProgression.getQuestProgression('Mira') !== 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') === 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') === 'QuestClueDone')) {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.dialogueState = 3;
          this.showSpacekey = true;
        }
        if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
          this.player.setCantMove(false);
          this.showSpacekey = false;
        }
      }
      // Not jet completed
      if (questProgression.getQuestProgression('Mira') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Felix') === 'QuestDone' &&
      questProgression.getQuestProgression('Hazel') === 'QuestClueDone' &&
      questProgression.getQuestProgression('Betty') === 'QuestStarted') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.dialogueState = 4;
          this.showSpacekey = true;
        }
        if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
          this.player.setCantMove(false);
          this.showSpacekey = false;
        }
      }
    } else {
      this.showEKey = false;
    }

    //right border
    if(this.player.getPosX() >= 1186 ) {
      this.player.spawnPos(1183, this.player.getPosY());
    }

    //left fence collision
    if(this.player.getPosY() >= 602 && this.player.getPosX() <= 536) {
      this.player.spawnPos(this.player.getPosX(), 602);
    }
    if(this.player.getPosY() >= 606 && this.player.getPosX() <= 542) {
      this.player.spawnPos(542, this.player.getPosY());
    }

    //right fence collision
    if(this.player.getPosY() >= 602 && this.player.getPosX() >= 705) {
      this.player.spawnPos(this.player.getPosX(), 602);
    }
    if(this.player.getPosY() >= 606 && this.player.getPosX() >= 698) {
      this.player.spawnPos(698, this.player.getPosY());
    }

    //hill collision
    if(this.player.getPosY() <= 460 && this.player.getPosX() >= 684) {
      this.player.spawnPos(this.player.getPosX(), 460);
    }
    if(this.player.getPosY() <= 454 && this.player.getPosX() >= 678) {
      this.player.spawnPos(678, this.player.getPosY());
    }

    // collisions for house
    if (this.player.getPosX() <= 350 && this.player.getPosY() <= 539) {
      this.player.spawnPos(350, this.player.getPosY());
    }
    if (this.player.getPosX() <= 345 && this.player.getPosY() <= 545) {
      this.player.spawnPos(this.player.getPosX(), 545);
    }
    if (this.player.getPosX() <= 507 && this.player.getPosY() <= 378) {
      this.player.spawnPos(507, this.player.getPosY());
    }
    if (this.player.getPosX() <= 502 && this.player.getPosY() <= 384) {
      this.player.spawnPos(this.player.getPosX(), 384);
    }
  }

  /**
   * renders the VillageRight scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
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

    // ---HAZEL QUEST DIALOGUE---
    if (this.player.getCantMove() === true && this.dialogueState === 0) {
      CanvasRenderer.writeText(canvas,
        'Good job, Bob!<br>You found 2 of the 3<br>missing dam parts AND<br>the blueprint!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.betty
        , canvas.width - this.betty.width, canvas.height - this.betty.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'Thank you, Betty.<br>But I am still missing<br>the last dam part.<br>Where could that be?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'I think you have to<br>take a look at the<br>desert house. Bottom<br>-right of your map.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.betty
        , canvas.width - this.betty.width, canvas.height - this.betty.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Sorry, Bob. I have no<br>time at the moment.<br>Please find me the<br>dam parts first.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.betty
        , canvas.width - this.betty.width, canvas.height - this.betty.height);
    }
    if (this.player.getCantMove() === true && this.dialogueState === 4) {
      CanvasRenderer.writeText(canvas,
        'First have a look at<br>the desert house, at<br>the bottom-right of<br>your map, Bob.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.betty
        , canvas.width - this.betty.width, canvas.height - this.betty.height);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosY() <= 0) {
      this.player.spawnPos(this.player.getPosX(), (this.maxY - this.player.getHeight() - 5));
      return new VillageMiddle(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosY() + this.player.getHeight() >= this.maxY) {
      this.player.spawnPos(this.player.getPosX(), 0 + 5);
      return new DesertLeft(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosX() <= 0) {
      this.player.spawnPos(this.maxX - this.player.getWidth() - 5, (this.player.getPosY()));
      return new Flowerfield(this.maxX, this.maxY, this.player);
    }
    return null;
  }
}
