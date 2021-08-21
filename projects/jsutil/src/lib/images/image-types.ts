enum ImageResizeMode {
    portrait = 'portrait',
    landscape = 'landscape',
    percent = 'percent',
    auto = 'auto'
  }
  enum ImageType {
    jpeg = 'jpeg',
    png = 'png'
  }
  interface ImageDimensions {
    width: number;
    height: number;
  }
  
  export { ImageResizeMode, ImageType, ImageDimensions}