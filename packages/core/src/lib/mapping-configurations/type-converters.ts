import type {
    Converter,
    Dictionary,
    MappingConfiguration,
    MetadataIdentifier,
    PrimitiveConstructor,
    PrimitiveConstructorExtended,
    PrimitiveConstructorReturnType,
    Selector,
} from '../types';
import { MappingClassId } from '../types';
import { toSelector } from '../utils/to-selector';

type ConstructorReturnType<
    TConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[]
> = TConstructor extends PrimitiveConstructorExtended[]
    ? Array<PrimitiveConstructorReturnType<TConstructor[0]>>
    : TConstructor extends PrimitiveConstructorExtended
    ? PrimitiveConstructorReturnType<TConstructor>
    : never;

type ConverterOrValueSelector<
    TSourceConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[],
    TDestinationConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[]
> =
    | Selector<
          ConstructorReturnType<TSourceConstructor>,
          ConstructorReturnType<TDestinationConstructor> | undefined
      >
    | Converter<
          ConstructorReturnType<TSourceConstructor>,
          ConstructorReturnType<TDestinationConstructor> | undefined
      >;

export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends
        | PrimitiveConstructorExtended
        | [PrimitiveConstructorExtended],
    TDestinationConstructor extends
        | PrimitiveConstructorExtended
        | [PrimitiveConstructorExtended]
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector: ConverterOrValueSelector<
        TSourceConstructor,
        TDestinationConstructor
    >
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        var isSourceArray = Array.isArray(source);
        var isDestinationArray = Array.isArray(destination);
        var sourceIdentifier: PrimitiveConstructorExtended = isSourceArray
            ? source[0]
            : source;
        var destinationIdentifier: PrimitiveConstructorExtended =
            isDestinationArray ? destination[0] : destination;

        var selector = toSelector(converterOrValueSelector);
        var typeConverters =
            mapping[MappingClassId.typeConverters] ||
            (mapping[MappingClassId.typeConverters] = new Map());

        let sourceConverters: Map<
            MetadataIdentifier | PrimitiveConstructor | DateConstructor,
            [Selector?, Selector?]
        >;

        var [sourceTypeConverters, arraySourceTypeConverters] =
            typeConverters.get(sourceIdentifier) || [];

        if (sourceTypeConverters || arraySourceTypeConverters) {
            sourceConverters = isSourceArray
                ? arraySourceTypeConverters
                : sourceTypeConverters;
            var [destinationConverter, arrayDestinationConverter] =
                sourceConverters.get(destinationIdentifier) || [];
            sourceConverters.set(
                destinationIdentifier,
                isDestinationArray
                    ? [destinationConverter, selector]
                    : [selector, arrayDestinationConverter]
            );
            return;
        }

        sourceConverters = new Map([
            [
                destinationIdentifier,
                isDestinationArray
                    ? [undefined, selector]
                    : [selector, undefined],
            ],
        ]);

        typeConverters.set(
            sourceIdentifier,
            isSourceArray
                ? [new Map(), sourceConverters]
                : [sourceConverters, new Map()]
        );
    };
}
