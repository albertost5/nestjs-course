import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { IPassenger } from "src/common/interfaces/passenger.interface";

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
    @Prop({ required: true})
    pilot: string;

    @Prop({ required: true})
    airplane: string;

    @Prop({ required: true})
    destinationCity: string;

    @Prop({ required: true})
    flightDate: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengers' }] })
    passengers: IPassenger[];
    
    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);