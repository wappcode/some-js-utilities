import { Sju } from './sju-object';

describe('StringFnUtilities', () => {
  it('testing remplazo de acentos desde objeto global', () => {
      const source = 'El niño se comió un dulce';
      const result = Sju.removeTilde(source);
      expect(result).toEqual('El nino se comio un dulce');
  });
  it('testing quitar carácteres especiales desde objeto global', () => {
      const source = '¿El niño se comió un dulce?';
      const result = Sju.removeSpecialChars(source, '-');
      expect(result).toEqual('-El-nino-se-comio-un-dulce-');
  });

});
