import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {
  JwtSecret,
  JwtSignOptions,
  passportAuthenticateOptions
} from '../utils';

const router = Router();

router.post('/', (req, res) => {
  passport.authenticate('local', passportAuthenticateOptions, (err, user) => {
    if (err || !user) return res.status(403).send();

    req.login(user, passportAuthenticateOptions, (err) => {
      if (err) return res.status(403).send();

      const token = jwt.sign({ userId: user }, JwtSecret, JwtSignOptions);
      return res.json({ token });
    });
  })(req, res);
});

export default router;
