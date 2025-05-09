import { AutoMap, classes } from '@automapper/classes';
import {
    condition,
    createMap,
    createMapper,
    forMember,
    nullSubstitution,
    undefinedSubstitution,
} from '@automapper/core';

describe('Map - Condition/Substitutions with Models', () => {
    class Foo {}
    class FooDto {}

    class Bar {
        @AutoMap(() => Foo)
        foo: Foo | null = null;
    }

    class BarDto {
        @AutoMap(() => FooDto)
        foo?: FooDto;
    }

    let mapper = createMapper({ strategyInitializer: classes() });

    createMap(mapper, Foo, FooDto);

    it('should condition respect models', () => {
        createMap(
            mapper,
            Bar,
            BarDto,
            forMember(
                (d) => d.foo,
                condition((s) => s.foo != null)
            )
        );

        let bar = new Bar();
        bar.foo = new Foo();

        let dto = mapper.map(bar, Bar, BarDto);
        expect(dto.foo).toEqual(new FooDto());
    });

    it('should nullSubstitution respect models', () => {
        createMap(
            mapper,
            Bar,
            BarDto,
            forMember((d) => d.foo, nullSubstitution(undefined))
        );

        let bar = new Bar();
        bar.foo = new Foo();

        let dto = mapper.map(bar, Bar, BarDto);
        expect(dto.foo).toEqual(new FooDto());
    });

    it('should undefinedSubstitution respect models', () => {
        createMap(
            mapper,
            Bar,
            BarDto,
            forMember((d) => d.foo, undefinedSubstitution(null))
        );

        let bar = new Bar();
        bar.foo = new Foo();

        let dto = mapper.map(bar, Bar, BarDto);
        expect(dto.foo).toEqual(new FooDto());
    });
});
