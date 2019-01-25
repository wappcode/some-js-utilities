export class ImageUtilities {

  /**
   * Convierte valores de pixeles a milímetros
   */
  static pixel2MM(pixels: number) {
    const mmUnit = 0.264583333333334;
    const result = pixels * mmUnit;
    return result;
  }
  /**
   * Convierte una imagen en una cadena Base64
   * @param image
   * @param quality 0 to 1
   * @param type image type png, jpg ...
   */
  static B64(image: HTMLImageElement, quality = 0.9, type = 'jpeg'): string {
    type = type.trim().toLowerCase();
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageTxt = ImageUtilities.canvasToB64(canvas, quality, type);
    canvas = null;
    context = null;
    return imageTxt;
  }
  /**
   * Convierte un canvas en una cadena Base64 que represent una imagen
   * @param canvas
   * @param quality 0 to 1
   * @param type image type png, jpg ...
   */
  static canvasToB64(canvas: HTMLCanvasElement, quality = 0.9, type = 'jpeg'): string {
    const imageTxt = canvas.toDataURL('image/' + type, quality);
    return imageTxt;
  }
  /**
   * Realiza la precarga de una imagen
   * @param str url de la imagen
   */
  static  load(src: string): Promise <HTMLImageElement> {
    const img = new Image();
    img.src = src;
    const promise = new Promise <HTMLImageElement>((resolveCallback, reject) => {
      img.addEventListener('load', event => {
        resolveCallback(img);
      }, false);
    });
    return promise;
  }
  /**
   * Escala una imagen
   * @param image HTMLImageElement
   * @param size numero
   * @param mode portrait tipo retrato vertical, landscape tipo paisaje horizontal, porcentaje
   * @param output string B64 ó object HTMLImageElement
   * @param quality  numero
   * @param type  jpeg o png
   */
  static scale(
    image: HTMLImageElement,
    size: number,
    mode: 'portrait'|'landscape'|'percent' = 'landscape',
    output: 'object'|'string' = 'object',
    quality: number = 0.9,
    type: 'jpeg'|'png' = 'jpeg',
    ): Promise<HTMLImageElement|string> {

      // Definelos nuevos valores de alto y ancho
      const dimension =  ImageUtilities.calculateSize(image, size, mode);
      const newWidth = dimension.width;
      const newHeigth = dimension.height;
      // Crea un canvas para guardar la imagen
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeigth;
      const context: CanvasRenderingContext2D = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Recupera los datos de la imagen escalada
      const strImage = ImageUtilities.canvasToB64(canvas, quality, type);
      // Crea una promise y asigna el resultado deacuerdo a la salida solicitada
      let promise: Promise<HTMLImageElement|string>;
      if (output === 'string') {
        promise = new Promise <string> ((resolve, reject) => {
          resolve(strImage);
        });
      } else {
        promise = ImageUtilities.load(strImage);
      }

      return promise;

  }
  private static calculateSize(image: HTMLImageElement, size: number,  mode: 'portrait'|'landscape'|'percent'): {width: any, height: any} {
    let newWidth: number , newHeigth: number;

    const {width, height} = image;

    if (mode === 'portrait') {
      // La imagen esta en formato vertical (retrato)
      newHeigth = size;
      newWidth = width * size / height;

    } else if (mode === 'landscape') {
       // La imagen esta en formato horizontal (paisaje)
       newWidth = size;
       newHeigth = height * size / width;

    } else if (mode === 'percent') {
        const percent = size / 100;
        const percentWidth = width * percent;
        const percentHeigth = height * percent;
        newWidth = parseFloat(percentWidth.toFixed(2));
        newHeigth = parseFloat(percentHeigth.toFixed(2));

    } else {
      // Si no coincide mode con los valores permitidos lanza una excepcion
      throw  {error: 'El parámetro mode es inválido'};
    }
    // Define el valor predeterminado de la respuesta
    const result = {width: newWidth, height: newHeigth};

    return result;
  }

}
