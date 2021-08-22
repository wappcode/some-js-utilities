import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { imageToB64, loadImage, scaleImage, svgToB64 } from 'projects/jsutil/src/public_api';

@Component({
  selector: 'sjsu-image-utils',
  templateUrl: './image-utils.component.html',
  styleUrls: ['./image-utils.component.scss']
})
export class ImageUtilsComponent implements OnInit, AfterViewInit {
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
  svgImageText?: string;
  svgImageURL?: SafeResourceUrl;
  svgImageError?: string;

  @ViewChild('svgElement') svgElement?: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setImage();
    this.setErrorImage();
    this.setScaledValues();
  }

  ngAfterViewInit(): void {
    this.setSVGImage();
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
  private setSVGImage(): void {
    const svg = this.svgElement?.nativeElement;
    const svgErr = {} as SVGElement;
    if (!svg) {
      return ;
    }
    svgToB64(svg)
    .then(img => this.svgImageText = img)
    .then(img => this.svgImageURL = this.sanitizer.bypassSecurityTrustResourceUrl(img));
    svgToB64(svgErr).then(img => img).catch(err => {
      console.log("Error convertir svg", err);
      this.svgImageError = "Error convertir svg"
    })
  }
}
