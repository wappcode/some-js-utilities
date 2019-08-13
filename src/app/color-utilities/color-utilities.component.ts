import { Component, OnInit } from '@angular/core';
import { ColorUtilities, ColoRGBModel } from 'projects/jsutil/src/lib/color-utilities';

@Component({
  selector: 'sjsu-color-utilities',
  templateUrl: './color-utilities.component.html',
  styleUrls: ['./color-utilities.component.scss']
})
export class ColorUtilitiesComponent implements OnInit {

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

  ngOnInit() {
  }
  toRGB(color) {
    return ColorUtilities.hexToRgb(color);
  }
  toHex (color) {
    return ColorUtilities.rgbToHex(color);
  }

}
