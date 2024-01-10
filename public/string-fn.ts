import { removeTilde } from '../src/string-utilities';

const processRmoveTilde = () => {
  const element = document.querySelector('#remove-tilde')!;
  const text = 'El niño juega en el parque';
  const textResult = removeTilde(text);
  const title = element.querySelector('.value')!;
  title.textContent = `Texto: ${text}`;
  const result = element.querySelector('.result')!;
  result.textContent = `Resultado: ${textResult}`;
};

window.addEventListener('load', () => {
  console.log('string function');
  try {
    processRmoveTilde();
  } catch (e) {
    console.log(e);
  }
});
