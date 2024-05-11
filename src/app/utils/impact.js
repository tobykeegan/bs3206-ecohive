import axios from 'axios';

function rewardUserPoints(userid, points) {
  const message =
    points === 250 ? ' registering to attend an event' : ' creating an event';
  console.log('Rewarding the user EcoHive points for' + message);
  try {
    axios.patch(
      `/api/users/score/points`,
      JSON.stringify({ userid: userid, pointsToAdd: points }),
    );
  } catch (err) {
    console.log(err);
  }
}

export { rewardUserPoints };
