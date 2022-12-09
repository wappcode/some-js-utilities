import { isEmpty, isPlainObject } from './general-utilities';

describe('Prueba funciones generales', () => {

    it('Prueba function isEmpty valores vacios', () => {
        const v1 = isEmpty(null);
        const v2 = isEmpty('') ;
        const v3 = isEmpty('    ') ;
        const v4 = isEmpty([]) ;
        const v5 = isEmpty({});
        const v6 = isEmpty(undefined);
        console.log(v1,v2,v3,v4,v5,v6)
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

    it('Prueba function isEmpty con fechas', () => {
        const date = new Date();
        const isEmptyDate = isEmpty(date);
        expect(isEmptyDate).toBe(false);
    })
    it('Prueba function isEmpty con clases', () => {
        class Obj{};
        const instance = new Obj;
        const isEmptyDate = isEmpty(instance);
        expect(isEmptyDate).toBe(false);
    })

    it('Test function valid plain objects', () => {
        const object1 = {a:1};
        const object2 = {};
        const object3 = new Object();
        const allPlain = isPlainObject(object1) && isPlainObject(object2) && isPlainObject(object3);
        expect(allPlain).toBe(true);
    })
    it('Test function no plain objects class instance ', () => {
        class Obj {}
        const instance = new Obj();
        const allPlain = isPlainObject(instance);
        expect(allPlain).toBe(false);
    })
    it('Test function no plain objects (date) ', () => {
        const instance = new Date();
        const allPlain = isPlainObject(instance);
        expect(allPlain).toBe(false);
    })
    it('Test function no plain objects (date) ', () => {
        const Obj = function( ){
        };
        const instance = new (Obj as any)();
        const allPlain = isPlainObject(instance);
        expect(allPlain).toBe(false);
    })
});