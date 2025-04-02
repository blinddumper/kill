import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { constructUsing } from '../construct-using';

describe(constructUsing.name, () => {
    it('should update destinationConstructor for the mapping', () => {
        let mapping = [] as unknown as Mapping;
        let constructor = jest.fn();
        constructUsing(constructor)(mapping);
        expect(mapping[MappingClassId.destinationConstructor]).toBe(
            constructor
        );
    });
});
