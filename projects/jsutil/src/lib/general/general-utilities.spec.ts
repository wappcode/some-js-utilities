import { isEmpty } from './general-utilities';

describe('Prueba funciones generales', () => {

    it('Prueba function isEmpty valores vacios', () => {
        const v1 = isEmpty(null);
        const v2 = isEmpty('') ;
        const v3 = isEmpty('    ') ;
        const v4 = isEmpty([]) ;
        const v5 = isEmpty({});
        const v6 = isEmpty(undefined);
        const areEmpty = (v1 && v2 && v3 && v4 && v5 && v6);
        expect(areEmpty).toBe(true);
    } )
    it('Prueba function isEmpty valores no vacios', () => {
        const v1 = !isEmpty(1);
        const v2 = !isEmpty('hola') ;
        const v3 = !isEmpty('  d  ') ;
        const v4 = !isEmpty([1]) ;
        const v5 = !isEmpty({a: 1});
        const areEmpty = (v1 && v2 && v3 && v4 && v5);
        expect(areEmpty).toBe(true);
    } )
});