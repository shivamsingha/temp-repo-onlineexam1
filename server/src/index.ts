import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import csrf, { CookieOptions } from 'csurf';
import bodyParser from 'body-parser';
import helmet, { IHelmetConfiguration } from 'helmet';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import { Passport } from './utils';

const csrfCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict'
};

const corsOptions: CorsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true
};

const helmetConfig: IHelmetConfiguration = {
  frameguard: {
    action: 'deny'
  },
  permittedCrossDomainPolicies: true,
  referrerPolicy: {
    policy: 'no-referrer'
  }
};

const app = express();
const csrfProtection = csrf({ cookie: csrfCookieOptions });
const passport = new Passport().usePassport();

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403);
  res.send();
};

app.use(helmet(helmetConfig));
app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('combined'));

app.get('/', csrfProtection, (req, res) => {
  res.send({ 'CSRF-Token': req.csrfToken(), test: 1 });
});

app.post(
  '/',
  csrfProtection,
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('ok');
  }
);

app.use(errorHandler);
app.listen(3000, () => console.log(`Listening on port 3000`));
