import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlightMSG, PassengersMSG } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';

@Controller('api/v2/flight')
export class FlightController {

    constructor(private readonly clientProxy: ClientProxySuperFlights) {}

    private _clientProxyFlights = this.clientProxy.clientProxyFlights();
    private _clientProxyPassengers = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlights.send(FlightMSG.CREATE, flightDTO);
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlights.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param() id: string): Observable<IFlight> {
        return this._clientProxyFlights.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param() id: string, @Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlights.send(FlightMSG.UPDATE, { id, flightDTO });
    }

    @Delete(':id')
    delete(@Param() id: string): Observable<any> {
        return this._clientProxyFlights.send(FlightMSG.DELETE, id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    ): Promise<Observable<IFlight>> {
        const passenger = await this._clientProxyPassengers.send(PassengersMSG.FIND_ONE, passengerId);
        if ( !passenger ) throw new NotFoundException('Passenger not found.', 'NOT_FOUND');
        
        return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, { flightId, passengerId });
    }
}
