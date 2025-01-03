import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';
import { simpleUserProfileFactory } from './profiles/simple-user.profile';

describe('Map - Map Callback', () => {
    let mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with mapping callbacks', () => {
        let beforeMap = jest.fn();
        let afterMap = jest.fn();

        addProfile(mapper, simpleUserProfileFactory({ beforeMap, afterMap }));

        let simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        let dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto);
        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });

    it('should map with map callbacks', () => {
        let beforeMap = jest.fn();
        let afterMap = jest.fn();

        addProfile(mapper, simpleUserProfileFactory());

        let simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        let dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });

        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });

    it('should run with map callbacks if both map/mapping callbacks are provided', () => {
        let beforeMap = jest.fn();
        let afterMap = jest.fn();
        let mappingBeforeMap = jest.fn();
        let mappingAfterMap = jest.fn();

        addProfile(
            mapper,
            simpleUserProfileFactory({
                beforeMap: mappingBeforeMap,
                afterMap: mappingAfterMap,
            })
        );

        let simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();
        expect(mappingBeforeMap).not.toHaveBeenCalled();
        expect(mappingAfterMap).not.toHaveBeenCalled();

        let dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });
        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
        expect(mappingBeforeMap).not.toHaveBeenCalled();
        expect(mappingAfterMap).not.toHaveBeenCalled();
    });

    it('should skip mapping callbacks with mapArray', () => {
        let beforeMap = jest.fn();
        let afterMap = jest.fn();

        addProfile(mapper, simpleUserProfileFactory({ beforeMap, afterMap }));

        let simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        let dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto);
        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();
    });

    it('should run map callbacks with mapArray', () => {
        let beforeMap = jest.fn();
        let afterMap = jest.fn();

        addProfile(mapper, simpleUserProfileFactory());

        let simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        let dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });
        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });
});

function assertSimpleUser(dto: SimpleUserDto, user: SimpleUser) {
    expect(dto.firstName).toEqual(user.firstName);
    expect(dto.lastName).toEqual(user.lastName);
    expect(dto.fullName).toEqual(user.firstName + ' ' + user.lastName);
}
