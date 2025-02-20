import type { Address, PascalAddress, SnakeAddress } from '../models/address';
import type { Avatar, PascalAvatar, SnakeAvatar } from '../models/avatar';
import type { Bio, PascalBio, SnakeBio } from '../models/bio';
import type { Job, PascalJob, SnakeJob } from '../models/job';
import type { PascalUser, SnakeUser, User } from '../models/user';

export function getUser(
    partials: {
        user?: Partial<User>;
        job?: Partial<Job>;
        bio?: Partial<Bio>;
        avatar?: Partial<Avatar>;
    } = {}
) {
    let address1: Address = {
        street: '123 Acme Dr',
        city: 'Sim',
        state: 'Show Me',
    };

    let address2: Address = {
        street: '456 Rubik Dr',
        city: 'Some',
        state: 'October',
    };

    let avatar = {
        source: 'Internet',
        url: 'url.com',
        ...(partials.avatar ?? {}),
    } as Avatar;

    let bio: Bio = {
        text: 'Introvert-ish',
        birthday: new Date('10/14/1991'),
        addresses: [address1, address2],
        avatar,
        ...(partials.bio ?? {}),
    };

    let userJob = {
        title: 'Developer',
        annualSalary: 99999,
        ...(partials.job ?? {}),
    } as Job;

    return {
        firstName: 'Chau',
        lastName: 'Tran',
        job: userJob,
        bio,
        logins: [
            new Date('01/10/2021'),
            new Date('05/11/2021'),
            new Date('12/12/2021'),
        ],
        ...(partials.user ?? {}),
    } as User;
}

export function getPascalUser(
    partials: {
        user?: Partial<PascalUser>;
        job?: Partial<PascalJob>;
        bio?: Partial<PascalBio>;
        avatar?: Partial<PascalAvatar>;
    } = {}
) {
    let address1: PascalAddress = {
        Street: '123 Acme Dr',
        City: 'Sim',
        State: 'Show Me',
    };

    let address2: PascalAddress = {
        Street: '456 Rubik Dr',
        City: 'Some',
        State: 'October',
    };

    let avatar = {
        Source: 'Internet',
        Url: 'url.com',
        ...(partials.avatar ?? {}),
    } as PascalAvatar;

    let userBio: PascalBio = {
        Text: 'Introvert-ish',
        Birthday: new Date('10/14/1991'),
        Addresses: [address1, address2],
        Avatar: avatar,
        ...(partials.bio ?? {}),
    };

    let userJob = {
        Title: 'Developer',
        AnnualSalary: 99999,
        ...(partials.job ?? {}),
    } as PascalJob;

    return {
        FirstName: 'Chau',
        LastName: 'Tran',
        Job: userJob,
        Bio: userBio,
        Logins: [
            new Date('01/10/2021'),
            new Date('05/11/2021'),
            new Date('12/12/2021'),
        ],
        ...(partials.user ?? {}),
    } as PascalUser;
}

export function getSnakeUser(
    partials: {
        user?: Partial<SnakeUser>;
        job?: Partial<SnakeJob>;
        bio?: Partial<SnakeBio>;
        avatar?: Partial<SnakeAvatar>;
    } = {}
) {
    let address1: SnakeAddress = {
        street: '123 Acme Dr',
        city: 'Sim',
        state: 'Show Me',
    };

    let address2: SnakeAddress = {
        street: '456 Rubik Dr',
        city: 'Some',
        state: 'October',
    };

    let avatar = {
        source: 'Internet',
        url: 'url.com',
        ...(partials.avatar ?? {}),
    } as SnakeAvatar;

    let userBio: SnakeBio = {
        text: 'Introvert-ish',
        birthday: new Date('10/14/1991'),
        addresses: [address1, address2],
        avatar,
        ...(partials.bio ?? {}),
    };

    let userJob = {
        title: 'Developer',
        annual_salary: 99999,
        ...(partials.job ?? {}),
    } as SnakeJob;

    return {
        first_name: 'Chau',
        last_name: 'Tran',
        job: userJob,
        bio: userBio,
        logins: [
            new Date('01/10/2021'),
            new Date('05/11/2021'),
            new Date('12/12/2021'),
        ],
        ...(partials.user ?? {}),
    } as SnakeUser;
}
