import passport, { PassportStatic } from 'passport';
import {
  Strategy as LocalStrategy,
  VerifyFunction as LocalVerifyFunction
} from 'passport-local';
import {
  Strategy as JWTStrategy,
  VerifyCallback as JWTVerifyCallback
} from 'passport-jwt';
import { JWTOptions, LocalOptions } from './passportConfig';

class Passport {
  constructor() {
    this.LocalStrategy = new LocalStrategy(LocalOptions, this.LocalVerify);
    this.JWTStrategy = new JWTStrategy(JWTOptions, this.JWTverify);
  }
  LocalStrategy: LocalStrategy;
  JWTStrategy: JWTStrategy;

  LocalVerify: LocalVerifyFunction = (emailphone, password, done) =>
    emailphone === 'test@user' && password === 'password'
      ? done(null, emailphone)
      : done(null, false);

  JWTverify: JWTVerifyCallback = (payload, done) =>
    payload.userId ? done(null, payload.userId) : done(null, false);

  usePassport = (): PassportStatic => {
    passport.use(this.LocalStrategy);
    passport.use(this.JWTStrategy);
    return passport;
  };
}

export default Passport;
