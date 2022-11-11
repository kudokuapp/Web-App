'use client';
import client from '$utils/graphql';
import { ApolloProvider } from '@apollo/client';

export default function Client({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
