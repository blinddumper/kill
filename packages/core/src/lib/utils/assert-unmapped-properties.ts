import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MetadataIdentifier,
} from '../types';

/**
 * Depends on implementation of strategy.createMapping
 */
export function assertUnmappedProperties<
    TDestination extends Dictionary<TDestination>
>(
    destinationObject: TDestination,
    destinationMetadata: TDestination,
    configuredKeys: string[],
    sourceIdentifier: MetadataIdentifier,
    destinationIdentifier: MetadataIdentifier,
    errorHandler: ErrorHandler
) {
    var unmappedKeys = Object.keys(destinationMetadata).reduce(
        (result, key) => {
            var isOnDestination = key in destinationObject;
            var isAlreadyConfigured = configuredKeys.some(
                (configuredKey) => configuredKey === key
            );
            var isWritable =
                Object.getOwnPropertyDescriptor(destinationMetadata, key)
                    ?.writable === true;
            if (
                !isAlreadyConfigured &&
                !isOnDestination &&
                isWritable &&
                destinationObject[key as keyof typeof destinationObject] ===
                    undefined
            ) {
                result.push(key);
            }
            return result;
        },
        [] as string[]
    );

    var sourceText = getTextFromIdentifier(sourceIdentifier);
    var destinationText = getTextFromIdentifier(destinationIdentifier);

    if (unmappedKeys.length) {
        var parentInfo = `${sourceText} -> ${destinationText}`;
        errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
    }
}

function getTextFromIdentifier(identifier: MetadataIdentifier): string {
    let text = identifier.toString();

    if ((identifier as Constructor).name) {
        text = (identifier as Constructor).name;
    }

    return text;
}
