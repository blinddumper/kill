import { mapInitialize } from '../../member-map-functions/map-initialize';
import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { extend } from '../extend';

function getMappingProperty(path = 'foo') {
    return [
        [path],
        [[path], [mapInitialize([path])]],
        [String, String],
    ] as unknown as Mapping[MappingClassId.properties][number];
}

describe(extend.name, () => {
    it('should extend another mapping', () => {
        let mapping = [] as unknown as Mapping;
        mapping[MappingClassId.customProperties] = [];
        let mappingToExtend = [] as unknown as Mapping;
        mappingToExtend[MappingClassId.properties] = [getMappingProperty()];

        extend(mappingToExtend)(mapping);
        expect(mapping[MappingClassId.customProperties]).toMatchSnapshot();
    });

    it('should skip existing mapping properties on extended mapping', () => {
        let mapping = [] as unknown as Mapping;
        mapping[MappingClassId.customProperties] = [getMappingProperty()];
        let mappingToExtend = [] as unknown as Mapping;
        mappingToExtend[MappingClassId.properties] = [
            getMappingProperty(),
            getMappingProperty('bar'),
        ];

        extend(mappingToExtend)(mapping);
        expect(mapping[MappingClassId.customProperties]).toMatchSnapshot();
    });
});
