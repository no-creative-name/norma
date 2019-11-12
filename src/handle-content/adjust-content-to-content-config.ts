import { IContentConfig } from "../interfaces/adapter-config";
import { IContent, IContentResolved } from "../interfaces/content";
import { deepGetFromFields } from "./object-processing/deep-get-from-fields";
import { deepRemoveFromFields } from "./object-processing/deep-remove-from-fields";
import { deepSetToFields } from "./object-processing/deep-set-to-fields";

export const adjustContentToContentConfig = (
    input: IContent | any,
    contentConfig: IContentConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContentResolved => {
    if (!input.data || !input.type) {
        return input;
    }

    let processedInput: IContent = Object.assign({}, input);

    // move & convert values
    if (processedInput.type === contentConfig.inputType && contentConfig.propertyAdjustments) {
        processedInput = adjustContentToPropertyAdjustments(processedInput, contentConfig);
    }

    const output: IContentResolved = {
        data: {},
        id: "",
        type: "",
    };

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data || {}).forEach((key) => {
        const propValue = processedInput.data[key].value;
        if (Array.isArray(propValue)) {
            output.data[key] = propValue.map(
                (prop) => adjustContentToContentConfig(prop, contentConfig, alreadyHandledContents),
            );
        } else if (typeof propValue === "object") {
            output.data[key] =
                alreadyHandledContents[propValue.id] ||
                adjustContentToContentConfig(propValue, contentConfig, alreadyHandledContents);
        } else {
            output.data[key] = propValue;
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

const adjustContentToPropertyAdjustments = (input: IContent, contentConfig: IContentConfig): IContent => {
    const processedInput = Object.assign({}, input);
    contentConfig.propertyAdjustments.map((propertyAdjustment) => {
        let value;
        const seperatedInputIdentifier = propertyAdjustment.inputIdentifier.split(".");
        const seperatedOutputIdentifier =
            propertyAdjustment.outputIdentifier ? propertyAdjustment.outputIdentifier.split(".") : undefined;

        value = deepGetFromFields(processedInput.data, seperatedInputIdentifier);

        processedInput.data = deepRemoveFromFields(processedInput.data, seperatedInputIdentifier);

        if (propertyAdjustment.valueConverter && value !== undefined) {
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
    return processedInput;
};
