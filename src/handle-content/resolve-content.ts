import _ from "lodash";
import { IContent, IContentResolved } from "../interfaces/content";

export const resolveContent = (
    input: IContent,
    alreadyHandledContents: {[key: string]: IContentResolved} = {},
): IContentResolved => {
    if (input === undefined) {
        throw new ReferenceError("Could not resolve content: content is undefined");
    }
    const processedInput = _.cloneDeep(input);

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data).forEach((contentFieldIdentifier) => {
        const fieldValue = processedInput.data[contentFieldIdentifier].value;

        // array
        if (Array.isArray(fieldValue)) {
            processedInput.data[contentFieldIdentifier] = fieldValue.map((subContent) => {
                if (isContent(subContent)) {
                    return alreadyHandledContents[subContent.id] || resolveContent(subContent, alreadyHandledContents);
                } else {
                    return subContent;
                }
            });
        // object
        } else if (typeof fieldValue === "object") {
            if (isContent(fieldValue)) {
                processedInput.data[contentFieldIdentifier] =
                    alreadyHandledContents[fieldValue.id] || resolveContent(fieldValue, alreadyHandledContents);
            } else {
                processedInput.data[contentFieldIdentifier] = fieldValue;
            }
        } else {
            processedInput.data[contentFieldIdentifier] = fieldValue;
        }
    });
    return processedInput;
};

const isContent = (value: any) =>
    value.data !== undefined &&
    value.type !== undefined &&
    value.id !== undefined;
