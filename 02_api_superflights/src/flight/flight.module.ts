import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerModule } from 'src/passenger/passenger.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flight, FlightSchema } from './schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Flight.name,
      useFactory: () => {
        const schema = FlightSchema;
        schema.plugin(require('mongoose-autopopulate'));
        return schema;
      }
    }]),
    PassengerModule
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
