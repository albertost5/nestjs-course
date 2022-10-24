import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightDTO } from './dto/flight.dto';
import { Flight, FlightDocument } from './schema/flight.schema';

@Injectable()
export class FlightService {

    constructor(@InjectModel(Flight.name) private readonly flightModel: Model<FlightDocument>) {}

    async create(flightDTO: FlightDTO): Promise<FlightDocument> {
        return await this.flightModel.create(flightDTO);
    }
    
    async findAll(): Promise<FlightDocument[]> {
        return await this.flightModel.find().populate('passengers');
    }

    async findById(id: string): Promise<FlightDocument> {
        return await this.flightModel.findById(id).populate('passengers');
    }

    async findByIdAndUpdate(flightDTO: FlightDTO, id: string): Promise<FlightDocument> {
        return await this.flightModel.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    async findByIdAndDelete(id: string) {
        const flightDeleted = await this.flightModel.findByIdAndDelete(id);
        if ( !flightDeleted ) throw new HttpException(`Couldn't delete the flight with id ${id}`, HttpStatus.NOT_FOUND);
        return {
            status: HttpStatus.OK,
            message: 'Deleted!'
        }
    }

    async addPassenger(flightId: string, passengerId: string): Promise<FlightDocument> {

        return await this.flightModel.findByIdAndUpdate(flightId, 
            {
                $addToSet: {
                    passengers: passengerId
                }
            },
            {
                new: true
            }
        ).populate('passengers');
    }
}
