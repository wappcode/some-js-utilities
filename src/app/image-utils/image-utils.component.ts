import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sjsu-image-utils',
  templateUrl: './image-utils.component.html',
  styleUrls: ['./image-utils.component.scss']
})
export class ImageUtilsComponent  {
  source?: HTMLImageElement;
  destiny?: HTMLImageElement;


  constructor() { }
}
