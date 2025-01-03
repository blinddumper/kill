import * as Actual from '../src/lib/automap';
import * as Shim from './index';

describe('Classes - Shim', () => {
    it('should contains all decorators exported by classes package', () => {
        let actualExportNames = Object.keys(Actual).sort();
        let shimExportNames = Object.keys(Shim).sort();

        expect(shimExportNames).toEqual(actualExportNames);
    });
});
