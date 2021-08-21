import { Component, OnInit } from '@angular/core';
import { ColorRGB } from 'projects/jsutil/src/lib/color/color-types';
import { hexToRgb, rgbToHex } from 'projects/jsutil/src/public_api';

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
  rgbColors: ColorRGB[] = [
    {red: 204, green: 204, blue: 204},
    {red: 10, green: 204, blue: 138}
  ];
  constructor() { }

  
  toRGB(color: string) {
    return hexToRgb(color);
  }
  toHex (color: ColorRGB) {
    return rgbToHex(color);
  }

}
