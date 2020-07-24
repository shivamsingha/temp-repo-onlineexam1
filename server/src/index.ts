import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import csrf, { CookieOptions } from 'csurf';
import bodyParser from 'body-parser';
import helmet, { IHelmetConfiguration } from 'helmet';
import cors, { CorsOptions } from 'cors';

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

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403);
  res.send();
};

app.use(helmet(helmetConfig));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', csrfProtection, (req, res) => {
  res.send({ 'CSRF-Token': req.csrfToken(), test: 1 });
});

app.post('/', csrfProtection, (req, res) => {
  res.send(JSON.stringify(req.headers));
});

app.use(errorHandler);
app.listen(3000);
