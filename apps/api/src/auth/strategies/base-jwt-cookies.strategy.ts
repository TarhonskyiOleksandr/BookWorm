import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ITokenPayload } from '../types/token-payload.interface';
import { UserService } from 'src/user/user.service';

interface StrategyOptions {
  cookieName: string;
  secretEnvKey: string;
  strategyName: string;
}

export const createJwtStrategy = ({
  cookieName,
  secretEnvKey,
  strategyName,
}: StrategyOptions) => {
  @Injectable()
  class JwtCustomStrategy extends PassportStrategy(Strategy, strategyName) {
    constructor(
      readonly configServise: ConfigService,
      readonly userService: UserService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req: Request) => req.cookies?.[cookieName],
        ]),
        secretOrKey: configServise.getOrThrow(secretEnvKey),
      });
    }

    async validate(payload: ITokenPayload) {
      const user = await this.userService.findUser({ id: payload.sub });
      if (!user) throw new UnauthorizedException();
      return user;
    }
  }

  return JwtCustomStrategy;
};
