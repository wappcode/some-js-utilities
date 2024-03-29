import { ImageDimensions, ImageResizeMode, ImageType } from './image-types';

/**
 * Convierte valores de pixeles a milímetros
 */
export const pixelToMM = (pixels: number): number => {
  const mmUnit = 0.264583333333334;
  const result = pixels * mmUnit;
  return result;
};
/**
 * Convierte valores de pixeles a puntos
 */
export const pixelToPT = (pixels: number): number => {
  const ptUnit = 0.7499905511811;
  const result = pixels * ptUnit;
  return result;
};

/** SIDE EFECTS */

/**
 * Convierte un canvas en una cadena Base64 para ser usada como imagen
 * @param canvas
 * @param quality 0 to 1
 * @param type image type png, jpg ...
 */
export const canvasToB64 = (
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
export const imageToB64 = (
  image: HTMLImageElement,
  quality = 0.9,
  type: ImageType = ImageType.jpeg
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw Error('No context');
  }
  if (type === ImageType.jpeg) {
    // Si la imagen de salida es jpeg agrega un fondo blanco que será visible para imagenes de origen png con transparencia
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0);
  const imageTxt = canvasToB64(canvas, quality, type);
  canvas.remove();
  return imageTxt;
};

/**
 * Realiza la precarga de una imagen. Retorna una promesa con la imagen
 * @param str url de la imagen
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  const img = new Image();
  img.src = src;
  const promise = new Promise<HTMLImageElement>((resolveCallback, reject) => {
    img.addEventListener(
      'load',
      () => {
        resolveCallback(img);
      },
      false
    );
    img.addEventListener('error', () => reject(new Error(`Error load image ${src}`)));
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
export const calculateDimensions = (
  image: HTMLImageElement,
  size: number,
  resizeMode: ImageResizeMode = ImageResizeMode.auto
): ImageDimensions => {
  let newWidth: number, newHeigth: number;

  const { width, height } = image;
  if (resizeMode === ImageResizeMode.auto) {
    // En caso de que el modo sea automático, lo recalcula tomando como referencia el lado con mayor tamaño de la imagen
    resizeMode = width > height ? ImageResizeMode.landscape : ImageResizeMode.portrait;
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
export const scaleImage = (
  image: HTMLImageElement,
  size: number,
  resizeMode: ImageResizeMode = ImageResizeMode.auto,
  quality: number = 0.9,
  type: ImageType = ImageType.jpeg
): Promise<HTMLImageElement> => {
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
  const strImage = canvasToB64(canvas, quality, type);
  return loadImage(strImage);
};

/**
 * Convierte una cadena que representa un svg en un elmento SVGElement
 * @param input
 * @returns
 */
export const createSVGElement = (input: string): SVGElement | null => {
  const element = document.createElement('div');
  element.innerHTML = input;
  const svg = element.querySelector('svg');
  return svg;
};

/**
 * Convierte una imagen SVG en string B64
 * Para objetos foreignObject es necesario agregar un elemento hijo como root y
 * asignarle el atributo xmlns="http://www.w3.org/1999/xhtml
 * Ej. <foreignObject><div xmlns="http://www.w3.org/1999/xhtml"><strong style="color: red">Hola Mundo</strong></div></foreignObject>
 * @param svg
 * @param width
 * @param height
 * @param type
 * @returns
 */
export const svgToB64 = (
  svgInput: SVGElement,
  width?: number,
  height?: number,
  quality = 0.9,
  type: ImageType = ImageType.jpeg
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const svg = svgInput.cloneNode(true) as SVGElement;
      if (width) {
        svg.setAttribute('width', `${width}`);
      }
      if (height) {
        svg.setAttribute('height', `${height}`);
      }
      const attrXmlns = svg.getAttribute('xmlns');
      if (!attrXmlns) {
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      const svgString = svg.outerHTML;
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        loadImage(base64data)
          .then((src) => imageToB64(src, quality, type))
          .then(resolve);
      };
    } catch (e) {
      reject(e);
    }
  });
};
/**
 * Convierte una imagen SVG en una imagen PNG
 * Utiliza de forma interna la función svgToB64 ver docs de esa funcion para más detalles
 * @param svg
 * @param width
 * @param height
 * @returns
 */
export const svgToPNG = (
  svgInput: SVGElement,
  width?: number,
  height?: number,
  quality = 0.9
): Promise<HTMLImageElement> => {
  const type = ImageType.png;
  return svgToB64(svgInput, width, height, quality, type).then(loadImage);
};
/**
 * Convierte una imagen SVG en una imagen JPG
 * Utiliza de forma interna la función svgToB64 ver docs de esa funcion para más detalles
 * @param svg
 * @param width
 * @param height
 * @returns
 */
export const svgToJPEG = (
  svgInput: SVGElement,
  width?: number,
  height?: number,
  quality = 0.9
): Promise<HTMLImageElement> => {
  const type = ImageType.jpeg;
  return svgToB64(svgInput, width, height, quality, type).then(loadImage);
};

export const roundImage = async (
  image: HTMLImageElement,
  borderRadius: number,
  quality: number = 1,
  strokeColor = 'transparent',
  strokeWidth: number = 0
): Promise<HTMLImageElement> => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d')!;
  const width = image.width - strokeWidth * 2;
  const height = image.height - strokeWidth * 2;
  const x = strokeWidth;
  const y = strokeWidth;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + width - borderRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
  ctx.lineTo(x + borderRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.closePath();
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(image, 0, 0);
  ctx.restore();
  const newImageSrc = canvasToB64(canvas, quality, ImageType.png);
  const newImage = await loadImage(newImageSrc);
  return newImage;
};
export const circularImage = async (
  image: HTMLImageElement,
  quality: number = 1,
  strokeColor = 'transparent',
  strokeWidth: number = 0
): Promise<HTMLImageElement> => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const minSize = Math.min(image.width, image.height);
  const size = minSize - strokeWidth * 2;
  const ctx = canvas.getContext('2d')!;
  const radius = size / 2;
  const x = minSize / 2;
  const y = minSize / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.clip();

  ctx.drawImage(image, 0, 0);
  ctx.restore();
  const newImageSrc = canvasToB64(canvas, quality, ImageType.png);
  const newImage = await loadImage(newImageSrc);
  return newImage;
};
