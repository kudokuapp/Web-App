import unavailableUsername from '$utils/data/unavailableusername';
import { getAllUsername } from './query';

export async function checkIfUsernameIsAvailable(username: string) {
  const data = await getAllUsername();

  const allUsername = [...unavailableUsername];

  for (let i = 0; data.length; i++) {
    const element = data[i];

    allUsername.push(element.username);
  }

  return new Promise((resolve, reject) => {
    allUsername.forEach((value) => {
      if (username === value) {
        reject('Username is unavailable');
      } else {
        resolve('Username is available');
      }
    });
  });
}
