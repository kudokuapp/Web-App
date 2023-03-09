import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.kudoku.id'
      : 'http://localhost:8080',
});

const authLink = setContext((_, { headers }) => {
  // Retrieve the user-specific token from a cookie
  // const token = Cookies.get('token');

  return {
    headers: {
      ...headers,
      // Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
