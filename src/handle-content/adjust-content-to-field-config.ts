import _ from "lodash";
import { IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";

export const adjustContentToFieldConfig = (
    input: IContent,
    fieldConfig: IFieldConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContent => {
    if (input === undefined) {
        throw new ReferenceError(`Couldn't adjust input to fieldConfig: input is undefined`);
    }
    if (fieldConfig === undefined) {
        throw new ReferenceError(`Couldn't adjust ${JSON.stringify(input)} to fieldConfig: fieldConfig is undefined`);
    }
    const processedInput: IContent = _.cloneDeep(input);

    alreadyHandledContents[processedInput.id] = processedInput;

    // recursively find fields and convert content
    Object.keys(processedInput.data).forEach((contentFieldIdentifier) => {
        const fieldType = processedInput.data[contentFieldIdentifier].fieldType;
        const fieldValue = processedInput.data[contentFieldIdentifier].value;
        let newValue = fieldValue;

        // array
        if (Array.isArray(fieldValue)) {
            // if subcontents are contents to resolve
            if (isContent(fieldValue[0])) {
                newValue = fieldValue.map((subContent) => {
                    if (isContent(subContent)) {
                        return alreadyHandledContents[subContent.id] ||
                            adjustContentToFieldConfig(subContent, fieldConfig, alreadyHandledContents);
                    }
                    return subContent;
                });
            }
            // if array is field to be converted
            if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            }
        // object
        } else if (typeof fieldValue === "object") {
            // if object is another content to resolve
            if (isContent(fieldValue)) {
                newValue = alreadyHandledContents[fieldValue.id] ||
                    adjustContentToFieldConfig(fieldValue, fieldConfig, alreadyHandledContents);
            // if object is field to be converted
            } else if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            }
        } else {
            if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            }
        }
        if (newValue !== undefined) {
            processedInput.data[contentFieldIdentifier].value = newValue;
        }
    });
    return processedInput;
};

const isContent = (value: any) =>
    value.data !== undefined &&
    value.type !== undefined &&
    value.id !== undefined;

const applyValueConverter = (fieldValue: any, fieldConfig: IFieldConfig): any => {
    try {
        return fieldConfig.valueConverter(fieldValue);
    } catch (error) {
        throw new Error(`Couldn't convert value: ${error}`);
    }
};
