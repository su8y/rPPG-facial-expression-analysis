import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { UserRepositoryPersistence } from './infrastructure/user.repository.persistence';
import {IUserRepository} from "./domain/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    { provide: IUserRepository, useClass: UserRepositoryPersistence },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
