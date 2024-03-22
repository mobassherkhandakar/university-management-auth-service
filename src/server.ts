import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger } from './shared/logger';

process.on('uncaughtException', error => {
  logger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is conncected successfully');
    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Faild to connect database connection', error);
  }
  process.on('unhandledRejection', error => {
    logger.error(error);
    if (server) {
      server.close(() => {
        logger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
process.on('SIGTERM', () => {
  logger.error('SIGTERM is Recived');
  if (server) {
    server.close();
  }
});

bootstrap();
