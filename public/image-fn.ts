import { circularImage, loadImage, roundImage } from '../src/image-utilities';

const processRoundImage = async () => {
  const image = await loadImage('images/test-image.png');
  // const roundedImg = await roundImage(image,50);
  const roundedImg = await roundImage(image, 100, 1, '#ff0000', 40);
  const imgElement = document.querySelector(
    '.round-img-modified'
  ) as HTMLImageElement;
  if (!imgElement) {
    return;
  }
  imgElement.src = roundedImg.src;
};
const processCircularImage = async () => {
  const image = await loadImage('images/test-image.png');
  // const roundedImg = await roundImage(image,50);
  const roundedImg = await circularImage(image, 1, '#ff0000', 40);
  const imgElement = document.querySelector(
    '.circular-img-modified'
  ) as HTMLImageElement;
  if (!imgElement) {
    return;
  }
  imgElement.src = roundedImg.src;
};

window.addEventListener('load', () => {
  try {
    processRoundImage();
    processCircularImage();
  } catch (e) {}
});
