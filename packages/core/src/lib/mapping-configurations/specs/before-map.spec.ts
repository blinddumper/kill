import type { Mapping } from '../../types';
import { MappingCallbacksClassId, MappingClassId } from '../../types';
import { beforeMap } from '../before-map';

describe(beforeMap.name, () => {
    it('should update mapping configuration with beforeMap', () => {
        let mapping = [] as unknown as Mapping;
        let cb = jest.fn();
        beforeMap(cb)(mapping);
        expect(
            mapping[MappingClassId.callbacks]![
                MappingCallbacksClassId.beforeMap
            ]
        ).toBe(cb);
    });
});
