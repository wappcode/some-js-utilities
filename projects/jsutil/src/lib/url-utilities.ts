
export class URLUtilities {
  /**
   * Convierte un objeto en una cadena de parámetros para una URL
   * @param _object
   */
  static param(_object: any): string {
    let result = '';
    const keys = Object.keys(_object);
    keys.forEach((key, index) => {
       if (index > 0 ) {
         result += '&';
       }
       result += `${key}=${_object[key]}`;
    });
    return result;

  }
}
