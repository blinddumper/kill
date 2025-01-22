import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    extend,
    forMember,
    mapFrom,
} from '@automapper/core';

describe('Issue 396', () => {
    class NestedOptionalClass {
        @AutoMap()
        name?: string;

        public getFullName(): string | undefined {
            return this.name;
        }
    }

    class Source {
        @AutoMap()
        description?: string;
        @AutoMap(() => NestedOptionalClass)
        options?: NestedOptionalClass;
    }

    class SourceChild extends Source {
        @AutoMap()
        another?: string;
    }

    class Destination {
        @AutoMap()
        description?: string;
        @AutoMap(() => NestedOptionalClass)
        options?: NestedOptionalClass;
    }

    class DestinationChild extends Destination {
        @AutoMap()
        another?: string;
    }

    let mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map properly', () => {
        let mapping = createMap(
            mapper,
            Source,
            Destination,
            forMember(
                (d) => d.options,
                mapFrom((s) => s.options)
            )
        );

        createMap(mapper, SourceChild, DestinationChild, extend(mapping));

        let options = new NestedOptionalClass();
        options.name = 'name';

        let input1 = new SourceChild();
        input1.description = 'description';
        input1.options = options;

        expect(() =>
            mapper.map(input1, SourceChild, DestinationChild)
        ).not.toThrow();

        let input2 = new SourceChild();
        input2.description = 'description 2';

        expect(() =>
            mapper.map(input2, SourceChild, DestinationChild)
        ).not.toThrow();
    });
});
