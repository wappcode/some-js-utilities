import { Component, OnInit } from '@angular/core';
import { imageToB64, loadImage, scaleImage } from 'projects/jsutil/src/public_api';

@Component({
  selector: 'sjsu-image-utils',
  templateUrl: './image-utils.component.html',
  styleUrls: ['./image-utils.component.scss']
})
export class ImageUtilsComponent implements OnInit {
  source?: HTMLImageElement;
  destiny?: HTMLImageElement;
  imageText = '';
  imageError = ''
  errorLoadImage?: string; 
  imageScaled?: string;
  originalImageWidth?: number;
  originalImageHeigth?: number;
  scaledImageWidth?: number;
  scaledImageHeigth?: number;
  scaledImage?: HTMLImageElement;

  constructor() { }

  ngOnInit(): void {
    this.setImage();
    this.setErrorImage();
    this.setScaledValues();
  }


  private setImage(): void {
    const url = 'assets/4kimage.jpg';
    loadImage(url).then(imageToB64).then(img => this.imageText = img);
  }
  private setErrorImage(): void {
    const url = 'assets/4kimages.jpg';
    loadImage(url).then(img => img).catch(error => this.errorLoadImage = error);
  }
  private setScaledValues(): void {
    const url = 'assets/4kimage.jpg';
    loadImage(url).then(img => {
      this.originalImageHeigth = img.height;
      this.originalImageWidth = img.width;
      return img;
    }).then(img => scaleImage(img, 600)).then(img => {
      this.scaledImageHeigth = img.height;
      this.scaledImageWidth = img.width;
      this.scaledImage = img;
    }).catch(error => this.errorLoadImage = error);
  }
}
