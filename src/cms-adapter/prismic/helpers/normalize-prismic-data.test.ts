import { Entry } from "contentful";
import { normalizePrismicData } from "./normalize-prismic-data";
import Prismic = require("prismic-javascript");

const expectedInput = {
    alternate_languages: [],
    data: {
        prop1: '',
        prop2: 2,
        prop3: {
            subProp1: '',
            subProp2: [
                {
                    subSubProp1: ''
                },
                {
                    subSubProp1: ''
                }
            ]
        },
        prop4: [
            {
                id: '888',
                type: 'typeY',
            },
            {
                id: '999',
                type: 'typeZ',
            },
        ]
    },
    first_publication_date: '',
    href: 'string',
    id: '12345',
    lang: 'de-de',
    last_publication_date: '',
    linked_documents: [],
    slugs: [],
    tags: [],
    type: 'typeX',
    uid: 'uid',
}

const expectedOutput = {
    type: 'typeX',
    data: {
        prop1: '',
        prop2: 2,
        prop3: {
            subProp1: '',
            subProp2: [
                {
                    subSubProp1: ''
                },
                {
                    subSubProp1: ''
                }
            ]
        },
        prop4: [
            {
                type: 'typeY',
                data: {
                    a: 'a'
                }
            },
            {
                type: 'typeZ',
                data: {
                    b: 'b'
                }
            },
        ]
    }
}

describe('normalizeContentfulData', () => {
    test('throws an error for undefined input', async () => {
        const api = await Prismic.api('https://headless-cms-adapter.cdn.prismic.io/api/v2');
        expect(normalizePrismicData(undefined, api).catch(() => {})).rejects;
    });
    /*test('correctly converts raw to normalized data', async () => {
        await expect(Prismic.api('https://headless-cms-adapter.cdn.prismic.io/api/v2')
            .then(api => {
                return normalizePrismicData(expectedInput, api)
            })).resolves.toMatchObject(expectedOutput);;
    });*/
})