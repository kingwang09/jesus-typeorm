import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';//이것도 중요함.: import session from 'express-session'하면 안됨.
import * as dotenv from 'dotenv/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const test = process.env.TEST;
  console.log(test);
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //auth: cookie setting
  app.use(cookieParser());

  //auth: passport & session setting
  app.use(
    session({
      secret: 'important-key',//.env로 변경예정
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 1000 * 60 * 60 }, //1H (milsecond)
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // View engine 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs'); // EJS 템플릿 엔진 설정
  
  await app.listen(4000);
}
bootstrap();
