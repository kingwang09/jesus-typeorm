import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ormconfig } from './ormconfig';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    TypeOrmModule.forRootAsync(ormconfig),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'jesus-typeorm.sqlite',
    //   entities: [
    //     User,
    //   ],
    //   synchronize: true,//for dev
    //   logging: true,
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
