import { Inject, Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {User} from "../domain/user.entity";
import {GetUserCommand} from "./dto/get-user.command";
import {SignUpUserCommand} from "./dto/sign-up-user.command";
import {IUserRepository} from "../domain/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

    async signUp(command: SignUpUserCommand): Promise<User> {
        const { username, password } = command;

        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User();
        newUser.username = username;
        newUser.password = hashedPassword;

        return this.userRepository.save(newUser);
    }

    async getUser(command: GetUserCommand): Promise<User | null> {
        const {username} = command;
        return this.userRepository.findByUsername(username);
    }

}
