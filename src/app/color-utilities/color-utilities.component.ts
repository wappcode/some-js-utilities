import { Component, OnInit } from '@angular/core';
import { ColorUtilities, ColoRGBModel } from 'projects/jsutil/src/lib/color-utilities';

@Component({
  selector: 'sjsu-color-utilities',
  templateUrl: './color-utilities.component.html',
  styleUrls: ['./color-utilities.component.scss']
})
export class ColorUtilitiesComponent{

  hexaColors = [
    '#CCC',
    '#CCCCCC',
    '#0C8',
    '#0ACC8A',
  ];
  rgbColors: ColoRGBModel[] = [
    {red: 204, green: 204, blue: 204},
    {red: 10, green: 204, blue: 138}
  ];
  constructor() { }

  
  toRGB(color: string) {
    return ColorUtilities.hexToRgb(color);
  }
  toHex (color: ColoRGBModel) {
    return ColorUtilities.rgbToHex(color);
  }

}
