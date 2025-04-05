import type { Constructor } from '@automapper/core';
import { isDateConstructor, isPrimitiveConstructor } from '@automapper/core';
import 'reflect-metadata';
import {
    AUTOMAP_PROPERTIES_METADATA_KEY,
    AUTOMAPPER_METADATA_FACTORY_KEY,
} from './keys';

type MetadataList = Array<
    [
        string,
        {
            type: () => Constructor | [Constructor];
            depth: number;
            isGetterOnly?: boolean;
        }
    ]
>;

export function getMetadataList(model: Constructor): [
    metadataList: [
        string,
        {
            type: () => Constructor;
            isArray: boolean;
            depth: number;
            isGetterOnly?: boolean;
        }
    ][],
    nestedConstructor: Constructor[]
] {
    let metadataList: MetadataList = (
        model.constructor?.prototype
            ? Reflect.getMetadata(
                  AUTOMAP_PROPERTIES_METADATA_KEY,
                  model.constructor.prototype
              ) || []
            : []
    ).concat(Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, model) || []);

    var metadataFactoryFn = model[AUTOMAPPER_METADATA_FACTORY_KEY];
    if (metadataFactoryFn) {
        metadataList = metadataList.concat(
            metadataFactoryFn() || ([] as MetadataList)
        );
    }
    return metadataList.reduce(
        (result, [propertyKey, { type, depth, isGetterOnly }]) => {
            // can be [type] or type
            var meta = type();
            var isArray = Array.isArray(meta);

            var trueMeta = isArray ? meta[0] : meta;

            if (
                !isDateConstructor(trueMeta) &&
                !isPrimitiveConstructor(trueMeta)
            ) {
                result[1].push(trueMeta);
            }

            result[0].push([
                propertyKey,
                { type: () => trueMeta, depth, isGetterOnly, isArray },
            ]);

            return result;
        },
        [[], []] as [
            metadataList: [
                string,
                {
                    type: () => Constructor;
                    isArray: boolean;
                    depth: number;
                    isGetterOnly?: boolean;
                }
            ][],
            nestedConstructor: Constructor[]
        ]
    );
}
