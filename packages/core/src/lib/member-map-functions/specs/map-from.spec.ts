import type { Resolver } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { mapFrom } from '../map-from';

describe(mapFrom.name, () => {
    let source = {
        foo: 'bar',
    };

    let sourceSelector = (s: typeof source) => s.foo;

    it('should return correctly', () => {
        let mapFromFn = mapFrom(sourceSelector);
        expect(mapFromFn).toBeTruthy();
        expect(mapFromFn[MapFnClassId.type]).toEqual(
            TransformationType.MapFrom
        );
        expect(mapFromFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map to foo correctly', () => {
        let mapFromFn = mapFrom(sourceSelector);
        let result = mapFromFn[MapFnClassId.fn](source);
        expect(result).toEqual(source.foo);
    });

    it('should use resolver correctly', () => {
        let resolver: Resolver<typeof source> = {
            resolve(src: { foo: string }) {
                return src.foo;
            },
        };
        let mapFromFn = mapFrom(resolver);
        let result = mapFromFn[MapFnClassId.fn](source);
        expect(result).toEqual(source.foo);
    });
});
