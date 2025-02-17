import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { Bar, Foo, FooDto } from './foo';
import { FooProfile } from './foo.profile';

describe('fooProfile', () => {
    let mapper: Mapper;
    beforeEach(async () => {
        var moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMapperToken(),
                    useValue: createMapper({
                        strategyInitializer: classes(),
                    }),
                },
                FooProfile,
            ],
        }).compile();
        mapper = moduleRef.get<Mapper>(getMapperToken());
    });

    it('should map', () => {
        var foo = new Foo();
        foo.foo = 'foo';
        foo.bar = new Bar();
        foo.bar.bar = 'bar';

        var dto = mapper.map(foo, Foo, FooDto);
        expect(dto.fooDto).toEqual(foo.foo);
        expect(dto.barDto.barDto).toEqual(foo.bar.bar);
    });
});
