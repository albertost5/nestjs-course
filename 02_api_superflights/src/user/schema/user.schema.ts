import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});