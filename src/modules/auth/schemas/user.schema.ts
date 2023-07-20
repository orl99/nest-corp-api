import { Schema } from 'mongoose';
export const User = new Schema({
    userfullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    salt: String
})