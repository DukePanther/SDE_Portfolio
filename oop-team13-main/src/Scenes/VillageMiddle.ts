import Scene from './Scene.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import VillageUp from './VillageUp.js';
import VillageDown from './VillageDown.js';
import VillageRight from './VillageRight.js';
import KeyListener from '../KeyListener.js';
import QuestProgression from '../QuestProgression.js';
import Vault from './Vault.js';

export default class VillageMiddle extends Scene {
  private hazel: HTMLImageElement;

  private felix: HTMLImageElement;

  private bob: HTMLImageElement;

  private characterName: string;

  private dialogueState: number;

  private vaultNoteShow: boolean;

  private sceneCanvas: HTMLCanvasElement;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY, player);
    this.background = CanvasRenderer.loadNewImage('./assets/Scenes/Village_Middle.png');
    this.hazel = CanvasRenderer.loadNewImage('./assets/NPC/Hazel.png');
    this.felix = CanvasRenderer.loadNewImage('./assets/NPC/Felix.png');
    this.bob = CanvasRenderer.loadNewImage('./assets/NPC/Bob.png');
    this.vaultNoteShow = false;
  }

  /**
   *
   * @param elapsed Elapsed time
   * @param questProgression Connect with 'Questprogression'.
   */
  public override update(elapsed: number, questProgression: QuestProgression): void {
    this.getNextScene();
    this.player.update(elapsed);

    // Hazel house
    if (this.player.getPosX() >= 216 && this.player.getPosX() <= 304 &&
    this.player.getPosY() >= 400 && this.player.getPosY() <= 410) {
      this.showEKey = true;
      // Check the current state of the Hazel quest.
      // If not started yet, execute this dialogue.
      if (questProgression.getQuestProgression('Hazel') === 'NotBegan') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.characterName = 'Hazel';
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
            this.dialogueState = 3;
            this.player.setCantMove(false);
            this.showSpacekey = false;
            questProgression.setQuestProgression('Hazel', 'QuestStarted');
          }
        }
      }
      // Check the current state of the Hazel quest.
      // If already started, execute this dialogue.
      if (questProgression.getQuestProgression('Hazel') === 'QuestStarted') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.dialogueState = 3;
          this.player.setCantMove(true);
          this.characterName = 'Hazel';
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 3) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.player.setCantMove(false);
            this.showSpacekey = false;
          }
        }
      }
      // Check the current state of the Hazel quest.
      // If finished, execute this dialogue.
      if (questProgression.getQuestProgression('Hazel') === 'QuestDone') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.characterName = 'Hazel';
          this.dialogueState = 4;
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 4) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 5;
          }
        } else if (this.player.getCantMove() === true && this.dialogueState === 5) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 6;
          }
        } else if (this.player.getCantMove() === true && this.dialogueState === 6) {
          // End dialogue, start quest, set dialogue for next interaction if quest not jet completed
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.dialogueState = 6;
            this.player.setCantMove(false);
            this.showSpacekey = false;
            questProgression.setQuestProgression('Hazel', 'QuestClueStarted');
          }
        }
      }
      // Check the current state of the Hazel quest.
      // If already completed, execute this dialogue.
      if (questProgression.getQuestProgression('Hazel') === 'QuestClueStarted') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.dialogueState = 6;
          this.player.setCantMove(true);
          this.characterName = 'Hazel';
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 6) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.player.setCantMove(false);
            this.showSpacekey = false;
          }
        }
      }

      // Felix house
    } else if (this.player.getPosX() >= 936 && this.player.getPosX() <= 1024 &&
    this.player.getPosY() >= 400 && this.player.getPosY() <= 410) {
      this.showEKey = true;
      // Check the current state of the Felix quest.
      // If not started jet, execute this dialogue.
      if (questProgression.getQuestProgression('Felix') === 'NotBegan') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.player.setCantMove(true);
          this.characterName = 'Felix';
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
            this.dialogueState = 3;
            this.player.setCantMove(false);
            this.showSpacekey = false;
            questProgression.setQuestProgression('Felix', 'QuestStarted');
          }
        }
      }
      // Check the current state of the Felix quest.
      // If already started, execute this dialogue.
      if (questProgression.getQuestProgression('Felix') === 'QuestStarted') {
        if (this.keyListener.keyPressed(KeyListener.KEY_E)) {
          this.dialogueState = 3;
          this.player.setCantMove(true);
          this.characterName = 'Felix';
          this.showSpacekey = true;
        }
        if (this.player.getCantMove() === true && this.dialogueState === 3) {
          if (this.keyListener.keyPressed(KeyListener.KEY_SPACE)) {
            this.showSpacekey = false;
            this.vaultNoteShow = true;
          }
        }
      }
    } else {
      this.showEKey = false;
    }
    // Lower left fence collisions
    this.handleCollision(0, 530, 604, this.maxY, this.player.getPosX(), 604);
    this.handleCollision(0, 536, 610, this.maxY, 536, this.player.getPosY());

    // Lower right fence collisions
    this.handleCollision(710, this.maxX, 604, this.maxY, this.player.getPosX(), 604);
    this.handleCollision(704, this.maxX, 610, this.maxY, 704, this.player.getPosY());

    // Left bush collision
    this.handleCollision(0, 81, 0, this.maxY, 81, this.player.getPosY());

    // Left house collisions
    this.handleCollision(0, 530, 0, 401, this.player.getPosX(), 401);
    this.handleCollision(0, 536, 0, 395, 536, this.player.getPosY());

    // Left house lower left fence collision
    this.handleCollision(0, 210, 0, 461, this.player.getPosX(), 461);
    this.handleCollision(0, 216, 0, 455, 216, this.player.getPosY());

    // Right house collisions
    this.handleCollision(710, this.maxX, 0, 401, this.player.getPosX(), 401);
    this.handleCollision(704, this.maxX, 0, 395, 704, this.player.getPosY());

    // Right house right fence collision
    this.handleCollision(1030, this.maxX, 0, 461, this.player.getPosX(), 461);
    this.handleCollision(1024, this.maxX, 0, 455, 1024, this.player.getPosY());

    // Right bush collision
    this.handleCollision(1165, this.maxX, 0, 556, this.player.getPosX(), 556);
    this.handleCollision(1159, this.maxX, 0, 550, 1159, this.player.getPosY());

    // Left house right fence collision
    this.handleCollision(310, 530, 0, 461, this.player.getPosX(), 461);
    this.handleCollision(304, 400, 0, 455, 304, this.player.getPosY());
    this.handleCollision(401, 536, 0, 455, 536, this.player.getPosY());

    // Right house left fence collision
    this.handleCollision(710, 930, 0, 461, this.player.getPosX(), 461);
    this.handleCollision(704, 800, 0, 455, 704, this.player.getPosY());
    this.handleCollision(801, 936, 0, 455, 936, this.player.getPosY());
  }

  /**
   * renders the VillageMiddle scene
   * @param canvas where to render
   */
  public override render(canvas: HTMLCanvasElement): void {
    this.sceneCanvas = canvas;
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
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 0) {
      CanvasRenderer.writeText(canvas,
        'Hi there, Bob!<br>Could you bring me<br>some apples to make<br>an applepie?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.hazel
        , canvas.width - this.hazel.width, canvas.height - this.hazel.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'Of course, Hazel.<br>But, where can I find<br>these apples?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'You can find the apples<br>in the forest,<br>at the top-right of<br>your map.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.hazel
        , canvas.width - this.hazel.width, canvas.height - this.hazel.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Please find me some<br>apples in the forest<br>first, Bob.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.hazel
        , canvas.width - this.hazel.width, canvas.height - this.hazel.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 4) {
      CanvasRenderer.writeText(canvas,
        'I have collected the <br>apples, here you go.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 5) {
      CanvasRenderer.writeText(canvas,
        'Thats great!<br>Now I can make an<br>applepie.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.hazel
        , canvas.width - this.hazel.width, canvas.height - this.hazel.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Hazel' && this.dialogueState === 6) {
      CanvasRenderer.writeText(canvas,
        'I will send you an<br>email with a clue.<br>Maybe Mira has info<br>about your problem.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.hazel
        , canvas.width - this.hazel.width, canvas.height - this.hazel.height);
    }

    // ---FELIX QUEST DIALOGUE---
    if (this.player.getCantMove() === true && this.characterName === 'Felix' && this.dialogueState === 0) {
      CanvasRenderer.writeText(canvas,
        'Hey, Bob! I need your<br>help! I forgot the vault<br>code where the dam<br>blueprint is stored!',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.felix
        , canvas.width - this.felix.width, canvas.height - this.felix.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Felix' && this.dialogueState === 1) {
      CanvasRenderer.writeText(canvas,
        'And how can I help<br>with that, Felix?',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.bob, 0, canvas.height - this.bob.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Felix' && this.dialogueState === 2) {
      CanvasRenderer.writeText(canvas,
        'Count the number of each<br>flower in the flower<br>field (left on your map)<br>and come back to me.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.felix
        , canvas.width - this.felix.width, canvas.height - this.felix.height);
    }
    if (this.player.getCantMove() === true && this.characterName === 'Felix' && this.dialogueState === 3) {
      CanvasRenderer.writeText(canvas,
        'Did you count the<br>numbers? Here is a note<br>with the sum to get the<br>code. Please complete it.',
        (canvas.width - this.dialogueBlock.width) / 1.7,
        canvas.height - this.dialogueBlock.height * 1.2);
      CanvasRenderer.drawImage(canvas, this.felix
        , canvas.width - this.felix.width, canvas.height - this.felix.height);
    }
  }

  /**
   * decides if the player should go to next scene and sends them there
   * @returns next scene or null
   */
  public override getNextScene(): Scene | null {
    if (this.player.getPosY() <= 0) {
      this.player.spawnPos(this.player.getPosX(), (this.maxY - this.player.getHeight() - 5));
      return new VillageUp(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosY() + this.player.getHeight() >= this.maxY) {
      this.player.spawnPos(this.player.getPosX(), 0 + 5);
      return new VillageDown(this.maxX, this.maxY, this.player);
    }
    if (this.player.getPosX() >= this.maxX - this.player.getWidth()) {
      this.player.spawnPos(0 + 5, this.player.getPosY());

      return new VillageRight(this.maxX, this.maxY, this.player);
    }
    if (this.vaultNoteShow) {
      this.player.spawnPos(this.maxX, this.maxY);
      return new Vault(this.maxX, this.maxY, this.player
        , this.sceneCanvas, this.player.getPosX(), this.player.getPosY());
    }
    return null;
  }
}

