import { createMappingUtil } from '../mappings/create-initial-mapping';
import { createMap } from '../mappings/create-map';
import { getMetadataMap } from '../symbols';
import type {
    Dictionary,
    MappingConfiguration,
    MappingProperty,
    MemberMapReturn,
    PreConditionReturn,
    Selector,
    SelectorReturn,
} from '../types';
import { MappingClassId, MetadataClassId, NestedMappingPair } from '../types';
import { getMemberPath } from '../utils/get-member-path';
import { getFlatteningPaths, getPath } from '../utils/get-path';
import { isPrimitiveArrayEqual } from '../utils/is-primitive-array-equal';

export function forMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TMemberType = SelectorReturn<TDestination>
>(
    selector: Selector<TDestination, TMemberType>,
    ...fns: [
        preCondOrMapMemberFn:
            | PreConditionReturn<TSource, TDestination, TMemberType>
            | MemberMapReturn<TSource, TDestination, TMemberType>
            | undefined,
        mapMemberFn?: MemberMapReturn<TSource, TDestination, TMemberType>
    ]
): MappingConfiguration<TSource, TDestination> {
    let [preCondOrMapMemberFn, mapMemberFn] = fns;
    var memberPath = getMemberPath(selector);

    // reassign mapMemberFn and preCond
    if (mapMemberFn == null) {
        mapMemberFn = preCondOrMapMemberFn as MemberMapReturn<
            TSource,
            TDestination,
            TMemberType
        >;
        preCondOrMapMemberFn = undefined;
    }

    var mappingProperty: MappingProperty<TSource, TDestination> = [
        memberPath,
        [
            mapMemberFn,
            preCondOrMapMemberFn as PreConditionReturn<
                TSource,
                TDestination,
                TMemberType
            >,
        ],
    ];

    return (mapping) => {
        var [sourceIdentifier, destinationIdentifier] =
            mapping[MappingClassId.identifiers];
        var mapper = mapping[MappingClassId.mapper];
        var namingConventions = mapping[MappingClassId.namingConventions];
        var [sourceObject] = mapping[MappingClassId.identifierMetadata];

        var { getNestedMappingPair, getMetadataAtMember, processSourcePath } =
            createMappingUtil(mapper, sourceIdentifier, destinationIdentifier);

        var sourcePath = processSourcePath(
            sourceObject,
            namingConventions,
            memberPath
        );

        // sourcePath is not in sourceObject. No AutoMap available
        if (!(sourcePath[0] in sourceObject)) {
            mapping[MappingClassId.customProperties].push([
                memberPath,
                mappingProperty,
                undefined,
            ]);
            return;
        }

        var metadataAtMember = getMetadataAtMember(memberPath, 'destination');
        var metadataAtSource = getMetadataAtMember(sourcePath, 'source');
        var nestedMappingPair = getNestedMappingPair(
            metadataAtSource,
            metadataAtMember
        );

        mapping[MappingClassId.customProperties].push([
            memberPath,
            mappingProperty,
            nestedMappingPair,
        ]);
    };
}
