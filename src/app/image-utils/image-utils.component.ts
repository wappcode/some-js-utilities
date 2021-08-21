import { Component, OnInit } from '@angular/core';
import { ImageUtilities } from 'projects/jsutil/src/public_api';

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
