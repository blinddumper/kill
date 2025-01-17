import { isEmpty } from '@automapper/core';
import type { AnyEntity } from '@mikro-orm/core';
import { Reference, Utils, wrap } from '@mikro-orm/core';
import type { IWrappedEntityInternal } from '@mikro-orm/core/typings';

let excluded = [
    '__gettersDefined',
    '__entity',
    '__meta',
    '__platform',
    '__helper',
    '__factory',
];

export function serializeEntity(
    item: AnyEntity,
    itemMetadata: Record<string, unknown> | undefined,
    toPojo = false,
    memorized = new Map<AnyEntity, Record<string, unknown>>,
    skipCheckExisting = false
) {
    if (!Utils.isEntity(item)) return item;
    if (toPojo) return wrap(item).toPOJO();

    let result = {} as Record<string | symbol, unknown>;
    let keys = Object.keys((wrap(item) as IWrappedEntityInternal<AnyEntity>).__meta.properties);
    for (let key of keys) {
        if (typeof key === 'symbol' || excluded.includes(key)) {
            continue;
        }

        let value = item[key];
        let keyMetadata = itemMetadata && itemMetadata[key] as Record<string, unknown>;

        if (Utils.isCollection(value)) {
            result[key] = (value.getSnapshot() || []).map((snapshot) => {
                return serializeEntity(
                    snapshot as AnyEntity,
                    keyMetadata,
                    true,
                    memorized,
                    true
                );
            });
            continue;
        }

        if (Reference.isReference(value)) {
            let isExisting = memorized.has(value);

            if (!skipCheckExisting && isExisting) {
                result[key] = memorized.get(value);
                continue;
            }

            if (!value.isInitialized()) {
                memorized.set(value, wrap(value).toPOJO());
                result[key] = serializeEntity(
                    wrap(value).toPOJO(),
                    keyMetadata,
                    false,
                    memorized,
                    !isExisting
                );
                continue;
            }

            memorized.set(value, value.getEntity() as Record<string, unknown>);
            result[key] = serializeEntity(
                value.getEntity(),
                keyMetadata,
                typeof keyMetadata === 'object' && isEmpty(keyMetadata),
                memorized,
                !isExisting
            );
            continue;
        }

        result[key] = serializeEntity(value, keyMetadata, false, memorized, false);
    }

    if (result['id'] == null && item['id'] != null) {
        result['id'] = item['id'];
    }

    return result;
}
