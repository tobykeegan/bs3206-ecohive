import User from '@/models/user';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import { ConstructionOutlined } from '@mui/icons-material';

export async function GET(request, { params }) {
  let user;

  const id = params.id;
  try {
    console.log('Finding user with ID: ', id);
    user = await User.findById(id);
    console.log('Found user: ', user);
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Error finding user',
        error: err,
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }

  if (!user) {
    return NextResponse.json(
      {
        message: 'No user found matching:',
        search: { _id: id },
      },
      {
        status: HTTP.NOT_FOUND,
      },
    );
  }
  // Return the event if found
  return NextResponse.json({
    name: `${user.name.first} ${user.name.last}`,
    displayName: user.displayName,
    picture: user.profilePicture,
  });
}
