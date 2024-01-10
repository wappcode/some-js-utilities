import { ColorRGB } from './color-types';

/**
 * Convierte un color rgb a su representacion hexadecimal
 * @param color ColoRGBModel
 * @param addPrefix boolean agrega el prefijo # a la representación del color
 * @return string
 */
export const rgbToHex = (color: ColorRGB, addPrefix = true): string => {
  const strColors: { [key: string]: string } = Object.entries(color).reduce((acc, prop) => {
    const [key, value] = prop;
    const valueHex = value.toString(16);
    const colorValue = valueHex.toString().padStart(2, '0');
    value.length === 1 ? `0${valueHex}` : valueHex;
    acc = { ...acc, [key]: colorValue };
    return acc;
  }, {});
  const hexColor = `${strColors.red}${strColors.green}${strColors.blue}`;
  return addPrefix ? `#${hexColor}` : hexColor;
};

/**
 * Extra los valores RGB de un color hexadecimal
 * @param color string
 * @return ColorRGB
 */
export const hexToRgb = (color: string): ColorRGB | null => {
  // Remueve el simbolo #
  let hexColor = color.replace('#', '');
  // Si el color esta en formato corto lo cambia a formato completeo CCC => CCCCCC
  if (hexColor.length < 6) {
    const regExpShortHex = new RegExp(/^([a-f\d])([a-f\d])([a-f\d])$/, 'i');
    hexColor = hexColor.replace(regExpShortHex, (_, $1, $2, $3) => {
      return `${$1}${$1}${$2}${$2}${$3}${$3}`;
    });
  }
  const regExpHexColor = new RegExp(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/, 'i');
  const result = regExpHexColor.exec(hexColor);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : null;
};
