import { Document } from 'mongoose';

export interface UserI extends Document{
    userfullname: string;
    password: string;
    email: string;
    role: string;
    department: string;
    salt: string;
}