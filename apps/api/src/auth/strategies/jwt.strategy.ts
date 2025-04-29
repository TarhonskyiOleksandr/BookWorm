import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ITokenPayload } from '../types/token-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configServise: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.access_token,
      ]),
      secretOrKey: configServise.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: ITokenPayload) {
    const user = await this.userService.findUser({ id: payload.sub });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
