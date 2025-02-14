import { PascalCaseNamingConvention } from '../pascal-case-naming-convention';

describe(PascalCaseNamingConvention.name, () => {
    let one = ['address'];
    let two = ['address', 'Street'];
    let three = ['formatted', 'Address', 'Street'];
    let snakedOne = ['address'];
    let snakedTwo = ['address', 'street'];
    let snakedThree = ['formatted', 'address', 'street'];
    let toSplit = 'FormattedAddressStreet';
    let pascalCaseNamingConvention = new PascalCaseNamingConvention();

    it('should instantiate', () => {
        expect(pascalCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        let split = toSplit
            .split(pascalCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['Formatted', 'Address', 'Street']);
    });

    it('should convert camelCase to PascalCase', () => {
        let convertedOne =
            pascalCaseNamingConvention.transformPropertyName(one);
        let convertedTwo =
            pascalCaseNamingConvention.transformPropertyName(two);
        let convertedThree =
            pascalCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('Address');
        expect(convertedTwo).toEqual('AddressStreet');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert lowercase (snake_case) to PascalCase', () => {
        let convertedOne =
            pascalCaseNamingConvention.transformPropertyName(snakedOne);
        let convertedTwo =
            pascalCaseNamingConvention.transformPropertyName(snakedTwo);
        let convertedThree =
            pascalCaseNamingConvention.transformPropertyName(snakedThree);
        expect(convertedOne).toEqual('Address');
        expect(convertedTwo).toEqual('AddressStreet');
        expect(convertedThree).toEqual(toSplit);
    });
});
