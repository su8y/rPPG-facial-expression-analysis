import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
};