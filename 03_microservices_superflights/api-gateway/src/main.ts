import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global exception filter
  app.useGlobalFilters(new AllExceptionFilter());
  // Add global interceptor
  app.useGlobalInterceptors(new TimeOutInterceptor());
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Superflight API')
    .setDescription('Scheduled Flights App')
    .setVersion('2.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document,{
    swaggerOptions: {
      filter: true
    }
  });

  // Start app
  await app.listen(process.env.PORT || 3000);
  
}

bootstrap();
