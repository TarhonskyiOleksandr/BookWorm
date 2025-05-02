/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CookieOptions, Response } from 'express';

import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtConfigService } from './jwt/jwt-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  private getCookieOptions = (maxAgeMilliseconds?: number): CookieOptions => ({
    ...(maxAgeMilliseconds ? { maxAge: maxAgeMilliseconds } : {}),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  async verifyUser(email: string, password: string) {
    const user = await this.userService.findUser({ email }, { password: true });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private async issueTokensAndSetCookies(user: User, res: Response) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtConfigService.generateAccessToken(payload);
    const refreshToken = await this.jwtConfigService.generateRefreshToken(payload);

    const accessExp = this.jwtConfigService.getAccessTokenExpiration();
    const refreshExp = this.jwtConfigService.getRefreshTokenExpiration();

    res.cookie('access_token', accessToken, this.getCookieOptions(accessExp));
    res.cookie('refresh_token', refreshToken, this.getCookieOptions(refreshExp));

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(user: User, res: Response) {
    await this.issueTokensAndSetCookies(user, res);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      message: 'Login successful',
    };
  }

  async refreshTokens(user: User, res: Response) {
    await this.issueTokensAndSetCookies(user, res);
    return { message: 'Tokens refreshed' };
  }

  async logout(res: Response) {
    res.cookie('access_token', '', this.getCookieOptions(0));
    res.cookie('refresh_token', '', this.getCookieOptions(0));

    return { message: 'Logout successful' };
  }
}
