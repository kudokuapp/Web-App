import createUrl from '$utils/helper/createUrl';
import axios from 'axios';

export async function getKudosInfo(userId: string): Promise<MongoDBUserData> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get(
          createUrl('/api/mongodb/checkuserbyid').href,
          {
            params: {
              id: userId,
            },
          }
        );

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
