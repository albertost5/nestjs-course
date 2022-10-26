import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const PassengerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    } 
}, { timestamps: true });

