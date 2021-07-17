import { Component, OnInit, VERSION } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Square } from './square';
import { NgZone } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  name = 'Angular ' + VERSION.major;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Square[] = [];

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  play() {
    const square = new Square(this.ctx);
    //this.squares = this.squares.concat(square);
    this.squares.push(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
