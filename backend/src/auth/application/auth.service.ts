import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { SignUpUserCommand } from './dto/sign-up-user.command';
import { IUserRepository } from '../domain/user.repository';
import { SignInUserCommand } from './dto/sign-in-user.command';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
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

  async signIn(command: SignInUserCommand): Promise<{ accessToken: string }> {
    const { username, password } = command;
    const user = await this.userRepository.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }
}
