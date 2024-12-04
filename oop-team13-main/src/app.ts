import { GameLoop } from './GameLoop.js';
import Damville from './Damville.js';

const game: Damville = new Damville(document.getElementById('game') as HTMLCanvasElement);

const gameLoop: GameLoop = new GameLoop(game);
window.addEventListener('load', () => {
  gameLoop.start();
});
