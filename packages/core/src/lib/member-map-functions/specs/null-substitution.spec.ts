import { MapFnClassId, TransformationType } from '../../types';
import { nullSubstitution } from '../null-substitution';

describe(nullSubstitution.name, () => {
    it('should return correctly', () => {
        let nullSubFn = nullSubstitution('');
        expect(nullSubFn).toBeTruthy();
        expect(nullSubFn[MapFnClassId.type]).toEqual(
            TransformationType.NullSubstitution
        );
        expect(nullSubFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should return source if source is not null', () => {
        let nullSubFn = nullSubstitution('subbed');
        let result = nullSubFn[MapFnClassId.fn]({ foo: 'bar' }, ['foo']);
        expect(result).toEqual('bar');
        expect(result).not.toEqual('subbed');
    });

    it('should return subbed if source is null', () => {
        let nullSubFn = nullSubstitution('subbed');
        let result = nullSubFn[MapFnClassId.fn]({ foo: null }, ['foo']);
        expect(result).toEqual('subbed');
        expect(result).not.toEqual(null);
    });
});
