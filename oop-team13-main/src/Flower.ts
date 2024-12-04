/* eslint-disable @typescript-eslint/no-unused-vars */
import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Flower extends CanvasItem {
  public constructor(maxX: number, maxY: number, color: string) {
    super();
    if (color === 'Blue') {
      this.image = CanvasRenderer.loadNewImage('./assets/FlowerBlue.png');
    }
    if (color === 'Yellow') {
      this.image = CanvasRenderer.loadNewImage('./assets/FlowerYellow.png');
    }
    if (color === 'Pink') {
      this.image = CanvasRenderer.loadNewImage('./assets/FlowerPink.png');
    }
    this.posX = Math.floor(Math.random() * 780 + 136) ;
    this.posY = Math.floor(Math.random() * 270 + 61) ;
  }
}
