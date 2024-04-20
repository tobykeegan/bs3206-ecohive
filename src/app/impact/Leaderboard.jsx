import { Table } from '@mui/joy';

/**
 * The card leaderboard of nearby users.
 * @author Jade Carino
 */
export default function Leaderboard() {
  return (
    <Table sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'right' } }}>
      <thead>
        <tr>
          <th>Position</th>
          <th>Display name</th>
          <th>Level</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>jadecarino</td>
          <td>1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>2</td>
          <td>jadecarino</td>
          <td>1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>3</td>
          <td>jadecarino</td>
          <td>1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>4</td>
          <td>jadecarino</td>
          <td>1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>5</td>
          <td>jadecarino</td>
          <td>1</td>
          <td>100</td>
        </tr>
      </tbody>
    </Table>
  );
}
