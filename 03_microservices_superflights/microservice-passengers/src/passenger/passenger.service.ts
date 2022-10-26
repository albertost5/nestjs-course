import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPassenger } from "src/common/interfaces/passenger.interface";
import { PASSENGER } from "src/common/models/models";
import { PassengerDTO } from "./dto/passenger.dto";

export class PassengerService {

    constructor(@InjectModel(PASSENGER.name) private readonly passengerModel: Model<IPassenger>) {}

    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        return await this.passengerModel.create(passengerDTO);
    }

    async findAll(): Promise<IPassenger[]> {
        return await this.passengerModel.find();
    }

    async findById(id: string): Promise<IPassenger> {
        return await this.passengerModel.findById(id);
    }

    async findByIdAndUpdate(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
        return await this.passengerModel.findByIdAndUpdate(id, passengerDTO, {new: true});
    }

    async findByIdAndDelete(id: string) {
        const passengerDeleted = await this.passengerModel.findByIdAndDelete(id);
        if ( !passengerDeleted ) throw new HttpException(`Couldn't delete the passenger with id ${id}`, HttpStatus.BAD_REQUEST);
        return { status: HttpStatus.OK, message: 'Deleted' };
    }
}
