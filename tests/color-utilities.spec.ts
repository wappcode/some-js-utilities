import { ColorRGB } from '../src/color-types';
import { hexToRgb, rgbToHex } from '../src/color-utilities';

describe('ColorUtilities', () => {
  it('testing rgb to hex', () => {
    const rgb: ColorRGB = {
      red: 255,
      blue: 0,
      green: 0,
    };
    const expected = '#ff0000';
    const calculated = rgbToHex(rgb);
    expect(calculated).toEqual(expected);
  });
  it('testing hex to rgb', () => {
    const hex = '#00ff00';
    const expected = 255;
    const calculated = hexToRgb(hex);
    const green = calculated?.green;
    const red = calculated?.red;
    const blue = calculated?.blue;
    expect(green).toEqual(expected);
    expect(red).toEqual(0);
    expect(blue).toEqual(0);
  });
});
