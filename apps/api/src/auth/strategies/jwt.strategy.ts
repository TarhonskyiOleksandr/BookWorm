import { createJwtStrategy } from './base-jwt.strategy';

export const JwtStrategy = createJwtStrategy({
  cookieName: 'access_token',
  secretEnvKey: 'JWT_ACCESS_SECRET',
  strategyName: 'jwt',
});
