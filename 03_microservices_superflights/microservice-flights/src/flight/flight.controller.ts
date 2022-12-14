import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller()
export class FlightController {

    constructor(
        private readonly flightService: FlightService,
        // private readonly passengerService: PassengerService
    ) {}

    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @MessagePattern(FlightMSG.FIND_ALL)
    findAll() {
        return this.flightService.findAll();
    }

    @MessagePattern(FlightMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.flightService.findById(id);
    }

    @MessagePattern(FlightMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.flightService.findByIdAndUpdate(payload.flightDTO, payload.id);
    }
    
    @MessagePattern(FlightMSG.DELETE)
    delete(@Payload() id: string) {
        return this.flightService.findByIdAndDelete(id);
    }
    
    @MessagePattern(FlightMSG.ADD_PASSENGER)
    addPassenger(@Payload() payload: any) {
        return this.flightService.addPassenger(payload.flightId, payload.passengerId);
    }
}
