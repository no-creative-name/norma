import { handleContent, deepGet, deepSet, deepRemove } from "./handle-content"

describe('handleContent', () => {
    test('throws an error when content input is undefined.', () => {
        expect(() => {handleContent(undefined, [{inputType: 'componentX'}])}).toThrow(Error);
    });
    test('renames all instances of a single content type if desired', () => {
        const input = {
            type: "a",
            data: {
                x: "",
                y: "",
                z: {
                    type: "a",
                    data: {}
                }
            }
        }
        const configs = [{
            inputType: 'a',
            outputType: 'b',
        }]
        const output = {
            type: "b",
            data: {
                x: "",
                y: "",
                z: {
                    type: "b",
                    data: {}
                }
            }
        }
        const result = handleContent(input, configs);
        expect(result).toMatchObject(output);
    });
})

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

describe('deepSet', () => {
    test('throws an error when object is undefined', () => {
        expect(() => deepSet(undefined, [''], '')).toThrow(Error);
    });
    test('throws an error when parameter array is undefined', () => {
        expect(() => deepSet({}, undefined, '')).toThrow(Error);
    });
    test('throws an error when value is undefined', () => {
        expect(() => deepSet({}, [''], undefined)).toThrow(Error);
    });
    test('throws error if parameter already exists', () => {
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
        expect(() => {deepSet(inputObject, ['a', 'b', 'c'], 'value')}).toThrow(Error);
    })
    test('returns extended array', () => {
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
        const outputObject = {
            a: {
                b: {
                    c:'',
                    f: {
                        g: 'value'
                    }
                },
                d: {
                    e: ''
                }
            }
        };
        const result = deepSet(inputObject, ['a', 'b', 'f', 'g'], 'value');
        expect(result).toMatchObject(outputObject);
    });
})

describe('deepRemove', () => {
    test('throws an error when object is undefined', () => {
        expect(() => deepRemove(undefined, [''])).toThrow(Error);
    });
    test('throws an error when parameter array is undefined', () => {
        expect(() => deepRemove({}, undefined)).toThrow(Error);
    });
    test('removes simple parameter in object', () => {
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
    test('removes object parameter in object', () => {
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