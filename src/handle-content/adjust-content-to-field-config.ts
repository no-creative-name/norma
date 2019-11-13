import { IFieldConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";
import { IContentResolved } from "../interfaces/content";

export const adjustContentToFieldConfig = (
    input: IContentResolved,
    fieldConfig: IFieldConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContentResolved => {
    if (input === undefined) {
        throw new ReferenceError(`Couldn't adjust input to fieldConfig: input is undefined`);
    }
    if (fieldConfig === undefined) {
        throw new ReferenceError(`Couldn't adjust ${JSON.stringify(input)} to fieldConfig: fieldConfig is undefined`);
    }
    const _ = require("lodash");

    const processedInput: IContent = _.cloneDeep(input);

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data).forEach((contentFieldIdentifier) => {
        const fieldType = processedInput.data[contentFieldIdentifier].fieldType;
        const fieldValue = processedInput.data[contentFieldIdentifier].value;
        let newValue;

        // array
        if (Array.isArray(fieldValue)) {
            // if subcontents are fields to resolve
            if (isContent(fieldValue[0])) {
                newValue = fieldValue.map((subContent) => {
                    if (isContent(subContent)) {
                        return alreadyHandledContents[subContent.id] ||
                            adjustContentToFieldConfig(subContent, fieldConfig, alreadyHandledContents);
                    }
                    return subContent;
                });
            } else {
                newValue = fieldValue;
            }
            if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            }
        // object
        } else if (typeof fieldValue === "object") {
            if (isContent(fieldValue)) {
                newValue = alreadyHandledContents[fieldValue.id] ||
                    adjustContentToFieldConfig(fieldValue, fieldConfig, alreadyHandledContents);
            } else if (fieldValue.fieldType !== undefined && fieldValue.fieldType === fieldConfig.fieldIdentifier) {
                try {
                    newValue = fieldConfig.valueConverter(fieldValue.value);
                } catch (error) {
                    throw new Error(`Couldn't convert value: ${error}`);
                }
            } else if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            } else {
                newValue = fieldValue;
            }
        } else {
            if (fieldType === fieldConfig.fieldIdentifier) {
                newValue = applyValueConverter(fieldValue, fieldConfig);
            } else {
                newValue = fieldValue;
            }
        }
        if (newValue !== undefined) {
            processedInput.data[contentFieldIdentifier] = newValue;
            
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
