import { IContentConfig, IFieldConfig } from "../interfaces/adapter-config";
import { IContent, IContentDataResolved, IContentResolved } from "../interfaces/content";
import { ContentHandler } from "./content-handler";
import { deepGet, deepGetFromFields } from "./object-processing/deep-get";
import { deepRemove, deepRemoveFromFields } from "./object-processing/deep-remove";
import { deepSet, deepSetToFields } from "./object-processing/deep-set";

export const handleContent: ContentHandler = (
    content: IContent,
    contentConfigs?: IContentConfig[],
    fieldConfigs?: IFieldConfig[],
): IContent => {
    if (!content) {
        throw new Error("Couldn't handle content: Input content is undefined.");
    }

    let handledContent = Object.assign({}, content);

    if (contentConfigs) {
        contentConfigs.forEach((contentConfig) => {
            handledContent = adjustContentToContentConfig(handledContent, contentConfig);
        });
    }

    let handledContent2 = Object.assign({}, handledContent);

    if (fieldConfigs) {
        fieldConfigs.forEach((fieldConfig) => {
            handledContent2 = adjustContentToFieldConfig(handledContent2, fieldConfig);
        });
    }

    return handledContent;
};

export const adjustContentToContentConfig = (
    input: IContent,
    contentConfig: IContentConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContentResolved => {
    const processedInput: IContent = Object.assign({}, input);

    if (processedInput.type === contentConfig.inputType && contentConfig.propertyAdjustments) {
        contentConfig.propertyAdjustments.map((propertyAdjustment) => {
            let value;
            const seperatedInputIdentifier = propertyAdjustment.inputIdentifier.split(".");
            const seperatedOutputIdentifier =
                propertyAdjustment.outputIdentifier ? propertyAdjustment.outputIdentifier.split(".") : undefined;

            value = deepGetFromFields(processedInput.data, seperatedInputIdentifier);

            processedInput.data = deepRemoveFromFields(processedInput.data, [propertyAdjustment.inputIdentifier]);

            if (propertyAdjustment.valueConverter) {
                try {
                    value = propertyAdjustment.valueConverter(value);
                } catch (error) {
                    throw new Error(`Couldn't convert value: ${error}`);
                }
                if (value === undefined) {
                    throw new TypeError(`Value converter for ${propertyAdjustment.inputIdentifier} returned undefined`);
                }
            }

            processedInput.data = deepSetToFields(
                processedInput.data,
                seperatedOutputIdentifier || seperatedInputIdentifier,
                value,
            );
        });
    }

    const output: IContentResolved = {
        data: {},
        id: "",
        type: "",
    };

    if (!processedInput.data || !processedInput.type) {
        return processedInput;
    }

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data || {}).forEach((key) => {
        if (Array.isArray(processedInput.data[key].value)) {
            output.data[key] =
                alreadyHandledContents[processedInput.data[key].value.id] ||
                processedInput.data[key].value.map(
                    (prop) => adjustContentToContentConfig(prop, contentConfig, alreadyHandledContents),
                );
        } else if (typeof processedInput.data[key].value === "object") {
            output.data[key] =
                alreadyHandledContents[processedInput.data[key].value.id] ||
                adjustContentToContentConfig(processedInput.data[key].value, contentConfig, alreadyHandledContents);
        } else {
            output.data[key] = processedInput.data[key].value;
        }
    });

    if (processedInput.type) {
        if (processedInput.type === contentConfig.inputType && contentConfig.outputType) {
            output.type = contentConfig.outputType;
        } else {
            output.type = processedInput.type;
        }
    }
    if (processedInput.id) {
        output.id = processedInput.id;
    }
    return output;
};

export const adjustContentToFieldConfig = (
    input: IContent,
    fieldConfig: IFieldConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContentResolved => {
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
        // string or number
        } else {
            if (fieldType === fieldConfig.fieldIdentifier) {
                try {
                    newValue = fieldConfig.valueConverter(fieldValue);
                } catch (error) {
                    throw new Error(`Couldn't convert value: ${error}`);
                }
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
