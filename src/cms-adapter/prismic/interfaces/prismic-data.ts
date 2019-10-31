export interface IPrismicData {
    alternate_languages: IAlternateLanguage[];
    data: any;
    first_publication_date: string;
    href: string;
    id: string;
    lang: string;
    last_publication_date: string;
    linked_documents: any[];
    slugs: string[];
    tags: any[];
    type: string;
    uid: string;
}

interface IAlternateLanguage {
    id: string;
    type: string;
    lang: string;
}
