import mongoose from 'mongoose';
import { mongo } from '@/utils/globals';
import logger from '@/utils/logger';

require('dotenv').config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB before processing a transaction. Modified
 * to globally cache connections. While it probably wouldn't cause
 * any production issues, Next.js' hot reload causes a memory leak
 * as many new connections are generated each save. So we cache just
 * one connection to the database, instead.
 * @author Alec Painter
 * @author Toby Keegan
 */
export async function connect() {
  if (cached.conn) {
    logger.debug(`Using cached connection to database '${mongo.db}'`);
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(
        `${mongo.domain}/${mongo.db}?${mongo.queryString}`,
        mongo.clientOptions,
      )
      .then((mongoose) => {
        logger.debug(`No cached conn to '${mongo.db}', creating one now`);
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  logger.info(`Connected to database '${mongo.db}' `);
  return cached.conn;
}
