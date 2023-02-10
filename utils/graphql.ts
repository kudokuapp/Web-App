import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.kudoku.id'
      : 'http://localhost:8080/graphql',
});

const authLinkAuth = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

export const authLinkToken = (token: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

const client = new ApolloClient({
  link: authLinkAuth.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
