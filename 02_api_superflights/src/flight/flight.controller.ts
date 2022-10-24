import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';


@ApiTags('flights')
@Controller('api/v1/flight')
export class FlightController {

    constructor(
        private readonly flightService: FlightService,
        private readonly passengerService: PassengerService
    ) {}

    @Post()
    create(@Body() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @Get()
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.flightService.findById(id);
    }

    @Put(':id')
    findByIdAndUpdate(@Body() flightDTO: FlightDTO, @Param('id') id: string) {
        return this.flightService.findByIdAndUpdate(flightDTO, id);
    }
    
    @Delete(':id')
    findByIdAndDelete(@Param('id') id: string) {
        return this.flightService.findByIdAndDelete(id);
    }
    
    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {

        const passengerToAdd = await this.passengerService.findById(passengerId);
        if ( !passengerToAdd ) throw new HttpException(`Couldn't find the passenger with the id: ${passengerId}`, HttpStatus.NOT_FOUND);
        
        return this.flightService.addPassenger(flightId, passengerId);
    }
}
