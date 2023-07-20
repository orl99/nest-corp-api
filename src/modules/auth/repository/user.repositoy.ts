import { JwtPayloadI } from './../models/jwt-payload.interface';
import { AuthResponseI } from './../models/auth-response.interface';
import { Injectable, ConflictException, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTOS
import { AuthCredentialsDto } from './../dto/auth-credentials.dto';
// interfaces
import { UserI } from '../models/user.interface';
// bcrypt hash
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('Users') private readonly userModel: Model<UserI>){}

    public async singUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        const {password} = authCredentialsDto;
        authCredentialsDto.salt = await bcrypt.genSalt()
        authCredentialsDto.password = await this.hashPassword(password, authCredentialsDto.salt)
        const newUser = new this.userModel(authCredentialsDto);
        console.log('New User', newUser);
        try {
            await newUser.save();
            console.log('saved')
            return true;
        } catch (error) {
            if(error.code == 11000) {
                console.log('error', error);
                throw new ConflictException('Email already created');
            } else {
                console.log('error', error);
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    // SignIn
    public async signIn(email: string, password: string): Promise<AuthResponseI> {
        console.log('email', email);
        const findUser = await this.userModel.findOne({ email: email });
        console.log('User found', findUser);
        if (!findUser) {
            const userNotFound: AuthResponseI = {
                status: false,
                httpStatus: HttpStatus.FORBIDDEN,
                message: 'Las credenciales no son correctas'
            };
            return userNotFound;
        }
        const comparePassword = await this.hashPassword(password, findUser.salt);

        if (comparePassword !== findUser.password) {
            const wrongPassword: AuthResponseI = {
                status: false,
                httpStatus: HttpStatus.FORBIDDEN,
                message: 'Las credenciales no son correctas'
            } 
            return wrongPassword;
        }

        const userAuth: AuthResponseI = {
            status: true,
            httpStatus: HttpStatus.OK,
            message: `Bienvenid@ ${findUser.userfullname}`,
            data: {
                email: findUser.email,
                role: findUser.role,
                department: findUser.department,
                userfullname: findUser.userfullname
            }
        }
        return userAuth;
    }

    public async findUser(email: string): Promise<UserI> {
        const user = await this.userModel.findOne({email: email})
        return user;
    }


}