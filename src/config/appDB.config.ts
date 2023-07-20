import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const AppDataBaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 8080,
    database: 'bmasc-corp-app',
    username: 'root',
    password: '',
    entities: [__dirname + '/src/modules/auth/entities/user.entity.ts'],
    synchronize: true,
}