import { createJwtStrategy } from './base-jwt.strategy';

export const RefreshJwtStrategy = createJwtStrategy({
  cookieName: 'refresh_token',
  secretEnvKey: 'JWT_REFRESH_SECRET',
  strategyName: 'jwt-refresh',
});
