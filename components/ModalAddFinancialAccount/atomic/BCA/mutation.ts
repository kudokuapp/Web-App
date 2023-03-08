import client from '$utils/graphql';
import { gql } from '@apollo/client';

interface IAddBcaAccount {
  __typename: 'DebitAccount';
  id: string;
}

export async function addBcaAccount({
  brickInstitutionId,
  username,
  password,
}: {
  brickInstitutionId: number;
  username: string;
  password: string;
}): Promise<IAddBcaAccount> {
  const mutation = gql`
    mutation ConnectBcaViaBrick(
      $brickInstitutionId: Int!
      $username: String!
      $password: String!
    ) {
      connectBcaViaBrick(
        brickInstitutionId: $brickInstitutionId
        username: $username
        password: $password
      ) {
        id
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { connectBcaViaBrick },
        } = await client.mutate({
          mutation,
          variables: { brickInstitutionId, username, password },
        });
        resolve(connectBcaViaBrick);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
