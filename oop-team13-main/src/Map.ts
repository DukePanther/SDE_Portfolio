import CanvasRenderer from './CanvasRenderer.js';

export default class Map {
  private image: HTMLImageElement;

  private mapOpen: boolean;

  public constructor() {
    this.mapOpen = false;
    this.image = CanvasRenderer.loadNewImage('./assets/Damville_Map.png');
  }

  /**
   * opens map
   * @param boolean boolean to determine if the map should be opened
   */
  public mapOpened(boolean: boolean): void{
    if (boolean) {
      this.mapOpen = true;
    } else if (!boolean) {
      this.mapOpen = false;
    }
  }

  /**
   * renders the players map
   * @param canvas where to render
   */
  public render(canvas: HTMLCanvasElement): void {
    if (this.mapOpen) {
      CanvasRenderer.fillCanvas(canvas, 'rgba(0, 0, 0, 0.5)');
      CanvasRenderer.drawImage(canvas, this.image
        , canvas.width / 2 - this.image.width / 2, canvas.height / 2 - this.image.height / 2);
    }
  }
}
