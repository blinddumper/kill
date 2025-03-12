import {
    ApplyMetadataFn,
    defaultStrategyInitializerOptions,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataList,
} from '@automapper/core';
import { PojosMetadataMap } from './metadata-map';

export function pojos(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<symbol> {
    var {
        destinationConstructor = () => ({}),
        applyMetadata,
        postMap,
        preMap,
    } = { ...defaultStrategyInitializerOptions, ...options };

    return (mapper) => ({
        destinationConstructor,
        mapper,
        get applyMetadata(): ApplyMetadataFn {
            return applyMetadata(this);
        },
        retrieveMetadata(...identifiers): Map<symbol, MetadataList> {
            var metadataMap = new Map();

            for (let i = 0, length = identifiers.length; i < length; i++) {
                var identifier = identifiers[i];
                metadataMap.set(
                    identifier,
                    PojosMetadataMap.retrieve(identifier)
                );
            }

            return metadataMap;
        },
        preMap,
        postMap,
    });
}
