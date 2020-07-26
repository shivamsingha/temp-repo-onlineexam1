import { AuthenticateOptions } from 'passport';
import { IStrategyOptions } from 'passport-local';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { SignOptions } from 'jsonwebtoken';

export const JwtSecret = process.env.JWT_SECRET || 'asdf;kljqwerpm!@#$%';

export const LocalOptions: IStrategyOptions = {
  usernameField: 'emailphone',
  passwordField: 'password'
};

export const JwtSignOptions: SignOptions = {
  algorithm: 'HS512',
  expiresIn: '30m'
};

export const JWTOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['HS512'],
  ignoreExpiration: false,
  secretOrKey: JwtSecret
};

export const passportAuthenticateOptions: AuthenticateOptions = {
  session: false
};
