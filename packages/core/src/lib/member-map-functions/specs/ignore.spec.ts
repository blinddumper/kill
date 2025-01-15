import { MapFnClassId, TransformationType } from '../../types';
import { ignore } from '../ignore';

describe(ignore.name, () => {
    it('should return correctly', () => {
        let ignoreFn = ignore();
        expect(ignoreFn).toBeTruthy();
        expect(ignoreFn[MapFnClassId.type]).toEqual(TransformationType.Ignore);
    });
});
