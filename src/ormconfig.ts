import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { TypeOrmLoggerContainer } from "./utils/typeorm-logger.container";

//이게 필요한 것 같음.
export const ormconfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        // type: 'sqlite',
        // type: 'postgres',
        //type: 'aurora-mysql',
        type: 'mysql',
        database: configService.get('DB'),
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        charset: 'utf8mb4',
        synchronize: true,//for dev
        logging: true,
        ssl: false,
        logger: TypeOrmLoggerContainer.ForConnection(
            //'default',
            'all',
            [
              'query',
              'schema',
              'error',
              'warn',
              'info',
              'log',
              'migration',
            ],
          ),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
}