import {User} from './user.entity';

export interface IUserRepository {
    save(user: User): Promise<User>;

    findByUsername(username: string): Promise<User | null>;
}

export const IUserRepository = Symbol('IUserRepository');
