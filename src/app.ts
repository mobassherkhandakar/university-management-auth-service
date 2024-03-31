import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
// import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import gobalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from './shared/httpStatus';

const app: Application = express();
//cors
app.use(cors());
app.use(cookieParser());
//morgan
// app.use(morgan('dev'));

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1', routes);
//Not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messsage: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api is not found',
      },
    ],
  });
  next();
});

//globalErrorHandler
app.use(gobalErrorHandler);

export default app;
