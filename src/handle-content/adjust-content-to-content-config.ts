import _ from "lodash";
import { IContentConfig } from "../interfaces/adapter-config";
import { IContent, IContentResolved } from "../interfaces/content";
import { deepGetFromFields } from "./object-processing/deep-get-from-fields";
import { deepRemoveFromFields } from "./object-processing/deep-remove-from-fields";
import { deepSetToFields } from "./object-processing/deep-set-to-fields";

export const adjustContentToContentConfig = (
    input: IContentResolved | any,
    contentConfig: IContentConfig,
    alreadyHandledContents: {[key: string]: IContentResolved} = {},
): IContentResolved => {
    if (!input.data || !input.type) {
        return input;
    }

    let processedInput: IContentResolved = _.cloneDeep(input);

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

    // find & recurse over deeper contents
    Object.keys(processedInput.data || {}).forEach((key) => {
        const propValue = processedInput.data[key];
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
    const processedInput = _.cloneDeep(input);
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
                throw new ReferenceError(`Couldn't convert value: ${error}`);
            }
            if (value === undefined) {
                throw new ReferenceError(
                    `Value converter for ${propertyAdjustment.inputIdentifier} returned undefined`,
                );
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
