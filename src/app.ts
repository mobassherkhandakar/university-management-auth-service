import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import gobalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRouter } from './app/modules/user/user.router';

const app: Application = express();
//cors
app.use(cors());
//morgan
app.use(morgan('dev'));

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test
app.use('/api/v1/user', UserRouter);

// app.get('/', (req: Request, res: Response, next) => {
//   throw new ApiError(500, 'ore baba error');
// });
//globalErrorHandler
app.use(gobalErrorHandler);

export default app;
