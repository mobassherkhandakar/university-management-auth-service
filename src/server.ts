import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is conncected successfully');
    app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Faild to connect database connection', error);
  }
}
bootstrap();
