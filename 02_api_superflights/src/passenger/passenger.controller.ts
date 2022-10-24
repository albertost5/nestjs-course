import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

    constructor(private readonly passengerService: PassengerService) {}

    @Post()
    create(@Body() passengerDTO: PassengerDTO) {
        return this.passengerService.create(passengerDTO);
    }

    @Get()
    findAll() {
        return this.passengerService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.passengerService.findById(id);
    }

    @Put(':id')
    findByIdAndUpdate(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
        return this.passengerService.findByIdAndUpdate(id, passengerDTO);
    }

    @Delete(':id')
    findByIdAndDelete(@Param('id') id: string) {
        return this.passengerService.findByIdAndDelete(id);
    }
}
