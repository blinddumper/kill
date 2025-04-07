import { SnakeCaseNamingConvention } from '../snake-case-naming-convention';

describe(SnakeCaseNamingConvention.name, () => {
    let one = ['address'];
    let two = ['address', 'Street'];
    let three = ['formatted', 'Address', 'Street'];
    let pascalOne = ['Address'];
    let pascalTwo = ['Address', 'Street'];
    let pascalThree = ['Formatted', 'Address', 'Street'];
    let toSplit = 'formatted_address_street';
    let snakeCaseNamingConvention = new SnakeCaseNamingConvention();

    it('should instantiate', () => {
        expect(snakeCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        let split = toSplit
            .split(snakeCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['formatted', 'address', 'street']);
    });

    it('should convert camelCase to snake_case', () => {
        let convertedOne =
            snakeCaseNamingConvention.transformPropertyName(one);
        let convertedTwo =
            snakeCaseNamingConvention.transformPropertyName(two);
        let convertedThree =
            snakeCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('address_street');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert PascalCase to snake_case', () => {
        let convertedOne =
            snakeCaseNamingConvention.transformPropertyName(pascalOne);
        let convertedTwo =
            snakeCaseNamingConvention.transformPropertyName(pascalTwo);
        let convertedThree =
            snakeCaseNamingConvention.transformPropertyName(pascalThree);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('address_street');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert to empty string if provide empty string', () => {
        let converted = snakeCaseNamingConvention.transformPropertyName(['']);
        expect(converted).toEqual('');
    });
});
