import { getErrorHandler, getMappings } from '../symbols';
import type {
    Mapper,
    Mapping,
    MetadataIdentifier,
    ModelIdentifier,
} from '../types';

export function getMapping(
    mapper: Mapper,
    source: ModelIdentifier,
    destination: ModelIdentifier,
    allowNull = false
): Mapping {
    // turn string into symbol for identifier
    let sourceIdentifier: MetadataIdentifier =
        typeof source === 'string' ? Symbol.for(source) : source;
    let destinationIdentifier: MetadataIdentifier =
        typeof destination === 'string' ? Symbol.for(destination) : destination;

    let mapping = getMappings(mapper)
        .get(sourceIdentifier)
        ?.get(destinationIdentifier);

    if (mapping == null && !allowNull) {
        let sourceName =
            typeof source === 'function' ? (source.name || String(source)) : String(source);
        let destinationName =
            typeof destination === 'function' ? (destination.name || String(destination)) : String(destination);
        let errorHandler = getErrorHandler(mapper);
        let errorMessage = `Mapping is not found for ${sourceName} and ${destinationName}`;
        errorHandler.handle(errorMessage);
        throw new Error(errorMessage);
    }

    return mapping as Mapping;
}
