import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {IUserRepository} from '../domain/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET ?? 'testrppgfaicalexpressionanalysis',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            return new UnauthorizedException('Please check your login credentials');
        }

        return user;
    }
}

export class JwtPayload {
    id!: number;
    username!: string;
}
