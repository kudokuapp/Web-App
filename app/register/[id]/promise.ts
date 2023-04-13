import unavailableUsername from '$utils/kudoku/unavailableUsername';
import { getAllUsername } from './query';

export async function checkIfUsernameIsAvailable(username: string) {
  const data = await getAllUsername();

  const allUsername = new Set([
    ...unavailableUsername,
    ...data.map((d) => d.username),
  ]);

  return new Promise((resolve, reject) => {
    if (allUsername.has(username)) {
      reject('Username is unavailable');
    } else {
      resolve('Username is available');
    }
  });
}
