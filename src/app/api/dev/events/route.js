import { NextResponse, NextRequest } from 'next/server';
import Ping from '@/models/ping';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';
import { mongo } from '@/utils/globals';
import logger from '@/utils/logger';
import Cors from 'cors';
import data from '../_data/dummyEvents';
import { assert } from 'console';

await connect();

/**
 * POST to this endpoint will reset the database with a bunch of
 * dummy data
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export async function POST(request) {
  // generate the default response
  let res = {
    action: '',
    status: 'failed',
    info: '',
  };

  try {
    // gather the url encoded data
    let req = await request.formData();
    // try and get the action to perform
    let action = await req.get('action');
    logger.info(`Request type was: ${action}`);

    switch (action) {
      case 'reset':
        res.action = action;
        logger.info(
          `Removing ${await Event.countDocuments({})} entries from 'Events'`,
        );

        mongoose.modelNames().array.forEach((element) => {
          logger.info(element);
        });
        await Event.deleteMany({});

        logger.info(`Adding ${data.length} new events`);

        await Event.insertMany(data);
        if (Event.countDocuments({}) == data.length) {
          res.status = 'success';
        }

        let currentEvents = await Event.countDocuments({});

        res.status = 'success';
        res.info = `Inserted ${currentEvents} entries into 'Events'`;

        logger.info(res.info);
        break;

      case 'delete':
        res.action = action;
        res.info = `Removed ${await Event.countDocuments({})} entries from 'Events'`;
        logger.info(res.info);

        await Event.deleteMany({});

        res.status = 'success';
        break;
      default:
        res.action = 'unknown';
        res.error = {
          request: req.json(),
        };
        break;
    }
  } catch (err) {
    res.error = err;
  } finally {
    return NextResponse.json(res);
  }
}
