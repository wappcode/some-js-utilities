import {
  isEmptyString,
  removeTilde,
  replaceSpecialChars,
} from '../src/string-utilities';

describe('StringFnUtilities', () => {
  it('testing remplazo de acentos', () => {
    const source = 'El niño se comió un dulce';
    const result = removeTilde(source);
    expect(result).toEqual('El nino se comio un dulce');
  });
  it('testing quitar carácteres especiales', () => {
    const source = '¿El niño se comió un dulce?';
    const result = replaceSpecialChars(source, '-');
    expect(result).toEqual('-El-nino-se-comio-un-dulce-');
  });
  it('testing Ñ uppercase', () => {
    const source = 'FERNANDO CASTAÑEDA';
    const result = removeTilde(source);
    expect(result).toEqual('FERNANDO CASTANEDA');
  });
  it('testing no es un string vacío', () => {
    const stringNull = !isEmptyString(null);
    const numberEmpty = !isEmptyString(0);
    const stringUndefined = !isEmptyString(undefined);
    const stringArray = !isEmptyString([]);
    const stringNoEmpty = !isEmptyString(' abcd ');
    const allEmpty =
      stringNull &&
      numberEmpty &&
      stringUndefined &&
      stringArray &&
      stringNoEmpty;
    expect(allEmpty).toBe(true);
  });
  it('testing es un string vacío', () => {
    const stringEmpty = isEmptyString('');
    const stringEmptyWithSpaces = isEmptyString('   ');
    const allEmpty = stringEmpty && stringEmptyWithSpaces;
    expect(allEmpty).toBe(true);
  });
});
