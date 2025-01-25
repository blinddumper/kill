import {
    AUTOMAP_PROPERTIES_METADATA_KEY,
    getMetadataList,
} from '@automapper/classes';
import type { Constructor } from '@automapper/core';
import { AutoMapperLogger } from '@automapper/core';

export function inheritAutoMapMetadata(
    parentClass: Constructor,
    // eslint-disable-next-line @typescript-eslint/ban-types
    targetClass: Function,
    isPropertyInherited: (key: string) => boolean = () => true
) {
    try {
        let [parentClassMetadataList] = getMetadataList(parentClass);
        if (!parentClassMetadataList.length) {
            return;
        }

        let [existingMetadataList] = getMetadataList(
            targetClass as Constructor
        );
        Reflect.defineMetadata(
            AUTOMAP_PROPERTIES_METADATA_KEY,
            [
                ...existingMetadataList,
                ...parentClassMetadataList.filter(([propertyKey]) =>
                    isPropertyInherited(propertyKey)
                ),
            ],
            targetClass
        );
    } catch (e) {
        if (AutoMapperLogger.error) {
            AutoMapperLogger.error(`Error trying to inherit metadata: ${e}`);
        }
    }
}

export function inheritPropertyInitializers(
    target: Record<string, unknown>,
    sourceClass: Constructor,
    isPropertyInherited: (key: string) => boolean = () => true
) {
    try {
        let tempInstance = new sourceClass();
        let propertyNames = Object.getOwnPropertyNames(tempInstance);

        propertyNames
            .filter(
                (propertyName) =>
                    typeof tempInstance[propertyName] !== 'undefined' &&
                    typeof target[propertyName] === 'undefined'
            )
            .filter((propertyName) => isPropertyInherited(propertyName))
            .forEach((propertyName) => {
                target[propertyName] = tempInstance[propertyName];
            });
    } catch (e) {
        if (AutoMapperLogger.error) {
            AutoMapperLogger.error(`Error inheriting properties: ${e}`);
        }
    }
}
