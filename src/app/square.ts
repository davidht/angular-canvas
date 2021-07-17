export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 30;

  moveRight() {
    this.x++;
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}
