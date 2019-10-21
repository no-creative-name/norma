import { deepGet } from "./deep-get";

describe('deepGet', () => {
    test('throws an error when object is undefined', () => {
        expect(() => deepGet(undefined, [''])).toThrow(Error);
    });
    test('throws an error when parameter array is undefined', () => {
        expect(() => deepGet({}, undefined)).toThrow(Error);
    });
    test('returns undefined when parameter is not found', () => {
        const result = deepGet({
            a: {
                b: {
                    c:''
                },
                d: {
                    e: ''
                }
            }}, ['a', 'b', 'e']);
        expect(result).toBe(undefined);
    });
    test('gets a value by an array of strings', () => {
        const result = deepGet({
            a: {
                b: {
                    c: 'value'
                },
                d: {
                    e: ''
                }
            }}, ['a', 'b', 'c']);
        expect(result).toBe('value');
    });
})