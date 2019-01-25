<<<<<<< HEAD
# SomeJsUtilities

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Descripción

Este proyecto incluye librerias y métodos de uso común para la manipulación de cadenas e imágenes

## ImageUtilities

Libreria con métodos estáticos para el manejo de imágenes

## Métodos

 pixel2MM
    Convierte valores de pixeles a milímetros
    parametro pixeles valor numérico
     
B64
     Convierte una imagen en una cadena Base64
     parametro image objeto HTML
     parametro quality 0 to 1 valor numerico entre 0 y 1 calidad de la imagen
     parametro type  valor de texto png, jpg
     
canvasToB64

    Convierte un canvas en una cadena Base64 que represent una imagen
     parametro canvas Objeto HTML
     parametro quality 0 to 1 valor numerico entre 0 y 1 calidad de la imagen
     parametro type  valor de texto png, jpg
load


     Realiza la precarga de una imagen
     parametro str url de la imagen
     retorno Promise con elemento Imagen HTML    

scale
    
     Redimensiona una imagen
     parametro image objeto HTML
     parametro size valor numérico en pixeles
     parametro mode valor tipo texto valores permitidos portrait tipo retrato vertical, landscape tipo paisaje horizontal, porcentaje
     parametro output valor tipo texto especifica el formato de salida de la imagen valores permitidos string B64 ó object HTML
     parametro quality 0 to 1 valor numerico entre 0 y 1 calidad de la imagen
     parametro type  valor de texto png, jpg
=======
# some-js-utilities
Librerías y métodos javascript de uso común
>>>>>>> aff124ca72db2b323bca54f262659cfe6377fb27
