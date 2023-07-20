import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto{

    @IsString()
    @MinLength(1)
    @MaxLength(25)
    userfullname: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    department: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    role: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, { message: 'wrong email' })
    email: string;

    salt?: any;
}