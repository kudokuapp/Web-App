import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import WebSocket from 'isomorphic-ws';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.kudoku.id/graphql'
      : 'http://localhost:8080/graphql',
});

const wsLink = () => {
  return new GraphQLWsLink(
    createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'wss://api.kudoku.id/graphql'
          : 'ws://localhost:8080/graphql',
      webSocketImpl: WebSocket,
    })
  );
};

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink(),
  httpLink
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
