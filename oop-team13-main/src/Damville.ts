import CanvasRenderer from './CanvasRenderer.js';
import {Game} from './GameLoop.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Map from './Map.js';
import Scene from './Scenes/Scene.js';
import QuestProgression from './QuestProgression.js';
import KeyBindMap from './KeyBindMap.js';
import StartScreen from './Scenes/StartScreen.js';

export default class Damville extends Game {
  private canvas: HTMLCanvasElement;

  private player: Player;

  private currentScene: Scene;

  private keyListener: KeyListener;

  private map: Map;

  private keyBindMap: KeyBindMap;

  private questProgression: QuestProgression;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = 720;
    this.canvas.width = 1280;
    this.keyListener = new KeyListener;
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.player.spawnPos(this.canvas.width, this.canvas.height);
    this.player.setCantMove(true);
    this.currentScene = new StartScreen(this.canvas.width, this.canvas.height
      , this.player, this.canvas);
    this.map = new Map;
    this.keyBindMap = new KeyBindMap;
    this.questProgression = new QuestProgression;
  }

  /**
   * procceses user input
   */
  public override processInput(): void {
    if(this.keyListener.isKeyDown(KeyListener.KEY_W)) {
      this.player.moveUp();
    }
    if(this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.player.moveDown();
    }
    if(this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      this.player.moveLeft();
    }
    if(this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      this.player.moveRight();
    }
    if(this.keyListener.isKeyDown(KeyListener.KEY_Q)) {
      this.map.mapOpened(true);
    } else if (!this.keyListener.isKeyDown(KeyListener.KEY_Q)) {
      this.map.mapOpened(false);
    }
    if(this.keyListener.isKeyDown(KeyListener.KEY_Z)) {
      this.keyBindMap.mapOpened(true);
    } else if (!this.keyListener.isKeyDown(KeyListener.KEY_Z)) {
      this.keyBindMap.mapOpened(false);
    }
  }

  /**
   * updates game
   * @param elapsed time
   * @returns true
   */
  public override update(elapsed: number): boolean {
    this.currentScene.update(elapsed, this.questProgression);
    const scene: Scene = this.currentScene.getNextScene();
    if(scene != null) {
      this.currentScene = scene;
    }

    this.player.update(elapsed);

    return true;
  }

  /**
   * renders the game
   */
  public override render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.currentScene.render(this.canvas);
    this.player.render(this.canvas);
    this.map.render(this.canvas);
    this.keyBindMap.render(this.canvas);
  }
}
