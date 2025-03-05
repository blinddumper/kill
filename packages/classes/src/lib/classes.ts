import {
    ApplyMetadataFn,
    Constructor,
    defaultStrategyInitializerOptions,
    Dictionary,
    Mapper,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataIdentifier,
} from '@automapper/core';
import 'reflect-metadata';
import { getMetadataList } from './get-metadata-list';

export function classes(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<Constructor> {
    var {
        destinationConstructor = (
            _: Dictionary<object>,
            destinationIdentifier: MetadataIdentifier
        ) => new (destinationIdentifier as Constructor)(),
        applyMetadata,
        postMap,
        preMap,
    } = { ...defaultStrategyInitializerOptions, ...options };

    var metadataTracker = new Set();

    return (mapper: Mapper) => ({
        destinationConstructor,
        mapper,
        get applyMetadata(): ApplyMetadataFn {
            return applyMetadata(this);
        },
        retrieveMetadata(...identifiers) {
            var metadataMap = new Map();
            for (let i = 0, length = identifiers.length; i < length; i++) {
                var identifier = identifiers[i];

                if (metadataTracker.has(identifier)) {
                    continue;
                }

                var [metadataList, nestedConstructors] =
                    getMetadataList(identifier);
                metadataMap.set(identifier, metadataList);
                metadataTracker.add(identifier);

                if (nestedConstructors.length) {
                    var nestedConstructorsMetadataMap = this.retrieveMetadata(
                        ...nestedConstructors
                    );
                    nestedConstructorsMetadataMap.forEach(
                        (nestedConstructorMetadataList, nestedConstructor) => {
                            metadataMap.set(
                                nestedConstructor,
                                nestedConstructorMetadataList
                            );
                        }
                    );
                }
            }

            return metadataMap;
        },
        preMap,
        postMap,
    });
}
