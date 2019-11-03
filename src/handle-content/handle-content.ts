import { IContentConfig } from "../interfaces/adapter-config";
import { IContent } from "../interfaces/content";
import { ContentHandler } from "./content-handler";
import { deepGet } from "./object-processing/deep-get";
import { deepRemove } from "./object-processing/deep-remove";
import { deepSet } from "./object-processing/deep-set";

export const handleContent: ContentHandler = (content: IContent, contentConfigs: IContentConfig[]): IContent => {
    if (!content || !contentConfigs) {
        throw new Error("Input is invalid.");
    }

    let handledContent = Object.assign({}, content);

    contentConfigs.forEach((contentConfig) => {
        handledContent = adjustContentToConfig(handledContent, contentConfig);
    });

    return handledContent;
};

export const adjustContentToConfig = (
    input: IContent,
    contentConfig: IContentConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContent => {
    const processedInput: IContent = Object.assign({}, input);

    if (processedInput.type === contentConfig.inputType && contentConfig.propertyAdjustments) {
        contentConfig.propertyAdjustments.map((propertyAdjustment) => {
            let value;
            if (Array.isArray(propertyAdjustment.inputIdentifier)) {
                value = deepGet(processedInput.data, propertyAdjustment.inputIdentifier);
                processedInput.data = deepRemove(processedInput.data, propertyAdjustment.inputIdentifier);
            } else {
                value = deepGet(processedInput.data, [propertyAdjustment.inputIdentifier]);
                processedInput.data = deepRemove(processedInput.data, [propertyAdjustment.inputIdentifier]);
            }

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

            if (propertyAdjustment.outputIdentifier) {
                if (Array.isArray(propertyAdjustment.outputIdentifier)) {
                    processedInput.data = deepSet(processedInput.data, propertyAdjustment.outputIdentifier, value);
                } else {
                    processedInput.data = deepSet(processedInput.data, [propertyAdjustment.outputIdentifier], value);
                }
            } else {
                if (Array.isArray(propertyAdjustment.inputIdentifier)) {
                    processedInput.data = deepSet(processedInput.data, propertyAdjustment.inputIdentifier, value);
                } else {
                    processedInput.data = deepSet(processedInput.data, [propertyAdjustment.inputIdentifier], value);
                }
            }
        });
    }

    const output: IContent = {
        data: {},
        id: "",
        type: "",
    };

    if (!processedInput.data || !processedInput.type) {
        return processedInput;
    }

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data || {}).forEach((key) => {
        if (Array.isArray(processedInput.data[key])) {
            output.data[key] =
                alreadyHandledContents[processedInput.data[key].id] ||
                processedInput.data[key].map(
                    (prop) => adjustContentToConfig(prop, contentConfig, alreadyHandledContents),
                );
        } else if (typeof processedInput.data[key] === "object") {
            output.data[key] =
                alreadyHandledContents[processedInput.data[key].id] ||
                adjustContentToConfig(processedInput.data[key], contentConfig, alreadyHandledContents);
        } else {
            output.data[key] = processedInput.data[key];
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
