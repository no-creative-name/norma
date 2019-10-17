import { ContentfulAdapter } from "./cms-adapter/contentful/contentful-adapter";

const adapter = new ContentfulAdapter({space: "zjrd7s7o2cec", accessToken:"llgJXPycQ8ey-VF-piNoqwinwOjgnX6DN44TmElwtXE"});
adapter.getNormalizedContentData("2L1YsXCiNcZhM10mCNnO26", 'de').then(data =>
    console.log(data));
