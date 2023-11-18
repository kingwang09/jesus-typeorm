import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { TypeOrmLoggerContainer } from "./util/typeorm-logger.container";

//이게 필요한 것 같음.
export const ormconfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB'),
        synchronize: true,//for dev
        logging: true,
        // logger: TypeOrmLoggerContainer.ForConnection(
        //     //'default',
        //     'all',
        //     [
        //       'query',
        //       'schema',
        //       'error',
        //       'warn',
        //       'info',
        //       'log',
        //       'migration',
        //     ],
        //   ),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
}