import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

export const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.kudoku.id'
      : 'http://localhost:8080',
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

const authLink = setContext((_, { headers }) => {
  // Retrieve the user-specific token from a cookie
  const token = Cookies.get('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
