import { NextResponse } from 'next/server';
import Ping from '@/models/ping';
import { connect } from '@/services/mongoose';
import { mongo } from '@/utils/globals';

await connect();

const IM_A_TEAPOT = 418;

export async function GET(request) {
  let thisPing = new Ping({ timestamp: new Date(), ip: request.ip });

  let res = {
    message: 'pong',
    dbstate: {
      name: mongo.db,
      state: 'connected',
    },
  };
  try {
    await thisPing.save();
  } catch (err) {
    console.log(err);
    res.message = 'thud';
    res.dbstate = {
      name: mongo.db,
      state: 'disconnected',
      reason: err.codeName,
    };
    res.error = err;
  }

  return NextResponse.json(res, { status: IM_A_TEAPOT });
}
