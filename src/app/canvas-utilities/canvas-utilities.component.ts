import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { addMultilineTextToCanvas } from '../../../projects/jsutil/src/public_api';

@Component({
  selector: 'sjsu-canvas-utilities',
  templateUrl: './canvas-utilities.component.html',
  styleUrls: ['./canvas-utilities.component.scss'],
})
export class CanvasUtilitiesComponent implements AfterViewInit {
  canvas?: HTMLCanvasElement;
  @ViewChild('canvasMultilineText') canvasRef!: ElementRef;
  constructor() {}

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    if (!!this.canvas) {
      this.canvas.width = 300;
      this.canvas.height = 500;
      this.addText();
    }
  }

  private addText(): void {
    if (!this.canvas) {
      return;
    }
    const ctx = this.canvas.getContext('2d')!;
    ctx.font = 'normal 14px Arial';
    const padding = 20;
    const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi facilis fuga non sequi exercitationem quas esse aut officiis perspiciatis ducimus praesentium, porro ipsam debitis ipsum blanditiis ea aperiam repellendus illum?`;
    const width = this.canvas.width - padding * 2;
    addMultilineTextToCanvas(ctx, text, padding, padding, width, 1.5);
  }
}
