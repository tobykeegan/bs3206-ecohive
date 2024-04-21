import { Table } from '@mui/joy';

/**
 * The card leaderboard of nearby users.
 * @author Jade Carino
 */
export default function Leaderboard({ topUsers }) {
  let index = 0;
  const tRows = topUsers.map((topUser) => {
    index++;
    return (
      <tr key={topUser._id}>
        <td>{index}</td>
        <td>{topUser.name.display}</td>
        <td>{topUser.score.level}</td>
        <td>{topUser.score.points}</td>
      </tr>
    );
  });

  const tbody = <tbody>{tRows}</tbody>;

  return (
    <div>
      <Table sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'right' } }}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Display name</th>
            <th>Level</th>
            <th>Points</th>
          </tr>
        </thead>
        {tbody}
      </Table>
    </div>
  );
}
