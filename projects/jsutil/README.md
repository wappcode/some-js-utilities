# SomeJsUtilities

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version inicial 7.1.3. versión actualizada 12.2.2

## Descripción

Este proyecto incluye funciones de uso común para trabajar con imagenes, textos, colores, etc.

Algunas funciones solo estan disponibles para el navegador.


## Funciones para el manejo de imágenes

### canvasToB64 
Convierte un canvas en una cadena Base64 para ser usada como imagen
     
    (canvas, quality, type) => string

- canvas: Objeto canvas a convertir
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type:  (opcional) Tipo de imagen que se genera. ('jpg', 'png')
    
### imageToB64 
Convierte un canvas en una cadena Base64 para ser usada como imagen
     
    (image, quality, type) => string

- image: Objeto Image a convertir
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type:  (opcional) Tipo de imagen que se genera. ('jpg', 'png')


### loadImage
Realiza la precarga de una imagen. Retorna una promesa con la imagen

    (src) => Promise<HTMLImageElement>

- src: URL o Ubicación de la imagen


### calculateDimensions
Calcula las nuevas dimensiones de la imagen al cambiar el valor de ancho o el alto dependiendo del modo a redimensionar

    (image, size, resizeMode) => {width, height}

- image: La imagen con la que se van a calcular los nuevos valores
- size: El nuevo tamaño de la imagen
- resizeMode: La forma en que se va a redimencionar. Los valores permitidos son 
 
  - 'portrait' : Asigna el valor de size al alto de la imagen y redimenciona el ancho proporcionalmente
  - 'landscape': Asigna el valor de size al ancho de la imagen y redimenciona el alto proporcionalmente
  - 'percent':  Aplica el valor de size como porcentaje del ancho y alto
  - 'auto': Asigna el valor de size al lado mas grande de la imagen y redimenciona el otro proporcionalmente


 ### scaleImage
 Genera una nueva imagen aplicandole la escala.
 El peso en bytes y calidad cambian.
 
     (image, size, resizeMode, quality, type) => Promise<HTMLImageElement> 
     
- image: La imagen con la que se van a calcular los nuevos valores
- size: El nuevo tamaño de la imagen
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type:  (opcional) Tipo de imagen que se genera. ('jpg', 'png')
- resizeMode: Utiliza los mismos valores que la función calculateDimensions


### createSVGElement
Convierte una cadena que representa un svg en un SVGElement
Retorna null si la cadena no corresponde con un elmento svg

    (input) => SVGElement | null


### svgToB64
Convierte un elemento svg en una cadena Base64

    (svgInput, width, height) => Promise<string> 

- svgInput: Elmento SVG
- width: Opcional
- Heigth: Opcional

Para objetos foreignObject es necesario agregar un elemento hijo como root y asignarle el atributo xmlns="http://www.w3.org/1999/xhtml 
 
 Por ejemplo: 
     
    <svg  #svgElement xmlns="http://www.w3.org/2000/svg">
     <rect x="0" y="0" width="150" height="150" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />
     <foreignObject x="10" y="10" width="140" height="140">
       <div xmlns="http://www.w3.org/1999/xhtml">
         <strong style="color: red">Hello World!</strong>
       </div>
     </foreignObject>
     </svg>

### pixelToMM 
Convierte valores de pixeles a milímetros
     
    (pixels) => number
    
 - pixels: Valor numérico
### pixelToMM 
Convierte valores de pixeles a puntos
     
    (pixels) => number
    
- pixels: Valor numérico

## Funciones para el manejo de texto

### isEmptyString
Determina si un valor es de tipo texto y esta vacío

    (text) => boolean

Ejemplos:

    isEmptyString(''); // true
    isEmptyString('   '); // true
    isEmptyString(' Hello  '); // false
    isEmptyString(null); // false
    isEmptyString(0); // false

### removeTilde
Remueve los acentos, diéresis y ñ de una cadena.
Su utilidad es para textos en español.

    (text) => string

### replaceSpecialChars
Reemplaza los carácteres especiales acentos y simbolos. Util para textos en español.

    (text, separator) => string

- text: String a procesar
- separator: Caracter por el que se va a reemplazar los carácteres que no son alfanuméricos
### stringIncludesOmitTilde
Determina si una cadena esta includida en otra. Util para comparar textos en español. Utiliza removeTilde y trim para dar formato a los textos antes de compararlos.

    (text, subtext) => boolean

- text: Cadena a comparar
- subtext: Cadena para buscar

### textWidth
Calcula el ancho que puede ocupar un texto en CSS pixels

    (text, font) => number

- text: Texto a procesar
- font: Cadena que representa los estilos de letra ('bold 48px serif')

### selectElementContent
Selecciona el contenido de un elemento html. Parecido a seleccionar elementos en el navegador arrastrando y soltando el mouse

(element) => void

- element: Elemento HTML
### copyTextToClipboard
Copia el texto en el porta papeles

    (text) => void

- text: Texto a copiar