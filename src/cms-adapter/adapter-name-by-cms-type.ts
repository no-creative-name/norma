import { ContentfulAdapter } from "./contentful/contentful-adapter";
import { PrismicAdapter } from "./prismic/prismic-adapter";

export const adapterNameByCmsType = {
    contentful: ContentfulAdapter,
    prismic: PrismicAdapter,
};
