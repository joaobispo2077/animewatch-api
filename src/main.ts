import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AuditInterceptor } from './shared/interceptors/audit.interceptor';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AuditInterceptor());

  await app.listen(PORT);

  Logger.log(`Listening at http://localhost:${PORT}`);
}
bootstrap();
