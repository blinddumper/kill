import { mapInitialize } from '../../member-map-functions/map-initialize';
import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { forSelf } from '../for-self';

function getMappingProperty(path = 'foo') {
    return [
        [path],
        [[path], [mapInitialize([path])]],
        [String, String],
    ] as unknown as Mapping[MappingClassId.properties][number];
}

describe(forSelf.name, () => {
    it('should update mapping properties with another mapping', () => {
        let mapping = [] as unknown as Mapping;
        mapping[MappingClassId.properties] = [];

        let selfMapping = [] as unknown as Mapping;
        selfMapping[MappingClassId.properties] = [getMappingProperty()];

        forSelf(
            selfMapping,
            (s: { item: Record<string, unknown> }) => s.item
        )(mapping);
        expect(mapping[MappingClassId.properties]).toMatchSnapshot();
    });

    it('should skip existing mapping properties from another mapping', () => {
        let mapping = [] as unknown as Mapping;
        mapping[MappingClassId.properties] = [getMappingProperty()];

        let selfMapping = [] as unknown as Mapping;
        selfMapping[MappingClassId.properties] = [
            getMappingProperty(),
            getMappingProperty('bar'),
        ];

        forSelf(
            selfMapping,
            (s: { item: Record<string, unknown> }) => s.item
        )(mapping);
        expect(mapping[MappingClassId.properties]).toMatchSnapshot();
    });
});
