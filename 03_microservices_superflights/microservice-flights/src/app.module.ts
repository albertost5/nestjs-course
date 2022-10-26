import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FlightModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
