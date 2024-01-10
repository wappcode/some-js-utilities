# SomeJsUtilities

Este proyecto incluye funciones de uso común para trabajar con imagenes, textos, colores entre otros.

Algunas funciones solo estan disponibles para el navegador.

## Funciones para el manejo de imágenes

### canvasToB64

Convierte un canvas en una cadena Base64 para ser usada como imagen

    (canvas, quality, type) => string

- canvas: Objeto canvas a convertir
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type: (opcional) Tipo de imagen que se genera. ('jpg', 'png')

### imageToB64

Convierte un canvas en una cadena Base64 para ser usada como imagen

    (image, quality, type) => string

- image: Objeto Image a convertir
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type: (opcional) Tipo de imagen que se genera. ('jpg', 'png')

### loadImage

Realiza la precarga de una imagen. Retorna una promesa con la imagen

    (src) => Promise<HTMLImageElement>

- src: URL de la imagen

### calculateDimensions

Calcula las nuevas dimensiones de la imagen al cambiar el valor de ancho o el alto dependiendo del modo a redimensionar

    (image, size, resizeMode) => {width, height}

- image: La imagen con la que se van a calcular los nuevos valores
- size: El nuevo tamaño de la imagen
- resizeMode: La forma en que se va a redimencionar. Los valores permitidos son

  - 'portrait' : Asigna el valor de size al alto de la imagen y redimenciona el ancho proporcionalmente
  - 'landscape': Asigna el valor de size al ancho de la imagen y redimenciona el alto proporcionalmente
  - 'percent': Aplica el valor de size como porcentaje del ancho y alto
  - 'auto': Asigna el valor de size al lado mas grande de la imagen y redimenciona el otro proporcionalmente

### scaleImage

Genera una nueva imagen aplicandole la escala.
El peso en bytes y calidad cambian.

     (image, size, resizeMode, quality, type) => Promise<HTMLImageElement>

- image: La imagen con la que se van a calcular los nuevos valores
- size: El nuevo tamaño de la imagen
- quality: (opcional) Calidad o compresión. Valor numérico de 0 a 1
- type: (opcional) Tipo de imagen que se genera. ('jpg', 'png')
- resizeMode: Utiliza los mismos valores que la función calculateDimensions

### createSVGElement

Convierte una cadena que representa un svg en un SVGElement
Retorna null si la cadena no corresponde con un elmento svg

    (input) => SVGElement | null

### svgToB64

Convierte un elemento svg en una cadena Base64

    (svgInput, width, height, quality, type) => Promise<string>

- svgInput: Elmento SVG
- width: (opcional) ancho de la imagen
- heigth: (opcional) alto de la imagen
- quality: (opcional) calidad de la imagen
- type: (opcional) Tipo de imagen que se genera. ('jpg', 'png')

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

Los parámetros width y height actualizan los atributos width and height de una copia del elemento svg para después generar la imagen en base a esa copia. El elemento svg original no es modificado.

### svgToPNG

Convierte un elemento svg en una imagen PNG
Utiliza de forma interna la función svgToB64. Ver docs de esa funcion para más detalles

    (svgInput, width, heigth, quality) => Promise<HTMLImageElement>

- svgInput: Elmento SVG
- width: (opcional) ancho de la imagen
- heigth: (opcional) alto de la imagen
- quality: (opcional) calidad de la imagen

El atributo src de la imagen generada es una cadena base64.

Los parámetros width y height actualizan los atributos width and height de una copia del elemento svg para después generar la imagen en base a esa copia. El elemento svg original no es modificado.

### svgToJPEG

Convierte un elemento svg en una imagen JPEG
Utiliza de forma interna la función svgToB64. Ver docs de esa funcion para más detalles

    (svgInput, width, heigth, quality) => Promise<HTMLImageElement>

- svgInput: Elmento SVG
- width: (opcional) ancho de la imagen
- heigth: (opcional) alto de la imagen
- quality: (opcional) calidad de la imagen

El atributo src de la imagen generada es una cadena base64.

Los parámetros width y height actualizan los atributos width and height de una copia del elemento svg para después generar la imagen en base a esa copia. El elemento svg original no es modificado.

### roundImage

Redondea las esquinas de una imagen

- image: Elemento HTML Image
- borderRadius: (opcional) radio del borde
- quality: (opcional) calidad de la imagen
- strokeColor = (opcional) color del borde,
- strokeWidth: (opcional) tamaño del borde

### circularImage

Crea una imagen circular

- image: Elemento HTML Image
- quality: (opcional) calidad de la imagen
- strokeColor = (opcional) color del borde,
- strokeWidth: (opcional) tamaño del borde

