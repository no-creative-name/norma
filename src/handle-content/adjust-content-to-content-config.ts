import { IContentConfig } from "../interfaces/adapter-config";
import { IContent, IContentResolved } from "../interfaces/content";
import { deepGetFromFields } from "./object-processing/deep-get";
import { deepRemoveFromFields } from "./object-processing/deep-remove";
import { deepSetToFields } from "./object-processing/deep-set";

export const adjustContentToContentConfig = (
    // TODO: wrong type
    input: IContent,
    contentConfig: IContentConfig,
    alreadyHandledContents: {[key: string]: IContent} = {},
): IContentResolved => {
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

    if (!processedInput.data || !processedInput.type) {
        return processedInput;
    }

    alreadyHandledContents[processedInput.id] = processedInput;

    Object.keys(processedInput.data || {}).forEach((key) => {
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

const adjustContentToPropertyAdjustments = (input: IContent, contentConfig: IContentConfig): IContent => {
    const processedInput = Object.assign({}, input);
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
    return processedInput;
};