import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { UserRepositoryPersistence } from './infrastructure/user.repository.persistence';
import { IUserRepository } from './domain/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'testrppgfaicalexpressionanalysis',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    { provide: IUserRepository, useClass: UserRepositoryPersistence },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
