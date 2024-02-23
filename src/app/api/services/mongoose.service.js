import mongoose from 'mongoose';
import { mongo } from '@/utils/globals';
import logger from '@/utils/logger';

require('dotenv').config();
/**
 * Makes a connection to the mongoDB (will use existing if it can)
 * @author Alec Painter
 */
export async function connect() {
  try {
    mongoose.connect(
      `${mongo.domain}/${mongo.db}?${mongo.queryString}`,
      mongo.clientOptions,
    );
    const client = mongoose.connection;

    client.on('connected', () => {
      logger.info(`MongoDB connected to '${mongo.db}' successfully`);
    });

    client.on('error', (err) => {
      logger.error('MongoDB connection error: ' + err);
      process.exit();
    });

    client.on('disconnected', () => {
      logger.warn('MongoDB connection disconnected');
    });
  } catch (error) {
    logger.error(error);
  }
}
