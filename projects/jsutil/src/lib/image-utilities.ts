export enum ImageResizeMode {
  portrait = 'portrait',
  landscape = 'landscape',
  percent = 'percent',
  auto = 'auto'
}
export enum ImageType {
  jpeg = 'jpeg',
  png = 'png'
}
export interface ImageDimensions {
  width: number;
  height: number;
}
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
   * Convierte valores de pixeles a puntos
   */
  static pixel2PT(pixels: number) {
    const ptUnit = 0.7499905511811;
    const result = pixels * ptUnit;
    return result;
  }
  /**
   * Convierte una imagen en una cadena Base64
   * @param image
   * @param quality 0 to 1
   * @param type image type png, jpg ...
   */
  static B64(image: HTMLImageElement, quality = 0.9, type: ImageType = ImageType.jpeg): string {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    if (type === ImageType.jpeg) {
      // Si la imagen de salida es jpeg agrega un fondo blanco que será visible para imagenes de origen png con transparencia
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
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
  static canvasToB64(canvas: HTMLCanvasElement, quality = 0.9, type: ImageType =  ImageType.jpeg): string {
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
   * @param resizeMode ImageResizeMode
   * @param output string B64 ó object HTMLImageElement
   * @param quality  numero
   * @param type  jpeg o png
   */
  static scale(
    image: HTMLImageElement,
    size: number,
    resizeMode: ImageResizeMode = ImageResizeMode.auto,
    output: 'object'|'string' = 'object',
    quality: number = 0.9,
    type: ImageType = ImageType.jpeg,
    ): Promise<HTMLImageElement|string> {

      // Definelos nuevos valores de alto y ancho
      const dimension =  ImageUtilities.newDimensions(image, size, resizeMode);
      const newWidth = dimension.width;
      const newHeigth = dimension.height;
      // Crea un canvas para guardar la imagen
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeigth;
      const context: CanvasRenderingContext2D = canvas.getContext('2d');
      if (type === ImageType.jpeg) {
        // Si la imagen de salida es jpeg agrega un fondo blanco que será vicible para imagenes de origen png con transparencia
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
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
  /**
   * Calcula las nuevas dimensiones de la imagen al cambiar el valor de ancho o el alto dependiendo del modo a redimensionar
   * La imagen conserva el radio del aspecto
   * La imagen no se modifica
   * @param image HTMLImageElement
   * @param size number
   * @param resizeMode ImageResizeMode
   * @return ImageDimensions
   */
  static newDimensions(
    image: HTMLImageElement,
    size: number,
    resizeMode: ImageResizeMode = ImageResizeMode.auto
    ): ImageDimensions {
    let newWidth: number , newHeigth: number;

    const {width, height} = image;
    if (resizeMode === ImageResizeMode.auto) {
      // En caso de que el modo sea automático, lo recalcula tomando como referencia el lado con mayor tamaño de la imagen
      resizeMode = (width > height) ? ImageResizeMode.landscape : ImageResizeMode.portrait;
    }

    if (resizeMode === ImageResizeMode.portrait) {
      // Asigna el tamaño al alto de la imagen y calcula el ancho de acurdo al radio del aspecto
      // La imagen esta en formato vertical (retrato)
      newHeigth = size;
      newWidth = width * size / height;

    } else if (resizeMode === ImageResizeMode.landscape) {
      // Asigna el tamaño al ancho de la imagen y calcula el alto de acurdo al radio del aspecto
       // La imagen esta en formato horizontal (paisaje)
       newWidth = size;
       newHeigth = height * size / width;

    } else if (resizeMode === ImageResizeMode.percent) {
      // Aplica el porcentaje al alto y ancho de la imagen
        const percent = size / 100;
        const percentWidth = width * percent;
        const percentHeigth = height * percent;
        newWidth = parseFloat(percentWidth.toFixed(2));
        newHeigth = parseFloat(percentHeigth.toFixed(2));

    }  else {
      // Si no coincide mode con los valores permitidos lanza una excepcion
      throw  {error: 'El parámetro mode es inválido'};
    }
    // Define el valor predeterminado de la respuesta
    const result = {width: newWidth, height: newHeigth};

    return result;
  }

}
