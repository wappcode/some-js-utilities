/**
 * Convierte un objeto en una cadena de parámetros para una URL
 * @param _object
 */
export const objectToURLParam = (plainObect: { [key: string]: unknown }): string => {
  const result = Object.entries(plainObect)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return result;
};
