export class StringUtilities {

  /**
   * Remueve las tildes ejemplo niño = nino, México = Mexico
   * @param text string
   * @deprecated use removeSpecialChars function instead
   */
  static removeTilde(text: string): string {
    try {
      text = text.replace(/á/g, 'a');
      text = text.replace(/é/g, 'e');
      text = text.replace(/í/g, 'i');
      text = text.replace(/ó/g, 'o');
      text = text.replace(/ú/g, 'u');
      text = text.replace(/Á/g, 'A');
      text = text.replace(/É/g, 'E');
      text = text.replace(/Í/g, 'I');
      text = text.replace(/Ó/g, 'O');
      text = text.replace(/Ú/g, 'U');
      text = text.replace(/Ä/g, 'A');
      text = text.replace(/Ë/g, 'E');
      text = text.replace(/Ï/g, 'I');
      text = text.replace(/Ö/g, 'O');
      text = text.replace(/Ü/g, 'U');
      text = text.replace(/ä/g, 'a');
      text = text.replace(/ë/g, 'e');
      text = text.replace(/ï/g, 'i');
      text = text.replace(/ö/g, 'o');
      text = text.replace(/ü/g, 'u');
      text = text.replace(/ñ/g, 'n');
      text = text.replace(/Ñ/g, 'Ñ');
      return text;
    } catch (ex) {
      return text;
    }

  }
  /**
   * Reemplaza los caracteres especiales por el caracter separador
   * @param text string
   * @param separator string
   * @deprecated use removeSpecialChars function instead
   */
  static removeSpecialChars(text: string, separator: string = '-') {
    try {
      text = text.trim();
      text = StringUtilities.removeTilde(text);
      text = text.replace(/\W/g, separator);
      return text;
    } catch (ex) {
      return text;
    }
  }
  /**
   * Calcula el ancho que puede ocupar un texto
   * @param text string
   * @param font opcional 'bold 16px Arial'
   * @deprecated use textWidth function instead
   */
  static textWidth(text: string, font?: string) {
    let a = document.createElement('canvas');
    const b = a.getContext('2d');
    if (typeof(font) === 'string' && font.length > 0) {
      b.font = font;
    }
    const textWidth = b.measureText(text).width;
    a = null;
    return textWidth;
  }

  /**
   * Copia el texto en el porta papeles
   * @param text string
   * @deprecated use copyToClipboard function instead
   */
  static copyToClipboard (text: string): void {
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
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    // Selecciona el contenido del textarea
    element.select();
    // Copia el contenido seleccionado en el portapapeles
    document.execCommand('copy');
    // Quita el elemento del documento
    document.body.removeChild(element);

    // Si habia selección por el usuario la restaura
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

  }
}
