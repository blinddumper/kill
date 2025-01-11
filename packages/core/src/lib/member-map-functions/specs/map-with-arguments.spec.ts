import { MapFnClassId, TransformationType } from '../../types';
import { mapWithArguments } from '../map-with-arguments';

describe(mapWithArguments.name, () => {
    let withArgumentsResolver = (
        source: any,
        extraArguments: Record<string, any>
    ) => source[extraArguments['foo']];

    let resolver = {
        resolve(source: any, extraArguments: Record<string, any>) {
            return source[extraArguments['foo']];
        },
    };

    it('should return correctly', () => {
        let mapWithArgumentsFn = mapWithArguments(withArgumentsResolver);
        expect(mapWithArgumentsFn).toBeTruthy();
        expect(mapWithArgumentsFn[MapFnClassId.type]).toEqual(
            TransformationType.MapWithArguments
        );
        expect(mapWithArgumentsFn[MapFnClassId.fn]).toBe(withArgumentsResolver);
    });

    it('should map correctly', () => {
        let mapWithArgumentsFn = mapWithArguments(withArgumentsResolver);
        let result = mapWithArgumentsFn[MapFnClassId.fn](
            { foo: 'this is awesome' },
            { foo: 'foo' }
        );
        expect(result).toEqual('this is awesome');
    });

    it('should use resolver correctly', () => {
        let mapWithArgumentsFn = mapWithArguments(resolver);
        let result = mapWithArgumentsFn[MapFnClassId.fn](
            { foo: 'this is awesome resolver' },
            { foo: 'foo' }
        );
        expect(result).toEqual('this is awesome resolver');
    });
});
