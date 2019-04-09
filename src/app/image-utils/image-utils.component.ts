import { Component, OnInit } from '@angular/core';
import { ImageUtilities } from 'projects/jsutil/src/public_api';

@Component({
  selector: 'sjsu-image-utils',
  templateUrl: './image-utils.component.html',
  styleUrls: ['./image-utils.component.scss']
})
export class ImageUtilsComponent implements OnInit {
  source: HTMLImageElement;
  destiny: HTMLImageElement;


  constructor() { }

  ngOnInit() {
    ImageUtilities.load(require('../../assets/4kimage.png')).then(img => {
      this.source = img;
      ImageUtilities.scale(this.source, 800).then(imgScaled => {
        this.destiny = <HTMLImageElement> imgScaled;
      });
    });

  }

}
