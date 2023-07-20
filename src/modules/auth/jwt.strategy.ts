import { UserI } from './models/user.interface';
import { UserRepository } from './repository/user.repositoy';
import { JwtPayloadI } from './models/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topbmas123secret'
        });
    }

    async validate(payload: JwtPayloadI): Promise<UserI> {
        const { email } = payload;
        const user = await this.userRepository.findUser(email);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}