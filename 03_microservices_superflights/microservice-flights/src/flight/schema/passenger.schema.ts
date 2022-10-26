import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type PassengerDocument = Passenger & Document;

@Schema()
export class Passenger {
    @Prop({ required: true })
    name: string;

    @Prop({ 
        required: true,
        unique: true,
        index: true
    })
    email: string;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);