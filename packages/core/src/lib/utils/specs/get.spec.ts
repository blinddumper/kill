import { get } from '../get';

describe('get', () => {
    let obj = {
        foo: { bar: 'bar' },
        ['.startDot']: { ['mid.Dot']: { ['endDot.']: 'custom' } },
    };

    it('should return bar', () => {
        let result = get(obj, ['foo', 'bar']);
        expect(result).toEqual('bar');
    });

    it('should handle dotted path', () => {
        let result = get(obj, ['.startDot', 'mid.Dot', 'endDot.']);
        expect(result).toEqual('custom');
    });

    it('should return null', () => {
        let result = get({ foo: { bar: null } }, ['foo', 'bar']);
        expect(result).toEqual(null);
    });

    it('should return undefined for unknown path', () => {
        let result = get(obj, ['foo', 'baz']);
        expect(result).toEqual(undefined);
    });

    it('should return object', () => {
        let result = get(obj, ['foo']);
        expect(result).toEqual({ bar: 'bar' });
    });

    it('should return undefined if paths are not provided', () => {
        let result = get(obj);
        expect(result).toEqual(undefined);
    });
});
