import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    extend,
    forMember,
    nullSubstitution,
} from '@automapper/core';

export class Source {
    @AutoMap(() => String)
    foo!: string | null;
}

export class Destination {
    @AutoMap()
    foo?: string;
}

export class Destination2 extends Destination {}

describe('Issue 503', () => {
    let mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should map properly', () => {
        let mapping = createMap(
            mapper,
            Source,
            Destination,
            forMember((d) => d.foo, nullSubstitution(undefined))
        );
        createMap(mapper, Source, Destination2, extend(mapping));

        let source = new Source();
        source.foo = null;

        let destination = mapper.map(source, Source, Destination);
        expect(destination.foo).toEqual(undefined);

        let destination2 = mapper.map(source, Source, Destination2);
        expect(destination2.foo).toEqual(undefined);
    });
});
