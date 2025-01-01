import { MapFnClassId, TransformationType } from '../../types';
import { fromValue } from '../from-value';

describe(fromValue.name, () => {
    it('should return correctly', () => {
        let fromValueFunction = fromValue(10);
        expect(fromValueFunction).toBeTruthy();
        expect(fromValueFunction[MapFnClassId.type]).toEqual(
            TransformationType.FromValue
        );
        expect(fromValueFunction[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map correctly', () => {
        let fromValueFunction = fromValue(10);
        let result = fromValueFunction[MapFnClassId.fn]();
        expect(result).toEqual(10);
    });
});
