import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
} from '@automapper/core';

export class UserEntity {
    @AutoMap()
    id!: number;

    @AutoMap()
    name!: string;

    @AutoMap()
    sharedInfo!: string;

    password!: string;
}

export class UserResponse {
    @AutoMap()
    id!: number;

    @AutoMap()
    name!: string;

    @AutoMap()
    sharedInfo!: string;
}

describe('Issue 497', () => {
    let mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should map properly', () => {
        createMap(mapper, UserEntity, UserResponse);

        let user = new UserEntity();
        user.id = 123;
        user.name = 'Chau';
        user.sharedInfo = 'info';

        let responses = mapper.mapArray([user], UserEntity, UserResponse);
        expect(responses).toEqual([
            { id: 123, name: 'Chau', sharedInfo: 'info' },
        ]);
    });
});
