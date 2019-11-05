import { ContentfulAdapter } from "norma-connect-contentful";
import { PrismicAdapter } from "./prismic/prismic-adapter";

export const adapterNameByCmsType = {
    contentful: ContentfulAdapter,
    prismic: PrismicAdapter,
};
