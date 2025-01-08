import type { Mapper } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { mapWith } from '../map-with';

describe(mapWith.name, () => {
    let selector = (s: any) => s;
    let withDestination = '';
    let withSource = '';

    let mapper = { map: jest.fn(), mapArray: jest.fn() };

    it('should return correctly', () => {
        let mapWithFn = mapWith(withDestination, withSource, selector);
        expect(mapWithFn).toBeTruthy();
        expect(mapWithFn[MapFnClassId.type]).toEqual(
            TransformationType.MapWith
        );
        expect(mapWithFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should call mapper.map', () => {
        let mapWithFn = mapWith(withDestination, withSource, selector);
        mapWithFn[MapFnClassId.fn]({}, mapper as unknown as Mapper);
        expect(mapper.map).toHaveBeenCalledWith(
            {},
            withDestination,
            withSource,
            undefined
        );
    });

    it('should call mapper.mapArray', () => {
        let arrSelector = () => [];
        let mapWithFn = mapWith(withDestination, withSource, arrSelector);
        mapWithFn[MapFnClassId.fn]({}, mapper as unknown as Mapper);
        expect(mapper.mapArray).toHaveBeenCalledWith(
            [],
            withDestination,
            withSource,
            undefined
        );
    });
});
