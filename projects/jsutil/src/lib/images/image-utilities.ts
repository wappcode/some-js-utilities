import { ImageDimensions, ImageResizeMode, ImageType } from './image-types';

/**
 * Convierte valores de pixeles a milímetros
 */
const pixelToMM = (pixels: number): number => {
  const mmUnit = 0.264583333333334;
  const result = pixels * mmUnit;
  return result;
};
/**
 * Convierte valores de pixeles a puntos
 */
const pixelToPT = (pixels: number): number => {
  const ptUnit = 0.7499905511811;
  const result = pixels * ptUnit;
  return result;
};

/** SIDE EFECTS */

/**
 * Convierte un canvas en una cadena Base64 que represent una imagen
 * @param canvas
 * @param quality 0 to 1
 * @param type image type png, jpg ...
 */
const canvasimageToB64 = (
  canvas: HTMLCanvasElement,
  quality = 0.9,
  type: ImageType = ImageType.jpeg
): string => {
  const imageTxt = canvas.toDataURL('image/' + type, quality);
  return imageTxt;
};

/**
 * Convierte una imagen en una cadena Base64
 * @param image
 * @param quality 0 to 1
 * @param type image type png, jpg ...
 */
const imageToB64 = (
  image: HTMLImageElement,
  quality = 0.9,
  type: ImageType = ImageType.jpeg
): string => {
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  if (!context) {
    throw Error('No context');
  }
  if (type === ImageType.jpeg) {
    // Si la imagen de salida es jpeg agrega un fondo blanco que será visible para imagenes de origen png con transparencia
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0);
  const imageTxt = canvasimageToB64(canvas, quality, type);
  canvas.remove();
  return imageTxt;
};

/**
 * Realiza la precarga de una imagen
 * @param str url de la imagen
 */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  const img = new Image();
  img.src = src;
  const promise = new Promise<HTMLImageElement>((resolveCallback, reject) => {
    img.addEventListener(
      'load',
      (event) => {
        resolveCallback(img);
      },
      false
    );
    img.addEventListener('error', (event) => reject(event.error));
  });
  return promise;
};

/**
 * Calcula las nuevas dimensiones de la imagen al cambiar el valor de ancho o el alto dependiendo del modo a redimensionar
 * La imagen conserva el radio del aspecto
 * La imagen no se modifica
 * @param image HTMLImageElement
 * @param size number
 * @param resizeMode ImageResizeMode
 * @return ImageDimensions
 */
const calculateDimensions = (
  image: HTMLImageElement,
  size: number,
  resizeMode: ImageResizeMode = ImageResizeMode.auto
): ImageDimensions => {
  let newWidth: number, newHeigth: number;

  const { width, height } = image;
  if (resizeMode === ImageResizeMode.auto) {
    // En caso de que el modo sea automático, lo recalcula tomando como referencia el lado con mayor tamaño de la imagen
    resizeMode =
      width > height ? ImageResizeMode.landscape : ImageResizeMode.portrait;
  }

  if (resizeMode === ImageResizeMode.portrait) {
    // Asigna el tamaño al alto de la imagen y calcula el ancho de acurdo al radio del aspecto
    // La imagen esta en formato vertical (retrato)
    newHeigth = size;
    newWidth = (width * size) / height;
  } else if (resizeMode === ImageResizeMode.landscape) {
    // Asigna el tamaño al ancho de la imagen y calcula el alto de acurdo al radio del aspecto
    // La imagen esta en formato horizontal (paisaje)
    newWidth = size;
    newHeigth = (height * size) / width;
  } else if (resizeMode === ImageResizeMode.percent) {
    // Aplica el porcentaje al alto y ancho de la imagen
    const percent = size / 100;
    const percentWidth = width * percent;
    const percentHeigth = height * percent;
    newWidth = parseFloat(percentWidth.toFixed(2));
    newHeigth = parseFloat(percentHeigth.toFixed(2));
  } else {
    // Si no coincide mode con los valores permitidos lanza una excepcion
    throw { error: 'El parámetro mode es inválido' };
  }
  // Define el valor predeterminado de la respuesta
  const result = { width: newWidth, height: newHeigth };

  return result;
};

/**
 * Escala una imagen
 * @param image HTMLImageElement
 * @param size numero
 * @param resizeMode ImageResizeMode
 * @param output string B64 ó object HTMLImageElement
 * @param quality  numero
 * @param type  jpeg o png
 */
const scaleImage = (
  image: HTMLImageElement,
  size: number,
  resizeMode: ImageResizeMode = ImageResizeMode.auto,
  output: 'object' | 'string' = 'object',
  quality: number = 0.9,
  type: ImageType = ImageType.jpeg
): Promise<HTMLImageElement | string> => {
  // Definelos nuevos valores de alto y ancho
  const dimension = calculateDimensions(image, size, resizeMode);
  const newWidth = dimension.width;
  const newHeigth = dimension.height;
  // Crea un canvas para guardar la imagen
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeigth;
  const context = canvas.getContext('2d');
  if (!context) {
    throw Error('No context');
  }
  if (type === ImageType.jpeg) {
    // Si la imagen de salida es jpeg agrega un fondo blanco que será vicible para imagenes de origen png con transparencia
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Recupera los datos de la imagen escalada
  const strImage = canvasimageToB64(canvas, quality, type);
  // Crea una promise y asigna el resultado deacuerdo a la salida solicitada
  let promise: Promise<HTMLImageElement | string>;
  if (output === 'string') {
    promise = new Promise<string>((resolve, reject) => {
      resolve(strImage);
    });
  } else {
    promise = loadImage(strImage);
  }

  return promise;
};

const createSVGElement = (input: string): SVGElement | null => {
  const element = document.createElement('div');
  element.innerHTML = input;
  const svg = element.querySelector('svg');
  return svg;
};

const svgToB64 = (
  svgInput: SVGElement | string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svg: SVGElement | null =
      typeof svgInput === 'string'
        ? createSVGElement(svgInput)
        : (svgInput as SVGElement);
    try {
      if (!svg) {
        throw new Error('Invalid SVG');
      }
      svg.setAttribute('width', `${width}`);
      svg.setAttribute('height', `${height}`);
      const svgString = svg.outerHTML;
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
    } catch (e) {
      reject(e);
    }
  });
};

export {
  pixelToMM,
  pixelToPT,
  canvasimageToB64,
  imageToB64,
  loadImage,
  calculateDimensions,
  scaleImage,
};