
export interface ColoRGBModel {
    red: number;
    green: number;
    blue: number;
}
export class ColorUtilities {

    /**
     * Convierte un color rgb a su representacion hexadecimal
     * @param color ColoRGBModel
     * @param addPrefix boolean agrega el prefijo # a la representación del color
     * @return string
     */
    static rgbToHex(color: ColoRGBModel, addPrefix = true): string {
        const strColors: any = {};
        Object.keys(color).forEach(key => {
            const value = color[key].toString(16);
            strColors[key] = value.length === 1 ? `0${value}` : value;
        });
        const hexColor = `${strColors.red}${strColors.green}${strColors.blue}`;
        return addPrefix ? `#${hexColor}` : hexColor;
    }
    /**
     * Extra los valores RGB de un color hexadecimal
     * @param color string
     * @return ColoRGBModel
     */
    static hexToRgb (color: string): ColoRGBModel {
        // Remueve el simbolo #
        let hexColor = color.replace('#', '');
        // Si el color esta en formato corto lo cambia a formato completeo CCC => CCCCCC
        if (hexColor.length < 6) {
            const regExpShortHex = new RegExp(/^([a-f\d])([a-f\d])([a-f\d])$/, 'i');
            hexColor = hexColor.replace(regExpShortHex, (match, $1, $2, $3) =>  {
                return `${$1}${$1}${$2}${$2}${$3}${$3}`;
            });
        }
        const regExpHexColor = new RegExp(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/, 'i');
        const result = regExpHexColor.exec(hexColor);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

}
