import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Document } from 'mongoose';
import { PassengerDocument } from "./passenger.schema";


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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }] })
    passengers: PassengerDocument[];
    
    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);