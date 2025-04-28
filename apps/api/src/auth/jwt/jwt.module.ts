import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtConfigService } from './jwt-config.service';

@Module({
  imports: [NestJwtModule.register({})],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtModule {}
