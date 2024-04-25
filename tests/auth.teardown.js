import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';
import { test as teardown } from '@playwright/test';

/**
 * Delete the test user
 * @author Alec Painter
 */
teardown('delete auth user', async () => {
  await connect();
  const deletedUser = await User.findOneAndDelete({
    $and: [{ 'name.first': 'Test' }, { 'name.last': 'User' }],
  });
  if (!deletedUser) {
    console.log('Unable to delete test user');
  }
});
