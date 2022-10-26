import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengersMSG } from 'src/common/constants';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';


@Controller()
export class PassengerController {

    constructor(private readonly passengerService: PassengerService) {}

    @MessagePattern(PassengersMSG.CREATE)
    create(@Payload() passengerDTO: PassengerDTO) {
        return this.passengerService.create(passengerDTO);
    }

    @MessagePattern(PassengersMSG.FIND_ALL)
    findAll() {
        return this.passengerService.findAll();
    }

    @MessagePattern(PassengersMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.passengerService.findById(id);
    }

    @MessagePattern(PassengersMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.passengerService.findByIdAndUpdate(payload.id, payload.passengerDTO);
    }

    @MessagePattern(PassengersMSG.DELETE)
    delete(@Payload() id: string) {
        return this.passengerService.findByIdAndDelete(id);
    }
}
