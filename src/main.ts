import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('[main] process.env.ENCRYPTION_KEY', process.env.ENCRYPTION_KEY);
  console.log('[main] MESSAGE: ', process.env.MESSAGE);
  console.log('[main] NODE_ENV: ', process.env.NODE_ENV);
  console.log('[main] cwd: ', process.cwd());

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
