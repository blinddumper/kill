import { MapFnClassId, TransformationType } from '../../types';
import { condition } from '../condition';

describe(condition.name, () => {
    let source = {
        toMap: 'truthy',
    };

    it('should return correctly', () => {
        let conditionFn = condition(() => true);
        expect(conditionFn).toBeTruthy();
        expect(conditionFn[MapFnClassId.type]).toEqual(
            TransformationType.Condition
        );
        expect(conditionFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map to source.truthy when evaluated to true', () => {
        let conditionFn = condition(() => true);
        let result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(source.toMap);
    });

    it('should map to source.truthy when evaluated to true regardless of defaultValue', () => {
        let conditionFn = condition(() => true, 'defaultValue');
        let result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(source.toMap);
    });

    it('should map to undefined when evaluated to false', () => {
        let conditionFn = condition(() => false);
        let result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(undefined);
    });

    it('should map to defaultValue when evaluated to false and defaultValue is provided', () => {
        let conditionFn = condition(() => false, 'defaultValue');
        let result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual('defaultValue');
    });
});
