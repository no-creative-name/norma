import { deepRemove } from "./deep-remove";

describe('deepRemove', () => {
    test('throws an error when object is undefined', () => {
        expect(() => deepRemove(undefined, [''])).toThrow(Error);
    });
    test('throws an error when property array is undefined', () => {
        expect(() => deepRemove({}, undefined)).toThrow(Error);
    });
    test('removes simple property in object', () => {
        const inputObject = {
            a: {
                b: {
                    c:''
                },
                d: {
                    e: ''
                }
            }
        };
        const toRemove = ['a', 'b', 'c'];
        const result = deepRemove(inputObject, toRemove);
        expect(result).toMatchObject({
            a: {
                b: {
                },
                d: {
                    e: ''
                }
            }})
    });
    test('removes object property in object', () => {
        const inputObject = {
            a: {
                b: {
                    c:''
                },
                d: {
                    e: ''
                }
            }
        };
        const toRemove = ['a', 'b'];
        const result = deepRemove(inputObject, toRemove);
        expect(result).toMatchObject({
            a: {
                d: {
                    e: ''
                }
            }})
    });
})