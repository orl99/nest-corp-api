import { AuthResponseI } from './../../models/auth-response.interface';
import { AuthCredentialsSignInDto } from './../../dto/auth-credentials-signin.dto';
import { AuthService } from './../../services/auth/auth.service';
import { AuthCredentialsDto } from './../../dto/auth-credentials.dto';
import { Controller, Post, Body, Res, HttpStatus, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/singup')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async singUpUser(@Res() res,  @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
        console.log('credentials', authCredentialsDto);
        const userCreated = await this.authService.signUpUser(authCredentialsDto);
        console.log('user', userCreated);
        if (!userCreated) {
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: 'Email already created, please use another one',
                status: false
            })
        }
        return res.status(HttpStatus.OK).json({
            message: 'User uccessfully Created',
            status: true
        })
    }

    @Post('/singIn')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async singInUser(@Res() res, @Body() authCredentialsSignInDto: AuthCredentialsSignInDto): Promise<AuthResponseI> {
        console.log(authCredentialsSignInDto)
        const findUser = await this.authService.signIn(authCredentialsSignInDto);
        return res.status(HttpStatus.OK).json(findUser);
        //if (findUser.status){
        //    return res.status(HttpStatus.OK).json(findUser);
        //}
        //if(!findUser.status){
        //    return res.status(HttpStatus.FORBIDDEN).json(findUser);
        //}
    }

    @Get('/validateJwt')
    @UseGuards(AuthGuard())
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async validateUserJwt(@Res() res): Promise<{statusCode: number; message: string;}>{
        return res.status(HttpStatus.OK).json({
            statusCode: 200,
            message: 'Token'
        })
    }
}
