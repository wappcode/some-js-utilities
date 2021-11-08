// PURE FUNCTIONS

export const removeTilde = (text: string): string => {
  const characters = [
    ['á', 'a'],
    ['é', 'e'],
    ['í', 'i'],
    ['ó', 'o'],
    ['ú', 'u'],
    ['Á', 'A'],
    ['É', 'E'],
    ['Í', 'I'],
    ['Ó', 'O'],
    ['Ú', 'U'],
    ['Ä', 'A'],
    ['Ë', 'E'],
    ['Ï', 'I'],
    ['Ö', 'O'],
    ['Ü', 'U'],
    ['ä', 'a'],
    ['ë', 'e'],
    ['ï', 'i'],
    ['ö', 'o'],
    ['ü', 'u'],
    ['ñ', 'n'],
    ['Ñ', 'N'],
  ];
  const result = characters.reduce(
    (accumulator, current) =>
      accumulator.replace(new RegExp(current[0], 'g'), current[1]),
    text
  );
  return result;
};
/**
 * Determina si el parametro es una cadena y esta vacía
 * @param text
 * @returns
 */
export const isEmptyString = (text: any): boolean =>
  typeof text === 'string' && text.trim().length < 1;
/**
 * Determina si el parametro es una cadena y no esta vacía
 * @param text
 * @returns
 */
export const isStringNotEmpty = (text: any): boolean =>
  typeof text === 'string' && text.trim().length > 0;

/**
 * Reemplaza los carácteres especiales acentos y simbolos
 * @param text
 * @param separator
 * @returns
 */
export const replaceSpecialChars = (text: string, separator: string) =>
  removeTilde(text).trim().replace(/\W/g, separator);

/**
 * Determina si una cadena esta includida en otra
 * Utiliza removeTilde y trim para dar formato a los textos antes de compararlos
 * @param text
 * @param subtext
 * @returns
 */
export const stringIncludesOmitTilde = (
  text: string,
  subtext: string
): boolean => {
  if (typeof text !== 'string' || typeof subtext !== 'string') {
    return false;
  }
  const textFormated = removeTilde(text.trim().toLowerCase());
  const subTextFormated = removeTilde(subtext.trim().toLowerCase());
  return textFormated.includes(subTextFormated);
};

// IMPURE FUNCTIONS
/**
 * Calcula el ancho que puede ocupar un texto en CSS pixels
 * @param text string
 * @param font opcional 'bold 16px Arial'
 */
export const textWidth = (text: string, font?: string): number => {
  let canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Invalid context');
  }
  if (typeof font === 'string' && font.length > 0) {
    context.font = font;
  }
  const textWidthValue = context.measureText(text).width;
  canvas.remove();
  return textWidthValue;
};
/**
 * Selecciona el contenido de un elemento html
 * Parecido a seleccionar elementos en el navegador arrastrando y soltando el mouse
 * @param element HTMLElement
 */
export const selectElementContent = (element: HTMLElement): void => {
  if (window.getSelection) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }
};
/**
 * Copia el texto en el porta papeles
 * @param text string
 */
export const copyTextToClipboard = (text: string): void => {
  // crea un elemento para textarea con el texto a copiar
  const element = document.createElement('textarea');
  element.value = text;
  element.readOnly = false;
  element.contentEditable = 'true';
  // Agrega estilos para que el elemento no se visible
  element.style.position = 'absolute';
  element.style.left = '-9999999px';
  // Agrega el elemento al documento
  document.body.appendChild(element);
  // Guarda la selección si es que hay del usuario
  const selection = document.getSelection();
  if (!selection) {
    throw new Error('No selection');
  }
  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  // Selecciona el contenido del textarea
  element.select();
  // Copia el contenido seleccionado en el portapapeles
  document.execCommand('copy');
  // Quita el elemento del documento
  document.body.removeChild(element);

  // Si habia selección por el usuario la restaura
  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
};
