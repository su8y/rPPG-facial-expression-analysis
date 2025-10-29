import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
})
export class AppModule {}
