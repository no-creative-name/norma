import { deepSet } from "./deep-set";

describe("deepSet", () => {
    test("throws an error when object is undefined", () => {
        expect(() => deepSet(undefined, [""], "")).toThrow(Error);
    });
    test("throws an error when property array is undefined", () => {
        expect(() => deepSet({}, undefined, "")).toThrow(Error);
    });
    test("throws an error when value is undefined", () => {
        expect(() => deepSet({}, [""], undefined)).toThrow(Error);
    });
    test("warns user if property already exists", () => {
        const spy = jest.spyOn(global.console, "warn").mockImplementation();
        const inputObject = {
            a: {
                b: {
                    c: "",
                },
                d: {
                    e: "",
                },
            },
        };
        deepSet(inputObject, ["a", "b", "c"], "value");
        expect(console.warn).toHaveBeenCalled();
    });
    test("returns extended array", () => {
        const inputObject = {
            a: {
                b: {
                    c: "",
                },
                d: {
                    e: "",
                },
            },
        };
        const outputObject = {
            a: {
                b: {
                    c: "",
                    f: {
                        g: "value",
                    },
                },
                d: {
                    e: "",
                },
            },
        };
        const result = deepSet(inputObject, ["a", "b", "f", "g"], "value");
        expect(result).toMatchObject(outputObject);
    });
});
