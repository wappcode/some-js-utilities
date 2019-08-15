import { removeTilde, removeSpecialChars } from './string-fn-utilities';

describe('StringFnUtilities', () => {
  it('testing remplazo de acentos', () => {
      const source = 'El niño se comió un dulce';
      const result = removeTilde(source);
      expect(result).toEqual('El nino se comio un dulce');
  });
  it('testing quitar carácteres especiales', () => {
      const source = '¿El niño se comió un dulce?';
      const result = removeSpecialChars(source, '-');
      expect(result).toEqual('-El-nino-se-comio-un-dulce-');
  });
  it('testing Ñ uppercase', () => {
      const source = 'FERNANDO CASTAÑEDA';
      const result = removeTilde(source);
      expect(result).toEqual('FERNANDO CASTANEDA');
  });

});
