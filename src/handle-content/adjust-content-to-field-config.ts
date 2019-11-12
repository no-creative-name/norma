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

    const processedInput: IContent = Object.assign({}, input);

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data).forEach((contentFieldIdentifier) => {
        const fieldType = processedInput.data[contentFieldIdentifier].fieldType;
        const fieldValue = processedInput.data[contentFieldIdentifier].value;
        let newValue;

        // array
        if (Array.isArray(fieldValue)) {
            newValue = fieldValue.map((subContent) => {
                // if subcontent is another field to resolve
                if (subContent.value && isContent(subContent.value)) {
                    return alreadyHandledContents[subContent.value.id] ||
                        adjustContentToFieldConfig(subContent.value, fieldConfig, alreadyHandledContents);
                }
                return subContent;
            });
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
            }
        }
        if (fieldType === fieldConfig.fieldIdentifier) {
            try {
                newValue = fieldConfig.valueConverter(fieldValue);
            } catch (error) {
                throw new Error(`Couldn't convert value: ${error}`);
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
