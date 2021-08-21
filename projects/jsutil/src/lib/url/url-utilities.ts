/**
 * Convierte un objeto en una cadena de parámetros para una URL
 * @param _object
 */
const objectToURLParam = (plainObect: { [key: string]: any }): string => {
  const result = Object.entries(plainObect)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return result;
};
export { objectToURLParam };
