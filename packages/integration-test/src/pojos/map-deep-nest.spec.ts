import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    fromValue,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import {
    createDeepNestDtoMetadata,
    FooBarBazDto,
    FooBarBazQuxDto,
    FooBarDto,
    FooDto,
    FooFooDto,
    FooFooFooDto,
} from './dtos/deep-nest.dto';
import {
    createDeepNestMetadata,
    Foo,
    FooBar,
    FooBarBaz,
    FooBarBazQux,
    FooFoo,
    FooFooFoo,
} from './models/deep-nest';

describe('Map - Deep Nest models', () => {
    describe('Without naming conventions', () => {
        let mapper = createMapper({ strategyInitializer: pojos() });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map properly', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(mapper, 'FooFoo', 'FooFooDto');
            createMap<Foo, FooDto>(mapper, 'Foo', 'FooDto');

            let foo: Foo = {
                foo: {
                    foo: {
                        foo: 'some string',
                    },
                },
            };

            let dto = mapper.map<Foo, FooDto>(foo, 'Foo', 'FooDto');
            expect(dto).toBeTruthy();
            expect(dto.foo.foo.foo).toEqual('some string');
        });
    });

    describe('With naming conventions', () => {
        let mapper = createMapper({
            strategyInitializer: pojos(),
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new SnakeCaseNamingConvention(),
            },
        });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map properly', () => {
            createMap<FooBarBazQux, FooBarBazQuxDto>(
                mapper,
                'FooBarBazQux',
                'FooBarBazQuxDto'
            );
            createMap<FooBarBaz, FooBarBazDto>(
                mapper,
                'FooBarBaz',
                'FooBarBazDto'
            );
            createMap<FooBar, FooBarDto>(mapper, 'FooBar', 'FooBarDto');

            let dto = mapper.map<FooBar, FooBarDto>(
                { fooBar: { fooBarBaz: { fooBarBazQux: 'some foo bar' } } },
                'FooBar',
                'FooBarDto'
            );
            expect(dto.foo_bar.foo_bar_baz.foo_bar_baz_qux).toEqual(
                'some foo bar'
            );
        });
    });

    describe('With custom mapping configurations', () => {
        let mapper = createMapper({ strategyInitializer: pojos() });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map with mapping configuration for depth 1', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto',
                forMember((d) => d.foo, fromValue('FooFooFoo override'))
            );

            let foo: FooFooFoo = { foo: 'some string' };
            let dto = mapper.map<FooFooFoo, FooFooFooDto>(
                foo,
                'FooFooFoo',
                'FooFooFooDto'
            );
            expect(dto.foo).toEqual('FooFooFoo override');
        });

        it('should map with mapping configuration for depth 2', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(
                mapper,
                'FooFoo',
                'FooFooDto',
                forMember((d) => d.foo.foo, fromValue('FooFoo override'))
            );

            let foo: FooFoo = {
                foo: {
                    foo: 'some string',
                },
            };
            let dto = mapper.map<FooFoo, FooFooDto>(
                foo,
                'FooFoo',
                'FooFooDto'
            );
            expect(dto.foo.foo).toEqual('FooFoo override');
        });

        it('should map with mapping configuration for depth 3', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(mapper, 'FooFoo', 'FooFooDto');
            createMap<Foo, FooDto>(
                mapper,
                'Foo',
                'FooDto',
                forMember((d) => d.foo.foo.foo, fromValue('Foo override'))
            );

            let foo: Foo = {
                foo: {
                    foo: {
                        foo: 'some string',
                    },
                },
            };
            let dto = mapper.map<Foo, FooDto>(foo, 'Foo', 'FooDto');
            expect(dto.foo.foo.foo).toEqual('Foo override');
        });
    });
});
