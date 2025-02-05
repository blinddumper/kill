import { CamelCaseNamingConvention } from '../camel-case-naming-convention';

describe(CamelCaseNamingConvention.name, () => {
    let one = ['Address'];
    let two = ['Address', 'Street'];
    let three = ['Formatted', 'Address', 'Street'];
    let snakedOne = ['address'];
    let snakedTwo = ['address', 'street'];
    let snakedThree = ['formatted', 'address', 'street'];
    let toSplit = 'formattedAddressStreet';
    let camelCaseNamingConvention = new CamelCaseNamingConvention();

    it('should instantiate', () => {
        expect(camelCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        let split = toSplit
            .split(camelCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['formatted', 'Address', 'Street']);
    });

    it('should convert PascalCase to camelCase', () => {
        let convertedOne =
            camelCaseNamingConvention.transformPropertyName(one);
        let convertedTwo =
            camelCaseNamingConvention.transformPropertyName(two);
        let convertedThree =
            camelCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('addressStreet');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert lowercase (snake_case) to camelCase', () => {
        let convertedOne =
            camelCaseNamingConvention.transformPropertyName(snakedOne);
        let convertedTwo =
            camelCaseNamingConvention.transformPropertyName(snakedTwo);
        let convertedThree =
            camelCaseNamingConvention.transformPropertyName(snakedThree);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('addressStreet');
        expect(convertedThree).toEqual(toSplit);
    });
});
