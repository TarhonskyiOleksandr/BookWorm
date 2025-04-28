/* eslint-disable prettier/prettier */
// src/auth/jwt/jwt-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ITokenPayload } from '../types/token-payload.interface';

@Injectable()
export class JwtConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: ITokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION'),
    });
  }

  async generateRefreshToken(payload: ITokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION'),
    });
  }

  getAccessTokenExpiration(): number {
    const expiresIn = this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION');
    return this.parseExpiration(expiresIn) * 1000;
  }

  getRefreshTokenExpiration(): number {
    const expiresIn = this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION');
    return this.parseExpiration(expiresIn) * 1000;
  }

  // parse for cookies miliseconds
  private parseExpiration(expiration: string): number {
    const unit = expiration.slice(-1);
    const value = parseInt(expiration.slice(0, -1));

    switch (unit) {
      case 'd':
        return value * 24 * 60 * 60;
      case 'h':
        return value * 60 * 60;
      case 'm':
        return value * 60;
      case 's':
        return value;
      default:
        return parseInt(expiration);
    }
  }
}
