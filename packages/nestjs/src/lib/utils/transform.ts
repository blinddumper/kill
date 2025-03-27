import type {
    Dictionary,
    MapOptions,
    Mapper,
    ModelIdentifier,
} from '@automapper/core';
import { isEmpty } from '@automapper/core';

export function shouldSkipTransform<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper | undefined,
    from: ModelIdentifier<TDestination>,
    to: ModelIdentifier<TSource>
): boolean {
    return !mapper || !to || !from;
}

export function transformArray<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    value: TSource[],
    mapper: Mapper | undefined,
    from: ModelIdentifier<TSource>,
    to: ModelIdentifier<TDestination>,
    options?: MapOptions<TSource[], TDestination[]>
) {
    if (!Array.isArray(value)) return value;
    return mapper?.mapArray(value, from, to, options);
}

export function getTransformOptions<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    options?: { isArray?: boolean; mapperName?: string } & MapOptions<
        TSource,
        TDestination
    >
): {
    mapperName?: string;
    isArray: boolean;
    transformedMapOptions?: MapOptions<TSource, TDestination>;
} {
    let { isArray = false, mapperName, ...mapOptions } = options || {};
    let transformedMapOptions = isEmpty(mapOptions) ? undefined : mapOptions;
    return { isArray, mapperName, transformedMapOptions };
}
