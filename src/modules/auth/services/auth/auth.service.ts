import { AuthResponseI } from './../../models/auth-response.interface';
import { JwtPayloadI } from './../../models/jwt-payload.interface';
import { AuthCredentialsSignInDto } from './../../dto/auth-credentials-signin.dto';
import { UserRepository } from './../../repository/user.repositoy';
import { AuthCredentialsDto } from './../../dto/auth-credentials.dto';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    public async signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        console.log(authCredentialsDto);
        return this.userRepository.singUp(authCredentialsDto);
    }

    public async signIn(authCredentialsSignInDto: AuthCredentialsSignInDto): Promise<AuthResponseI> {
        const { email, password } = authCredentialsSignInDto; 
        const userAuthStatus = await this.userRepository.signIn(email, password);

        // Return if the user does not exists or wrong password
        if(!userAuthStatus.status) {
            const badRequestResponse = userAuthStatus;
            badRequestResponse.token = null;
            return badRequestResponse;
        }

        const payload: JwtPayloadI = {
            email: userAuthStatus.data['email'],
            role:  userAuthStatus.data['role'],
            department:  userAuthStatus.data['department'],
            userfullname: userAuthStatus.data['userfullname']
        }
        console.log('payload', payload);

        const accesToken = await this.jwtService.sign(payload);

        const response: AuthResponseI = {
            status: userAuthStatus.status,
            httpStatus: userAuthStatus.httpStatus,
            message: userAuthStatus.message,
            token: accesToken
        }

        return response;
    }
}
