import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ormconfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { TosspaymentsModule } from './tosspayments/tosspayments.module';



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
    AuthModule,
    TosspaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
