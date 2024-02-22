import { NextResponse } from 'next/server';
import Ping from '@/app/api/models/ping.model';
import { connect } from '../services/mongoose.service'


connect();

export async function GET(request) {
  let thisPing = new Ping({ timestamp: new Date(), ip: request.ip })

  let res = {
    message : 'pong',
    dbstate : 'connected'
  }
  try{
    await thisPing.save()
  }catch(err){
    console.log(err);
    res.message = 'thud';
    res.dbstate = 'failed';
    res.error = err;
  }

  return NextResponse.json(res, { status: 418 });
}
