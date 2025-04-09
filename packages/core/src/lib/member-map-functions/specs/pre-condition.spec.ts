import { preCondition } from '../pre-condition';

describe(preCondition.name, () => {
    it('should return correctly', () => {
        let preCondFn = preCondition(() => true);
        expect(preCondFn).toBeTruthy();
        expect(preCondFn?.[0]).toBeInstanceOf(Function);
        expect(preCondFn?.[1]).toEqual(undefined);

        preCondFn = preCondition(() => true, 'default');
        expect(preCondFn?.[1]).toEqual('default');
    });

    it('should return truthy when true', () => {
        var preCond = preCondition(() => true);
        var result = preCond?.[0]({});
        expect(result).toEqual(true);
    });

    it('should return falsy when false', () => {
        var preCond = preCondition(() => false);
        var result = preCond?.[0]({});
        expect(result).toEqual(false);
    });
});
