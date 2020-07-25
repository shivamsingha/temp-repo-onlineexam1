import { IStrategyOptions } from 'passport-local';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

export const LocalOptions: IStrategyOptions = {
  usernameField: 'emailphone',
  passwordField: 'password'
};

export const JWTOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['HS512'],
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET || 'asdf;kljqwerpm!@#$%'
};
