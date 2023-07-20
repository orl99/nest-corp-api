import { HttpStatus } from '@nestjs/common';
export interface AuthResponseI {
    message: string;
    status: boolean;
    httpStatus: HttpStatus;
    data?: any;
    token?: string;
}