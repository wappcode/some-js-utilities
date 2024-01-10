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
