import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global exception filter
  app.useGlobalFilters(new AllExceptionFilter());
  // Add global interceptor
  app.useGlobalInterceptors(new TimeOutInterceptor());

  await app.listen(process.env.PORT || 3000);
  
}

bootstrap();