### pixelToMM

Convierte valores de pixeles a milímetros

    (pixels) => number

- pixels: Valor numérico

### pixelToPT

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

Ejemplos:

    removeTilde('niño'); // nino
    removeTilde('México'); // Mexico

### replaceSpecialChars

Reemplaza los carácteres especiales acentos, simbolos y espacios. Util para textos en español. Utiliza de forma interna la funcion removeTilde

    (text, separator) => string

Ejemplos:

    replaceSpecialChars('¿El niño se comió un dulce?','-');
    // -El-nino-se-comio-un-dulce-

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

Selecciona el contenido de un elemento html. Simula el seleccionar elementos en el navegador arrastrando y soltando el mouse

(element) => void

- element: Elemento HTML

### copyTextToClipboard

Copia el texto en el porta papeles

    (text) => void

- text: Texto a copiar

## Funciones para colores

### rgbToHex

Convierte un color rgb a su representacion hexadecimal

    (rgbColor,addPrefix) => string

- rgbColor: Objecto con las propiedades {red: number, green: number, blue: number}
- addPrefix: Boolean que indica si se agrega el prefijo "#"

### hexToRgb

Convierte un color hexadecimal en un objecto ColorRGB

    (hexaColor) => ColorRGB ({red, green, blue})

    hexToRgb('#FF0000'); // {red: 255, green: 0, blue: 0}

- hexaColor: Cadena que representa el color hexadecimal (#FF0000)

## Funciones para manejo de URLs

### objectToURLParam

Convierte un objeto javascript en una cadena para enviar en una url
(plainObject) => string

    objectToURLParam({param1: 'p1', param2: 'p2'}); // 'param1=p1&param2=p2'

- plainObject: Objeto plano javascript

## Funciones de Fecha

### calculateElapsedPeriod

Calcula el periodo transcurrido entre dos fechas el resultado se divide en años, meses, días, horas, minutos y segundos.

IMPORTANTE: El cálculo no es exacto se considera el promedio de días de los meses para realizarlo.

    (start: Date, end: Date) => {years, months,days,hours,minutes,seconds}

- start: Fecha inicial tipo Date
- end: Fecha final tipo Date

### formatPeriodYearsLocaleES

Crea una cadena en español indicando los años transcurridos. Retorna una cadena vacia si el valor de años del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodMonthsLocaleES

Crea una cadena en español indicando los meses transcurridos. Retorna una cadena vacia si el valor de meses del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodDaysLocaleES

Crea una cadena en español indicando los días transcurridos. Retorna una cadena vacia si el valor de días del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodHoursLocaleES

Crea una cadena en español indicando las horas transcurridas. Retorna una cadena vacia si el valor de horas del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodMinutesLocaleES

Crea una cadena en español indicando los minutos transcurridos. Retorna una cadena vacia si el valor de minutos del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodSecondsLocaleES

Crea una cadena en español indicando los segundos transcurridos. Retorna una cadena vacia si el valor de segundos del periodo es menor o igual a cero

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}

### formatPeriodLocaleES

Crea una cadena en español indicando el tiempo transcurrido. Puede retornar una cadena vacía.

    (period: {years, months,days,hours,minutes,seconds}) => string

- period: Objeto con los valores del periodo {years, months,days,hours,minutes,seconds}
- level: (opcional) El nivel de los datos que se deben mostrar, los valores permitidos son:
  - 1 Retorna una cadena con solo los años
  - 2 Retorna una cadena con los años y meses
  - 3 Retorna una cadena con los años, meses y días (predeterminado)
  - 4 Retorna una cadena con los años, meses, días y horas
  - 5 Retorna una cadena con los años, meses, dias, horas y minutos
  - 6 Retorna una cadena con los años, meses, dias, horas, minutos y segundos

## Funciones generales

### isEmpty

Determina si una variable esta vacía

    (var) => boolean

    isEmpty(' '); // true
    isEmpty(null); // true
    isEmpty([]); // true
    isEmpty({}); // true
    isEmpty(undefined); // true
    isEmpty('Hello'); // false

### isPlainObject

Determina si un objeto es un objeto javascript simple (Plain Object)

### objectToBlob

Convierte un objeto JSON en un tipo Blob

```
    (data,type)=> Blob
    objectToBlob({"a":1,"b":2})
    objectToBlob({"a":1,"b":2},"application/json")
```

### objectToResponse

Convierte un objeto JSON en un tipo Response (util para simular el resultado de una consulta fetch)

```
    (data,status,statusText,type)=> Response
    objectToResponse({"a":1,"b":2})
    objectToResponse({"a":1,"b":2},200,"Ok","application/json")

```
