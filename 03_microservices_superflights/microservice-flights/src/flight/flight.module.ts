import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flight, FlightSchema } from './schema/flight.schema';
import { Passenger, PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Flight.name,
        useFactory: () => {
          const schema = FlightSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        }
      },
      {
        name: Passenger.name,
        useFactory: () => {
          return PassengerSchema
        }
      }
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
